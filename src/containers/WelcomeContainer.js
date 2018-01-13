/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import Actions from "../data/Actions";
import Button from "../lib/Button";

class WelcomeContainer extends Component {
  render() {
    let {dispatch} = this.props;

    return (
      <div className="container welcome-container flex-center">
        <div className="welcome-title">Detris</div>
        <div className="btns play-btns">
          <div className="btns">
            <Button onClick={Actions.showSelectLevel}
                    text="play"
                    className="accent"
            >play_arrow</Button>
          </div>
          <div className="btns">
            <Button onClick={Actions.showGridEditorUi}
                    text="level editor"
                    className="border"
            >edit</Button>
          </div>
        </div>
        <div className="btns other-btns">
          <Button
            onClick={Actions.showDialogForStartTutorial}>
            help
          </Button>
          <Button onClick={Actions.showSettingsUi}>
            settings
          </Button>
          <Button onClick={Actions.showCreditUi}>
            info
          </Button>
        </div>
      </div>
    );
  }
}

function calculateProps(state, ownProps) {
  return {
    gameState: state.game,
  };
}

const connected = connect(calculateProps)(WelcomeContainer);

export default connected;