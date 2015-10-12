var r = require('rapidx2j');
var x = '';
var limit = 999999;

console.log('Generating XML...');
x += '<xml>';
for (var i = 0; i < limit; i++) {
    x += '<message'+i+'>';
    x += 'Some XML value';
    x += '</message'+i+'>';
}
x += '</xml>';
console.log('Done.');


var timer = setInterval(myTimer, 1);

console.log('Starting XML parser...');
r.parse(x, null, cb);

console.log('Current tick is not blocking...');
console.log('I can calculate to infinity here.');
console.log(Math.random().toString(36).substring(7));
console.log(Math.random().toString(36).substring(7));
console.log(Math.random().toString(36).substring(7));


function cb(err, value) {
        if (err)
                throw (err);

        console.log('Called back with: ' + value['message0']);
        clearInterval(timer);
};

function myTimer() {
    console.log('Unfortunately, the next tick is still blocking.');
}

