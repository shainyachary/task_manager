import React from "react";

function TaskSearch({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Tasks"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default TaskSearch;
