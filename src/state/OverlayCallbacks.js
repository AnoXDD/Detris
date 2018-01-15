/**
 * Created by Anoxic on 10/5/2017.
 *
 * Stores the callback function
 */

import Immutable from "immutable";

const NoOp = () => null;

const CallbackRecord = Immutable.Record({
  onDialogYes: NoOp,
  onDialogNo : NoOp,
  onBack     : NoOp,
  onQuit     : NoOp,
  onRestart  : NoOp,
  onDismiss  : NoOp, // tutorial
  onShowGuide: NoOp, // tutorial

  // <id{string}, string>, use mapPresets from overlay to process the content
  overlayCallbackRecordId: Immutable.Map(),
});

export default CallbackRecord;
