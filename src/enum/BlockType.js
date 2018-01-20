/**
 * Created by Anoxic on 9/22/2017.
 */

const BlockType = {
  NONE            : "none", // air
  DETROMINO       : "detromino", // The detromino controlled by the player
  DETROMINO_TARGET: "detromino-target", // Used in level editor to represent
                                        // the blocks that match the blocks to
                                        // be dropped from the detromino being
                                        // placed

  TARGET  : "target", // The blocks to be eliminated, introduced by detromino
  STALE   : "stale", // The blocks to be disappeared
  ORIGINAL: "original", // The original blocks to be eliminated

  HIGHLIGHT     : "highlight", // opaque block to guide the player, used in
                               // tutorial
  BLINKING      : "blinking", // shining block for higher attention
  BLINKING_BLACK: "blinking-black", // shining block for higher attention
};

export default BlockType;