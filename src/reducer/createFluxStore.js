/**
 * Created by Anoxic on 1/11/2018.
 */

import {ReduceStore} from "flux/utils";
import Dispatcher from "../data/Dispatcher";

export default function createFluxStore(reducer, initValue) {
  class MyStore extends ReduceStore {
    constructor() {
      super(Dispatcher);
    }

    getInitialState() {
      return initValue;
    }

    reduce(state, action) {
      return reducer(state, action);
    }
  }

  return new MyStore();
}