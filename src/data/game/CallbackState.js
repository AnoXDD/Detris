/**
 * Created by Anoxic on 10/5/2017.
 *
 * Stores the callback function
 */

import Immutable from "immutable";

const NoOp = () => {
};

const CallbackRecord = Immutable.Record({
  onDialogYes   : NoOp,
  onDialogNo    : NoOp,
  onBack        : NoOp,
  onQuit        : NoOp,
  onImportExport: NoOp,
});

export default CallbackRecord;
