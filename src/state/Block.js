/**
 * Created by Anoxic on 9/21/2017.
 *
 * Represents a single block in the grid
 */

import Immutable from "immutable";
import Color from "../enum/Color";
import BlockType from "../enum/BlockType";

const BlockRecord = Immutable.Record({
  id      : -1,
  occupied: false,
  type    : BlockType.NONE,
  color   : Color.TRANSPARENT,
  x       : 0,
  y       : 0,
}, "Block");

export default BlockRecord;
