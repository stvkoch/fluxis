/**
Simple
function assert(condition, message) {
    if (!condition) 
        console.error("FAIL: ", message)
    else
    

}
class Action{
    constructor(){
        this.generateActions('doSomething', 'doWithArgs');
    }
}
var action = Fluxis.createActions(Action);


class Store{
    constructor(){
        this.bindAction(action);
    }
    doSomething(){
    
    }
    doWithArgs(){
    
    }
}

var store = Fluxis.createStore(Store);
action.doSomething();
action.doWithArgs('hello', world);

*/

// var riot = require('riot');

var ACTION_LISTENER = ("_LISTENERS");

function Action(action){
    this._listener = function(StoreModel){
        var key = StoreModel.constructor.name || StoreModel.displayName || StoreModel.name;
        this[ACTION_LISTENER][key] = StoreModel;
    };
    this.generateActions = function(){
        var methods = arguments || [];
        var self = this;
        for (var i in methods) {
            if (methods.hasOwnProperty(i)) {
                var method = methods[i];
                var _makeTriggeredActionCall = function(method){
                    //@TODO REFACT
                    return function(){
                        for (var ii in self[ACTION_LISTENER]) {
                            if (self[ACTION_LISTENER].hasOwnProperty(ii) && self[ACTION_LISTENER][ii][method]) {
                                var r = self[ACTION_LISTENER][ii][method](arguments[0]);
                                if(r !== false){
                                    self[ACTION_LISTENER][ii].trigger('change');
                                    if ((typeof r === 'string' || typeof r === 'number') && r !== '')
                                        self[ACTION_LISTENER][ii].trigger('change'+r);
                                }
                            }
                        }
                    }
                }
                self[method] = _makeTriggeredActionCall(method);
            }
        }
    };

    this[ACTION_LISTENER] = {};
    action.call(this);
};



function Store(store){
    this.bindActions = function(action){
        action._listener(this);
    };
    this.listen = function(callback, aditionalSelector){
        aditionalSelector = aditionalSelector || '';
        this.on('change'+aditionalSelector, callback);
    };
    this.unlisten = function(callback, aditionalSelector){
        aditionalSelector = aditionalSelector || '';
        this.off('change'+aditionalSelector, callback);
    };
    this.getState = function(){
        return this;
    };

    store.call(this);
    return this;
}




var Fluxis = function(){};

Fluxis.prototype.createActions = function(action){
    var actionClass = new Action(action);
    return actionClass;
}

Fluxis.prototype.createStore = function(StoreModel){
    Store.prototype = StoreModel.prototype;
    var storeClass = new Store(StoreModel);
    this.observable(storeClass);
    return storeClass;
}

Fluxis.prototype.observable = function(el) {
  el._callbacks = {}

  el.on = function(events, fn) {
    var self = this;
    if (typeof fn == 'function') {
      events.replace(/\S+/g, function(name, pos) {
        (self._callbacks[name] = self._callbacks[name] || []).push(fn)
        fn.typed = pos > 0
      })
    }
    return el
  }

  el.off = function(events, fn) {
    var self = this;
    if (events == '*') self._callbacks = {}
    else if (fn) {
      var arr = self._callbacks[events]
      for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
        if (cb == fn) { 
            arr.splice(i, 1);
            i--;
        }
      }
    } else {
      events.replace(/\S+/g, function(name) {
        self._callbacks[name] = []
      })
    }
    return el
  }

  el.trigger = function(name) {
    var args = [].slice.call(arguments, 1),
        fns = this._callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1
        fn.apply(el, fn.typed ? [name].concat(args) : args)
        fn.busy = 0
      }
    }

    return el
  }

  return el

}

var fluxis = new Fluxis();

module.exports = fluxis;

