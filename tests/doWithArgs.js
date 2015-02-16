
"use strict";

//library
var Fluxis = require('../src/index.js');

// test framework
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);


var stateComparators = require('./state');

var action = require('./action/fake');
var store = require('./store/fake');

var callbackDoWithArgs = new sinon.spy();

var stateExpected1  = {hello:'world', foo:'bar', once:true};
var stateExpected2  = {hello:'world', foo:'bar', twice:true};




describe('Test how fluxis flow actions with arguments to stores.', function(){
  describe('Allow actions with arguments and test passing arguments to store', function(){

    store.listen(callbackDoWithArgs);

    before(function(){
        callbackDoWithArgs.reset();
    });
    after(function(){
      store.unlisten(callbackDoWithArgs);
    })

    it('callbackDoWithArgs should called Once', function () {
      action.doWithArgs(stateExpected1);
      callbackDoWithArgs.should.have.been.calledOnce;
    });

    it('after called should be have state like stateExpected1', function () {
      store.getState().data.should.be.equal(stateExpected1);
    });

    it('callbackDoWithArgs should called Twice', function () {
      action.doWithArgs(stateExpected2);
      callbackDoWithArgs.should.have.been.calledTwice;
    });

    it('after called should be have state like stateExpected2', function () {
      store.getState().data.should.be.equal(stateExpected2);
    });

  });

});