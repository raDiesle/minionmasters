import React, { useState, useEffect } from "react";
import { db } from "mm-firestore";
import css from "page/elo/elo.module.scss";
import elo from "generated/elo_all.json";

export function EloRanking(){

  // const sortedBy = orderBy(normalized, ["Elo2v2Team"], ["desc"]);

  const [mappedPlayers, setMappedPlayers] = useState({});
  useEffect(() => {
    var docRef = db.collection("playermappings").get()
      .then((querySnapshot) => {
        const playersObject = {};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          playersObject[doc.id] = doc.data().username;
        });
        debugger;
        setMappedPlayers(playersObject);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);


  return <div> <h2>Elo Ranking, sorted by 2v2 Random</h2>
    To be done: see sorting by all modes.
    Count of mapped players: {mappedPlayers.length}
  <div className={css.table}>
    <ul>
      <li><b>Ranking</b></li>
      <li><b>Username</b></li>
      <li><b>User_id</b></li>
      <li><b>Elo2v2Team</b></li>
      <li><b>Elo2v2Solo</b></li>
      <li><b>Elo1v1</b></li>
    </ul>
    {elo.map(({ User_id, Id, Elo1v1, Elo2v2Team, Elo2v2Solo }, index) => (<ul key={Id}>
      <li>{index}</li>
      <li>{!mappedPlayers[User_id] ? <div>?</div> : <><div>{mappedPlayers[User_id]}</div><div><a href="#">see history (not implemented yet)</a></div></>} </li>
      <li>{User_id}</li>
      <li>{Elo2v2Team}</li>
      <li>{Elo2v2Solo}</li>
      <li>{Elo1v1}</li>
    </ul>))}
  </div>
  </div>;
}