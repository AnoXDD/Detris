/**
 * Created by Anoxic on 042317.
 * A simple class for a button
 */

import React, {Component} from "react";
import Ink from "react-ink";

export default class Button extends Component {

  render() {
    if (this.props.hidden) {
      return null;
    }

    let disabled = {};
    if (this.props.disabled || this.props.loading) {
      disabled.disabled = "disabled";
    }

    return (
      <a
        className={`btn ${this.props.loading ? "loading" : ""} ${this.props.text ? "text" : ""} ${this.props.className || ""}`}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onTouchStart={this.props.onTouchStart}
        onTouchEnd={this.props.onTouchEnd}
        {...disabled}>
        <div
          className={`flex-center icon-wrapper ${!this.props.loading ? "" : "transparent"}`}>
          <i className="material-icons">
            {this.props.children}
          </i>
        </div>
        { this.props.tooltip ? (
          <div className="tooltip flex-center">
                <span className="tooltip-text">
                  {this.props.tooltip}
                </span>
          </div>) : null }
        { this.props.text ? (
          <div className="vertical-align text-wrapper">
                <span className="vertical-align-wrapper btn-text">
                  {this.props.text}
                </span>
          </div>) : null }
        <div
          className={`flex-center icon-wrapper loading-icon ${this.props.loading ? "" : "transparent"}`}>
          <i className="material-icons">
            remove
          </i>
        </div>
        <Ink />
      </a>
    );
  }
}