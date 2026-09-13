import { useRef, useState } from "react";
import {
  Upload,
  GitBranch,
  ClipboardPaste,
  FolderOpen,
  ScanLine,
  FileArchive,
  CheckCircle2,
  Clock3,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    id: "zip",
    label: "Upload ZIP",
    icon: Upload,
  },
  {
    id: "github",
    label: "GitHub URL",
    icon: GitBranch,
  },
  {
    id: "paste",
    label: "Paste Skills",
    icon: ClipboardPaste,
  },
  {
    id: "folder",
    label: "Connect Folder",
    icon: FolderOpen,
  },
];

const initialHistory = [
  {
    id: 1,
    name: "skills.zip",
    source: "ZIP Upload",
    skills: 5,
    conflicts: 3,
    risk: "High",
    date: "Today, 10:42 AM",
    status: "Completed",
  },
  {
    id: 2,
    name: "production-skills.zip",
    source: "ZIP Upload",
    skills: 12,
    conflicts: 4,
    risk: "Medium",
    date: "Yesterday, 4:18 PM",
    status: "Completed",
  },
  {
    id: 3,
    name: "team-skills",
    source: "GitHub",
    skills: 8,
    conflicts: 1,
    risk: "Low",
    date: "Sep 10, 2026",
    status: "Completed",
  },
];

