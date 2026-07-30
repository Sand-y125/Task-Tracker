import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";
import Model from "../components/Model";
const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL =", API_URL);
function TaskPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/task`);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/task`, taskData);
      console.log("Task created:", response.data);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/task/${id}`, updatedTask);
      console.log("Task updated:", response.data);
      setEditingTask(null);
      setIsAddModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete(`${API_URL}/task/${selectedTaskId}`);
      console.log("Task deleted:", response.data);
      setSelectedTaskId(null);
      setIsDeleteModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error);
    }
  };

  // ===========================
  // Logout
  // ===========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
          <div>
            <p className="eyebrow">Dispatch Desk</p>
            <h2 className="page-title">Task Log</h2>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        <div className="dashboard">
          <div className="card">
            <h3>{totalTasks}</h3>
            <p>Total Orders</p>
          </div>

          <div className="card">
            <h3>{completedTasks}</h3>
            <p>Completed</p>
          </div>

          <div className="card">
            <h3>{pendingTasks}</h3>
            <p>Pending</p>
          </div>

          <div className="card">
            <h3>{highPriority}</h3>
            <p>High Priority</p>
          </div>
        </div>

        <input
          className="search-bar"
          type="text"
          placeholder="Find a work order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={() => {
            setEditingTask(null);
            setIsAddModalOpen(true);
          }}
        >
          + Add Task
        </button>

        <br />
        <br />

        {filteredTasks.length === 0 ? (
          <p className="empty-state">No work orders on file.</p>
        ) : (
          filteredTasks.map((task, index) => (
            <div className="task-card" key={task._id}>
              <span className="ticket-id">
                #{String(index + 1).padStart(3, "0")}
              </span>

              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <p className="meta-row">
                <strong>Priority</strong>
                <span className={`badge ${task.priority}`}>{task.priority}</span>
              </p>

              <p className="meta-row">
                <strong>Status</strong>
                {task.completed ? " Complete" : " Pending"}
              </p>

              <div className="button-group">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingTask(task);
                    setIsAddModalOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    setSelectedTaskId(task._id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        <Model
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingTask(null);
          }}
          title={editingTask ? "Edit Task" : "Add New Task"}
        >
          <Form
            addTask={async (task) => {
              await addTask(task);
              setIsAddModalOpen(false);
            }}
            updateTask={async (id, task) => {
              await updateTask(id, task);
              setIsAddModalOpen(false);
            }}
            editingTask={editingTask}
          />
        </Model>

        <Model
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteTask}
          title="Delete Task"
        >
          <p>This action cannot be undone.</p>
          <p>Are you sure you want to delete this task?</p>
        </Model>

      </div>
    </div>
  );
}

export default TaskPage;