/**
 * Created by Anoxic on 12/30/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import Actions from "../data/Actions";
import Button from "../lib/Button";

class TutorialWelcomeContainer extends Component {
  render() {
    return (
      <div className="container welcome-container flex-center">
        <div className="welcome-title">
          Detris
          <div className="sub-title">
            A twist on Tetris!
          </div>
        </div>
        <div className="btns play-btns">
          <div className="btns">
            <Button onClick={Actions.startTutorial}
                    text="start"
                    className="accent"
            >play_arrow</Button>
          </div>
          <div className="btns">
            <Button onClick={Actions.showDialogForSkipTutorial}
                    text="skip tutorial"
                    className="border"
            >skip_next</Button>
          </div>
        </div>
        <div className="btns other-btns">
          <Button onClick={Actions.showSettingsUi}>settings</Button>
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

const connected = connect(calculateProps)(TutorialWelcomeContainer);

export default connected;