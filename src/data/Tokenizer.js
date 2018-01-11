/**
 * Created by Anoxic on 10/24/2017.
 *
 * More like a stringifier, to convert the in-game object to a string
 * (detrokenize), or the other way (tokenize)
 */

import Immutable from "immutable";
import {Buffer} from "buffer";
import zlib from "zlib";

import Queue from "./queue/Queue";
import Block from "./block/Block";
import Detromino from "./detromino/Detromino";
import Grid from "./grid/BaseGrid";
import LevelDataUnit from "./game/level/LevelDataUnit";
import GameState from "./game/GameState";
import LevelViewData from "./game/static/LevelViewData";
import LevelState from "./game/level/LevelState";
import CompletedLevel from "./game/level/CompletedLevel";

const BlockKeys = "type x y".split(" ");
const DetrominoKeys = "type rotation x y".split(" ");

let id = 0;

export default class Tokenizer {

  static newId() {
    // It has to be converted to string because Immutable doesn't work well
    // with numbers as keys
    return `${++id}`;
  }

  /**
   * A generic tokenizing function to convert a string to a JavaScript object
   * @param {string} str
   * @return {Object}
   */
  static tokenize(str) {
    return JSON.parse(zlib.inflateSync(new Buffer(str, "base64")).toString());
  }

  /**
   * A generic detokenizing function to convert a JavaScript object to string
   * @param {Object} obj
   */
  static detokenize(obj) {
    return zlib.deflateSync(JSON.stringify(obj)).toString("base64");
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
    queue = queue.get("queue").toJS();

    return Tokenizer.detokenize(queue);
  }

  /**
   * Returns the grid. The returned grid does NOT have matrix synced
   * @param str
   * @return {*}
   */
  static tokenizeGrid(str) {
    let grid = Tokenizer.tokenize(str);

    let actualGrid = Tokenizer.tokenizeActualGrid(grid.grid);
    let detromino = Tokenizer.tokenizeDetromino(grid.detromino);

    grid = new Grid({
      grid: actualGrid,
      detromino,
    });

    return grid;
  }

  /**
   * Detokenizes a grid to a string
   * @param {Grid} grid
   */
  static detokenizeGrid(grid) {
    let detromino = Tokenizer.detokenizeDetromino(grid.get("detromino"));
    let actualGrid = Tokenizer.detokenizeActualGrid(grid.get("grid"));

    return Tokenizer.detokenize({
      grid: actualGrid,
      detromino,
    });
  }

  static tokenizeActualGrid(str) {
    let blocks = Tokenizer.tokenize(str);
    let actualGrid = {};

    for (let block of blocks) {
      let id = Tokenizer.newId();

      actualGrid[id] = Tokenizer.tokenizeBlock(block).set("id", id);
    }

    return Immutable.Map(actualGrid);
  }

  /**
   * Detokenizes an actual grid inside of a grid
   * @param {Immutable.Map} actualGrid
   */
  static detokenizeActualGrid(actualGrid) {
    return Tokenizer.detokenize(actualGrid.valueSeq().map(
      block => Tokenizer.detokenizeBlock(block)));
  }

  static tokenizeDetromino(str) {
    if (!str) {
      return null;
    }

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
    if (!detromino) {
      return "";
    }

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

  static tokenizeLevelDataUnit(str) {
    let levelDataUnit = Tokenizer.tokenize(str);

    return new LevelDataUnit({
      queue: Tokenizer.tokenizeQueue(levelDataUnit.queue),
      grid : Tokenizer.tokenizeGrid(levelDataUnit.grid),
      key  : Immutable.List(levelDataUnit.key.map(
        de => Tokenizer.tokenizeDetromino(de))),
    });
  }

  /**
   * Detokenizes a level data unit to a string
   * @param {LevelDataUnit} levelDataUnit
   */
  static detokenizeLevelDataUnit(levelDataUnit) {
    let queue = Tokenizer.detokenizeQueue(levelDataUnit.get("queue"));
    let grid = Tokenizer.detokenizeGrid(levelDataUnit.get("grid"));
    let key = levelDataUnit.get("key")
      .toArray()
      .map(de => Tokenizer.detokenizeDetromino(de));

    return Tokenizer.detokenize({
      queue, grid, key,
    });
  }

  static tokenizeGameState(str) {
    let obj = Tokenizer.tokenize(str);
    obj.topBar = Immutable.Set(obj.topBar);
    obj.activeOverlay = Immutable.Set(obj.activeOverlay);

    return new GameState(obj);
  }

  /**
   * Detokenizes game state
   * @param {GameState} gameState
   * @return {string}
   */
  static detokenizeGameState(gameState) {
    return Tokenizer.detokenize(gameState.toJS());
  }

  static tokenizeLevelState(str) {
    let obj = Tokenizer.tokenize(str);
    obj.view = LevelViewData.views().get(obj.currentPage);

    // Convert completedLevels
    let {completedLevels} = obj;
    let ids = Object.keys(completedLevels);

    for (let id of ids) {
      completedLevels[id] = new CompletedLevel(completedLevels[id]);
    }

    obj.completedLevels = Immutable.Map(completedLevels);

    return new LevelState(obj);
  }

  /**
   * Detokenizes level state (throwing away `view` because it's synced with
   * `currentPage` - see LevelState.js for more detail)
   * @param {Immutable.Map|LevelState} levelState
   */
  static detokenizeLevelState(levelState) {
    let obj = levelState.toJS();
    delete obj.view;

    return Tokenizer.detokenize(obj);
  }
};