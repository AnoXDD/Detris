/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import FullscreenOverlayView from "./FullscreenOverlayView";
import TutorialText from "../../enum/TutorialText";
import Actions from "../../data/Actions";
import TutorialProgress from "../../enum/TutorialProgress";
import store from "../../store/store";

export default class TutorialGuideView extends Component {

  render() {
    let {progress} = this.props;
    return (
      <FullscreenOverlayView
        title=""
        className={`tutorial-guide-view ${this.props.position}`}
        onBackgroundClick={this.props.onDismiss}
        update={true}
      >
        <div className="guide-text">
          {TutorialText[progress]}
        </div>
        <div className="btns">
          {progress !== TutorialProgress.BEGIN ?
            <Button
              onClick={() => store.dispatch(Actions.previousTutorial())}
            >skip_previous</Button> : null}
          <Button
            className="blue"
            onClick={this.props.onDismiss}
          >play_arrow</Button>
          {progress !== TutorialProgress.BEGIN && progress !== TutorialProgress.END ?
            <Button
              onClick={() => store.dispatch(Actions.nextTutorial())}
            >skip_next</Button> : null}
        </div>
      </FullscreenOverlayView>
    );
  }
}