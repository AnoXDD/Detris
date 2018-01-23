/**
 * Created by Anoxic on 10/6/2017.
 */

import React, {Component} from "react";
import FullscreenOverlayView from "./FullscreenOverlayView";
import Toggle from "../../lib/Toggle";
import Actions from "../../data/Actions";
import Button from "../../lib/Button";
import store from "../../store/store";
import GameUiState from "../../enum/GameUiState";

export default class SettingsView extends Component {
  render() {
    return (
      <FullscreenOverlayView
        update="true"
        title="settings"
        onBackgroundClick={() => store.dispatch(Actions.hideSettingsUi())}
      >
        <div className="btns">
          <Toggle firstIcon="volume_up" secondIcon="volume_off"
                  onClick={() => store.dispatch(Actions.setSoundEnabled(!this.props.sound))}
                  isChanging={!this.props.sound}/>
        </div>
        <div className="btns">
          <Button
            hidden={this.props.uiState !== GameUiState.WELCOME}
            onClick={() => store.dispatch(Actions.showDialogForResetGame())}
            text="reset"
            className="red">delete_forever</Button>
        </div>
        <hr/>
        <div className="btns">
          <Button
            onClick={() => store.dispatch(Actions.hideSettingsUi())}
            className="wide accent">done</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}