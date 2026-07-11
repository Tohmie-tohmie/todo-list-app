
import { useState, useEffect } from 'react';



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
    },
  ]);

  setTask("");
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

 const totalTasks = tasks.length;

 const activeTasks = tasks.filter((task) => !task.completed).length;

 const completedTasks = tasks.filter((task) => task.completed).length;


  return(
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
            <button className="add-btn"
            onClick={handleSubmit}>
              Add Task
            </button>
      </div>

      <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
         />
      </div>
            <div className="todo-list">
                  <div className="task-counter">
                    <p>Total: {totalTasks}</p>
                    <p>Active: {activeTasks}</p>
                    <p>Completed: {completedTasks}</p>
                  </div>

                    <div className="filter-buttons">
                        <button
                          className={filter === "all" ? "active-filter" : ""}
                          onClick={() => setFilter("all")}
                        >
                          All
                        </button>

                        <button
                          className={filter === "active" ? "active-filter" : ""}
                          onClick={() => setFilter("active")}
                        >
                          Active
                        </button>

                        <button
                          className={filter === "completed" ? "active-filter" : ""}
                          onClick={() => setFilter("completed")}
                        >
                          Completed
                        </button>

                        <button onClick={clearCompleted}>
                          Clear Completed
                        </button>
                      </div>

                    {filteredTasks.map((task) => (
              <div
                   key={task.id}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                     {editingIndex === task.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(event) => setEditingText(event.target.value)}
                        className="todo-input"
                      />
                    ) : (
                      <p onClick={() => toggleComplete(task.id)}>
                          {task.text}
                      </p>
                    )}
                      
                     {editingIndex === task.id ? (
                 <button
                          className="edit-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                           saveTask(task.id);
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            setEditingIndex(task.id);
                            setEditingText(task.text);
                          }}
                        >
                          Edit
                   </button>
                      )}
                  <button
                      className="delete-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteTask(task.id);
                      }}
                    >
                      Delete
                 </button>
                  </div> 
            ))}

            </div>
    </>      
  );
}