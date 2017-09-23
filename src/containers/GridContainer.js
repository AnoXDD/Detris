/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";

import GridStore from "../data/Grid/GridStore";
import GridContext from "../data/Grid/GridContext";
import GridActions from "../data/Grid/GridActions";
import DetrominoContext from "../data/Detromino/DetrominoContext";

import GridView from "../views/GridView";

class GridContainer extends Component {

  constructor() {
    super();

    GridActions.init(GridContext.WIDTH, GridContext.HEIGHT);
  }

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
        init     : () => GridActions.newDetromino(DetrominoContext.Type.T),
        moveUp   : GridActions.moveUp,
        moveDown : GridActions.moveDown,
        moveLeft : GridActions.moveLeft,
        moveRight: GridActions.moveRight,
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