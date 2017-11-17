/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import {CSSTransitionGroup} from "react-transition-group";
import TopBarType from "../data/enum/TopBarTypes";

export default class TopBarView extends Component {

  render() {
    let {topBar = []} = this.props;

    let buttons = topBar.map(type => {
      switch (type) {
        case TopBarType.TOP_BACK:
          return (
            <Button key="back"
                    onClick={this.props.onQuit}
            >arrow_back</Button>
          );
        case TopBarType.TOP_PAUSE:
          return (
            <Button key="pause"
                    onClick={this.props.onBack}
                    className="right"
            >pause</Button>
          );
        case TopBarType.TOP_IMPORT_EXPORT:
          return (
            <Button key="import"
                    onClick={this.props.onImportExport}
                    className="right"
            >import_export</Button>
          )
        default:
          return null;
      }
    });

    return (
      <div className="action-bar-view">
        <CSSTransitionGroup
          transitionName="fade-animation"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1000}
        >
          {buttons}
        </CSSTransitionGroup>
      </div>
    );
  }
}