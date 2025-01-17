/**
 * Created by Anoxic on 041817.
 * A toggle with material icon that has two state
 */

import React, {Component} from "react";
import Ink from "react-ink";

export default class Toggle extends Component {

  state = {
    onFirst: true
  };

  render() {
    if (this.props.hidden) {
      return null;
    }

    let {className, isHidden, isChangingOnHover, isChanging, onClick, firstIcon, secondIcon} = this.props;
    let tag = this.props["data-tag"];

    let disabled = {};
    if (this.props.disabled) {
      disabled.disabled = "disabled";
    }

    return (
        <a className={`toggle ${this.props.loading ? "loading" : ""} ${className || ""} ${isHidden ? "hidden" : ""} ${isChangingOnHover ? "change-hover" : ""} ${isChanging ? "show-second" : ""} `}
           onClick={onClick}
           {...disabled}
        >
          <Ink/>
          <div
              data-tag={tag}
              className={`flex-center first icon-wrapper ${!this.props.loading ? "" : "transparent"}`}>
            <i className="material-icons">{firstIcon}</i>
          </div>
          <div
              data-tag={tag}
              className={`flex-center second icon-wrapper ${!this.props.loading ? "" : "transparent"}`}>
            <i className="material-icons">{secondIcon}</i>
          </div>
          { this.props.tooltip ? (
              <div className="tooltip flex-center">
                <span className="tooltip-text">
                  {this.props.tooltip}
                </span>
              </div>) : null }
          { this.props.tooltip ? (
              <div className="tooltip flex-center">
                <span className="tooltip-text">
                  {this.props.tooltip}
                </span>
              </div>) : null }
          <div
              className={`flex-center icon-wrapper loading-icon ${this.props.loading ? "" : "transparent"}`}>
            <i className="material-icons">remove</i>
          </div>
        </a>
    );
  }
}