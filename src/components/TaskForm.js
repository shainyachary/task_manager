import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required");
      return;
    }
    const newTask = {
      id: generateId(), // Generate unique ID
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };
    addTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary px-4"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Task
        </button>

        <DarkModeToggle />
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header mb-2">
              <h5 className="modal-title" id="exampleModalLabel">
                Task Manager
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="task-form">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="mb-4 form-control"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="mb-4 form-control"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mb-4 form-control"
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mb-4 form-control"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div className="mb-4 text-center">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{ width: "200px" }}
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
