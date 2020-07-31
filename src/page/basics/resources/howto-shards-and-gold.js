import { anchorLinkTarget } from "components/helper";
import { GoldImg, ShardsImg } from "components/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

export default function HowToShardsAndGold() {
  return (
    <div>
      {anchorLinkTarget(
        MENU_LINKS_CONFIG["How to spend shards/gold"],
        <>
          How to spend {ShardsImg()} and {GoldImg()}
        </>
      )}
      <br />
      The main objective you must have is to have all the cards with max glory, so you can progress
      in the battle pass faster and you can give substantial contributes to the guild pass.
      <br />
      In order to do so you should follow this priority list:
      <br />
      <ol>
        <li>
          When you have 5k Gold, buy 5 Power Tokens or a good shop offers that upgrade your cards
          (any card, as long as it is not random).
          <br />
          <br />
        </li>
        <li>
          {" "}
          Make sure your deck and possibly the conquest deck is at least with all bronze cards. If
          not try to upgrade as many cards as you can to bronze so you'll have a decent amount of
          glory.
          <br />
          <br />
        </li>
        <li>
          {" "}
          When you have all your cards to bronze, start upgrading the one you use most to silver,
          even gold if you can! Just remember that having all the cards to bronze should be your
          first priority.
          <br />
          <br />
        </li>
        <li>
          {" "}
          At this point you can spend shards to boost supreme and legendary cards to gold. Why?
          because when you have supreme and gold maxed out, and you find a duplicate by using a
          token, you'll get a lot of shards. Since supreme and legendaries are rare, you'll be able
          to boost common and rare easily by using tokens.
          <br />
          <br />
        </li>
        <li>
          {" "}
          Once all your supreme and legendaries are gold, you can now boost rare cards, and only for
          last the common ones (which are far easier to boost).
          <br />
          <br />
        </li>
        <li> Now you can spend resources in Skins/Avatars/Arenas/Emoji/etc...</li>
      </ol>
      <br />
      If you need a simple way to sort your cards by the shard cost, you can use{" "}
      <a
        className="bb_link"
        href="https://steamcommunity.com/linkfilter/?url=https://docs.google.com/spreadsheets/d/1JknSRREm-_drFz8GGFYSfD0XTDt9kjtz2XSeW4ILesY/edit#gid=0"
        target="_blank"
        rel="noopener noreferrer"
      >
        this spreadsheet
      </a>
      <span className="bb_link_host">[docs.google.com]</span>. just save it in your computer/google
      drive and fill the current glory value for your cards. <div style={{ clear: "both" }} />
    </div>
  );
}
