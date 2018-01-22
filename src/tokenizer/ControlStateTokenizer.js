/**
 * Created by Anoxic on 1/11/2018.
 */

import GeneralTokenizer from "./GeneralTokenizer";
import ControlPresets from "../enum/ControlPreset";

export default class ControlStateTokenizer {
  static tokenizeControlState(str) {
    let {controlRecordId} = GeneralTokenizer.tokenize(str);

    return ControlPresets[controlRecordId] || ControlPresets.EMPTY;
  }

  static detokenizeControlState(controlState) {
    let controlRecordId = controlState.get("controlRecordId");

    return GeneralTokenizer.detokenize({controlRecordId,});
  }
};