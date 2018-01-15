/**
 * Created by Anoxic on 1/14/2018.
 */

import {persistReducer} from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";

import reducer from "../reducer/reducer";
import {transforms} from "./transforms";
import Block from "../state/Block";
import GamePanel from "../state/GamePanel";
import BaseGrid from "../state/BaseGrid";
import LevelEditorPanel from "../state/LevelEditorPanel";
import Detromino from "../state/Detromino";

const persistConfig = {
  transforms: [transforms, immutableTransform({
    records: [Block, GamePanel, BaseGrid, LevelEditorPanel, Detromino],
  })],
  key       : 'root',
  // whitelist : ["game"],
  storage,
  // stateReconciler,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default persistedReducer;