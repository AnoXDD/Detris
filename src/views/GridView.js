/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";

export default class GridView extends Component {
  render() {
    return (
      <div className="grid-view">
        {this.props.grid.map(block =>
          <span key={block.id}
                className={`grid-cell grid-cell-x-${x} grid-cell-y-${y} ${block.occupied ? "occupied" : ""} grid-cell-color-${block.color}`}
          />
        )}
      </div>
    );
  }
}