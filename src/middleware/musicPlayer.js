/**
 * Created by Anoxic on 1/21/2018.
 *
 * A middleware to play music on certain type of music
 */

import ActionType from "../enum/ActionType";
import MusicType from "../enum/MusicType";
import {playSound} from "../music/music";

export default function musicPlayer(store) {
  return next => action => {
    // Special case when the user is toggling sound on/off
    if (action.type === ActionType.SET_SOUND_ENABLED) {
      if (action.enabled) {
        playSound(MusicType.CONTROL_CLICK);
      }

      next(action);
      return;
    }

    // Don't play sound if the settings is off
    if (!store.getState().game.get("sound")) {
      next(action);
      return;
    }

    let musicType = null;

    switch (action.type) {
      case ActionType.SHOW_FULLSCREEN_OVERLAY:
      case ActionType.PAUSE:
        musicType = MusicType.DIALOG_OPEN;
        break;

      case ActionType.HIDE_FULLSCREEN_OVERLAY:
      case ActionType.RESUME:
        musicType = MusicType.DIALOG_CLOSE;
        break;

      case ActionType.DISPLAY_SUCCESS:
        musicType = MusicType.NOTIFICATION_SUCCESS;
        break;

      case ActionType.LEVEL_FAIL:
      case ActionType.DISPLAY_ERROR:
        musicType = MusicType.NOTIFICATION_ERROR;
        break;

      case ActionType.SET_GAME_UI_STATE:
      case ActionType.START_LEVEL:
      case ActionType.LEVEL_NEXT_PAGE:
      case ActionType.LEVEL_PREV_PAGE:
        musicType = MusicType.BUTTON_CLICK;
        break;

      case ActionType.LEVEL_SUCCESS:
        musicType = MusicType.LEVEL_SUCCESS;
        break;

      case ActionType.ROTATE:
      case ActionType.DETROMINO_MOVE_LEFT:
      case ActionType.DETROMINO_MOVE_RIGHT:
      case ActionType.DETROMINO_MOVE_UP:
      case ActionType.DETROMINO_MOVE_DOWN:
      case ActionType.ENABLE_BLOCK_EDITING:
      case ActionType.DISABLE_BLOCK_EDITING:
      case ActionType.EDITOR_DETROMINO_MOVE_LEFT:
      case ActionType.EDITOR_DETROMINO_MOVE_RIGHT:
      case ActionType.EDITOR_DETROMINO_MOVE_UP:
      case ActionType.EDITOR_DETROMINO_MOVE_DOWN:
      case ActionType.EDITOR_BLOCK_MOVE_LEFT:
      case ActionType.EDITOR_BLOCK_MOVE_RIGHT:
      case ActionType.EDITOR_BLOCK_MOVE_UP:
      case ActionType.EDITOR_BLOCK_MOVE_DOWN:
      case ActionType.SET_BLOCKTYPE:
      case ActionType.NEXT_DETROMINO_SHAPE:
      case ActionType.PREV_DETROMINO_SHAPE:
      case ActionType.UNDO_IN_EDITOR:
      case ActionType.REDO_IN_EDITOR:
        musicType = MusicType.CONTROL_CLICK;
        break;

      default:
    }

    if (musicType) {
      playSound(musicType);
    }

    next(action);
  }
};