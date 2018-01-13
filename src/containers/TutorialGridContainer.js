/**
 * Created by Anoxic on 12/30/2017.
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import GridView from "../components/GridView";
import QueueView from "../components/QueueView";
import GridControlView from "../components/GridControlView";

class TutorialGridContainer extends Component {
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
          update={true}
          blockList={this.props.editorState.blockList}
          isEditingBlock={this.props.editorState.isEditingBlock}/>
      </div>
    );
  }
}

function stateToProps(state, ownProps) {
  let grid = {
    grid       : state.gameGrid
      .get("grid")
      .get("grid")
      .valueSeq(),
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

const connected = connect(stateToProps)(TutorialGridContainer);

export default connected;