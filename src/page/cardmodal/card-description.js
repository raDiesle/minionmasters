import React, { useState } from "react";
import { TYPE_TERM, TYPE_CARD_REF, TYPE_SUBTEXT } from "card-description-types";
import cardData from "generated/jobCardProps.json";
import CardDetailsModal from "page/CardDetailsModal";
import css from "page/wikiEditor/mention-readonly.module.scss";

export const TERM_TO_DESCRIPTION_MAPPING_CONFIG = {
  Taunt: {
    display: "Taunt",
    description: `All nearby Enemies will target this Minion. Radius 5.`,
  },

  Explodes: {
    display: "Explodes",
    description: `Detonates shortly after being summoned and deals damage to all nearby Units.`,
  },

  Netherstep: {
    display: "Netherstep",
    description: `Instantly jump through the nether to a different location. Cooldown 1, Teleport Distance 8.`,
  },

  Poison: {
    display: "Poison",
    description: `Deals damage over time to a Minion`,
  },

  "Voidborne Wound": {
    display: "Voidborne Wound",
    description: `If a Voidborne Minion deals damage to enemy Master while this card is in your hand`,
  },

  Stuns: {
    display: "Stun",
    description: `Stunned Units are unable to move or attack.`,
  },
  StunBuff: {
    display: "Stun",
    description: "Stunned Units are unable to move or attack.",
  },
  // Haste
  FrenzyBuff: {
    display: "Frenzy",
    description: "+50% Movement speed. +50% Attack speed. Removes Slow.",
  },

  ImpactfulEntry: {
    display: "Impactful Entry",
    description:
      "Lands in the arena with devastating force pushing nearby enemy minions away and deals 100 damage.",
  },

  ArmorOfLight: {
    display: "Armor of Light",
    description:
      "When this Brother takes damage, his radiant armor explodes to damage and knock back enemies. Damage: 75, Cooldown: 12s, Radius: 4",
  },

  SingleShieldBuff: {
    display: "Shield",
    description: "Blocks all damage from the next damage source.",
  },

  SpiritBuff: {
    display: "Spirit",
    description:
      "Grant 100 health to a flying Minion or 200 health to a ground Minion. Minions cannot receive more than one Spirit at a time.",
  },

  AntiFrenzy: {
    display: "Slow",
    description: "-25% Movement speed. -25% Attack Speed. Removes Haste.",
  },
  /* text inline*/
  "Mana Freeze (2)": {
    display: "Mana Freeze (2)",
    description:
      "Lock 2 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
  },

  "Mana Freeze (1)": {
    display: "Mana Freeze (1)",
    description:
      "Lock 1 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
  },

  // Mana freeze
  Overload: {
    display: "Mana freeze",
    description:
      "Lock a Mana Crystal. The next time you would gain mana, instead unlock a mana crystal.",
  },

  /* actorskillinfo */
  MythicBuff: {
    display: "Mythic",
    description:
      "Leaves the battlefield instead of dying. Your team can only have one copy of this minion summoned at a time.",
  },

  Marksmanship: {
    display: "Marksmanship",
    description: "+2 range",
  },
  DivineShield: {
    display: "Divine Shield",
    description:
      "A holy shield that makes the wearer immune to damage. Duration 6.",
  },

  RageBuff: {
    display: "Rage",
    description: "+50% attack damage.",
  },
  Sunder: {
    display: "Sunder",
    description:
      "Pull a rock from the ground and slam it back down. Deals 75 damage in an area twice. Can only be played once.",
  },

  ManaSurgeBuff: {
    display: "Mana Surge",
    description: "+50% Attack Speed while you have 6 or more Mana.",
  },
  OverloadMulti: {
    display: "Mana Freeze (2)",
    description:
      "Lock 2 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
  },

  BerryBuff: {
    display: "Growthburst Shroom (1)",
    description: `When drawn, plant 1 Growthburst Shrooms in your arena that gives a friendly Zen-Chi Minion Giant Growth when picked up.
    Giant Growth: +25% Attack damage.
    "+25% Health.`,
  },
  // Growthburst Shroom (2)
  BerryBuffPlural: {
    display: "Growthburst Shroom (2)",
    description: `When drawn, plant 2 Growthburst Shrooms in your arena that gives a friendly Zen-Chi Minion Giant Growth when picked up.
    Giant Growth: +25% Attack damage.
    "+25% Health.`,
  },
  StormChargeBuff: {
    display: "Stormcharge",
    description:
      "Moves faster and deals damage to all nearby enemies. Keeps charging until an enemy survives the charge. Damage: 150. Cooldown: 2. Speed: +8",
  },

  // Call Slitherbound
  Cohort: {
    display: "Slitherbound (1)",
    description:
      "Add a Slitherbound Minion to a Slither Card in your hand. Summon all Slitherbound when you play that Card (Max 3). Slitherbound Health: 35. Damage per sec: 5. Inflicts Poison on attack.",
  },

  CohortTwo: {
    display: "Slitherbound (2)",
    description:
      "Add 2 Slitherbound Minions to a Slither Card in your hand. Summon all Slitherbound when you play that Card (Max 3).",
  },

  SacrificeBuff: {
    display: "Sacrifire",
    description: "Kill all Slitherbound you command.",
  },
  EmpyreanArmy: {
    display: "Empyrean Army",
    description:
      "If you have 5 or more Empyrean cards in your deck at the time this card is played.",
  },

  TauntBuff: {
    display: "Taunt",
    description: "All nearby Enemies will target this Minion. Radius: 5",
  },
  // Revelry
  HiglandRevelry: {
    display: "Revelry",
    description:
      "If summoned close to another Stoutheart Minion - or if another Stoutheart Minion is summoned nearby.",
  },
  HighlandCaber: {
    display: "Caber",
    description:
      "A giant tree log that deals massive damage in a large area. Damage: 180. Width: 4. Length: 5",
  },

  ArmorOfFireBuff: {
    display: "Armor of Fire",
    description:
      "When this Brother takes damage, he sets Holy Fire to the ground beneath him. Holy Fire. Burns enemy Minions and heals friendly Minions. Damage: 100. Master Damage: 0. Healing: 100. Duration: 5",
  },

  //Spin-Attack
  FergusSpin: {
    display: "Spin-attack",
    description:
      "Deals damage to all nearby minions for 5 seconds. Fergus moves at half speed. Duration: 5 Radius: 2.8",
  },

  SliceAndDice: {
    display: "splice and dice",
    description: "Deals strong Area of Effect damage with its sawblade arm.",
  },
  SlamAndBam: {
    display: "slam and bam",
    description:
      "Slams the ground and knows enemies back. Damage: 150. Radius: 3. Cooldown: 6",
  },
  // Self-Destruction
  MalfunctionBuff: {
    display: "Self-Destruction",
    description:
      "Stops attacking at 350 health and gains Taunt then explodes after a short duration. Damage: 300. Radius: 5. Duration: 5",
  },
  // Shield Slam
  ChargeBuff: {
    display: "Shield Slam",
    description:
      "Charges nearby enemies and slams them with his shield. Radius: 5. Damage: 70. Cooldown: 2",
  },
  SoulStealBuff: {
    display: "Soul Steal",
    description:
      "Steals his enemies' souls when he kills them. Increase attack speed by 20% for each soul he has collected (Max 200%).",
  },

  GroundRupture: {
    display: "Group Rupture",
    description:
      "Deal damage and knock back enemy ground minions in a vertical area across the arena. Damage: 100. Cast Delay: 0,2. Width: 4",
  },
  JumpBuff: {
    display: "Jump",
    description:
      "Jump toward the enemy Master Tower in a straight line. Radius: 10",
  },

  AccursedAffinity: {
    display: "Accursed Ascension",
    description:
      "Gain Accursed Ascension when you have spent 60 Mana on Accursed cards.",
  },
  SuccubusTeleport: {
    display: "Netherstep",
    description:
      "Instantly jump through the nether to a different location. Cooldown: 1. Teleport Distance: 8",
  },
  CryBuff: {
    display: "Cry",
    description:
      "Stops attacking and gains Taunt for a short duration. Taunt: All nearby Enemies will target this Minion. Duration: 5. Radius: 5",
  },
  SoulRipBuff: {
    display: "Soul Rip",
    description:
      "Rip the soul from the Minion's body and grant a nearby friendly Minion Spirit. Spirit: Grant 100 health to a flying Minion or 200 health to a ground Minion. Minions cannot receive more than one Spirit at a time. Radius: 14",
  },
  GaxEgg: {
    display: "Egg",
    description:
      "Log entry 183: This one egg is really big, maybe we should take a step back. Log entry 184: One step was not enough. Health: 50, Delay: 3,5",
  },
  BoomerEgg: {
    display: "BoomerEgg",
    description:
      "Log entry 44: Something is moving inside this cocoon of yuk. Maybe it's cute! Log entry 45: It was not. Health: 40. Delay: 3,5",
  },
  ReBoomerEgg: {
    display: "ReBoomerEgg",
    description:
      "Log entry 59: An egg with regeneratative properties. Interesting! Log entry 68: HOW DO WE MAKE IT STOP, OH GOD!",
  },
  PiercingShotBuff: {
    display: "Piercing Shot",
    description:
      "After a delay, release a piercing shot that deals damage to all Units in a straight line. Damage: 75. Delay: 2. Radius: 2. Range: Unlimited",
  },
  DestroyBuff: {
    display: "Destroy",
    description: "Kill a Unit. If it is Mythic, deal 1000 damage instead.",
  },
  CursedAuraBuff: {
    display: "Cursed Aura",
    description:
      "Nearby enemy ground Minions lose 3% of their max health every second. The aura even persists after his death!",
  },
  UndyingCorpse: {
    display: "Undying Corpse",
    description:
      "Resurrects the Undying Skeleton one last time after a delay. Delay: 25",
  },
  SoulDetonateBuff: {
    display: "Soul Detonate",
    description:
      "Detonate the Minion's soul and deal damage to nearby enemies. Radius: 14. Damage: 20",
  },
  StealthBuff: {
    display: "Stealth",
    description:
      "Becomes invisible while not attacking or taking damage for 2 seconds.",
  },
  CursedBuff: {
    display: "Cursed",
    description: "Loses 3% of max health every second.",
  },
  ZenChiFlow: {
    display: "Zen-Chi Flow",
    description: "If your last played card was Zen-Chi",
  },
  PoisonBuff: {
    display: "Poison",
    description:
      "Deals damage over time to a Minion. Cooldown: 0,5. Damage: 10",
  },
  TurncoatBuff: {
    display: "Turncoat",
    description: "Switches sides the first time it drops below 50% health",
  },
  VoidborneWound: {
    display: "Voidborne Wound",
    description:
      "If a Voidborne Minion deals damage to enemy Master while this card is in your hand",
  },
  BarrelShield: {
    display: "Barrel Shield",
    description:
      "This Scrat wears a barrel which protects it but slows it down. When the barrel is destroyed, the Scrat emerge unscathed.",
  },
  RushBuff: {
    display: "Rush",
    description: "Starts acting immediately after being summoned.",
  },
  SlitherLancerSlave: {
    display: "Slitherbound Lancer",
    description:
      "Inflics Poison for 3 seconds on attack. Health: 35. Attack: 10 (DPS: 5). Attack-speed: 2 sec. Attack-type: Melee, Movement-speed: 4",
  },
  SlitherDarterSlave: {
    display: "Slitherbound Darter",
    description:
      "Inflics Poison for 3 seconds on attack. Health: 35. Attack: 5 (DPS: 2,5). Attack-speed: 2 sec. Attack-type: Ground&Air, Range: 6. Movement-speed: 4",
  },
  LycanthropyBuff: {
    display: "Lycanthropy",
    description:
      "Transform into a Werewolf when health is 50% or below. Werewolf Health: 400. Damage per sec: 36.36",
  },
  MalfunctionBuffScreamingScrat: {
    display: "Explodes",
    description:
      "Detonates shortly after being summoned and deals damage to all nearby Units. Damage: 100. Delay: 5. Radius: 5",
  },
};

