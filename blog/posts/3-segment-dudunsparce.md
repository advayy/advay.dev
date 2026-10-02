Well not exactly impossible but odds of 1 in 409,600 are at the least *improbable*. In this post I aim to describe my process in trying to make these odds significantly more likely, and how a dev decision made the unlikely possible. This post gets a little bit technical and down in the weeds of RNG manipulation but I’ll try my best to only highlight the key elements of it.

## Background

In the Pokémon games Scarlet and Violet (SV), a new evolution was released for the much beloved Pokémon Dunsparce. This new form was a bit of a meme, as all the design added was one more body segment, moreover, they gave it a rarer version of this with one more added segment, referred to as the 3-segment form. As you can imagine, this caused a lot of uproar with some people disappointed and others absolutely loving this new evolution. I fall into the latter category, and wanted to catch a **shiny** version. Shinies in Pokémon are a 1-in-4096 color variant that have no difference to their regular colored counterparts whatsoever.

![Dunsparce Evolution](/assets/blog-images/dudunsparce-evo-chart.jpeg)

The odds for a shiny 3-segment Dudunsparce are  **1 in 409,600**. I bring the odds of a shiny down to about  **1 in 8**, and the odds of a shiny Hardy Dunsparce — which will evolve into a 3-segment Dudunsparce — down to about  **1 in 38.**

***That’s an improvement from roughly 0.000244% (1 in 409,600) to about 2.63% (1 in 38), or about 10,779× more likely.***

The components of this sharp bump in probability are the **Cute Charm Glitch** and the **Developer Decision**

### Why does this matter?

In a way, it doesn't, these games are very old and the Poké Transporter will eventually no longer be supported. On the other hand, I think this shows us the complexity of the systems that run in the background, and how in unforeseen edge cases, we are able to discover something truly fascinating. What may seem like a small decision to make as a developer, can end up having a profound impact to the way a game is experienced years down the line. A decision the developers made before 2013, ended up simplifying the daunting shiny hunt for a Pokémon released nearly 10 years later. While the Cute Charm glitch is a well known exploit, this method uses it and some conditions to get a shiny 3-segment Dudunsparce.

### The Cute Charm Glitch

