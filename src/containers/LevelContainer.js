/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";
import LevelView from "../views/LevelView";
import LevelStateStore from "../data/game/level/LevelStateStore";
import PageControlView from "../views/PageControlView";
import Actions from "../data/enum/Actions";

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
      levelState: {
        prevPage: Actions.levelPagePrev,
        nextPage: Actions.levelPageNext,
        startNewLevel: Actions.startNewLevel,
        ...LevelStateStore.getState().toJS()
      },
    };
  }

  render() {
    return (
      <div className="level-container flex-center">
        <LevelView {...this.state.levelState}/>
        <PageControlView {...this.state.levelState}/>
      </div>
    );
  }
}

export default Container.create(LevelContainer);