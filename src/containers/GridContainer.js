/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import Actions from "../data/enum/Actions";

import GridStore from "../data/grid/GridStore";
import GridSize from "../data/grid/GridSize";

import QueueStore from "../data/queue/QueueStore";

import GridView from "../views/GridView";
import QueueView from "../views/QueueView";
import GridControlView from "../views/GridControlView";
import LevelEditorGridStore from "../data/levelEditor/LevelEditorGridStore";
import GameStateStore from "../data/game/GameStateStore";
import ControlStore from "../data/control/ControlStore";

class GridContainer extends Component {

  constructor() {
    super();

    Actions.init(GridSize.WIDTH, GridSize.HEIGHT);
  }

  static getStores() {
    return [
      GameStateStore,
      LevelEditorGridStore,
      QueueStore,
      GridStore,
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
        grid       : GridStore.getState().get("grid").valueSeq(),
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