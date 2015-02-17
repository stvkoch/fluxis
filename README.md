# fluxis
Tiny flux architecture implementation. Simple, but very power flux implementation.


ACTION -> STORE -> VIEW
VIEW -> ACTION -> STORE -> VIEW,...


This implementation is inpirate on ALT.js, but with selector listeners.

This is useful when you have multiples components for the same store.


The follow codes are extracted from tests of this module:



    'use strict()';
    var Fluxis = require('../../src/index.js');
    //create Action
    var Action = function Action() {
      this.generateActions('doSomething', 'doWithArgs', 'doWithSelector');
    };
    module.exports = Fluxis.createActions(Action);


    //create Store
    var Store = function Store() {
      this.bindActions(action);
      this.data = state.initialState;
    };
    //build your logical store
    Store.prototype = {
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
      }
      
    };
    module.exports = Fluxis.createStore(Store);
      
    store.listen(callbackGeneral);
    store.listen(callbackSelectorA, 'selectA');
    store.listen(callbackSelectorB, 'selectB');


#Install:

    npm install fluxis --save


See test folder for more details of implementation.

run tests:

    npm test



  
