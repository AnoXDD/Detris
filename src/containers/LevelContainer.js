/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";

import GridContainer from "./GridContainer";
import LevelView from "../views/LevelView";

class LevelContainer extends Component {

  constructor() {
    super();
  }

  static getStores() {
    return [
      GameStateStore,
    ];
  }

  static calculateState(prevState) {
    return {
      gameState: GameStateStore.getState(),
    };
  }

  render() {
    return (
      <LevelView {...this.state.gameState}/>
    );
  }
}

export default Container.create(LevelContainer);