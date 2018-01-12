/**
 * Created by Anoxic on 1/11/2018.
 *
 * This test file is separated because it will cause circular dependency when placed with Tokenizer.test.js
 */

import ControlPresets from "../enum/ControlPresets";
import ControlStateTokenizer from "../tokenizer/ControlStateTokenizer";

test("ControlState", () => {
  // Iterative testing: test every case
  let ids = Object.keys(ControlPresets);

  for (let id of ids) {
    let state = ControlPresets[id];
    let state2 = ControlStateTokenizer.tokenizeControlState(ControlStateTokenizer.detokenizeControlState(
      state));

    expect(state2.get("controlRecordId")).toBe(id);
  }
});
