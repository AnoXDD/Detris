/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../reducer/game";
import LevelView from "../views/LevelView";
import LevelStateStore from "../reducer/level";
import PageControlView from "../views/PageControlView";
import Actions from "../data/Actions";

class LevelContainer extends Component {

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
      <div className="container level-container flex-center">
        <LevelView {...this.state.levelState}/>
        <PageControlView {...this.state.levelState}/>
      </div>
    );
  }
}

export default Container.create(LevelContainer);