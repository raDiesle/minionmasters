import React, { useState, useEffect, useCallback, useMemo } from "react";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import { Link } from "react-router-dom";

import { ReactTable } from "page/elo/react-table";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import axios from "axios";
import { STORAGE_URL_PREFIX } from "page/elo/elo-config";

import { GoogleSheetTable } from "page/public-stats/card-stats-table";

export function EloRanking() {

  // const sortedBy = orderBy(normalized, ["Elo2v2Team"], ["desc"]);

  const [sortModel, setSortModel] = React.useState([{
    accessor: "username",
    sort: "asc"
  }]);

  const [statusData, setStatusData] = useState({ timeFetched: Date.now(), totalResultsSize: 0 });

  const [mappedPlayers, setMappedPlayers] = useState({});
  const [isIncludingInactivePlayers, setIsIncludingInactivePlayers] = useState(false);
  const [allEloData, setAllEloData] = useState([]);
  const [activeEloData, setActiveEloData] = useState([]);
  const selectedEloData = useMemo(() => isIncludingInactivePlayers ? allEloData : activeEloData, [isIncludingInactivePlayers, allEloData, activeEloData]);

  useEffect( () => {

    const init = async() => {
    const storage = getStorage();

    const url = await getDownloadURL(ref(storage, `${STORAGE_URL_PREFIX}status.json`));
    const { data : result } = await axios.get(url);
    setStatusData(result);

    var docRef = await db.collection("playermappings").get()
      .then(async (querySnapshot) => {
        const playersObject = {};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          playersObject[doc.id] = doc.data().username;
        });

        let url = await getDownloadURL(ref(storage, `${STORAGE_URL_PREFIX}active.json`));
        const { data : activeResult } = await axios.get(url);
        setActiveEloData(activeResult);

        url = await getDownloadURL(ref(storage, `${STORAGE_URL_PREFIX}all.json`));
        const { data : allResult } = await axios.get(url);
        setAllEloData(allResult);
        

        setMappedPlayers(playersObject);
        setSortModel([{
          accessor: "username",
          sort: "asc"
        }]);
      })
      .catch(dbErrorHandlerPromise);

    };
    init();
  }, []);


  const columns = React.useMemo(() => [
    {
      accessor: (row, i) => i,
      Header: "Order",
      width: "60"
    },
    {
      accessor: (row, i) => row.User_id,
      Header: "User_id",
      width: "70"
    },
    {
      accessor: (row, i) => mappedPlayers[row.User_id],
      Header: "Username",
      width: "200",
      // align: "left"
    },
    {
      accessor: (row, i) => mappedPlayers[row.User_id] + "_details", Header: "Details",
      Cell: ({ row: { values } }) => {
        return <div><Link
          to={`/elo?id=${values.User_id}`}>{mappedPlayers[values.User_id] ? "here" : " "}</Link></div>;
      }
      ,
      width: "55"
    },
    {
      Header: "Ranks by Elo",
      columns: [
        {
          accessor: "overallRank", Header: "Overall",
          width: "60"
        },
        {
          accessor: "Elo2v2SoloRank", Header: "2v2Solo", width: "60"
        },
        {
          accessor: "Elo2v2TeamRank", Header: "2v2Team", width: "65"
        },
        {
          accessor: "Elo1v1Rank", Header: "1v1", width: "60"
        }
      ]
    },
    {
      Header: "Elo points",
      columns: [

        {
          accessor: "Elo2v2Solo", Header: "2v2Solo"
        },
        {
          accessor: "Elo2v2Team", Header: "2v2Team"
        },
        {
          accessor: "Elo1v1", Header: "1v1",
          width: "65",
        }
      ]
    }
  ], [ mappedPlayers]);

  const timeDataWasUpdated = new Date(statusData.timeFetched).toLocaleString();
  return <div><h2>Elo Ranking</h2>
    <ul>
      <li>
        Latest game data update: <b>{timeDataWasUpdated}</b>
      </li>
      <li>
        Only players with <b> {'>'} 1800 elo</b> in any mode are listed = total of {statusData.totalResultsSize} players
      </li>
      <li>On this page, there is <b>no</b>leadership ranking visible like in game, but only about your Elo</li>
      <li>
        Default sorting is by users who registered username.
      </li>
      <li>
        <b>You can sort by the modes ranking by clicking on the columns.</b>
      </li>
      <li>
        You can search by your User_id or Username by clicking on the column.
      </li>
      <li>Data is quite big to load, so dont load by mobile phone</li>
    </ul>
    <div style={{width: "1020px"}}>

      <div>
        Columns:
        <ul>
          <li>Elo points: based on the Minionmasters new elo system. Updated every 24 hours. on every players page you can also read how to get hourly updated elo points.</li>
          <li>Ranks by Elo: position of players when sorted elo of players descending</li>
          <li>Overall: the sum of elo points of all modes</li>
          <li>Username: alias provided on this website by players</li>
          <li>Details: see historized data for every player with saved alias name upon from the point of time its provided with detailed charts</li>
        </ul>
      </div>
    <span style={{
      display: "inline-block",
      width: "12px",
    }}></span>
    Include inactive players:
    <span style={{
      display: "inline-block",
      width: "8px",
    }}></span>
    <input 
      type="checkbox" 
      id = "include_inactive_players"
      value={isIncludingInactivePlayers || false}
      onChange={e => {
        setIsIncludingInactivePlayers(e.target.checked);
        // onChange(e.target.value);
      }}
    ></input>

    <ReactTable
      columns={columns}
      data={selectedEloData}
      sortBy={[{ id: "Username", asc: true }]}
      minTableHeight={400}
    />
    </div>
  </div>
    ;
}