// components/Form.jsx
import { useState, useEffect } from "react";

function Form({ addTask, updateTask, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setCompleted(editingTask.completed);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCompleted(false);
    }
  }, [editingTask]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const task = { title, description, priority, completed };

    try {
      if (editingTask) {
        await updateTask(editingTask._id, task);
      } else {
        await addTask(task);
      }

      setTitle("");
      setDescription("");
      setPriority("medium");
      setCompleted(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <form onSubmit={submitHandler} className="task-form">
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>

        <button type="submit" className="submit-btn">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default Form;