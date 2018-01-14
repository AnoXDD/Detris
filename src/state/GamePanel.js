/**
 * Created by Anoxic on 11/26/2017.
 *
 * A store to store the grid during a game
 */

import Immutable from "immutable";
import BaseGrid from "./BaseGrid";

const GamePanelRecord = Immutable.Record({
  grid   : new BaseGrid(),
  queue  : Immutable.List(),

  // When the blocks are being eliminated, for example, it's considered busy
  busy: false,
});

class GamePanel extends GamePanelRecord {
  isEmpty() {
    return this.get("grid").isEmpty();
  }
}

export default GamePanel;
