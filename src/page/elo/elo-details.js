import { useLocation } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { ReactTable } from "page/elo/react-table";
import { EloChart } from "page/elo/elo-chart";
import css from "./elo-details.module.scss";
import axios from "axios";
import { STORAGE_URL_PREFIX, FILTER_CURRENT_SEASON, FILTER_PREVIOUS_SEASON, FILTER_ALL } from "page/elo/elo-config";
import { ChartFilters } from "page/elo/chart-filters";
import * as classnames from "classnames";
import cssButton from "components/button.module.scss";

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



  const [filter, setFilter] = useState(FILTER_CURRENT_SEASON);

  useEffect(async() => {
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, `${STORAGE_URL_PREFIX}details/${paramsObj.get("id")}.json`));
    const { data } = await axios.get(url);

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
          accessor: "Elo2v2SoloRank", Header: "2v2 solo", width: "80",
          Cell: (params) => renderCellFn({ params, isUpGood: true, userData })
        },
        {
          accessor: "Elo2v2TeamRank", Header: "2v2 premade", width: "80",
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
          accessor: "Elo2v2Solo", Header: "2v2 solo", width: "80",
          Cell: (params) => renderCellFn({ params, isUpGood: false, userData })
        },
        {
          accessor: "Elo2v2Team", Header: "2v2 premade",
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

  const FILTER_CONFIG = {
    [FILTER_CURRENT_SEASON] : () => propsData.map(props => ({propKey: props.propKey, data : props.data.filter(({date}) => new Date(date).getTime() > new Date("2022-02-27") )})),
    [FILTER_PREVIOUS_SEASON] : () => propsData.map(props => ({propKey: props.propKey, data : props.data.filter(({date}) => new Date(date) < new Date("2022-02-20") )})),
    [FILTER_ALL] : () => propsData
  }

  const propsDataFiltered = FILTER_CONFIG[filter]();

  return <div>

    <a href="/elo"
       className={classnames(cssButton.ButtonInGroupStyle, cssButton.buttonSpacing, css.backButton)}
    >&lt; Back</a>

    <div>
      Right now, data is updated once per day. If you want hourly updated data, you can visit &nbsp;
      <a href="http://fdmfdm.nl/EloChecker.html">http://fdmfdm.nl/EloChecker.html</a>
    </div>

    <h2>Charts</h2>

    <ChartFilters {...{filter, setFilter}}/>

    <div className={css.chartsLayout}>
      <EloChart propKey="Elo2v2Solo" header="2v2 solo" propsData={propsDataFiltered}/>
      <EloChart propKey="Elo2v2Team" header="2v2 premade" propsData={propsDataFiltered}/>
      <EloChart propKey="Elo1v1" header="1v1" propsData={propsDataFiltered}/>
    </div>

    <h2>Table view</h2>
    <div style={{width: "728px"}}>
      <ReactTable
        columns={columns}
        data={userData}
        sortBy={[]}
        minTableHeight={200}
        hiddenColumns={["User_id"]}
      />
    </div>
  </div>;
}