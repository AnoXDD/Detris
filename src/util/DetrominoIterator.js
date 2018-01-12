/**
 * Created by Anoxic on 10/18/2017.
 *
 * A class used for iterating over detromino shapes
 */

import DetrominoType from "../enum/DetrominoType";

const detrominoTypes = Object.values(DetrominoType).slice(1);

export default class DetrominoIterator {

  length = detrominoTypes.length;
  index = 0;

  constructor(type) {
    if (!type) {
      return;
    }

    this.index = detrominoTypes.findIndex(type);

    if (this.index === -1) {
      this.index = 0;
    }
  }

  prev() {
    if (--this.index < 0) {
      this.index = this.length - 1;
    }
  }

  next() {
    if (++this.index >= this.length) {
      this.index = 0;
    }
  }

  value() {
    return detrominoTypes[this.index];
  }
};