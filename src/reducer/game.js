/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import Immutable from "immutable";

import ActionType from "../enum/ActionType";
import GameUiState from "../enum/GameUiState";
import GameState from "../state/Game";
import OverlayType from "../enum/OverlayType";
import TopBarType from "../enum/TopBarType";
import PanelType from "../enum/PanelType";
import DialogTitle from "../enum/DialogTitle";

function reset() {
  return new GameState();
}

function getInitialState() {
  return applyTopBarState(reset());
}

function hideAllFloatingWindows(state) {
  return state.set("activeOverlay", state.get("activeOverlay").clear());
}

/**
 * Applies the game state to top bar state
 * @param state
 */
function applyTopBarState(state) {
  let topBar = new Immutable.Set();

  switch (state.get("uiState")) {
    case GameUiState.WELCOME:
      // no-op, nothing to be shown
      break;
    case GameUiState.TUTORIAL:
      topBar = topBar.add(TopBarType.TOP_TUTORIAL_INFO)
        .add(TopBarType.TOP_BACK);
      break;
    case GameUiState.SELECT_LEVEL:
      topBar = topBar.add(TopBarType.TOP_BACK);
      break;
    case GameUiState.IN_GAME:
      topBar = topBar.add(TopBarType.TOP_PAUSE).add(TopBarType.TOP_BACK);
      break;
    case GameUiState.LEVEL_EDITOR_STARTED:
      topBar = topBar.add(TopBarType.TOP_PAUSE)
        .add(TopBarType.TOP_BACK)
        .add(TopBarType.TOP_IMPORT_EXPORT);
      break;
    default:
  }

  return state.set("topBar", topBar);
}

function applyPanelType(state) {
  let uiState = state.get("uiState");

  switch (uiState) {
    case GameUiState.IN_GAME:
      return state.set("panelType", PanelType.IN_GAME);
    case GameUiState.TUTORIAL:
      return state.set("panelType", PanelType.TUTORIAL);
    case GameUiState.LEVEL_EDITOR_STARTED:
      return state.set("panelType", PanelType.LEVEL_EDITOR);
    default:
      return state.set("panelType", PanelType.NONE);
  }
}

export default function reduce(state = getInitialState(), action) {
  switch (action.type) {
    case ActionType.RESET:
      return getInitialState();

    case ActionType.START_LEVEL:
      return applyTopBarState(state
        .set("uiState", GameUiState.IN_GAME)
        .set("panelType", PanelType.IN_GAME)
      );

    case ActionType.SET_GAME_UI_STATE:
      let {uiState} = action;
      state = state.set("uiState", uiState);

      if (uiState === GameUiState.TUTORIAL) {
        state = state.set("activeOverlay",
          state.get("activeOverlay").add(OverlayType.TUTORIAL_GUIDE));
      }

      state = applyPanelType(state);
      return applyTopBarState(state);

    case ActionType.RESUME:
      return state.set("activeOverlay",
        state.get("activeOverlay").remove(OverlayType.PAUSE_GAME));

    case ActionType.PAUSE:
      return state.set("activeOverlay",
        state.get("activeOverlay").add(OverlayType.PAUSE_GAME));

    case ActionType.LEVEL_SUCCESS:
      return state.set("activeOverlay",
        state.get("activeOverlay").add(OverlayType.NEXT_LEVEL));

    case ActionType.SHOW_FULLSCREEN_OVERLAY:
      switch (action.overlayType) {
        case OverlayType.DIALOG:
          let {dialogType} = action;

          return state.set("dialogTitle", DialogTitle[dialogType])
            .set("activeOverlay",
              state.get("activeOverlay").add(OverlayType.DIALOG));
        case OverlayType.ABOUT:
        case OverlayType.SETTINGS:
        case OverlayType.LEVEL_EDITOR_IMPORT_EXPORT:
        case OverlayType.TUTORIAL_GUIDE:
          return state.set("activeOverlay",
            state.get("activeOverlay").add(action.overlayType));
        default:
          return state;
      }

    case ActionType.HIDE_FULLSCREEN_OVERLAY:
      switch (action.overlayType) {
        case OverlayType.DIALOG:
        case OverlayType.ABOUT:
        case OverlayType.SETTINGS:
        case OverlayType.LEVEL_EDITOR_IMPORT_EXPORT:
        case OverlayType.TUTORIAL_GUIDE:
          return state.set("activeOverlay",
            state.get("activeOverlay").remove(action.overlayType));
        default:
          return state;
      }

    case ActionType.HIDE_ALL_FULLSCREEN_OVERLAY:
      return hideAllFloatingWindows(state);

    case ActionType.SET_TUTORIAL_COMPLETED:
      return state.set("tutorialCompleted", true);

    case ActionType.SET_SOUND_ENABLED:
      return state.set("sound", action.enabled);

    case ActionType.SET_NO_ANIMATION:
      return state.set("noAnimation", action.enabled);

    default:
      return state;
  }
}
