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

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const task = { title, description, priority, completed };

    if (editingTask) {
      updateTask(editingTask._id, task);
    } else {
      addTask(task);
    }

    setTitle("");
    setDescription("");
    setPriority("medium");
    setCompleted(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {editingTask ? "Amend Work Order" : "New Work Order"}
      </h2>

      <form onSubmit={submitHandler} className="task-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="What needs doing..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Add the details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          Mark as completed
        </label>

        <button className="submit-btn">
          {editingTask ? "Update Order" : "File Order"}
        </button>
      </form>
    </div>
  );
}

export default Form;