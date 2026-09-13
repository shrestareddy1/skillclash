import { useMemo, useState } from "react";
import {
  FileText,
  Download,
  Trash2,
  Plus,
  FileDown,
  X,
  CalendarDays,
  CheckCircle2,
  Search,
  Eye,
  Clock3,
  ShieldCheck,
  BarChart3,
  FileCheck2,
} from "lucide-react";

const initialReports = [
  {
    id: 1,
    name: "SkillClash Security Report",
    date: "Sep 13, 2026",
    format: "PDF",
    size: "2.1 MB",
    skills: 20,
    conflicts: 5,
    status: "Ready",
  },
  {
    id: 2,
    name: "SkillClash Security Report",
    date: "Sep 12, 2026",
    format: "PDF",
    size: "2.4 MB",
    skills: 20,
    conflicts: 5,
    status: "Ready",
  },
  {
    id: 3,
    name: "Conflict Analysis Export",
    date: "Sep 11, 2026",
    format: "CSV",
    size: "184 KB",
    skills: 20,
    conflicts: 5,
    status: "Ready",
  },
  {
    id: 4,
    name: "Weekly Skill Audit",
    date: "Sep 7, 2026",
    format: "PDF",
    size: "1.8 MB",
    skills: 18,
    conflicts: 4,
    status: "Ready",
  },
];

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [showModal, setShowModal] = useState(false);
  const [format, setFormat] = useState("PDF");
  const [range, setRange] = useState("Last 7 days");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const visibleReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch = report.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || report.format === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reports, search, filter]);

  const generateReport = () => {
    const newReport = {
      id: Date.now(),
      name:
        format === "PDF"
          ? "SkillClash Security Report"
          : "Conflict Analysis Export",
      date: "Sep 13, 2026",
      format,
      size: format === "PDF" ? "2.1 MB" : "156 KB",
      skills: 20,
      conflicts: 5,
      status: "Ready",
    };

    setReports((current) => [newReport, ...current]);
    setShowModal(false);
  };

  const deleteReport = (id) => {
    setReports((current) =>
      current.filter((report) => report.id !== id)
    );

    if (selectedReport?.id === id) {
      setSelectedReport(null);
    }
  };

  const downloadReport = (report) => {
    alert(`Download started for ${report.name}`);
  };

  return (
    <div className="page reports-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <div className="page-eyebrow">
            <FileText size={15} />
            REPORT CENTER
          </div>

          <h1>Reports</h1>

          <p>
            Review, export and manage your SkillClash security
            analysis.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          Generate Report
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="report-summary">
        <div className="report-summary-card">
          <div className="report-summary-icon purple">
            <FileText size={21} />
          </div>

          <div>
            <strong>{reports.length}</strong>
            <span>Total Reports</span>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <strong>{reports.length}</strong>
            <span>Reports Ready</span>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon cyan">
            <BarChart3 size={21} />
          </div>

          <div>
            <strong>20</strong>
            <span>Skills Analyzed</span>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon orange">
            <ShieldCheck size={21} />
          </div>

          <div>
            <strong>95%</strong>
            <span>Scan Coverage</span>
          </div>
        </div>
      </div>

      {/* REPORTS MAIN CARD */}
      <div className="reports-card">
        <div className="reports-card-header">
          <div>
            <h2>Generated Reports</h2>

            <p>
              Security analysis files created from your
              workspace scans.
            </p>
          </div>

          <span className="report-count">
            {visibleReports.length} files
          </span>
        </div>

        {/* TOOLBAR */}
        <div className="reports-toolbar">
          <div className="report-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="report-filters">
            {["All", "PDF", "CSV"].map((item) => (
              <button
                key={item}
                className={
                  filter === item ? "active" : ""
                }
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="reports-table">
          <div className="report-table-header">
            <span>REPORT</span>
            <span>DATE CREATED</span>
            <span>FORMAT</span>
            <span>SIZE</span>
            <span>STATUS</span>
            <span>ACTIONS</span>
          </div>

          {visibleReports.map((report) => (
            <div
              className="report-row"
              key={report.id}
            >
              {/* REPORT */}
              <div className="report-name">
                <div className="report-file-icon">
                  <FileText size={19} />
                </div>

                <div>
                  <strong>{report.name}</strong>

                  <span>
                    {report.skills} skills analyzed
                  </span>
                </div>
              </div>

              {/* DATE */}
              <div className="report-date">
                <CalendarDays size={15} />
                {report.date}
              </div>

              {/* FORMAT */}
              <div>
                <span
                  className={`format-badge ${
                    report.format === "PDF"
                      ? "pdf"
                      : "csv"
                  }`}
                >
                  {report.format}
                </span>
              </div>

              {/* SIZE */}
              <div className="report-size">
                {report.size}
              </div>

              {/* STATUS */}
              <div>
                <span className="report-status">
                  <CheckCircle2 size={14} />
                  {report.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="report-actions">
                <button
                  className="icon-action view"
                  title="View report"
                  onClick={() =>
                    setSelectedReport(report)
                  }
                >
                  <Eye size={17} />
                </button>

                <button
                  className="icon-action download"
                  title="Download report"
                  onClick={() =>
                    downloadReport(report)
                  }
                >
                  <Download size={17} />
                </button>

                <button
                  className="icon-action delete"
                  title="Delete report"
                  onClick={() =>
                    deleteReport(report.id)
                  }
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}

          {visibleReports.length === 0 && (
            <div className="empty-state">
              <FileText size={36} />

              <h3>No reports found</h3>

              <p>
                Try another search or generate a new report.
              </p>

              <button
                className="primary-btn"
                onClick={() => setShowModal(true)}
              >
                <Plus size={17} />
                Generate Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM INFORMATION */}
      <div className="reports-bottom-grid">
        <div className="report-info-panel">
          <div className="report-info-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span className="report-info-label">
              LAST GENERATED
            </span>

            <strong>Sep 13, 2026 · 05:42 PM</strong>

            <p>
              Your latest security analysis report is ready.
            </p>
          </div>
        </div>

        <div className="report-info-panel">
          <div className="report-info-icon green">
            <FileCheck2 size={20} />
          </div>

          <div>
            <span className="report-info-label">
              REPORT INTEGRITY
            </span>

            <strong>All generated files verified</strong>

            <p>
              Reports are generated from the latest scan
              results.
            </p>
          </div>
        </div>
      </div>

      {/* VIEW REPORT MODAL */}
      {selectedReport && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="report-preview-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <div className="modal-icon">
                  <FileText size={21} />
                </div>

                <h2>{selectedReport.name}</h2>

                <p>
                  Security analysis report preview.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                <X size={19} />
              </button>
            </div>

            <div className="preview-stats">
              <div>
                <strong>
                  {selectedReport.skills}
                </strong>
                <span>Skills</span>
              </div>

              <div>
                <strong>
                  {selectedReport.conflicts}
                </strong>
                <span>Conflicts</span>
              </div>

              <div>
                <strong>95%</strong>
                <span>Coverage</span>
              </div>
            </div>

            <div className="preview-details">
              <div>
                <span>Created</span>
                <strong>
                  {selectedReport.date}
                </strong>
              </div>

              <div>
                <span>Format</span>
                <strong>
                  {selectedReport.format}
                </strong>
              </div>

              <div>
                <span>File size</span>
                <strong>
                  {selectedReport.size}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="ready-text">
                  <CheckCircle2 size={14} />
                  Ready
                </strong>
              </div>
            </div>

            <div className="preview-message">
              <ShieldCheck size={19} />

              <div>
                <strong>Report verified</strong>

                <p>
                  This report contains the latest
                  SkillClash workspace analysis.
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                Close
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  downloadReport(selectedReport)
                }
              >
                <Download size={17} />
                Download {selectedReport.format}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GENERATE REPORT MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="report-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <div className="modal-icon">
                  <FileDown size={21} />
                </div>

                <h2>Generate New Report</h2>

                <p>
                  Create an export from your SkillClash
                  analysis results.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={19} />
              </button>
            </div>

            {/* DATE RANGE */}
            <div className="form-group">
              <label>Date Range</label>

              <select
                value={range}
                onChange={(event) =>
                  setRange(event.target.value)
                }
              >
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>All scans</option>
              </select>
            </div>

            {/* FORMAT */}
            <div className="form-group">
              <label>Export Format</label>

              <div className="format-options">
                <button
                  type="button"
                  className={
                    format === "PDF"
                      ? "format-option active"
                      : "format-option"
                  }
                  onClick={() => setFormat("PDF")}
                >
                  <FileText size={21} />

                  <strong>PDF</strong>

                  <span>
                    Detailed security report
                  </span>
                </button>

                <button
                  type="button"
                  className={
                    format === "CSV"
                      ? "format-option active"
                      : "format-option"
                  }
                  onClick={() => setFormat("CSV")}
                >
                  <FileText size={21} />

                  <strong>CSV</strong>

                  <span>
                    Raw conflict data
                  </span>
                </button>
              </div>
            </div>

            {/* REPORT CONTENT */}
            <div className="generate-preview">
              <div>
                <CheckCircle2 size={16} />
                Conflict analysis
              </div>

              <div>
                <CheckCircle2 size={16} />
                Risk classification
              </div>

              <div>
                <CheckCircle2 size={16} />
                Skill coverage
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={generateReport}
              >
                <FileDown size={17} />
                Generate {format}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}