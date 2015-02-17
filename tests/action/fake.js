'use strict()';

var Fluxis = require('../../src/index.js');

//create Action
var Action = function Action() {
  this.generateActions('doSomething', 'doWithArgs', 'doWithSelector', 'propagate', 'doAsync');
};
module.exports = Fluxis.createActions(Action);

