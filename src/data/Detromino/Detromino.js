/**
 * Created by Anoxic on 9/22/2017.
 */

import Immutable from "immutable";

import DetrominoContext from "./DetrominoContext";
import Color from "../Color";
import Block from "../Block/Block";
import BlockType from "../Block/BlockType";

const DetrominoRecord = Immutable.Record({
  id      : -1, // Used to help generate correct id
  type    : DetrominoContext.Type.DEFAULT,
  rotation: DetrominoContext.Rotation.NONE,
  x       : 0, // The width position of top left pixel on grid
  y       : 0, // The height position of top left pixel on grid
});

function rotateBlock(blocks, rotation) {
  // todo: implement this
  if (rotation === DetrominoContext.Rotation.NONE) {
    return blocks;
  }
}

class Detromino extends DetrominoRecord {
  /**
   * Returns a vector of Block.
   * This function assumes that the positions of blocks are valid
   * @param color
   */
  getRotatedBlocks(color = Color.SOLID) {
    let shape = DetrominoContext.Shape[this.get("type")]
      .map(arr => arr.slice());
    let rotation = this.get("rotation");

    // Mark the sequence id of each block in the detromino
    let id = 1;
    for (let x = 0; x < shape.length; ++x) {
      for (let y = 0; y < shape[x].length; ++y) {
        shape[x][y] = shape[x][y] && id++;
      }
    }

    shape = rotateBlock(shape, rotation);

    // Generate blocks
    let blocks = [];
    let x = this.get("x");
    let y = this.get("y");
    id = this.get("id");
    for (let dx = 0; dx < shape.length; ++dx) {
      for (let dy = 0; dy < shape[dx].length; ++dy) {
        blocks.push(new Block({
          id      : `${id}-${shape[dx][dy]}`,
          occupied: true,
          type    : BlockType.DETROMINO,
          color,
          x       : x + dx,
          y       : y + dy,
        }));
      }
    }

    return blocks;
  }
}

export default new Detromino();