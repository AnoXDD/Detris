/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../../lib/Button";
import Actions from "../../data/Actions";
import FullscreenOverlayView from "./FullscreenOverlayView";
import store from "../../store/store";

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
    store.dispatch(Actions.nextLevelId());
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
          >arrow_back</Button>
          <Button
            text="next level"
            className="green"
            onClick={this.onNextLevel}
          >play_arrow</Button>
        </div>
      </FullscreenOverlayView>
    );
  }
}