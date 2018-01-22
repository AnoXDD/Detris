/**
 * Created by Anoxic on 1/21/2018.
 *
 * A file for playing sound effect (sfx) in the game. This file was based on
 * file copied from
 * https://github.com/chvin/react-tetris/blob/60703933a3c85457965f9bce69ab0b19b6d2f569/src/unit/music.js
 */

import store from "../store/store";
import data from "./data";

const AudioContext = (
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext
);

let hasWebAudioAPI =
  !!AudioContext && location.protocol.indexOf('http') !== -1;

// The initial state of the function to play music
let playSound = type => {
};

(() => {
  if (!hasWebAudioAPI.data) {
    return;
  }
  const url = './music.mp3';
  const context = new AudioContext();
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.responseType = 'arraybuffer';

  req.onload = () => {
    context.decodeAudioData(req.response, (buf) => {
        const getSource = () => {
          const source = context.createBufferSource();
          source.buffer = buf;
          source.connect(context.destination);
          return source;
        };

        playSound = type => {
          if (!data[type]) {
            console.error("Unrecognized sound type: ", type);
            return false;
          }

          let {start, duration} = data[type];
          getSource().start(0, start, duration);

          return true;
        };
      },
      error => {
        console.error(`Unable to read ${url}`, error);
        hasWebAudioAPI = false;
      });
  };

  req.send();
})();

export default {
  hasWebAudioAPI,
  playSound,
};