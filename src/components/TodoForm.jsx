
import { useState } from 'react';



export function TodoForm() {
   

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  


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

       setTasks([...tasks, task]);
        setTask("");
    }

    function deleteTask(indexToDelete) {
      const updateTasks = tasks.filter((task, index) => {
        return index !== indexToDelete;
      });
       setTasks(updateTasks); 
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
               <div key={index}
                   className="task-item"
                   >
                  <p>{task}</p>

                  <button className="delete-btn"
                  onClick={() => deleteTask(index)}>
                    Delete
                   </button>
                  </div> 
            ))}
            </div>
    </>      
  );
}