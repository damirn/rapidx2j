#include "parser.h"
#include "rapidxml.hpp"

#include <algorithm>
#include <cstdlib>
#include <string>
#include <errno.h>

static v8::Local<v8::Value> gEmptyTagValue; // default value for empty tags
static bool gParseBoolean;
static bool gParseDouble;
static bool gParseInteger;
static bool gPreserveCase;
static std::string gBeginsWith;

static std::string trim(const std::string &s)
{
  size_t first = s.find_first_not_of(" \t\n\r");
  if (first == std::string::npos)
    return std::string("");
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
    return Nan::Null();

  std::string tmp = text;
  if (!gPreserveCase)
    toLower(tmp);
  if (gParseBoolean)
  {
    if (tmp == "true")
      return Nan::New<v8::Boolean>(true);
    else if (tmp == "false")
      return Nan::New<v8::Boolean>(false);
  }

  if (gBeginsWith.length() > 0 && text.find_first_of(gBeginsWith) == 0)
    return Nan::New<v8::String>(text).ToLocalChecked();

  char *c = const_cast<char *>(text.c_str());
  if (gParseDouble)
  {
    double d = ::strtod(text.c_str(), &c);
    if (*c == '\0')
      return Nan::New<v8::Number>(d);
  }
  else if (gParseInteger)
  {
    long l = ::strtol(text.c_str(), &c, 10);
    if (!(text.c_str() == c || *c != '\0' || ((l == LONG_MIN || l == LONG_MAX) && errno == ERANGE)))
      return Nan::New<v8::Number>(l);
  }

  return Nan::New<v8::String>(text).ToLocalChecked();
}

static v8::Local<v8::Value> walk(const rapidxml::xml_node<> *node)
{
  v8::Local<v8::Value> ret = gEmptyTagValue;
  int len = 0;
  std::string collected = "";

  // handle attributes here

  if (node->first_attribute())
  {
    ret = Nan::New<v8::Object>();
    for (const rapidxml::xml_attribute<> *a = node->first_attribute(); a; a = a->next_attribute())
    {
      ++len;
      std::string tmp("@" + std::string(a->name()));
      if (!gPreserveCase)
        toLower(tmp);
      v8::Local<v8::Object>::Cast(ret)->Set(Nan::New<v8::String>(tmp).ToLocalChecked(), parseText(trim(std::string(a->value()))));
    }
  }

  for (const rapidxml::xml_node<> *n = node->first_node(); n; n = n->next_sibling())
  {
    const rapidxml::node_type t = n->type();
    if (t == rapidxml::node_data)
      collected += trim(std::string(node->value()));
    else if (t == rapidxml::node_cdata)
      collected += std::string(node->first_node()->value());
    else if (t == rapidxml::node_element)
    {
      if (len == 0)
        ret = Nan::New<v8::Object>();
      std::string prop = n->name();
      if (!gPreserveCase) toLower(prop);
      v8::Local<v8::Value> obj = walk(n);
      v8::Local<v8::Object> myret = v8::Local<v8::Object>::Cast(ret);

      v8::Local<v8::String> key = Nan::New<v8::String>(prop).ToLocalChecked();
      if (myret->Has(key))
      {
        v8::Local<v8::Value> arr = myret->Get(Nan::New<v8::String>(prop).ToLocalChecked());
        if (!arr->IsArray())
        {
          v8::Local<v8::Array> a = Nan::New<v8::Array>();
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
      v8::Local<v8::Object>::Cast(ret)->Set(Nan::New<v8::String>("keyValue").ToLocalChecked(), parseText(collected));
    else
      ret = parseText(collected);
  }

  return ret;
}

static bool parseArgs(const Nan::FunctionCallbackInfo<v8::Value> &args)
{
  if (args.Length() < 1)
  {
    Nan::ThrowError("Wrong number of arguments");
    return false;
  }
  if (args.Length() >= 2)
  {
    if (!args[0]->IsString() && !args[0]->IsObject())
    {
      Nan::ThrowError("Wrong argument; expected String or Buffer");
      return false;
    }
    if (!args[1]->IsObject())
    {
      Nan::ThrowError("Wrong argument; expected Object");
      return false;
    }
    else
    {
      v8::Local<v8::Object> tmp = v8::Local<v8::Object>::Cast(args[1]);
      if (!Nan::HasOwnProperty(tmp, Nan::New<v8::String>("empty_tag_value").ToLocalChecked()).FromMaybe(false))
        gEmptyTagValue = Nan::New<v8::Boolean>(true);
      else
        gEmptyTagValue = tmp->Get(Nan::New<v8::String>("empty_tag_value").ToLocalChecked());
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("parse_boolean_values").ToLocalChecked()).FromMaybe(false))
        gParseBoolean = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("parse_boolean_values").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        gParseBoolean = true;        
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("parse_float_numbers").ToLocalChecked()).FromMaybe(false))
        gParseDouble = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("parse_float_numbers").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        gParseDouble = true;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("parse_int_numbers").ToLocalChecked()).FromMaybe(false))
        gParseInteger = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("parse_int_numbers").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        gParseInteger = true;
      if (Nan::HasOwnProperty(tmp, Nan::New<v8::String>("preserve_case").ToLocalChecked()).FromMaybe(false))
        gPreserveCase = Nan::To<bool>(Nan::Get(tmp, Nan::New<v8::String>("preserve_case").ToLocalChecked()).ToLocalChecked()).FromJust();
      else
        gPreserveCase = false;        
      v8::String::Utf8Value s(tmp->Get(Nan::New<v8::String>("skip_parse_when_begins_with").ToLocalChecked())->ToString());
      gBeginsWith = *s;
    }
  }
  else
  {
    gEmptyTagValue = Nan::New<v8::Boolean>(true);
    gParseBoolean = true;
    gParseDouble = true;
    gParseInteger = true;
    gPreserveCase = false;
    gBeginsWith = "";
  }
  return true;
}

