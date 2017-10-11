/**
 * Created by Anoxic on 9/26/2017.
 *
 * A class for compressed grid data for easy storage
 */

import Immutable from "immutable";
import {Buffer} from "buffer";
import zlib from "zlib";

import Detromino from "../detromino/Detromino";
import Block from "../block/Block";
import BlockType from "../block/BlockType";
import Color from "../enum/Color";

const GridDataRecord = Immutable.Record({
  grid     : Immutable.Map(),
  detromino: new Detromino(),
});

class Grid extends GridDataRecord {
  /**
   * Returns a compressed string of Grid object. It will store the grid data
   * into a minimized 2d array
   */
  static toCompressed(data) {
    data = data.toJS();

    let {grid} = data;
    let ids = Object.keys(grid);

    let target = [], original = [];
    for (let id of ids) {
      let {x, y} = grid[id];

      switch (grid[id].type) {
        case BlockType.TARGET:
          target[x] = target[x] || [];
          target[x][y] = 1;
          break;
        case BlockType.ORIGINAL:
          original[x] = original[x] || [];
          original[x][y] = 1;
          break;
        default:
          break;
      }
    }

    // Fill undefined with 0
    target = target.map(row => row.map(a => a || 0));
    original = original.map(row => row.map(a => a || 0));

    data.target = target;
    data.original = original;

    delete data["grid"];

    return zlib.deflateSync(JSON.stringify(data)).toString("base64");
  }

  /**
   * Returns a Grid object from compressed data
   */
  static fromCompressed(data) {
    try {
      let str = zlib.inflateSync(new Buffer(data, "base64")).toString();
      let state = JSON.parse(str);
      state.detromino = new Detromino(state.detromino);

      let {target = [], original = []} = state;
      let grid = {};
      for (let x = 0; x < target.length; ++x) {
        if (!target[x]) {
          continue;
        }

        for (let y = 0; y < target[x].length; ++y) {
          // Reconstruct Block object.
          let id = `${new Date().getTime()}-${x}-${y}`;
          if (target[x][y]) {
            grid[id] = new Block({
              id, x, y,
              type : BlockType.TARGET,
              color: Color.SOLID,
            });
          } else if (original[x][y]) {
            grid[id] = new Block({
              id, x, y,
              type : BlockType.ORIGINAL,
              color: Color.SOLID,
            });
          }
        }
      }

      state.grid = Immutable.fromJS(grid);

      return new Grid(state);
    } catch (e) {
      console.error(e);
      return new Grid();
    }
  }
}

export default Grid;