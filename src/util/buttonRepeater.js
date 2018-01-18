/**
 * Created by Anoxic on 1/16/2018.
 *
 * This class has a function that is really interesting: return an object with
 * two functions yet to be called. Let's call these two functions mouseup and
 * mousedown. What mouseup does is to fire a single event repeatedly until
 * mousedown is called. The challenge is to pass the id of mouseup to mousedown
 * in the runtime.
 */

import store from "../store/store";

const FIRST_TIMEOUT = 300;
const INTERVAL = 100;

/**
 * Creates mousedown event
 * @param {function} action
 * @return {function()}
 */
function createMouseDown(action) {
  let isTouched = false,
    /**
     * Returns true if another touch event is taking place
     * @returns {boolean}
     */
    isBeingTouched = () => {
      if (!isTouched) {
        isTouched = true;
        setTimeout(() => {
          isTouched = false;
        }, 200);
        return false;
      }

      return true;
    };

  return {
    onMouseDown: e => {
      if (isBeingTouched()) {
        return false;
      }

      store.dispatch(action());

      createMouseDown.timeoutId = setTimeout(() => {
        createMouseDown.intervalId = setInterval(() => {
          store.dispatch(action());
        }, INTERVAL);

        console.log("interval", createMouseDown.intervalId);
        console.log("timeout", createMouseDown.timeoutId);
      }, FIRST_TIMEOUT);
    },
    getTimeout : () => {
      return createMouseDown.timeoutId;
    },
    getInterval: () => {
      return createMouseDown.intervalId;
    }
  };
}

/**
 * Generates a pair of mouse event for continuously firing the same event
 * @param {function} action
 */
export function generateRepeaterEvent(action) {
  let {onMouseDown, getTimeout, getInterval} = createMouseDown(action);

  return {
    onMouseDown : onMouseDown,
    onTouchStart: onMouseDown,
    onMouseUp   : () => {
      clearTimeout(getTimeout());
      clearInterval(getInterval());
    },
    onTouchEnd  : () => {
      clearTimeout(getTimeout());
      clearInterval(getInterval());
    },
  };
}

export default {
  generateRepeaterEvent,
};