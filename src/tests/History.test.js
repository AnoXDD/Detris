/**
 * Created by Anoxic on 10/18/2017.
 */

import History from "../data/History";

test("Initial state", () => {
  let h = new History();

  expect(h.isPastChangesEmpty()).toBeTruthy();
  expect(h.isFutureChangesEmpty()).toBeTruthy();

  expect(h.undo()).toBeNull();
  expect(h.redo()).toBeNull();
});

test("Record one single data", () => {
  let h = new History();

  h.record(1);

  expect(h.isPastChangesEmpty()).toBeTruthy();
  expect(h.isFutureChangesEmpty()).toBeTruthy();

  expect(h.undo()).toBeNull();
  expect(h.redo()).toBeNull();
});

test("Record two data", () => {
  let h = new History();

  h.record(1);
  h.record(2);

  expect(h.isPastChangesEmpty()).toBeFalsy();
  expect(h.isFutureChangesEmpty()).toBeTruthy();

  expect(h.undo()).toBe(1);
  expect(h.undo()).toBeNull();
  expect(h.isPastChangesEmpty()).toBeTruthy();
  expect(h.isFutureChangesEmpty()).toBeFalsy();

  expect(h.redo()).toBe(2);
  expect(h.redo()).toBeNull();
  expect(h.isPastChangesEmpty()).toBeFalsy();
  expect(h.isFutureChangesEmpty()).toBeTruthy();
});

test("Record three data", () => {
  let h = new History();

  h.record(1);
  h.record(2);
  h.record(3);

  expect(h.redo()).toBeNull();

  expect(h.undo()).toBe(2);
  expect(h.redo()).toBe(3);
  expect(h.undo()).toBe(2);
  expect(h.undo()).toBe(1);
  expect(h.undo()).toBeNull();
  expect(h.redo()).toBe(2);
  expect(h.redo()).toBe(3);
  expect(h.redo()).toBeNull();
});

test("Record wipes out future changes", () => {
  let h = new History();

  h.record(1);
  h.record(1);
  h.record(1);
  h.record(1);
  h.record(1);

  h.undo();
  h.undo();
  h.undo();
  h.undo();

  expect(h.isPastChangesEmpty()).toBeTruthy();

  expect(h.isFutureChangesEmpty()).toBeFalsy();
  h.record(2);
  expect(h.isFutureChangesEmpty()).toBeTruthy();
});

test("Record in the middle of undo", () => {
  let h = new History();

  h.record(1);
  h.record(2);
  h.record(3);

  expect(h.undo()).toBe(2);
  h.record(4);
  expect(h.redo()).toBeNull();
  expect(h.undo()).toBe(2);
  expect(h.redo()).toBe(4);
});

test("Record in the middle of undo (multiple times)", () => {
  let h = new History();

  h.record(1);
  h.record(2);
  h.record(3);

  expect(h.undo()).toBe(2);

  h.record(4);
  expect(h.redo()).toBeNull();
  expect(h.undo()).toBe(2);

  h.record(5);
  expect(h.redo()).toBeNull();
  expect(h.undo()).toBe(2);
  expect(h.redo()).toBe(5);
});

test("Reset", () => {
  let h = new History();

  h.record(1);
  h.record(2);
  h.record(3);

  h.undo();

  h.reset();

  expect(h.isPastChangesEmpty()).toBeTruthy();
  expect(h.isFutureChangesEmpty()).toBeTruthy();

  expect(h.undo()).toBeNull();
  expect(h.redo()).toBeNull();
});