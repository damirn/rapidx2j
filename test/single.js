var rapidx2j = require('../index');
var assert = require('assert');

describe('<root/>', function () {
  it('should return an empty object', function (done) {
    rapidx2j.parse('<root/>', (err, json) => {
      assert(typeof json === 'object' && json !== null && Object.keys(json) !== null);
      done();
    });
  });
});