export default function CardDescription({ description }) {
  const [cardSubModalData, setCardSubModalData] = useState({});
  const [isOpenCardSubModal, setIsOpenCardSubModal] = useState(false);

  const blocks = description.split(/(\{.*?\})/);

  const terms = [];
  const formattedDescription = blocks.map((block, index) => {
    const isSpecialBlock = block.startsWith("{");
    if (isSpecialBlock === false) {
      return <span>{block} </span>;
    }

    const jsonCompliant = block.replace("{", "[").replace("}", "]");

    const [display, type, value] = (() => {
      try {
        return JSON.parse(jsonCompliant);
      } catch (e) {
        console.error(e);
        return ["", TYPE_SUBTEXT, ""];
      }
    })();

    if (type === TYPE_TERM) {
      const matchedTermToDescriptionMappingConfig = TERM_TO_DESCRIPTION_MAPPING_CONFIG[
        value
      ] || { display: display, description: value };

      if (matchedTermToDescriptionMappingConfig.description === "") {
        console.info(`${value} : not defined yet`);
      }
      terms.push({
        display: matchedTermToDescriptionMappingConfig.display,
        term: value,
        description: matchedTermToDescriptionMappingConfig.description,
      });
      return (
        <span style={{ color: "yellow" }}>
          {matchedTermToDescriptionMappingConfig.display}
        </span>
      );
    } else if (type === TYPE_CARD_REF) {
      // TODO

      const matchedCard = cardData.find(
        ({ name, unitToSummon }) =>
          name === value ||
          name === display ||
          name.replace(/\s+/g, "").includes(value.replace(/\s+/g, "")) ||
          unitToSummon === value
      );
      const isCardUnknown = typeof matchedCard === "undefined";
      if (isCardUnknown) {
        console.error(value + " not found.");
      }
      return (
        <a
          onClick={() => {
            if (isCardUnknown === false) {
              setCardSubModalData({
                iD: matchedCard.iD,
                card: matchedCard,
              });
              setIsOpenCardSubModal(true);
            }
          }}
          className={css.mentionLink}
        >
          {display}
        </a>
      );
    }
    // TODO other types
    return <span>{display}</span>;
  });

  return (
    <div>
      {typeof cardSubModalData.iD !== "undefined" && (
        <CardDetailsModal
          key={cardSubModalData.iD}
          card={cardSubModalData.card}
          isOpenDetails={isOpenCardSubModal}
          setIsOpenDetails={setIsOpenCardSubModal}
        />
      )}

      <h3 style={{ marginBottom: 0 }}>Description</h3>
      <div>
        {formattedDescription.map((block, index) => (
          <React.Fragment key={"descr_" + index}>{block}</React.Fragment>
        ))}
      </div>

      <div style={{ paddingTop: "15px" }}>
        {terms.map(({ display, term, description }) => (
          <div key={term}>
            <span style={{ color: "yellow" }}>{display}:</span> {description}
          </div>
        ))}
      </div>
    </div>
  );
}
