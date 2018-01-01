/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import Actions from "../../data/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";

export default class TutorialGuideView extends Component {

  render() {
    return (
      <FullscreenOverlayView
        title=""
        className={`tutorial-guide-view ${this.props.position || ""}`}
        onBackgroundClick={this.props.onNext}
      >
        <div className="guide-text">
          I should be the guide
        </div>
        <div className="btns">
          <Button
            text="dismiss"
            class="blue"
            onClick={this.onNextLevel}
          >close</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}