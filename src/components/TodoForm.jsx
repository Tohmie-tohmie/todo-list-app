
import { useState } from 'react';


export function TodoForm() {
   

  const [task, setTask] = useState("");

    function handleChange(event) {
      setTask(event.target.value);
    }

    function handleSubnmit() {
      if(task === "") {
          return;
      }

       console.log(task);
        setTask("");
    }
  

  return(
   
    <div className="todo-form">
        <input
        className="todo-input"
         type="text" 
         placeholder="Enter a task..."
         value={task}
         onChange={handleChange}
         />
        <button className="add-btn"
        onClick={handleSubnmit}>
          Add Task
        </button>
        <p>{task}</p>
    </div>
  );
}