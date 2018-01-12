/**
 * Created by Anoxic on 9/21/2017.
 *
 * The main container of the game
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import {CSSTransitionGroup} from "react-transition-group";

import GameStateStore from "../reducer/game";
import GridContainer from "./GridContainer";
import LevelContainer from "./LevelContainer";
import GameUiState from "../enum/GameUiState";
import TopBarView from "../views/TopBarView";
import PauseMenuView from "../views/fullscreenOverlay/PauseMenuView";
import DialogView from "../views/fullscreenOverlay/DialogView";
import WelcomeContainer from "./WelcomeContainer";
import CallbackStore from "../data/game/OverlayCallbackStore";
import SettingsView from "../views/fullscreenOverlay/SettingsView";
import AboutView from "../views/fullscreenOverlay/AboutView";
import ControlContainer from "./ControlContainer";
import LevelEditorImportExportView from "../views/fullscreenOverlay/LevelEditorImportExportView";
import OverlayType from "../enum/OverlayTypes";
import LevelEditorGridStore from "../data/grid/levelEditor/LevelEditorGridStore";
import NotificationContainer from "./NotificationContainer";
import EndGameView from "../views/fullscreenOverlay/EndGameView";
import TutorialWelcomeContainer from "./TutorialWelcomeContainer";
import TutorialGridContainer from "./TutorialGridContainer";
import TutorialGuideView from "../views/fullscreenOverlay/TutorialGuideView";
import TutorialStore from "../reducer/tutorial";
import LevelStateStore from "../reducer/level";

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
      TutorialStore,
      LevelStateStore,
    ];
  }

  static calculateState(prevState) {
    return {
      ...CallbackStore.getState().toJS(),
      ...GameStateStore.getState().toJS(),
      levelEditorExportString: LevelEditorGridStore.getState()
        .get("detokenized"),
      tutorial               : {
        ...TutorialStore.getState().toJS()
      },
      levelState: {
        ...LevelStateStore.getState().toJS(),
      },
    };
  }

  render() {
    let container = null;

    switch (this.state.uiState) {
      case GameUiState.TUTORIAL_WELCOME:
        container = <TutorialWelcomeContainer/>;
        break;
      case GameUiState.TUTORIAL:
        container = <TutorialGridContainer/>;
        break;
      case GameUiState.WELCOME:
        container = <WelcomeContainer/>;
        break;
      case GameUiState.SELECT_LEVEL:
        container = <LevelContainer/>;
        break;
      case GameUiState.GAME_STARTED:
      case GameUiState.LEVEL_EDITOR_STARTED:
        container = <GridContainer/>;
        break;
      default:
        container = null;
    }

    return (
      <div className="game-frame">
        <NotificationContainer/>
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
              case OverlayType.NEXT_LEVEL:
                return (<EndGameView key="next-level" {...this.state}/>);
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
              case OverlayType.TUTORIAL_GUIDE:
                return (
                  <TutorialGuideView key="tutorial-guide" {...this.state}/>);
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