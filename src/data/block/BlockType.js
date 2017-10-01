/**
 * Created by Anoxic on 9/22/2017.
 */

const BlockType = {
  NONE     : "none", // air
  DETROMINO: "detromino", // The detromino controlled by the player
  // FLOATING : "floating", // The blocks just released by the player
  TARGET   : "target", // The blocks to be eliminated
  STALE    : "stale", // The blocks to be disappeared
};

export default BlockType;