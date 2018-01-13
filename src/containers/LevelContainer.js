/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import LevelView from "../components/LevelView";
import PageControlView from "../components/PageControlView";
import Actions from "../data/Actions";

class LevelContainer extends Component {
  render() {
    return (
      <div className="container level-container flex-center">
        <LevelView {...this.props.levelState}/>
        <PageControlView {...this.props.levelState}/>
      </div>
    );
  }
}

function stateToProps(state, ownProps) {
  return {
    gameState : state.game,
    levelState: {
      ...state.level.toJS()
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    prevPage     : () => {
      dispatch(Actions.levelPagePrev());
    },
    nextPage     : () => {
      dispatch(Actions.levelPageNext());
    },
    startNewLevel: () => {
      dispatch(Actions.startNewLevel());
    },
  };
}

function mergeProps(stateProps, dispatchProps) {
  stateProps.levelState = {
    ...stateProps.levelState,
    ...dispatchProps,
  };

  return stateProps;
}

const connected = connect(stateToProps,
  dispatchToProps,
  mergeProps)(
  LevelContainer);

export default connected;