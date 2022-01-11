import React, { useState, useEffect, useCallback } from "react";
import { db, dbErrorHandlerPromise } from "mm-firestore";

import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

// must stay here
import css from "./elo.module.scss";

const useStyles = makeStyles({
  root: {
    color: "green",
    "& .styledrows": {
      backgroundColor:  ["green", "!important"]
    },
    MuiSvgIcon: {
      htmlColor: ["green", "!important"],
    }
  }
});

export function EloRanking() {
  const classes = useStyles();
  // const sortedBy = orderBy(normalized, ["Elo2v2Team"], ["desc"]);

  const fetchJSONDataFrom = useCallback(async (path) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();
    setElo(data);
  });

  const [mappedPlayers, setMappedPlayers] = useState({});
  const [elo, setElo] = useState([]);
  useEffect(() => {
    console.log("fetching data");
    var docRef = db.collection("playermappings").get()
      .then((querySnapshot) => {

        const playersObject = {};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          playersObject[doc.id] = doc.data().username;
        });

        fetchJSONDataFrom(`/generated/elo/all.json`).then((data) => {
          setMappedPlayers(playersObject);
        });
      })
      .catch(dbErrorHandlerPromise);
  }, []);

  const columns = [
    {
      field: "placement", headerName: "Order",
      valueGetter: (params) => {
        return `${params.api.getRowIndex(params.row.User_id) + 1}`;
      },
      width: "55"
    },
    {
      field: "overallRank", headerName: "Elo Rank: Overall",
      width: "110"
    },
    /*  {
        field: 'overallRankAbsolute', headerName: "Rank Sum / 3", width: "120"
      },*/
    {
      field: "username", headerName: "Username",
      valueGetter: (params) => mappedPlayers[params.id],
      width: "120"
    },
    {
      field: "details", headerName: "Details",
      valueGetter: (params) => mappedPlayers[params.id],
      renderCell: (params) => <div><Link to={`/elo?id=${params.id}`} >{mappedPlayers[params.id] ? "here" : " "}</Link> </div>,
      width: "60"
    },
    {
      field: "Elo2v2SoloRank", headerName: "Elo Rank: 2v2Solo", width: "120"
    },
    {
      field: "Elo2v2TeamRank", headerName: "Elo Rank: 2v2Team", width: "140"
    },
    {
      field: "Elo1v1Rank", headerName: "Elo Rank: 1v1"
    },
    {
      field: "Elo2v2Solo", headerName: "Elo: 2v2Solo"
    },
    {
      field: "Elo2v2Team", headerName: "Elo: 2v2Team"
    },
    {
      field: "Elo1v1", headerName: "Elo: 1v1",
      width: "70"
    },
    {
      field: "id", headerName: "User_id",
      valueGetter: (params) => params.row.User_id
    },
  ];

  return <div><h2>Elo Ranking</h2>
    <ul>
<li>
  The data are up-to-date whenever FdmFdm updates data: <b>Last Update: 01.10.2022</b>
</li>
      <li>
        Only players with <b> > 1800 elo</b> (around 1000 points in game) in any mode are listed = total of {elo.length} players
      </li>
      <li>On this page, there is <b>no</b>leadership ranking visible like in game, but only about your Elo</li>
      <li>
        Default sorting is by overall ranking by elo.
      </li>
      <li>
        You can sort by the modes ranking by clicking on the columns.
      </li>
      <li>
        You can search by your User_id or Username by clicking on the column.
      </li>
      <li>Already mapped players = {Object.values(mappedPlayers).join(", ")}</li>
      <li>Data is quite big to load, so dont load by mobile phone</li>
    </ul>
    <div style={{ display: "flex", height: "800px" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={elo}
          columns={columns}
          pageSize={13}
          rowsPerPageOptions={[5]}
          getRowId={(r) => r.User_id}
          onRowsScrollEnd
          className={classes.root}
          sx={{
            color: "white"
          }}
          componentsProps={{
            pagination: {
              color: "white",
              SelectProps: {
                MenuProps: {
                  sx: {
                    color: "red",
                    "& .MuiMenuItem-root": {
                      fontSize: 30
                    }
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  </div>
    ;
}