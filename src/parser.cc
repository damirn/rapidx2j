#include "parser.h"
#include "rapidxml.hpp"

#include <algorithm>
#include <cstdlib>
#include <errno.h>
#include <string>

static v8::Local<v8::Value> gEmptyTagValue; // default value for empty tags
static bool gParseDouble = true;

static std::string trim(const std::string &s)
{
  size_t first = s.find_first_not_of(" \t\n\r");
  size_t last = s.find_last_not_of(" \t\n\r");
  return s.substr(first, (last - first + 1));
}

static void toLower(std::string &s)
{
  std::transform(s.begin(), s.end(), s.begin(), ::tolower);
}

static v8::Local<v8::Value> parseText(const std::string &text)
{
  if (text.find_first_not_of(" \t\n\r") == std::string::npos) // empty string
    return NanNull();

  std::string tmp = text;
  toLower(tmp);
  if (tmp == "true")
    return NanNew<v8::Boolean>(true);
  else if (tmp == "false")
    return NanNew<v8::Boolean>(false);

  char *c = const_cast<char *>(text.c_str());
  if (gParseDouble)
  {
    double d = ::strtod(text.c_str(), &c);
    if (*c == '\0')
      return NanNew<v8::Number>(d);
  }
  else
  {
    long l = ::strtol(text.c_str(), &c, 10);
    if (!(text.c_str() == c || *c != '\0' || ((l == LONG_MIN || l == LONG_MAX) && errno == ERANGE)))
      return NanNew<v8::Number>(l);
  }

  return NanNew<v8::String>(text);
}

static v8::Local<v8::Value> walk(const rapidxml::xml_node<> *node)
{
  v8::Local<v8::Value> ret = gEmptyTagValue;
  int len = 0;
  std::string collected = "";

  // handle attributes here

  if (node->first_attribute())
  {
    ret = NanNew<v8::Object>();
    for (const rapidxml::xml_attribute<> *a = node->first_attribute(); a; a = a->next_attribute())
    {
      ++len;
      std::string tmp("@" + std::string(a->name()));
      toLower(tmp);
      v8::Local<v8::Object>::Cast(ret)->Set(NanNew<v8::String>(tmp), parseText(trim(std::string(a->value()))));
    }
  }

  for (const rapidxml::xml_node<> *n = node->first_node(); n; n = n->next_sibling())
  {
    const rapidxml::node_type t = n->type();
    if (t == rapidxml::node_data)
    {
      collected += trim(std::string(node->value()));
    }
    else if (t == rapidxml::node_cdata)
    {
      collected += std::string(node->value());
    }
    else if (t == rapidxml::node_element)
    {
      if (len == 0)
        ret = NanNew<v8::Object>();
      std::string prop = n->name();
      toLower(prop);
      v8::Local<v8::Value> obj = walk(n);
      v8::Local<v8::Object> myret = v8::Local<v8::Object>::Cast(ret);

      v8::Local<v8::String> key = NanNew<v8::String>(prop);
      if (myret->Has(key))
      {
        v8::Local<v8::Value> arr = myret->Get(NanNew<v8::String>(prop));
        if (!arr->IsArray())
        {
          v8::Local<v8::Array> a = NanNew<v8::Array>();
          a->Set(0, myret->Get(key));
          myret->Set(key, a);
          arr = a;
        }
        v8::Local<v8::Array> a = v8::Local<v8::Array>::Cast(arr);
        a->Set(a->Length(), obj);
      }
      else
      {
        myret->Set(key, obj);
        ++len;
      }
    }
  }
  if (collected.length() > 0)
  {
    if (len > 0)
      v8::Local<v8::Object>::Cast(ret)->Set(NanNew<v8::String>("keyValue"), parseText(collected));
    else
      ret = parseText(collected);
  }

  return ret;
}

NAN_METHOD(parse)
{
  NanScope();

  if (args.Length() < 1)
  {
    NanThrowError("Wrong number of arguments");
    NanReturnUndefined();
  }
  if (args.Length() == 2)
  {
    if (!args[1]->IsObject())
    {
      NanThrowError("Wrong argument; expected Object");
      NanReturnUndefined();
    }
    else
    {
      v8::Local<v8::Object> tmp = v8::Local<v8::Object>::Cast(args[1]);
      gEmptyTagValue = tmp->Get(NanNew<v8::String>("empty_tag_value"));
      gParseDouble = tmp->Get(NanNew<v8::String>("parse_float_numbers"))->BooleanValue();
    }
  }
  else
    gEmptyTagValue = NanNew<v8::Boolean>(true);

  NanUtf8String xml(args[0]);
  rapidxml::xml_document<char> doc;
  try
  {
    doc.parse<0>(*xml);
  }
  catch (rapidxml::parse_error &e)
  {
    NanReturnUndefined();
  }

  if (doc.first_node())
  {
    v8::Local<v8::Value> obj = walk(doc.first_node());
    NanReturnValue(obj);
  }
  NanReturnUndefined();
}
