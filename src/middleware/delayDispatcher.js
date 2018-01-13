/**
 * Created by Anoxic on 1/12/2018.
 *
 * A middleware for delayed dispatch
 */

import DispatchType from "./DispatchType";
const BATCH_ACTION_TYPE = "isBatchAction";
const TIME_OUT = "timeout";
const DELAY_TYPE = "delayType";

// Copied and modified from npm "flux-delay-dispatcher"
delayDispatch._payloadQueue = {};
delayDispatch._callbackQueue = [];
delayDispatch._id = 0;

/**
 * Creates batch actions to be consumed by delayDispatch
 * @param actions
 */
export function createBatchActions(...actions) {
  return {
    [BATCH_ACTION_TYPE]: true,
    actions,
  };
}

export function createSpecialAction(action,
                                    type = DispatchType.REGULAR,
                                    timeout = 0) {
  return {
    ...action,
    [DELAY_TYPE]: type,
    [TIME_OUT]  : timeout,
  };
}

export function delayDispatch({dispatch, getState}) {
  function dispatchRegular(next, payload, delay = 0) {
    if (delay === 0) {
      next(payload);
      return;
    }

    let id = `${new Date().getTime()}-${delayDispatch._id++}`;
    let token = setTimeout(() => {
      _dispatchOnTimeout(next, id);
    }, delay);

    delayDispatch._payloadQueue[id] = {
      payload,
      token,
    };
  }

  /**
   * Dispatches the payload after all the delayed dispatches are done
   * @param payload
   */
  function dispatchOnClear(next, payload) {
    if (!willBeDispatching()) {
      next(payload);
      return;
    }

    delayDispatch._callbackQueue.push(payload);
  }

  /**
   * Returns if current dispatcher WILL be dispatching any payload
   */
  function willBeDispatching() {
    return (Object.keys(delayDispatch._payloadQueue).length !== 0);
  }

  /**
   * Dispatch only if no payloads are scheduled to be dispatched
   */
  function dispatchOnlyIfClear(next, payload, delay) {
    if (willBeDispatching()) {
      return;
    }

    dispatchRegular(next, payload, delay);
  }

  /**
   * Skips all the payloads in the queue and executes payloads originally
   * scheduled after those delayed payloads are dispatched
   */
  function clearAllDelayedPayloads(next) {
    _resetPayloadQueue();
    _dispatchQueue(next);
  }

  /**
   * Clears all the payloads originally scheduled after delayed payloads are
   * dispatched
   */
  function clearAllCallbackPayloads() {
    delayDispatch._callbackQueue = [];
  }

  /**
   * Clears all the payloads in the queue and payloads originally scheduled
   * after those delayed payloads are dispatched
   */
  function clearAllFuturePayloads() {
    _resetPayloadQueue();

    clearAllCallbackPayloads();
  }

  function _resetPayloadQueue() {
    for (let id in delayDispatch._payloadQueue) {
      if (delayDispatch._payloadQueue.hasOwnProperty(id)) {
        clearTimeout(delayDispatch._payloadQueue[id].token);
      }
    }
    delayDispatch._payloadQueue = {};
  }

  function _dispatchOnTimeout(next, id) {
    let {payload} = delayDispatch._payloadQueue[id];
    delete delayDispatch._payloadQueue[id];

    if (!willBeDispatching()) {
      _dispatchQueue(next);
    }

    next(payload);
  }

  /**
   * Dispatches all the payloads
   * @private
   */
  function _dispatchQueue(next) {
    for (let payload of delayDispatch._callbackQueue) {
      next(payload);
    }

    delayDispatch._callbackQueue = [];
  }

  /**
   * Resolves a batch of actions and return the LAST value
   * @param next
   * @param actions
   */
  function resolveBatchActions(next, actions) {
    for (let action of actions) {
      resolveObject(next, action);
    }
  }

  /**
   * Resolves the action and send it to dispatch
   * @param next
   * @param action
   */
  function resolveAction(next, action) {
    if (!action) {
      return;
    }

    let delayType = action[DELAY_TYPE] || DispatchType.REGULAR;
    let timeout = action[TIME_OUT] || 0;

    // Remove tags
    delete action[DELAY_TYPE];
    delete action[TIME_OUT];

    switch (delayType) {
      case DispatchType.REGULAR:
        dispatchRegular(next, action, timeout);
        break;
      case DispatchType.ON_CLEAR:
        dispatchOnClear(next, action);
        break;
      case DispatchType.ONLY_IF_CLEAR:
        dispatchOnlyIfClear(next, action, timeout);
        break;
      case DispatchType.OVERWRITE:
        clearAllFuturePayloads();
        dispatchRegular(next, action, timeout);
        break;
      default:
        dispatchRegular(next, action, timeout);
    }
  }

  /**
   * Resolves an action or a batch action
   * @param next
   * @param action
   */
  function resolveObject(next, action) {
    if (!action) {
      return;
    }

    // Handle batch actions
    if (action[BATCH_ACTION_TYPE]) {
      resolveBatchActions(next, action.actions);
      return;
    }

    resolveAction(next, action);
  }

  return next => action => {
    resolveObject(next, action);
  }
}

export default {
  createBatchActions,
  createSpecialAction,
  delayDispatch
};