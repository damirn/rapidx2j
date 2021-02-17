#include "parser.h"

NAN_MODULE_INIT(InitAll)
{
  NAN_EXPORT(target, parse);
  NAN_EXPORT(target, parseAsync);
}

NODE_MODULE(rapidx2j, InitAll)
