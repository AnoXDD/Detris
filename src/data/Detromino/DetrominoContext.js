/**
 * Created by Anoxic on 9/22/2017.
 *
 * A class to hold the properties with grid
 */

const DetrominoContext = {
  "Type"    : {
    DEFAULT: "?",
    I      : "I",
    O      : "O",
    T      : "T",
    S      : "S",
    Z      : "Z",
    J      : "J",
    L      : "L",
  },
  "Rotation": {
    DEFAULT: 0,
    NONE   : 0,
    DEG_90 : 90,
    DEG_180: 180,
    DEG_270: 270,
  },
  "Shape"   : {
    DEFAULT: [1],
    I      : [1, 1, 1, 1],
    O      : [[1, 1], [1, 1]],
    T      : [[0, 1, 0], [1, 1, 1]],
    S      : [[0, 1, 1], [1, 1, 0]],
    Z      : [[1, 1, 0], [0, 1, 1]],
    J      : [[0, 1], [0, 1], [1, 1]],
    L      : [[1, 0], [1, 0], [1, 1]],
  }
};

export default DetrominoContext;