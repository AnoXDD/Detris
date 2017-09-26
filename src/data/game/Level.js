/**
 * Created by Anoxic on 9/26/2017.
 */

import Immutable from "immutable";

const LevelRecord = Immutable.Record({
  id         : -1,
  levelNumber: -1,

  finished: false,
  data    : null,
});

export default class Level extends LevelRecord {
  isFinished() {
    return this.get("finished");
  }
}