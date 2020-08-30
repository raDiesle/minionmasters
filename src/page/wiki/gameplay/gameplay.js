import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { anchorLinkTarget } from "page/wiki/menu-helper";
import cssStatic from "page/wiki/static-content.module.scss";
import React from "react";

export const MENU_LINKS_CONFIG = {
  "Youtube Videos": "Youtube Videos",
  "Unit Behaviour": "Unit Behaviour",
};

export default function Gameplay() {
  const MENU_ORDER = [MENU_LINKS_CONFIG["Unit Behaviour"], MENU_LINKS_CONFIG["Youtube Videos"]];

  return (
    <div className={cssStatic.container}>
      <div>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>
      <div>
        <ol>
          {MENU_ORDER.map((key) => (
            <li key={key}>
              <a href={`#${key}`}>{key}</a>
            </li>
          ))}
        </ol>
      </div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Unit Behaviour"])}
      <h4>Summoning</h4>
      <div>
        When you try to play a card, there is a 0.5s delay from click until the effect of the card
        actually starts. For Spells, after the 0.5s delay, there is also a "cast delay". Each spell
        has its own individual cast delay. Ranging from less than a second (Black Hole for example)
        to over 2 seconds (Call To Arms) Minions and Buildings have an additional 1s of summoning
        sickness after the initial delay. During that time they are frozen in place but can be
        targeted and damaged by other units, spells and effects.
      </div>
      <h4>Target acquisition</h4>
      <div>
        From the moment they are summoned, and while they have no current target, units are
        constantly searching to acquire a target. During that time, they will choose the closest
        unit to them which they are able to hit, and which is within their aggro radius, as their
        target. The aggro radius is either 8, or the range of the unit (the larger of the two).
        Units will only acquire something they can hit as their target (e.g. some units may only
        target buildings, or cannot target flying units).
      </div>
      <h4>Target interaction</h4>
      After acquiring a target, a unit will continue to target that unit even if other units attack
      or get closer to it than its target. It will then either attack its target (if the target is
      within attack range), or else try to move towards it.
      <h4>Target loss</h4>
      <div>
        A unit loses its target (and will try to find a new target) if: the target dies, or the unit
        predicts that the target will die the target leaves the unit's aggro radius the target
        otherwise becomes un-targetable (e.g. gains Stealth, enters Black Hole, etc.) the attacking
        unit is stunned, or enters Black Hole, or is taunted by Troubadour
      </div>
      <h4>Movement</h4>
      <div>
        If a unit has acquired a target that is outside of its attack range, then it will try to
        move towards its target. (Buildings will not get very far!) If a unit cannot find a target,
        it will try to walk towards the enemy Master's tower along the shortest path.
      </div>
      <h4>Attacking</h4>
      <div>
        The attack animation Once a unit has a target within its attack range, it will begin its
        attack animation. The attack animation can usually broken into three parts: Attack delay -
        This is the period of time during which the unit is taking aim, or swinging its weapon.
        Attack - This is the point in time when the projectile is released towards the target, or
        the weapon hits the target. Attack recovery - This is the period of time during which the
        unit recovers from making the attack. Altogether, the time to perform a full attack cycle is
        the Attack speed.
        <fieldset>
          <legend>Absolute Attack Speed formula</legend>
          Attack Delay + Attack Speed
        </fieldset>
        Losing target & re-targeting If a unit is part-way through its attack animation when it
        loses its target, then: If there is another potential target within attack range: It will
        immediately re-target and continue with its attack cycle from where it was when it lost its
        previous target If there are no other potential targets within attack range: If the unit was
        in the Attack delay phase then it will immediately stop attacking and try to start walking.
        However, if it was in the Attack recovery phase then it will wait to complete its attack
        recovery before trying to start walking.
      </div>
      <h4>Special cases and exceptions</h4>
      <div>
        Most Puffs will not acquire a target, and will move towards the nearest bridge instead of
        the enemy tower. Once on the bridge they will stay there, occasionally moving and hopping
        around but remaining on the bridge. Most masters follow the same targeting rules as other
        units with the following exceptions: Stormbringer targets the nearest enemy to him, but he
        re-targets after completing each attack even if his previous target did not die. His next
        target is chosen as he starts to pull his bow. Mordar's attack is an AOE that does not have
        one particular target. He will attack even if the only units on his side of the field are
        stealthed. Scrat Launcher will re-target after each attack (similar to Stormbringer).
      </div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Youtube Videos"])}
      <div className={cssStatic.youtubeContent}>
        <iframe
          title="gameplay"
          src="https://www.youtube.com/embed/-1kOHvJX_wM"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "600px", maxWidth: "100%", height: "337.5px" }}
        ></iframe>
      </div>
      <div className={cssStatic.youtubeContent}>
        <iframe
          title="gameplay"
          src="https://www.youtube.com/embed/cqMXRYk9pgE"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "600px", maxWidth: "100%", height: "337.5px" }}
        ></iframe>
      </div>
      <div className={cssStatic.youtubeContent}>
        <iframe
          title="gameplay"
          src="https://www.youtube.com/embed/GOD96FEZ0sE"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "600px", maxWidth: "100%", height: "337.5px" }}
        ></iframe>
        Description text to video:{" "}
        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2084315427">here</a>
      </div>
    </div>
  );
}
