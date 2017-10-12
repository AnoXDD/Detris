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
import Direction from "../data/enum/Direction";
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
    ];
  }

  static calculateState(prevState) {
    let grid = null;
    let isShowingLevelEditor = GameStateStore.getState().isShowingLevelEditor();
    if (isShowingLevelEditor) {
      let state = LevelEditorGridStore.getState();

      grid = {
        grid       : {grid: state.get("data").get("grid").valueSeq()},
        levelEditor: state.get("state").toJS(),
      };
    } else {
      grid = {
        grid       : {grid: GridStore.getState().get("grid").valueSeq()},
        levelEditor: {},
      };
    }

    return {
      ...grid,
      queue  : {
        queue: QueueStore.getState(),
      },
      control: {
        isShowingLevelEditor,
        rotate: Actions.rotate,
        done  : Actions.nextDetromino,
        left  : () => Actions.move(Direction.LEFT),
        up    : () => Actions.move(Direction.UP),
        right : () => Actions.move(Direction.RIGHT),
        down  : () => Actions.move(Direction.DOWN),
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