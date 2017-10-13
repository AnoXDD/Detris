/**
 * Created by Anoxic on 10/11/2017.
 *
 * A class to represent eh state of level editor
 */

import Immutable from "immutable";
import BlockType from "../block/BlockType";
import Grid from "../grid/Grid";

const LevelEditorState = Immutable.Record({
  isEditingBlock: false,
  blockType     : BlockType.ORIGINAL,

  // The coordinates of the editing block
  x: -1,
  y: -1,
});

const LevelEditorGrid = Immutable.Record({
  editorState: new LevelEditorState(),
  data       : new Grid(),
});

export default LevelEditorGrid;
