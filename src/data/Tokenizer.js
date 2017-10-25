/**
 * Created by Anoxic on 10/24/2017.
 *
 * More like a stringifier, to convert the in-game object to a string
 * (detrokenize), or the other way (tokenize)
 */

import Immutable from "immutable";

import Queue from "./queue/Queue";
import Block from "./block/Block";
import Detromino from "./detromino/Detromino";
import Grid from "./grid/Grid";
import GridStore from "./grid/GridStoreClass";

const BlockKeys = "type x y".split(" ");
const DetrominoKeys = "type rotation x y".split(" ");

let id = 0;

export default class Tokenizer {

  static newId() {
    return ++id;
  }

  /**
   * A generic tokenizing function to convert a string to a JavaScript object
   * @param {string} str
   */
  static tokenize(str) {
    return JSON.parse(str);
  }

  /**
   * A generic detokenizing function to convert a JavaScript object to string
   * @param {Object} obj
   */
  static detokenize(obj) {
    return JSON.stringify(obj);
  }

  static tokenizeQueue(str) {
    str = Tokenizer.tokenize(str);

    return new Queue({
      queue: Immutable.List(str),
    });
  }

  /**
   * Detokenizes a queue to a string
   * @param {Queue} queue the state stored in QueueStore
   */
  static detokenizeQueue(queue) {
    let queue = queue.get("queue").toJS();

    return Tokenizer.detokenize(queue);
  }

  static tokenizeGrid(str) {
    let grid = Tokenizer.tokenize(str);

    let actualGrid = Tokenizer.tokenizeActualGrid(grid.grid);
    let detromino = Tokenizer.tokenizeDetromino(grid.detromino);

    grid = new Grid({
      grid: actualGrid,
      detromino,
    });

    return GridStore.syncData(grid);
  }

  /**
   * Detokenizes a grid to a string
   * @param {Grid} grid
   */
  static detokenizeGrid(grid) {
    let blocks = Tokenizer.detokenizeActualGrid(grid.get("grid"));
    let detromino = Tokenizer.detokenizeDetromino(grid.get("detromino"));

    return Tokenizer.detokenize({blocks, detromino});
  }

  static tokenizeActualGrid(str) {
    let blocks = Tokenizer.tokenize(str);
    let actualGrid = {};

    for (let block of blocks) {
      let id = Tokenizer.newId();

      actualGrid[id] = new Block({
        id,
        ...block,
      });
    }

    return Immutable.Map(actualGrid);
  }

  /**
   * Detokenizes an actual grid inside of a grid
   * @param {Immutable.Map} actualGrid
   */
  static detokenizeActualGrid(actualGrid) {
    return Object.values(actualGrid.toJS().map(
      block => Tokenizer.detokenizeBlock(block)));
  }

  static tokenizeDetromino(str) {
    return new Detromino({
      id: Tokenizer.newId(),
      ...Tokenizer.tokenize(str),
    });
  }

  /**
   * Detokenizes a detromino to a string
   * @param {Detromino} detromino
   */
  static detokenizeDetromino(detromino) {
    let o = {};
    for (let key of DetrominoKeys) {
      o[key] = detromino.get(key);
    }

    return Tokenizer.detokenize(o);
  }

  static tokenizeBlock(str) {
    return new Block(Tokenizer.tokenize(str));
  }

  /**
   * Detokenizes a block to a string
   * @param {Block} block
   */
  static detokenizeBlock(block) {
    let o = {};
    for (let key of BlockKeys) {
      o[key] = block.get(key);
    }

    return Tokenizer.detokenize(o);
  }
};