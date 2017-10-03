/**
 * Created by Anoxic on 9/25/2017.
 */

import React, {Component} from "react";

export default class TitleBoxView extends Component {

  shouldComponentUpdate(prevProps) {
    return this.props.title !== prevProps.title || this.props.children !== prevProps.children;
  }

  render() {
    return (
      <div className="title-box-view" onClick={this.props.onClick}>
        <div className="title-box-view-title">
          <span>{this.props.title || ""}</span>
        </div>
        <div className="title-box-view-actual">
          {this.props.children}
        </div>
      </div>
    );
  }
}