/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";
import GridContainer from "./GridContainer";

class GameContainer extends Component {

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
      <GridContainer/>
    );
  }
}

export default Container.create(GameContainer);