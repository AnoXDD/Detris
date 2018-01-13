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
      prevPage     : Actions.levelPagePrev(),
      nextPage     : Actions.levelPageNext(),
      startNewLevel: Actions.startNewLevel(),
      ...state.level.toJS()
    },
  };
}

const connected = connect(stateToProps)(LevelContainer);

export default connected;