This jam theme was *"It's not a bug, it's a feature."* So, we took it literally: the game presents itself as broken, and the player has to figure out which of its apparent bugs are actually intended mechanics.

*Pocket* inverts the tower-defense relationship. In '*Plants vs. Zombies'*, the player places defenses and the enemies advance. Here, the player is the entity moving through the space, and every object on the board can be picked up and used.

![Pocket concept art](assets/blog-images/pocket-initial-concept.png)

## The pocket itself

'Pocketing' removes a grid entity from the board. When the player places it back, it inherits the rotation of the placement.

That one design element is also represented at the code level with all entities extending from the Pockateble interface. An enemy tower becomes your tower, a "Folder" that acts as an obstacle becomes your shield and an enemy projectile can be caught and thrown back at it.

None of this is revealed directly. It's a property of the placement system, and the player finds it by accident. To push the player to discovery, some of the later levels are near impossible to solve without "breakding" the games mechanics, so to speak.

![Gamebreaking Sample](assets/blog-images/pocket-gif-unsolveable.gif)

## Levels don't have a normal solution

Later game levels are unsolvable if the player follows the rules they're initially given. We try to convince the player that they understand the rules of the game, only to encourage they stumble into our designed "bugs". The cap of carrying 3 entities will feel too low for the player, however, if they read the bug list they will learn they can push past that number.

The game is built around a gamers knack for finding exploits or alternative ways to solve problems. To encourage this discovery, we gave them a bug list and impossible levels.

## The bug list

The game ships with a list formatted like an internal QA document:

> **LIST OF ~~BUGS~~ FEATURES (SPOILERS)**
>
> - Player is able to Pocket items beyond the Max cap of 3 — **HIGH SEVERITY**
> - Player is able to Pocket Grid Entities — **HIGH SEVERITY**
> - Microchip normals are inverted — **LOW SEVERITY**
> - Pocketed item's health is reset — **LOW SEVERITY (BOTW Reference)**
> - **THERE'S A SPIDER IN THE GAME — GAMEBREAKING**

Some entries are jokes and references to other famous bugs. Some point toward real mechanics. The framing puts the player in the position of a hacker trying to exploit bugs, which changes how they approach every level once they decide to read the list.

![Gameplay grid](assets/blog-images/pocket-play-grid.png)

## The theme as the game

Jam games frequently treat the theme as a title-screen wink - a reference in the name, then business as usual. In *Pocket* we wanted all the gameplay mechanics to be bugs found in code. The bug list is the tutorial. The player's role is not to learn the rules but to test them.
