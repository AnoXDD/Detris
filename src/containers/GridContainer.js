/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import GridView from "../components/GridView";
import QueueView from "../components/QueueView";
import GridControlView from "../components/GridControlView";

class GridContainer extends Component {
  render() {
    return (
      <div className="container grid-container">
        <div className="grid-queue">
          <GridView
            grid={this.props.grid}
            editorState={this.props.editorState}/>
          <QueueView {...this.props.queue}/>
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
  let grid = null;
  let isShowingLevelEditor = state.game.isShowingLevelEditor();
  if (isShowingLevelEditor) {
    let {levelEditorGrid} = state;
    let levelEditorState = levelEditorGrid.get("editorState").toJS();

    grid = {
      grid       : levelEditorGrid.get("data").get("grid").valueSeq(),
      editorState: levelEditorState,
    };
  } else {
    grid = {
      grid       : state.game
        .get("grid")
        .get("grid")
        .valueSeq(),
      editorState: {},
    };
  }

  return {
    ...grid,
    queue  : {
      isShowingLevelEditor,
      queue: state.queue.get("queue"),
    },
    control: {
      isShowingLevelEditor,
      ...state.control.toJS(),
    }
  };
}

const connected = connect(stateToProps)(GridContainer);

export default connected;
