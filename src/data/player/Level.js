/**
 * Created by Anoxic on 9/26/2017.
 *
 * Stores the user data about level
 */

import Immutable from "immutable";

const LevelRecord = Immutable.Record({
  id         : -1,
  levelNumber: -1,

  finished: false,
});

export default class Level extends LevelRecord {
  isFinished() {
    return this.get("finished");
  }
}