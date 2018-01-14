/**
 * Created by Anoxic on 9/26/2017.
 *
 * A class for compressed grid data for easy storage. This is a grid wrapper
 * for the grid and detromino on the grid. This class also serves as a base
 * grid class in other types of grids
 */

import Immutable from "immutable";

const GridDataRecord = Immutable.Record({
  /* Each entry is a pair of [id (type of string), Block] */
  grid     : Immutable.Map(),
  detromino: null,

  /**
   * Read only matrix. Should be kept synced with `grid` by calling Algorithm.
   */
  matrix: [],
});

export default GridDataRecord;