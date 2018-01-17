/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import Toggle from "../lib/Toggle";
import Direction from "../enum/Direction";
import Actions from "../data/Actions";
import ControlTypes from "../enum/ControlTypes";
import store from "../store/store";
import PanelType from "../enum/PanelType";
import {
  canRedoInEditor,
  canRedoInGame, canUndoInEditor,
  canUndoInGame
} from "../util/GridHistoryHelper";

export default class GridControlView extends Component {

  canUndo() {
    switch (this.props.panelType) {
      case PanelType.IN_GAME:
      case PanelType.TUTORIAL:
        return canUndoInGame();
      case PanelType.LEVEL_EDITOR:
        return canUndoInEditor();
      default:
        return false;
    }
  }

  canRedo() {
    switch (this.props.panelType) {
      case PanelType.IN_GAME:
      case PanelType.TUTORIAL:
        return canRedoInGame();
      case PanelType.LEVEL_EDITOR:
        return canRedoInEditor();
      default:
        return false;
    }
  }

  handleClick(pressed) {
    switch (pressed) {
      case ControlTypes.CONTROL_ROTATE:
        this.props.rotate();
        break;
      case ControlTypes.CONTROL_DONE:
        this.props.done();
        break;
      case ControlTypes.CONTROL_UP:
        this.props.move(Direction.UP);
        break;
      case ControlTypes.CONTROL_DOWN:
        this.props.move(Direction.DOWN);
        break;
      case ControlTypes.CONTROL_LEFT:
        this.props.move(Direction.LEFT);
        break;
      case ControlTypes.CONTROL_RIGHT:
        this.props.move(Direction.RIGHT);
        break;
      case ControlTypes.CONTROL_TOGGLE_EDIT:
        this.props.toggleEditBlock();
        break;
      case ControlTypes.CONTROL_PREV_DETROMINO:
        this.props.prevDetromino();
        break;
      case ControlTypes.CONTROL_NEXT_DETROMINO:
        this.props.nextDetromino();
        break;
      case ControlTypes.CONTROL_UNDO:
        this.props.undo();
        break;
      case ControlTypes.CONTROL_REDO:
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

  render() {
    let gridToggle = <Toggle
      hidden={this.hidden(ControlTypes.CONTROL_TOGGLE_EDIT)}
      firstIcon="grid_on"
      secondIcon="grid_off"
      isChanging={this.props.isEditingBlock}
      className="grid-toggle"
      onClick={() => this.handleClick(ControlTypes.CONTROL_TOGGLE_EDIT)}
    />;
    let rotate = this.generateButton(ControlTypes.CONTROL_ROTATE)(
      "rotate_right",
      "rotate");
    let prevDetromino = this.generateButton(ControlTypes.CONTROL_PREV_DETROMINO)(
      "arrow_drop_up",
      "prev-detrominio");
    let nextDetromino = this.generateButton(ControlTypes.CONTROL_NEXT_DETROMINO)(
      "arrow_drop_down",
      "next-detromino");

    let undo = <Button
      disabled={!this.canUndo()}
      className="undo"
      onClick={() => this.handleClick(ControlTypes.CONTROL_UNDO)}
    >undo</Button>;
    let redo = <Button
      disabled={!this.canRedo()}
      className="redo"
      onClick={() => this.handleClick(ControlTypes.CONTROL_REDO)}
    >redo</Button>;

    let left =
      this.generateButton(ControlTypes.CONTROL_LEFT)("arrow_back", "left");
    let right =
      this.generateButton(ControlTypes.CONTROL_RIGHT)("arrow_forward", "right");
    let up =
      this.generateButton(ControlTypes.CONTROL_UP)("arrow_upward", "up");
    let down =
      this.generateButton(ControlTypes.CONTROL_DOWN)("arrow_downward", "down");

    let blockSelector = this.props.blockList ?
      <div className="block-selectors">
        {this.props.blockList.map(block =>
          <Button
            hidden={this.hidden(ControlTypes.CONTROL_BLOCK_SELECTOR)}
            className="grid-cell-btn narrow block-selector"
            key={block}
            onClick={() => store.dispatch(Actions.setBlockType(block))}
            text={<span className={`grid-cell demo ${block}`}/>}/>
        )}
      </div> : null;
    let done = <Button
      hidden={this.hidden(ControlTypes.CONTROL_DONE)}
      className="accent done"
      onClick={() => store.dispatch(this.handleClick(ControlTypes.CONTROL_DONE))}
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

