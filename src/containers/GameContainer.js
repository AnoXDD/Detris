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
import PauseMenuView from "../views/fullscreenOverlay/PauseMenuView";
import DialogView from "../views/fullscreenOverlay/DialogView";
import WelcomeContainer from "./WelcomeContainer";
import CallbackStore from "../data/game/CallbackStore";
import SettingsView from "../views/fullscreenOverlay/SettingsView";
import AboutView from "../views/fullscreenOverlay/AboutView";
import ControlContainer from "./ControlContainer";
import LevelEditorImportExportView from "../views/fullscreenOverlay/LevelEditorImportExportView";
import OverlayType from "../data/enum/OverlayTypes";
import LevelEditorGridStore from "../data/levelEditor/LevelEditorGridStore";

class GameContainer extends Component {

  id = 0;

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.uiState !== nextState.uiState || this.state.pause.active !== nextState.pause.active;
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
      CallbackStore,
      LevelEditorGridStore,
    ];
  }

  static calculateState(prevState) {
    return {
      ...CallbackStore.getState().toJS(),
      ...GameStateStore.getState().toJS(),
      levelEditorExportString: LevelEditorGridStore.getState()
        .get("detokenized"),
    };
  }

  render() {
    let container = null;

    switch (this.state.uiState) {
      case GameUiState.WELCOME:
        container = <WelcomeContainer/>;
        break;
      case GameUiState.SELECT_LEVEL:
        container = <LevelContainer/>;
        break;
      case GameUiState.SHOW_GRID:
      case GameUiState.SHOW_LEVEL_EDITOR:
        container = <GridContainer/>;
        break;
      default:
        container = null;
    }

    return (
      <div className="game-frame">
        <TopBarView
          {...this.state}/>
        <CSSTransitionGroup
          className="container-wrapper"
          transitionName="zoom-out-animation"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          <div key={this.id}
               className={`flex-inner-extend container-wrapper-extend ${this.state.pause ? "paused" : ""}`}>
            {container}
          </div>
          {this.state.activeOverlay.map(type => {
            switch (type) {
              case OverlayType.PAUSE_GAME:
                return (<PauseMenuView key="pause" {...this.state}/>);
              case OverlayType.LEVEL_EDITOR_IMPORT_EXPORT:
                return (<LevelEditorImportExportView
                  levelEditorExportString={this.state.levelEditorExportString}
                  key="import-export"/>);
              case OverlayType.ABOUT:
                return (<AboutView key="credit"/>);
              case OverlayType.SETTINGS:
                return (<SettingsView key="settings"/>);
              case OverlayType.DIALOG:
                return (<DialogView key="dialog" {...this.state}/>);
              default:
                return null;
            }
          })}
        </CSSTransitionGroup>
        <ControlContainer/>
      </div>
    );
  }
}

export default Container.create(GameContainer);