/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";

import GridStore from "../data/Grid/GridStore";
import GridContext from "../data/Grid/GridContext";
import GridActions from "../data/Grid/GridActions";
import DetrominoActions from "../data/Detromino/DetrominoActions";
import DetrominoStore from "../data/Detromino/DetrominoStore";
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
      DetrominoStore,
    ];
  }

  static calculateState(prevState) {
    let detromino = DetrominoStore.getState();
    GridActions.applyDetrominos(detromino);

    let grid = GridStore.getState().valueSeq();
    return {
      grid: {
        grid,
        init     : () => DetrominoActions.init(grid, DetrominoContext.Type.T),
        moveUp   : () => DetrominoActions.moveUp(grid),
        moveDown : () => DetrominoActions.moveDown(grid),
        moveLeft : () => DetrominoActions.moveLeft(grid),
        moveRight: () => DetrominoActions.moveRight(grid),
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