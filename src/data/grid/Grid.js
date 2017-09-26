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

const GridDataRecord = Immutable.Record({
  grid     : Immutable.Map(),
  detromino: new Detromino(),
});

class Grid extends GridDataRecord {
  /**
   * Returns a compressed string of Grid object
   */
  static toCompressed(data) {
    data = JSON.stringify(data.toJS());
    return zlib.deflateSync(data).toString("base64");
  }

  /**
   * Returns a Grid object from compressed data
   */
  static fromCompressed(data) {
    try {
      let str = zlib.inflateSync(new Buffer(data, "base64")).toString();
      let state = JSON.parse(str);
      state.detromino = new Detromino(state.detromino);
      let ids = Object.keys(state.grid);
      for (let id of ids) {
        state.grid[id] = new Block(state.grid[id]);
      }

      state.grid = Immutable.fromJS(state.grid);

      return new Grid(state);
    } catch (e) {
      console.error(e);
      return new Grid();
    }
  }
}

export default Grid;