
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

var callbackGeneral = new sinon.spy();
var callbackSelectorA = new sinon.spy();
var callbackSelectorB = new sinon.spy();


var stateExpected1  = {hello:'world', foo:'bar', once:true};
var stateExpected2  = {hello:'world', foo:'bar', twice:true};




describe('Test how fluxis flow actions with arguments to stores when listeners using selector.', function(){
  describe('Registering callbacks with adicional selector on event machine', function(){

    store.listen(callbackGeneral);
    store.listen(callbackSelectorA, 'selectA');
    store.listen(callbackSelectorB, 'selectB');

    before(function(){
        callbackGeneral.reset();
        callbackSelectorA.reset();
        callbackSelectorB.reset();
    });

    it('callbacks should be a not equals', function(){
      callbackGeneral.should.be.not.equal(callbackSelectorA);
      callbackSelectorA.should.be.not.equal(callbackSelectorB);
      callbackSelectorB.should.be.not.equal(callbackGeneral);
    });

    it('callbackGeneral should called Twice others zero', function () {
      action.doSomething();
      action.doWithSelector();

      callbackGeneral.should.have.been.calledTwice;
      callbackSelectorA.should.have.been.callCount(0);
      callbackSelectorB.should.have.been.callCount(0);
    });


    it('using selector A. To flow action to store and propagate to listerner A and general', function () {
      //this is a example, maybe you like use id of record?
      action.doWithSelector({selector:'selectA',data:stateExpected2});
      callbackGeneral.should.have.been.callCount(3);
      callbackSelectorA.should.have.been.callCount(1);
      callbackSelectorB.should.have.been.callCount(0);
    });

    it('after called should be have state like stateExpected2', function () {
      store.getState().data.should.be.equal(stateExpected2);
    });

    it('using selector B. Note that general allways is called selector not affect him. ', function () {
      action.doWithSelector({selector:'selectB',data:stateExpected1});
      callbackGeneral.should.have.been.callCount(4);
      callbackSelectorA.should.have.been.callCount(1);
      callbackSelectorB.should.have.been.callCount(1);
    });

    it('after called should be have state like stateExpected1', function () {
      store.getState().data.should.be.equal(stateExpected1);
    });

    it('unlisteners all and trigger actions, nothings shoulb be propagate', function () {
      store.unlisten(callbackGeneral);
      store.unlisten(callbackSelectorA, 'selectA');
      store.unlisten(callbackSelectorB, 'selectB');
      action.doWithSelector({selector:'selectA',data:stateExpected2});
      action.doWithSelector({selector:'selectB',data:stateExpected2});
      action.doWithSelector();
      callbackGeneral.should.have.been.callCount(4);
      callbackSelectorA.should.have.been.callCount(1);
      callbackSelectorB.should.have.been.callCount(1);
    });

  });

});