import { CardStatsTable } from "./card-stats-table";
import { MasterStatsTable } from "./master-stats-table";
import { PerkStatsTable } from "./perk-stats-table";
import { fetchSheetMetaData } from "./fetch-google-sheet-data";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Link, useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";  // Optional default styling

import React, { useEffect, useState, useMemo } from "react";
import { getSeasonDates, getSeasonStartDate, timeDifferenceInDays } from "./stats-functions"
import { ROUTE_PATH_CARD_STATS, ROUTE_PATH_MASTER_STATS } from "./public-stats-config"
import { API_KEY, SHEET_ID } from "./public-stats-config";



export function PublicStats() {
  
  // return <CardStatsTable/>
  const SHEET_LINK = "https://docs.google.com/spreadsheets/d/1FtctI6HWI6aKIBZQ-uCtWrQwKXEIfXNh55EAU4DWWGQ"
  const PAGE_TABS_CONFIG = [
    ROUTE_PATH_CARD_STATS,
    ROUTE_PATH_MASTER_STATS,
  ];

  const initialSelectedTab = PAGE_TABS_CONFIG.findIndex((tab) => tab === window.location.pathname);
  const [selectedTabIndex, setSelectedTabIndex] = useState(initialSelectedTab);

  const [modifiedTime, setModifiedTime] = useState(null);
  const [showPlayrates, setShowPlayrates] = useState(false);
  const [seasonStartDates, setSeasonStartDates] = useState([new Date()]);
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const modifiedTime = await fetchSheetMetaData(SHEET_ID, API_KEY);
          setModifiedTime(modifiedTime);
        } catch (error) {
          console.error('Network or Fetch Error:', error);
          setModifiedTime(null);
        }
        try {
          const seasonData = await getSeasonDates();
          setSeasonStartDates(seasonData);
        }
        catch (error) {
          console.error('Error loading season start date:', error);
        }
      };
      fetchData();
  }, []);

  const modifiedDate = new Date(modifiedTime)

  return(
    <>
      <Tabs selectedIndex={selectedTabIndex} onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}>
        <TabList>
          <Tab>
            <Link to={ROUTE_PATH_CARD_STATS}>Card Stats</Link>
          </Tab>
          <Tab>
            <Link to={ROUTE_PATH_MASTER_STATS}>Master Stats</Link>
          </Tab>
        </TabList>
        <TabPanel>
          <CardStatsTable
            showPlayrates= {showPlayrates}
          />
        </TabPanel>
        <TabPanel>
          <MasterStatsTable
            showPlayrates= {showPlayrates}
          />
        </TabPanel> 
      </Tabs>
      
      <div  style={{marginLeft: 2 + 'em'}}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>      
            {(modifiedDate < getSeasonStartDate(new Date())) ? 
              <div  style={{ color: 'yellow' }}>NOT from the current season!</div> : 
              <div  style={{ color: 'lime' }}>Up to date!</div>}
          </span>
          
          <span>
            Show Playrates:
            <span style = {{display: "inline-block", width: "8px"}}/>
            <input 
              type="checkbox"
              checked={showPlayrates}
              onChange={e => setShowPlayrates(e.target.checked)}
              style={{ transform: 'scale(1.25)', transformOrigin: 'center' }}
            />
            <span style = {{display: "inline-block", width: "16px"}}/>
          </span>

          
        </div>
        Data is from <a href={SHEET_LINK}>this spreadsheet</a>.
        <br/>
        Last Update: <b>{modifiedDate.toLocaleDateString()}</b> 
        {" - " + timeDifferenceInDays(getSeasonStartDate(modifiedDate, seasonStartDates), modifiedDate) + " days since Season start."}
      </div>
    </>
  );

}