import React from "react";
import { anchorLinkTarget } from "components/helper";
import { CardImg, GoldImg, RubiesImg, ShardsImg, TokenImg } from "components/thegame-icons";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";

export default function Resources() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Resources"])}
      <div>
        <fieldset>
          <legend>Gold</legend>
          {GoldImg()} is very important since it's your primary source of {ShardsImg()} and{" "}
          {CardImg()}. Spend this in the shop on good offers or to get {TokenImg()}.
        </fieldset>
        <fieldset>
          <legend>Shards</legend>
          {ShardsImg()} are extremely important since with this you can craft cards. You shouldn't
          haste in spending shards since they are not easy to come by, spend them only to craft
          (=add to your inventory) cards you really need, and start upgrading cards only when you
          are sure you don't need any other card.
        </fieldset>
        <fieldset>
          <legend>Rubies</legend>
          {RubiesImg()} are the most precious resource you have, you can rarely obtain it as a
          reward, and they can be bought for real money. With rubies you can buy stuff that with
          time can be obtained anyway. So how to get rubies is a personal choice based on if you
          have more time or money available. Just remember that even if you can buy enough rubies to
          get all the cards and masters. It can be done with about 200€ if bought wisely.
          <div>
            Especially when new to game, this likely will not you any advantage in the game: in fact
            the more stuff you have, the more will be complicated to make a decent deck since you'll
            have too many options and not enough knowledge of the game to make a good choice.
          </div>
        </fieldset>
      </div>
    </div>
  );
}
