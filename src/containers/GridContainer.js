/**
 * Created by Anoxic on 9/21/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";

import GridStore from "../data/Grid/GridStore";
import GridView from "../views/GridView";
import GridContext from "../data/Grid/GridContext";
import GridActions from "../data/Grid/GridActions";

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
    return {
      grid: {
        grid   : GridStore.getState(),
        onClick: GridActions.debug__add,
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