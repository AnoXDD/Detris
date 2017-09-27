/**
 * Created by Anoxic on 9/26/2017.
 *
 * A view for levels
 */

import React, {Component} from "react";
import TitleBoxView from "./TitleBoxView";

export default class LevelView extends Component {

  shouldComponentUpdate(prevProps) {
    return this.props.id === prevProps.id;
  }

  render() {
    return (
      <div className="level-view">
        {this.props.view.levels.map(level =>
          <div className="level-view-unit-wrapper">
            <TitleBoxView>
              <div className="level-view-unit">
                {level.levelNumber}
              </div>
            </TitleBoxView>
          </div>
        )}
      </div>
    );
  }
}