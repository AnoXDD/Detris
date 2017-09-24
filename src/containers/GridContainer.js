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

class GridContainer extends Component {

  constructor() {
    super();

    Actions.init(GridSize.WIDTH, GridSize.HEIGHT);
  }

  // componentDidUpdate(prevState) {
  // Check for any need for animation update
  // if (Algorithm.hasBlockOfType(this.state.grid.grid, BlockType.FLOATING)) {
  //   Actions.sinkTargetBlocks();
  // }
  // }

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
    };
  }

  render() {
    return (
      <div className="grid-container">
        <GridView {...this.state.grid}/>
      </div>
    );
  }
}

export default Container.create(GridContainer);