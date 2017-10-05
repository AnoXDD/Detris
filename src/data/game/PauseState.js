/**
 * Created by Anoxic on 10/4/2017.
 */

import Immutable from "immutable";
import Actions from "../enum/Actions";

const PauseRecord = Immutable.Record({
  active : false,
  onPause: Actions.pause,
});

export default PauseRecord;
