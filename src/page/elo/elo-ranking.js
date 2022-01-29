import React, { useState, useEffect, useCallback } from "react";
import { db, dbErrorHandlerPromise } from "mm-firestore";
import { Link } from "react-router-dom";

import { ReactTable } from "page/elo/react-table";


export function EloRanking() {

  // const sortedBy = orderBy(normalized, ["Elo2v2Team"], ["desc"]);

  const fetchJSONDataFrom = useCallback(async (path) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();
    return data;
  });

  const [sortModel, setSortModel] = React.useState([{
    accessor: "username",
    sort: "desc"
  }]);

  const [statusData, setStatusData] = useState({ timeFetched: Date.now(), totalResultsSize: 0 });

  const [mappedPlayers, setMappedPlayers] = useState({});
  const [allEloData, setAllEloData] = useState([]);
  useEffect(async () => {
    console.log("fetching data");

    const  result = await import(`./../../generated/elo/status.json`);
    setStatusData(result.default);

    var docRef = db.collection("playermappings").get()
      .then(async (querySnapshot) => {
        const playersObject = {};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          playersObject[doc.id] = doc.data().username;
        });

        const result = await import(`./../../generated/elo/all.json`);
        setAllEloData(result.default);
        setMappedPlayers(playersObject);
        setSortModel([{
          accessor: "username",
          sort: "desc"
        }]);
      })
      .catch(dbErrorHandlerPromise);
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
      width: "150"
    },
    {
      accessor: (row, i) => mappedPlayers[row.User_id] + "_details", Header: "Details",
      Cell: ({ row: { values } }) => {
        return <div><Link
          to={`/elo?id=${values.User_id}`}>{mappedPlayers[values.User_id] ? "here" : " "}</Link></div>;
      }
      ,
      width: "50"
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
      Header: "Elo points"
      ,
      columns: [

        {
          accessor: "Elo2v2Solo", Header: "2v2Solo"
        },
        {
          accessor: "Elo2v2Team", Header: "2v2Team"
        },
        {
          accessor: "Elo1v1", Header: "1v1",
          width: "70"
        }
      ]
    }
  ], [allEloData, mappedPlayers]);

  const timeDataWasUpdated = new Date(statusData.timeFetched).toLocaleString();
  return <div><h2>Elo Ranking</h2>
    <ul>
      <li>
        Latest game data update: <b>{timeDataWasUpdated}</b>
      </li>
      <li>
        Only players with <b> > 1800 elo</b> in any mode are listed = total of {statusData.totalResultsSize} players
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
      <li>Already mapped players = {Object.values(mappedPlayers).join(", ")}</li>
      <li>Data is quite big to load, so dont load by mobile phone</li>
    </ul>
    <ReactTable
      columns={columns}
      data={allEloData}
      sortBy={[{ id: "Username", desc: true }]}
      minTableHeight={400}
    />
  </div>
    ;
}