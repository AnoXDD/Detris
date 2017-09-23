/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";

export default class GridView extends Component {
  render() {
    return (
      <div className="grid-view">
        <a onClick={this.props.onClick}>click me</a>
        {this.props.grid.map((row, i) => (
          <div className="grid-row" key={i}>
            {row.map((block, j) => (
              <span key={j}
                    className={`grid-cell ${block.occupied ? "occupied" : ""} grid-cell-color-${block.color}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}