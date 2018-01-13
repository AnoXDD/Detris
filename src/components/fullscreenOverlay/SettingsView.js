/**
 * Created by Anoxic on 10/6/2017.
 */

import React, {Component} from "react";
import FullscreenOverlayView from "./FullscreenOverlayView";
import Toggle from "../../lib/Toggle";
import Actions from "../../data/Actions";
import Button from "../../lib/Button";
import store from "../../store/store";

export default class SettingsView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        title="settings"
        onBackgroundClick={() => store.dispatch(Actions.hideSettingsUi)}
      >
        <div className="btns">
          <Toggle firstIcon="volume_up" secondIcon="volume_off"/>
        </div>
        <div className="btns">
          <Button
            onClick={() => store.dispatch(Actions.hideSettingsUi)}
            text="done"
            className="accent">done</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}