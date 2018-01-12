/**
 * Created by Anoxic on 9/26/2017.
 *
 * Stores the button for one level when the user is selecting a level
 */

import Immutable from "immutable";

const LevelViewUnitRecord = Immutable.Record({
  id         : -1,
  levelNumber: -1,
  completed  : false,
});

export default LevelViewUnitRecord;