'use strict';

const rapidx2j = require('../build/Release/rapidx2j');

rapidx2j.parse('<root/>', (err, json) => {
  console.log(json);
});
