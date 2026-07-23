
export function ProgressBar({totalTasks, completedTasks}) {
  const percentage = totalTasks === 0
      ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return(
        <div className="progress-container">
      <h3>Progress</h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p>
        {completedTasks} of {totalTasks} tasks completed ({percentage}%)
      </p>
    </div>
  );
}