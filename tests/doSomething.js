
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

var callbackDoSomething = new sinon.spy();




describe('Test how fluxis flow actions to stores.', function(){
  describe('DoSomething test flow', function(){
    store.listen(callbackDoSomething);

    before(function(){
        callbackDoSomething.reset();
    });

    it('callbackDoSomething should called Once', function () {
      action.doSomething();
      callbackDoSomething.should.have.been.calledOnce;
    });

    it('after called should be have state like STATE_DO_SOMETHING', function () {
      store.getState().data.should.be.equal(stateComparators.STATE_DO_SOMETHING);
    });

    it('callbackDoSomething should called Twice', function () {
      action.doSomething();
      callbackDoSomething.should.have.been.calledTwice;
    });

    it('unlistener callbackDoSomething and keep twice called', function () {
      store.unlisten(callbackDoSomething);
      var newState = {'newState':true};
      action.doWithArgs(newState);
      callbackDoSomething.should.have.been.calledTwice;
      store.getState().data.should.be.equal(newState);
    });
  });

});