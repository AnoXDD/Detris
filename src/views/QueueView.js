/**
 * Created by Anoxic on 9/24/2017.
 */

import React, {Component} from "react";
import {CSSTransitionGroup} from 'react-transition-group';

import DetrominoView from "./DetrominoView";
import TitleBoxView from "./TitleBoxView";

export default class QueueView extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.queue && this.props.queue !== nextProps.queue;
  }

  render() {
    if (!this.props.queue) {
      return null;
    }

    const size = this.props.queue.size;

    return (
      <div className="queue-view">
        <div className="next">
          <TitleBoxView title="next">
            <div className="next-inner">
              <CSSTransitionGroup
                transitionName="detromino-animation"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                <div key={new Date().getTime()}
                     className="detromino-view-wrapper">
                  <DetrominoView type={this.props.queue.last()}/>
                </div>
              </CSSTransitionGroup>
            </div>
          </TitleBoxView>
        </div>
        <div className="queue">
          <div className="flex-inner-extend">
            <div className="queue-flex-inner-extend-wrapper">
              <TitleBoxView title="queue">
                <div className="queue-inner">
                  <CSSTransitionGroup
                    transitionName="detromino-animation"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                  >
                    {this.props.queue.reverse().map((detromino, i) =>
                      i > 0 ?
                        <div key={size - i} className="detromino-view-wrapper">
                          <DetrominoView type={detromino}/>
                        </div> : null
                    )}
                  </CSSTransitionGroup>
                </div>
              </TitleBoxView>
            </div>
          </div>
        </div>
      </div>
    )
  }
}