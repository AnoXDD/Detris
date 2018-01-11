/**
 * Created by Anoxic on 11/26/2017.
 *
 * A store to store the grid (and history) during a game
 */

import Immutable from "immutable";
import BaseGrid from "../BaseGrid";
import History from "../../History";

const GameGridRecord = Immutable.Record({
  grid   : new BaseGrid(),
  history: new History(),
});

class GameGrid extends GameGridRecord {
  isEmpty() {
    return this.get("grid").isEmpty();
  }
}

export default GameGrid;
