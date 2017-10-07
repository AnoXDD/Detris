/**
 * Created by Anoxic on 10/6/2017.
 */

import React, {Component} from "react";
import FullscreenOverlayView from "./FullscreenOverlayView";
import Toggle from "../lib/Toggle";

export default class SettingsView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        title="settings"
      >
        <Toggle firstIcon="volume_up" secondIcon="volume_off"/>
      </FullscreenOverlayView>
    );
  }
}