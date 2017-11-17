/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import Actions from "../../data/enum/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";

export default class LevelEditorImportExportView extends Component {

  refCopy = null;
  refCopyLink = null;

  constructor(props) {
    super(props);

    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy() {
    if (!this.refCopy) {
      // todo notify the user that copy fails
      return;
    }

    this.refCopy.select();
    document.execCommand("copy");
    // todo notify the user that copy succeeds
  }

  render() {
    return (
      <FullscreenOverlayView
        onBackgroundClick={Actions.hideLevelEditorImportExport}
        title="import/export"
      >
        <input
          readOnly={true}
          className="hidden-input"
          type="text"
          value={this.props.levelEditorExportString}
          ref={input => this.refCopy = input}
        />
        <div className="btns">
          <Button
            onClick={this.handleCopy}
          >content_copy</Button>
          <Button
            onClick={this.props.onCopyLink}
          >link</Button>
        </div>
        <div className="btns">
          <Button
            text="resume"
            onClick={Actions.hideLevelEditorImportExport}
          >play_arrow</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}