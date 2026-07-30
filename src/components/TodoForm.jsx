
import { useState, useEffect } from 'react';
import { TaskCounter } from './TaskCounter';
import { SearchBar } from './SearchBar';
import { FilterButtons } from './FilterButtons';
import { TaskItem } from './TaskItem';
import { ThemeToggle } from '../ThemeToggle';
import { ProgressBar } from '../ProgressBar';
import { Toast } from '../Toast';
import Confetti from 'react-confetti';
import { Statistics } from './Statistics';



export function TodoForm() {


  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState("");





  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (task.trim() === "") {
      return;
    }

    const taskExists = tasks.some(
      (item) => item.text.toLowerCase() === task.trim().toLowerCase()
    );

    if (taskExists) {
      setToastMessage("⚠️ Task already exists!");

      setTimeout(() => {
        setToastMessage("");
      }, 3000);

      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        dueDate,
        priority,
      },
    ]);

    setTask("");
    setDueDate("");
    setPriority("Medium");

    setToastMessage("✅ Task added successfully!");

    setTimeout(() => {
      setToastMessage("");
    }, 3000);

  }


  function deleteTask(idToDelete) {

    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    const updatedTasks = tasks.filter((task) => {
      return task.id !== idToDelete;
    });

    setTasks(updatedTasks);

    setToastMessage("🗑️ Task deleted successfully!");

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }

  function toggleComplete(idToToggle) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToToggle) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function saveTask(idToSave) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === idToSave) {
        return {
          ...task,
          text: editingText,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  }

  function clearCompleted() {
    const activeTasks = tasks.filter((task) => {
      return !task.completed;
    });

    setTasks(activeTasks);

    setToastMessage("🧹 Completed tasks cleared!");

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);





  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    const priorityDifference =
      priorityOrder[a.priority] - priorityOrder[b.priority];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return new Date(a.dueDate) - new Date(b.dueDate);
  });


  const totalTasks = tasks.length;

  const activeTasks = tasks.filter((task) => !task.completed).length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const allCompleted =
    totalTasks > 0 &&
    completedTasks === totalTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumPriority = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowPriority = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    return due < today;
  }).length;


  return (
    <>
      <ThemeToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Toast message={toastMessage} />

      {allCompleted && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      <div className="todo-form">
        <input
          className="todo-input"
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <input
          className="date-input"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />

        <select
          className="priority-select"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          className="add-btn"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="todo-list">

        <TaskCounter
          totalTasks={totalTasks}
          activeTasks={activeTasks}
          completedTasks={completedTasks}
        />

        <ProgressBar
          totalTasks={totalTasks}
          completedTasks={completedTasks}
        />

        <Statistics
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          activeTasks={activeTasks}
          completionRate={completionRate}
          highPriority={highPriority}
          mediumPriority={mediumPriority}
          lowPriority={lowPriority}
          overdueTasks={overdueTasks}
        />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
        {allCompleted && (
          <div className="success-message">
            <h2>🎉 Congratulations!</h2>
            <p>You completed all your tasks!</p>
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <h3>📝 No tasks yet</h3>
            <p>Nothing here yet. Add your first task and start being productive! 🚀</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              editingIndex={editingIndex}
              editingText={editingText}
              setEditingText={setEditingText}
              toggleComplete={toggleComplete}
              saveTask={saveTask}
              setEditingIndex={setEditingIndex}
              deleteTask={deleteTask}
            />
          ))
        )}


      </div>
    </>
  );
}