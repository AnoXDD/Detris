/**
 * Created by Anoxic on 1/13/2018.
 *
 * Merge callback props to an actual dispatch event
 */

export function simpleDispatchToProps(dispatch) {
  return {dispatch,};
}

/**
 * Returns a function to be used to merge props from key
 * @param key
 */
export function mergePropsFromKey(key) {
  return (stateProps, dispatchProps) => {

    let {dispatch} = dispatchProps;
    let callback = stateProps[key];

    let keys = Object.keys(callback);

    for (let key of keys) {
      let action = callback[key];
      if (typeof action === "function") {
        callback[key] = (...args) => {
          dispatch(action(...args));
        };
      }
    }

    stateProps.callback = callback;

    // This is to avoid delete dispatch from the original props
    let newDispatchProps = {...dispatchProps};
    delete newDispatchProps.dispatch;
    return {...stateProps, ...newDispatchProps};
  }
}

export default {
  simpleDispatchToProps,
  mergePropsFromKey
};