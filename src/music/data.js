/**
 * Created by Anoxic on 1/21/2018.
 */

import MusicType from "../enum/MusicType";

// The order of each music in music.mp3
const ORDER = Object.keys(MusicType).sort();

/**
 * A list of data.
 *
 * Offset is a plus/minus milliseconds to determine when to play of that
 * specific sfx
 *
 * Duration is the effective length of the file, i.e. how long the sound effect
 * will play. It's shorter than length because there can be silence after the
 * actual sfx. (in milliseconds)
 *
 * Length (TLDR: DO NOT CHANGE!) is the actual duration of the file (in
 * milliseconds). We want to keep the original file length so that if we are to
 * add new sfx in the future, we can calculate the start position of each sfx
 * track.
 */
const MusicData = {
  [MusicType.BUTTON_CLICK]        : {
    type    : MusicType.BUTTON_CLICK,
    offset  : 0,
    duration: 300,
    length  : 500,
  },
  [MusicType.CONTROL_CLICK]       : {
    type    : MusicType.CONTROL_CLICK,
    offset  : 0,
    duration: 300,
    length  : 500,
  },
  [MusicType.DIALOG_OPEN]         : {
    type    : MusicType.DIALOG_OPEN,
    offset  : 0,
    duration: 100,
    length  : 300,
  },
  [MusicType.DIALOG_CLOSE]        : {
    type    : MusicType.DIALOG_CLOSE,
    offset  : 0,
    duration: 150,
    length  : 300,
  },
  [MusicType.LEVEL_SUCCESS]       : {
    type    : MusicType.LEVEL_SUCCESS,
    offset  : 0,
    duration: 1000,
    length  : 1000,
  },
  [MusicType.NOTIFICATION_SUCCESS]: {
    type    : MusicType.NOTIFICATION_SUCCESS,
    offset  : 0,
    duration: 500,
    length  : 500,
  },
  [MusicType.NOTIFICATION_ERROR]  : {
    type    : MusicType.NOTIFICATION_ERROR,
    offset  : 0,
    duration: 300,
    length  : 500,
  },
  [MusicType.DETROMINO_FALLING]   : {
    type    : MusicType.DETROMINO_FALLING,
    offset  : 0,
    duration: 800,
    length  : 800,
  },
  [MusicType.DETROMINO_BREAKING]  : {
    type    : MusicType.DETROMINO_BREAKING,
    offset  : 0,
    duration: 500,
    length  : 500,
  },
};

// Process where the music starts in the music file
(() => {
  let start = 0;

  for (let type of ORDER) {
    MusicData[type].start = start;

    let {length, offset = 0} = MusicData[type];
    if (!length) {
      console.warn(`music/data.js: attribute \`length\` for music type ${type} is not specified`);
      length = MusicData[type].duration || 0;
    }

    start += (length + offset);
  }
})();

export default MusicData;