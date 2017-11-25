/**
 * Created by Anoxic on 11/17/2017.
 *
 * This is a basic setup of the notification object with properties. To see
 * more information, visit
 * https://github.com/igorprado/react-notification-system#creating-a-notification
 */

import Immutable from "immutable";

const NotificationStateRecord = new Immutable.Record({
  message : null,
  level   : null,
  // Default position is top center
  position: "tc",
  // Set to true to hide current notification
  hidden  : false,

  id: 0,
});

export default NotificationStateRecord;