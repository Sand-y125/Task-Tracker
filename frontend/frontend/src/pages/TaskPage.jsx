// pages/TaskPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../components/Form";
import Model from "../components/Model";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      await axios.post("http://localhost:5000/task", task);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/task/${id}`, updatedTask);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/task/${selectedTaskId}`);
      setIsModalOpen(false);
      setSelectedTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const highPriority = tasks.filter((task) => task.priority === "high").length;

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <p className="eyebrow">Dispatch Desk</p>
          <h2 className="page-title">Task Log</h2>
        </div>

        <div className="dashboard">
          <div className="card"><h3>{totalTasks}</h3><p>Total Orders</p></div>
          <div className="card"><h3>{completedTasks}</h3><p>Completed</p></div>
          <div className="card"><h3>{pendingTasks}</h3><p>Pending</p></div>
          <div className="card"><h3>{highPriority}</h3><p>High Priority</p></div>
        </div>

        <input
          className="search-bar"
          type="text"
          placeholder="Find a work order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Form
          addTask={addTask}
          updateTask={updateTask}
          editingTask={editingTask}
        />

        {filteredTasks.length === 0 ? (
          <p className="empty-state">No work orders on file.</p>
        ) : (
          filteredTasks.map((task, index) => (
            <div className="task-card" key={task._id}>

              <span className="ticket-id">#{String(index + 1).padStart(3, "0")}</span>

              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <p className="meta-row">
  <strong>Priority</strong>
  <span className={`badge ${task.priority}`}>{task.priority}</span>
</p>

<p className="meta-row">
  <strong>Status</strong>
  {task.completed ? "Complete" : "Pending"}
</p>

              <div className="button-group">
                <button className="edit-btn" onClick={() => setEditingTask(task)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setSelectedTaskId(task._id);
                    setIsModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}

       <Model
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onConfirm={deleteTask}
  title="Delete Task"
>
  <p>This action can't be undone. Confirm you want to delete this task.</p>
</Model>

      </div>
    </div>
  );
}

export default TaskPage;