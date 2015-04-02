#include "parser.h"

void InitAll(v8::Handle<v8::Object> exports)
{
  exports->Set(NanNew<v8::String>("parse"), NanNew<v8::FunctionTemplate>(Parse)->GetFunction());
}

NODE_MODULE(addon, InitAll)
