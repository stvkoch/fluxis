'use strict()';

var Fluxis = require('../../src/index.js');

//create Action
var Action2 = function Action2() {
  this.generateActions('doSomething', 'doWithArgs', 'doWithSelector', 'propagate', 'doAsync');
};
module.exports = Fluxis.createActions(Action2);

