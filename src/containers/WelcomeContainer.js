/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";
import Actions from "../data/enum/Actions";
import Button from "../lib/Button";

class WelcomeContainer extends Component {

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
      <div className="container welcome-container flex-center">
        <div className="welcome-title">Detris</div>
        <div className="btns play-btns">
          <div className="btns">
            <Button onClick={Actions.showSelectLevel}
                    text="play"
                    className="accent"
            >play_arrow</Button>
          </div>
          <div className="btns">
            <Button onClick={Actions.showGridEditor}
                    text="level editor"
                    className="border"
            >edit</Button>
          </div>
        </div>
        <div className="btns other-btns">
          <Button>help</Button>
          <Button onClick={Actions.showSettings}>settings</Button>
          <Button onClick={Actions.showCredit}>info</Button>
        </div>
      </div>
    );
  }
}

export default Container.create(WelcomeContainer);