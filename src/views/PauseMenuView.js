/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import Actions from "../data/enum/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";

export default class PauseMenuView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        onBackgroundClick={this.props.onPause}
        title="pause"
      >
        <div className="btns">
          <Button
            onClick={Actions.showDialogForGameRestart}
          >replay</Button>
          <Button
            onClick={Actions.showDialogForQuitToLevelSelect}
          >list</Button>
          <Button>settings</Button>
        </div>
        <div className="btns">
          <Button
            text="resume"
            onClick={this.props.onPause}
          >play_arrow</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}