/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";
import GridContainer from "./GridContainer";
import LevelContainer from "./LevelContainer";
import GameState from "../data/enum/GameState";

class GameContainer extends Component {

  shouldComponentUpdate(prevProps, prevState) {
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
        container = <LevelContainer/>;
        break;
      case GameState.SHOW_GRID:
        container = <GridContainer/>;
        break;
    }

    return container;
  }
}

export default Container.create(GameContainer);