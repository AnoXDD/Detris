/**
 * Created by Anoxic on 9/24/2017.
 */

import React, {Component} from "react";
import {CSSTransitionGroup} from 'react-transition-group';

import DetrominoView from "./DetrominoView";

export default class QueueView extends Component {

  shouldComponentUpdate(prevProps) {
    return this.props.queue && this.props.queue !== prevProps.queue;
  }

  render() {
    if (!this.props.queue) {
      return null;
    }

    const size = this.props.queue.size;

    return (
      <div className="queue-view">
        <CSSTransitionGroup
          transitionName="detromino-animation"
          transitionEnterTimeout={0}
          transitionLeaveTimeout={300}
        >
          {this.props.queue.reverse().map((detromino, i) =>
            <div key={size - i} className="detromino-view-wrapper">
              <DetrominoView type={detromino}/>
            </div>
          )}
        </CSSTransitionGroup>
      </div>
    )
  }
}