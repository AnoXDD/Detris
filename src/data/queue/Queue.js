/**
 * Created by Anoxic on 10/18/2017.
 */

import Immutable from "immutable";
import History from "../History";

const QueueRecord = Immutable.Record({
  // A list of {DetrominoType}
  queue  : Immutable.List(),
  history: new History(),
});

export default QueueRecord;
