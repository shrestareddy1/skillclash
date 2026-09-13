import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Zap,
  Target,
  BrainCircuit,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

/* =========================================================
   DATA
   ========================================================= */

const trendData = [
  { day: "Mon", conflicts: 2 },
  { day: "Tue", conflicts: 4 },
  { day: "Wed", conflicts: 3 },
  { day: "Thu", conflicts: 7 },
  { day: "Fri", conflicts: 5 },
  { day: "Sat", conflicts: 8 },
  { day: "Sun", conflicts: 6 },
];

const riskTrendData = [
  { day: "Mon", risk: 72 },
  { day: "Tue", risk: 70 },
  { day: "Wed", risk: 74 },
  { day: "Thu", risk: 69 },
  { day: "Fri", risk: 67 },
  { day: "Sat", risk: 65 },
  { day: "Sun", risk: 64 },
];

const typeData = [
  { name: "Overlapping", value: 9 },
  { name: "Contradictory", value: 4 },
  { name: "Other", value: 2 },
];

const riskData = [
  { level: "High", count: 3 },
  { level: "Medium", count: 7 },
  { level: "Low", count: 11 },
];

const topConflicts = [
  {
    skill1: "pdf-reader",
    skill2: "pdf-analyzer",
    similarity: 74,
    risk: "High",
  },
  {
    skill1: "pdf-analyzer",
    skill2: "pdf-generator",
    similarity: 64,
    risk: "High",
  },
  {
    skill1: "web-search",
    skill2: "web-scraper",
    similarity: 61,
    risk: "Medium",
  },
];

const COLORS = ["#7C3AED", "#22D3EE", "#6366F1"];

/* =========================================================
   TOOLTIP
   ========================================================= */

