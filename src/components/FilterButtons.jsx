export function FilterButtons({ filter, setFilter, clearCompleted }) {
  return (
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
  );
}