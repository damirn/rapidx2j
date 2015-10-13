#include "parser.h"

void InitAll(v8::Handle<v8::Object> exports)
{
  exports->Set(NanNew<v8::String>("parse"), NanNew<v8::FunctionTemplate>(parse)->GetFunction());
  exports->Set(NanNew<v8::String>("parseAsync"), NanNew<v8::FunctionTemplate>(parseAsync)->GetFunction());
}

NODE_MODULE(rapidx2j, InitAll)
