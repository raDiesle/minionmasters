import React from "react";
import { ReactTable } from "page/elo/react-table";


import { imgPathFn } from "components/helper";
import css from "./cards-table.module.scss";
import {
  CardAttackSpeed,
  CardRadius,
  CardDamage,
  cardSingleDps,
  cardTotalDps,
  CardFlying,
  CardRarity,
  CardTypeIcon,
  CardTargetsIcon,
  CardAttackDelay,
  cardRange
} from "page/card-modal/helper/card-properties-helper";
import { factionMapping } from "components/faction/factions-mapping-config";
import { isUndefined } from "lodash";

export function CardsTable({ cards }) {
  return (
    <ReactTable
      columns={[
        {
          accessor: "imageName",
          Header: "",
          width: "30",
          Cell: ({ value }) => <img className={css.cardImage} src={imgPathFn(value)} alt={value} />
        },
        {
          accessor: "name",
          Header: "name",
          width: "180",
        },
        {
          accessor: "manacost",
          Header: "Mana",
          width: "30",
        },
        {
          accessor: "CardCount",
          Header: "Wildcards",
          width: "30",
        },
        {
          accessor: "Faction",
          Header: "Faction",
          width: "30",
          Cell: ({value}) => <>{factionMapping[value]}</>
        },
        {
          accessor: "type",
          Header: "Type",
          width: "30",
          Cell: ({value}) => <CardTypeIcon type={value} />
        },
        {
          accessor: "count",
          Header: "Count",
          width: "25",
        },
        {
          accessor: "targets",
          Header: "Targets",
          width: "30",
          Cell: ({value}) => <CardTargetsIcon targets={value} />
        },
        {
          accessor: "health",
          Header: "Health",
          width: "40",
        },
        {
          accessor: "attackspeed",
          Header: "AttackSpeed",
          width: "40",
          Cell: ({value}) => <CardAttackSpeed attackspeed={value} />
        },
        {
          accessor: "attackDelay",
          Header: "AttackDelay",
          width: "35",
          Cell: ({value}) => <CardAttackDelay attackDelay={value} />
        },
        {
          accessor: "radius",
          Header: "AttackRadius",
          width: "30",
          Cell: ({value}) => <CardRadius radius={value} />
        },
        {
          accessor: "damage",
          Header: "Damage",
          width: "35",
          Cell: ({value}) => <CardDamage damage={value} />
        },
        {
          accessor:  ({ damage, attackspeed }, i) => cardSingleDps({damage, attackspeed}),
          Header: "SingleDps",
          width: "40",
        },
        {
          accessor:  ({ damage, attackspeed, count }, i) => cardTotalDps({damage, attackspeed, count}),
          Header: "TotalDps",
          width: "40",
        },
        {
          accessor: ({range}) => cardRange({range}),
          Header: "Range",
          width: "30",
        },
        {
          accessor:  "speed",
          Header: "Speed",
          width: "30",
        },
        {
          accessor: ({ flying }) => flying === true ? 0 : 1,
          Header: "Flying",
          width: "20",
          Cell: ({value}) => <CardFlying flying={value} />
        },
        {
          accessor:  ({Weight}) => !isUndefined(Weight) ? Weight / 100 : null,
          Header: "Weight",
          width: "30",
        },
        {
          accessor: "rarity",
          Header: "Rarity",
          width: "70",
          Cell: ({value}) => <CardRarity rarity={value} />
        },
      ]}
      data={cards}
      minTableHeight={1000}
      sortBy={[{ id: "manacost", desc: true }]}
    />
  );
}
