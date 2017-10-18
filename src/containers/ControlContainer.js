/**
 * Created by Anoxic on 9/21/2017.
 *
 * A container that only contains controls. No UI logic is in this class
 */

import {Container} from "flux/utils";
import  {Component} from "react";
import ControlStore from "../data/control/ControlStore";
import Direction from "../data/enum/Direction";
import Actions from "../data/enum/Actions";
import LevelEditorGridStore from "../data/levelEditor/LevelEditorGridStore";

const keyMap = {
  "Delete": Actions.removeDetromino,
  " "     : Actions.nextDetrominoInGame,

  // Temporary debug functions go here
  "=": Actions.debug__addDetrominoToQueue,
  "-": Actions.resetGrid,
};

class ControlContainer extends Component {

  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown, true);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate() {
    // Process keyMap
    keyMap.ArrowLeft = () => this.state.move(Direction.LEFT);
    keyMap.ArrowUp = () => this.state.move(Direction.UP);
    keyMap.ArrowRight = () => this.state.move(Direction.RIGHT);
    keyMap.ArrowDown = () => this.state.move(Direction.DOWN);
    keyMap.Shift = this.state.rotate;
    keyMap["`"] = this.state.toggleEditBlock;
    keyMap[" "] = this.state.done;

    for (let i = 1; i <= this.state.blockList.length; ++i) {
      keyMap[`${i}`] = () => this.state.chooseEditBlock(this.state.blockList[i - 1]);
    }
  }

  handleKeyDown(e) {
    let {key} = e;
    if (!keyMap[key]) {
      console.log(`Key not registered: ${key}`);
      return;
    }

    keyMap[key]();
  }

  static getStores() {
    return [
      ControlStore,
      LevelEditorGridStore,
    ];
  }

  static calculateState(prevState) {
    let state = LevelEditorGridStore.getState();
    let levelEditorState = state.get("editorState").toJS();
    let {blockList} = levelEditorState;

    return {
      ...ControlStore.getState().toJS(),
      blockList,
    };
  }

  render() {
    return null;
  }
}

export default Container.create(ControlContainer);