import React from "react";

function TaskItem({ task, onEdit, onDelete, onToggleComplete, onSnooze }) {
  if (!task) return null;

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onToggleComplete(task.id)}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => onSnooze(task.id)}>Snooze</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
