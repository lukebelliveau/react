/**
 * Copyright 2016, Luke Belliveau.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Trace
 */

var warning = require('fbjs/lib/warning');

const toggles = {
  ReactBrowserEventEmitter: {
    listenTo: true,
  },
  ReactFiberReconciler: {
    scheduleTopLevelUpdate: true,
    findHostInstance: true,
    updateContainer: true,
  },
  ReactFiberUpdateQueue: {
    addTopLevelUpdate: true,
  },
  ReactFiberScheduler: {
    scheduleUpdate: true,
    scheduleRoot: true,
    performWork: true,
  },
  ReactDOMEventListener: {
    trapCapturedEvent: true,
  },
  ReactDOMFiber: {
    render: false,
    validateContainer: false,
    renderSubtreeIntoContainer: false,
  },
  ReactFiberClassComponent: {
    callComponentWillMount: true,
  },
};

const concatenateArgs = (arrayOfStrings) => {
  let concatenated = '';
  arrayOfStrings.forEach(argument => {
    //exclude callback functions passed in with args
    if (typeof argument === 'string') {
      concatenated += argument + '.';
    }
  });

  return concatenated.slice(0, concatenated.length - 1);
};

const Trace = (...args) => {
  if (args.length === 0) return;

  let callback = '';
  const lastArg = args[args.length - 1];
  if (typeof lastArg === 'function') {
    callback = lastArg;
  }

  let i = 0;
  let container = toggles;
  let key = args[i];
  let stringToPrint;
  while (i < args.length) {
    if (container && key && container[key] === true) {
      stringToPrint = concatenateArgs(args, !callback === '');
      print(stringToPrint, callback);
      return;
    } else if (container && key && container[key] === false) {
      return;
    } else {
      i++;
      if (container && key) {
        container = container[key];
        key = args[i];
      }
    }
  }
  console.warn(`You\'re missing a flag for a Trace at ${args[0]}: ${ stringToPrint }. You should update or delete this Trace call.`);
};

const print = (areaTraced, moreInfoCallback) => {
  console.log('*****************************************************');
  console.log(areaTraced);
  console.log('*****************************************************');
  if (typeof moreInfoCallback === 'function') {
    moreInfoCallback();
  }
};

module.exports = Trace;
