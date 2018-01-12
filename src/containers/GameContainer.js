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
import TopBarView from "../components/TopBarView";
import PauseMenuView from "../components/fullscreenOverlay/PauseMenuView";
import DialogView from "../components/fullscreenOverlay/DialogView";
import WelcomeContainer from "./WelcomeContainer";
import CallbackStore from "../data/game/OverlayCallbackStore";
import SettingsView from "../components/fullscreenOverlay/SettingsView";
import AboutView from "../components/fullscreenOverlay/AboutView";
import ControlContainer from "./ControlContainer";
import LevelEditorImportExportView from "../components/fullscreenOverlay/LevelEditorImportExportView";
import OverlayType from "../enum/OverlayTypes";
import LevelEditorGridStore from "../data/grid/levelEditor/LevelEditorGridStore";
import NotificationContainer from "./NotificationContainer";
import EndGameView from "../components/fullscreenOverlay/EndGameView";
import TutorialWelcomeContainer from "./TutorialWelcomeContainer";
import TutorialGridContainer from "./TutorialGridContainer";
import TutorialGuideView from "../components/fullscreenOverlay/TutorialGuideView";
import TutorialStore from "../reducer/tutorial";
import LevelStateStore from "../reducer/level";
import {connect} from "react-redux";

class GameContainer extends Component {

  id = 0;

  componentWillUpdate(nextProps) {
    // Check if the pause status is changed
    if (this.props.uiState !== nextProps.uiState) {
      // We only change the id if ui state is changed
      ++this.id;
    }
  }

  render() {
    let container = null;

    switch (this.props.uiState) {
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
          {...this.props}/>
        <CSSTransitionGroup
          className="container-wrapper"
          transitionName="zoom-out-animation"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          <div key={this.id}
               className={`flex-inner-extend container-wrapper-extend ${this.props.pause ? "paused" : ""}`}>
            {container}
          </div>
          {this.props.activeOverlay.map(type => {
            switch (type) {
              case OverlayType.PAUSE_GAME:
                return (<PauseMenuView key="pause" {...this.props}/>);
              case OverlayType.NEXT_LEVEL:
                return (<EndGameView key="next-level" {...this.props}/>);
              case OverlayType.LEVEL_EDITOR_IMPORT_EXPORT:
                return (<LevelEditorImportExportView
                  levelEditorExportString={this.props.levelEditorExportString}
                  key="import-export"/>);
              case OverlayType.ABOUT:
                return (<AboutView key="credit"/>);
              case OverlayType.SETTINGS:
                return (<SettingsView key="settings"/>);
              case OverlayType.DIALOG:
                return (<DialogView key="dialog" {...this.props}/>);
              case OverlayType.TUTORIAL_GUIDE:
                return (
                  <TutorialGuideView key="tutorial-guide" {...this.props}/>);
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

function calculateProps(state, ownProps) {
  return {
    ...state.callback.toJS(),
    ...state.game.toJS(),
    levelEditorExportString: state.levelEditorGrid.get("detokenized"),
    tutorial               : {
      ...state.tutorial.toJS()
    },
    levelState             : {
      ...state.level.toJS(),
    },
  };
}

const connected = connect(calculateProps)(GameContainer);

export default connected;