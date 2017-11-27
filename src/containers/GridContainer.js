/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";

import GameGridStore from "../data/grid/GameGridStore";
import QueueStore from "../data/queue/QueueStore";

import GridView from "../views/GridView";
import QueueView from "../views/QueueView";
import GridControlView from "../views/GridControlView";
import LevelEditorGridStore from "../data/grid/levelEditor/LevelEditorGridStore";
import GameStateStore from "../data/game/GameStateStore";
import ControlStore from "../data/control/ControlStore";

class GridContainer extends Component {

  static getStores() {
    return [
      GameStateStore,
      LevelEditorGridStore,
      QueueStore,
      GameGridStore,
      ControlStore,
    ];
  }

  static calculateState(prevState) {
    let grid = null;
    let isShowingLevelEditor = GameStateStore.getState().isShowingLevelEditor();
    if (isShowingLevelEditor) {
      let state = LevelEditorGridStore.getState();
      let levelEditorState = state.get("editorState").toJS();

      grid = {
        grid       : state.get("data").get("grid").valueSeq(),
        editorState: levelEditorState,
      };
    } else {
      grid = {
        grid       : GameGridStore.getState()
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
        queue: QueueStore.getState().get("queue"),
      },
      control: {
        isShowingLevelEditor,
        ...ControlStore.getState().toJS(),
      }
    };
  }

  render() {
    return (
      <div className="container grid-container">
        <div className="grid-queue">
          <GridView
            grid={this.state.grid}
            editorState={this.state.editorState}/>
          <QueueView {...this.state.queue}/>
        </div>
        <GridControlView
          {...this.state.control}
          blockList={this.state.editorState.blockList}
          isEditingBlock={this.state.editorState.isEditingBlock}/>
      </div>
    );
  }
}

export default Container.create(GridContainer);