/**
 * Created by Anoxic on 10/25/2017.
 *
 * A class to pack info about a level
 */

import Immutable from "immutable";

import Queue from "../../../state/Queue";
import Grid from "../../../state/BaseGrid";
import GridSize from "../../../enum/GridSize";

const LevelDataUnitRecord = Immutable.Record({
  width : GridSize.WIDTH,
  height: GridSize.HEIGHT,
  queue : new Queue(),
  grid  : new Grid(),
  /** A list of detrominos */
  key   : Immutable.List(),
});

export default LevelDataUnitRecord;