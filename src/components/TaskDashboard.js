import React from "react";

function TaskDashboard({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && !task.completed
  ).length;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Overdue Tasks: {overdueTasks}</p>
    </div>
  );
}

export default TaskDashboard;
