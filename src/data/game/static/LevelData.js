/**
 * Created by Anoxic on 9/26/2017.
 *
 * A class for holding the actual data for each level
 */

import Immutable from "immutable";
import Tokenizer from "../../Tokenizer";
import LevelDataUnit from "../level/LevelDataUnit";

const RawData = Immutable.fromJS({
  // key is id of `LevelViewUnit`
  // string is compressed string of grid
  level: {
    1: "eJwdkMtygjAAAP+FK51BHa3gjIegTBUCGnmIdnqg4RUIQogQodN/r/a0hz3t/kisS7pEWkmJOcCgN0OS+QDIe90D67X0JmUtif+tcMY7P2QEAODoyjw+z2g5pb3nRxXV7QhTVVVrQSYo5HGkTJVqo4qdy/Rvjkz8nrSz6xghjvHyYBu3wwZOLkvdURa1PXXiD1SARTS4S7zrygYTUoTbNMSEt0dDPAaZ14bVZGQoTV+pvCur8tSz81ueBueHUSAi7830okFsPeZ7TNliGzsCFk5A9Dvt7J51O+WWAk1gcNweL8+qMhmk1eeruQ0Ia6CRB5zCIdDMk8Xr3nVHc7Q1jxcQ+VGDnjw96fPCmjDgg3kpLPn15+v3D0icbHU="
  },
});

const LevelData = {
  /**
   * Reads the level from data and return width, height, detromino queue and
   * grid
   * @param level
   * @return {Immutable.Map<string, any>|LevelDataUnit}
   */
  getLevel(level) {
    let rawData = RawData.get("level").get(`${level}`);

    // todo implement this when more data become available
    if (!rawData) {
      return new LevelDataUnit();
    }

    // Trying to convert it
    return Tokenizer.tokenizeLevelDataUnit(rawData);
  },
};

export default LevelData;
