import { anchorLinkTarget } from "components/helper";
import { CardImg, GoldImg, RubiesImg, ShardsImg, TokenImg } from "components/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import { RARITY_REFERENCE } from "rarity/RARITY_MAPPING_CONFIG";
import React from "react";

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
            <legend>{anchorLinkTarget(MENU_LINKS_CONFIG["Power Token"])}</legend>
            <img src="img/basics/resource_token.png" alt="token" style={{ width: "20px" }} /> Power
            Token rewards: {CardImg()} with {ShardsImg()}
            <fieldset>
              <legend>Card Drop Rates</legend>
              <div>{RARITY_REFERENCE.Common} = 50%</div>
              <div>{RARITY_REFERENCE.Rare}= 40%</div>
              <div>{RARITY_REFERENCE.Supreme} = 8%</div>
              <div>{RARITY_REFERENCE.Legendary} = 2%</div>
            </fieldset>
            <fieldset>
              <legend>Prices</legend>
              <div>
                1k {GoldImg(false)} <b>-></b> 1 {TokenImg(false)} <b>-></b> 1 {CardImg(false)}{" "}
                <b>-></b> X-{ShardsImg(false)}
              </div>
              <div>
                160{RubiesImg()} <b>-></b> 2{TokenImg()}
              </div>
              <div>
                725{RubiesImg()} <b>-></b> 10{TokenImg()}
              </div>
            </fieldset>
          </fieldset>
          <fieldset>
            <legend>Rare Power Token</legend>
            <img
              src="img/basics/resource_powertoken_rare.png"
              alt="token rare"
              style={{ width: "20px" }}
            />{" "}
            Rare Power Token is received on every fourth Power Token. Rewards: Rare or better{" "}
            {CardImg()}
          </fieldset>
        </div>
      </div>
    </div>
  );
}
