import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGaTrackView } from "footer/consent-banner";
import React from "react";
import cssStatic from "page/wiki/static-content.module.scss";

export default function Guild() {
  useGaTrackView("/Basics/Guild");
  return (
    <div className={cssStatic.container}>
      <div>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <h4>Basics</h4>
      <div>
        The guild pass is basically a community driven season, where you and you're guild contribute
        every cycle to increase the glory and gain tiers.
        <br />
        <br />
        The guild pass lasts 30 days and it's made by 3 days cycle (10 cycles total). Every 3 days
        every guild member can contribuite (you need to enable the conquest mode in the guild
        screen), by winning games to increase the total guild glory. Each member can have up to 6
        victories in conquest mode each cycle, and they can lose up to 3 times. Once you win 6 times
        or lose 3, you cannot contribute anymore until the next cycle.
        <br />
        <br />
        Every guild has a set of "Conquest Cards" available (the number increase while the guild
        progress in the guild pass), and those cards provides bonus glory to the conquest battles
        and as bonus, those cards are available for every guild member (even if they don't have
        those cards in their collection). The bonus glory from the conquest cards{" "}
        <u>
          <b>DOES NOT</b>
        </u>{" "}
        apply to wild cards (so you get the bonus only for the first copy of the card, not the
        second one).
        <br />
        <fieldset>
          <legend>Calculations & Rewards</legend>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h4>Check Resource Management Page</h4>
          </div>
        </fieldset>
        <div className="bb_h1">
          <b>How to contribute</b>
        </div>
        <br />
        In order to contribute in the guild pass, you need to use a deck with a high amount of
        glory, and possibly to use the conquest cards. Each conquest card in your deck provides
        extra 400 glory for the guild pass.
        <br />
        <b>
          <u>NOTE:</u>
        </b>{" "}
        every guild has a different set of conquest cards.
        <br />
        <br />
        To contribute, just enable the conquest mode from the guild screen, then you can play in any
        mode (excluding draft, mayhem and expeditions) and your victories will count towards the
        guild pass. If your conquest mode is active, the guild emblem will be visible near the usual
        "Battle" button to start a game.
        <br />
        <br />
        <br />
        <br />
        Your total contribution for the cycle is visible in the guild screen, and the guild roster
        shows your total contribution for the season.
        <br />
        <br />
        All the glory earned by the <b>TOP 20 GUILD MEMBERS</b> will be added to the guild pass at
        the end of every cycle, all the rest won't count at all.
        <br />
        <br />
        <u>
          <b>NOTE:</b>
        </u>{" "}
        remember that once you have lost 3 times there is no way to try again (is not like drafts or
        mayhem where you can buy a new ticket and try again), so if you are having a lose streak,
        remember to pause the conquest and to resume at better times.
        <br />
        <br />
        <u>
          <b>NOTE 2:</b>
        </u>{" "}
        if you start the conquest in one guild, and then join another guild, you won't be able to
        give any contribution until the next cycle.
        <br />
        <br />
        <u>
          <b>NOTE 3:</b>
        </u>{" "}
        don't try to complete your conquest at the last minute! In fact if the cycle changes while
        you are playing, the points will be count for the next cycle and the previous contribution
        will be lost.
        <br />
        <br />
        <u>
          <b>NOTE 4:</b>
        </u>{" "}
        when you are in conquest, you will never be put against your own guild members.
        <br />
        <br />
        <div className="bb_h1">
          <b>Rewards</b>
        </div>
        <br />
        The guild pass provides rewards for all the guild members, in addition to extra conquest
        cards, each member also earn skins, avatars, a frame border for your avatar and cards pack
        (like 5 or more copies of a single card) of an increasing rarity, up to 3 legendaries at
        tier 20.
        <br />
        <br />
        <u>
          <b>NOTE:</b>
        </u>{" "}
        New guild members won't be able to collect previous cycles rewards, only the rewards
        obtained from the cycle he became part of the guild onwards.
        <br />
        <br />
        In addition to all that,{" "}
        <b>
          <u>the number one guild</u>
        </b>{" "}
        also receive additional 5 legendaries for all its members at the end of the season.
        <br />
        <br />
        Is pointless to say that all this rewards are a great incentive for anyone to be part of a
        guild, and to work together in order to reach the top tier before the end of the season.
        <br />
        <br />
      </div>
    </div>
  );
}
