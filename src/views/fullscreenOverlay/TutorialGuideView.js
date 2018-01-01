/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import FullscreenOverlayView from "./FullscreenOverlayView";
import TutorialText from "../../data/enum/TutorialText";

export default class TutorialGuideView extends Component {

  render() {
    return (
      <FullscreenOverlayView
        title=""
        className={`tutorial-guide-view ${this.props.position || ""}`}
        onBackgroundClick={this.props.onDismiss}
        update={true}
      >
        <div className="guide-text">
          {TutorialText[this.props.tutorial.progress]}
        </div>
        <div className="btns">
          <Button
            text="dismiss"
            class="blue"
            onClick={this.props.onDismiss}
          >close</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}