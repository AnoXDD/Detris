/**
 * Created by Anoxic on 1/13/2018.
 *
 * Merge callback props to an actual dispatch event
 */

export function dispatchToProps(dispatch) {
  return {dispatch,};
}

/**
 * Returns a function to be used to merge props from key
 * @param key
 */
export function mergePropsFromKey(key) {
  return (stateProps, dispatch) => {
    dispatch = dispatch.dispatch;
    let callback = stateProps[key];

    let keys = Object.keys(callback);

    for (let key of keys) {
      let action = callback[key];
      callback[key] = () => {
        dispatch(action());
      };
    }

    stateProps.callback = callback;

    return stateProps;
  }
}

export default {
  dispatchToProps,
  mergePropsFromKey
};