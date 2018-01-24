/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import Actions from "../../data/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";
import store from "../../store/store";
import LevelData from "../../static/LevelData";

export default class EndGameView extends Component {

  onBack() {
    store.dispatch(Actions.hideAllFullscreenOverlay());
    store.dispatch(Actions.showSelectLevel());
  }

  onRestart() {
    store.dispatch(Actions.hideAllFullscreenOverlay());
    store.dispatch(Actions.restartCurrentLevel());
  }

  onNextLevel() {
    store.dispatch(Actions.hideAllFullscreenOverlay());
    store.dispatch(Actions.nextLevel());
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isLastLevel = nextProps.currentLevelId === LevelData.lastLevelId();
  }

  render() {
    return (
      <FullscreenOverlayView
        title="solved!"
        className="end-game-view"
      >
        <div className="title wide">
          Nice!
        </div>
        {this.props.levelState.noUndo ?
          <div className="round-border"> ★: No Undo</div>
          : null
        }
        <div className="sub-title">
          You have completed this level!
        </div>
        <div className="btns">
          <Button
            onClick={this.onBack}
          >view_list</Button>
          <Button
            text="next level"
            className="green"
            hidden={this.state.isLastLevel}
            onClick={this.onNextLevel}
          >play_arrow</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}