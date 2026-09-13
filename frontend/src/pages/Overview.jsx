import { useNavigate } from "react-router-dom";

import {
  ScanLine,
  AlertTriangle,
  ShieldCheck,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  FileSearch,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    label: "Total Skills",
    value: "20",
    change: "+12%",
    up: true,
    icon: ScanLine,
  },
  {
    label: "Conflicts Found",
    value: "7",
    change: "+8%",
    up: false,
    icon: AlertTriangle,
  },
  {
    label: "Risk Score",
    value: "68",
    change: "-6%",
    up: false,
    icon: ShieldCheck,
  },
  {
    label: "Last Scan",
    value: "2h",
    change: "Completed",
    up: true,
    icon: Clock3,
  },
];

const activity = [
  {
    text: "Scanned repository skill-pack",
    detail: "3 conflicts found",
    time: "2 hours ago",
    icon: FileSearch,
  },
  {
    text: "Conflict resolved",
    detail: "pdf-reader ↔ pdf-analyzer",
    time: "4 hours ago",
    icon: CheckCircle2,
  },
  {
    text: "New skills detected",
    detail: "5 skills added",
    time: "Yesterday",
    icon: ScanLine,
  },
  {
    text: "Risk score updated",
    detail: "Reduced from 74 to 68",
    time: "Yesterday",
    icon: ShieldCheck,
  },
];

export default function Overview() {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="page overview-page">

      {/* HEADER */}
      <div className="overview-header">
        <div>
          <span className="eyebrow">WORKSPACE OVERVIEW</span>

          <h1 className="greeting-text">
  {greeting} <span>👋</span>
</h1>

          <p>
            Monitor your AI skills, detect conflicts, and keep your
            skill ecosystem healthy.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/scanner")}
        >
          <ScanLine size={17} />
          New Scan
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.label}>

              <div className="stat-card-top">
                <div className="stat-icon">
                  <Icon size={18} />
                </div>

                <span
                  className={`trend ${
                    stat.up ? "trend-up" : "trend-down"
                  }`}
                >
                  {stat.up ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}

                  {stat.change}
                </span>
              </div>

              <strong>{stat.value}</strong>

              <span className="stat-label">
                {stat.label}
              </span>

            </div>
          );
        })}

      </div>

      {/* MAIN CONTENT */}
      <div className="overview-grid">

        {/* RECENT ACTIVITY */}
        <section className="panel activity-panel">

          <div className="panel-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest workspace changes</p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/reports")}
            >
              View all
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="activity-list">

            {activity.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="activity-item" key={index}>

                  <div className="activity-icon">
                    <Icon size={16} />
                  </div>

                  <div className="activity-content">
                    <strong>{item.text}</strong>
                    <span>{item.detail}</span>
                  </div>

                  <time>{item.time}</time>

                </div>
              );
            })}

          </div>

        </section>

        {/* WORKSPACE HEALTH */}
        <section className="panel health-panel">

          <div className="panel-header">
            <div>
              <h2>Workspace Health</h2>
              <p>Current ecosystem status</p>
            </div>

            <span className="health-status">
              Healthy
            </span>
          </div>

          <div className="health-score">

            <div className="health-circle">
              <strong>82</strong>
              <span>/100</span>
            </div>

            <div className="health-copy">
              <h3>Healthy</h3>

              <p>
                Your skill collection is in good shape,
                but a few conflicts need attention.
              </p>
            </div>

          </div>

          <div className="health-bars">

            <div className="health-row">
              <div>
                <span>Healthy</span>
                <strong>13</strong>
              </div>

              <div className="progress">
                <span style={{ width: "65%" }} />
              </div>
            </div>

            <div className="health-row">
              <div>
                <span>Medium Risk</span>
                <strong>5</strong>
              </div>

              <div className="progress medium">
                <span style={{ width: "25%" }} />
              </div>
            </div>

            <div className="health-row">
              <div>
                <span>High Risk</span>
                <strong>2</strong>
              </div>

              <div className="progress high">
                <span style={{ width: "10%" }} />
              </div>
            </div>

          </div>

        </section>

      </div>

      {/* QUICK ACTIONS */}
      <section className="panel quick-panel">

        <div className="panel-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Common workspace workflows</p>
          </div>
        </div>

        <div className="quick-actions">

          <button onClick={() => navigate("/scanner")}>
            <ScanLine size={18} />

            <span>
              <strong>Scan Skills</strong>
              <small>Run a new conflict scan</small>
            </span>

            <ArrowUpRight size={16} />
          </button>

          <button onClick={() => navigate("/conflicts")}>
            <AlertTriangle size={18} />

            <span>
              <strong>Review Conflicts</strong>
              <small>Inspect detected conflicts</small>
            </span>

            <ArrowUpRight size={16} />
          </button>

          <button onClick={() => navigate("/reports")}>
            <FileSearch size={18} />

            <span>
              <strong>View Reports</strong>
              <small>Open generated reports</small>
            </span>

            <ArrowUpRight size={16} />
          </button>

        </div>

      </section>

    </div>
  );
}