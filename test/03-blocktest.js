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


var timer = setInterval(myTimer, 40);

console.log('Starting XML parser...');
r.parse(x, null, cb);

console.log('Current tick: Can you read me before rapid calls back?'); 


function cb(err, value) {
	if (err)
		throw (err);

	console.log('Called back with: ' + value['message0']);
	clearInterval(timer);
};

function myTimer() {
	console.log('Next tick: Can you read me before rapid calls back?'); 
}
