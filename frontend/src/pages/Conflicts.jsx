import { useState } from "react";
import {
  AlertTriangle,
  Search,
  X,
  CheckCircle2,
  ShieldAlert,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const conflicts = [
  {
    id: 1,
    severity: "High",
    skill1: "pdf-reader",
    skill2: "pdf-analyzer",
    similarity: 74,
    type: "Overlapping Trigger",
    explanation:
      "Both skills can respond to requests involving reading and extracting information from PDF files.",
    fix:
      "Keep pdf-reader focused on reading and extracting PDF content, while pdf-analyzer handles analysis and interpretation.",
  },
  {
    id: 2,
    severity: "High",
    skill1: "pdf-analyzer",
    skill2: "pdf-generator",
    similarity: 64,
    type: "Overlapping Trigger",
    explanation:
      "Both skills contain PDF processing instructions that may cause ambiguous skill selection.",
    fix:
      "Separate PDF analysis from PDF creation and generation so each skill has a clear responsibility.",
  },
  {
    id: 3,
    severity: "Medium",
    skill1: "pdf-generator",
    skill2: "pdf-reader",
    similarity: 60,
    type: "No Real Conflict",
    explanation:
      "The skills work with PDF files but perform different tasks. Their trigger overlap is limited.",
    fix:
      "No major change required. Keep the skill descriptions specific to their individual responsibilities.",
  },
];

export default function Conflicts() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const visibleConflicts = conflicts.filter((item) => {
    const matchesFilter =
      filter === "All" || item.severity === filter;

    const searchableText =
      `${item.skill1} ${item.skill2} ${item.type}`.toLowerCase();

    const matchesSearch = searchableText.includes(
      search.toLowerCase()
    );

    return matchesFilter && matchesSearch;
  });

  const highCount = conflicts.filter(
    (item) => item.severity === "High"
  ).length;

  const mediumCount = conflicts.filter(
    (item) => item.severity === "Medium"
  ).length;

  return (
    <div className="page conflicts-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <span className="eyebrow">
            <AlertTriangle size={15} />
            CONFLICT MANAGEMENT
          </span>

          <h1>Conflict Explorer</h1>

          <p>
            Identify overlapping skill triggers, understand risk,
            and resolve conflicts before they affect skill selection.
          </p>
        </div>

        <div className="conflict-header-stats">
          <div>
            <strong>{conflicts.length}</strong>
            <span>Total Conflicts</span>
          </div>

          <div>
            <strong className="danger-text">{highCount}</strong>
            <span>High Risk</span>
          </div>

          <div>
            <strong className="warning-text">{mediumCount}</strong>
            <span>Medium Risk</span>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="conflict-summary-grid">

        <div className="conflict-summary-card">
          <div className="summary-icon purple">
            <ShieldAlert size={21} />
          </div>

          <div>
            <span>Risk Level</span>
            <strong>Moderate</strong>
            <small>Needs attention</small>
          </div>
        </div>

        <div className="conflict-summary-card">
          <div className="summary-icon red">
            <Zap size={21} />
          </div>

          <div>
            <span>Highest Similarity</span>
            <strong>74%</strong>
            <small>pdf-reader ↔ pdf-analyzer</small>
          </div>
        </div>

        <div className="conflict-summary-card">
          <div className="summary-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Resolution Status</span>
            <strong>0 Resolved</strong>
            <small>Review detected conflicts</small>
          </div>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="conflict-toolbar">

        <div className="conflict-filters">
          {["All", "High", "Medium", "Low"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="conflict-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search skills or conflicts..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

      </div>

      {/* RESULTS HEADER */}
      <div className="conflict-results-header">
        <div>
          <h2>Detected Conflicts</h2>
          <p>
            AI-reviewed skill pairs requiring your attention.
          </p>
        </div>

        <span>
          {visibleConflicts.length} results
        </span>
      </div>

      {/* CONFLICT CARDS */}
      <div className="conflict-grid">

        {visibleConflicts.length > 0 ? (
          visibleConflicts.map((item) => (
            <div
              className="conflict-card"
              key={item.id}
            >

              <div className="conflict-card-top">

                <span
                  className={`severity ${item.severity.toLowerCase()}`}
                >
                  <AlertTriangle size={13} />
                  {item.severity} Risk
                </span>

                <span className="similarity">
                  {item.similarity}% match
                </span>

              </div>

              <div className="conflict-skills">

                <div className="skill-chip">
                  <span className="skill-dot"></span>
                  {item.skill1}
                </div>

                <div className="conflict-connector">
                  <Zap size={15} />
                </div>

                <div className="skill-chip">
                  <span className="skill-dot"></span>
                  {item.skill2}
                </div>

              </div>

              <div className="conflict-type">
                {item.type}
              </div>

              <p className="conflict-explanation">
                {item.explanation}
              </p>

              <div className="conflict-card-footer">

                <span className="ai-reviewed">
                  <CheckCircle2 size={13} />
                  AI Reviewed
                </span>

                <button
                  type="button"
                  className="details-button"
                  onClick={() => setSelected(item)}
                >
                  View Details
                  <ArrowUpRight size={15} />
                </button>

              </div>

            </div>
          ))
        ) : (
          <div className="empty-conflicts">
            <Search size={30} />
            <h3>No conflicts found</h3>
            <p>
              Try changing your filter or search term.
            </p>
          </div>
        )}

      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <div
          className="modal"
          onClick={() => setSelected(null)}
        >

          <div
            className="details-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="close-button"
              onClick={() => setSelected(null)}
            >
              <X size={19} />
            </button>

            <span
              className={`severity ${selected.severity.toLowerCase()}`}
            >
              <AlertTriangle size={13} />
              {selected.severity} Risk
            </span>

            <h2>
              {selected.skill1}
              <span> ↔ </span>
              {selected.skill2}
            </h2>

            <div className="detail-similarity">
              <span>Trigger similarity</span>
              <strong>{selected.similarity}%</strong>
            </div>

            <h4>AI Classification</h4>

            <div className="classification-box">
              <Zap size={17} />
              {selected.type}
            </div>

            <h4>Why this was detected</h4>

            <p>
              {selected.explanation}
            </p>

            <h4>Suggested Fix</h4>

            <div className="fix-box">
              {selected.fix}
            </div>

            <div className="affected-files">
              <span>Affected skills</span>

              <div>
                <span>{selected.skill1}</span>
                <span>{selected.skill2}</span>
              </div>
            </div>

            <button
              type="button"
              className="resolve-button"
              onClick={() => setSelected(null)}
            >
              <CheckCircle2 size={17} />
              Mark as Resolved
            </button>

          </div>

        </div>
      )}

    </div>
  );
}