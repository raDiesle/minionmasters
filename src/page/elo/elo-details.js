import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faBalanceScaleRight, faBalanceScaleLeft } from "@fortawesome/free-solid-svg-icons";

import { Line, CartesianGrid, XAxis, YAxis, LineChart, Tooltip, Legend } from "recharts";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { ReactTable } from "page/elo/react-table";
import { EloChart } from "page/elo/elo-chart";


const renderCellFn = ({ params, isUpGood, userData }) => {
  const currentRowPos = params.row.index;
  const field = params.column.id;

  const isReferenceRow = currentRowPos === params.rows.length - 1;
  if (isReferenceRow) {
    return <div><FontAwesomeIcon icon={faEllipsisH} color="#222" />{params.value}</div>;
  }
  const previousRowValue = userData[currentRowPos + 1][field];
  const isUnchanged = previousRowValue === params.value;
  if (isUnchanged) {
    return <div><FontAwesomeIcon icon={faEllipsisH} color="#222" />{params.value}</div>;
  }
  const isUpOtherwiseDown = previousRowValue < params.value;
  const positive = isUpGood ? "red" : "green";
  const negative = isUpGood ? "green" : "red";
  return <div><FontAwesomeIcon icon={isUpOtherwiseDown ? faArrowUp : faArrowDown}
                               color={isUpOtherwiseDown ? positive : negative} /> {params.value}</div>;
};

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

    const dataReverse = [...data].reverse();
    setUserData(dataReverse);
    const allProps = Object.keys(data[0]).filter(prop => !["User_id", "Id", "date"].includes(prop));

    const allPropsEntries = allProps.map(propKey => {
      return (
        {
          propKey,
          data: data.map((usrDat) => ({
            value: usrDat[propKey],
            date: usrDat.date
          }))
        }
      );
    });
    setPropsData(allPropsEntries);
  }, []);

  useEffect(() => {
    fetchJSONDataFrom(`/generated/elo/details/${paramsObj.get("id")}.json`);
  }, [paramsObj.get("id")]);


  const columns = [
    {
      accessor: "date", Header: "Date", width: "70"
    },
    {
      Header: "Ranks by Elo",
      columns: [
        {
          accessor: "overallRank", Header: "Overall", width: "80",
          Cell: (params) => renderCellFn({ params, isUpGood: true, userData })
        },
        /*  {
            accessor: 'overallRankAbsolute', Header: "Rank Sum / 3", width: "120"
          },*/
        {
          accessor: "Elo2v2SoloRank", Header: "2v2Solo", width: "80",
          Cell: (params) => renderCellFn({ params, isUpGood: true, userData })
        },
        {
          accessor: "Elo2v2TeamRank", Header: "2v2Team", width: "80",
          Cell: (params) => renderCellFn({ params, isUpGood: true, userData })
        },
        {
          accessor: "Elo1v1Rank", Header: "1v1", width: "80",
          Cell: (params) => renderCellFn({ params, isUpGood: true, userData })
        }]
    },
    {
      Header: "Elo points"
      ,
      columns: [
        {
          accessor: "Elo2v2Solo", Header: "2v2Solo", width: "80",
          Cell: (params) => renderCellFn({ params, isUpGood: false, userData })
        },
        {
          accessor: "Elo2v2Team", Header: "2v2Team",
          width: "80",
          Cell: (row) => {
            return renderCellFn({ params: row, isUpGood: false, userData });
          }
        },
        {
          accessor: "Elo1v1", Header: "1v1",
          Cell: (params) => renderCellFn({ params, isUpGood: false, userData })
        }]
    },
    {
      accessor: "User_id", Header: "User_id", width: "80", isVisible: false
    }
  ];


  return <div>
    <a href="/elo">Back</a>
    <h2>Table view</h2>
    <ReactTable
      columns={columns}
      data={userData}
      sortBy={[]}
      minTableHeight={200}
      hiddenColumns={["User_id"]}
    />

    <h2>Charts</h2>

    <EloChart propKey="Elo2v2Solo" header="2 vs.2 Random" propsData={propsData}/>

    <EloChart propKey="Elo2v2Team" header="2 vs.2 Premade" propsData={propsData}/>

    <EloChart propKey="Elo1v1" header="1 vs.1" propsData={propsData}/>

  </div>;
}