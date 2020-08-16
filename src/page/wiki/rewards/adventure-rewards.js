import { RARITY_REFERENCE } from "components/rarity/rarity-mapping-config";
import { CardImg, TokenImg } from "page/wiki/thegame-icons";
import React from "react";

export default function AdventureRewards() {
  return (
    <div>
      <fieldset>
        <legend>Rewards</legend>
        <div>
          <b>Charging into darkness</b>
        </div>
        <div>
          3 {TokenImg()} 3 {RARITY_REFERENCE.Rare} 3 {RARITY_REFERENCE.Supreme}
        </div>
        <b>Jadespark normal</b>:
        <div>
          15 Jade Flingers - 3 {TokenImg()} - 3 {RARITY_REFERENCE.Rare} {CardImg()}
        </div>
        <div>
          <b>Mountainshaper, quest 2</b>
          <div>
            {" "}
            5x {TokenImg()} x500000 XP - 3x {RARITY_REFERENCE.Supreme}
          </div>
        </div>
      </fieldset>
    </div>
  );
}
