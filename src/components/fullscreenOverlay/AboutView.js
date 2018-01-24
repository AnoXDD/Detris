/**
 * Created by Anoxic on 10/6/2017.
 */

import React, {Component} from "react";

import FullscreenOverlayView from "./FullscreenOverlayView";
import Actions from "../../data/Actions";
import store from "../../store/store";

export default class AboutView extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <FullscreenOverlayView
        className="about-view"
        title="credit"
        onBackgroundClick={() => store.dispatch(Actions.hideCreditUi())}
      >
        <div className="about-section">
          <p className="title">Developer</p>
          <p className="sub-title">Design & Programming</p>
          <p>Runjie Guan</p>
          <p><a href="https://anoxic.me">https://anoxic.me</a></p>
        </div>
        <div className="about-section">
          <p className="title">Open source</p>
          <p>Original game <a href="https://github.com/AnoXDD/Detris">on
            Github</a></p>
          <p className="sub-title">Icons</p>
          <p><a href="https://github.com/google/material-design-icons/">Google
            Material Design Icons</a></p>
        </div>
      </FullscreenOverlayView>
    );
  }
}
