/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import GridView from "../components/GridView";
import QueueView from "../components/QueueView";
import GridControlView from "../components/GridControlView";
import PanelType from "../enum/PanelType";
import {isDetrominoReachedHighlightArea} from "../util/tutorialHelper";
import Actions from "../data/Actions";
import {
  mergePropsFromKey,
  simpleDispatchToProps
} from "../util/callbackToProps";
import BlockType from "../enum/BlockType";

class PanelContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.panelType === PanelType.TUTORIAL) {
      if (isDetrominoReachedHighlightArea(nextProps.grid)) {
        nextProps.onDetrominoReachedHighlightedArea();
      }
    } else if (nextProps.panelType === PanelType.IN_GAME) {
      if (!nextProps.busy &&
        !nextProps.queue.length &&
        !nextProps.grid.some(
          cell => cell.get("type") === BlockType.DETROMINO)) {
        if (nextProps.grid.length) {
          nextProps.onLevelFail();
        } else {
          nextProps.onLevelSuccess();
        }
      }
    }
  }

  render() {
    return (
      <div className="container grid-container">
        <div className="grid-queue">
          <GridView
            grid={this.props.grid}
            editorState={this.props.editorState}/>
          <QueueView
            panelType={this.props.panelType}
            queue={this.props.queue}/>
        </div>
        <GridControlView
          {...this.props.control}
          blockList={this.props.editorState.blockList}
          isEditingBlock={this.props.editorState.isEditingBlock}/>
      </div>
    );
  }
}

function stateToProps(state, ownProps) {
  let grid = [];
  let editorState = {};
  let queue = [];
  let panelType = state.game.get("panelType");

  switch (panelType) {
    case PanelType.LEVEL_EDITOR:
      let levelEditorPanel = state.levelEditorPanel.present;

      grid = levelEditorPanel.get("grid").get("grid").valueSeq().toArray();
      editorState = levelEditorPanel.get("editorState").toJS();
      queue = levelEditorPanel.get("queue").toArray();
      break;

    case PanelType.IN_GAME:
    case PanelType.TUTORIAL:
      grid = state.gamePanel.present.get("grid").get("grid").valueSeq().toArray();
      queue = state.gamePanel.present.get("queue").toArray();
      break;
    default:

  }

  return {
    panelType,
    grid,
    editorState,
    queue,
    busy   : state.gamePanel.present.get("busy"),
    control: state.control.toJS(),
  };
}


function dispatchToProps(dispatch) {
  return {
    ...simpleDispatchToProps(dispatch),
    onDetrominoReachedHighlightedArea: () => {
      dispatch(Actions.nextTutorial());
    },
    onLevelSuccess                   : () => {
      dispatch(Actions.levelSuccess());
    },
    onLevelFail                      : () => {
      dispatch(Actions.levelFail());
    },
  }
}

const connected = connect(stateToProps,
  dispatchToProps,
  mergePropsFromKey("control"))(PanelContainer);

export default connected;
