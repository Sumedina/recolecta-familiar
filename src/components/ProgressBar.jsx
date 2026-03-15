export default function ProgressBar({ total, goal }) {
  const percentage = Math.min((total / goal) * 100, 100);

  return (
    <div className="progress-container">
      <div className="progress-text">
        C$ {total.toLocaleString()} / C$ {goal.toLocaleString()}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="progress-percent">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
}