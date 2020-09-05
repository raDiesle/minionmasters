import React from "react";

export function CreatedByDisplayInput({
  createdByFilterOptions,
  createdByFilter,
  setCreatedByFilter,
}) {
  return (
    <div>
      <label htmlFor="createdByDisplay">Author</label>
      <select
        name="createdByDisplay"
        value={createdByFilter}
        onChange={(event) => setCreatedByFilter(event.target.value)}
      >
        <option value="">-</option>
        {createdByFilterOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
