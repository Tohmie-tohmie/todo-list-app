
import { useState } from 'react';



export function TodoForm() {
   

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
 const [editingIndex, setEditingIndex] = useState(null);
 const [editingText, setEditingText] = useState("");

  


    function handleChange(event) {
      setTask(event.target.value);
    }

    function handleKeyDown(event) {
       if(event.key === "Enter") {
             handleSubmit();
       } 
    }

    function handleSubmit() {
      if(task.trim() === "") {
          return;
      }

      setTasks([
       ...tasks,
      {
    text: task,
    completed: false,
    },
    ]);
        setTask("");
    }

    function deleteTask(indexToDelete) {
      const updateTasks = tasks.filter((task, index) => {
        return index !== indexToDelete;
      });
       setTasks(updateTasks); 
    }

    function toggleComplete(indexToToggle) {
       const updatedTasks = tasks.map((task, index) => {
       if (index === indexToToggle) {
      return {
        ...task,
        completed: !task.completed,
      };
    }

    return task;
  });

  setTasks(updatedTasks);
}

function saveTask(indexToSave) {
  const updatedTasks = tasks.map((task, index) => {
    if (index === indexToSave) {
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
            <div className="todo-list">
              <p>total Tasks: {tasks.length}</p>

            {tasks.map((task, index) => (
              <div
                    key={index}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                     {editingIndex === index ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(event) => setEditingText(event.target.value)}
                        className="todo-input"
                      />
                    ) : (
                      <p onClick={() => toggleComplete(index)}>
                          {task.text}
                      </p>
                    )}
                      
                     {editingIndex === index ? (
                 <button
                          className="edit-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            saveTask(index);
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            setEditingIndex(index);
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
                        deleteTask(index);
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