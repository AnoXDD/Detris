/**
 * Created by Anoxic on 12/31/2017.
 *
 * Stores the state of current tutorial. Also acts as a helper for next state
 */

import Immutable from "immutable";
import TutorialProgress from "../enum/TutorialProgress";
import TutorialGuidePosition from "../enum/TutorialGuidePosition";

const TutorialStateRecord = Immutable.Record({
  progress: TutorialProgress.TUTORIAL_INTRO,
  position: TutorialGuidePosition.TOP,
});

export default TutorialStateRecord;
