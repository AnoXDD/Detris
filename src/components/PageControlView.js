/**
 * Created by Anoxic on 10/1/2017.
 */

import React, {Component} from "react";
import Button from "../lib/Button";

import LevelViewData from "../static/LevelViewData";

const PAGE_SIZE = LevelViewData.views().size;

export default class PageControlView extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.currentPage !== nextProps.currentPage;
  }

  render() {
    return (
      <div className="btns">
        <Button
          onClick={this.props.prevPage}
          disabled={this.props.isFirstPage}
        >chevron_left</Button>
        <div className="page-control-view flex-center">
          {[...new Array(PAGE_SIZE)].map((a, i) =>
            <span
              key={i}
              className={`page-control-dot ${i === this.props.currentPage ? "current-page" : ""}`}/>
          )}
        </div>
        <Button
          onClick={this.props.nextPage}
          disabled={this.props.isLastPage}
        >chevron_right</Button>
      </div>
    );
  }
}