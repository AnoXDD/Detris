/**
 * Created by Anoxic on 10/4/2017.
 */

import Immutable from "immutable";

const DialogRecord = Immutable.Record({
  active: false,
  title : "",

  onYes: () => {
  },
  onNo : () => {
  },
});

export default DialogRecord;