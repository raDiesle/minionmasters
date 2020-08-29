import { mastersMapping } from "page/deck-manager/build/masters/mastersMapping";
import React from "react";

export function MasterFilterInput({ masterFilter, setMasterFilter }) {
  return (
    <div>
      <label htmlFor="masterFilter">Master</label>
      <select
        name="masterFilter"
        onChange={(e) => setMasterFilter(e.currentTarget.value)}
        value={masterFilter}
        style={{ width: "100%" }}
      >
        <option value="">-</option>
        {Object.keys(mastersMapping).map((key) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
