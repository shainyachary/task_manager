import React from "react";

function TaskDashboard({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="dashboard mt-4">
      <h2 style={{ fontSize: "16px", fontWeight: "bolder" }}>Dashboard</h2>
      <div className="d-flex gap-3 text-center">
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>
          Total Tasks: {totalTasks}
        </p>
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>
          Completed Tasks: {completedTasks}
        </p>
      </div>
    </div>
  );
}

export default TaskDashboard;
