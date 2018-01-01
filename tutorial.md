This is a temporary todo list of things to be implemented in the tutorial

# Notification

Notification (info) can be hidden on the left side to unblock the view

- [ ] Auto hide after a while
- [ ] Handle to bring it up

# Tutorials

1. Basic introduction
2. Move detromino
    * From left to right
    * Move over object (and explain they can't overlap)
    * Introduce rotate
3. Mechanism (how blocks cancel out)
    * Display text information to explain
    * Demonstration: for each bullet point below, do not allow user to control the detromino, but actually show how they cancel out 
        * Flat "I" block on flat blocks
        * Upward "T" on left over of step above
            * Explain why a block can't be eliminated
            * Explain what happens to those blocks (fall down)
        * Explain it will remain what it is if the detromino hits the floor
        * Explain target blocks are treated the same as original blocks
    * Resume full control. Allow players to play around
4. Undo/redo
    * After one operation above, show the player they have the options to redo
5. Start first level
    * Explain the goal of the game, and there are multiple levels
    * Do not allow player to move the detromino (reason explained below)
    * When the player finishes, explain why a gold star is rewarded (for without using any redo/undo)
    