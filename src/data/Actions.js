/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import ActionTypes from "./enum/ActionTypes";
import Algorithm from "./Algorithm";
import Dispatcher from "./Dispatcher";
import QueueStore from "./queue/QueueStore";
import Direction from "./enum/Direction";
import LevelData from "./game/static/LevelData";
import GameUiState from "./enum/GameUiState";
import LevelEditorGridStore from "./levelEditor/LevelEditorGridStore";
import OverlayType from "./enum/OverlayTypes";
import LevelStateStore from "./game/level/LevelStateStore";

const DELAY = 500;

const Actions = {
  //region game
  init(width, height) {
    Dispatcher.dispatch({
      type: ActionTypes.INIT_GRID,
      width,
      height,
    });
  },

  resetGrid() {
    Dispatcher.dispatch({
      type: ActionTypes.RESET_GRID,
    });
  },

  setUiState(uiState) {
    Dispatcher.clearAllFuturePayloads();

    Dispatcher.dispatch({
      type: ActionTypes.SET_GAME_UI_STATE,
      uiState,
    });
  },

  showWelcomePage() {
    Actions.setUiState(GameUiState.WELCOME);
  },

  showSelectLevel() {
    Actions.setUiState(GameUiState.SELECT_LEVEL);
  },

  showGridEditor() {
    Actions.setUiState(GameUiState.LEVEL_EDITOR_STARTED);
  },

  showCredit() {
    Dispatcher.dispatch({
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.ABOUT,
    });
  },

  hideCredit() {
    Dispatcher.dispatch({
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.ABOUT,
    });
  },

  showSettings() {
    Dispatcher.dispatch({
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.SETTINGS,
    })
  },

  hideSettings() {
    Dispatcher.dispatch({
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.SETTINGS,
    });
  },

  showLevelEditorImportExport() {
    Dispatcher.dispatch({
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.LEVEL_EDITOR_IMPORT_EXPORT,
    });
  },

  hideLevelEditorImportExport() {
    Dispatcher.dispatch({
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.LEVEL_EDITOR_IMPORT_EXPORT,
    });
  },

  pause() {
    Dispatcher.dispatch({
      type: ActionTypes.PAUSE,
    });
  },

  resume() {
    Dispatcher.dispatch({
      type: ActionTypes.RESUME,
    });
  },

  showDialogForGameRestart() {
    Actions.showDialog(
      "Do you want to restart this level?",
      Actions.restartCurrentLevel,
    );
  },

  showDialogForResetLevelEditor() {
    Actions.showDialog(
      "Do you want to reset the level editor?",
      Actions.resetGrid
    );
  },

  showDialogForQuitToLevelSelect() {
    Actions.showDialog(
      "Do you want to return to previous menu? Any changes will be lost.",
      Actions.showSelectLevel
    );
  },

  showDialogForQuitToWelcome() {
    Actions.showDialog(
      "Do you want to return to home page? Any changes will be lost.",
      Actions.showWelcomePage
    );
  },

  showDialog(title, onYes, onNo) {
    Dispatcher.dispatch({
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.DIALOG,
      title,
      onYes,
      onNo,
    });
  },

  hideDialog() {
    Dispatcher.dispatch({
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.DIALOG,
    });
  },

  hideAllFullscreenOverlay() {
    Dispatcher.dispatch({
      type: ActionTypes.HIDE_ALL_FULLSCREEN_OVERLAY,
    });
  },

  // endregion

  // region level navigation

  levelPageNext() {
    Dispatcher.dispatch({
      type: ActionTypes.LEVEL_NEXT_PAGE,
    });
  },

  levelPagePrev() {
    Dispatcher.dispatch({
      type: ActionTypes.LEVEL_PREV_PAGE,
    });
  },

  // endregion

  startNewLevel(currentLevel) {
    Dispatcher.clearAllFuturePayloads();

    Dispatcher.dispatch({
      type: ActionTypes.START_LEVEL,
      currentLevel,
    });

    Actions.apply(LevelData.getLevel(currentLevel));
  },

  restartCurrentLevel() {
    Actions.startNewLevel(LevelStateStore.getState().get("currentLevel"));
  },

  nextLevel() {
    // todo implement this
  },

  /**
   * Starts a new game with grid width, height and queue, grid
   * @param {Immutable.Map<string, any>|LevelDataUnit} levelDataUnit
   */
  apply(levelDataUnit) {
    Dispatcher.clearAllFuturePayloads();

    Actions.init(levelDataUnit.get("width"), levelDataUnit.get("height"));

    Dispatcher.dispatch({
      type: ActionTypes.APPLY_DATA,
      levelDataUnit,
    });
  },

  nextDetrominoInGame() {
    if (Dispatcher.willBeDispatching()) {
      return;
    }

    let detrominoType = QueueStore.getState().get("queue").last();
    // todo optimization: just drop it if it won't break anything
    Dispatcher.dispatch({
      type: ActionTypes.SINK_FLOATING_BLOCK,
    });
    Dispatcher.dispatch({
      type: ActionTypes.SINK_TARGET_BLOCK,
    }, DELAY);

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO_IN_GAME,
      detrominoType,
    }, DELAY * 2);

    Dispatcher.dispatchOnClear({
      type: ActionTypes.MAYBE_END_GAME,
    });
  },

  nextDetrominoInEditor() {
    if (Dispatcher.willBeDispatching()) {
      return;
    }

    let detrominoType = LevelEditorGridStore.getState()
      .get("detrominoIterator")
      .value();

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO_IN_EDITOR,
      detrominoType,
    });
  },

  nextDetrominoShape() {
    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO_SHAPE,
    });
  },

  prevDetrominoShape() {
    Dispatcher.dispatch({
      type: ActionTypes.PREV_DETROMINO_SHAPE,
    });
  },

  // Debug only
  debug__newRandomDetromino() {
    Actions.sinkFloatingBlocks();
    Actions.sinkTargetBlocks();

    let detrominoType = Algorithm.generateRandomDetrominoType();

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO_IN_GAME,
      detrominoType,
    })
  },

  debug__addDetrominoToQueue(detrominoType = Algorithm.generateRandomDetrominoType()) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_DETROMINO_TO_QUEUE,
      detrominoType,
    });
  },

  moveDetrominoInGame(direction) {
    let type = null;

    switch (direction) {
      case Direction.UP:
        type = ActionTypes.DETROMINO_MOVE_UP;
        break;
      case Direction.DOWN:
        type = ActionTypes.DETROMINO_MOVE_DOWN;
        break;
      case Direction.LEFT:
        type = ActionTypes.DETROMINO_MOVE_LEFT;
        break;
      case Direction.RIGHT:
        type = ActionTypes.DETROMINO_MOVE_RIGHT;
        break;
      default:
    }

    if (!type) {
      console.error(`${direction} is not a valid direction`);
      return;
    }

    Dispatcher.dispatchOnlyIfClear({
      type,
    });
  },

  moveDetrominoInEditor(direction) {
    let type = null;

    switch (direction) {
      case Direction.UP:
        type = ActionTypes.EDITOR_DETROMINO_MOVE_UP;
        break;
      case Direction.DOWN:
        type = ActionTypes.EDITOR_DETROMINO_MOVE_DOWN;
        break;
      case Direction.LEFT:
        type = ActionTypes.EDITOR_DETROMINO_MOVE_LEFT;
        break;
      case Direction.RIGHT:
        type = ActionTypes.EDITOR_DETROMINO_MOVE_RIGHT;
        break;
      default:
    }

    if (!type) {
      console.error(`${direction} is not a valid direction`);
      return;
    }

    Dispatcher.dispatchOnlyIfClear({
      type,
    });
  },

  /**
   * Moves the editing block in level editor
   * @param {Direction} direction
   */
  moveEditingBlock(direction) {
    let type = null;

    switch (direction) {
      case Direction.UP:
        type = ActionTypes.EDITOR_BLOCK_MOVE_UP;
        break;
      case Direction.DOWN:
        type = ActionTypes.EDITOR_BLOCK_MOVE_DOWN;
        break;
      case Direction.LEFT:
        type = ActionTypes.EDITOR_BLOCK_MOVE_LEFT;
        break;
      case Direction.RIGHT:
        type = ActionTypes.EDITOR_BLOCK_MOVE_RIGHT;
        break;
      default:
    }

    if (!type) {
      console.error(`${direction} is not a valid direction`);
      return;
    }

    Dispatcher.dispatchOnlyIfClear({
      type,
    });
  },

  redoInEditor() {
    Dispatcher.dispatch({
      type: ActionTypes.REDO_IN_EDITOR,
    });
  },

  undoInEditor() {
    Dispatcher.dispatch({
      type: ActionTypes.UNDO_IN_EDITOR,
    });
  },

  setBlockType(blockType) {
    Dispatcher.dispatch({
      type: ActionTypes.SET_BLOCKTYPE,
      blockType,
    });
  },

  rotate() {
    Dispatcher.dispatch({
      type: ActionTypes.ROTATE,
    });
  },

  // Remove the current detromino block from the grid
  removeDetromino() {
    Dispatcher.dispatch({
      type: ActionTypes.REMOVE_DETROMINO,
    });
  },

  sinkFloatingBlocks() {
    Dispatcher.dispatch({
      type: ActionTypes.SINK_FLOATING_BLOCK,
    });
  },

  sinkTargetBlocks() {
    Dispatcher.dispatch({
      type: ActionTypes.SINK_TARGET_BLOCK,
    });
  },

  enableBlockEditing() {
    let block = Algorithm.getInitialValidEditableBlock(LevelEditorGridStore.getState());

    if (!block) {
      Actions.displayError("No blocks are currently editable");
      return;
    }

    Dispatcher.dispatch({
      type: ActionTypes.ENABLE_BLOCK_EDITING,
      block,
    });
  },

  disableBlockEditing() {
    let grid = LevelEditorGridStore.getState().grid();

    if (!Algorithm.isTargetDetrominosValid(grid.get("matrix"),
        grid.get("detromino"))) {
      Actions.displayError("You can't set the target detrominos like this");
      return;
    }

    Dispatcher.dispatch({
      type: ActionTypes.DISABLE_BLOCK_EDITING,
    });
  },

  displayInfo(message) {
    Dispatcher.dispatch({
      type: ActionTypes.DISPLAY_INFO,
      message,
    });
  },

  displaySuccess(message) {
    Dispatcher.dispatch({
      type: ActionTypes.DISPLAY_SUCCESS,
      message,
    });
  },

  displayError(message) {
    Dispatcher.dispatch({
      type: ActionTypes.DISPLAY_ERROR,
      message,
    });
  },
};

export default Actions;