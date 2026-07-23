
import { useState, useEffect } from 'react';
import { TaskCounter } from './TaskCounter';
import { SearchBar } from './SearchBar';
import { FilterButtons } from './FilterButtons';
import { TaskItem } from './TaskItem';



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

  


    function handleChange(event) {
      setTask(event.target.value);
    }

    function handleKeyDown(event) {
       if(event.key === "Enter") {
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
    alert("Task already exists!");
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
}

  function deleteTask(idToDelete) {
     const updatedTasks = tasks.filter((task) => {
    return task.id !== idToDelete;
  });

  setTasks(updatedTasks);
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
}

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);


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


 return (
  <>
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

      <FilterButtons
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
    />

    {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <h3>📝 No tasks yet</h3>
                <p>Add your first task above.</p>
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