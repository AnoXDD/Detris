/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import Toggle from "../lib/Toggle";
import Direction from "../enum/Direction";
import Actions from "../data/Actions";
import ControlType from "../enum/ControlType";
import store from "../store/store";
import PanelType from "../enum/PanelType";
import {
  canRedoInEditor,
  canRedoInGame, canUndoInEditor,
  canUndoInGame
} from "../util/GridHistoryHelper";
import {generateRepeaterEvent} from "../util/buttonRepeater";

export default class GridControlView extends Component {
  undoInGame = false;
  redoInGame = false;
  undoInEditor = false;
  redoInEditor = false;

  constructor(props) {
    super(props);

    this.undoInGame = canUndoInGame();
    this.redoInGame = canRedoInGame();
    this.undoInEditor = canUndoInEditor();
    this.redoInEditor = canRedoInEditor();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.enabled.join() !== this.props.enabled.join()) {
      return true;
    }

    let undoInGame = canUndoInGame();
    let redoInGame = canRedoInGame();
    let undoInEditor = canUndoInEditor();
    let redoInEditor = canRedoInEditor();

    if (undoInGame !== this.undoInGame || redoInGame !== this.redoInGame ||
      undoInEditor !== this.undoInEditor || redoInEditor !== this.redoInEditor) {
      this.undoInGame = undoInGame;
      this.redoInGame = redoInGame;
      this.undoInEditor = undoInEditor;
      this.redoInEditor = redoInEditor;

      return true;
    }

    return false;
  }

  canUndo() {
    switch (this.props.panelType) {
      case PanelType.IN_GAME:
      case PanelType.TUTORIAL:
        return this.undoInGame;
      case PanelType.LEVEL_EDITOR:
        return this.undoInEditor;
      default:
        return false;
    }
  }

  canRedo() {
    switch (this.props.panelType) {
      case PanelType.IN_GAME:
      case PanelType.TUTORIAL:
        return this.redoInGame;
      case PanelType.LEVEL_EDITOR:
        return this.redoInEditor;
      default:
        return false;
    }
  }

  handleClick(pressed) {
    switch (pressed) {
      case ControlType.CONTROL_ROTATE:
        this.props.rotate();
        break;
      case ControlType.CONTROL_DONE:
        this.props.done();
        break;
      case ControlType.CONTROL_UP:
        this.props.move(Direction.UP);
        break;
      case ControlType.CONTROL_DOWN:
        this.props.move(Direction.DOWN);
        break;
      case ControlType.CONTROL_LEFT:
        this.props.move(Direction.LEFT);
        break;
      case ControlType.CONTROL_RIGHT:
        this.props.move(Direction.RIGHT);
        break;
      case ControlType.CONTROL_TOGGLE_EDIT:
        this.props.toggleEditBlock();
        break;
      case ControlType.CONTROL_PREV_DETROMINO:
        this.props.prevDetromino();
        break;
      case ControlType.CONTROL_NEXT_DETROMINO:
        this.props.nextDetromino();
        break;
      case ControlType.CONTROL_UNDO:
        this.props.undo();
        break;
      case ControlType.CONTROL_REDO:
        this.props.redo();
        break;
      default:
        break;
    }
  }

  hidden(controlType) {
    return this.props.enabled.indexOf(controlType) === -1;
  }

  generateButton(type) {
    return (icon, className) => <Button
      hidden={this.hidden(type)}
      className={className || icon}
      onClick={() => this.handleClick(type)}
    >{icon}</Button>;
  }

  generateRepeaterButton(type) {
    return (icon, className) => <Button
      hidden={this.hidden(type)}
      className={className || icon}
      {...generateRepeaterEvent(() => this.handleClick(type))}
    >{icon}</Button>;
  }

  render() {
    let gridToggle = <Toggle
      hidden={this.hidden(ControlType.CONTROL_TOGGLE_EDIT)}
      firstIcon="grid_on"
      secondIcon="grid_off"
      isChanging={this.props.isEditingBlock}
      className="grid-toggle"
      onClick={() => this.handleClick(ControlType.CONTROL_TOGGLE_EDIT)}
    />;
    let rotate = this.generateButton(ControlType.CONTROL_ROTATE)(
      "rotate_right",
      "rotate");
    let prevDetromino = this.generateButton(ControlType.CONTROL_PREV_DETROMINO)(
      "arrow_drop_up",
      "prev-detrominio");
    let nextDetromino = this.generateButton(ControlType.CONTROL_NEXT_DETROMINO)(
      "arrow_drop_down",
      "next-detromino");

    let undo = <Button
      disabled={!this.canUndo()}
      hidden={this.hidden(ControlType.CONTROL_REDO)}
      className="undo"
      onClick={() => this.handleClick(ControlType.CONTROL_UNDO)}
    >undo</Button>;
    let redo = <Button
      disabled={!this.canRedo()}
      hidden={this.hidden(ControlType.CONTROL_REDO)}
      className="redo"
      onClick={() => this.handleClick(ControlType.CONTROL_REDO)}
    >redo</Button>;

    let left =
      this.generateRepeaterButton(ControlType.CONTROL_LEFT)(
        "arrow_back",
        "left");
    let right =
      this.generateRepeaterButton(ControlType.CONTROL_RIGHT)(
        "arrow_forward",
        "right");
    let up =
      this.generateRepeaterButton(ControlType.CONTROL_UP)(
        "arrow_upward",
        "up");
    let down =
      this.generateRepeaterButton(ControlType.CONTROL_DOWN)(
        "arrow_downward",
        "down");

    let blockSelector = this.props.blockList ?
      <div className="block-selectors">
        {this.props.blockList.map(block =>
          <Button
            hidden={this.hidden(ControlType.CONTROL_BLOCK_SELECTOR)}
            className="grid-cell-btn narrow block-selector"
            key={block}
            onClick={() => store.dispatch(Actions.setBlockType(block))}
            text={<span className={`grid-cell demo ${block}`}/>}/>
        )}
      </div> : null;
    let done = <Button
      hidden={this.hidden(ControlType.CONTROL_DONE)}
      className="accent done"
      onClick={() => store.dispatch(this.handleClick(ControlType.CONTROL_DONE))}
    >done</Button>;

    return (
      <div className="control">
        {gridToggle}
        {prevDetromino}
        {nextDetromino}
        {rotate}
        {undo}
        {left}
        {up}
        {down}
        {redo}
        {right}
        {blockSelector}
        {done}
      </div>
    );
  };
};

