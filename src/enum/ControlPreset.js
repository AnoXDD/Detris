/**
 * Created by Anoxic on 1/10/2018.
 *
 * An enum for presets of controls. This class makes caching current state
 * easier
 */

import Immutable from "immutable";

import ControlType from "./ControlType";
import Actions from "../data/Actions";
import ControlState from "../state/Control";
import {addIdToImmutable} from "../util/addIdToData";

const FULL_GAME_CONTROL = new ControlState({
  rotate : Actions.rotateInTutorial,
  done   : Actions.nextDetrominoInGame,
  move   : Actions.moveDetrominoInTutorial,
  undo   : Actions.undoInGame,
  redo   : Actions.redoInGame,
  enabled: Immutable.Set([
    ControlType.CONTROL_ROTATE,
    ControlType.CONTROL_UP,
    ControlType.CONTROL_DOWN,
    ControlType.CONTROL_LEFT,
    ControlType.CONTROL_RIGHT,
    ControlType.CONTROL_DONE,
    ControlType.CONTROL_UNDO,
    ControlType.CONTROL_REDO,
  ]),
});

const ControlPresets = {
  EMPTY: new ControlState(),

  LEVEL_EDITOR_BLOCK_EDITING_DISABLED: new ControlState({
    done           : Actions.nextDetrominoInEditor,
    move           : Actions.moveDetrominoInEditor,
    toggleEditBlock: Actions.enableBlockEditing,
    nextDetromino  : Actions.nextDetrominoShape,
    prevDetromino  : Actions.prevDetrominoShape,
    redo           : Actions.redoInEditor,
    undo           : Actions.undoInEditor,
    enabled        : Immutable.Set([
      ControlType.CONTROL_ROTATE,
      ControlType.CONTROL_UP,
      ControlType.CONTROL_DOWN,
      ControlType.CONTROL_LEFT,
      ControlType.CONTROL_RIGHT,
      ControlType.CONTROL_UNDO,
      ControlType.CONTROL_REDO,
      ControlType.CONTROL_DONE,
      ControlType.CONTROL_TOGGLE_EDIT,
      ControlType.CONTROL_PREV_DETROMINO,
      ControlType.CONTROL_NEXT_DETROMINO,
    ]),
  }),

  LEVEL_EDITOR_BLOCK_EDITING_ENABLED: new ControlState({
    move           : Actions.moveEditingBlock,
    toggleEditBlock: Actions.disableBlockEditing,
    chooseEditBlock: Actions.setBlockType,
    enabled        : Immutable.Set([
      ControlType.CONTROL_UP,
      ControlType.CONTROL_DOWN,
      ControlType.CONTROL_LEFT,
      ControlType.CONTROL_RIGHT,
      ControlType.CONTROL_UNDO,
      ControlType.CONTROL_REDO,
      ControlType.CONTROL_TOGGLE_EDIT,
      ControlType.CONTROL_BLOCK_SELECTOR,
    ]),
  }),

  ARROW_ONLY_NO_FUNCTION: new ControlState({
    enabled: Immutable.Set([
      ControlType.CONTROL_UP,
      ControlType.CONTROL_DOWN,
      ControlType.CONTROL_LEFT,
      ControlType.CONTROL_RIGHT,
    ]),
  }),

  ARROW_ONLY: new ControlState({
    move   : Actions.moveDetrominoInTutorial,
    enabled: Immutable.Set([
      ControlType.CONTROL_UP,
      ControlType.CONTROL_DOWN,
      ControlType.CONTROL_LEFT,
      ControlType.CONTROL_RIGHT,
    ]),
  }),

  ARROW_AND_ROTATE_ONLY: new ControlState({
    move   : Actions.moveDetrominoInTutorial,
    rotate : Actions.rotateInTutorial,
    enabled: Immutable.Set([
      ControlType.CONTROL_UP,
      ControlType.CONTROL_DOWN,
      ControlType.CONTROL_LEFT,
      ControlType.CONTROL_RIGHT,
      ControlType.CONTROL_ROTATE,
    ]),
  }),

  NEXT_DETROMINO_ONLY: new ControlState({
    done   : Actions.nextTutorial,
    enabled: Immutable.Set([
      ControlType.CONTROL_DONE,
    ]),
  }),

  TUTORIAL_TRY_OUT: FULL_GAME_CONTROL.set("done", Actions.nextDetromino),

  FULL_GAME_CONTROL: FULL_GAME_CONTROL,
};

export default addIdToImmutable(ControlPresets, "controlRecordId");