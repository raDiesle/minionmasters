import React from "react";
import { FILTER_CURRENT_SEASON, FILTER_PREVIOUS_SEASON, FILTER_ALL } from "page/elo/elo-config";

import css from "./chart-filters.module.scss";

export function ChartFilters({filter, setFilter}){

  return     <div className={css.container}>
    <form>
    <label htmlFor="filter"></label>
    <select
      name="filter"
      onChange={(e) => setFilter(e.currentTarget.value)}
      value={filter}
      style={{ width: "100%" }}
    >
      <option value={FILTER_CURRENT_SEASON}>Current Season</option>
      <option value={FILTER_PREVIOUS_SEASON}>Previous Season</option>
      <option value={FILTER_ALL}>All data</option>
    </select>
    </form>
  </div>
}