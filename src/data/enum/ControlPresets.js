/**
 * Created by Anoxic on 1/10/2018.
 *
 * An enum for presets of controls. This class makes caching current state
 * easier
 */

import Immutable from "immutable";

import Control from "../control/ControlState";
import ControlTypes from "./ControlTypes";
import Actions from "../Actions";

const FULL_GAME_CONTROL = new Control({
  rotate : Actions.rotateInTutorial,
  done   : Actions.nextDetrominoInGame,
  move   : Actions.moveDetrominoInTutorial,
  undo   : Actions.undoInGame,
  redo   : Actions.redoInGame,
  enabled: Immutable.Set([
    ControlTypes.CONTROL_ROTATE,
    ControlTypes.CONTROL_UP,
    ControlTypes.CONTROL_DOWN,
    ControlTypes.CONTROL_LEFT,
    ControlTypes.CONTROL_RIGHT,
    ControlTypes.CONTROL_DONE,
  ]),
});

const ControlPresets = {
  EMPTY: new Control(),

  LEVEL_EDITOR_BLOCK_EDITING_DISABLED: new Control({
    done           : Actions.nextDetrominoInEditor,
    move           : Actions.moveDetrominoInEditor,
    toggleEditBlock: Actions.enableBlockEditing,
    nextDetromino  : Actions.nextDetrominoShape,
    prevDetromino  : Actions.prevDetrominoShape,
    redo           : Actions.redoInEditor,
    undo           : Actions.undoInEditor,
    enabled        : Immutable.Set([
      ControlTypes.CONTROL_ROTATE,
      ControlTypes.CONTROL_UP,
      ControlTypes.CONTROL_DOWN,
      ControlTypes.CONTROL_LEFT,
      ControlTypes.CONTROL_RIGHT,
      ControlTypes.CONTROL_UNDO,
      ControlTypes.CONTROL_REDO,
      ControlTypes.CONTROL_DONE,
      ControlTypes.CONTROL_TOGGLE_EDIT,
      ControlTypes.CONTROL_PREV_DETROMINO,
      ControlTypes.CONTROL_NEXT_DETROMINO,
    ]),
  }),

  LEVEL_EDITOR_BLOCK_EDITING_ENABLED: new Control({
    move           : Actions.moveEditingBlock,
    toggleEditBlock: Actions.disableBlockEditing,
    chooseEditBlock: Actions.setBlockType,
    enabled        : Immutable.Set([
      ControlTypes.CONTROL_UP,
      ControlTypes.CONTROL_DOWN,
      ControlTypes.CONTROL_LEFT,
      ControlTypes.CONTROL_RIGHT,
      ControlTypes.CONTROL_UNDO,
      ControlTypes.CONTROL_REDO,
      ControlTypes.CONTROL_TOGGLE_EDIT,
      ControlTypes.CONTROL_BLOCK_SELECTOR,
    ]),
  }),

  ARROW_ONLY_NO_FUNCTION: new Control({
    enabled: Immutable.Set([
      ControlTypes.CONTROL_UP,
      ControlTypes.CONTROL_DOWN,
      ControlTypes.CONTROL_LEFT,
      ControlTypes.CONTROL_RIGHT,
    ]),
  }),

  ARROW_ONLY: new Control({
    move   : Actions.moveDetrominoInTutorial,
    enabled: Immutable.Set([
      ControlTypes.CONTROL_UP,
      ControlTypes.CONTROL_DOWN,
      ControlTypes.CONTROL_LEFT,
      ControlTypes.CONTROL_RIGHT,
    ]),
  }),

  ARROW_AND_ROTATE_ONLY: new Control({
    move   : Actions.moveDetrominoInTutorial,
    enabled: Immutable.Set([
      ControlTypes.CONTROL_UP,
      ControlTypes.CONTROL_DOWN,
      ControlTypes.CONTROL_LEFT,
      ControlTypes.CONTROL_RIGHT,
    ]),
  }),

  NEXT_DETROMINO_ONLY: new Control({
    done   : Actions.nextTutorial,
    enabled: Immutable.Set([
      ControlTypes.CONTROL_DONE,
    ]),
  }),

  TUTORIAL_TRY_OUT: FULL_GAME_CONTROL.set("done", Actions.nextDetromino),

  FULL_GAME_CONTROL               : FULL_GAME_CONTROL,
  FULL_GAME_CONTROL_WITH_UNDO     : FULL_GAME_CONTROL
    .set("enabled",
      FULL_GAME_CONTROL
        .get("enabled")
        .add(ControlTypes.CONTROL_UNDO)
    ),
  FULL_GAME_CONTROL_WITH_REDO     : FULL_GAME_CONTROL
    .set("enabled",
      FULL_GAME_CONTROL
        .get("enabled")
        .add(ControlTypes.CONTROL_REDO)
    ),
  FULL_GAME_CONTROL_WITH_UNDO_REDO: FULL_GAME_CONTROL
    .set("enabled",
      FULL_GAME_CONTROL
        .get("enabled")
        .add(ControlTypes.CONTROL_REDO)
        .add(ControlTypes.CONTROL_UNDO)
    ),
};

// add id to each control

export default ControlPresets;