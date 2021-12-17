import React from "react";
import classNames from "classnames";
import css from "page/wiki/once-bitten/once-bitten.module.scss";
import { Card } from "page/deck-manager/build/cards/card/card";

export function SurvivesNoHitColumn({minions}){

  return  <div className={css.column}>
    <div className={classNames(css.noHitHeader, css.headerOfOtherColumns)}> Survives no hit</div>
    {minions.map(({card}) =>  <div key={card.iD}>
        <Card
          card={card}
          isShowDetailsOnCard={false}
          isShowNamesOnCards={false}
        >
        </Card>
      </div>
    )}
  </div>
}