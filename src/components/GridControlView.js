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

export default class GridControlView extends Component {

  state = {
    pressed: ControlTypes.NONE,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(pressed) {
    this.setState({pressed,});

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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.update || this.props.isEditingBlock !==
  // nextProps.isEditingBlock || this.props.isShowingLevelEditor !==
  // nextProps.isShowingLevelEditor; }

  render() {
    let hidden = controlType => this.props.enabled.indexOf(controlType) === -1;

    return (
      <div className="control">
        <div className="rotate-wrapper flex-center">
          <div className="flex-inner-extend control-inner-wrapper column flex-center">
            <Toggle
              hidden={hidden(ControlTypes.CONTROL_TOGGLE_EDIT)}
              firstIcon="grid_on"
              secondIcon="grid_off"
              isChanging={this.props.isEditingBlock}
              onClick={() => this.handleClick(ControlTypes.CONTROL_TOGGLE_EDIT)}
            />
            <Button
              hidden={hidden(ControlTypes.CONTROL_ROTATE)}
              className={`${this.state.pressed === ControlTypes.ROTATE ? "grid-control-animation" : ""} ${this.props.isEditingBlock ? "transparent" : ""}`}
              onClick={() => this.handleClick(ControlTypes.CONTROL_ROTATE)}
            >rotate_right</Button>
          </div>
        </div>
        <div
          className={`shape-cycle-wrapper flex-center ${hidden(ControlTypes.CONTROL_PREV_DETROMINO) && hidden(
            ControlTypes.CONTROL_NEXT_DETROMINO) ? "hidden" : ""}`}>
          <div
            className="flex-inner-extend control-inner-wrapper column flex-center">
            <Button
              hidden={hidden(ControlTypes.CONTROL_PREV_DETROMINO)}
              onClick={() => this.handleClick(ControlTypes.CONTROL_PREV_DETROMINO)}>arrow_drop_up</Button>
            <Button
              hidden={hidden(ControlTypes.CONTROL_NEXT_DETROMINO)}
              onClick={() => this.handleClick(ControlTypes.CONTROL_NEXT_DETROMINO)}>arrow_drop_down</Button>
          </div>
        </div>
        <div className="arrow-wrapper flex-center">
          <div className="flex-inner-extend control-inner-wrapper flex-center">
            <div className="control-arrow-row flex-center">
              <Button
                hidden={hidden(ControlTypes.CONTROL_UNDO)}
                onClick={() => this.handleClick(ControlTypes.CONTROL_UNDO)}>
                undo
              </Button>
              <Button
                hidden={hidden(ControlTypes.CONTROL_LEFT)}
                className={`left ${this.state.pressed === ControlTypes.CONTROL_LEFT ? "grid-control-animation" : ""}`}
                onClick={() => this.handleClick(ControlTypes.CONTROL_LEFT)}>
                arrow_back
              </Button>
            </div>
            <div className="control-arrow-row flex-center">
              <Button
                hidden={hidden(ControlTypes.CONTROL_UP)}
                className={this.state.pressed === ControlTypes.CONTROL_UP ? "grid-control-animation" : ""}
                onClick={() => this.handleClick(ControlTypes.CONTROL_UP)}>arrow_upward</Button>
              <Button
                hidden={hidden(ControlTypes.CONTROL_DOWN)}
                className={`down ${this.state.pressed === ControlTypes.CONTROL_DOWN ? "grid-control-animation" : ""}`}
                onClick={() => this.handleClick(ControlTypes.CONTROL_DOWN)}>
                arrow_downward
              </Button>
            </div>
            <div className="control-arrow-row flex-center">
              <Button
                hidden={hidden(ControlTypes.CONTROL_REDO)}
                onClick={() => this.handleClick(ControlTypes.CONTROL_REDO)}>
                redo
              </Button>
              <Button
                hidden={hidden(ControlTypes.CONTROL_RIGHT)}
                className={`right ${this.state.pressed === ControlTypes.CONTROL_RIGHT ? "grid-control-animation" : ""}`}
                onClick={() => this.handleClick(ControlTypes.CONTROL_RIGHT)}>
                arrow_forward
              </Button>
            </div>
          </div>
        </div>
        <div className="action-wrapper flex-center">
          <div className="btns grid-container">
            {this.props.blockList ? this.props.blockList.map(block =>
              <Button
                hidden={hidden(ControlTypes.CONTROL_BLOCK_SELECTOR)}
                className="grid-cell-btn narrow"
                key={block}
                onClick={() => store.dispatch(Actions.setBlockType(block))}
                text={<span className={`grid-cell demo ${block}`}/>}/>
            ) : null}
          </div>
          <Button
            hidden={hidden(ControlTypes.CONTROL_DONE)}
            className={`accent wider ${this.state.pressed === ControlTypes.DONE ? "grid-control-animation" : ""}`}
            onClick={() => store.dispatch(this.handleClick(ControlTypes.CONTROL_DONE))}
          >
            done
          </Button>
        </div>
      </div>
    );
  }
}