import React from "react";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, onSnooze }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate || "No due date"}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => onSnooze(task.id)}>Snooze</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
