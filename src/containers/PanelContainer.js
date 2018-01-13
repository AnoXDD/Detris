/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import GridView from "../components/GridView";
import QueueView from "../components/QueueView";
import GridControlView from "../components/GridControlView";
import PanelType from "../enum/PanelType";
import TutorialHelper from "../util/TutorialHelper";
import Actions from "../data/Actions";

class PanelContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.panelType === PanelType.TUTORIAL) {
      if (TutorialHelper.isDetrominoReachedHighlightArea(nextProps.grid)) {
        nextProps.onDetrominoReachedHighlightedArea();
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
  let panelType = state.game.get("panelType");

  switch (panelType) {
    case PanelType.LEVEL_EDITOR:
      let {levelEditorGrid} = state;

      grid = levelEditorGrid.get("data").get("grid").valueSeq().toArray();
      editorState = levelEditorGrid.get("editorState").toJS();
      break;

    case PanelType.IN_GAME:
    case PanelType.TUTORIAL:
      grid = state.gameGrid.get("grid").get("grid").valueSeq().toArray();
      break;
    default:

  }

  return {
    panelType,
    grid,
    editorState,
    queue  : state.queue.get("queue").toJS(),
    control: state.control.toJS(),
  };
}


function dispatchToProps(dispatch) {
  return {
    onDetrominoReachedHighlightedArea: () => {
      dispatch(Actions.nextTutorial());
    }
  }
}

const connected = connect(stateToProps, dispatchToProps)(PanelContainer);

export default connected;
