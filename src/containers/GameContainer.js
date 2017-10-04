/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";
import GridContainer from "./GridContainer";
import LevelContainer from "./LevelContainer";
import GameState from "../data/enum/GameState";
import {CSSTransitionGroup} from "react-transition-group";

class GameContainer extends Component {

  id = 0;

  shouldComponentUpdate(nextProps, prevState) {
    return this.state.gameState.gameState !== prevState.gameState.gameState;
  }

  static getStores() {
    return [
      GameStateStore,
    ];
  }

  static calculateState(prevState) {
    return {
      gameState: GameStateStore.getState().toJS(),
    };
  }

  render() {
    let container = null;

    switch (this.state.gameState.gameState) {
      case GameState.SELECT_LEVEL:
        container = <LevelContainer key={this.id++}/>;
        break;
      case GameState.SHOW_GRID:
        container = <GridContainer key={this.id++}/>;
        break;
      default:
        container = null;
    }

    return (
      <CSSTransitionGroup
        transitionName="zoom-out-animation"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        {container}
      </CSSTransitionGroup>
    );
  }
}

export default Container.create(GameContainer);