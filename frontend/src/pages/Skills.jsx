import { useState } from "react";
import {
  Layers,
  Search,
  ArrowUpDown,
  FileCode2,
  AlertTriangle,
  CheckCircle2,
  Eye,
  X,
} from "lucide-react";

const demoSkills = [
  {
    name: "pdf-reader",
    path: "skills/pdf-reader/SKILL.md",
    modified: "Sep 12, 2026",
    conflicts: 2,
    category: "Documents",
    status: "Conflict",
  },
  {
    name: "pdf-analyzer",
    path: "skills/pdf-analyzer/SKILL.md",
    modified: "Sep 12, 2026",
    conflicts: 2,
    category: "Documents",
    status: "Conflict",
  },
  {
    name: "document-writer",
    path: "skills/document-writer/SKILL.md",
    modified: "Sep 11, 2026",
    conflicts: 0,
    category: "Documents",
    status: "Healthy",
  },
  {
    name: "image-editor",
    path: "skills/image-editor/SKILL.md",
    modified: "Sep 11, 2026",
    conflicts: 1,
    category: "Images",
    status: "Conflict",
  },
  {
    name: "image-resizer",
    path: "skills/image-resizer/SKILL.md",
    modified: "Sep 10, 2026",
    conflicts: 0,
    category: "Images",
    status: "Healthy",
  },
  {
    name: "web-search",
    path: "skills/web-search/SKILL.md",
    modified: "Sep 10, 2026",
    conflicts: 0,
    category: "Web",
    status: "Healthy",
  },
  {
    name: "web-scraper",
    path: "skills/web-scraper/SKILL.md",
    modified: "Sep 10, 2026",
    conflicts: 1,
    category: "Web",
    status: "Conflict",
  },
  {
    name: "code-generator",
    path: "skills/code-generator/SKILL.md",
    modified: "Sep 9, 2026",
    conflicts: 1,
    category: "Development",
    status: "Conflict",
  },
  {
    name: "code-reviewer",
    path: "skills/code-reviewer/SKILL.md",
    modified: "Sep 9, 2026",
    conflicts: 1,
    category: "Development",
    status: "Conflict",
  },
  {
    name: "code-debugger",
    path: "skills/code-debugger/SKILL.md",
    modified: "Sep 8, 2026",
    conflicts: 0,
    category: "Development",
    status: "Healthy",
  },
  {
    name: "data-analyzer",
    path: "skills/data-analyzer/SKILL.md",
    modified: "Sep 8, 2026",
    conflicts: 0,
    category: "Data",
    status: "Healthy",
  },
  {
    name: "spreadsheet-reader",
    path: "skills/spreadsheet-reader/SKILL.md",
    modified: "Sep 7, 2026",
    conflicts: 0,
    category: "Data",
    status: "Healthy",
  },
];

