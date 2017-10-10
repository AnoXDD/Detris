/**
 * Created by Anoxic on 9/22/2017.
 */

import Immutable from "immutable";

import Color from "../enum/Color";
import Rotation from "../enum/Rotation";

import Block from "../block/Block";
import BlockType from "../block/BlockType";
import DetrominoType from "./DetrominoType";
import DetrominoShape from "./DetrominoShape";
import Algorithm from "../Algorithm";
import GridSize from "../grid/GridSize";

const DetrominoRecord = Immutable.Record({
  id      : -1, // Used to help generate correct id
  type    : DetrominoType.DEFAULT,
  rotation: Rotation.NONE,
  x       : 0, // The width position of top left pixel on grid
  y       : 0, // The height position of top left pixel on grid
});

class Detromino extends DetrominoRecord {

  /**
   * Returns the original width, regardless of its rotation
   */
  originalWidth() {
    return DetrominoShape[this.get("type")][0].length;
  }

  /**
   * Returns the original height, regardless of its height
   */
  originalHeight() {
    return DetrominoShape[this.get("type")].length;
  }

  isRotated90Or270() {
    let rotation = this.get("rotation");
    return rotation === Rotation.DEG_90 || rotation === Rotation.DEG_270;
  }

  /**
   * Returns the width after rotation
   */
  width() {
    if (this.isRotated90Or270()) {
      return this.originalHeight();
    }

    return this.originalWidth();
  }

  /**
   * Returns the height after rotation
   */
  height() {
    if (this.isRotated90Or270()) {
      return this.originalWidth();
    }

    return this.originalHeight();
  }

  /**
   * Returns a vector of Block.
   * This function assumes that the positions of blocks are valid
   */
  getRotatedBlocks(type = BlockType.DETROMINO, color = Color.SOLID) {
    let shape = DetrominoShape[this.get("type")]
      .map(arr => arr.slice());
    let rotation = this.get("rotation");

    // Mark the sequence id of each block in the detromino
    let id = 1;
    for (let x = 0; x < shape.length; ++x) {
      for (let y = 0; y < shape[x].length; ++y) {
        shape[x][y] = shape[x][y] && id++;
      }
    }

    shape = Algorithm.rotate(shape, rotation);

    // Generate blocks
    let map = Immutable.Map();
    let x = this.get("x");
    let y = this.get("y");
    let detrominoId = this.get("id");
    for (let dx = 0; dx < shape.length; ++dx) {
      for (let dy = 0; dy < shape[dx].length; ++dy) {
        if (!shape[dx][dy]) {
          continue;
        }

        let id = `${detrominoId}-${shape[dx][dy]}`;
        map = map.set(id, new Block({
          id,
          occupied: true,
          type,
          color,
          x       : x + dx,
          y       : y + dy,
        }));
      }
    }

    return map;
  }

  /**
   * Given the width of the grid, returns the position of this detromino's
   * leftmost block on the grid if this detromino is to be placed in the
   * middle. If it can't be placed exactly in the middle, shift it left by one
   * block.
   * @param gridWidth
   */
  getMiddleXPos(gridWidth = GridSize.WIDTH) {
    // todo: implement this
    return 0;
  }
}

export default Detromino;