/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import ActionTypes from "./ActionTypes";
import Algorithm from "../Algorithm";
import Dispatcher from "../Dispatcher";
import QueueStore from "../queue/QueueStore";
import Direction from "./Direction";
import LevelData from "../game/static/LevelData";
import GameUiState from "./GameUiState";

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
    Actions.setUiState(GameUiState.SHOW_LEVEL_EDITOR);
  },

  showCredit() {
    Dispatcher.dispatch({
      type: ActionTypes.SHOW_CREDIT,
    });
  },

  hideCredit() {
    Dispatcher.dispatch({
      type: ActionTypes.HIDE_CREDIT,
    });
  },

  showSettings() {
    Dispatcher.dispatch({
      type: ActionTypes.SHOW_SETTINGS,
    })
  },

  hideSettings() {
    Dispatcher.dispatch({
      type: ActionTypes.HIDE_SETTINGS,
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

  showDialogForGameRestart(currentLevel) {
    Actions.showDialog(
      "Do you want to restart this level?",
      () => Actions.startNewLevel(currentLevel),
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
      type: ActionTypes.SHOW_DIALOG,
      title,
      onYes,
      onNo,
    });
  },

  hideDialog() {
    Dispatcher.dispatch({
      type: ActionTypes.HIDE_DIALOG,
    });
  },

  hideFloatingWindows() {
    Dispatcher.dispatch({
      type: ActionTypes.HIDE_FLOATING_WINDOWS,
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

    LevelData.getLevel(currentLevel);
    let parameters = LevelData.getLevel(currentLevel);
    Actions.apply(parameters);
  },

  /**
   * Starts a new game with grid width, height and queue, grid
   * @param parameters - an object with:
   *    width - the grid width
   *    height - the grid height
   *    detrominoList - the queue represented by an Immutable list of objects
   *   that can be converted to Detromino
   *    blockList - the grid represented by an Immutable Map of objects that
   *   can be converted to Block
   */
  apply(parameters) {
    let {width, height, queueList, blockList} = parameters;
    Dispatcher.clearAllFuturePayloads();

    Actions.init(width, height);

    Dispatcher.dispatch({
      type: ActionTypes.APPLY_DATA,
      blockList,
      queueList,
    })
  },

  nextDetrominoInGame() {
    if (Dispatcher.willBeDispatching()) {
      return;
    }

    let detrominoType = QueueStore.getState().last();
    // todo optimization: just drop it if it won't break anything
    Dispatcher.dispatch({
      type: ActionTypes.SINK_FLOATING_BLOCK,
    });
    Dispatcher.dispatch({
      type: ActionTypes.SINK_TARGET_BLOCK,
    }, DELAY);

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO,
      detrominoType,
    }, DELAY * 2);
  },

  nextDetrominoInEditor() {
    if (Dispatcher.willBeDispatching()) {
      return;
    }

    let detrominoType = QueueStore.getState().last();
    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO,
      detrominoType,
    });
  },

  // Debug only
  debug__newRandomDetromino() {
    Actions.sinkFloatingBlocks();
    Actions.sinkTargetBlocks();

    let detrominoType = Algorithm.generateRandomDetrominoType();

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO,
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
    Dispatcher.dispatch({
      type: ActionTypes.ENABLE_BLOCK_EDITING,
    });
  },

  disableBlockEditing() {
    Dispatcher.dispatch({
      type: ActionTypes.DISABLE_BLOCK_EDITING,
    });
  },
};

export default Actions;