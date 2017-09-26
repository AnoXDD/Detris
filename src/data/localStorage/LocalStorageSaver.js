/**
 * Created by Anoxic on 9/24/2017.
 *
 * Manager for loading data to cache
 */

import QueueStore from "../queue/QueueStore";
import GridStore from "../grid/GridStore";
import Grid from "../grid/Grid";
import GameStateStore from "../game/GameStateStore";

function onQueueStoreChanged() {
  let store = QueueStore.getState();

  localStorage["queue"] = JSON.stringify(store.toJS());
}

function onGridStoreChanged() {
  let store = GridStore.getState();

  localStorage["grid"] = Grid.toCompressed(store);
}

function onGameStateChanged() {
  let store = GameStateStore.getState();

  localStorage["gameState"] = JSON.stringify(store.toJS());
}

QueueStore.addListener(onQueueStoreChanged);
GridStore.addListener(onGridStoreChanged);
GameStateStore.addListener(onGameStateChanged());