NAN_METHOD(parse)
{
  if (!parseArgs(info))
  {
    info.GetReturnValue().SetUndefined();
    return;
  }

  Nan::Utf8String xml(info[0]);
  rapidxml::xml_document<char> doc;
  try
  {
    doc.parse<0>(*xml);
  }
  catch (rapidxml::parse_error &)
  {
    info.GetReturnValue().SetUndefined();
    return;
  }

  if (doc.first_node())
  {
    if (!doc.first_node()->first_attribute() && !doc.first_node()->first_node())
      return info.GetReturnValue().Set(Nan::New<v8::Object>());
    v8::Local<v8::Value> obj = walk(doc.first_node());
    info.GetReturnValue().Set(obj);
    return;
  }

  info.GetReturnValue().SetUndefined();
}

class AsyncParser : public Nan::AsyncWorker
{
public:
  AsyncParser(Nan::Callback *callback, Nan::Utf8String *xml)
  : Nan::AsyncWorker(callback)
  , m_xml(xml)
  {}

  ~AsyncParser()
  {
    delete m_xml;
  }

  virtual void Execute()
  {
    try
    {
      m_doc.parse<0>(**m_xml);
    }
    catch (rapidxml::parse_error &e)
    {
      SetErrorMessage(e.what());
    }
  }

  virtual void HandleOKCallback()
  {
    Nan::HandleScope scope;

    v8::Local<v8::Value> val = Nan::Undefined();
    if (m_doc.first_node())
    {
      if (!m_doc.first_node()->first_attribute() && !m_doc.first_node()->first_node())
          val = Nan::New<v8::Object>();
      else
          val = walk(m_doc.first_node());
    }

    v8::Local<v8::Value> argv[] = 
    {
      Nan::Null(),
      val
    };
    callback->Call(2, argv);
  }

private:
  Nan::Utf8String *m_xml;
  rapidxml::xml_document<char> m_doc;
  v8::Local<v8::Value> m_result;
};

NAN_METHOD(parseAsync)
{
  if (!parseArgs(info))
  {
    info.GetReturnValue().SetUndefined();
    return;
  }

  if (info.Length() != 3) // xml string, options object, callback
  {
    Nan::ThrowError("Invalid number of arguments");
    info.GetReturnValue().SetUndefined();
    return;
  }
  if (!info[2]->IsFunction())
  {
    Nan::ThrowError("Invalid argument; expected Function");
    info.GetReturnValue().SetUndefined();
    return;
  }
  Nan::Utf8String *xml = new Nan::Utf8String(info[0]);
  Nan::Callback *cb = new Nan::Callback(info[2].As<v8::Function>());
  Nan::AsyncQueueWorker(new AsyncParser(cb, xml));

  info.GetReturnValue().SetUndefined();
}
