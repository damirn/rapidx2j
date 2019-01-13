/// <reference types="node"/>

declare var c: c.IRapidx2j;

declare namespace c {
    type XML = string | Buffer;

    interface Options {
        attr_group?: boolean;
        attr_prefix?: string;
        empty_tag_value?: null;
        parse_boolean_values?: boolean;
        parse_int_numbers?: boolean;
        parse_float_numbers?: boolean;
        preserve_case?: boolean;
        explicit_array?: boolean;
        skip_parse_when_begins_with?: string;
        value_key?: string;
    }

    interface IRapidx2j {
        parse<T extends object>(xml: XML): T;

        parse<T extends object>(xml: XML, options: Options): T;

        parse<T extends object>(xml: XML, options: Options, callback: (err: any, result: T) => void);

        parse<T extends object>(xml: XML, callback: (err: any, result: T) => void);
    }
}

export = c;
