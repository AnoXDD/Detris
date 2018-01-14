/**
 * Created by Anoxic on 9/24/2017.
 *
 * Manager for loading data to cache
 */

import QueueStore from "../reducer/queue";
import GameGridStore from "../reducer/gameGrid";
import GameStateStore from "../reducer/game";

function onQueueStoreChanged() {
  // let store = QueueStore.getState().get("queue");
  //
  // localStorage["queue"] = JSON.stringify(store.toJS());
}

function onGridStoreChanged() {
  // let store = GameGridStore.getState();
  //
  // localStorage["grid"] = Grid.toCompressed(store);
}

function onGameStateChanged() {
  let store = GameStateStore.getState();

  localStorage["gameState"] = JSON.stringify(store.toJS());
}

// QueueStore.addListener(onQueueStoreChanged);
// GameGridStore.addListener(onGridStoreChanged);
// GameStateStore.addListener(onGameStateChanged);
