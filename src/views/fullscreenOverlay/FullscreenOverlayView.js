/**
 * Created by Anoxic on 10/6/2017.
 */

import React, {Component} from "react";
import TitleBoxView from "../TitleBoxView";

// This class is supposed to be const one created
export default class FullscreenOverlayView extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        className={`container fullscreen-view ${this.props.className || ""}`}
      >
        <span
          className="fullscreen-menu-background"
          onClick={this.props.onBackgroundClick}
        />
        <div className="fullscreen-menu-actual-wrapper flex-center">
          <div className="fullscreen-menu-actual">
            <TitleBoxView title={this.props.title}>
              {this.props.children}
            </TitleBoxView>
          </div>
        </div>
      </div>
    );
  }
}