#include "parser.h"
#include "rapidxml.hpp"

#include <algorithm>
#include <cstdlib>
#include <string>

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
  double d = ::strtod(text.c_str(), &c);
  if (*c == '\0')
    return NanNew<v8::Number>(d);

  return NanNew<v8::String>(text);
}

static v8::Local<v8::Value> walk(const rapidxml::xml_node<> *node)
{
  v8::Local<v8::Value> ret = NanNew<v8::Boolean>(true); // default value
  int len = 0;
  std::string collected = "";

  // handle attributes here

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
          arr = a; // check this
        }
//        arr = myret->Get(key);
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
    ret = parseText(collected);

  return ret;
}

NAN_METHOD(Parse)
{
  NanScope();

  if (args.Length() < 1)
  {
    NanThrowError("Wrong number of arguments");
    NanReturnUndefined();
  }

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

  v8::Local<v8::Value> obj = walk(doc.first_node());

  NanReturnValue(obj);
}