export default function Scanner() {
  const [activeTab, setActiveTab] = useState("zip");
  const [file, setFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [pastedSkills, setPastedSkills] = useState("");
  const [scanning, setScanning] = useState(false);
  const [history, setHistory] = useState(initialHistory);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".zip")) {
      alert("Please select a ZIP file.");
      return;
    }

    const MAX_SIZE = 50 * 1024 * 1024;

    if (selectedFile.size > MAX_SIZE) {
      const actualSize = (
        selectedFile.size /
        (1024 * 1024)
      ).toFixed(2);

      alert(
        `File is too large!\n\nYour file: ${actualSize} MB\nMaximum allowed: 50 MB\n\nPlease choose a smaller ZIP file.`
      );

      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleScan = () => {
    if (activeTab === "zip" && !file) {
      alert("Please upload a ZIP file first.");
      return;
    }

    if (activeTab === "github" && !githubUrl.trim()) {
      alert("Please enter a GitHub URL.");
      return;
    }

    if (activeTab === "paste" && !pastedSkills.trim()) {
      alert("Please paste your SKILL.md content.");
      return;
    }

    if (activeTab === "folder") {
      alert("Folder connection will be available soon.");
      return;
    }

    setScanning(true);

    setTimeout(() => {
      const newScan = {
        id: Date.now(),

        name:
          activeTab === "zip"
            ? file.name
            : activeTab === "github"
            ? githubUrl
            : "Pasted Skills",

        source:
          activeTab === "zip"
            ? "ZIP Upload"
            : activeTab === "github"
            ? "GitHub"
            : "Pasted Skills",

        skills:
          activeTab === "paste"
            ? 1
            : 5,

        conflicts: 3,

        risk: "High",

        date: "Just now",

        status: "Completed",
      };

      setHistory((previous) => [
        newScan,
        ...previous,
      ]);

      setScanning(false);

      /*
        CONNECT SCAN DIRECTLY TO REPORT
      */
      navigate("/reports", {
        state: {
          scan: newScan,
          fromScanner: true,
        },
      });
    }, 1500);
  };

  const handleViewReport = (scan) => {
    navigate("/reports", {
      state: {
        scan,
        fromScanner: true,
      },
    });
  };

  return (
    <div className="page scanner-page">

      {/* HEADER */}
      <div className="page-header scanner-header">

        <div>
          <span className="eyebrow">
            <ScanLine size={15} />
            SKILL SCANNER
          </span>

          <h1>Scan your skills</h1>

          <p>
            Upload your skill collection and detect
            overlapping or contradictory instructions.
          </p>
        </div>

        <div className="scanner-status">
          <span className="status-dot"></span>
          AI Engine Ready
        </div>

      </div>


      {/* TABS */}
      <div className="scanner-tabs">

        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              className={`scanner-tab ${
                activeTab === tab.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(tab.id)
              }
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}

      </div>


      {/* SCANNER BOX */}
      <section className="scanner-panel">

        {/* ZIP UPLOAD */}
        {activeTab === "zip" && (

          <div className="zip-content">

            {!file ? (

              <div
                className="dropzone"
                onDragOver={(event) =>
                  event.preventDefault()
                }
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip"
                  hidden
                  onChange={(event) =>
                    handleFile(
                      event.target.files?.[0]
                    )
                  }
                />

                <div className="upload-icon">
                  <Upload size={28} />
                </div>

                <h3>
                  Drop your ZIP file here
                </h3>

                <p>
                  or click to browse from
                  your computer
                </p>

                <span className="upload-limit">
                  ZIP files only · Maximum
                  size 50 MB
                </span>

              </div>

            ) : (

              <div className="uploaded-file">

                <div className="uploaded-file-icon">
                  <FileArchive size={28} />
                </div>

                <div className="uploaded-file-info">

                  <strong>
                    {file.name}
                  </strong>

                  <p>
                    {(
                      file.size /
                      (1024 * 1024)
                    ).toFixed(2)} MB
                    {" "}of 50 MB maximum
                  </p>

                  <small>
                    <CheckCircle2 size={12} />
                    Ready to scan
                  </small>

                </div>

                <button
                  type="button"
                  className="choose-file-button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  Choose another ZIP
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip"
                  hidden
                  onChange={(event) =>
                    handleFile(
                      event.target.files?.[0]
                    )
                  }
                />

              </div>

            )}

          </div>

        )}


        {/* GITHUB */}
        {activeTab === "github" && (

          <div className="input-panel">

            <div className="large-input-icon">
              <GitBranch size={28} />
            </div>

            <h3>
              Connect a GitHub repository
            </h3>

            <p>
              Enter the URL of the repository
              containing your SKILL.md files.
            </p>

            <div className="url-input">

              <GitBranch size={18} />

              <input
                type="text"
                placeholder="https://github.com/username/repository"
                value={githubUrl}
                onChange={(event) =>
                  setGithubUrl(
                    event.target.value
                  )
                }
              />

            </div>

          </div>

        )}


        {/* PASTE */}
        {activeTab === "paste" && (

          <div className="input-panel paste-panel">

            <div className="large-input-icon">
              <ClipboardPaste size={28} />
            </div>

            <h3>
              Paste your SKILL.md content
            </h3>

            <p>
              Paste one or more skill
              definitions below.
            </p>

            <textarea
              placeholder={`---
name: example-skill
description: Describe when this skill should be used.
---

Your skill instructions...`}
              value={pastedSkills}
              onChange={(event) =>
                setPastedSkills(
                  event.target.value
                )
              }
            />

          </div>

        )}


        {/* FOLDER */}
        {activeTab === "folder" && (

          <div className="input-panel">

            <div className="large-input-icon">
              <FolderOpen size={28} />
            </div>

            <h3>
              Connect a local folder
            </h3>

            <p>
              Connect a folder containing
              your SKILL.md files directly
              from your workspace.
            </p>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                alert(
                  "Folder connection will be available soon."
                )
              }
            >
              <FolderOpen size={18} />
              Choose Folder
            </button>

          </div>

        )}

      </section>


      {/* SCAN BUTTON */}
      <button
        type="button"
        className="scan-button"
        onClick={handleScan}
        disabled={scanning}
      >

        <ScanLine size={19} />

        {scanning
          ? "Analyzing Skills..."
          : "Scan for Conflicts"}

        {!scanning && (
          <ArrowRight size={18} />
        )}

      </button>


      {/* PROFESSIONAL INFO CARDS */}
      <div className="scanner-info-grid">

        <div className="scanner-info-card">

          <div className="info-card-icon">
            <FileText size={20} />
          </div>

          <div>
            <strong>
              What gets scanned?
            </strong>

            <p>
              Skill names, descriptions and
              instructions are analyzed for
              trigger overlap.
            </p>
          </div>

        </div>


        <div className="scanner-info-card">

          <div className="info-card-icon">
            <ScanLine size={20} />
          </div>

          <div>
            <strong>
              AI-powered analysis
            </strong>

            <p>
              Similar skills are reviewed by
              the AI engine for real conflicts.
            </p>
          </div>

        </div>


        <div className="scanner-info-card">

          <div className="info-card-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <strong>
              Safe scanning
            </strong>

            <p>
              Files are checked before
              processing and oversized ZIP
              files are rejected.
            </p>
          </div>

        </div>

      </div>


      {/* SCAN HISTORY */}
      <section className="panel scan-history-panel">

        <div className="panel-header">

          <div>
            <h2>
              Scan History
            </h2>

            <p>
              Previous skill scans and
              their results.
            </p>
          </div>

        </div>


        <div className="table-wrapper">

          <table className="scan-table">

            <thead>

              <tr>
                <th>SCAN</th>
                <th>SOURCE</th>
                <th>SKILLS</th>
                <th>CONFLICTS</th>
                <th>RISK</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th></th>
              </tr>

            </thead>


            <tbody>

              {history.map((item) => (

                <tr key={item.id}>

                  <td>

                    <div className="scan-name">

                      <div className="scan-file-icon">
                        <FileArchive size={16} />
                      </div>

                      <strong>
                        {item.name}
                      </strong>

                    </div>

                  </td>


                  <td>
                    {item.source}
                  </td>


                  <td>
                    {item.skills}
                  </td>


                  <td>

                    <span className="conflict-count">
                      {item.conflicts}
                    </span>

                  </td>


                  <td>

                    <span
                      className={`risk-badge ${item.risk.toLowerCase()}`}
                    >
                      {item.risk}
                    </span>

                  </td>


                  <td>

                    <span className="scan-date">

                      <Clock3 size={13} />

                      {item.date}

                    </span>

                  </td>


                  <td>

                    <span className="status-badge">

                      <CheckCircle2 size={13} />

                      {item.status}

                    </span>

                  </td>


                  <td>

                    <button
                      type="button"
                      className="table-link"
                      onClick={() =>
                        handleViewReport(item)
                      }
                    >
                      View Report →
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}