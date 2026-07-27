
export function Statistics({
  totalTasks,
  completedTasks,
  activeTasks,
  completionRate,
  highPriority,
  mediumPriority,
  lowPriority,
  overdueTasks,
}) {
 return (
  <div className="statistics">
    <h2>📊 Statistics</h2>

    <div className="stats-grid">
      <div className="stat-card total-card">
        <h3>📝 Total</h3>
        <p>{totalTasks}</p>
      </div>

      <div className="stat-card completed-card">
        <h3>✅ Completed</h3>
        <p>{completedTasks}</p>
      </div>

      <div className="stat-card active-card">
        <h3>⏳ Remaining</h3>
        <p>{activeTasks}</p>
      </div>

      <div className="stat-card rate-card">
        <h3>📈 Completion</h3>
        <p>{completionRate}%</p>
      </div>

      <div className="stat-card high-card">
        <h3>🔴 High</h3>
        <p>{highPriority}</p>
      </div>

      <div className="stat-card medium-card">
        <h3>🟡 Medium</h3>
        <p>{mediumPriority}</p>
      </div>

      <div className="stat-card low-card">
        <h3>🟢 Low</h3>
        <p>{lowPriority}</p>
      </div>

      <div className="stat-card overdue-card">
        <h3>⚠️ Overdue</h3>
        <p>{overdueTasks}</p>
      </div>
    </div>
  </div>
);
}