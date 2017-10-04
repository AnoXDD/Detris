/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import {CSSTransitionGroup} from "react-transition-group";

import GameStateStore from "../data/game/GameStateStore";
import GridContainer from "./GridContainer";
import LevelContainer from "./LevelContainer";
import GameUiState from "../data/enum/GameUiState";
import TopBarView from "../views/TopBarView";
import PauseMenuView from "../views/PauseMenuView";

class GameContainer extends Component {

  id = 0;

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.uiState !== nextState.uiState || this.state.paused !== nextState.paused;
  }

  componentWillUpdate(nextProps, nextState) {
    // Check if the pause status is changed
    if (this.state.uiState !== nextState.uiState) {
      // We only change the id if ui state is changed
      ++this.id;
    }
  }

  static getStores() {
    return [
      GameStateStore,
    ];
  }

  static calculateState(prevState) {
    return GameStateStore.getState().toJS();
  }

  render() {
    let container = null;

    switch (this.state.uiState) {
      case GameUiState.SELECT_LEVEL:
        container = <LevelContainer/>;
        break;
      case GameUiState.SHOW_GRID:
        container = <GridContainer/>;
        break;
      default:
        container = null;
    }

    return (
      <div className="game-frame">
        <TopBarView
          className={this.state.paused ? "paused" : ""}
          {...this.state}/>
        <CSSTransitionGroup
          className="container-wrapper"
          transitionName="zoom-out-animation"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          <div key={this.id}
               className={`flex-inner-extend container-wrapper-extend ${this.state.paused ? "paused" : ""}`}>
            {container}
          </div>
          {this.state.paused ?
            <PauseMenuView key="pause" {...this.state}/> : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Container.create(GameContainer);