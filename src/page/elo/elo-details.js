import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBalanceScale, faBalanceScaleRight, faBalanceScaleLeft } from '@fortawesome/free-solid-svg-icons'

import { Line, CartesianGrid, XAxis, YAxis, LineChart, Tooltip, Legend } from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";



const renderCellFn = ({params, isUpGood, userData}) => {
  const currentRowPos = params.api.getRowIndex(params.row.date);
  const field = params.field;

  const isReferenceRow = currentRowPos === userData.length -1;
  if(isReferenceRow){
    return <div><FontAwesomeIcon icon={faEllipsisH} color="#222"/>{params.value}</div>;
  }
  const previousRowValue = userData[currentRowPos + 1][field];
  const isUnchanged = previousRowValue === params.value;
  if(isUnchanged){
    return <div><FontAwesomeIcon icon={faEllipsisH} color="#222"/>{params.value}</div>;
  }
  const isUpOtherwiseDown =  previousRowValue < params.value;
  const positive = isUpGood ? "red" : "green";
  const negative = isUpGood ? "green" : "red";
  return <div><FontAwesomeIcon icon={isUpOtherwiseDown ? faArrowUp : faArrowDown} color={isUpOtherwiseDown ? positive : negative}/> {params.value}</div>;
}

export function EloDetails() {
  const location = useLocation();
  const paramsObj = new URLSearchParams(location.search.substring(1));

  const [userData, setUserData] = useState([]);
  const [propsData, setPropsData] = useState([]);

  const fetchJSONDataFrom = useCallback(async (path) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();

    const dataReverted = [...data].reverse();
    setUserData(dataReverted);

    const allProps = Object.keys(data[0]).filter(prop => !["User_id", "Id", "date"].includes(prop));

    const allPropsEntries = allProps.map(propKey => {
      return (
        {
          propKey,
          data : data.map((usrDat) => ({
            value : usrDat[propKey],
            date :usrDat.date
          }))
        }
        )
    });
    setPropsData(allPropsEntries);
  }, []);

  useEffect( () => {
    fetchJSONDataFrom(`/generated/elo/details/${paramsObj.get("id")}.json`);
  }, [paramsObj.get("id")]);


  const columns = [
    {
      field: "date", headerName: "Date", width: "120"
    },
    {
      field: "overallRank", headerName: "Rank: Overall", width: "120",
      renderCell : (params) => renderCellFn({params, isUpGood : true, userData})
    },
    /*  {
        field: 'overallRankAbsolute', headerName: "Rank Sum / 3", width: "120"
      },*/
    {
      field: "Elo2v2SoloRank", headerName: "Rank: 2v2Solo", width: "120",
      renderCell : (params) => renderCellFn({params, isUpGood : true, userData})
    },
    {
      field: "Elo2v2TeamRank", headerName: "Rank: 2v2Team", width: "140",
      renderCell : (params) => renderCellFn({params, isUpGood : true, userData})
    },
    {
      field: "Elo1v1Rank", headerName: "Rank: 1v1",
      renderCell : (params) => renderCellFn({params, isUpGood : true, userData})
    },
    {
      field: "Elo2v2Solo", headerName: "Elo: 2v2Solo",
      renderCell : (params) => renderCellFn({params, isUpGood : false, userData})
    },
    {
      field: "Elo2v2Team", headerName: "Elo: 2v2Team",
      renderCell : (params) => renderCellFn({params, isUpGood : false, userData})
    },
    {
      field: "Elo1v1", headerName: "Elo: 1v1",
      renderCell : (params) => renderCellFn({params, isUpGood : false, userData})
    },
    {
      field: "id", headerName: "User_id",
      valueGetter: (params) => `${params.getValue(params.id, "User_id")}`
    }
  ];

  return <div>
    <a href="/elo">Back</a>
    <h2>Table view</h2>
    {/*
    <div style={{ display: "flex", height: "300px" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={13}
          rowsPerPageOptions={[5]}
          getRowId={(r) => r.date}
          onRowsScrollEnd
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
        />*/}
      </div>
    </div>
    <h2>Charts</h2>
    Type "by Elo-Score" or "by Elo-Score-Leaderboard-Rank".
    <div>Ending with "Rank" is your leaderboard position of all players based on your elo score.</div>

    {propsData.map(prop => (<div key={prop.propKey}>
        <h3>{prop.propKey}</h3>
        <LineChart width={600} height={300} data={prop.data}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']}  reversed={prop.propKey.includes("Rank")} />
        </LineChart>
      </div>
    ))}
  </div>;
}