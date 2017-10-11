/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";

const Type = {
  NONE  : 0,
  ROTATE: 1,
  UP    : 2,
  LEFT  : 3,
  DOWN  : 4,
  RIGHT : 5,
  DONE  : 6,
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
        this.props.done(this.props.isEditingGrid);
        break;
      case Type.UP:
        this.props.up();
        break;
      case Type.DOWN:
        this.props.down();
        break;
      case Type.LEFT:
        this.props.left();
        break;
      case Type.RIGHT:
        this.props.right();
        break;
      default:
        break;
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isEditingGrid !== nextProps.isEditingGrid;
  }

  render() {
    return (
      <div className="control">
        <div className="rotate-wrapper flex-center">
          <Button
            className={this.state.pressed === Type.ROTATE ? "grid-control-animation" : ""}
            onClick={() => this.handleClick(Type.ROTATE)}>rotate_right</Button>
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
        <div className="done-wrapper flex-center">
          <Button
            className={`accent wider ${this.state.pressed === Type.DONE ? "grid-control-animation" : ""}`}
            onClick={() => this.handleClick(Type.DONE)}
          >
            done
          </Button>
        </div>
      </div>
    );
  }
}