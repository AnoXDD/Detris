/**
 * Created by Anoxic on 9/21/2017.
 */

import React, {Component} from "react";
import {CSSTransitionGroup} from 'react-transition-group';

export default class GridView extends Component {
  render() {
    return (
      <div className="grid-view">
        <div className="grid-cells">
          <CSSTransitionGroup
            transitionName="grid-cell-animation"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1000}
          >
            {this.props.grid.map(block =>
              <span key={block.id}
                    className={`grid-cell grid-cell-x-${block.x} grid-cell-y-${block.y} ${block.type} ${block.occupied ? "occupied" : ""} grid-cell-color-${block.color}`}
              />
            )}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}