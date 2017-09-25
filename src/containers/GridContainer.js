/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";
import Actions from "../data/Actions";

import GridStore from "../data/Grid/GridStore";
import GridSize from "../data/Grid/GridSize";

import QueueStore from "../data/Queue/QueueStore";

import GridView from "../views/GridView";
import QueueView from "../views/QueueView";

class GridContainer extends Component {

  constructor() {
    super();

    Actions.init(GridSize.WIDTH, GridSize.HEIGHT);
  }

  static getStores() {
    return [
      GridStore,
      QueueStore,
    ];
  }

  static calculateState(prevState) {
    let grid = GridStore.getState().get("grid").valueSeq();

    return {
      grid: {
        grid,
      },
      queue: {
        queue: QueueStore.getState()
      },
    };
  }

  render() {
    return (
      <div className="grid-container">
        <div className="grid-queue">
          <GridView {...this.state.grid}/>
          <QueueView {...this.state.queue}/>
        </div>
      </div>
    );
  }
}

export default Container.create(GridContainer);