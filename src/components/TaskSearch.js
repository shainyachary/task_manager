import React from "react";

function TaskSearch({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Tasks"
      onChange={(e) => onSearch(e.target.value)}
      className="border border-0 rounded-1 px-2 form-control"
      style={{ fontSize: ".8em" }}
    />
  );
}

export default TaskSearch;
