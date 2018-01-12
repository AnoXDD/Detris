/**
 * Created by Anoxic on 9/23/2017.
 */

// Note that on the grid, the actual size will be rotated 90 deg cw
const DetrominoShape = {
  DEFAULT: [[]],
  I      : [[1], [1], [1], [1]],
  O      : [[1, 1], [1, 1]],
  T      : [[0, 1], [1, 1], [0, 1]],
  S      : [[1, 0], [1, 1], [0, 1]],
  Z      : [[0, 1], [1, 1], [1, 0]],
  L      : [[1, 1], [0, 1], [0, 1]],
  J      : [[0, 1], [0, 1], [1, 1]],
};

export default DetrominoShape;
