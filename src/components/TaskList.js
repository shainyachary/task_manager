import React, { useState } from "react";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, onSnooze }) => {
  const [openTaskId, setOpenTaskId] = useState(null);

  const handleHeaderClick = (taskId) => {
    setOpenTaskId(openTaskId === taskId ? null : taskId);
  };
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`d-flex flex-column gap-2 mb-3 task ${
            task.completed ? "completed" : ""
          }`}
        >
          <div
            className="d-flex gap-4 justify-content-between align-items-center"
            onClick={() => handleHeaderClick(task.id)}
            style={{ cursor: "pointer" }}
          >
            <p
              style={{
                fontSize: "17px",
                fontWeight: "700",
                textTransform: "capitalize",
                letterSpacing: "1px",
              }}
            >
              {task.title}
            </p>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color:
                    task.priority === "High"
                      ? "red"
                      : task.priority === "Medium"
                      ? "orange"
                      : "green",
                }}
              >
                {task.priority}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {task.dueDate || "No due date"}
              </p>
            </div>
          </div>
          {openTaskId === task.id && (
            <div
              style={{
                fontSize: "13px",
                textTransform: "capitalize",
                marginTop: "-1.2em",
              }}
            >
              <p>{task.description}</p>
              <div className="d-flex justify-content-center gap-2 mb-2">
                <button
                  style={{ fontSize: "13px" }}
                  className="border border-0 px-3 rounded-3 btn btn-primary"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>
                <button
                  style={{ fontSize: "13px" }}
                  className="border border-0 px-3 rounded-3 btn btn-danger"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
                <button
                  style={{ fontSize: "13px" }}
                  className="border border-0 px-3 rounded-3 btn btn-success"
                  onClick={() => onToggleComplete(task.id)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  style={{ fontSize: "13px" }}
                  className="border border-0 px-3 rounded-3 btn btn-warning text-white"
                  onClick={() => onSnooze(task.id)}
                >
                  Snooze
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
