/**
 * Created by Anoxic on 9/21/2017.
 *
 * The main container of the game
 */

import {Container} from "flux/utils";
import React, {Component} from "react";

import NotificationStore from "../data/notification/NotificationStore";
import NotificationSystem from "react-notification-system";

class NotificationContainer extends Component {

  // NotificationSystem object
  ns = null;
  // The id number to keep track of what has been displayed
  id = -1;

  static getStores() {
    return [
      NotificationStore,
    ];
  }

  static calculateState(prevState) {
    return {
      ...NotificationStore.getState().toJS(),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.id !== this.id;
  }

  componentDidUpdate() {
    // Dismiss notifications
    this.ns.clearNotifications();

    this.id = this.state.id;

    this.ns.addNotification(this.state);
  }

  render() {
    return <NotificationSystem
      autoDismiss={5}
      style={false}
      ref={r => {
        this.ns = r;
      }}/>
  }
}

export default Container.create(NotificationContainer);