import React from "react";
import { FILTER_CURRENT_SEASON, FILTER_PREVIOUS_SEASON, FILTER_ALL } from "page/elo/elo-config";

import css from "./chart-filters.module.scss";

export function ChartFilters({filter, setFilter, isBiggerCharts, setIsBiggerCharts}){

  return     <div className={css.container}>
    <form>

      <div className={css.row}>
        <div>
        <label htmlFor="filter"></label>
        <select
          name="filter"
          onChange={(e) => setFilter(e.currentTarget.value)}
          value={filter}
          style={{ width: "200px" }}
        >
          <option value={FILTER_CURRENT_SEASON}>Current Season</option>
          <option value={FILTER_PREVIOUS_SEASON}>Previous Season</option>
          <option value={FILTER_ALL}>All data</option>
        </select>
        </div>

        <div>
      <input
        type="checkbox"
        id="biggerChartView"
        name="biggerChartView"
        style={{ minWidth: "unset" }}
        value={isBiggerCharts}
        onChange={() => setIsBiggerCharts((prevIsToggle) => !prevIsToggle)}
      />
      </div>
      <div style={{width: "200px"}}>Bigger Charts View</div>

      </div>
    </form>
  </div>
}