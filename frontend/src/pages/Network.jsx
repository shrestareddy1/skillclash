import { useMemo, useState } from "react";
import {
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  AlertTriangle,
  ShieldCheck,
  Network as NetworkIcon,
  Activity,
  Target,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const skills = [
  { id: "pdf-reader", x: 18, y: 25, risk: "medium", conflicts: 2 },
  { id: "pdf-analyzer", x: 40, y: 17, risk: "high", conflicts: 3 },
  { id: "document-writer", x: 68, y: 25, risk: "low", conflicts: 0 },
  { id: "image-editor", x: 82, y: 48, risk: "medium", conflicts: 1 },
  { id: "image-resizer", x: 62, y: 65, risk: "low", conflicts: 0 },
  { id: "web-search", x: 30, y: 66, risk: "low", conflicts: 0 },
  { id: "web-scraper", x: 13, y: 52, risk: "medium", conflicts: 1 },
  { id: "code-generator", x: 48, y: 47, risk: "high", conflicts: 2 },
  { id: "code-reviewer", x: 71, y: 76, risk: "medium", conflicts: 1 },
  { id: "code-debugger", x: 38, y: 82, risk: "low", conflicts: 0 },
];

const conflicts = [
  ["pdf-reader", "pdf-analyzer", "high"],
  ["pdf-analyzer", "code-generator", "high"],
  ["code-generator", "code-reviewer", "medium"],
  ["pdf-reader", "web-scraper", "medium"],
  ["image-editor", "image-resizer", "medium"],
];

const riskColors = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#22C55E",
};

const riskLabels = {
  high: "High Risk",
  medium: "Medium Risk",
  low: "Low Risk",
};

