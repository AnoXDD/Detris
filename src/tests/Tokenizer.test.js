/**
 * Created by Anoxic on 10/24/2017.
 *
 * This test simply tests if the tokenized result is the same as the original
 * object. It doesn't really care if the detokenized result is correct
 */

import Immutable from "immutable";

import Block from "../data/block/Block";
import BlockType from "../data/block/BlockType";
import Tokenizer from "../data/Tokenizer";
import DetrominoType from "../data/detromino/DetrominoShape";
import Rotation from "../data/enum/Rotation";
import Detromino from "../data/detromino/Detromino";
import Grid from "../data/grid/Grid";
import Queue from "../data/queue/Queue";
import LevelDataUnit from "../data/game/level/LevelDataUnit";

function expectEqualDetromino(d, d2) {
  d = d.toJS();
  d2 = d2.toJS();
  delete d.id;
  delete d2.id;

  expect(d2).toEqual(d);
  return d;
}

function expectEqualActualGrid(g, g2) {
  let b = g.valueSeq().toJS().map(a => {
    delete a.id;
    return a;
  });
  let b2 = g2.valueSeq().toJS().map(a => {
    delete a.id;
    return a;
  });

  expect(b2).toEqual(b);
}

test("General tokenization", () => {
  let num = 1;
  let str = "2";
  let bol = true;
  let arr = [0, 5];
  let obj = {e: 2};

  let o = {num, str, bol, arr, obj,};

  let o2 = Tokenizer.tokenize(Tokenizer.detokenize(o));

  expect(Object.keys(o2).length).toBe(5);

  expect(o2.num).toBe(num);
  expect(o2.str).toBe(str);
  expect(o2.bol).toBe(bol);
  expect(o2.arr).toEqual(arr);
  expect(o2.obj).toEqual(obj);
});

test("Block", () => {
  let block = new Block({
    type: BlockType.TARGET,
    x   : 1,
    y   : 3,
  });

  let block2 = Tokenizer.tokenizeBlock(Tokenizer.detokenizeBlock(block));

  expect(block2.toJS()).toEqual(block.toJS());
});

test("Detromino", () => {
  let d = new Detromino({
    type    : DetrominoType.T,
    rotation: Rotation.DEG_270,
    x       : 5,
    y       : 23,
  });

  let d2 = Tokenizer.tokenizeDetromino(Tokenizer.detokenizeDetromino(d));

  expectEqualDetromino(d, d2);
});

test("Grid (actual)", () => {
  let ids = [0, 1, 2, 3, 4];
  let m = {};

  for (let id of ids) {
    m[id] = new Block({
      type: BlockType.ORIGINAL,
      x   : id * 2,
      y   : id * 3,
    });
  }

  let g = Immutable.Map(m);
  let g2 = Tokenizer.tokenizeActualGrid(Tokenizer.detokenizeActualGrid(g));

  expectEqualActualGrid(g, g2);
});

test("Grid (class)", () => {
  let d = new Detromino({
    type    : DetrominoType.T,
    rotation: Rotation.DEG_270,
    x       : 5,
    y       : 23,
  });

  let ids = [0, 1, 2, 3, 4];
  let m = {};

  for (let id of ids) {
    m[id] = new Block({
      type: BlockType.ORIGINAL,
      x   : id * 2,
      y   : id * 3,
    });
  }

  let g = Immutable.Map(m);

  let grid = new Grid({
    grid     : g,
    detromino: d,
  });

  let grid2 = Tokenizer.tokenizeGrid(Tokenizer.detokenizeGrid(grid));

  expectEqualDetromino(d, grid2.get("detromino"));
  expectEqualActualGrid(g, grid2.get("grid"));
});

test("Queue", () => {
  const queue = [DetrominoType.T, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.S, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.S, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.S, DetrominoType.L, DetrominoType.I, DetrominoType.J, DetrominoType.S, DetrominoType.L, DetrominoType.Z,];

  let q = new Queue({
    queue: Immutable.List(queue),
  });

  let q2 = Tokenizer.tokenizeQueue(Tokenizer.detokenizeQueue(q));

  expect(q2).toEqual(q);
});

test("LevelDataUnit", () => {
  const queue = [DetrominoType.T, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.S, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.S, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.L, DetrominoType.O, DetrominoType.I, DetrominoType.J, DetrominoType.S, DetrominoType.L, DetrominoType.I, DetrominoType.J, DetrominoType.S, DetrominoType.L, DetrominoType.Z,];

  let q = new Queue({
    queue: Immutable.List(queue),
  });

  let d = new Detromino({
    type    : DetrominoType.T,
    rotation: Rotation.DEG_270,
    x       : 5,
    y       : 23,
  });

  let ids = [0, 1, 2, 3, 4];
  let m = {};

  for (let id of ids) {
    m[id] = new Block({
      type: BlockType.ORIGINAL,
      x   : id * 2,
      y   : id * 3,
    });
  }

  let g = Immutable.Map(m);

  let grid = new Grid({
    grid     : g,
    detromino: d,
  });

  let key = Immutable.List([
    new Detromino({
      type    : DetrominoType.T,
      rotation: Rotation.DEG_270,
      x       : 15,
      y       : 23,
    }),
    new Detromino({
      type    : DetrominoType.O,
      rotation: Rotation.DEG_180,
      x       : 5,
      y       : 3,
    }),
    new Detromino({
      type    : DetrominoType.I,
      rotation: Rotation.NONE,
      x       : 9,
      y       : 8,
    }),
    new Detromino({
      type    : DetrominoType.J,
      rotation: Rotation.DEG_90,
      x       : 5,
      y       : 4,
    }),
  ]);

  let data = new LevelDataUnit({
    queue: q,
    grid,
    key,
  });

  let data2 = Tokenizer.tokenizeLevelDataUnit(Tokenizer.detokenizeLevelDataUnit(
    data));

  let grid2 = data2.get("grid");

  expectEqualDetromino(grid2.get("detromino"), d);
  expectEqualActualGrid(grid2.get("grid"), g);

  let q2 = data2.get("queue");

  expect(q2).toEqual(q);

  let key2 = data2.get("key");

  for (let i = 0; i < key.length; ++i) {
    expectEqualDetromino(key[i], key2[i]);
  }
});
