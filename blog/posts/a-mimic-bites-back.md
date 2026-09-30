A stealth game built during the Quiver Game Incubator: five weeks and 4 people. I worked on the project as a game designer and programmer, handling design, gameplay systems and AI.

We started with a one-sentence design brief: **make a stealth game where the player feels clever because they understand the enemy, not because they have a strong attack.** This objective drove every subsequent decision.

![Design pillars](assets/blog-images/mimic-game-pillars.png)

## The backstab as the solution

The primary way to kill an enemy is to approach from behind and bite it. Everything else in the system exists to support or compete with that action.

This meant the game had to make three things true at once:

1. The player must know where they can safely approach from
2. Positioning behind an enemy requires active choice, not idling patience
3. The alternative (fighting head-on) has to be possible but costly


## Health and ammunition are the same resource

As a chest, the player has one resource: coins.

- Baiting costs **1 coin**
- Shooting costs **5 coins**

Shooting is the safe option. It ends the encounter without requiring positioning, timing, or risk. It also costs five times the amount of the resource that keeps the player alive.

The back-bite is nearly free but requires attention and risk, while shooting is reliable but expensive.

In this design, every encounter asks a version of the same question - spend the coin now, or spend thirty seconds getting behind this thing? The player answers it differently depending on how well they can handle that room.

Two resources would have created two separate questions. One resource creates a binary that has to be answered every fight.

## Fields of view visible

Enemy sight FOVs render on-screen in real time. The player can see exactly where every enemy is looking, from any angle.

Stealth becoming a spatial problem with visible rules is what makes our backstab a solvable problem rather than a guess. The player can read the vision cone, plan a route around it, and commit to the approach.

![FOV visualization](assets/blog-images/mimic-fov-detection.png)

It also makes baiting possible at all. Baiting requires the player to predict where an enemy will move and when they'll look away. Without a visible FOV, that prediction isn't something the player can make - and the mechanic stops working.

## Baiting - repositioning with real risk

The player throws a coin to create a sound. Enemies investigate.

Baiting moves the enemy's attention towards the coin, which opens routes the player may not have been able to take before. Baiting does not come without risk however, first theres an HP cost, anf furthermore the enemy can fail to investigate if the coin lands too far away allowing them to turn back unpredictably.

To progress, the player still has to commit a risk: throw the coin, move immediately, and hope the path is clear before the enemy's attention returns.

## Environmental communication

*A Mimic Bites Back* is our initiating double entendre: a mimic is a monster that notorously gets attacked as adventurers look for loot, in this game the mimit gets to fight back.

Enemies are built from cardboard. Their fronts are painted. Their backs expose the corrugated texture underneath - biting them here does critical damage and thus you're fighting back by biting backs.

When the player circles behind an enemy and sees the raw seam, the model tells them *this side is weak* before we even need to communicate explicitly what they need to do.

![Initial sketches](assets/blog-images/mimi-initial-sketches.png)

The visual also services the game's tone. A cardboard enemy reads as disposable, a contrast to how monsters in dungeon crawlers are often depicted.

## Enemy archetypes

All the enemy archetypes share a same core antagonizing mechanism but produce different spatial problems for the player.

- **Knights** are fast with a tight damage area. They close distance quickly, which means the player has less time to reposition once they're noticed.
- **Strikers** are slower with a wider damage arc. They telegraph longer, but a single hit takes more health, so the bait timing matters more.
- **Archers** have long sight lines and attack from range. Their vision extends much further than a melee enemy's, which means the player has to approach from an angle the archer isn't covering.

Identical attacking rules with differing capabilities allow for a steady increase in different problems.

![Enemy AI framework](assets/blog-images/mimic-enemy-ai-design.png)

## The AI system

I built a behavior-tree framework with hierarchical state machines for transitions, FOV raycasting for perception, and NavMesh for navigation.

The point of the framework was iteration speed. Once the archetypes were parameterized - speed, damage area, FOV size, transition thresholds - the encounter designer could build a full room without waiting on engineering. In practice, the last two weeks of development moved faster than the first two because nothing was blocked.

## How the systems combine

The player chains together the systems:

*What can I see?*
*Where is the enemy looking?*
*Where can I bait them?*
*Can I get behind them before they turn back?*
*Is it worth the coin to shoot instead?*

No single mechanic carries any encounter: four or five simple systems always combine into a solution the player builds themselves. At this standard, the player should feel like they learned the room, not like the game handed them a solution.
