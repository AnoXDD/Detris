/**
 * Created by Anoxic on 1/14/2018.
 */

import storage from "redux-persist/lib/storage";
import immutableTransform from 'redux-persist-transform-immutable'

import {controlStateReconciler} from "./stateReconciler";
import {transforms} from "./transforms";

export const controlPersistConfig = {
  key            : "control",
  // whitelist      : ["controlRecordId"],
  transforms     : [immutableTransform()],
  stateReconciler: controlStateReconciler,
  storage,
};

export const gamePersistConfig = {
  key       : "game",
  transforms: [transforms],
  storage,
};

export default {
  controlPersistConfig,
};