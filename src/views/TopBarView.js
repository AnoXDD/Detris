/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import {CSSTransitionGroup} from "react-transition-group";

export default class TopBarView extends Component {

  render() {
    let {topBar = {}} = this.props;

    let buttons = [];

    if (!this.props.paused) {
      if (topBar.back) {
        buttons.push(
          <Button key="back"
                  onClick={this.props.onQuit}
          >arrow_back</Button>
        );
      }

      if (topBar.pause) {
        buttons.push(
          <Button key="pause"
                  onClick={this.props.onBack}
                  className="right">pause</Button>
        );
      }
    }

    return (
      <div className="action-bar-view">
        <CSSTransitionGroup
          transitionName="fade-animation"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1000}
        >
          {buttons}
        </CSSTransitionGroup>
      </div>
    );
  }
}