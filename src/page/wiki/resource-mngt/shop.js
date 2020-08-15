import { anchorLinkTarget } from "components/helper";
import { CardImg, GoldImg, RubiesImg, ShardsImg, TokenImg } from "page/wiki/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/wiki/resource-mngt/resource-mgmt";
import React from "react";

export default function Shop() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Shop"])}
      <fieldset>
        <legend>Shop Curency Conversion Rate</legend>
        <p>
          1k {GoldImg()} <b>=</b> 80 {RubiesImg()} <b>=</b> 125 {ShardsImg()}
        </p>
      </fieldset>
      <fieldset>
        <legend>Free items unregulary</legend>
        <p>Check the shop daily offers, because very often there are free ones</p>
      </fieldset>
      <fieldset>
        <legend>Examples for good shop offers by calculation</legend>
        <div>
          First look on the gold offers. {RubiesImg()} offers are often not worth it, except you are
          looking for something particular. See {RubiesImg()} buying rules below the section.
        </div>
        <div>
          25 common {CardImg()} for 5k {GoldImg()}, because its worth 25 tokens, even if you do not
          get {ShardsImg()} like you would get for the {TokenImg()}
        </div>
        <div>
          If you see a single {CardImg(false)} for sell for less than 1k, is always a good deal.
        </div>
        <div>
          If you have any doubt about if a shop offer is worth buying, do not hesitate to ask in
          general chat, there always is some veteran player that can help you with that.
        </div>
      </fieldset>
    </div>
  );
}
