/**
 * Created by Anoxic on 9/24/2017.
 *
 * Manager for loading data to cache
 */

import QueueStore from "../queue/QueueStore";
import GridStore from "../grid/GridStore";

function onQueueStoreChanged() {
  let store = QueueStore.getState();

  localStorage["queue"] = JSON.stringify(store.toJS());
}

function onGridStoreChanged() {
  let store = GridStore.getState();

  localStorage["grid"] = JSON.stringify(store.toJS());
}

QueueStore.addListener(onQueueStoreChanged);
GridStore.addListener(onGridStoreChanged);
