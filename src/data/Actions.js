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
import LevelEditorGridStore from "./grid/levelEditor/LevelEditorGridStore";
import OverlayType from "./enum/OverlayTypes";
import LevelStateStore from "./game/level/LevelStateStore";
import LevelViewData from "./game/static/LevelViewData";
import TutorialStore from "./game/tutorial/TutorialStore";
import TutorialProgress from "./enum/TutorialProgress";
import GameGridStore from "./grid/GameGridStore";
import TutorialHelper from "./game/tutorial/TutorialHelper";
import GameStateStore from "./game/GameStateStore";

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

  startTutorial() {
    Actions.resetGrid();
    Actions.showTutorialUi();
  },

  // todo set initProgress to be the actual progress
  showTutorialUi(initProgress = TutorialProgress.TUTORIAL_INTRO) {
    Actions.setUiState(GameUiState.TUTORIAL);
    Actions.setTutorialProgress(initProgress);
  },

  showGridEditorUi() {
    Actions.setUiState(GameUiState.LEVEL_EDITOR_STARTED);
  },

  showCreditUi() {
    Dispatcher.dispatch({
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.ABOUT,
    });
  },

  hideCreditUi() {
    Dispatcher.dispatch({
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.ABOUT,
    });
  },

  showSettingsUi() {
    Dispatcher.dispatch({
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.SETTINGS,
    })
  },

  hideSettingsUi() {
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

  showTutorialGuide() {
    Dispatcher.dispatch({
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.TUTORIAL_GUIDE,
    });
  },

  hideTutorialGuide() {
    Dispatcher.dispatch({
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.TUTORIAL_GUIDE,
    });
  },

  setTutorialProgress(progress) {
    Dispatcher.dispatch({
      progress,
      type: ActionTypes.SET_TUTORIAL_PROGRESS,
    });
  },

  setNextTutorialProgress() {
    let progress = TutorialStore.getState().next();

    Dispatcher.dispatch({
      progress,
      type: ActionTypes.SET_TUTORIAL_PROGRESS,
    });
  },

  nextTutorial() {
    Actions.setNextTutorialProgress();
    Actions.showTutorialGuide();
  },

  /**
   * Simply set the game state of tutorial to be finished
   */
  setTutorialCompleted() {
    Dispatcher.dispatch({
      type: ActionTypes.SET_TUTORIAL_COMPLETED,
    });
  },

  completeTutorial() {
    // todo handle the case if the tutorial starts from main menu
    if (GameStateStore.getState().get("tutorialCompleted")) {
      // The player has completed the tutorial before, or they have skipped the
      // tutorial the first time the game is launched
      Actions.showWelcomePage();
    } else {
      // The player starts the tutorial from the tutorial welcome page
      Actions.setTutorialCompleted();
      Actions.hideTutorialGuide();
      Actions.startNewLevel();
    }
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

  showDialogForStartTutorial() {
    Actions.showDialog(
      "Do you want to start the tutorial?",
      () => {
        Actions.startTutorial();
        Actions.showTutorialGuide();
      }
    );
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

  showDialogForSkipTutorial() {
    Actions.showDialog(
      "Do you want to skip tutorial? You can come back later from the main menu.",
      () => {
        Actions.setTutorialCompleted();
        Actions.showSelectLevel();
      }
    );
  },

  /**
   * Called when the player decides to prematurely end the tutorial
   */
  showDialogForEndTutorial() {
    Actions.showDialog(
      "Do you want to end tutorial now? You can come back later from the main menu.",
      () => {
        Actions.setTutorialCompleted();
        Actions.showWelcomePage();
      }
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

  startNewLevel(currentLevelId = LevelData.firstLevel()) {
    Dispatcher.clearAllFuturePayloads();

    Dispatcher.dispatch({
      type: ActionTypes.START_LEVEL,
      currentLevelId,
    });

    Actions.apply(LevelData.getLevelById(currentLevelId));
  },

  markCurrentLevelAsCompleted(currentLevelId = LevelStateStore.getState()
    .get("currentLevelId")) {
    Dispatcher.dispatch({
      type: ActionTypes.MARK_LEVEL_AS_COMPLETED,
      currentLevelId,
    });
  },

  restartCurrentLevel() {
    Actions.startNewLevel(LevelStateStore.getState().get("currentLevelId"));
  },

  nextLevel() {
    let currentLevelId = LevelStateStore.getState().get("currentLevelId");
    let nextLevelId = LevelViewData.nextLevel(currentLevelId);
    Actions.startNewLevel(nextLevelId);
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

  nextDetromino() {
    if (Dispatcher.willBeDispatching()) {
      return;
    }

    let detrominoType = QueueStore.getState().get("queue").last();
    // todo optimization: just drop it if it won't break anything
    Dispatcher.dispatch({
      type: ActionTypes.APPLY_DETROMINO_BLOCKS,
    });
    Dispatcher.dispatch({
      type: ActionTypes.SINK_TARGET_BLOCKS,
    }, DELAY);

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO_IN_GAME,
      detrominoType,
    }, DELAY * 2);
  },

  nextDetrominoInGame() {
    Actions.nextDetromino();

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
    Actions.applyDetrominoBlocks();
    Actions.removeStaleAndSinkTargetBlocks();

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

  /**
   * A wrapper for `moveDetrominoInGame`, but this method also checks if game
   * grid meets the tutorial goal
   * @param direction
   */
  moveDetrominoInTutorial(direction) {
    Actions.moveDetrominoInGame(direction);

    if (TutorialHelper.isDetrominoReachedHighlightArea(GameGridStore.getState())) {
      Actions.nextTutorial();
    }
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

  undoInGame() {
    Dispatcher.dispatch({
      type: ActionTypes.UNDO_IN_GAME,
    });
  },

  redoInGame() {
    Dispatcher.dispatch({
      type: ActionTypes.REDO_IN_GAME,
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

  /**
   * A wrapper for `rotate`, but this method also checks if game
   * grid meets the tutorial goal
   */
  rotateInTutorial() {
    Actions.rotate();

    if (TutorialHelper.isDetrominoReachedHighlightArea(GameGridStore.getState())) {
      Actions.nextTutorial();
    }
  },

  // Remove the current detromino block from the grid
  removeDetromino() {
    Dispatcher.dispatch({
      type: ActionTypes.REMOVE_DETROMINO,
    });
  },

  applyDetrominoBlocks() {
    Dispatcher.dispatch({
      type: ActionTypes.APPLY_DETROMINO_BLOCKS,
    });
  },

  sinkTargetBlocks() {
    Dispatcher.dispatch({
      type: ActionTypes.SINK_TARGET_BLOCKS,
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