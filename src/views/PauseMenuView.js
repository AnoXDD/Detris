/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import TitleBoxView from "./TitleBoxView";
import Button from "../lib/Button";

export default class PauseMenuView extends Component {
  render() {
    return (
      <div className="container pause-menu-view fullscreen-view">
        <span
          className="fullscreen-menu-background"
          onClick={this.props.onPause}
        />
        <div className="fullscreen-menu-actual-wrapper flex-center">
          <div className="fullscreen-menu-actual">
            <TitleBoxView title="paused">
              <div className="btns">
                <Button>replay</Button>
                <Button>list</Button>
                <Button>settings</Button>
              </div>
              <div className="btns">
                <Button
                  text="resume"
                  onClick={this.props.onPause}
                >play_arrow</Button>
              </div>
            </TitleBoxView>
          </div>
        </div>
      </div>
    );
  }
}