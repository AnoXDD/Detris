/**
 * Created by Anoxic on 9/24/2017.
 *
 * Manager for loading data to cache
 */

import QueueStore from "../reducer/queue";
import GamePanelStore from "../reducer/gamePanel";
import GameStateStore from "../reducer/game";

function onQueueStoreChanged() {
  // let store = QueueStore.getState().get("queue");
  //
  // localStorage["queue"] = JSON.stringify(store.toJS());
}

function onGridStoreChanged() {
  // let store = GamePanelStore.getState();
  //
  // localStorage["grid"] = Grid.toCompressed(store);
}

function onGameStateChanged() {
  let store = GameStateStore.getState();

  localStorage["gameState"] = JSON.stringify(store.toJS());
}

// QueueStore.addListener(onQueueStoreChanged);
// GamePanelStore.addListener(onGridStoreChanged);
// GameStateStore.addListener(onGameStateChanged);
