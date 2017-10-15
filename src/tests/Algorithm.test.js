/**
 * Created by Anoxic on 10/14/1917.
 */

import Algorithm from "../data/Algorithm";

import Block from "../data/block/Block";
import BlockType from "../data/block/BlockType";
import Detromino from "../data/detromino/Detromino";
import DetrominoType from "../data/detromino/DetrominoType";
import Direction from "../data/enum/Direction";

describe("Test findNextEditableBlock", () => {

  function exp(block, x, y) {
    expect(block.x()).toBe(x);
    expect(block.y()).toBe(y);
  }

  const matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  ].map((a, y) => a.map((a, x) => {
    switch (a) {
      case 1:
        return new Block({
          x, y,
          type: BlockType.ORIGINAL
        });

      case 2 :
        return new Block({
          x, y,
          type: BlockType.DETROMINO,
        });

      default:
        return null;
    }
  }));

  const fn = Algorithm.findNextEditableBlock;
  const detromino = new Detromino({
    type: DetrominoType.I,
    x   : 3,
    y   : 12,
  });

  const L = Direction.LEFT;
  const D = Direction.DOWN;
  const U = Direction.UP;
  const R = Direction.RIGHT;

  const f = (x, y, direction) => fn(matrix, detromino, x, y, direction);

  describe("With adjacent blocks", () => {
    test("Down", () => {
      exp(f(5, 15, D), 5, 16);
    });

    test("Up", () => {
      exp(f(5, 16, U), 5, 15);
    });

    test("Left", () => {
      exp(f(6, 16, L), 5, 16);
    });

    test("Right", () => {
      exp(f(5, 16, R), 6, 16);
    });
  });

  test("Move vertically with gap", () => {
    let b = f(5, 15, U);
    exp(b, 5, 13);

    b = f(5, 13, D);
    exp(b, 5, 15);
  });

  describe("Move horizontally without an adjacent block", () => {

    test("Move left with block above the gap", () => {
      exp(f(6, 18, L), 5, 16);
    });

    test("Move right with block above the gap", () => {
      exp(f(5, 19, R), 6, 18);
    });

    test("Move right with no block above the gap", () => {
      exp(f(5, 15, R), 6, 16);
    });

  });

  describe("Move horizontally with an adjacent empty column", () => {

    test("Move with block on the same row", () => {
      exp(f(5, 15, L), 3, 15);
      exp(f(3, 15, R), 5, 15);
    });

    test("Move with blocks on different rows", () => {
      exp(f(5, 16, L), 3, 15);
      exp(f(3, 17, R), 5, 16);
    });

  });

  describe("Hit the edge", () => {
    test("Down", () => {
      expect(f(5, 19, D)).toBeNull();
    });

    test("Up", () => {
      expect(f(5, 13, U)).toBeNull();
    });

    test("Left", () => {
      expect(f(3, 15, L)).toBeNull();
    });

    test("Right", () => {
      expect(f(6, 16, R)).toBeNull();
    });
  });
});
