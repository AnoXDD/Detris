/**
 * Created by Anoxic on 9/21/2017.
 *
 * The main container of the game
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import NotificationSystem from "react-notification-system";

class NotificationContainer extends Component {

  // NotificationSystem object
  ns = null;
  // The id number to keep track of what has been displayed
  id = -1;

  shouldComponentUpdate(nextProps) {
    return nextProps.id !== this.id;
  }

  componentDidUpdate() {
    // Dismiss notifications
    this.ns.clearNotifications();

    this.id = this.props.id;

    if (!this.props.hidden) {
      this.ns.addNotification(this.props);
    }
  }

  render() {
    return <NotificationSystem
      autoDismiss={5}
      // eslint-disable-next-line
      style={false}
      ref={r => {
        this.ns = r;
      }}/>
  }
}


function calculateProps(state, ownProps) {
  return state.notification;
}

const connected = connect(calculateProps)(NotificationContainer);

export default connected;