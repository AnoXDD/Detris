/**
 * Created by Anoxic on 10/18/2017.
 *
 * A class used for iterating over detromino shapes
 */

import DetrominoType from "../enum/DetrominoType";

const detrominoTypes = Object.values(DetrominoType).slice(1);
const length = detrominoTypes.length;

function findIndex(type) {
  let index = detrominoTypes.indexOf(type);

  if (index === -1) {
    index = 0;
  }
  return index;
}

export function prevDetrominoType(type) {
  let index = findIndex(type);

  if (--index < 0) {
    index = length - 1;
  }

  return detrominoTypes[index];
}

export function nextDetrominoType(type) {
  let index = findIndex(type);

  if (++index >= length) {
    index = 0;
  }

  return detrominoTypes[index];
}

export default {
  prevDetrominoType,
  nextDetrominoType,
}