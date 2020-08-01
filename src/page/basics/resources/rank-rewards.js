import classNames from "classnames";
import { anchorLinkTarget } from "components/helper";
import { MENU_LINKS_CONFIG } from "page/basics/resource-mgmt";
import React from "react";

import css from "./rank-rewards.module.scss";

export default function RankRewards() {
  const rankRewardConfig = [
    {
      key: "Wood",
      reward: <>Nothing</>,
      downgrade: "Wood",
    },
    {
      key: "Stone",
      reward: <>50 Shards</>,
      downgrade: "Wood",
    },
    {
      key: "Bronze",
      reward: <>75 Rubies</>,
      downgrade: "Stone",
    },
    {
      key: "Silver",
      reward: <>1000 Gold</>,
      downgrade: "Stone",
    },
    {
      key: "Gold",
      reward: <>75 Shards</>,
      downgrade: "Bronze",
    },
    {
      key: "Platinum",
      reward: <>1200 Gold</>,
      downgrade: "Bronze",
    },
    {
      key: "Diamond",
      reward: <>100 Rubies</>,
      downgrade: "Silver",
    },
    {
      key: "Master",
      reward: <>1500 Gold</>,
      downgrade: "Silver",
    },
    {
      key: "Grandmaster",
      reward: <>150 Rubies</>,
      downgrade: "Silver",
    },
  ];

  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Rank Rewards"])}
      This rewards can be obtained multiple times by ranking up in multiple game modes. To get the
      highest rewards each month, you need to get to grandmaster in solo, team battle and premade
      team battle. This way you will get more than 1k rubies every month! After the end of a season
      you will be deranked according to table below. You can get the rewards all over again, plus an
      additional reward based on your previous season rank. The monthly reward is equal to all the
      rewards from wood to your <u>NEW</u> rank. So if you want to gain the most from the game,
      you'll need to reach at least tier 100 in the season and possibly reach Grand Master rank in
      all the game modes each season.
      <div className={classNames(css.table)}>
        <div>Rank</div>
        <div>Reward</div>
        <div>Downgrade</div>
        {rankRewardConfig.map(({ key, reward, downgrade }) => (
          <React.Fragment key={key}>
            <div>
              <b>{key}</b>
              <img src={`img/basics/rank_${key.toLowerCase()}.png`} alt={key} />
            </div>
            <div>{reward}</div>
            <img src={`img/basics/rank_${downgrade.toLowerCase()}.png`} alt={downgrade} />
          </React.Fragment>
        ))}
      </div>
      <div className="subSection detailBox" id={2894044}>
        <div className="subSectionDesc">
          The ranks are:
          <br />
          Wood &gt; Stone &gt; Bronze &gt; Silver &gt; Gold &gt; Platinum &gt; Diamond &gt; Master
          &gt; Grand Master
          <br />
          <br />
          Everytime you win you gain points to get to the next rank, losing however decrease your
          points and eventually your rank (once you reach Grand Master, you won't be demoted
          anymore). Winning more times on a row, also grants bonus points!
          <br />
          <br />
          Raising your rank provides you with increasing rewards, but beware! Ranks reset at the end
          of every month and the reset rewards you based on how high you got.
          <br />
          <br />
          Very often people ask what's a good rank, the answer is: before platinum is just a
          warm-up, from platinum you start to play seriously, so don't get too cocky if at the
          beginning you never lose... <div style={{ clear: "both" }} />
        </div>
      </div>
    </div>
  );
}
