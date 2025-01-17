/**
 * Created by Anoxic on 9/21/2017.
 *
 * The main container of the game
 */

import React, {Component} from "react";
import {CSSTransitionGroup} from "react-transition-group";
import PanelContainer from "./PanelContainer";
import LevelContainer from "./LevelContainer";
import GameUiState from "../enum/GameUiState";
import TopBarView from "../components/TopBarView";
import PauseMenuView from "../components/fullscreenOverlay/PauseMenuView";
import DialogView from "../components/fullscreenOverlay/DialogView";
import WelcomeContainer from "./WelcomeContainer";
import SettingsView from "../components/fullscreenOverlay/SettingsView";
import AboutView from "../components/fullscreenOverlay/AboutView";
import ControlContainer from "./ControlContainer";
import LevelEditorImportExportView from "../components/fullscreenOverlay/LevelEditorImportExportView";
import OverlayType from "../enum/OverlayType";
import NotificationContainer from "./NotificationContainer";
import EndGameView from "../components/fullscreenOverlay/EndGameView";
import TutorialWelcomeContainer from "./TutorialWelcomeContainer";
import TutorialGuideView from "../components/fullscreenOverlay/TutorialGuideView";
import {connect} from "react-redux";
import {
  simpleDispatchToProps,
  mergePropsFromKey
} from "../util/callbackToProps";

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
      case GameUiState.WELCOME:
        container = <WelcomeContainer/>;
        break;
      case GameUiState.SELECT_LEVEL:
        container = <LevelContainer/>;
        break;
      case GameUiState.IN_GAME:
      case GameUiState.LEVEL_EDITOR_STARTED:
      case GameUiState.TUTORIAL:
        container = <PanelContainer/>;
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
                return (<PauseMenuView
                  key="pause"
                  {...this.props.button}/>);
              case OverlayType.NEXT_LEVEL:
                return (
                  <EndGameView
                    key="next-level"
                    levelState={this.props.levelState}
                    {...this.props.button}/>);
              case OverlayType.LEVEL_EDITOR_IMPORT_EXPORT:
                return (<LevelEditorImportExportView
                  invalidImportId={this.props.invalidImportId}
                  levelEditorExportString={this.props.levelEditorExportString}
                  key="import-export"/>);
              case OverlayType.ABOUT:
                return (<AboutView key="credit"/>);
              case OverlayType.SETTINGS:
                return (<SettingsView
                  key="settings"
                  sound={this.props.sound}
                  uiState={this.props.uiState}/>);
              case OverlayType.DIALOG:
                return (<DialogView key="dialog"
                                    dialogTitle={this.props.dialogTitle}
                                    {...this.props.button}/>);
              case OverlayType.TUTORIAL_GUIDE:
                return (
                  <TutorialGuideView
                    key="tutorial-guide"
                    {...this.props.button}
                    {...this.props.tutorial}/>);
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

function stateToProps(state) {
  return {
    button                 : state.button.toJS(),
    ...state.game.toJS(),
    levelEditorExportString: state.levelEditorPanel.present.get("detokenized"),
    invalidImportId        : state.levelEditorPanel.present.get(
      "invalidImportId"),
    tutorial               : state.tutorial.toJS(),
    levelState             : state.level.toJS(),
  };
}

const connected = connect(stateToProps,
  simpleDispatchToProps,
  mergePropsFromKey("button"))(GameContainer);

export default connected;