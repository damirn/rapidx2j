#include "parser.h"

void InitAll(v8::Handle<v8::Object> exports)
{
  exports->Set(Nan::New<v8::String>("parse").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(parse)->GetFunction());
  exports->Set(Nan::New<v8::String>("parseAsync").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(parseAsync)->GetFunction());
}

NODE_MODULE(rapidx2j, InitAll)
