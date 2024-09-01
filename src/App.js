import React, { useReducer, useCallback, useMemo, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskSearch from "./components/TaskSearch";
import TaskDashboard from "./components/TaskDashboard";
import TaskEdit from "./components/TaskEdit";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  searchQuery: "",
  editingTask: null,
  priorityFilter: "All",
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "EDIT_TASK":
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.updatedTask.id
          ? action.payload.updatedTask
          : task
      );
      return { ...state, tasks: updatedTasks, editingTask: null };
    case "TOGGLE_COMPLETE":
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      return { ...state, tasks: toggledTasks };
    case "SEARCH_TASK":
      return { ...state, searchQuery: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "SET_EDITING_TASK":
      return { ...state, editingTask: action.payload };
    case "SET_PRIORITY_FILTER":
      return { ...state, priorityFilter: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      dispatch({ type: "SET_TASKS", payload: savedTasks });
    }
  }, []);

  const addTask = useCallback(
    (task) => {
      // Check for duplicate task title
      if (state.tasks.some((t) => t.title === task.title)) {
        alert("Task title must be unique.");
        return;
      }
      dispatch({ type: "ADD_TASK", payload: task }); // Hide form after adding task
    },
    [state.tasks]
  );

  const deleteTask = useCallback((id) => {
    console.log(`Deleting task with ID: ${id}`);
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const editTask = useCallback((task) => {
    dispatch({ type: "SET_EDITING_TASK", payload: task });
  }, []);

  const saveTask = useCallback((updatedTask) => {
    dispatch({ type: "EDIT_TASK", payload: { updatedTask } });
  }, []);

  const cancelEdit = useCallback(() => {
    dispatch({ type: "SET_EDITING_TASK", payload: null });
  }, []);

  const toggleComplete = useCallback((id) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  }, []);

  const snoozeTask = useCallback(
    (id) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task || !task.dueDate) return;

      const newDueDate = new Date(task.dueDate);
      if (isNaN(newDueDate.getTime())) return;

      newDueDate.setDate(newDueDate.getDate() + 1);

      const updatedTask = {
        ...task,
        dueDate: newDueDate.toISOString().split("T")[0],
      };
      dispatch({ type: "EDIT_TASK", payload: { updatedTask } });
    },
    [state.tasks]
  );

  const onSearch = useCallback((query) => {
    dispatch({ type: "SEARCH_TASK", payload: query });
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const reorderedTasks = Array.from(state.tasks);
      const [removed] = reorderedTasks.splice(result.source.index, 1);
      reorderedTasks.splice(result.destination.index, 0, removed);
      dispatch({ type: "SET_TASKS", payload: reorderedTasks });
    },
    [state.tasks]
  );

  const filteredTasks = useMemo(() => {
    return state.tasks.filter(
      (task) =>
        (state.priorityFilter === "All" ||
          task.priority === state.priorityFilter) &&
        task.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.tasks, state.searchQuery, state.priorityFilter]);

  const handlePriorityFilterChange = (priority) => {
    dispatch({ type: "SET_PRIORITY_FILTER", payload: priority });
  };

  return (
    <div className="app">
      <TaskForm addTask={addTask} />
      <div className="my-4">
        <TaskSearch onSearch={onSearch} />
        <div className="filter-buttons d-flex justify-content-center my-3 gap-1">
          <button
            className="px-4 border border-0 rounded-pill text-white bg-dark"
            style={{ fontSize: "14px", fontWeight: "600" }}
            onClick={() => handlePriorityFilterChange("All")}
          >
            All
          </button>
          <button
            className="px-4 border border-0 rounded-pill text-white bg-dark"
            style={{ fontSize: "14px", fontWeight: "600" }}
            onClick={() => handlePriorityFilterChange("High")}
          >
            High
          </button>
          <button
            className="px-4 border border-0 rounded-pill text-white bg-dark"
            style={{ fontSize: "14px", fontWeight: "600" }}
            onClick={() => handlePriorityFilterChange("Medium")}
          >
            Medium
          </button>
          <button
            className="px-4 border border-0 rounded-pill text-white bg-dark"
            style={{ fontSize: "14px", fontWeight: "600" }}
            onClick={() => handlePriorityFilterChange("Low")}
          >
            Low
          </button>
        </div>
      </div>

      <TaskDashboard tasks={state.tasks} />
      {state.editingTask && (
        <TaskEdit
          task={state.editingTask}
          onSave={saveTask}
          onCancel={cancelEdit}
        />
      )}
      <TaskList
        tasks={filteredTasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
        onSnooze={snoozeTask}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}

export default App;
