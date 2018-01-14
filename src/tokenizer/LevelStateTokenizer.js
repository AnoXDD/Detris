/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GeneralTokenizer from "./GeneralTokenizer";
import LevelViewData from "../static/LevelViewData";
import CompletedLevel from "../state/LevelCompletion";
import LevelState from "../state/Level";

export default class LevelStateTokenizer {
  static tokenizeLevelState(str) {
    let obj = GeneralTokenizer.tokenize(str);
    obj.view = LevelViewData.views().get(obj.currentPage);

    // Convert completedLevels
    let {completedLevels} = obj;
    let ids = Object.keys(completedLevels);

    for (let id of ids) {
      completedLevels[id] = new CompletedLevel(completedLevels[id]);
    }

    obj.completedLevels = Immutable.Map(completedLevels);

    return new LevelState(obj);
  }

  /**
   * Detokenizes level state (throwing away `view` because it's synced with
   * `currentPage` - see Level.js for more detail)
   * @param {Immutable.Map|LevelState} levelState
   */
  static detokenizeLevelState(levelState) {
    let obj = levelState.toJS();
    delete obj.view;

    return GeneralTokenizer.detokenize(obj);
  }
}