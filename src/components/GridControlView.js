/**
 * Created by Anoxic on 10/3/2017.
 */

import React from "react";
import Button from "../lib/Button";
import Toggle from "../lib/Toggle";
import Direction from "../enum/Direction";
import Actions from "../data/Actions";
import ControlTypes from "../enum/ControlTypes";
import store from "../store/store";

function handleClick(props, pressed) {
  switch (pressed) {
    case ControlTypes.CONTROL_ROTATE:
      props.rotate();
      break;
    case ControlTypes.CONTROL_DONE:
      props.done();
      break;
    case ControlTypes.CONTROL_UP:
      props.move(Direction.UP);
      break;
    case ControlTypes.CONTROL_DOWN:
      props.move(Direction.DOWN);
      break;
    case ControlTypes.CONTROL_LEFT:
      props.move(Direction.LEFT);
      break;
    case ControlTypes.CONTROL_RIGHT:
      props.move(Direction.RIGHT);
      break;
    case ControlTypes.CONTROL_TOGGLE_EDIT:
      props.toggleEditBlock();
      break;
    case ControlTypes.CONTROL_PREV_DETROMINO:
      props.prevDetromino();
      break;
    case ControlTypes.CONTROL_NEXT_DETROMINO:
      props.nextDetromino();
      break;
    case ControlTypes.CONTROL_UNDO:
      props.undo();
      break;
    case ControlTypes.CONTROL_REDO:
      props.redo();
      break;
    default:
      break;
  }
}

function hidden(props, controlType) {
  return props.enabled.indexOf(controlType) === -1;
}

function generateButton(props, type) {
  return (icon, className) => <Button
    hidden={hidden(props, type)}
    className={className || icon}
    onClick={() => handleClick(props, type)}
  >{icon}</Button>;
}

const GridControlView = (props) => {
  let gridToggle = <Toggle
    hidden={hidden(props, ControlTypes.CONTROL_TOGGLE_EDIT)}
    firstIcon="grid_on"
    secondIcon="grid_off"
    isChanging={props.isEditingBlock}
    className="grid-toggle"
    onClick={() => handleClick(props, ControlTypes.CONTROL_TOGGLE_EDIT)}
  />;
  let rotate = generateButton(props,
    ControlTypes.CONTROL_ROTATE)(
    "rotate_right", "rotate");
  let prevDetromino = generateButton(props,
    ControlTypes.CONTROL_PREV_DETROMINO)(
    "arrow_drop_up", "prev-detrominio");
  let nextDetromino = generateButton(props,
    ControlTypes.CONTROL_NEXT_DETROMINO)(
    "arrow_drop_down", "next-detromino");

  let undo = generateButton(props, ControlTypes.CONTROL_UNDO)("undo");
  let redo = generateButton(props, ControlTypes.CONTROL_REDO)("redo");

  let left =
    generateButton(props, ControlTypes.CONTROL_LEFT)("arrow_back", "left");
  let right =
    generateButton(props, ControlTypes.CONTROL_RIGHT)("arrow_forward", "right");
  let up =
    generateButton(props, ControlTypes.CONTROL_UP)("arrow_upward", "up");
  let down =
    generateButton(props, ControlTypes.CONTROL_DOWN)("arrow_downward", "down");

  let blockSelector = props.blockList ? props.blockList.map(block =>
    <Button
      hidden={hidden(props, ControlTypes.CONTROL_BLOCK_SELECTOR)}
      className="grid-cell-btn narrow block-selector"
      key={block}
      onClick={() => store.dispatch(Actions.setBlockType(block))}
      text={<span className={`grid-cell demo ${block}`}/>}/>
  ) : null;
  let done = <Button
    hidden={hidden(props, ControlTypes.CONTROL_DONE)}
    className="accent done"
    onClick={() => store.dispatch(handleClick(props,
      ControlTypes.CONTROL_DONE))}
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

export default GridControlView;