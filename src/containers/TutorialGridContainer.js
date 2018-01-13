/**
 * Created by Anoxic on 12/30/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import GridView from "../components/GridView";
import QueueView from "../components/QueueView";
import GridControlView from "../components/GridControlView";
import Actions from "../data/Actions";
import TutorialHelper from "../util/TutorialHelper";

class TutorialGridContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (TutorialHelper.isDetrominoReachedHighlightArea(nextProps.grid)) {
      nextProps.onDetrominoReachedHighlightedArea();
    }
  }

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
  let grid = {
    grid       : state.gameGrid.get("grid").get("grid").valueSeq().toArray(),
    editorState: {},
  };

  return {
    ...grid,
    queue  : {
      queue: state.queue.get("queue"),
    },
    control: {
      ...state.control.toJS(),
    }
  };
}

function dispatchToProps(dispatch) {
  return {
    onDetrominoReachedHighlightedArea: () => {
      dispatch(Actions.nextTutorial());
    }
  }
}

const connected = connect(stateToProps, dispatchToProps)(TutorialGridContainer);

export default connected;