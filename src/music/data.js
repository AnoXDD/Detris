/**
 * Created by Anoxic on 1/21/2018.
 */

import MusicType from "../enum/MusicType";

// The order of each music in music.mp3
const ORDER = Object.keys(MusicType).sort();

/**
 * A list of data.
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
    start   : 0,
    duration: 601,
    length  : 601,
  },
  [MusicType.CONTROL_CLICK]       : {
    type    : MusicType.CONTROL_CLICK,
    start   : 0,
    duration: 1332,
    length  : 1332,
  },
  [MusicType.DIALOG_OPEN]         : {
    type    : MusicType.DIALOG_OPEN,
    start   : 0,
    duration: 575,
    length  : 575,
  },
  [MusicType.DIALOG_CLOSE]        : {
    type    : MusicType.DIALOG_CLOSE,
    start   : 0,
    duration: 575,
    length  : 575,
  },
  [MusicType.LEVEL_SUCCESS]       : {
    type    : MusicType.LEVEL_SUCCESS,
    start   : 0,
    duration: 1384,
    length  : 1384,
  },
  [MusicType.NOTIFICATION_SUCCESS]: {
    type    : MusicType.NOTIFICATION_SUCCESS,
    start   : 0,
    duration: 2090,
    length  : 2090,
  },
  [MusicType.NOTIFICATION_ERROR]  : {
    type    : MusicType.NOTIFICATION_ERROR,
    start   : 0,
    duration: 1384,
    length  : 1384,
  },
  [MusicType.DETROMINO_FALLING]   : {
    type    : MusicType.DETROMINO_FALLING,
    start   : 0,
    duration: 0,
  },
  [MusicType.DETROMINO_APPLYING]  : {
    type    : MusicType.DETROMINO_APPLYING,
    start   : 0,
    duration: 0,
  },
};

// todo Process where the music starts in the music file


export default MusicData;