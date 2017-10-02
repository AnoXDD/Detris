/**
 * Created by Anoxic on 9/26/2017.
 *
 * A class for holding the actual data for each level
 */

import Immutable from "immutable";
import GridSize from "../../grid/GridSize";

const RawData = Immutable.fromJS({
  // key is id of `LevelViewUnit`
  // string is compressed string of grid
  level: {},
});

const LevelData = {
  /**
   * Reads the level from data and return width, height, detromino queue and
   * grid
   * @param level
   */
  getLevel(level) {
    let rawData = RawData.get("level")[level];

    // todo implement this when more data become available

    let data = {
      width    : GridSize.WIDTH,
      height   : GridSize.HEIGHT,
      queueList: Immutable.fromJS([]),
      blockList: Immutable.fromJS({}),
    };

    return data;
  },
};

export default LevelData;
