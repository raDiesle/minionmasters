import { anchorLinkTarget } from "components/helper";
import { GoldImg, RubiesImg, ShardsImg } from "components/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
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
      <p>
        If you see for example 25 common cards for 5k gold, it is actually a nice deal since you'll
        have to get 25 tokens to get the same amount of cards.
      </p>
      <p>
        A token gives you a card AND shards and the shop offers only give you the cards (you get
        shards only if you get beyond 400 glory for a specific card), so going back to the previous
        example, if you get 25 tokens and you get 25 common cards you also get 75 shards, so it's
        still a very good deal.
      </p>
      In general, if you see a single card for sell for less than 1k, is always a good deal.
      <br />
      <br />
      However, this is only if we speak about gold, if we speak about rubies, things are a bit
      different, since they are harder to come by, so you should only spend them for something that
      is really good...
      <br />
      <br />
      If you have any doubt about if a shop offer is worth buying, do not hesitate to ask in general
      chat, there always is some veteran player that can help you with that.
    </div>
  );
}
