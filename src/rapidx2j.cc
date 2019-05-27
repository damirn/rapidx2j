#include "parser.h"

NAN_MODULE_INIT(InitAll)
{
  Nan::Set(target, Nan::New<v8::String>("parse").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(parse)).ToLocalChecked());
  Nan::Set(target, Nan::New<v8::String>("parseAsync").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(parseAsync)).ToLocalChecked());
}

NODE_MODULE(rapidx2j, InitAll)
