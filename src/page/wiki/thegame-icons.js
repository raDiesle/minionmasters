import CardIcon from "page/wiki/card-icon";
import Tooltip from "rc-tooltip";
import React from "react";

export const GoldImg = () => (
  <Tooltip placement="topLeft" overlay={<span>Gold</span>}>
    <span>
      <img src="/img/basics/resource_gold.png" alt="resource_gold" width={25} />
      Gold
    </span>
  </Tooltip>
);

export const ShardsImg = (isPlural = true) => (
  <span>
    <img src="/img/basics/resource_shards.png" alt="resource_shards" width={15} />
    Shard{isPlural && "s"}
  </span>
);

export const TokenImg = (isPlural = true) => (
  <span>
    <img src="/img/basics/resource_token.png" alt="power_token" width={17} />
    Power Token{isPlural && "s"}
  </span>
);

export const CardImg = (isPlural = true) => (
  <span>
    <CardIcon />
    Card{isPlural && "s"}
  </span>
);

export const RubiesImg = (isPlural = true) => (
  <span>
    <img src="/img/basics/resource_rubies.png" alt="rubies" width={27} />
    Rubie{isPlural && "s"}
  </span>
);
