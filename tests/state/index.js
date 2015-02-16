'use strict()';


module.exports = {
  initialState: {
    'A': null,
    'B': null
  },
  AState: {
    'A': 'hello',
    'B': null
  },
  BState: {
    'A': null,
    'B': 'hello'
  },
  STATE_DO_SOMETHING: 'call doSomething',
  STATE_DO_WITH_ARGS: 'call doWithArgs'
}


