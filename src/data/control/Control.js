/**
 * Created by Anoxic on 10/12/2017.
 */

import Immutable from "immutable";

const NoOp = () => {
};

const ControlRecord = Immutable.Record({
  rotate         : NoOp,
  done           : NoOp,
  move           : NoOp,
  toggleEditBlock: NoOp,
  chooseEditBlock: NoOp,
  nextDetromino  : NoOp,
  prevDetromino  : NoOp,
});

export default ControlRecord;