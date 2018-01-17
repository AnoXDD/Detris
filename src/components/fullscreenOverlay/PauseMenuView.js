/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import Actions from "../../data/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";
import store from "../../store/store";

export default class PauseMenuView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        onBackgroundClick={this.props.onBack}
        title="pause"
      >
        <div className="btns">
          <Button
            onClick={this.props.onRestart}
          >replay</Button>
          <Button
            onClick={() => store.dispatch(Actions.showSettingsUi())}
          >settings</Button>
        </div>
        <div className="btns">
          <Button
            text="resume"
            onClick={this.props.onBack}
          >play_arrow</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}