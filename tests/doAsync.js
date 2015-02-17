
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
var callbackVerificator = new sinon.spy();


var stateExpected1  = {hello:'world', foo:'bar', once:true};
var stateNotExpected  = {hello:'world', foo:'bar', twice:true};


var storeChangeFromPropagate = function(){
  store.getState().data.should.be.equal(stateExpected1);
  store.getState().data.should.be.not.equal(stateNotExpected);
  callbackVerificator.should.have.been.calledOnce;

};

describe('Test how fluxis flow when actions and stores need handler async methods.', function(){
  describe('Not need propagate directly', function(){

    store.listen(callbackGeneral);

    before(function(){
        callbackVerificator.reset();
    });
    
    after(function(){
      store.unlisten(callbackGeneral);
      store.unlisten(storeChangeFromPropagate);
    });


    it('Only change state after propagate', function(done){

      store.listen(storeChangeFromPropagate);
      action.doAsync({data:stateExpected1, callback:callbackVerificator, testPropagate:function(){
        done();
      }});

      //doAsync return false, callbackVerificator and callbackGeneral listeners is not called by doAsync, only after all async stuff is already running is that propagate method is called by async method
      //this is a example of propagation flow, in real world your application could't expect state outside of callback or promise. 
      //Here it's work because store know the exact time is spend by pseud-async method.
      store.getState().data.should.be.not.equal(stateExpected1);
      callbackGeneral.should.have.been.callCount(0);
      callbackVerificator.should.have.been.callCount(0);
    });

  });

});