/**
 * Created by Anoxic on 10/11/2017.
 *
 * A class to represent the state of level editor
 */

import Immutable from "immutable";
import BlockType from "../block/BlockType";
import Grid from "../grid/Grid";
import DetrominoIterator from "../detromino/DetrominoIterator";
import History from "../History";

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
  detrominoTargets: Immutable.Set(), // A set of detromino's ID

  // The index of detromino block, should be positive numbers because 0 index
  // is DEFAULT
  detrominoIterator: new DetrominoIterator(),
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
}