export default function Skills() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = [...demoSkills]
    .filter((skill) =>
      `${skill.name} ${skill.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const healthyCount = demoSkills.filter(
    (skill) => skill.status === "Healthy"
  ).length;

  const conflictCount = demoSkills.filter(
    (skill) => skill.status === "Conflict"
  ).length;

  return (
    <div className="page skills-page">

      {/* HEADER */}
      <div className="skills-page-header">

        <div>
          <span className="skills-eyebrow">
            <Layers size={14} />
            SKILL LIBRARY
          </span>

          <h1>Skills</h1>

          <p>
            Browse detected skills, inspect metadata, and identify
            conflicts across your skill library.
          </p>
        </div>

        <button type="button" className="skills-add-button">
          <Layers size={17} />
          Add Skill
        </button>

      </div>

      {/* SUMMARY */}
      <div className="skills-summary-grid">

        <div className="skills-summary-card">

          <div className="skills-summary-icon purple">
            <Layers size={19} />
          </div>

          <div>
            <span>TOTAL SKILLS</span>
            <strong>{demoSkills.length}</strong>
            <small>Detected in workspace</small>
          </div>

        </div>

        <div className="skills-summary-card">

          <div className="skills-summary-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>HEALTHY</span>
            <strong>{healthyCount}</strong>
            <small>Working without conflicts</small>
          </div>

        </div>

        <div className="skills-summary-card">

          <div className="skills-summary-icon red">
            <AlertTriangle size={19} />
          </div>

          <div>
            <span>WITH CONFLICTS</span>
            <strong>{conflictCount}</strong>
            <small>Require attention</small>
          </div>

        </div>

      </div>

      {/* TOOLBAR */}
      <div className="skills-toolbar-new">

        <div className="skills-search">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search skills or categories..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              type="button"
              className="skills-clear-search"
              onClick={() => setSearch("")}
            >
              <X size={13} />
            </button>
          )}

        </div>

        <button
          type="button"
          className="skills-sort-button"
          onClick={() => setSortAsc(!sortAsc)}
        >
          <ArrowUpDown size={15} />
          Sort by Name
          <span>{sortAsc ? "A–Z" : "Z–A"}</span>
        </button>

      </div>

      {/* TABLE */}
      <div className="skills-library-card">

        <div className="skills-table-title">
          <div>
            <h2>Skill Inventory</h2>
            <p>
              {filteredSkills.length} of {demoSkills.length} skills
              displayed
            </p>
          </div>

          <span className="skills-live-indicator">
            <span />
            Live workspace
          </span>
        </div>

        <div className="skills-table-scroll">

          <div className="skills-table-head">
            <span>SKILL</span>
            <span>PATH</span>
            <span>CATEGORY</span>
            <span>MODIFIED</span>
            <span>CONFLICTS</span>
            <span>STATUS</span>
            <span>ACTION</span>
          </div>

          {filteredSkills.map((skill) => (
            <div
              className="skills-table-row"
              key={skill.name}
            >

              <div className="skills-name-cell">

                <div className="skills-file-icon">
                  <FileCode2 size={17} />
                </div>

                <div>
                  <strong>{skill.name}</strong>
                  <small>SKILL.md</small>
                </div>

              </div>

              <div className="skills-path-cell">
                {skill.path}
              </div>

              <div>
                <span className="skills-category">
                  {skill.category}
                </span>
              </div>

              <div className="skills-modified">
                {skill.modified}
              </div>

              <div>
                <span
                  className={`skills-conflict-number ${
                    skill.conflicts > 0
                      ? "has-conflict"
                      : "no-conflict"
                  }`}
                >
                  {skill.conflicts}
                </span>
              </div>

              <div>
                {skill.status === "Healthy" ? (
                  <span className="skills-status healthy">
                    <CheckCircle2 size={12} />
                    Healthy
                  </span>
                ) : (
                  <span className="skills-status conflict">
                    <AlertTriangle size={12} />
                    Conflict
                  </span>
                )}
              </div>

              <div>
                <button
                  type="button"
                  className="skills-view-button"
                  onClick={() => setSelectedSkill(skill)}
                >
                  <Eye size={14} />
                  View
                </button>
              </div>

            </div>
          ))}

          {filteredSkills.length === 0 && (
            <div className="skills-empty">
              <Search size={28} />
              <h3>No skills found</h3>
              <p>Try another skill name or category.</p>
            </div>
          )}

        </div>
      </div>

      {/* MODAL */}
      {selectedSkill && (
        <div
          className="skills-modal-overlay"
          onClick={() => setSelectedSkill(null)}
        >

          <div
            className="skills-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="skills-modal-top">

              <div className="skills-modal-icon">
                <FileCode2 size={21} />
              </div>

              <button
                type="button"
                className="skills-modal-close"
                onClick={() => setSelectedSkill(null)}
              >
                <X size={17} />
              </button>

            </div>

            <div className="skills-modal-title">
              <h2>{selectedSkill.name}</h2>

              {selectedSkill.status === "Healthy" ? (
                <span className="skills-status healthy">
                  <CheckCircle2 size={12} />
                  Healthy
                </span>
              ) : (
                <span className="skills-status conflict">
                  <AlertTriangle size={12} />
                  Conflict
                </span>
              )}
            </div>

            <p className="skills-modal-description">
              Skill metadata and conflict information.
            </p>

            <div className="skills-detail-grid">

              <div>
                <span>File path</span>
                <strong>{selectedSkill.path}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{selectedSkill.category}</strong>
              </div>

              <div>
                <span>Last modified</span>
                <strong>{selectedSkill.modified}</strong>
              </div>

              <div>
                <span>Conflicts found</span>
                <strong>{selectedSkill.conflicts}</strong>
              </div>

            </div>

            <button
              type="button"
              className="skills-modal-button"
              onClick={() => setSelectedSkill(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}