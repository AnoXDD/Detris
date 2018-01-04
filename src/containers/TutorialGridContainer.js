/**
 * Created by Anoxic on 12/30/2017.
 */

import {Container} from "flux/utils";
import React, {Component} from "react";

import GameGridStore from "../data/grid/GameGridStore";
import QueueStore from "../data/queue/QueueStore";

import GridView from "../views/GridView";
import QueueView from "../views/QueueView";
import GridControlView from "../views/GridControlView";
import GameStateStore from "../data/game/GameStateStore";
import ControlStore from "../data/control/ControlStore";

class TutorialGridContainer extends Component {

  static getStores() {
    return [
      GameStateStore,
      QueueStore,
      GameGridStore,
      ControlStore,
    ];
  }

  static calculateState(prevState) {
    let grid = null;
      grid = {
        grid       : GameGridStore.getState()
          .get("grid")
          .get("grid")
          .valueSeq(),
        editorState: {},
      };

    return {
      ...grid,
      queue  : {
        queue: QueueStore.getState().get("queue"),
      },
      control: {
        ...ControlStore.getState().toJS(),
      }
    };
  }

  render() {
    return (
      <div className="container grid-container">
        <div className="grid-queue">
          <GridView
            grid={this.state.grid}
            editorState={this.state.editorState}/>
          <QueueView {...this.state.queue}/>
        </div>
        <GridControlView
          {...this.state.control}
          update={true}
          blockList={this.state.editorState.blockList}
          isEditingBlock={this.state.editorState.isEditingBlock}/>
      </div>
    );
  }
}

export default Container.create(TutorialGridContainer);