/**
 * Created by Anoxic on 9/26/2017.
 *
 * A view for levels
 */

import React, {Component} from "react";
import {CSSTransitionGroup} from 'react-transition-group';

import TitleBoxView from "./TitleBoxView";

export default class LevelView extends Component {

  shouldComponentUpdate(prevProps) {
    return this.props.id === prevProps.id;
  }

  render() {
    return (
      <CSSTransitionGroup
        className="level-view"
        transitionName="level-view-animation"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        <div key={new Date().getTime()} className="level-view-inner">
          {this.props.view.levels.map(level =>
            <div key={level.id} className="level-view-unit-wrapper">
              <TitleBoxView
                onClick={() => this.props.startNewLevel(level.levelNumber)}
              >
                <div className="level-view-unit">
                  {level.levelNumber}
                </div>
              </TitleBoxView>
            </div>
          )}
        </div>
      </CSSTransitionGroup>
    );
  }
}