export default function Network() {
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);

  const getSkill = (name) =>
    skills.find((skill) => skill.id === name);

  const selectedSkill = selected ? getSkill(selected) : null;

  const connectedSkills = useMemo(() => {
    if (!selected) return [];

    const connected = new Set();

    conflicts.forEach(([a, b]) => {
      if (a === selected) connected.add(b);
      if (b === selected) connected.add(a);
    });

    return [...connected];
  }, [selected]);

  const highRisk = skills.filter(
    (skill) => skill.risk === "high"
  ).length;

  const mediumRisk = skills.filter(
    (skill) => skill.risk === "medium"
  ).length;

  const lowRisk = skills.filter(
    (skill) => skill.risk === "low"
  ).length;

  const resetNetwork = () => {
    setSelected(null);
    setZoom(1);
  };

  return (
    <div className="page network-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <div className="page-eyebrow">
            <Share2 size={15} />
            CONFLICT NETWORK
          </div>

          <h1>Network</h1>

          <p>
            Visualize relationships between skills and identify
            where conflicts are concentrated.
          </p>
        </div>

        <div className="network-actions">
          <button
            className="secondary-btn"
            onClick={() =>
              setZoom((value) =>
                Math.min(value + 0.15, 1.8)
              )
            }
          >
            <ZoomIn size={17} />
            Zoom In
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              setZoom((value) =>
                Math.max(value - 0.15, 0.7)
              )
            }
          >
            <ZoomOut size={17} />
            Zoom Out
          </button>

          <button
            className="secondary-btn"
            onClick={resetNetwork}
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </div>
      </div>

      {/* NETWORK STATS */}
      <div className="network-stats">
        <div className="network-stat-card">
          <div className="network-stat-icon purple">
            <Layers size={20} />
          </div>

          <div>
            <strong>{skills.length}</strong>
            <span>Total Skills</span>
          </div>
        </div>

        <div className="network-stat-card">
          <div className="network-stat-icon cyan">
            <Share2 size={20} />
          </div>

          <div>
            <strong>{conflicts.length}</strong>
            <span>Connections</span>
          </div>
        </div>

        <div className="network-stat-card">
          <div className="network-stat-icon red">
            <AlertTriangle size={20} />
          </div>

          <div>
            <strong>{highRisk}</strong>
            <span>High Risk</span>
          </div>
        </div>

        <div className="network-stat-card">
          <div className="network-stat-icon green">
            <ShieldCheck size={20} />
          </div>

          <div>
            <strong>{lowRisk}</strong>
            <span>Low Risk</span>
          </div>
        </div>
      </div>

      {/* MAIN NETWORK */}
      <div className="network-layout">
        <div className="network-card">
          <div className="network-toolbar">
            <div className="network-toolbar-title">
              <div className="network-toolbar-icon">
                <NetworkIcon size={19} />
              </div>

              <div>
                <strong>Skill Conflict Graph</strong>
                <span>
                  Interactive relationship map
                </span>
              </div>
            </div>

            <div className="network-legend">
              <span>
                <i className="legend-high" />
                High
              </span>

              <span>
                <i className="legend-medium" />
                Medium
              </span>

              <span>
                <i className="legend-low" />
                Low
              </span>
            </div>
          </div>

          <div className="network-canvas">
            <svg
              viewBox="0 0 1000 650"
              className="network-svg"
              style={{
                transform: `scale(${zoom})`,
              }}
            >
              <defs>
                <filter id="networkGlow">
                  <feGaussianBlur
                    stdDeviation="5"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* CONNECTIONS */}
              {conflicts.map(
                ([firstName, secondName, severity]) => {
                  const first = getSkill(firstName);
                  const second = getSkill(secondName);

                  if (!first || !second) return null;

                  const visible =
                    !selected ||
                    selected === firstName ||
                    selected === secondName ||
                    connectedSkills.includes(firstName) ||
                    connectedSkills.includes(secondName);

                  return (
                    <line
                      key={`${firstName}-${secondName}`}
                      x1={first.x * 10}
                      y1={first.y * 6.5}
                      x2={second.x * 10}
                      y2={second.y * 6.5}
                      stroke={riskColors[severity]}
                      strokeWidth={
                        severity === "high" ? 5 : 3
                      }
                      strokeOpacity={
                        visible ? 0.72 : 0.08
                      }
                    />
                  );
                }
              )}

              {/* NODES */}
              {skills.map((skill) => {
                const isSelected =
                  selected === skill.id;

                const isVisible =
                  !selected ||
                  selected === skill.id ||
                  connectedSkills.includes(skill.id);

                return (
                  <g
                    key={skill.id}
                    className="network-node"
                    onClick={() =>
                      setSelected(
                        isSelected ? null : skill.id
                      )
                    }
                    style={{
                      cursor: "pointer",
                      opacity: isVisible ? 1 : 0.2,
                    }}
                  >
                    <circle
                      cx={skill.x * 10}
                      cy={skill.y * 6.5}
                      r={isSelected ? 32 : 26}
                      fill="#131826"
                      stroke={riskColors[skill.risk]}
                      strokeWidth={
                        isSelected ? 5 : 3
                      }
                      filter={
                        isSelected
                          ? "url(#networkGlow)"
                          : undefined
                      }
                    />

                    <circle
                      cx={skill.x * 10}
                      cy={skill.y * 6.5}
                      r="9"
                      fill={riskColors[skill.risk]}
                    />

                    <text
                      x={skill.x * 10}
                      y={skill.y * 6.5 + 49}
                      textAnchor="middle"
                      fill="#F3F4F6"
                      fontSize="16"
                      fontWeight="600"
                    >
                      {skill.id}
                    </text>

                    <text
                      x={skill.x * 10}
                      y={skill.y * 6.5 + 68}
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="13"
                    >
                      {skill.conflicts} conflicts
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="network-footer">
            <span>
              <Activity size={15} />
              Live relationship map
            </span>

            <span>
              {skills.length} skills · {conflicts.length} connections
            </span>
          </div>
        </div>

        {/* SIDE PANEL */}
        <aside className="network-info">
          {selectedSkill ? (
            <>
              <div className="network-info-header">
                <div className="network-info-icon">
                  <Target size={21} />
                </div>

                <div>
                  <span className="info-label">
                    SELECTED SKILL
                  </span>

                  <h2>{selectedSkill.id}</h2>
                </div>
              </div>

              <p>
                Inspect this skill's risk level and
                connected conflict relationships.
              </p>

              <div className="selected-risk-card">
                <div>
                  <span>Risk Level</span>

                  <strong
                    style={{
                      color:
                        riskColors[selectedSkill.risk],
                    }}
                  >
                    {riskLabels[selectedSkill.risk]}
                  </strong>
                </div>

                <AlertTriangle
                  size={20}
                  style={{
                    color:
                      riskColors[selectedSkill.risk],
                  }}
                />
              </div>

              <div className="selected-metrics">
                <div>
                  <strong>
                    {selectedSkill.conflicts}
                  </strong>

                  <span>Conflicts</span>
                </div>

                <div>
                  <strong>
                    {connectedSkills.length}
                  </strong>

                  <span>Connections</span>
                </div>
              </div>

              <div className="connected-list">
                <div className="connected-list-title">
                  <span>CONNECTED SKILLS</span>

                  <span>
                    {connectedSkills.length}
                  </span>
                </div>

                {connectedSkills.length > 0 ? (
                  connectedSkills.map((name) => {
                    const skill = getSkill(name);

                    return (
                      <button
                        key={name}
                        onClick={() =>
                          setSelected(name)
                        }
                      >
                        <div>
                          <span>{name}</span>

                          <small
                            style={{
                              color:
                                riskColors[
                                  skill?.risk
                                ],
                            }}
                          >
                            {riskLabels[
                              skill?.risk
                            ]}
                          </small>
                        </div>

                        <ArrowUpRight size={15} />
                      </button>
                    );
                  })
                ) : (
                  <div className="network-empty">
                    No connected conflicts found.
                  </div>
                )}
              </div>

              <button
                className="network-clear-btn"
                onClick={() => setSelected(null)}
              >
                Clear Selection
              </button>
            </>
          ) : (
            <>
              <div className="network-info-header">
                <div className="network-info-icon">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <span className="info-label">
                    NETWORK INTELLIGENCE
                  </span>

                  <h2>Workspace relationships</h2>
                </div>
              </div>

              <p>
                Explore how your skills interact and
                quickly identify the highest-risk areas
                of your workspace.
              </p>

              <div className="network-overview-score">
                <div className="score-ring">
                  <strong>85</strong>
                  <span>/100</span>
                </div>

                <div>
                  <strong>Healthy network</strong>
                  <span>
                    Most skills remain isolated or
                    low-risk.
                  </span>
                </div>
              </div>

              <div className="network-metrics">
                <div>
                  <strong>{skills.length}</strong>
                  <span>Skills</span>
                </div>

                <div>
                  <strong>{conflicts.length}</strong>
                  <span>Connections</span>
                </div>

                <div>
                  <strong>{mediumRisk}</strong>
                  <span>Medium</span>
                </div>
              </div>

              <div className="network-risk-breakdown">
                <div className="breakdown-header">
                  <span>RISK BREAKDOWN</span>
                  <Activity size={15} />
                </div>

                <div className="risk-line">
                  <span>
                    <i className="legend-high" />
                    High Risk
                  </span>

                  <strong>{highRisk}</strong>
                </div>

                <div className="risk-line">
                  <span>
                    <i className="legend-medium" />
                    Medium Risk
                  </span>

                  <strong>{mediumRisk}</strong>
                </div>

                <div className="risk-line">
                  <span>
                    <i className="legend-low" />
                    Low Risk
                  </span>

                  <strong>{lowRisk}</strong>
                </div>
              </div>

              <div className="network-tip">
                <AlertTriangle size={18} />

                <div>
                  <strong>Priority review</strong>

                  <span>
                    Start with high-risk nodes and
                    their strongest connections.
                  </span>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}