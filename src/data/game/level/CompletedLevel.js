/**
 * Created by Anoxic on 1/10/2018.
 *
 * A immutable record to store data of completed level
 */

import Immutable from "immutable";

const CompletedLevelRecord = Immutable.Record({
  id    : -1,
  noUndo: true,
});

export default CompletedLevelRecord;