/**
 * Created by Anoxic on 9/26/2017.
 *
 * A Record to store the levels visible/available to user
 */

import Immutable from "immutable";
import LevelViewUnit from "./LevelViewUnit";

const LevelPage = Immutable.Record({
  id    : -1,
  page  : -1,
  levels: Immutable.List()
});

/**
 * Script
 *  [...Array(25).keys()].map((a,i)=>{return `${i}:new
 * LevelViewUnit({id:${i},levelNumber:${i}})`}).join(",\n")
 */

const LevelViewData = Immutable.fromJS([
  new LevelPage({
    id    : 0,
    page  : 0,
    levels: Immutable.List([
      new LevelViewUnit({id: 1, levelNumber: 1}),
      new LevelViewUnit({id: 2, levelNumber: 2}),
      new LevelViewUnit({id: 3, levelNumber: 3}),
      new LevelViewUnit({id: 4, levelNumber: 4}),
      new LevelViewUnit({id: 5, levelNumber: 5}),
      new LevelViewUnit({id: 6, levelNumber: 6}),
      new LevelViewUnit({id: 7, levelNumber: 7}),
      new LevelViewUnit({id: 8, levelNumber: 8}),
      new LevelViewUnit({id: 9, levelNumber: 9}),
      new LevelViewUnit({id: 10, levelNumber: 10}),
      new LevelViewUnit({id: 11, levelNumber: 11}),
      new LevelViewUnit({id: 12, levelNumber: 12}),
    ]),
  }),
  new LevelPage({
    id    : 1,
    page  : 1,
    levels: Immutable.List([
      new LevelViewUnit({id: 13, levelNumber: 13}),
      new LevelViewUnit({id: 14, levelNumber: 14}),
      new LevelViewUnit({id: 15, levelNumber: 15}),
      new LevelViewUnit({id: 16, levelNumber: 16}),
      new LevelViewUnit({id: 17, levelNumber: 17}),
      new LevelViewUnit({id: 18, levelNumber: 18}),
      new LevelViewUnit({id: 19, levelNumber: 19}),
      new LevelViewUnit({id: 20, levelNumber: 20}),
      new LevelViewUnit({id: 21, levelNumber: 21}),
      new LevelViewUnit({id: 22, levelNumber: 22}),
      new LevelViewUnit({id: 23, levelNumber: 23}),
      new LevelViewUnit({id: 24, levelNumber: 24}),
    ]),
  }),
]);

export default LevelViewData;