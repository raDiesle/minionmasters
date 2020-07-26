import React, { useState } from "react";
import { TYPE_TERM, TYPE_CARD_REF, TYPE_SUBTEXT } from "card-description-types";
import cardData from "generated/jobCardProps.json";
import CardDetailsModal from "page/CardDetailsModal";
import css from "page/wikiEditor/mention-readonly.module.scss";

const termToDescriptionMappingConfig = {
  Taunt: `All nearby Enemies will target this Minion. Radius 5.`,

  Explodes: `Detonates shortly after being summoned and deals damage to all nearby Units.`,

  Netherstep: `Instantly jump through the nether to a different location. Cooldown 1, Teleport Distance 8.`,

  Poison: `Deals damage over time to a Minion`,

  "Voidborne Wound": `If a Voidborne Minion deals damage to enemy Master while this card is in your hand`,

  Stuns: `Stunned Units are unable to move or attack.`,
  StunBuff: "Stunned Units are unable to move or attack.",
  // Haste
  FrenzyBuff: "+50% Movement speed. +50% Attack speed. Removes Slow.",

  ImpactfulEntry:
    "Lands in the arena with devastating force pushing nearby enemy minions away and deals 100 damage.",
  ArmorOfLight:
    "When this Brother takes damage, his radiant armor explodes to damage and knock back enemies. Damage: 75, Cooldown: 12s, Radius: 4",
  SingleShieldBuff: "Blocks all damage from the next damage source.",

  AntiFrenzy: "-25% Movement speed. -25% Attack Speed. Removes Haste.", // slow
  /* text inline*/
  "Mana Freeze (2)":
    "Lock 2 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
  "Mana Freeze (1)":
    "Lock 1 Mana Crystals. The next time you would gain mana, instead unlock a mana crystal.",
  // Mana freeze
  Overload:
    "Lock a Mana Crystal. The next time you would gain mana, instead unlock a mana crystal.",

  /* actorskillinfo */
  MythicBuff:
    "Leaves the battlefield instead of dying. Your team can only have one copy of this minion summoned at a time.",
  Marksmanship: "+2 range",
  DivineShield:
    "A holy shield that makes the wearer immune to damage. Duration 6.",
  RageBuff: "+50% attack damage.",
  Sunder:
    "Pull a rock from the ground and slam it back down. Deals 75 damage in an area twice. Can only be played once.",
  ManaSurgeBuff: "+50% Attack Speed while you have 6 or more Mana.",

  BerryBuff: `When drawn, plant 1 Growthburst Shrooms in your arena that gives a friendly Zen-Chi Minion Giant Growth when picked up.
    Giant Growth: +25% Attack damage.
    "+25% Health.`,
  // Growthburst Shroom (2)
  BerryBuffPlural: `When drawn, plant 2 Growthburst Shrooms in your arena that gives a friendly Zen-Chi Minion Giant Growth when picked up.
    Giant Growth: +25% Attack damage.
    "+25% Health.`,
  StormChargeBuff:
    "Moves faster and deals damage to all nearby enemies. Keeps charging until an enemy survives the charge.\n" +
    "Damage: 150. Cooldown: 2. Speed: +8",
  // Call Slitherbound
  Cohort:
    "Add a Slitherbound Minion to a Slither Card in your hand. Summon all Slitherbound when you play that Card (Max 3). Slitherbound Health: 35. Damage per sec: 5. Inflicts Poison on attack.",
  CohortTwo:
    "Add 2 Slitherbound Minions to a Slither Card in your hand. Summon all Slitherbound when you play that Card (Max 3).",
  SacrificeBuff: "Kill all Slitherbound you command.",
  EmpyreanArmy:
    "If you have 5 or more Empyrean cards in your deck at the time this card is played.",
  TauntBuff: "All nearby Enemies will target this Minion. Radius: 5",
  // Revelry
  HiglandRevelry:
    "If summoned close to another Stoutheart Minion - or if another Stoutheart Minion is summoned nearby.",
  HighlandCaber:
    "A giant tree log that deals massive damage in a large area. Damage: 180. Width: 4. Length: 5",
  ArmorOfFireBuff:
    "When this Brother takes damage, he sets Holy Fire to the ground beneath him. Holy Fire. Burns enemy Minions and heals friendly Minions. Damage: 100. Master Damage: 0. Healing: 100. Duration: 5",
  //Spin-Attack
  FergusSpin:
    "Deals damage to all nearby minions for 5 seconds. Fergus moves at half speed. Duration: 5 Radius: 2.8",
  SliceAndDice: "Deals strong Area of Effect damage with its sawblade arm.",
  SlamAndBam:
    "Slams the ground and knows enemies back. Damage: 150. Radius: 3. Cooldown: 6",
  // Self-Destruction
  MalfunctionBuff:
    "Stops attacking at 350 health and gains Taunt then explodes after a short duration. Damage: 300. Radius: 5. Duration: 5",
  // Shield Slam
  ChargeBuff:
    "Charges nearby enemies and slams them with his shield. Radius: 5. Damage: 70. Cooldown: 2",
  SoulStealBuff:
    "Steals his enemies' souls when he kills them. Increase attack speed by 20% for each soul he has collected (Max 200%).",
  GroundRupture:
    "Deal damage and knock back enemy ground minions in a vertical area across the arena. Damage: 100. Cast Delay: 0,2. Width: 4",
  JumpBuff: "Jump toward the enemy Master Tower in a straight line. Radius: 10",
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
      const termDescription = termToDescriptionMappingConfig[value] || "";
      if (termDescription === "") {
        console.info(`${value} : not defined yet`);
      }
      terms.push({ display, term: value, description: termDescription });
      return <span style={{ color: "yellow" }}>{display}</span>;
    } else if (type === TYPE_CARD_REF) {
      // TODO

      const matchedCard = cardData.find(({ name }) => name === value);
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
      {cardSubModalData.iD && (
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

      <div style={{ paddingTop: "10px" }}>
        {terms.map(({ display, term, description }) => (
          <div key={term}>
            <span style={{ color: "yellow" }}>{display}:</span> {description}
          </div>
        ))}
      </div>
    </div>
  );
}
