/**
 * Created by Anoxic on 10/11/2017.
 *
 * A class to represent the state of level editor
 */

import Immutable from "immutable";
import BlockType from "../enum/BlockType";
import BaseGrid from "./BaseGrid";

const LevelEditorState = Immutable.Record({
  isEditingBlock: false,
  blockType     : BlockType.ORIGINAL,

  // The coordinates of the editing block
  x: -1,
  y: -1,

  // The list of blocks that are editable
  blockList: new Immutable.List([BlockType.DETROMINO, BlockType.DETROMINO_TARGET]),
});

const LevelEditorPanelRecord = Immutable.Record({
  editorState: new LevelEditorState(),
  grid       : new BaseGrid(),
  queue      : Immutable.List(),

  // A set of ID's of blocks whose types are detromino targets
  detrominoTargets : Immutable.Set(),

  // A list of detrominos to represent how to solve this puzzle
  key: Immutable.List(),

  // A detokenized string to be used for export, updated every time a new
  // detromino is placed
  detokenized: "",
}, "LevelEditorPanel");

export default LevelEditorPanelRecord;