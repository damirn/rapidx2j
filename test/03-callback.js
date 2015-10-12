var r = require('rapidx2j'),
    x = '<xml><message>Callback works!</message></xml>';

function cb(err, value) {
        if (err)
                throw (err);

        console.log(value.message);
};

r.parse(x, null, cb);
