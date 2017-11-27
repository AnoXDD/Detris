/**
 * Created by Anoxic on 9/26/2017.
 *
 * A class for compressed grid data for easy storage. This is a grid wrapper
 * for the grid and detromino on the grid. This class also serves as a base
 * grid class in other types of grids
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
  detromino: null,

  /**
   * Read only matrix. Should be kept synced with `grid` by calling Algorithm.
   */
  matrix: [],
});

class Grid extends GridDataRecord {

  /**
   * Return if the grid is empty
   * @return {*|boolean}
   */
  isEmpty() {
    return this.get("grid").isEmpty();
  }
}

export default Grid;