/**
 * Created by Anoxic on 9/22/2017.
 */

import Immutable from "immutable";
import Rotation from "../enum/Rotation";
import DetrominoType from "../enum/DetrominoType";

const DetrominoRecord = Immutable.Record({
  id      : -1, // Used to help generate correct id
  type    : DetrominoType.DEFAULT,
  rotation: Rotation.NONE,
  x       : 0, // The width position of top left pixel on grid
  y       : 0, // The height position of top left pixel on grid
}, "Detromino");

export default DetrominoRecord;