const tooltipStyle = {
  background: "#111827",
  border: "1px solid rgba(139, 92, 246, 0.25)",
  borderRadius: "12px",
  color: "#F3F4F6",
  boxShadow: "0 14px 35px rgba(0,0,0,0.35)",
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Analytics() {
  const totalConflicts = 15;
  const averageRisk = 68;
  const skillsScanned = 20;
  const securityScore = 82;
  const scanCoverage = 95;

  return (
    <div className="page analytics-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="page-header">
        <div>
          <div className="page-eyebrow">
            <BarChart3 size={15} />
            SECURITY ANALYTICS
          </div>

          <h1>Analytics</h1>

          <p>
            Monitor conflict trends, security posture, risk levels,
            and AI-detected patterns across your skill ecosystem.
          </p>
        </div>

        <button className="secondary-btn">
          <Activity size={17} />
          Last 7 Days
        </button>
      </div>

      {/* =====================================================
          SECURITY OVERVIEW
          ===================================================== */}

      <div className="analytics-overview-grid">

        {/* Security score */}

        <div className="security-score-card">

          <div className="security-score-header">
            <div>
              <span className="analytics-section-label">
                SECURITY POSTURE
              </span>

              <h2>Overall Security Score</h2>

              <p>
                Your workspace is in a healthy state.
              </p>
            </div>

            <div className="security-score-icon">
              <ShieldCheck size={22} />
            </div>
          </div>

          <div className="security-score-body">

            <div className="score-circle">
              <div>
                <strong>{securityScore}</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="score-details">

              <div className="score-status">
                <span className="score-status-dot"></span>
                Good standing
              </div>

              <p>
                Your conflict profile is currently below
                the critical risk threshold.
              </p>

              <div className="score-progress">
                <div
                  style={{
                    width: `${securityScore}%`,
                  }}
                />
              </div>

              <small>
                +6 points since last scan
              </small>

            </div>

          </div>
        </div>

        {/* Risk trend */}

        <div className="risk-trend-card">

          <div className="analytics-card-heading">

            <div>
              <span className="analytics-section-label">
                RISK TREND
              </span>

              <h2>Risk is decreasing</h2>
            </div>

            <div className="trend-pill positive">
              <TrendingDown size={14} />
              4.2%
            </div>

          </div>

          <div className="risk-trend-number">
            <strong>{averageRisk}%</strong>
            <span>average risk</span>
          </div>

          <div className="mini-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData}>

                <defs>
                  <linearGradient
                    id="riskGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#7C3AED"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#7C3AED"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#7C3AED"
                  fill="url(#riskGradient)"
                  strokeWidth={2.5}
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div className="analytics-stats">

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon purple">
            <AlertTriangle size={21} />
          </div>

          <div>
            <strong>{totalConflicts}</strong>
            <span>Total Conflicts</span>
          </div>

          <small className="trend-up">
            ↑ 12.5%
          </small>

        </div>

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon cyan">
            <TrendingUp size={21} />
          </div>

          <div>
            <strong>{averageRisk}%</strong>
            <span>Average Risk</span>
          </div>

          <small className="trend-down">
            ↓ 4.2%
          </small>

        </div>

        <div className="analytics-stat-card">

          <div className="analytics-stat-icon green">
            <ShieldCheck size={21} />
          </div>

          <div>
            <strong>{skillsScanned}</strong>
            <span>Skills Analyzed</span>
          </div>

          <small className="trend-up">
            ↑ 8.1%
          </small>

        </div>

      </div>

      {/* =====================================================
          MAIN CHARTS
          ===================================================== */}

      <div className="analytics-grid">

        {/* Conflict activity */}

        <div className="chart-card chart-large">

          <div className="chart-header">

            <div>
              <span className="analytics-section-label">
                ACTIVITY
              </span>

              <h2>Conflicts Detected</h2>

              <p>
                Conflict detection activity over the last 7 days
              </p>
            </div>

            <div className="chart-label">
              <span className="chart-dot purple-dot" />
              Conflicts
            </div>

          </div>

          <div className="chart-area">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={trendData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  stroke="#242B3A"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="day"
                  stroke="#7F8798"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#7F8798"
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Line
                  type="monotone"
                  dataKey="conflicts"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#7C3AED",
                    stroke: "#131826",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Conflict types */}

        <div className="chart-card">

          <div className="chart-header">

            <div>
              <span className="analytics-section-label">
                CLASSIFICATION
              </span>

              <h2>Conflict Types</h2>

              <p>
                AI classification breakdown
              </p>
            </div>

          </div>

          <div className="pie-area">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={typeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={4}
                >

                  {typeData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}

                </Pie>

                <Tooltip
                  contentStyle={tooltipStyle}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="legend">

            {typeData.map((item, index) => (

              <div
                className="legend-item"
                key={item.name}
              >

                <span
                  className="legend-color"
                  style={{
                    background:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span>
                  {item.name}
                </span>

                <strong>
                  {item.value}
                </strong>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* =====================================================
          RISK DISTRIBUTION
          ===================================================== */}

      <div className="chart-card chart-full analytics-risk-card">

        <div className="chart-header">

          <div>
            <span className="analytics-section-label">
              RISK ANALYSIS
            </span>

            <h2>Risk Distribution</h2>

            <p>
              Number of skills grouped by their current risk level
            </p>
          </div>

          <div className="risk-summary-badge">
            <ShieldCheck size={14} />
            {skillsScanned} skills analyzed
          </div>

        </div>

        <div className="risk-chart">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={riskData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >

              <CartesianGrid
                stroke="#242B3A"
                strokeDasharray="3 3"
                horizontal={false}
              />

              <XAxis
                type="number"
                stroke="#7F8798"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                type="category"
                dataKey="level"
                stroke="#A1A8B8"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={tooltipStyle}
              />

              <Bar
                dataKey="count"
                fill="#7C3AED"
                radius={[
                  0,
                  8,
                  8,
                  0,
                ]}
                barSize={26}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =====================================================
          LOWER ANALYTICS
          ===================================================== */}

      <div className="analytics-bottom-grid">

        {/* Top conflicts */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>
              <span className="analytics-section-label">
                PRIORITY REVIEW
              </span>

              <h2>Top Risk Pairs</h2>

              <p>
                Skill pairs with the highest trigger overlap.
              </p>
            </div>

            <Target size={20} />

          </div>

          <div className="risk-pairs-list">

            {topConflicts.map((item) => (

              <div
                className="risk-pair"
                key={`${item.skill1}-${item.skill2}`}
              >

                <div className="risk-pair-info">

                  <div className="risk-pair-names">
                    <span>{item.skill1}</span>
                    <span className="pair-arrow">↔</span>
                    <span>{item.skill2}</span>
                  </div>

                  <div className="risk-pair-meta">

                    <span
                      className={`mini-risk ${item.risk.toLowerCase()}`}
                    >
                      {item.risk}
                    </span>

                    <span>
                      {item.similarity}% similarity
                    </span>

                  </div>

                </div>

                <ArrowUpRight size={17} />

              </div>

            ))}

          </div>

        </div>

        {/* AI insights */}

        <div className="analytics-panel ai-insights-panel">

          <div className="analytics-panel-header">

            <div>
              <span className="analytics-section-label">
                AI INSIGHTS
              </span>

              <h2>What needs attention?</h2>

              <p>
                Automated observations from your latest scan.
              </p>
            </div>

            <div className="ai-icon">
              <BrainCircuit size={20} />
            </div>

          </div>

          <div className="insight-list">

            <div className="insight-item">

              <div className="insight-icon warning">
                <ShieldAlert size={17} />
              </div>

              <div>
                <strong>
                  2 high-risk pairs detected
                </strong>

                <p>
                  PDF-related skills have the strongest
                  trigger overlap.
                </p>
              </div>

            </div>

            <div className="insight-item">

              <div className="insight-icon positive">
                <TrendingDown size={17} />
              </div>

              <div>
                <strong>
                  Risk is trending downward
                </strong>

                <p>
                  Average risk has improved by 4.2%
                  during this period.
                </p>
              </div>

            </div>

            <div className="insight-item">

              <div className="insight-icon neutral">
                <Zap size={17} />
              </div>

              <div>
                <strong>
                  95% scan coverage
                </strong>

                <p>
                  Most of your workspace has been
                  analyzed successfully.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SCAN COVERAGE
          ===================================================== */}

      <div className="scan-coverage-card">

        <div className="coverage-left">

          <div className="coverage-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span className="analytics-section-label">
              WORKSPACE COVERAGE
            </span>

            <h2>Scan coverage</h2>

            <p>
              Your latest scan analyzed {skillsScanned} skills
              across the workspace.
            </p>
          </div>

        </div>

        <div className="coverage-right">

          <div className="coverage-value">
            <strong>{scanCoverage}%</strong>
            <span>complete</span>
          </div>

          <div className="coverage-progress">

            <div
              style={{
                width: `${scanCoverage}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}