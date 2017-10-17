/**
 * Created by Anoxic on 10/14/1917.
 */

import Algorithm from "../data/Algorithm";

import Block from "../data/block/Block";
import BlockType from "../data/block/BlockType";
import Detromino from "../data/detromino/Detromino";
import DetrominoType from "../data/detromino/DetrominoType";
import Direction from "../data/enum/Direction";

function toMatrix(s) {
  return s.trim().split("\n").map((a, y) => a.trim().split("").map((a, x) => {
      switch (a) {
        case "1":
          return new Block({
            x, y,
            type: BlockType.ORIGINAL
          });

        case "2":
          return new Block({
            x, y,
            type: BlockType.DETROMINO,
          });

        case "3":
          return new Block({
            x, y,
            type: BlockType.TARGET,
          });

        default:
          return null;
      }
    }
  ));
}

describe("Test findNextEditableBlock", () => {

  function exp(block, x, y) {
    expect(block.x()).toBe(x);
    expect(block.y()).toBe(y);
  }

  const matrix = toMatrix(
    `
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000000000
    0000020000
    0000000200
    0202020200
    0000022200
    0002000000
    0000002000
    0002020000
    `
  );

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

describe("Test isFitForNewDetrominoInEditor", () => {
  const matrix = toMatrix(
    // 0123456789
    "  0000000000\n" //0
    + "0000000000\n" //1
    + "0000000000\n" //2
    + "0000000000\n" //3
    + "0001110000\n" //4
    + "0011010000\n" //5
    + "0010001100\n" //6
    + "0010001000\n" //7
    + "0010001000\n" //8
    + "0011110000\n" //9
    + "0000000000\n" //10
    + "0000001110\n" //11
    + "0000111-10\n" //12
    + "00001---10\n" //13
    + "0000111110\n" //14
    + "0000000000\n" //15
    + "0000000000\n" //16
    + "0000000000\n" //17
    + "0000000000\n" //18
    + "0001100000\n" //19
    // 0123456789
  );

  const f = d => Algorithm.isFitForNewDetrominoInEditor(matrix, d);
  const d = (x, y, type) => new Detromino({x, y, type});

  test("No blocks above it", () => {
    expect(f(d(0, 18, DetrominoType.L))).toBeTruthy();
  });

  test("No blocks above it but overlapped", () => {
    expect(f(d(0, 19, DetrominoType.I))).toBeFalsy();
  });

  test("Blocks above it with plenty of space", () => {
    expect(f(d(5, 18, DetrominoType.O))).toBeTruthy();
  });

  test("Blocks above it with space exactly needed", () => {
    expect(f(d(5, 17, DetrominoType.I))).toBeTruthy();
  });

  test("Blocks above it with space exactly needed for tucked in (type L)",
    () => {
      expect(f(d(3, 16, DetrominoType.L))).toBeTruthy();
    });

  test("Blocks above it with space exactly needed for tucked in (type J)",
    () => {
      expect(f(d(7, 16, DetrominoType.J))).toBeTruthy();
    });

  test("Blocks above it with one block overlapped", () => {
    expect(f(d(8, 16, DetrominoType.O))).toBeFalsy();
  });

  test("Blocks that are overlapped already", () => {
    expect(f(d(4, 14, DetrominoType.T))).toBeFalsy();
  });

  test("Blocks that with only one line above it empty", () => {
    expect(f(d(3, 15, DetrominoType.L))).toBeFalsy();
  });

  test("Blocks in a cozy house", () => {
    expect(f(d(3, 7, DetrominoType.T))).toBeTruthy();
  });
});