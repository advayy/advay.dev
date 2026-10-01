Well not exactly impossible but odds of 1 in 409,600 are at the least *improbable*. In this post I aim to describe my process in trying to make these odds significantly more likely, and how a dev decision made the unlikely possible. This post gets a little bit technical and down in the weeds of RNG manipulation but I’ll try my best to only highlight the key elements of it.

### Background

In the Pokémon games Scarlet and Violet (SV), a new evolution was released for the much beloved Pokémon Dunsparce. This new form was a bit of a meme, as all the design added was one more body segment, moreover, they gave it a rarer version of this with one more added segment, referred to as the 3-segment form. As you can imagine, this caused a lot of uproar with some people disappointed and others absolutely loving this new evolution. I fall into the latter category, and wanted to catch a **shiny** version. Shinies in Pokémon are a 1-in-4096 color variant that have no difference to their regular colored counterparts whatsoever.

![Dunsparce Evolution](/assets/blog-images/dudunsparce-evo-chart.jpeg)

The odds for a shiny 3-segment Dudunsparce are  **1 in 409,600** . I bring the odds of a shiny down to about  **1 in 8** , and the odds of a shiny Hardy Dunsparce — which will evolve into a 3-segment Dudunsparce — down to about  **1 in 38.** 

***That’s an improvement from roughly 0.000244% (1 in 409,600) to about 2.63% (1 in 38), or about 10,779× more likely.***

The components of this sharp bump in probability are the **Cute Charm Glitch** and the **Developer Decision**

### Why does this matter?

In a way, it doesn't, these games are very old and the Poké Transporter will eventually no longer be supported. On the other hand, I think this shows us the complexity of the systems that run in the background, and how in unforeseen edge cases, we are able to discover something truly fascinating. What may seem like a small decision to make as a developer, can end up having a profound impact to the way a game is experienced years down the line. A decision the developers made before 2013, ended up simplifying the daunting shiny hunt for a Pokémon released nearly 10 years later. This method was discovered in the UBC computer science undergraduate labs with my colleague Charlie, eagerly chatting by a whiteboard, and the discovery filled me with so much excitement that I had to hunt it for myself.

### The Cute Charm Glitch

In the Generation 4 games (Diamond, Pearl, Platinum, HeartGold, SoulSilver), if you were able to set up your save file in a *VERY* specific way, you would be able to reduce your odds of shiny encounters from 1 in 8,192 to roughly 1 in 5 (about 20%).

Pokémon with the Cute Charm ability force a 66.7% chance that any wild encounter will be of the opposite gender. To force this gender ratio, the game restricts the opposing Pokémon's Personality Value (PID) to one of 25 specific preset values. Under normal circumstances, a Pokémon's Personality Value (PID) is a 32-bit integer. This means there are 2^32, or exactly 4,294,967,296 possible PID combinations. When the Cute Charm ability activates (which happens 66.7% of the time), it completely bypasses the standard 4.3-billion random PID permutations. Instead, the game's code defaults to a pool of only 25 fixed PID values (one for each Nature) to force the correct gender ratio. **This reduces the problem space of what PID you can get by roughly 171.8 million times.**

A Pokémon is shiny if your public Trainer ID (TID) and hidden Secret ID (SID) combine to match the generated PID value. So if you control your TID and SID through frame timing when setting up your save file to match one of these 25 IDs, your odds of a regular shiny encounter go up to 20% - this is just the effect of the cute charm glitch. 

### The Developer Decision

In the newer games (Gen 6 onward), Pokémon have a separate Encryption Constant (EC) in addition to their Personality Value (PID). On December 25th 2013, Pokémon released the Poké Transporter in Japan. It is a software that allowed you to move Pokémon from older generation games to their next generation. The key piece of the puzzle here was that Pokémon transferred to Generation VI via Poké Transporter **will have an encryption constant that is equal to its Personality Value**. An Encryption constant isn't re-generated and since I can control the Personality Value, I can control the Dunsparce! To get a 3-segment Dudunsparce, you need an encryption constant that is divisible by 100. i.e., division by 100 gives you a remainder of 0.


**For Dunsparce originating from Gen 6 Onwards:** 3-segment form is possible when

```
Encryption_Constant modulo 100 = 0
```

**For Dunsparce originating from Pre-Gen 6:** 3-segment form when

```
PID modulo 100 = 0
```

### Putting it all together

When you set up an RNG Cute Charm manipulation, you get to pick a group of natures to target based on a gender ratio and the gender of a Cute Charm lead Pokémon. I would check out any RNG tutorial if you want more detailed setup information. But essentially there is **only one** Group of PIDs you can target to get a PID that satisfies the ***PID mod 100 = 0*** equation for this case. There is a PID at 200 for other conditions based on properties like gender ratio, but that would only work for a handful of Pokémon that don't have this 1-in-100 rarity of form.

You would need a **Group 1** PID with a **Male Lead** which includes the **Hardy** **nature**. Hardy nature Pokémon get the PID 00000000, which satisfies our equation. This means if your game is set up correctly, you can guarantee that all Dunsparce that are shiny (due to cute charm) and have the Hardy nature will evolve into a 3-segment Dudunsparce when transferred to a compatible game.

![Hardy Dunsparce](/assets/blog-images/dudunsparce-hgss.png)

### **The "Easy" Method?**

Now, this is a bit of an elaborate way to get your shiny 3-segment Dudunsparce, however, it's less tedious than running around shiny hunting and much faster. First, I already knew how to RNG a save file for the Cute Charm glitch, so that part took me under an hour. Furthermore, I love the Gen 2 remakes, and I don’t mind replaying it. I wanted my shiny in a “Love Ball”, and since it's in the older games I can stack on ribbons from the other games. You could also use these findings to try encounter a shiny Pokémon with a PID that satisfies your equation, but I like having a save file where shinies are so abundant.


![Dudunsparce Proof](/assets/blog-images/dudunsparce-proof-sv.png)



#### A quick Step by Step Overview

1. (Optional but recommended) If you have two DS consoles and two games, catch a male Pokémon with Cute Charm and trade it to your other game. Jigglypuff from HGSS, or Cleffa/Lopunny from DPPt should also work. If you don't do this you have to play past the League to get a Cute Charm Pokémon (I believe).
2. Follow any Cute Charm glitch tutorial, when you have to select a nature, select a nature from Group 1 (I chose 00000000 but that's not necessary).
3. Complete the first Gym and the Team Rocket Slowpoke Well storyline.
4. After your game has been set up, trade over your Cute Charm Pokémon, and then you can hunt for Dunsparce in the Dark Cave by using Rock Smash.
