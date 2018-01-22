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

      default:
    }

    if (musicType) {
      playSound(musicType);
    }

    next(action);
  }
};