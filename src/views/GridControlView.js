/**
 * Created by Anoxic on 10/3/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";

export default class GridControlView extends Component {

  // Never update since it's supposed to be steady
  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {props} = this;

    return (
      <div className="control">
        <div className="rotate-wrapper flex-center">
          <Button onClick={props.rotate}>rotate_right</Button>
        </div>
        <div className="arrow-wrapper flex-center">
          <div className="flex-inner-extend arrow-inner-wrapper flex-center">
            <div className="arrow-up-wrapper flex-center">
              <Button onClick={props.up}>arrow_upward</Button>
            </div>
            <div className="arrow-non-up-wrapper flex-center">
              <Button onClick={props.left}>arrow_back</Button>
              <Button onClick={props.down}>arrow_downward</Button>
              <Button onClick={props.right}>arrow_forward</Button>
            </div>
          </div>
        </div>
        <div className="done-wrapper flex-center">
          <Button className="accent wider" onClick={props.done}>done</Button>
        </div>
      </div>
    );
  }
}