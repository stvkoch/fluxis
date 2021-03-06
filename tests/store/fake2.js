'use strict()';

var Fluxis = require('../../src/index.js');

var state  = require('../state');

var action  = require('../action/fake2');

//create Store
var Store2 = function Store2() {
  this.bindActions(action);
  this.data = state.initialState;
};

//build your logical store2
Store2.prototype = {
  doSomething: function(args) {
    this.data = state.STATE_DO_SOMETHING;
  },

  doWithArgs: function(args) {
    this.data = args;
  },

  //hera are important stuff that differency another flux library
  doWithSelector: function(args) {
    args = args || {};
    this.data = args.data||{};
    return args.selector||''; //only 'dispatch to listens that expect selector' see Config object
  },

  propagate: function(args){
    this.data = args.data;
    args.callback();
    args.testPropagate();
  },

  doAsync: function(data){
    setTimeout(function(){
      action.propagate(data);
    },500);
    return false;//not propagate
  }

};

module.exports = Fluxis.createStore(Store2);
