/**
 * Created by Anoxic on 9/21/2017.
 *
 * Represents a single block in the grid
 */

import Immutable from "immutable";
import Color from "../Color";

const Block = Immutable.Record({
  occupied: false,
  color   : Color.TRANSPARENT,
});

export default Block;
