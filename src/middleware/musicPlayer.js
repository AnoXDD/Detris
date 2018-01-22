/**
 * Created by Anoxic on 1/21/2018.
 *
 * A middleware to play music on certain type of music
 */


export default function musicPlayer(next) {
  return next => action => {
    next(action);
  }
};