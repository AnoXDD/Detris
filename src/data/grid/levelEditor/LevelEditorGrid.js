/**
 * Created by Anoxic on 10/11/2017.
 *
 * A class to represent the state of level editor
 */

import Immutable from "immutable";
import BlockType from "../../block/BlockType";
import Grid from "../BaseGrid";
import DetrominoIterator from "../../detromino/DetrominoIterator";
import History from "../../History";
import LevelDataUnit from "../../game/level/LevelDataUnit";
import Algorithm from "../../Algorithm";

const LevelEditorState = Immutable.Record({
  isEditingBlock: false,
  blockType     : BlockType.ORIGINAL,

  // The coordinates of the editing block
  x: -1,
  y: -1,

  // The list of blocks that are editable
  blockList: new Immutable.List([BlockType.DETROMINO, BlockType.DETROMINO_TARGET]),
});

const LevelEditorGridRecord = Immutable.Record({
  editorState     : new LevelEditorState(),
  data            : new Grid(),
  history         : new History(),
  // A set of ID's of blocks whose types are detromino targets
  detrominoTargets: Immutable.Set(),

  // The index of detromino block, should be positive numbers because 0 index
  // is DEFAULT
  detrominoIterator: new DetrominoIterator(),

  // A list of detrominos to represent how to solve this puzzle
  key: Immutable.List(),

  // A detokenized string to be used for export, updated every time a new
  // detromino is placed
  detokenized: "",
});

export default class LevelEditorGrid extends LevelEditorGridRecord {
  grid() {
    return this.get("data");
  }

  editorState() {
    return this.get("editorState");
  }

  x() {
    return this.get("editorState").get("x");
  }

  y() {
    return this.get("editorState").get("y");
  }

  isEditingBlock() {
    return this.get("editorState").get("isEditingBlock");
  }

  blockType() {
    return this.get("editorState").get("blockType");
  }

  /**
   * Converts this class and returns a LevelDataUnit
   */
  toLevelDataUnit() {
    let key = this.get("key");

    return new LevelDataUnit({
      key,
      grid : this.get("data").set("detromino", null),
      queue: Algorithm.convertKeyToQueue(key),
    });
  }
}