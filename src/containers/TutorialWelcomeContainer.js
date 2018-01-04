/**
 * Created by Anoxic on 12/30/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import GameStateStore from "../data/game/GameStateStore";
import Actions from "../data/Actions";
import Button from "../lib/Button";

class TutorialWelcomeContainer extends Component {

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
        <div className="welcome-title">
          Detris
          <div className="sub-title">
            A twist on Tetris!
          </div>
        </div>
        <div className="btns play-btns">
          <div className="btns">
            <Button onClick={() => {
              // It has to be this, because empty parameter defaults to the
              // first game. If using onClick={Actions.showTutorial}, the
              // parameter will be passed as an event
              Actions.showTutorial();
            }}
                    text="start"
                    className="accent"
            >play_arrow</Button>
          </div>
          <div className="btns">
            <Button onClick={Actions.showDialogForSkipTutorial}
                    text="skip tutorial"
                    className="border"
            >skip_next</Button>
          </div>
        </div>
        <div className="btns other-btns">
          <Button onClick={Actions.showSettings}>settings</Button>
        </div>
      </div>
    );
  }
}

export default Container.create(TutorialWelcomeContainer);