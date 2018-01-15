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

  // Keep track of the action type passed
  history: Immutable.OrderedSet(),
});

export default CallbackRecord;
