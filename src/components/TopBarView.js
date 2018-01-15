/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import {CSSTransitionGroup} from "react-transition-group";
import TopBarType from "../enum/TopBarTypes";
import Actions from "../data/Actions";
import store from "../store/store";

export default class TopBarView extends Component {

  render() {
    let {topBar = []} = this.props;

    let buttons = topBar.map(type => {
      switch (type) {
        case TopBarType.TOP_BACK:
          return (
            <Button key="back"
                    onClick={this.props.button.onQuit}
            >arrow_back</Button>
          );
        case TopBarType.TOP_PAUSE:
          return (
            <Button key="pause"
                    onClick={this.props.button.onBack}
                    className="right"
            >pause</Button>
          );
        case TopBarType.TOP_IMPORT_EXPORT:
          return (
            <Button key="import"
                    onClick={() => store.dispatch(Actions.showLevelEditorImportExport())}
                    className="right"
            >save</Button>
          );
        case TopBarType.TOP_TUTORIAL_INFO:
          return (
            <Button key="tutorial_info"
                    onClick={this.props.button.onShowGuide}
                    className="right"
            >info</Button>
          );
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