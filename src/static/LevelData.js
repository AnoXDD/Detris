/**
 * Created by Anoxic on 9/26/2017.
 *
 * A class for holding the actual data for each level
 */

import Immutable from "immutable";
import LevelDataUnit from "../state/LevelDataUnit";
import LevelDataUnitTokenizer from "../tokenizer/LevelDataUnitTokenizer";

const FIRST_LEVEL_ID = "1";
// todo change it to the real one
const LAST_LEVEL_ID = "24";

const RawData = Immutable.fromJS({
  // key is id of `LevelViewUnit`
  // string is compressed string of grid
  level: {
    [FIRST_LEVEL_ID]: "eJwdkMtygjAAAP+Fq50BUabijIeA2kJCECLB0ukhVcCg5RVBSaf/XvW0hz3t/ipNl3apMldSd0C0dyOeRwCYwArzxUJ5UfKWH572iuVJkJwDALD9KqCOs49bbehWwxJIBlQg1QmZ67YrjHVzkpepZRKy1gEaKs9ndodLfsmYpEBeRfhT2KL3KHjjVO40W9XGSzpayWhTHDvsVI3TTLXYZImmBl1RYnkrOQyN0kgdvi6DQMvYpG67eKlR7iY+w/ssmXUD9OxL0/unVnjfVZ4k4+FmlODd2p6hFx82M6JaaKqOdoHuB8+6Uzoo889He0t5U6PVkYozGih2QyiqnhDpSs/cigIFEauDO+M7I1FArQURmCZ7OHt8+vr7BwRmbXM=",
    "2"             : "eJydkMtugkAARf+FrU14WYEmLlARBAZEZCw0XaAMyEMQhodD038vtX/Q1Vnc5NzkfFF1hzpEvVFIJybsdY9JtPQky7o0aDT1QiVNGj3XwRpzzk4y2ZettRDZOD9gFGdVbibkarT+1nDZxEiT9ysmrB36D57l0VpijKJIYFiBHilQaPJgx0VgHmryQRvprpytarAJO7yvkDwI/aatnTIo4xxoEYrUkyPOCD9uQsi15ny/6nKvXdkBUVgQDscBw5H0bHgrVNYtnUW38EgcH8624m/hKxACEsN0dlGVR2s9eBGoreq7mhdIN40/7dt1Ox2eL4N4D/aXhuXoHQYKVxI9LlaPxdFhcAV7TWBowsEtlyyXU40cEert47dVA9P6bipXiAuTQEs/GLjqXXfURyAdcWY6Xnh3Jp4mejgzmEb25HlwMcQ/038U9VPhGaIzKT6/fwDeZpXh",
  },
});

const LevelData = {
  /**
   * Reads the levelId from data and return width, height, detromino queue and
   * grid
   * @param levelId
   * @return {Immutable.Map<string, any>|LevelDataUnit}
   */
  getLevelById(levelId) {
    let rawData = RawData.get("level").get(`${levelId}`);

    // todo implement this when more data become available
    if (!rawData) {
      return new LevelDataUnit();
    }

    // Trying to convert it
    return LevelDataUnitTokenizer.tokenizeLevelDataUnit(rawData);
  },

  firstLevelId() {
    return FIRST_LEVEL_ID;
  },

  lastLevelId() {
    return LAST_LEVEL_ID;
  },
};

export default LevelData;
