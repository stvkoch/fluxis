![Travis-ci test](https://travis-ci.org/stvkoch/fluxis.svg)

# fluxis
Tiny flux architecture implementation. Simple, but very power flux implementation.


    ACTION -> STORE -> VIEW
    VIEW -> ACTION -> STORE -> VIEW, ...


Difference between others implementations?

  - Small payload, ideal for mobile implementations.
  - Simple, fast and powerfull
  - Allow multiples components listen same store using selectors.
  - Allow one action dispatch a multiples stores.
  - Easy way to create your stores and actions.
  - Fully interface tests.


This implementation is inpirate on ALT.js, but with small payload and selector listeners.


Selector listener is useful when you have multiples components listening same store, in some cases you not want that store dispatch changes to all components. 

Be careful when using multiples components with one store. Selector is useful when you want a component to react to changes of store states without needing affect all components connected to this store. In some cases it is useful, but in other, adds this simplicity that many developers try find, can break the flux architecture of your application. React uses immutable values to represent the component states and its associated sub-components. It's good to have this in your mind when draw hierarchy of your components, because React takes advantage of immutability mechanism the state of virtual DOM to extract only the difference between the current state and the changes on fast way, it makes the selector, in some cases, does not make sense but in other makes. In some cases, you do not want the main component propagate your changes to own sub-component. Again, evaluate if, it is not preferable, to have two states/store instead of one. One to represent the hierarchy and another to represent the state can be changed. Otherwise Fluxis is very simple implementation, run well with async methods and it's easy build your flux architecture.


This library has small paylod and are fully tested.



The follow codes are extracted from tests folder:


    'use strict()';
    var Fluxis = require('fluxis');

    //create Action
    var Action = function Action() {
      //fluxis generate methods that trigger event to stores
      this.generateActions('propagate', 'doAsyncSomething', 'doSomething', 'doWithArgs', 'doWithSelector');
    };
    module.exports = Fluxis.createActions(Action);


    //create Store
    var Store = function Store() {
      //bind action for this store, you can bind multiples stores same action.
      this.bindActions(action);
      //fluxis use own store for save state
      this.data = {};
    };
    //build your logical store
    Store.prototype = {
      //fluxis allow dispatch multiples events
      propagate: function(data){
        this.data = data;
      },
      doAsyncSomething: function(){
        //sweet, if you add loading flag like appAction.wait() and in your propagate method you can use appAction.wakeup()
        var promise = $fetchFromService('operation', arguments);
        promise.then(action.propagate);

        return false;//not propagate 
      },
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
        return args.selector||''; //only 'dispatch to listerns that expect selector'
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

  or

    mocha ./tests


  
