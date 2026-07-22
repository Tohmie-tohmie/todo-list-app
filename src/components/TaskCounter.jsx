
export function TaskCounter({ totalTasks, activeTasks, completedTasks }) {
  return (
    <div className="task-counter">
      <p>Total: {totalTasks}</p>
      <p>Active: {activeTasks}</p>
      <p>Completed: {completedTasks}</p>
    </div>
  );
}
