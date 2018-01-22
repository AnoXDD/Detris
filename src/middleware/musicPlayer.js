/**
 * Created by Anoxic on 1/21/2018.
 *
 * A middleware to play music on certain type of music
 */

import ActionType from "../enum/ActionType";
import MusicType from "../enum/MusicType";
import {playSound} from "../music/music";

const typeMap = {
  [ActionType.SHOW_FULLSCREEN_OVERLAY]: MusicType.DIALOG_OPEN,
  [ActionType.HIDE_FULLSCREEN_OVERLAY]: MusicType.DIALOG_CLOSE,
};

export default function musicPlayer(store) {
  return next => action => {
    let musicType = typeMap[action.type];

    if (musicType) {
      playSound(musicType);
    }

    next(action);
  }
};