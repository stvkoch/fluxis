
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
var callbackDoSomethingReflex = new sinon.spy();




describe('Test how fluxis manager flow actions with two callback per one stores.', function(){
  describe('DoSomething test flow with two listeners', function(){

    store.listen(callbackDoSomething);
    store.listen(callbackDoSomethingReflex);

    before(function(){
        callbackDoSomething.reset();
        callbackDoSomethingReflex.reset();
    });
    
    after(function(){
      store.unlisten(callbackDoSomethingReflex);
    })


    it('callbackDoSomething should be a not equal to callbackDoSomethingReflex', function(){
      callbackDoSomething.should.be.not.equal(callbackDoSomethingReflex);
    });

    it('should called Once', function () {
      action.doSomething();
      callbackDoSomething.should.have.been.calledOnce;
      callbackDoSomethingReflex.should.have.been.calledOnce;
    });

    it('after called should be have state like STATE_DO_SOMETHING', function () {
      store.getState().data.should.be.equal(stateComparators.STATE_DO_SOMETHING);
    });

    it('should called twice', function () {
      action.doSomething();
      callbackDoSomething.should.have.been.calledTwice;
      callbackDoSomethingReflex.should.have.been.calledTwice;
    });

    it('unlistener callbackDoSomething and keep him twice called but reflex called thrice', function () {
      store.unlisten(callbackDoSomething);
      var newState = {'newState':true};
      action.doWithArgs(newState);
      callbackDoSomething.should.have.been.calledTwice;
      callbackDoSomethingReflex.should.have.been.calledThrice;
      store.getState().data.should.be.equal(newState);
    });
  });

});