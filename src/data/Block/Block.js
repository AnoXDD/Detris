/**
 * Created by Anoxic on 9/21/2017.
 *
 * Represents a single block in the grid
 */

import Immutable from "immutable";
import BlockType from "../Detromino/DetrominoContext";
import Color from "../Color";

const BlockRecord = Immutable.Record({
  occupied: false,
  type    : BlockType.NONE,
  color   : Color.TRANSPARENT,
});

class Block extends BlockRecord {
  toggleOccupied() {
    return this.set("occupied", !this.get("occupied"));
  }

  isOccupied() {
    return this.get("occupied");
  }
}

export default Block;
