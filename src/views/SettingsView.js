/**
 * Created by Anoxic on 10/6/2017.
 */

import React, {Component} from "react";
import FullscreenOverlayView from "./FullscreenOverlayView";
import Toggle from "../lib/Toggle";
import Actions from "../data/enum/Actions";
import Button from "../lib/Button";

export default class SettingsView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        title="settings"
        onBackgroundClick={Actions.hideSettings}
      >
        <div className="btns">
          <Toggle firstIcon="volume_up" secondIcon="volume_off"/>
        </div>
        <div className="btns">
          <Button
            onClick={Actions.hideSettings}
            text="done"
            className="accent">done</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}