/**
 * Created by Anoxic on 1/10/2018.
 *
 * A helper file to determine the state of history
 */

import store from "../store/store";

/**
 * Returns if the grid can be undone in the actual game
 */
export function canUndoInGame() {
  return store.getState().gamePanel.past.length;
}

/**
 * See comments in canUndoInGame
 */
export function canRedoInGame() {
  return store.getState().gamePanel.future.length;
}

/**
 * Returns if the grid can be undone in the actual level editor
 */
export function canUndoInEditor() {
  return store.getState().levelEditorPanel.past.length;
}

/**
 * See comments in canUndoInEditor
 */
export function canRedoInEditor() {
  return store.getState().levelEditorPanel.future.length;
}

export default {
  canRedoInGame,
  canUndoInGame,
  canRedoInEditor,
  canUndoInEditor,
};
