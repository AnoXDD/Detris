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
    ];
  }

  static calculateState(prevState) {
    let grid = null;
    let moveFunction = () => {
    };
    let isShowingLevelEditor = GameStateStore.getState().isShowingLevelEditor();
    if (isShowingLevelEditor) {
      let state = LevelEditorGridStore.getState();
      let levelEditorState = state.get("state").toJS();

      grid = {
        grid       : {grid: state.get("data").get("grid").valueSeq()},
        levelEditor: levelEditorState,
      };

      moveFunction = levelEditorState.isEditingBlock ? Actions.moveEditingBlock : Actions.moveDetrominoInEditor;
    } else {
      grid = {
        grid       : {grid: GridStore.getState().get("grid").valueSeq()},
        levelEditor: {},
      };

      moveFunction = Actions.moveDetrominoInGame;
    }

    return {
      ...grid,
      queue  : {
        queue: QueueStore.getState(),
      },
      control: {
        isShowingLevelEditor,
        rotate         : Actions.rotate,
        done           : Actions.nextDetromino,
        move           : moveFunction,
        toggleEditBlock: Actions.toggleEditBlock,
      }
    };
  }

  render() {
    return (
      <div className="container grid-container">
        <div className="grid-queue">
          <GridView {...this.state.grid} {...this.state.levelEditor}/>
          <QueueView {...this.state.queue}/>
        </div>
        <GridControlView {...this.state.control} {...this.state.levelEditor}/>
      </div>
    );
  }
}

export default Container.create(GridContainer);