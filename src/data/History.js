/**
 * Created by Anoxic on 10/18/2017.
 *
 * A generic class to hold history
 */

import Immutable from "immutable";

/**
 * A two-state object, because an object can be `undefined`
 */
class HistoryObject {
  isUndefined = true;
  data = undefined;

  constructor(data) {
    if (!arguments.length) {
      return;
    }

    this.set(data);
  }

  undefined() {
    return this.isUndefined;
  }

  get() {
    return this.isUndefined ? undefined : this.data;
  }

  set(data) {
    this.data = data;
    this.isUndefined = false;
  }

  reset() {
    this.data = undefined;
    this.isUndefined = true;
  }
}

export default class History {
  // The elements in it are raw data, not HistoryObject
  pastChanges = Immutable.List();
  // The elements in it are raw data, not HistoryObject
  futureChanges = Immutable.List();

  currentData = new HistoryObject();

  isPastChangesEmpty() {
    return this.pastChanges.isEmpty();
  }

  isFutureChangesEmpty() {
    return this.futureChanges.isEmpty();
  }

  /**
   * Records a new history
   * @param data
   */
  record(data) {
    // Clear future changes
    this.clearFutureChanges();

    // Record changes
    if (!this.currentData.undefined()) {
      this.pastChanges = this.pastChanges.push(this.currentData.get());
    }

    // Record current data
    this.currentData = new HistoryObject(data);
  }

  /**
   * Returns the latest change (if any), or null
   */
  undo() {
    if (this.isPastChangesEmpty()) {
      return null;
    }

    // Store in the future. Since past changes is not empty, this.currentData
    // must be valid
    this.futureChanges = this.futureChanges.push(this.currentData.get());

    // Read undo data
    this.currentData = new HistoryObject(this.pastChanges.last());

    // Modify past changes
    this.pastChanges = this.pastChanges.pop();

    return this.currentData.get();
  }

  /**
   * Returns the future change (if any), or null
   */
  redo() {
    if (this.isFutureChangesEmpty()) {
      return null;
    }

    // Store in the past. Since future changes is not empty, this.currentData
    // must be valid
    this.pastChanges = this.pastChanges.push(this.currentData.get());

    // Read redo data
    this.currentData = new HistoryObject(this.futureChanges.last());

    // Modify future changes
    this.futureChanges = this.futureChanges.pop();

    return this.currentData.get();
  }

  /**
   * Resets this class
   */
  reset() {
    this.clearPastChanges();
    this.clearFutureChanges();
    this.currentData = new HistoryObject();
  }

  clearPastChanges() {
    this.pastChanges = this.pastChanges.clear();
  }

  clearFutureChanges() {
    this.futureChanges = this.futureChanges.clear();
  }
}
