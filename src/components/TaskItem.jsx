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
  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
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
            <p onClick={() => toggleComplete(task.id)}>
              {task.text}
            </p>

            {task.dueDate && (
              <small className="due-date">
                Due: {task.dueDate}
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