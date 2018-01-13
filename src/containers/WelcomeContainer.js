/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import Actions from "../data/Actions";
import Button from "../lib/Button";

class WelcomeContainer extends Component {
  render() {
    return (
      <div className="container welcome-container flex-center">
        <div className="welcome-title">Detris</div>
        <div className="btns play-btns">
          <div className="btns">
            <Button onClick={this.props.onPlay}
                    text="play"
                    className="accent"
            >play_arrow</Button>
          </div>
          <div className="btns">
            <Button onClick={this.props.onEdit}
                    text="level editor"
                    className="border"
            >edit</Button>
          </div>
        </div>
        <div className="btns other-btns">
          <Button
            onClick={this.props.onHelp}>
            help
          </Button>
          <Button onClick={this.props.onSettings}>
            settings
          </Button>
          <Button onClick={this.props.onInfo}>
            info
          </Button>
        </div>
      </div>
    );
  }
}

function stateToProps(state, ownProps) {
  return {
    gameState: state.game,
  };
}

function stateToDispatch(dispatch) {
  return {
    onPlay    : () => {
      dispatch(Actions.showSelectLevel())
    },
    onEdit    : () => {
      dispatch(Actions.showGridEditorUi());
    },
    onHelp    : () => {
      dispatch(Actions.showDialogForStartTutorial());
    },
    onSettings: () => {
      dispatch(Actions.showSettingsUi());
    },
    onInfo    : () => {
      dispatch(Actions.showCreditUi());
    }
  };
}

const connected = connect(stateToProps, stateToDispatch)(WelcomeContainer);

export default connected;