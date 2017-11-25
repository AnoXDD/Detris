/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import Actions from "../../data/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";

export default class NextLevelView extends Component {

  onBack() {
    Actions.hideAllFullscreenOverlay();
    Actions.showSelectLevel();
  }

  onRestart() {
    Actions.hideAllFullscreenOverlay();
    Actions.restartCurrentLevel();
  }

  onNextLevel() {
    Actions.hideAllFullscreenOverlay();
    Actions.nextLevel();
  }

  render() {
    return (
      <FullscreenOverlayView
        title="solved!"
      >
        <div className="title wide">
          Nice!
        </div>
        <div className="btns">
          <Button
            onClick={this.onBack}
          >arrow_back</Button>
          <Button
            onClick={this.onRestart}
          >replay</Button>
        </div>
        <div className="btns">
          <Button
            text="next level"
            onClick={this.onNextLevel}
          >play_arrow</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}