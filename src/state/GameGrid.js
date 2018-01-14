/**
 * Created by Anoxic on 11/26/2017.
 *
 * A store to store the grid (and history) during a game
 */

import Immutable from "immutable";
import BaseGrid from "./BaseGrid";

const GameGridRecord = Immutable.Record({
  grid   : new BaseGrid(),
  queue  : Immutable.List(),

  // When the blocks are being eliminated, for example, it's considered busy
  busy: false,
});

class GameGrid extends GameGridRecord {
  isEmpty() {
    return this.get("grid").isEmpty();
  }
}

export default GameGrid;
