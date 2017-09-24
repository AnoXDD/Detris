/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";

import BlockType from "../data/Block/BlockType";
import Algorithm from "../data/Algorithm";

import GridStore from "../data/Grid/GridStore";
import GridContext from "../data/Grid/GridSize";
import GridActions from "../data/Grid/GridActions";

import GridView from "../views/GridView";
import DetrominoView from "../views/DetrominoView";
import DetrominoType from "../data/Detromino/DetrominoType";

class GridContainer extends Component {

  constructor() {
    super();

    GridActions.init(GridContext.WIDTH, GridContext.HEIGHT);
  }

  // componentDidUpdate(prevState) {
  // Check for any need for animation update
  // if (Algorithm.hasBlockOfType(this.state.grid.grid, BlockType.FLOATING)) {
  //   GridActions.sinkTargetBlocks();
  // }
  // }

  static getStores() {
    return [
      GridStore,
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