
import { useState } from 'react';


export function TodoForm() {
   

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

    function handleChange(event) {
      setTask(event.target.value);
    }

    function handleSubmit() {
      if(task.trim() === "") {
          return;
      }

       setTasks([...tasks, task]);
        setTask("");
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
            />
            <button className="add-btn"
            onClick={handleSubmit}>
              Add Task
            </button>
      </div>
            <div className="todo-list">
            {tasks.map((task, index) => (
                <p key={index}>{task}</p>
            ))}
            </div>
    </>      
  );
}