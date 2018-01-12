/**
 * Created by Anoxic on 9/24/2017.
 */

import React, {Component} from "react";
import DetrominoShape from "../enum/DetrominoShape";

export default class DetrominoView extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.type && DetrominoShape[nextProps.type] && this.props.type !== nextProps.type;
  }

  render() {
    if (!DetrominoShape[this.props.type]) {
      return null;
    }

    return (
      <div className={`detromino-preview detromino-preview-${this.props.type}`}>
        {DetrominoShape[this.props.type].map((col, i) =>
          col.map((row, j) =>
          row ?
            <span key={`${i}-${j}`}
                  className={`grid-cell grid-cell-preview grid-cell-y-${j} grid-cell-x-${i}`}/> : null
          )
        )}
      </div>
    );
  }
}