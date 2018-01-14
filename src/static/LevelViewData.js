/**
 * Created by Anoxic on 9/26/2017.
 *
 * A Record to store the levels visible/available to user
 */

import Immutable from "immutable";
import LevelViewUnit from "../state/LevelViewUnit";

const LEVEL_PER_PAGE = 12;

const LevelPage = Immutable.Record({
  id    : -1,
  page  : -1,
  levels: Immutable.List(),
});

/**
 * Script
 *  [...Array(25).keys()].map((a,i)=>{return `${i}:new
 * LevelViewUnit({id:${i},levelNumber:${i}})`}).join(",\n")
 */

  // The array should be sorted by levelNumber. If it has to be changed, also
  // change the algorithm to find nextLevelId in the class at the bottom of the
  // file
const LevelViewUnits = [
    new LevelViewUnit({levelNumber: 1, id: "1"}),
    new LevelViewUnit({levelNumber: 2, id: "2"}),
    new LevelViewUnit({levelNumber: 3, id: "3"}),
    new LevelViewUnit({levelNumber: 4, id: "4"}),
    new LevelViewUnit({levelNumber: 5, id: "5"}),
    new LevelViewUnit({levelNumber: 6, id: "6"}),
    new LevelViewUnit({levelNumber: 7, id: "7"}),
    new LevelViewUnit({levelNumber: 8, id: "8"}),
    new LevelViewUnit({levelNumber: 9, id: "9"}),
    new LevelViewUnit({levelNumber: 10, id: "10"}),
    new LevelViewUnit({levelNumber: 11, id: "11"}),
    new LevelViewUnit({levelNumber: 12, id: "12"}),
    new LevelViewUnit({levelNumber: 13, id: "13"}),
    new LevelViewUnit({levelNumber: 14, id: "14"}),
    new LevelViewUnit({levelNumber: 15, id: "15"}),
    new LevelViewUnit({levelNumber: 16, id: "16"}),
    new LevelViewUnit({levelNumber: 17, id: "17"}),
    new LevelViewUnit({levelNumber: 18, id: "18"}),
    new LevelViewUnit({levelNumber: 19, id: "19"}),
    new LevelViewUnit({levelNumber: 20, id: "20"}),
    new LevelViewUnit({levelNumber: 21, id: "21"}),
    new LevelViewUnit({levelNumber: 22, id: "22"}),
    new LevelViewUnit({levelNumber: 23, id: "23"}),
    new LevelViewUnit({levelNumber: 24, id: "24"}),
  ];

let views = [];
for (let i = 0, page = 0; i < LevelViewUnits.length; ++page) {
  views.push(new LevelPage({
    page,
    id    : page,
    levels: LevelViewUnits.slice(i, i + LEVEL_PER_PAGE),
  }));
  i += LEVEL_PER_PAGE;
}

const LevelViews = Immutable.fromJS(views);

const LevelViewData = {
  views() {
    return LevelViews;
  },

  /**
   * Returns the id of the next level to query LevelData. If nothing found
   * (e.g. the end), return null
   * @param {Number} currentLevelId
   */
  nextLevelId(currentLevelId) {
    let currentIndex = LevelViewUnits.findIndex(
      u => u.get("id") === currentLevelId);

    if (currentIndex === -1) {
      return null;
    }

    if (++currentIndex === LevelViewUnits.length) {
      // todo return something else if it's the last level
      return null;
    }

    return LevelViewUnits[currentIndex].get("id");
  }
};

export default LevelViewData;