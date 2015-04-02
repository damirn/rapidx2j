{
  "targets": [
    {
      "target_name": "rapidx2j",
      "sources": [
        "src/rapidx2j.cc",
        "src/parser.cc"
      ],
	'cflags!': [ '-fno-exceptions' ],
	'cflags_cc!': [ '-fno-exceptions' ],
	"conditions": [
		['OS=="mac"', {
			'xcode_settings': {
				'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
				'GCC_ENABLE_CPP_RTTI': 'YES',
				'OTHER_LDFLAGS': ['-undefined dynamic_lookup'] }
		}]
	],
      "include_dirs": ["<!(node -e \"require('nan')\")"]
    }
  ]
}
