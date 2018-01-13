/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import Actions from "../../data/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";
import store from "../../store/store";

export default class LevelEditorImportExportView extends Component {

  refCopy = null;
  refCopyLink = null;

  constructor(props) {
    super(props);

    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy() {
    if (!this.refCopy) {
      store.dispatch(Actions.displayError(
        "The data is not copied. Try to move some blocks around and try again."));
      return;
    }

    this.refCopy.select();
    document.execCommand("copy");
    store.dispatch(Actions.displaySuccess("Copied to clipboard"));
  }

  render() {
    return (
      <FullscreenOverlayView
        onBackgroundClick={() => store.dispatch(Actions.hideLevelEditorImportExport())}
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
            onClick={() => store.dispatch(Actions.hideLevelEditorImportExport())}
          >play_arrow</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}