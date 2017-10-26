/**
 * Created by Anoxic on 10/25/2017.
 *
 * A class to pack info about a level
 */

import Immutable from "immutable";

import Queue from "../../queue/Queue";
import Grid from "../../grid/Grid";

const LevelDataUnitRecord = Immutable.Record({
  queue: new Queue(),
  grid : new Grid(),
  /** A list of detrominos */
  key  : Immutable.List(),
});

export default LevelDataUnitRecord;