/**
 * Created by Anoxic on 10/5/2017.
 *
 * Stores the callback function
 */

import Immutable from "immutable";


const CallbackRecord = Immutable.Record({
  onDialogYes: null,
  onDialogNo : null,
  onBack     : null,
  onQuit     : null,
  onRestart  : null,
  onDismiss  : null, // tutorial
  onShowGuide: null, // tutorial
});

export default CallbackRecord;
