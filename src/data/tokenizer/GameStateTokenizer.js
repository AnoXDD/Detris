/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GeneralTokenizer from "./GeneralTokenizer";
import GameState from "../game/GameState";

export default class GameStateTokenizer {
  static tokenizeGameState(str) {
    let obj = GeneralTokenizer.tokenize(str);
    obj.topBar = Immutable.Set(obj.topBar);
    obj.activeOverlay = Immutable.Set(obj.activeOverlay);

    return new GameState(obj);
  }

  /**
   * Detokenizes game state
   * @param {GameState} gameState
   * @return {string}
   */
  static detokenizeGameState(gameState) {
    return GeneralTokenizer.detokenize(gameState.toJS());
  }
}