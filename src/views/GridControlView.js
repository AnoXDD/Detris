/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";
import Toggle from "../lib/Toggle";
import Direction from "../data/enum/Direction";
import Actions from "../data/enum/Actions";

const Type = {
  NONE             : 0,
  ROTATE           : 1,
  UP               : 2,
  LEFT             : 3,
  DOWN             : 4,
  RIGHT            : 5,
  DONE             : 6,
  TOGGLE_EDIT_BLOCK: 7,
};

export default class GridControlView extends Component {

  state = {
    pressed: Type.NONE,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(pressed) {
    this.setState({pressed,});

    switch (pressed) {
      case Type.ROTATE:
        this.props.rotate();
        break;
      case Type.DONE:
        this.props.done();
        break;
      case Type.UP:
        this.props.move(Direction.UP);
        break;
      case Type.DOWN:
        this.props.move(Direction.DOWN);
        break;
      case Type.LEFT:
        this.props.move(Direction.LEFT);
        break;
      case Type.RIGHT:
        this.props.move(Direction.RIGHT);
        break;
      case Type.TOGGLE_EDIT_BLOCK:
        this.props.toggleEditBlock();
        break;
      default:
        break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isEditingBlock !== nextProps.isEditingBlock || this.props.isShowingLevelEditor !== nextProps.isShowingLevelEditor;
  }

  render() {
    return (
      <div className="control">
        <div className="rotate-wrapper flex-center">
          <div className="flex-inner-extend rotate-inner-wrapper flex-center">
            {this.props.isShowingLevelEditor ?
              <Toggle
                firstIcon="grid_on"
                secondIcon="grid_off"
                isChanging={this.props.isEditingBlock}
                onClick={() => this.handleClick(Type.TOGGLE_EDIT_BLOCK)}
              /> : null}
            <Button
              className={`${this.state.pressed === Type.ROTATE ? "grid-control-animation" : ""} ${this.props.isEditingBlock ? "transparent" : ""}`}
              onClick={() => this.handleClick(Type.ROTATE)}
            >rotate_right</Button>
          </div>
        </div>
        <div className="arrow-wrapper flex-center">
          <div className="flex-inner-extend arrow-inner-wrapper flex-center">
            <div className="arrow-up-wrapper flex-center">
              <Button
                className={this.state.pressed === Type.UP ? "grid-control-animation" : ""}
                onClick={() => this.handleClick(Type.UP)}>arrow_upward</Button>
            </div>
            <div className="arrow-non-up-wrapper flex-center">
              <Button
                className={`left ${this.state.pressed === Type.LEFT ? "grid-control-animation" : ""}`}
                onClick={() => this.handleClick(Type.LEFT)}>
                arrow_back
              </Button>
              <Button
                className={`down ${this.state.pressed === Type.DOWN ? "grid-control-animation" : ""}`}
                onClick={() => this.handleClick(Type.DOWN)}>
                arrow_downward
              </Button>
              <Button
                className={`right ${this.state.pressed === Type.RIGHT ? "grid-control-animation" : ""}`}
                onClick={() => this.handleClick(Type.RIGHT)}>
                arrow_forward
              </Button>
            </div>
          </div>
        </div>
        <div className="action-wrapper flex-center">
          {this.props.isEditingBlock ?
            <div className="btns grid-container">
              {this.props.blockList.map(block =>
                <Button className="grid-cell-btn narrow"
                        key={block}
                        onClick={() => Actions.setBlockType(block)}
                        text={<span className={`grid-cell demo ${block}`}/>}/>
              )}
            </div>
            :
            <Button
              className={`accent wider ${this.state.pressed === Type.DONE ? "grid-control-animation" : ""}`}
              onClick={() => this.handleClick(Type.DONE)}
            >
              done
            </Button>
          }
        </div>
      </div>
    );
  }
}