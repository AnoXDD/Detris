/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";
import LevelView from "../views/LevelView";
import LevelStateStore from "../data/game/level/LevelStateStore";

class LevelContainer extends Component {

  constructor() {
    super();
  }

  static getStores() {
    return [
      GameStateStore,
      LevelStateStore,
    ];
  }

  static calculateState(prevState) {
    return {
      gameState : GameStateStore.getState(),
      levelState: LevelStateStore.getState(),
    };
  }

  render() {
    return (
      <LevelView {...this.state.levelState.toJS()}/>
    );
  }
}

export default Container.create(LevelContainer);