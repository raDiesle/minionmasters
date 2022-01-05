import React from "react";
import elo from "../../generated/elo_all.json";
import css from "./elo.module.scss";
import orderBy from "lodash/orderBy";

export function Elo() {
  const normalized = elo.map(({ User_id, Id, Elo1v1, Elo2v2Team, Elo2v2Solo }) => ({
    User_id: parseInt(User_id),
    Id: parseInt(Id),
    Elo1v1: parseInt(Elo1v1),
    Elo2v2Team: parseInt(Elo2v2Team),
    Elo2v2Solo: parseInt(Elo2v2Solo)
  }));
  const sortedBy = orderBy(normalized, ["Elo2v2Team"], ["desc"]);
  return <div>
    ELO
    <div className={css.table}>
      {sortedBy.map(({ User_id, Id, Elo1v1, Elo2v2Team, Elo2v2Solo }, index) => (<ul key={Id}>
        <li>{index}</li>
        <li>{User_id}</li>
        <li>{Elo2v2Team}</li>
        <li>{Elo2v2Solo}</li>
        <li>{Elo1v1}</li>
      </ul>))}
    </div>
  </div>;
}