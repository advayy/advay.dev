A one-week project built for the Little Guy Game Jam. The entire level spirals around one large tree trunk. I worked on level design, writing and gameplay programming.

Two assumptions that 3D platformers usually get would not work in our game: that the ground is roughly flat, and that the player can see where they're going. Both had to be solved differently.

![The tree world](assets/blog-images/embark-tree-world.png)

## The camera does level-design work

Wrapping the world around a trunk means the player loses track of how areas connect. They see nearby ledges and branching paths, however with no way to descern the right path ahead players can lose progress and become frustrated. The curvature of the tree makes mentally mapping the space significantly harder - furthermore, the player isnt able to experience the grandioseness of their journey, the path they have covered and that ahead. To deal with this we let the player pause and freely orbit the map.

![Pause Camera Mechanic](assets/blog-images/embark-pause-feat.png)

The feature reads as a photo mode, but what it actually does is hand the player the full awareness of the area, so that their focus can shift to platforming and not guessing the correct path ahead. And because the player can now study the space, we could design routes that required studying.

## Abilities open routes, they don't gate progress

Progression runs on two abilities: moss climbing and gliding. Both are given at the end of an area, and both unlock easter-egg routes that were placed earlier in the level - while these werent essential to the main story, they completed the ends of poems and jokes which related to the theme of the game.

![Hook unlock](assets/blog-images/embark-hook-unlock.png)

A platform the player can't reach in the first minute becomes a "wait, I remember this" moment fifteen minutes later. Gating with sight rather than ability transforms backtracking into recognition.

## Tools for curved geometry

Placing platforms against a curved surface by hand is slow. Each platform has to sit flush against the trunk, and the trunk is always curving away from the camera. Positioning one platform correctly takes about a minute; fifty would take hours we didn't have in a seven-day jam. So I wrote an editor tool that places platforms relative to the tree's surface normal. The platform snaps to the curve wherever it's dropped.

![Platform placement tool](assets/blog-images/embark-platform-tool.png)

Platform inconsistencies would only drive player frustration with the game, therefore a placement tool would make the process of iterating on the game design significantly easier and more consistent.

The tool isn't a technical feature for its own sake. It's the difference between three level iterations and thirty, and on a jam project, iterations-per-hour is the only metric that matters.

![Greybox with design notes](assets/blog-images/GreyBox-tree-with-notes.png)

## What the deadline proved

Making a small, but dedicated experience required that we squeeze several design iterations into a short period of time. Building systems that worked together to support a small story felt achievable. The camera, geometry and traversal abilities all worked to take the player on a small journey. Solving these together is what makes a platformer feel like a place the player gradually understands rather than a sequence of jumps. That was the design intent going in. *Embark* was the seven-day proof that it holds up under a tight deadline.
