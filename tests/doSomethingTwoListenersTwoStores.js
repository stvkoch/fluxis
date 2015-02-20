
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

var action1 = require('./action/fake');
var store1 = require('./store/fake');

var action2 = require('./action/fake2');
var store2 = require('./store/fake2');


var callbackDoSomething1 = new sinon.spy();
var callbackDoSomething2 = new sinon.spy();




describe('Test how fluxis manager flow with two stores.', function(){
  describe('DoSomething test flow with two listeners and two stores', function(){

    store1.listen(callbackDoSomething1);
    store2.listen(callbackDoSomething2);

    before(function(){
        callbackDoSomething1.reset();
        callbackDoSomething2.reset();
    });
    
    after(function(){
      store1.unlisten(callbackDoSomething1);
    })

    it('callbackDoSomething1 should be a not equal to callbackDoSomething2', function(){
      callbackDoSomething1.should.be.not.equal(callbackDoSomething2);
    });

    it('should called Once', function () {
      action1.doSomething();
      callbackDoSomething1.should.have.been.calledOnce;
      callbackDoSomething2.should.have.been.callCount(0);
    });

    it('after called should be have state like 1 STATE_DO_SOMETHING and 2 initialState', function () {
      store1.getState().data.should.be.equal(stateComparators.STATE_DO_SOMETHING);
      store2.getState().data.should.be.equal(stateComparators.initialState);
    });

    it('should called twice', function () {
      action2.doSomething();
      callbackDoSomething1.should.have.been.calledOnce;
      callbackDoSomething2.should.have.been.calledOnce;
    });

    it('unlistener callbackDoSomething and keep him twice called but reflex called thrice', function () {
      store2.unlisten(callbackDoSomething2);
      var newState = {'newState':true};
      action2.doWithArgs(newState);
      action1.doWithArgs(newState);
      store1.getState().data.should.be.equal(newState);
      store2.getState().data.should.be.equal(newState);

      callbackDoSomething1.should.have.been.calledTwice;
      callbackDoSomething2.should.have.been.calledOnce;
    });
  });

});