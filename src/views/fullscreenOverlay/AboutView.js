/**
 * Created by Anoxic on 10/6/2017.
 */

import React, {Component} from "react";
import FullscreenOverlayView from "./FullscreenOverlayView";
import Actions from "../../data/Actions";

export default class AboutView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        className="about-view"
        title="credit"
        onBackgroundClick={Actions.hideCreditUi}
      >
        <div className="about-section">
          <p className="title">Developer</p>
          <p className="sub-title">Design & Programming</p>
          <p>Runjie Guan</p>
          <a href="https://anoxic.me">https://anoxic.me</a>
        </div>
        <div className="about-section">
          <p className="title">Open source</p>
          Original game <a href="https://github.com/AnoXDD/Detris">on Github</a>
          <p className="sub-title">Icons</p>
          <a href="https://github.com/google/material-design-icons/">Google
            Material Design Icons</a>
        </div>
      </FullscreenOverlayView>
    );
  }
}