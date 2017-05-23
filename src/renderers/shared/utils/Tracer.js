/**
 * Copyright 2016, Luke Belliveau.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Tracer
 */

const toggles = {
  ReactBrowserEventEmitter: {
    listenTo: true,
  },
  ReactFiberReconciler: {
    scheduleTopLevelUpdate: true,
    findHostInstance: true,
  },
  ReactFiberUpdateQueue: {
    addTopLevelUpdate: true,
  },
  ReactFiberScheduler: {
    scheduleUpdate: true,
  },
  ReactDOMEventListener: {
    trapCapturedEvent: true,
  },
};

const Tracer = {
  ReactBrowserEventEmitter: {
    listenTo: () => toggles.ReactBrowserEventEmitter.listenTo ? print('ReactBrowserEventEmitter.listenTo()') : () => {},
  },
  ReactFiberReconciler: {
    scheduleTopLevelUpdate: () => toggles.ReactFiberReconciler.scheduleTopLevelUpdate ?
      print('ReactFiberReconciler.scheduleTopLevelUpdate()') : () => {},
    findHostInstance: () => toggles.ReactFiberReconciler.findHostInstance ?
      print('ReactFiberReconciler.findHostInstance()') : () => {},
  },
  ReactFiberUpdateQueue: {
    addTopLevelUpdate: () => toggles.ReactFiberUpdateQueue.addTopLevelUpdate ?
      print('ReactFiberUpdateQueue.addTopLevelUpdate()') : () => {},
  },
  ReactFiberScheduler: {
    scheduleUpdate: (callback) => toggles.ReactFiberScheduler.scheduleUpdate ?
      print('ReactFiberScheduler.scheduleUpdate()', callback) : () => {},
  },
  ReactDOMEventListener: {
    trapCapturedEvent: (callback) => toggles.ReactDOMEventListener.trapCapturedEvent ?
      print('ReactDOMEventListener.trapCapturedEvent()', callback) : () => {},
  },
};

const print = (areaTraced, moreInfoCallback) => {
  console.log(areaTraced);
  console.log('*****************************************************');
  if (moreInfoCallback) moreInfoCallback();
};

module.exports = Tracer;
