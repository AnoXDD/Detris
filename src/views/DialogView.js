/**
 * Created by Anoxic on 10/4/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import TitleBoxView from "./TitleBoxView";

export default class DialogView extends Component {
  render() {
    return (
      <div className="container dialog-view fullscreen-view">
        <span
          className="fullscreen-menu-background"
        />
        <div className="fullscreen-menu-actual-wrapper flex-center">
          <div className="fullscreen-menu-actual">
            <TitleBoxView title="">
              <div className="dialog-title flex-center">
                {this.props.dialog.title}
              </div>
              <div className="btns">
                <Button
                  className="red"
                  onClick={this.props.onDialogNo}
                >clear</Button>
                <Button
                  className="green"
                  onClick={this.props.onDialogYes}
                >done</Button>
              </div>
            </TitleBoxView>
          </div>
        </div>
      </div>
    );
  }
}