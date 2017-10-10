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
import GridEditorStore from "../data/grid/GridEditorStore";

class GridContainer extends Component {

  constructor() {
    super();

    Actions.init(GridSize.WIDTH, GridSize.HEIGHT);
  }

  static getStores() {
    return [
      GridEditorStore,
      QueueStore,
    ];
  }

  static calculateState(prevState) {
    let grid = GridEditorStore.getState().get("grid").valueSeq();

    return {
      grid   : {
        grid,
      },
      queue  : {
        queue: QueueStore.getState()
      },
      control: {
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
          <GridView {...this.state.grid}/>
          <QueueView {...this.state.queue}/>
        </div>
        <GridControlView {...this.state.control}/>
      </div>
    );
  }
}

export default Container.create(GridContainer);