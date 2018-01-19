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
  invalidImportId = 0;

  constructor(props) {
    super(props);

    this.invalidImportId = props.invalidImportId;

    this.handleCopy = this.handleCopy.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Display error info if necessary
    let {invalidImportId} = nextProps;

    if (invalidImportId > this.invalidImportId) {
      this.invalidImportId = invalidImportId;
      store.dispatch(Actions.importLevelEditorDataFail());
    }

    let {levelEditorExportString} = nextProps;
    if (levelEditorExportString !== this.props.levelEditorExportString) {
      // New information received
      store.dispatch(Actions.importLevelEditorDataSuccess());
    }
  }

  handlePaste(e) {
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');

    store.dispatch(Actions.importLevelEditorData(pastedData));
  }

  handleCopy() {
    if (!this.refCopy) {
      store.dispatch(Actions.displayError(
        "The data is not copied. Try to move some blocks around and try again. If it still doesn't work, try using a modern browser."));
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
        <hr/>
        <textarea
          rows="1"
          type="text"
          className="import-text"
          onPaste={this.handlePaste}
          onChange={() => void(0)}
          value="To import: click and paste the code here"
        />
        <hr/>
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