import { anchorLinkTarget } from "components/helper";
import { CardImg, GoldImg, RubiesImg, ShardsImg, TokenImg } from "components/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import { RARITY_REFERENCE } from "rarity/RARITY_MAPPING_CONFIG";
import React from "react";
import css from "./tokens.module.scss";

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
            {RubiesImg()}
          </fieldset>

          <fieldset>
            <legend>
              <img src="img/basics/resource_token.png" alt="token" style={{ width: "20px" }} />{" "}
              Power Tokens
            </legend>
            1{TokenImg(false)} will give you 1{CardImg(false)} and {ShardsImg()}.
            <div>When the given card is beyond 400 glory, you will only get {ShardsImg()}.</div>
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
            Received on every fourth Power Token and rewards: {RARITY_REFERENCE.Rare} or better{" "}
            {CardImg()}
          </fieldset>
        </div>
      </div>
    </div>
  );
}
