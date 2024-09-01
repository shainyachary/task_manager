import React, { useState, useEffect } from "react";

function TaskEdit({ task, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setPriority(task.priority || "Medium");
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      onSave({ ...task, title, description, dueDate, priority });
    }
  };

  if (!task) return null;

  return (
    <div className="edit-form">
      <input
        className="form-control my-2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control my-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="form-control my-2"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        className="form-control my-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="d-flex gap-3 justify-content-center my-3">
        <button className="px-4 btn btn-success" onClick={handleSave}>
          Save
        </button>
        <button className="px-4 btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TaskEdit;
