/**
 * Created by Anoxic on 1/15/2018.
 */

import Actions from "../data/Actions";
import {addIdToObject} from "../util/addIdToData";

const OverlayCallbackPresets = {
  PAUSE                       : Actions.pause,
  SHOW_DIALOG_FOR_END_TUTORIAL: Actions.showDialogForEndTutorial,

};

export default OverlayCallbackPresets;

