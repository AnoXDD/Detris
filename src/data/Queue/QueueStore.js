/**
 * Created by Anoxic on 9/24/2017.
 *
 * A store for the queue holding detrominos
 */


import Immutable from "immutable";
import {ReduceStore} from "flux/utils";
import Dispatcher from "../Dispatcher";

class QueueStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {

  }
}

export default new QueueStore();