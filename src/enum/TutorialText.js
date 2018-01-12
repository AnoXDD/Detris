/**
 * Created by Anoxic on 12/31/2017.
 */

const MECHANISM = "Once released, the Detromino will keep falling (moving down), until any further falling will cause any Original (black) blocks above the Detromino in the same column. Then at that position, for each Detromino block, if it is overlapping an Original Block, it will be eliminated with it; otherwise it will be converted to grey Target blocks.";

const TutorialText = {
  TUTORIAL_INTRO             : "Welcome to Detris! Detris is a puzzle game that sounds and looks like Tetris, and in this tutorial, we will go over basic concepts in Detris.",
  TUTORIAL_INTRO_GUIDE_TOGGLE: "This box will guide you throughout the tutorial. You are recommended to click the blue button for a complete tutorial, but you can also go back to previous or skip to the next one using the other two buttons. Additionally, you can bring up this box by clicking the button in the top-right corner. Let's try it!",

  MOVE_DETROMINO_INTRO     : "Great! First, we will learn about movements in Detris. The blue blocks can be controlled by you, and they are called Detromino (as Tetromino in Tetris). Its movement is similar to Tetris, but it will NOT move itself unless told to do so. ",
  MOVE_DETROMINO_LEFT_RIGHT: "Also, unlike in Tetris, Detromino moves in all directions. Let's try to move Detromino to highlighted area by using the control panels below!",
  MOVE_DETROMINO_NO_OVERLAP: "Awesome! When you move Detromino around, it's necessary to know that Detromino can't be placed over other blocks , like black blocks shown above (unless you release it, which will be explained more later). Try to get around it to reach highlighted area again.",
  MOVE_DETROMINO_ROTATE    : "Similar to Tetromino in Tetris, Detromino can also be rotated. Let's rotate and move this Detromino to get it to highlighted area.",

  MECHANISM_INTRO                     : `Amazing! Of course Detris is not simply about moving Detromino around. It's actually about placing Detromino at the right place to eliminate those black blocks (called Original blocks). Here is the mechanism: ${MECHANISM}`,
  MECHANISM_DEMO_INTRO                : "That sounds complicated at first, right? No worries, we will go over two examples here to help you better figure out how exactly this mechanism works.",
  MECHANISM_DEMO_I_INTRO              : `We will use the same Detromino we just used here. Before pressing the blue button below to release it, think about what will happen. (${MECHANISM})`,
  MECHANISM_DEMO_I_FALLING            : `We see that Detromino reaches the top of those black blocks because keeping moving down will have some Original blocks above it. `,
  MECHANISM_DEMO_I_APPLYING           : `Then at that position, since each Detromino block is overlapping an Original block, all Detromino blocks will be eliminated with each overlapped Original block. `,
  MECHANISM_DEMO_I_RESULT             : "And this is will be the final result.",
  MECHANISM_DEMO_T_INTRO              : "Now we will go over another example. This time we will show when Target blocks are generated.",
  MECHANISM_DEMO_T_FALLING            : "This will be the final position of the Detromino.",
  MECHANISM_DEMO_T_FALLING_EXPLANATION: "If the Detromino is to keep falling, there will be one Original block above the Detromino.",
  MECHANISM_DEMO_T_APPLYING           : "And that Original block is overlapped by a Detromino block, and therefore eliminated. For the rest of the blocks, because they are not overlapping other Original blocks, they will be converted to Target (grey) blocks. ",
  MECHANISM_DEMO_T_TARGET_FALLING     : `Target blocks are subject to "gravities," meaning that these Target blocks will also keep falling until they reach the bottom or any Original blocks.`,
  MECHANISM_DEMO_T_TARGET_BLOCKS      : "Like this.",
  MECHANISM_DEMO_T_RESULT             : "And Target blocks will remain what they are, and can also be eliminated by an overlapping Detromino block. ",
  MECHANISM_DEMO_FLOOR_INTRO          : "We will look at a special case - what if the Detromino hits the floor?",
  MECHANISM_DEMO_FLOOR_RESULT         : "The answer is simple - all Detrominos will turn into Target blocks.",
  MECHANISM_DEMO_FREE_PLAY_INTRO      : `Now that we have run over some examples, you will have the chance to explore more of this mechanism on your own. (${MECHANISM})`,
  MECHANISM_DEMO_FREE_PLAY_UNDO_REDO  : "And here are the undo/redo buttons for you in case you need them.",
  MECHANISM_DEMO_FREE_PLAY            : "When you are done exploring, click the info button in the top-right corner to start your first actual game!",

  FIRST_GAME_INTRO: "Congratulations! You are now graduated from the tutorial!",
  FIRST_GAME_START: "For the actual game, the goal will be to eliminate every block presented on the grid. When in doubt, you can always start this tutorial again from the main menu. ",
};

export default TutorialText;