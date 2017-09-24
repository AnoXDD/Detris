/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";

export default class GridView extends Component {
  render() {
    return (
      <div className="grid-view">
        {/*<div onClick={this.props.init}>init</div>*/}
        {/*<div onClick={this.props.moveUp}>up</div>*/}
        {/*<div onClick={this.props.moveLeft}>left</div>*/}
        {/*<div onClick={this.props.moveRight}>right</div>*/}
        {/*<div onClick={this.props.moveDown}>down</div>*/}
        <div className="grid-cells">
          {this.props.grid.map(block =>
            <span key={block.id}
                  className={`grid-cell grid-cell-x-${block.x} grid-cell-y-${block.y} ${block.type} ${block.occupied ? "occupied" : ""} grid-cell-color-${block.color}`}
            />
          )}
        </div>
      </div>
    );
  }
}