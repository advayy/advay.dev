This jam theme was *"It's not a bug, it's a feature."* So, we took it literally: the game presents itself as broken, and the player has to figure out which of its apparent bugs are actually intended mechanics.

*Pocket* inverts the tower-defense relationship. In '*Plants vs. Zombies'*, the player places defenses and the enemies advance. Here, the player is the entity moving through the space, and every object on the board can be picked up and used.

![Pocket concept art](assets/blog-images/pocket-initial-concept.png)

## Levels don't have a normal solution

The levels are unsolvable if the player follows the rules they're initially given. You hit a wall, try something that looks like an exploit, and discover the wall isn't a wall.

That two-stage realization - *"I'm stuck." then "Wait, can I do this?"* - is what the design is built around. If we told the player the answer, the reaction wouldn't happen. So instead of a tutorial, the game presents its unusual behaviors as a fake bug tracker.

## The bug list

The game ships with a list formatted like an internal QA document:

> **LIST OF ~~BUGS~~ FEATURES (SPOILERS)**
>
> - Player is able to Pocket items beyond the Max cap of 3 — **HIGH SEVERITY**
> - Player is able to Pocket Grid Entities — **HIGH SEVERITY**
> - Microchip normals are inverted — **LOW SEVERITY**
> - Pocketed item's health is reset — **LOW SEVERITY (BOTW Reference)**
> - **THERE'S A SPIDER IN THE GAME — GAMEBREAKING**

Some entries are jokes. Some point toward real mechanics. The framing puts the player in the position of someone finding exploits rather than someone being taught how the game works, which changes how they approach every level afterward - they start looking for whatever the game isn't telling them.

![Gameplay grid](assets/blog-images/pocket-play-grid.png)

## The pocket itself

'Pocketing' removes a grid entity from the board. When the player places it back, it inherits the rotation of the placement.

That one rule spans the whole game. An enemy tower becomes your tower. A "Folder" that acts as an obstacle becomes your shield. An enemy projectile can be caught and thrown back at it. Pocket something, and return it as your own entity.

None of this is surfaced directly. It's a property of the placement system, and the player finds it by accident - usually while trying to solve a level that shouldn't be solvable. To push the player to discovery, some of the later levels are near impossible to solve without "breakding" the games mechanics, so to speak.

![Gamebreaking Sample](assets/blog-images/pocket-gif-unsolveable.gif)

## The theme as the game

Jam games frequently treat the theme as a title-screen wink - a reference in the name, then business as usual. *Pocket* seeks to line the entire experience. The apparent bugs are the mechanics. The bug list is the tutorial. The player's role is not to learn the rules but to test them.
