/**
 * Created by Anoxic on 9/21/2017.
 *
 * A container that only contains controls. No UI logic is in this class
 */

import {Component} from "react";
import {connect} from "react-redux";

import Direction from "../enum/Direction";
import Actions from "../data/Actions";
import store from "../store/store";


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
    keyMap.ArrowLeft = () => this.props.move(Direction.LEFT);
    keyMap.ArrowUp = () => this.props.move(Direction.UP);
    keyMap.ArrowRight = () => this.props.move(Direction.RIGHT);
    keyMap.ArrowDown =() => this.props.move(Direction.DOWN);
    keyMap.Shift = this.props.rotate;
    keyMap.q = this.props.prevDetromino;
    keyMap.a = this.props.nextDetromino;
    keyMap.PageUp = this.props.prevDetromino;
    keyMap.PageDown = this.props.nextDetromino;
    keyMap.z = this.props.undo;
    keyMap.x = this.props.redo;
    keyMap["`"] = this.props.toggleEditBlock;
    keyMap.Escape = this.props.toggleEditBlock;
    keyMap[" "] = this.props.done;

    for (let i = 1; i <= this.props.blockList.length; ++i) {
      keyMap[`${i}`] = () => this.props.chooseEditBlock(this.props.blockList[i - 1]);
    }
  }

  handleKeyDown(e) {
    // Checks if there is any active overlay
    if (this.props.activeOverlay.length) {
      // There is overlay, do not handle any key events
      // We may want to add some other behavior, like dismissing overlay when
      // `esc` is pressed
      return;
    }

    let {key} = e;
    if (!keyMap[key]) {
      console.log(`Key not registered: ${key}`);
      return;
    }

    store.dispatch(keyMap[key]());
  }

  render() {
    return null;
  }
}

function stateToProps(state, ownProps) {
  let levelEditorState = state.levelEditorPanel.present.get("editorState").toJS();
  let {blockList} = levelEditorState;

  return {
    ...state.control.toJS(),
    ...state.game.toJS(),
    blockList,
  };
}

const connected = connect(stateToProps)(ControlContainer);

export default connected;