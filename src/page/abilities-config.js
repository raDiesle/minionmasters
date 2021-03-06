export const ABILITIES_CONFIG = [
  {
    category: "GENERAL",
    display: "General",
    terms: [
      {
        key: "RageBuff",
        display: "Rage",
        description: "+50% attack damage.",
        isBuff: true,
      },
      // Haste
      {
        key: "FrenzyBuff",
        display: "Frenzy, Haste",
        description: "+33% Movement speed. +33% Attack speed. Removes Slow.",
        isBuff: true,
      },
      {
        key: "Stuns",
        display: "Stun",
        description: `Stunned Units are unable to move or attack.`,
        isBuff: false,
      },
      {
        key: "StunBuff",
        display: "Stun",
        description: "Stunned Units are unable to move or attack.",
        isBuff: false,
      },
      {
        key: "SingleShieldBuff",
        display: "Shield",
        description: "Blocks all damage from the next damage source.",
        isBuff: true,
      },

      {
        key: "Taunt",
        display: "Taunt",
        description: `All nearby Enemies will target this Minion. Radius 5.`,
        isBuff: true,
      },
      {
        key: "TauntBuff",
        display: "Taunt",
        description: "All nearby Enemies will target this Minion. Radius: 5",
        isBuff: true,
      },
      {
        key: "Poison",
        display: "Poison",
        description: `Deals damage over time to a Minion`,
        isBuff: false,
      },

      {
        key: "PoisonBuff",
        display: "Poison",
        description: "Deals damage over time to a Minion. Cooldown: 0,5. Damage: 10",
        isBuff: false,
      },
      {
        key: "Marksmanship",
        display: "Marksmanship",
        description: "+2 range",
        isBuff: true,
      },
      {
        key: "RushBuff",
        display: "Rush",
        description: "Starts acting immediately after being summoned.",
        isBuff: true,
      },
      {
        key: "DestroyBuff",
        display: "Destroy",
        description: "Kill a Unit. If it is Mythic, deal  50% of their Maximum Health instead.",
        isBuff: false,
      },
      {
        key: "StealthBuff",
        display: "Stealth",
        description: "Becomes invisible while not attacking or taking damage for 2 seconds.",
        isBuff: true,
      },
      {
        key: "TransformBuff",
        display: "Transform",
        description: "Transforms a random enemy Minion or Building into a friendly ManaPuff.",
        isBuff: false,
      },
      {
        key: "HealsKeyword",
        display: "Heal",
        description: "Replenish a Minions health. Flying Minions only gain half health back.",
        isBuff: true,
      },
    ],
  },
  {
    category: "OUTLANDER",
    display: "Outlander",
    terms: [
      {
        key: "TargetedBuff",
        display: "Marked",
        description:
          "If in range, Enemy Ranged Minions will attack this unit first and deal + 25% damage. Remove Stealth.",
        isBuff: false,
      },
      {
        key: "ScrapTech",
        display: "Outlander Tech",
        description:
          "Whenever you draw an Outlander Card gain 5 Tech per mana, even if this card is not in your hand.",
        isBuff: false,
      },
    ],
  },
  {
    category: "CRYSTAL_ELVES",
    display: "Crystal Elves",
    terms: [
      // Mana freeze
      {
        key: "Overload",
        display: "Mana freeze",
        description:
          "Lock a Mana Crystal. The next time you would gain mana, instead unlock a mana crystal.",
        isBuff: true,
      },
      {
        key: "Mana Freeze (1)",
        display: "Mana Freeze (1)",
        description:
          "Lock 1 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
        isBuff: true,
      },
      /* text inline*/
      {
        key: "Mana Freeze (2)",
        display: "Mana Freeze (2)",
        description:
          "Lock 2 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
        isBuff: true,
      },
      {
        key: "OverloadMulti",
        display: "Mana Freeze (2)",
        description:
          "Lock 2 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
        isBuff: true,
      },

      {
        key: "ManaSurgeBuff",
        display: "Mana Surge",
        description: "+50% Attack Speed while you have 6 or more Mana.",
        isBuff: true,
      },
    ],
  },
  {
    key: "VOIDBORNE",
    display: "Voidborne",
    terms: [
      {
        key: "FearBuff",
        display: "Fear",
        description: `Run away in fear from the source in a straight line. Duration 5`,
        isBuff: false,
      },
      {
        key: "Voidborne Wound",
        display: "Voidborne Wound",
        description: `If a Voidborne Minion deals damage to enemy Master while this card is in your hand`,
        isBuff: true,
      },
      {
        key: "VoidborneWound",
        display: "Voidborne Wound",
        description:
          "If a Voidborne Minion deals damage to enemy Master while this card is in your hand",
        isBuff: true,
      },
      {
        key: "BloodConnection",
        display: "Blood Pact",
        description:
          "Your Master loses health equal to half of the damage taken by this Minion - even overkill damage.",
        isBuff: false,
      },
      {
        key: "TurncoatBuff",
        display: "Turncoat",
        description: "Switches sides the first time it drops below 50% health",
        isBuff: false,
      },
    ],
  },
  {
    category: "ACCURSED",
    display: "Accursed",
    terms: [
      {
        key: "AccursedAffinity",
        display: "Accursed Ascension",
        description: "Gain Accursed Ascension when you have spent 60 Mana on Accursed cards.",
        isBuff: true,
      },
      {
        key: "SpiritBuff",
        display: "Spirit",
        description:
          "Grant 100 health to a flying Minion or 200 health to a ground Minion. Minions cannot receive more than one Spirit at a time.",
        isBuff: true,
      },
      {
        key: "CursedBuff",
        display: "Cursed",
        description: "Loses 3% of max health every second.",
        isBuff: false,
      },
      {
        key: "UndyingCorpse",
        display: "Undying Corpse",
        description: "Resurrects the Undying Skeleton one last time after a delay. Delay: 25",
        isBuff: true,
      },
      {
        key: "LycanthropyBuff",
        display: "Lycanthropy",
        description:
          "Transform into a Werewolf when health is 50% or below. Werewolf Health: 400. Damage per sec: 36.36",
        isBuff: true,
      },
    ],
  },

  {
    category: "HIGHLANDER",
    display: "Stoutheart",
    terms: [
      // Revelry
      {
        key: "HiglandRevelry",
        display: "Revelry",
        description:
          "If summoned close to another Stoutheart Minion - or if another Stoutheart Minion is summoned nearby.",
        isBuff: true,
      },
      {
        key: "AntiFrenzy",
        display: "Slow",
        description: "-20% Movement speed. -20% Attack Speed. Removes Haste.",
        isBuff: false,
      },
    ],
  },
  {
    category: "ZENCHI",
    display: "Zen-Chi",
    terms: [
      {
        key: "ZenChiFlow",
        display: "Zen-Chi Flow",
        description: "If your last played card was Zen-Chi",
        isBuff: true,
      },
      {
        key: "BerryBuff",
        display: "Growthburst Shroom (1)",
        description: `When drawn, plant 1 Growthburst Shrooms in your arena that gives a friendly Zen-Chi Minion Giant Growth when picked up.
    Giant Growth: +25% Attack damage.
    "+25% Health.`,
        isBuff: true,
      },
      // Growthburst Shroom (2)
      {
        key: "BerryBuffPlural",
        display: "Growthburst Shroom (2)",
        description: `When drawn, plant 2 Growthburst Shrooms in your arena that gives a friendly Zen-Chi Minion Giant Growth when picked up.
    Giant Growth: +25% Attack damage.
    "+25% Health.`,
        isBuff: true,
      },
    ],
  },
  {
    category: "SLITHER",
    display: "Slither",
    terms: [
      {
        key: "SlitherBeastPoisonAttack",
        display: "Poison Spit",
        description:
          "Akinlep's Gong of Pestilence Spits its potent saliva at its target inflicting 4 seconds of Poison to it and all nearby enemy Minions.",
        isBuff: false,
      },

      {
        key: "SlitherBeastSlamAttack",
        display: "Slam Attack",
        description:
          "Akinlep's Gong of Pestilence forcibly slams its head into buildings. (Damage: 100, Range.2, Cooldown: 2)",
        isBuff: false,
      },

      // Call Slitherbound
      {
        key: "Cohort",
        display: "Slitherbound",
        description:
          "Add Slitherbound Minion to a Slither Card in your hand. Summon all Slitherbound when you play that Card (Max 3). Slitherbound Health: 35. Damage per sec: 5. Inflicts Poison on attack.",
        isBuff: true,
      },
      {
        key: "SlitherLancerSlave",
        display: "Slitherbound Lancer",
        description:
          "Inflics Poison for 3 seconds on attack. Health: 35. Attack: 10 (DPS: 5). Attack-speed: 2 sec. Attack-type: Melee, Movement-speed: 4",
        isBuff: true,
      },
      {
        key: "SlitherDarterSlave",
        display: "Slitherbound Darter",
        description:
          "Inflics Poison for 3 seconds on attack. Health: 35. Attack: 5 (DPS: 2,5). Attack-speed: 2 sec. Attack-type: Ground&Air, Range: 6. Movement-speed: 4",
        isBuff: true,
      },
      {
        key: "SacrificeBuff",
        display: "Sacrifire",
        description: "Kill all Slitherbound you command.",
        isBuff: true,
      },
    ],
  },
  {
    category: "EMPYREAN",
    display: "Empyream",
    terms: [
      {
        key: "EmpyreanArmy",
        display: "Empyrean Army",
        description:
          "If you have 5 or more Empyrean cards  (non-Wild Carded) in your deck at the time this card is played.",
        isBuff: true,
      },
      {
        key: "DivineShield",
        display: "Divine Shield",
        description: "A holy shield that makes the wearer immune to damage. Duration 6.",
        isBuff: true,
      },
    ],
  },
  {
    category: "SCRAT",
    display: "Scrat",
    terms: [
      {
        key: "BarrelShield",
        display: "Barrel Shield",
        description:
          "This Scrat wears a barrel which protects it but slows it down. When the barrel is destroyed, the Scrat emerge unscathed.",
        isBuff: true,
      },
      {
        key: "ScratSwarm",
        display: "Scrat Swarm",
        description:
          "This Scrat wears a barrel which protects it but slows it down. When the barrel is destroyed, the Scrat emerge unscathed.",
        isBuff: true,
      },
    ],
  },
  {
    category: "UNUSUAL",
    display: "Unusual",
    terms: [
      /* actorskillinfo */
      {
        key: "MythicBuff",
        display: "Mythic",
        description:
          "Leaves the battlefield instead of dying. Your team can only have one copy of this minion summoned at a time.",
        isBuff: false,
      },
    ],
  },

  {
    category: "UNIT_SPECIFIC",
    display: "Unit Specific",
    terms: [
      {
        key: "ShieldOfLight",
        display: "Shield of Light",
        description: `      When taking damage give up to 4 nearby allies Shield. Cooldown: 12. Radius: 4`,
        isBuff: true,
      },
      {
        key: "Netherstep",
        display: "Netherstep",
        description: `Instantly jump through the nether to a different location. Cooldown 1, Teleport Distance 8.`,
        isBuff: true,
      },
      {
        key: "SuccubusTeleport",
        display: "Netherstep",
        description:
          "Instantly jump through the nether to a different location. Cooldown: 1. Teleport Distance: 8",
        isBuff: true,
      },
      {
        key: "SoulStealBuff",
        display: "Soul Steal",
        description:
          "Steals his enemies' souls when he kills them. Increase attack speed by 15% for each soul he has collected (Max 200%).",
        isBuff: true,
      },
      {
        key: "ImpactfulEntry",
        display: "Impactful Entry",
        description:
          "Lands in the arena with devastating force pushing nearby enemy minions away and deals 100 damage.",
        isBuff: true,
      },
      {
        key: "Explodes",
        display: "Explodes",
        description: `Detonates shortly after being summoned and deals damage to all nearby Units.`,
        isBuff: true,
      },
      {
        key: "ArmorOfLight",
        display: "Armor of Light",
        description:
          "When this Brother takes damage, his radiant armor explodes to damage and knock back enemies. Damage: 75, Cooldown: 12s, Radius: 4",
        isBuff: true,
      },
      {
        key: "Sunder",
        display: "Sunder",
        description:
          "Pull a rock from the ground and slam it back down. Deals 75 damage in an area twice. Can only be played once.",
        isBuff: false,
      },
      {
        key: "StormChargeBuff",
        display: "Stormcharge",
        description:
          "Moves faster and deals damage to all nearby enemies. Keeps charging until an enemy survives the charge. Damage: 150. Cooldown: 2. Speed: +8",
        isBuff: true,
      },
      // Shield Slam
      {
        key: "ChargeBuff",
        display: "Shield Slam",
        description:
          "Charges nearby enemies and slams them with his shield. Radius: 5. Damage: 70. Cooldown: 2",
        isBuff: true,
      },

      {
        key: "HighlandCaber",
        display: "Caber",
        description:
          "A giant tree log that deals massive damage in a large area. Damage: 180. Width: 4. Length: 5",
        isBuff: true,
      },

      //Spin-Attack
      {
        key: "FergusSpin",
        display: "Spin-attack",
        description:
          "Deals damage to all nearby minions for 5 seconds. Fergus moves at half speed. Duration: 5 Radius: 2.8",
        isBuff: true,
      },

      {
        key: "SliceAndDice",
        display: "slice and dice",
        description: "Deals strong Area of Effect damage with its sawblade arm.",
        isBuff: true,
      },
      {
        key: "SlamAndBam",
        display: "slam and bam",
        description: "Slams the ground and knows enemies back. Damage: 150. Radius: 3. Cooldown: 6",
        isBuff: true,
      },
      // Self-Destruction
      {
        key: "MalfunctionBuff",
        display: "Self-Destruction",
        description:
          "Stops attacking at 350 health and gains Taunt then explodes after a short duration. Damage: 300. Radius: 5. Duration: 5",
        isBuff: true,
      },
      {
        key: "ArmorOfFireBuff",
        display: "Armor of Fire",
        description:
          "When this Brother takes damage, he sets Holy Fire to the ground beneath him. Holy Fire. Burns enemy Minions and heals friendly Minions. Damage: 100. Master Damage: 0. Healing: 100. Duration: 5",
        isBuff: true,
      },
      {
        key: "GroundRupture",
        display: "Group Rupture",
        description:
          "Deal damage and knock back enemy ground minions in a vertical area across the arena. Damage: 100. Cast Delay: 0,2. Width: 4",
        isBuff: false,
      },
      {
        key: "JumpBuff",
        display: "Jump",
        description: "Jump toward the enemy Master Tower in a straight line. Radius: 10",
        isBuff: true,
      },

      {
        key: "CryBuff",
        display: "Cry",
        description:
          "Stops attacking and gains Taunt for a short duration. Taunt: All nearby Enemies will target this Minion. Duration: 5. Radius: 5",
        isBuff: false,
      },
      {
        key: "SoulRipBuff",
        display: "Soul Rip",
        description:
          "Rip the soul from the Minion's body and grant a nearby friendly Minion Spirit. Spirit: Grant 100 health to a flying Minion or 200 health to a ground Minion. Minions cannot receive more than one Spirit at a time. Radius: 14",
        isBuff: true,
      },
      {
        key: "GaxEgg",
        display: "Egg",
        description:
          "Log entry 183: This one egg is really big, maybe we should take a step back. Log entry 184: One step was not enough. Health: 50, Delay: 3,5",
        isBuff: true,
      },
      {
        key: "BoomerEgg",
        display: "BoomerEgg",
        description:
          "Log entry 44: Something is moving inside this cocoon of yuk. Maybe it's cute! Log entry 45: It was not. Health: 40. Delay: 3,5",
        isBuff: true,
      },
      {
        key: "ReBoomerEgg",
        display: "ReBoomerEgg",
        description:
          "Log entry 59: An egg with regeneratative properties. Interesting! Log entry 68: HOW DO WE MAKE IT STOP, OH GOD!",
        isBuff: true,
      },
      {
        key: "PiercingShotBuff",
        display: "Piercing Shot",
        description:
          "After a delay, release a piercing shot that deals damage to all Units in a straight line. Damage: 75. Delay: 2. Radius: 2. Range: Unlimited",
        isBuff: true,
      },

      {
        key: "CursedAuraBuff",
        display: "Cursed Aura",
        description:
          "Nearby enemy ground Minions lose 3% of their max health every second. The aura even persists after his death!",
        isBuff: false,
      },

      {
        key: "SoulDetonateBuff",
        display: "Soul Detonate",
        description:
          "Detonate the Minion's soul and deal damage to nearby enemies. Radius: 14. Damage: 20",
        isBuff: false,
      },
      {
        key: "MalfunctionBuffScreamingScrat",
        display: "Explodes",
        description:
          "Detonates shortly after being summoned and deals damage to all nearby Units. Damage: 100. Delay: 5. Radius: 5",
        isBuff: true,
      },
    ],
  },
];
