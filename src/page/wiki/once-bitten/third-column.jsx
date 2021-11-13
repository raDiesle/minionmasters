import css from "page/wiki/once-bitten/once-bitten.module.scss";
import React from "react";
import { Card } from "page/deck-manager/build/cards/card/card";

export function ThirdColumn({surviveNoHit}){

  return  <div className={css.column}>
    <div className={css.noHitHeader}> Survives no hit</div>
    {surviveNoHit.map(card =>  <div key={card.iD}>
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