import React, { useState } from "react";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import mToast from "components/mToast";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";

import css from "./save-mapping.module.scss";

export function SaveMapping({isMappingMode, setIsMappingMode}){
  const [playerId, setPlayerId] = useState("");
  const [username, setUsername] = useState("");
  const handlePlayerId = (e) => {setPlayerId(e.currentTarget.value.trim())};
  const handleUsername = (e) => {setUsername(e.currentTarget.value.trim())};
  const handleSave = async () => {

    db.collection("playermappings").doc(playerId).get()
    .then(async (querySnapshot) => {
    
      if(querySnapshot.exists) {
        mToast("username for this id was already stored. If you are that person please contact admin.", 7000);
      }else{
        db.collection("playermappings").doc(playerId).set({ username }).then((docRef) => {
          mToast("Mapping is stored");
        })
        .catch(dbErrorHandlerPromise);
      }
    
      setIsMappingMode(false);  
    })
    .catch(dbErrorHandlerPromise);

  };

  return <div>
    <div>
      <h2>Register Mapping</h2>
      <div>Register a UserId to Username mapping:</div>
      <ul>
      <li>Visitors will see username in the list.</li>
      <li>All registered players, elo will be stored over time to compare in charts.</li>
        <li><b>HowTo:</b> </li> <li>1) Open the following directory in Windows Explorer:
%AppData%\..\LocalLow\BetaDwarf ApS\MinionMasters 
(Care with Discord fucking these paths since it uses some of the characters for formatting if you don't enclose in backticks `)
</li>2) <li>Here you will see your replay folder which is called "replays_123456" with 123456 being your player id.
</li>
      </ul>
      {!isMappingMode && <button
        className={classnames(cssButton.ButtonInGroupStyle, cssButton.buttonSpacing)}
        onClick={() => {
        setIsMappingMode(true);
      }}> <FontAwesomeIcon icon={faSave} /> Add a mapping</button>}

      {isMappingMode && <div className={css.form}>

        <input type="number" placeholder="UserId" onChange={(e) => handlePlayerId(e)} />


        <input type="text" placeholder="Username" onChange={(e) => handleUsername(e)} />


        <h3>You must be logged in to save it!</h3>
        <button type="button"
                className={classnames(cssButton.ButtonInGroupStyle, cssButton.buttonSpacing, css.saveButton)}
                onClick={() => handleSave()}> <FontAwesomeIcon icon={faSave} /> Save</button>

      </div>}
  </div>
  </div>;
}