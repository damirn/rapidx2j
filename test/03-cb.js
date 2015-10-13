var r = require('../build/Release/rapidx2j'),
    x = '<a><b>rapidx2j</b></a>';

r.parseAsync(x, {}, function(err, val) {
    if (err)
        throw(err);
    console.log(val.b);
});
