/**
 * Created by Anoxic on 10/25/2017.
 *
 * A class to pack info about a general level data
 */

import Immutable from "immutable";

import Grid from "./BaseGrid";
import GridSize from "../enum/GridSize";

const LevelDataUnitRecord = Immutable.Record({
  width : GridSize.WIDTH,
  height: GridSize.HEIGHT,
  queue : Immutable.List(),
  grid  : new Grid(),
  /** A list of detrominos */
  key   : Immutable.List(),
});

export default LevelDataUnitRecord;