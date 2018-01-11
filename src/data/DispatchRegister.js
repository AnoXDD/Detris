/**
 * Created by Anoxic on 1/10/2018.
 *
 * A class to handle the order of dispatching
 */

import Dispatcher from "./Dispatcher";

let gameGridStoreToken = Dispatcher.register(payload => {
  // intentionally left blank
});

let controlStoreToken = Dispatcher.register(payload => {
  Dispatcher.waitFor([gameGridStoreToken]);
});