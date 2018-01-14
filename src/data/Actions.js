/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import ActionTypes from "../enum/ActionTypes";
import Algorithm from "../util/Algorithm";
import Direction from "../enum/Direction";
import LevelData from "../static/LevelData";
import GameUiState from "../enum/GameUiState";
import OverlayType from "../enum/OverlayTypes";
import LevelViewData from "../static/LevelViewData";
import TutorialProgress from "../enum/TutorialProgress";
import {
  createBatchActions,
  createSpecialAction
} from "../middleware/delayDispatcher";
import DispatchType from "../middleware/DispatchType";
import store from "../store/store";

const DELAY = 500;

const Actions = {
  //region game
  init(width, height) {
    return {
      type: ActionTypes.INIT_GRID,
      width,
      height,
    };
  },

  resetGrid() {
    return {
      type: ActionTypes.RESET_GRID,
    };
  },

  setUiState(uiState) {
    return createSpecialAction({
      type: ActionTypes.SET_GAME_UI_STATE,
      uiState,
    }, DispatchType.OVERWRITE);
  },

  showWelcomePage() {
    return Actions.setUiState(GameUiState.WELCOME);
  },

  showSelectLevel() {
    return Actions.setUiState(GameUiState.SELECT_LEVEL);
  },

  startTutorial() {
    return createBatchActions(
      Actions.resetGrid(),
      Actions.showTutorialUi()
    );
  },

  showTutorialUi(initProgress = TutorialProgress.BEGIN) {
    return createBatchActions(
      Actions.setUiState(GameUiState.TUTORIAL),
      Actions.setTutorialProgress(initProgress)
    );
  },

  showGridEditorUi() {
    return Actions.setUiState(GameUiState.LEVEL_EDITOR_STARTED);
  },

  showCreditUi() {
    return {
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.ABOUT,
    };
  },

  hideCreditUi() {
    return {
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.ABOUT,
    };
  },

  showSettingsUi() {
    return {
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.SETTINGS,
    };
  },

  hideSettingsUi() {
    return {
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.SETTINGS,
    };
  },

  showLevelEditorImportExport() {
    return {
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.LEVEL_EDITOR_IMPORT_EXPORT,
    };
  },

  hideLevelEditorImportExport() {
    return {
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.LEVEL_EDITOR_IMPORT_EXPORT,
    };
  },

  showTutorialGuide() {
    return {
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.TUTORIAL_GUIDE,
    };
  },

  hideTutorialGuide() {
    return {
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.TUTORIAL_GUIDE,
    };
  },

  setTutorialProgress(progress) {
    return {
      progress,
      type: ActionTypes.SET_TUTORIAL_PROGRESS,
    };
  },

  setNextTutorialProgress() {
    let progress = store.getState().tutorial.next();

    return Actions.setTutorialProgress(progress);
  },

  setPreviousTutorialProgress() {
    let progress = store.getState().tutorial.prev();

    return Actions.setTutorialProgress(progress);
  },

  nextTutorial() {
    return createBatchActions(
      Actions.setNextTutorialProgress(),
      Actions.showTutorialGuide()
    );
  },

  previousTutorial() {
    return createBatchActions(
      Actions.setPreviousTutorialProgress(),
      Actions.showTutorialGuide()
    );
  },

  /**
   * Simply set the game state of tutorial to be finished
   */
  setTutorialCompleted() {
    return {
      type: ActionTypes.SET_TUTORIAL_COMPLETED,
    };
  },

  completeTutorial() {
    if (store.getState().game.get("tutorialCompleted")) {
      // The player has completed the tutorial before, or they have skipped
      // the tutorial the first time the game is launched
      return createBatchActions(
        Actions.hideTutorialGuide(),
        Actions.showWelcomePage()
      );
    } else {
      // The player starts the tutorial from the tutorial welcome page
      return createBatchActions(
        Actions.setTutorialCompleted(),
        Actions.hideTutorialGuide(),
        Actions.startNewLevelById()
      );
    }
  },

  pause() {
    return {
      type: ActionTypes.PAUSE,
    };
  },

  resume() {
    return {
      type: ActionTypes.RESUME,
    };
  },

  levelSuccess() {
    return {
      type: ActionTypes.LEVEL_SUCCESS,
    };
  },

  levelFail() {
    return {
      type: ActionTypes.LEVEL_FAIL,
    };
  },

  showDialogForStartTutorial() {
    return Actions.showDialog(
      "Do you want to start the tutorial?",
      createBatchActions(
        Actions.startTutorial(),
        Actions.showTutorialGuide()
      )
    );
  },

  showDialogForGameRestart() {
    return Actions.showDialog(
      "Do you want to restart this level?",
      Actions.restartCurrentLevel()
    );
  },

  showDialogForResetLevelEditor() {
    return Actions.showDialog(
      "Do you want to reset the level editor?",
      Actions.resetGrid()
    );
  },

  showDialogForQuitToLevelSelect() {
    return Actions.showDialog(
      "Do you want to return to previous menu? Any changes will be lost.",
      Actions.showSelectLevel()
    );
  },

  showDialogForQuitToWelcome() {
    return Actions.showDialog(
      "Do you want to return to home page? Any changes will be lost.",
      Actions.showWelcomePage()
    );
  },

  showDialogForSkipTutorial() {
    return Actions.showDialog(
      "Do you want to skip tutorial? You can come back later from the main menu.",
      createBatchActions(
        Actions.setTutorialCompleted(),
        Actions.showSelectLevel()
      )
    );
  },

  /**
   * Called when the player decides to prematurely end the tutorial
   */
  showDialogForEndTutorial() {
    return Actions.showDialog(
      "Do you want to end tutorial now? You can come back later from the main menu.",
      createBatchActions(
        Actions.setTutorialCompleted(),
        Actions.showWelcomePage()
      )
    );
  },

  showDialog(title, onYes, onNo) {
    return {
      type       : ActionTypes.SHOW_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.DIALOG,
      title,
      onYes,
      onNo,
    };
  },

  hideDialog() {
    return {
      type       : ActionTypes.HIDE_FULLSCREEN_OVERLAY,
      overlayType: OverlayType.DIALOG,
    };
  },

  hideAllFullscreenOverlay() {
    return {
      type: ActionTypes.HIDE_ALL_FULLSCREEN_OVERLAY,
    };
  },

// endregion

// region level navigation

  levelPageNext() {
    return {
      type: ActionTypes.LEVEL_NEXT_PAGE,
    };
  },

  levelPagePrev() {
    return {
      type: ActionTypes.LEVEL_PREV_PAGE,
    };
  },

// endregion

  startNewLevelById(currentLevelId = LevelData.firstLevelId()) {
    return createBatchActions(
      createSpecialAction({
        type: ActionTypes.START_LEVEL,
        currentLevelId,
      }, DispatchType.OVERWRITE),
      Actions.apply(LevelData.getLevelById(currentLevelId))
    );
  },

  restartCurrentLevel() {
    return Actions.startNewLevelById(store.getState().level.get("currentLevelId"));
  },

  nextLevel() {
    let currentLevelId = store.getState().level.get("currentLevelId");
    let nextLevelId = LevelViewData.nextLevelId(currentLevelId);
    return Actions.startNewLevelById(nextLevelId);
  },

  /**
   * Starts a new game with grid width, height and queue, grid
   * @param {Immutable.Map<string, any>|LevelDataUnit} levelDataUnit
   */
  apply(levelDataUnit) {
    return createBatchActions(
      createSpecialAction(
        Actions.init(levelDataUnit.get("width"),
          levelDataUnit.get("height")),
        DispatchType.OVERWRITE
      ), {
        type: ActionTypes.APPLY_DATA,
        levelDataUnit,
      }
    );
  },

  nextDetromino() {
    let detrominoType = store.getState().gamePanel.present.get("queue").last();

    return createBatchActions(
      createSpecialAction({
        type: ActionTypes.APPLY_DETROMINO_BLOCKS,
      }, DispatchType.ONLY_IF_CLEAR),
      createSpecialAction({
        type: ActionTypes.SINK_TARGET_BLOCKS,
      }, DispatchType.ONLY_IF_CLEAR, DELAY),
      createSpecialAction({
        type: ActionTypes.NEXT_DETROMINO_IN_GAME,
        detrominoType,
      }, DispatchType.ONLY_IF_CLEAR, DELAY * 2),
    );
  },

  nextDetrominoInGame() {
    return Actions.nextDetromino();
  },

  nextDetrominoInEditor() {
    let detrominoType = store.getState().levelEditorPanel.present
      .get("detrominoIterator")
      .value();

    return createSpecialAction({
      type: ActionTypes.NEXT_DETROMINO_IN_EDITOR,
      detrominoType,
    }, DispatchType.ONLY_IF_CLEAR);
  },

  nextDetrominoShape() {
    return {
      type: ActionTypes.NEXT_DETROMINO_SHAPE,
    };
  },

  prevDetrominoShape() {
    return {
      type: ActionTypes.PREV_DETROMINO_SHAPE,
    };
  },

// Debug only
  debug__newRandomDetromino() {
    let detrominoType = Algorithm.generateRandomDetrominoType();

    return createBatchActions(
      Actions.applyDetrominoBlocks(),
      Actions.removeStaleAndSinkTargetBlocks(),
      {
        type: ActionTypes.NEXT_DETROMINO_IN_GAME,
        detrominoType,
      }
    );
  },

  debug__addDetrominoToQueue
    (detrominoType = Algorithm.generateRandomDetrominoType()) {
    return {
      type: ActionTypes.ADD_DETROMINO_TO_QUEUE,
      detrominoType,
    };
  },

  /**
   * A wrapper for `moveDetrominoInGame`, but this method also checks if game
   * grid meets the tutorial goal
   * @param direction
   */
  moveDetrominoInTutorial(direction) {
    return Actions.moveDetrominoInGame(direction);
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

    return createSpecialAction({
      type,
    }, DispatchType.ONLY_IF_CLEAR);
  },

  undoInGame() {
    return createSpecialAction({
      type: ActionTypes.UNDO_IN_GAME,
    }, DispatchType.ONLY_IF_CLEAR);
  },

  redoInGame() {
    return createSpecialAction({
      type: ActionTypes.REDO_IN_GAME,
    }, DispatchType.ONLY_IF_CLEAR);
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

    return createSpecialAction({
      type,
    }, DispatchType.ONLY_IF_CLEAR);
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

    return createSpecialAction({
      type,
    }, DispatchType.ONLY_IF_CLEAR);
  },

  redoInEditor() {
    return {
      type: ActionTypes.REDO_IN_EDITOR,
    };
  },

  undoInEditor() {
    return {
      type: ActionTypes.UNDO_IN_EDITOR,
    };
  },

  setBlockType(blockType) {
    return {
      type: ActionTypes.SET_BLOCKTYPE,
      blockType,
    };
  },

  rotate() {
    return {
      type: ActionTypes.ROTATE,
    };
  },

  /**
   * A wrapper for `rotate`, but this method also checks if game
   * grid meets the tutorial goal
   */
  rotateInTutorial() {
    return Actions.rotate();
  },

  // Remove the current detromino block from the grid
  removeDetromino() {
    return {
      type: ActionTypes.REMOVE_DETROMINO,
    };
  },

  applyDetrominoBlocks() {
    return {
      type: ActionTypes.APPLY_DETROMINO_BLOCKS,
    };
  },

  sinkTargetBlocks() {
    return {
      type: ActionTypes.SINK_TARGET_BLOCKS,
    };
  },

  enableBlockEditing() {
    let block = Algorithm.getInitialValidEditableBlock(store.getState().levelEditorPanel.present);

    if (!block) {
      return Actions.displayError("No blocks are currently editable");
    }

    return {
      type: ActionTypes.ENABLE_BLOCK_EDITING,
      block,
    };
  },

  disableBlockEditing() {
    let grid = store.getState().levelEditorPanel.present.grid();

    if (!Algorithm.isTargetDetrominosValid(grid.get("matrix"),
        grid.get("detromino"))) {
      return Actions.displayError(
        "You can't set the target detrominos like this");
    }

    return {
      type: ActionTypes.DISABLE_BLOCK_EDITING,
    };
  },

  displayInfo(message) {
    return {
      type: ActionTypes.DISPLAY_INFO,
      message,
    };
  },

  displaySuccess(message) {
    return {
      type: ActionTypes.DISPLAY_SUCCESS,
      message,
    };
  },

  displayError(message) {
    return {
      type: ActionTypes.DISPLAY_ERROR,
      message,
    };
  },
};

export default Actions;