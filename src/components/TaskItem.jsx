export function TaskItem({
  task,
  editingIndex,
  editingText,
  setEditingText,
  toggleComplete,
  saveTask,
  setEditingIndex,
  deleteTask,
}) {

  const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = task.dueDate ? new Date(task.dueDate) : null;

  const isOverdue =
  dueDate &&
  dueDate < today &&
  !task.completed;

  function formatDueDate(date) {
  if (!date) return '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(date);
  due.setHours(0, 0, 0, 0);

  const difference =
    Math.floor((due - today) / (1000 * 60 * 60 * 24));

  if (difference === 0) return 'Due Today';
  if (difference === 1) return 'Due Tomorrow';
  if (difference === -1) return 'Yesterday';
  if (difference > 1) return `In ${difference} days`;
  return `${Math.abs(difference)} days ago`;
}

  return (
      <div
          className={`task-item ${task.completed ? "completed" : ""} ${task.priority?.toLowerCase()}`}
>
      <div className="task-content">

        {editingIndex === task.id ? (
          <input
            type="text"
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
            className="todo-input"
          />
        ) : (
          <>
  {isOverdue && (
  <p className="overdue-warning">
    ⚠ OVERDUE
  </p>
)}

<p onClick={() => toggleComplete(task.id)}>
  {task.text}
</p>

  {task.dueDate && (
    <small className="due-date">
      📅 {formatDueDate(task.dueDate)}
    </small>
  )}

  {task.priority && (
  <small className={`priority ${task.priority.toLowerCase()}`}>
    {task.priority === "High" && "🔴 High"}
    {task.priority === "Medium" && "🟡 Medium"}
    {task.priority === "Low" && "🟢 Low"}
  </small>
)}
</>
        )}

      </div>

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
  );
}