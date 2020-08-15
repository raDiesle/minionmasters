import { anchorLinkTarget } from "components/helper";
import { CardImg, GoldImg, RubiesImg, ShardsImg, TokenImg } from "page/wiki/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/wiki/resource-mngt/resource-mgmt";
import { RARITY_REFERENCE } from "components/rarity/rarity-mapping-config";
import React from "react";
import css from "page/wiki/resource-mngt/tokens.module.scss";

export default function Tokens() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Tokens"])}
      <div>
        <div>
          Tokens are very important to get {ShardsImg()}, which can be used to craft new {CardImg()}
        </div>

        <div>
          <fieldset>
            <legend>
              <img
                src="img/basics/resource_token_resource.png"
                alt="token resource"
                style={{ width: "20px" }}
              />{" "}
              Free Resource Token
            </legend>
            Are resetted every day 8:00 p.m. EST. Make sure to redeem. Rewards {GoldImg()} or{" "}
            {RubiesImg()}
          </fieldset>
          <fieldset>
            <legend>
              {" "}
              <img
                src="img/basics/resource_token_rare_resource.png"
                alt="rare resource token"
                style={{ width: "20px" }}
              />{" "}
              Rare Resource Token
            </legend>
            You get on every fourth Resource Token. Rewards: Rare {CardImg()} or more {GoldImg()} or{" "}
            . Worst price is 500 {GoldImg()}.{CardImg()}
            {RubiesImg()}
          </fieldset>

          <fieldset>
            <legend>
              <img src="img/basics/resource_token.png" alt="token" style={{ width: "20px" }} />{" "}
              Power Tokens
            </legend>
            1{TokenImg(false)} will give you 1{CardImg(false)} (or upgrade for duplicates) and{" "}
            {ShardsImg()}.
            <div>When the given card is beyond 400 glory, you will only get {ShardsImg()}.</div>
            <fieldset>
              <legend>Possible shards</legend>
              <div>Do not underestimate the benefit of its {ShardsImg()}. You can receive:</div>
              <br />
              Common: 15 shards (+25 if the card is already at 400 glory)
              <br />
              Rare: 30 shards (+50 if the card is already at 400 glory)
              <br />
              Supreme: 75 shards (+125 if the card is already at 400 glory)
              <br />
              Legendary: 300 shards (+500 if the card is already at 400 glory)
              <br />
              <br />
              If you reach 400 glory on a card and you find that card again while using a token or
              by buying a bundle in the shop, you will receive a generous amount of extra shards.
              <br />
            </fieldset>
            <fieldset>
              <legend>Card Drop Rates</legend>
              <div className={css.tokenDroprateGrid}>
                <div>{RARITY_REFERENCE.Common}</div>
                <div>50%</div>
                <div>{RARITY_REFERENCE.Rare}</div>
                <div>40%</div>
                <div>{RARITY_REFERENCE.Supreme}</div>
                <div>8%</div>
                <div>{RARITY_REFERENCE.Legendary}</div>
                <div>2%</div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Buy Prices</legend>
              <div className={css.tokenDroprateGrid}>
                <div>1k {GoldImg(false)}</div>
                <div>1 &nbsp;{TokenImg(false)}</div>
                <div>160{RubiesImg()}</div>
                <div>2 &nbsp;{TokenImg()}</div>
                <div>725{RubiesImg()}</div>
                <div>10{TokenImg()}</div>
              </div>
            </fieldset>
          </fieldset>
          <fieldset>
            <legend>
              <img
                src="img/basics/resource_powertoken_rare.png"
                alt="token rare"
                style={{ width: "20px" }}
              />{" "}
              Rare Power Token
            </legend>
            Received on every fourth Power Token. It rewards: {RARITY_REFERENCE.Rare} or better.
          </fieldset>
        </div>
      </div>
    </div>
  );
}