In the Generation 4 games (Diamond, Pearl, Platinum, HeartGold, SoulSilver), if you were able to set up your save file in a *VERY* specific way, you would be able to reduce your odds of shiny encounters from 1 in 8,192 to roughly 1 in 5 (about 20%). If you's like to do this yourself, a great resource would be the same video I used to get into RNG manipulation [by I&#39;m a Blissey](https://www.youtube.com/watch?v=aHfVnqkmmUw). For a more detailed guide check out [Smogon](https://www.smogon.com/ingame/rng/dpphgss_rng_part5)'s RNG Manipulation Guide, or check out [PaPaSea&#39;s video](https://www.youtube.com/watch?v=iMt-jD7JXXk) on the topic.

Pokémon with the Cute Charm ability have a 66.7% chance to force that any wild encounter will be of the opposite gender. To force this gender ratio, the game restricts the opposing Pokémon's Personality Value (PID) to one of 25 specific preset values. Under normal circumstances, a Pokémon's Personality Value (PID) is a 32-bit integer. This means there are 2^32, or exactly 4,294,967,296 possible PID combinations. When the Cute Charm ability activates (which happens 66.7% of the time), it completely bypasses the standard 4.3-billion random PID permutations. Instead, the game's code defaults to a pool of only 25 fixed PID values (one for each Nature) to force the correct gender ratio. **This reduces the problem space by a factor of roughly 171.8 million.**

Roughly speaking a Pokémon is shiny if the result of the XOR of the Trainer ID (TID) and Secret ID (SID) and the PID falls below 8. So if you control your TID and SID through frame timing when setting up your save file to match one of these 25 PIDs, your odds of a regular shiny encounter go up to 20% - this is just the effect of the cute charm glitch. 

### The Developer Decision

In the newer games (Gen 6 onward), Pokémon have a separate Encryption Constant (EC) in addition to their Personality Value (PID). On December 25th 2013, Pokémon released the Poké Transporter in Japan. It is a software that allowed you to move Pokémon from older generation games to their next generation. The key piece of the puzzle here was that Pokémon transferred to Generation VI via Poké Transporter **will have an EC that is equal to its Personality Value**. An EC isn't regenerated and since I can control the Personality Value, I can control the Dunsparce! To get a 3-segment Dudunsparce, you need an EC that is divisible by 100. i.e., division by 100 gives you a remainder of 0.

**For Dunsparce originating from Gen 6 Onward:** 3-segment form is possible when

```
Encryption_Constant modulo 100 = 0
```

**For Dunsparce originating from Pre-Gen 6:** 3-segment form occurs when

```
PID modulo 100 = 0
```

## Putting it all together

When you set up an RNG Cute Charm manipulation, you get to pick a group of natures to target based on a gender ratio and the gender of a Cute Charm lead Pokémon. I would check out any RNG tutorial if you want more detailed setup information. But essentially there is **only one** Group of PIDs you can target to get a PID that satisfies the ***PID mod 100 = 0*** equation for this case. There is a PID at 200 for other conditions based on properties like gender ratio, but that would only work for a handful of Pokémon that don't have this 1-in-100 rarity of form.

You would need a **Group 1** PID with a **Male Lead** which includes the **Hardy** **nature**. Hardy nature Pokémon get the PID 00000000, which satisfies our equation. This means assuming your game is set up correctly and the EC is preserved through the transfer chain, you can guarantee that all Dunsparce that are shiny (due to cute charm) and have the Hardy nature will evolve into a 3-segment Dudunsparce when transferred to a compatible game.

This method ends up beind significantly faster than catching several shiny Dunsparce in Scarlet and Violet, evolving to see if they're 3-Segment and resetting if they're not.

![Hardy Dunsparce](/assets/blog-images/dudunsparce-hgss.png)

## In Conclusion

This is the serendipity: a compatibility decision made in 2013, years before Dudunsparce existed, accidentally preserved the exact value that would later determine its form. RNG manipulation gave us control over that value, the developer decision carried it forward and Dudunsparce gave it new meaning.

---

## The Math

Here’s the step-by-step breakdown behind the odds.

**Base odds for a shiny 3-segment Dudunsparce:**

* Shiny rate: 1 in 4,096
* 3-segment rate: 1 in 100
* Combined: **1/4096 × 1/100 = 1/409,600 ≈ 0.000244%**

**Cute Charm Glitch shiny rate:**

* Cute Charm activates: **2/3** of encounters (66.7%)
* When active, shiny chance: **1/5** (20%)
* The non-activation shiny chance is **1/8192**, which is negligible here.
* Overall shiny rate: **(2/3) × (1/5) = 2/15 ≈ 13.33% ≈ 1 in 7.5**, rounded to **1 in 8**

**Shiny Hardy Dunsparce rate:**

* Hardy nature: **1/25**
* Hardy is in the targeted Cute Charm PID group, so whenever Hardy appears, it is shiny.
* Overall**: (2/3) × (1/25) = 2/75 ≈ 2.67% ≈ 1 in 37.5,** rounded to **1 in 38**

**Improvement:**

* **409,600/38 ≈ 10,779**
* As percentages: **0.000244% → 2.63%**
* So the hunt becomes roughly **10,779× more likely**

**Problem space reduction from Cute Charm:**

* Standard PID space: **2^32 = 4,294,967,296**
* Cute Charm restricted PID space: 25
* Reduction factor: 4,294,967,296/25 = 171,798,691.84 ≈ 171.8 million times smaller

The **1 in 8** is the overall shiny rate. The **1 in 38** is the rate for a shiny Hardy Dunsparce, which is the one that evolves into 3-segment Dudunsparce.

---

### What You'll Need To Do it Yourself

- **Games:** Generation 4 game (for dunsparce I recommend HGSS) — HeartGold, SoulSilver, Diamond, Pearl, or Platinum.
- **Consoles:** Ideally two DS or 3DS systems if you want to trade in a Cute Charm lead early. One system works, but you'll have to wait until later in the game to obtain a Cute Charm Pokémon.
- **Cute Charm Pokémon:** Jigglypuff, Cleffa, Lopunny, or any other Pokémon with the Cute Charm ability.
- **RNG tools:** The tools and guides you used for the Cute Charm glitch setup (RNG Reporter, EonTimer, PokéFinder, [RNG-Timer (Online)](https://not-an-aardvark.github.io/rng-timer/)), or equivalent).
- **Transfer chain:** Access to the full transfer path: Gen 4 → Gen 5 → Poké Transporter → Pokémon Bank → Pokémon HOME → Scarlet/Violet.
- **Target:** Dunsparce in Dark Cave via Rock Smash.

### A quick Step by Step Overview

1. (Optional but recommended) If you have two DS consoles and two games, catch a male Pokémon with Cute Charm and trade it to your other game. Jigglypuff from HGSS or Cleffa/Lopunny from DPPt should also work. If you don't do this you have to play past the League to get a Cute Charm Pokémon.
2. Follow any Cute Charm glitch tutorial ([I used this one](https://www.youtube.com/watch?v=aHfVnqkmmUw)). When you have to select a nature, select Hardy (PID 00000000). That’s the nature that satisfies PID mod 100 = 0 for Dunsparce
3. Complete the first Gym and the Team Rocket Slowpoke Well storyline.
4. After your game has been set up, trade over your Cute Charm Pokémon, and then you can hunt for Dunsparce in the Dark Cave by using Rock Smash. Only the shiny Hardy females are the ones that will evolve into 3-segment Dudunsparce

After setting up the save file, I hunted in Dark Cave until I found a shiny Hardy Dunsparce. I transferred it up to Scarlet, evolved it, and confirmed the 3-segment form.

![Dudunsparce Proof](/assets/blog-images/dudunsparce-proof-sv.png)

### Glossary

- **PID** — Personality Value. A 32-bit integer that determines a Pokémon's nature, gender, shininess, and other attributes.
- **EC** — Encryption Constant. A separate 32-bit value introduced in Gen 6. For Pokémon transferred via Poké Transporter, the EC is set equal to the PID.
- **TID** — Trainer ID. The public ID number shown on your trainer card.
- **SID** — Secret ID. A hidden ID number used in shiny calculations.
- **RNG** — Random Number Generation. The underlying system that determines wild encounters, stats, and shininess.
