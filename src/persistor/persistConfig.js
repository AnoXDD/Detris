/**
 * Created by Anoxic on 1/14/2018.
 */

export function stateReconciler(inboundState,
                                originalState,
                                reducedState) {
  return inboundState.merge(originalState).merge(reducedState);
}

export default {
  stateReconciler,
};