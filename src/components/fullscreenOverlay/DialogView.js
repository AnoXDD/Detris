/**
 * Created by Anoxic on 10/4/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import FullscreenOverlayView from "./FullscreenOverlayView";

export default class DialogView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        className="dialog-view"
        title=""
      >
        <div className="dialog-title flex-center">
          {this.props.dialogTitle}
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
      </FullscreenOverlayView>
    );
  }
}