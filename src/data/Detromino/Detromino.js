/**
 * Created by Anoxic on 9/22/2017.
 */

import Immutable from "immutable";

import DetrominoContext from "./DetrominoContext";

const DetrominoRecord = Immutable.Record({
  type    : DetrominoContext.Type.DEFAULT,
  rotation: DetrominoContext.Rotation.NONE,
  x       : 0, // The width position of top left pixel on grid
  y       : 0, // The height position of top left pixel on grid
});

class Detromino extends DetrominoRecord {
  getRotatedShape() {
    let shape = DetrominoContext.Shape[this.get("type")];
    let rotation = this.get("rotation");

    if (rotation === DetrominoContext.Rotation.NONE) {
      return shape;
    }

    // todo: apply rotation

    return shape;
  }
}

export default new Detromino();