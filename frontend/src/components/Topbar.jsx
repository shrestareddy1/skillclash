import {
  Search,
  Bell,
  ChevronDown,
  Command,
  CheckCircle2,
  AlertTriangle,
  ScanLine,
  User,
  Settings,
  ShieldCheck,
  X,
  Building2,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function Topbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfilePanel, setShowProfilePanel] =
    useState(false);

  const [showSettingsPanel, setShowSettingsPanel] =
    useState(false);

  // Saved theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("skillclash-theme") || "Dark";
  });

  // Temporary theme selection inside Settings
  const [selectedTheme, setSelectedTheme] =
    useState(theme);


  /* =========================================
     APPLY SAVED THEME
  ========================================= */

  useEffect(() => {
    if (theme === "Light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }

    localStorage.setItem(
      "skillclash-theme",
      theme
    );
  }, [theme]);


  /* =========================================
     OPEN SETTINGS
  ========================================= */

  const openSettings = () => {
    setSelectedTheme(theme);
    setShowProfile(false);
    setShowNotifications(false);
    setShowSettingsPanel(true);
  };


  /* =========================================
     OPEN PROFILE
  ========================================= */

  const openProfile = () => {
    setShowProfile(false);
    setShowNotifications(false);
    setShowProfilePanel(true);
  };


  /* =========================================
     SAVE SETTINGS
  ========================================= */

  const saveSettings = () => {
    setTheme(selectedTheme);
    setShowSettingsPanel(false);
  };


  /* =========================================
     CLOSE MENUS
  ========================================= */

  const closeMenus = () => {
    setShowProfile(false);
    setShowNotifications(false);
  };


  return (
    <>
      {/* =====================================
          TOPBAR
      ===================================== */}

      <header className="topbar">

        {/* SEARCH */}

        <div className="global-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search skills, conflicts, reports..."
          />

          <div className="search-shortcut">
            <Command size={12} />
            K
          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="topbar-actions">

          {/* =================================
              NOTIFICATIONS
          ================================= */}

          <div className="notification-wrapper">

            <button
              type="button"
              className="icon-button notification-button"
              onClick={() => {
                setShowNotifications(
                  !showNotifications
                );

                setShowProfile(false);
              }}
            >

              <Bell size={19} />

              <span className="notification-badge">
                3
              </span>

            </button>


            {showNotifications && (
              <div className="notification-menu">

                <div className="notification-header">

                  <div>
                    <strong>
                      Notifications
                    </strong>

                    <span>
                      Recent activity
                    </span>
                  </div>

                  <b>3</b>

                </div>


                <div className="notification-item">

                  <div className="notification-icon purple">
                    <ScanLine size={16} />
                  </div>

                  <div>

                    <strong>
                      New scan completed
                    </strong>

                    <span>
                      3 conflicts detected
                    </span>

                    <small>
                      2 hours ago
                    </small>

                  </div>

                </div>


                <div className="notification-item">

                  <div className="notification-icon red">
                    <AlertTriangle size={16} />
                  </div>

                  <div>

                    <strong>
                      Conflict detected
                    </strong>

                    <span>
                      pdf-reader needs attention
                    </span>

                    <small>
                      4 hours ago
                    </small>

                  </div>

                </div>


                <div className="notification-item">

                  <div className="notification-icon green">
                    <CheckCircle2 size={16} />
                  </div>

                  <div>

                    <strong>
                      Conflict resolved
                    </strong>

                    <span>
                      pdf-analyzer was resolved
                    </span>

                    <small>
                      Yesterday
                    </small>

                  </div>

                </div>

              </div>
            )}

          </div>


          {/* =================================
              PROFILE
          ================================= */}

          <div className="profile-wrapper">

            <button
              type="button"
              className="profile-button"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >

              <div className="topbar-avatar">
                S
              </div>

              <div className="profile-info">

                <strong>
                  SkillClash
                </strong>

                <span>
                  Admin
                </span>

              </div>

              <ChevronDown size={16} />

            </button>


            {showProfile && (
              <div className="profile-menu">

                {/* PROFILE HEADER */}

                <div className="profile-menu-header">

                  <div className="profile-menu-avatar">
                    S
                  </div>

                  <div className="profile-menu-user">

                    <strong>
                      SkillClash
                    </strong>

                    <span>
                      Workspace Admin
                    </span>

                  </div>

                </div>


                {/* ONLINE */}

                <div className="profile-status">

                  <span className="online-dot"></span>

                  <span>
                    Workspace online
                  </span>

                </div>


                {/* PROFILE */}

                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={openProfile}
                >

                  <User size={17} />

                  <span>
                    Profile
                  </span>

                </button>


                {/* SETTINGS */}

                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={openSettings}
                >

                  <Settings size={17} />

                  <span>
                    Settings
                  </span>

                </button>


                {/* WORKSPACE */}

                <div className="profile-workspace">

                  <ShieldCheck size={16} />

                  <div>

                    <strong>
                      SkillClash Workspace
                    </strong>

                    <span>
                      Protected environment
                    </span>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </header>


      {/* =====================================
          PROFILE PANEL
      ===================================== */}

      {showProfilePanel && (

        <div
          className="topbar-modal-overlay"
          onClick={() =>
            setShowProfilePanel(false)
          }
        >

          <div
            className="topbar-modal profile-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="topbar-modal-close"
              onClick={() =>
                setShowProfilePanel(false)
              }
            >
              <X size={19} />
            </button>


            <div className="profile-panel-heading">

              <div className="profile-panel-avatar">
                S
              </div>

              <div>

                <span className="panel-eyebrow">
                  WORKSPACE PROFILE
                </span>

                <h2>
                  SkillClash
                </h2>

                <p>
                  Workspace Administrator
                </p>

              </div>

            </div>


            <div className="profile-detail-grid">

              <div className="profile-detail-card">

                <Building2 size={18} />

                <div>
                  <span>
                    Workspace
                  </span>

                  <strong>
                    SkillClash
                  </strong>
                </div>

              </div>


              <div className="profile-detail-card">

                <ShieldCheck size={18} />

                <div>
                  <span>
                    Access
                  </span>

                  <strong>
                    Administrator
                  </strong>
                </div>

              </div>


              <div className="profile-detail-card">

                <CheckCircle2 size={18} />

                <div>
                  <span>
                    Status
                  </span>

                  <strong className="online-text">
                    Online
                  </strong>
                </div>

              </div>


              <div className="profile-detail-card">

                <ScanLine size={18} />

                <div>
                  <span>
                    Workspace Mode
                  </span>

                  <strong>
                    Security Analysis
                  </strong>
                </div>

              </div>

            </div>


            <div className="profile-panel-footer">

              <ShieldCheck size={17} />

              <span>
                Your SkillClash workspace is ready
                for secure skill analysis.
              </span>

            </div>

          </div>

        </div>
      )}


      {/* =====================================
          SETTINGS PANEL
      ===================================== */}

      {showSettingsPanel && (

        <div
          className="topbar-modal-overlay"
          onClick={() =>
            setShowSettingsPanel(false)
          }
        >

          <div
            className="topbar-modal settings-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="topbar-modal-close"
              onClick={() =>
                setShowSettingsPanel(false)
              }
            >
              <X size={19} />
            </button>


            {/* SETTINGS HEADER */}

            <div className="settings-heading">

              <div className="settings-heading-icon">
                <Settings size={21} />
              </div>

              <div>

                <span className="panel-eyebrow">
                  WORKSPACE SETTINGS
                </span>

                <h2>
                  Settings
                </h2>

                <p>
                  Customize your SkillClash workspace.
                </p>

              </div>

            </div>


            {/* GENERAL */}

            <div className="settings-section">

              <div className="settings-section-title">
                GENERAL
              </div>


              <div className="settings-row">

                <div className="settings-row-icon">
                  <Monitor size={18} />
                </div>

                <div className="settings-row-text">

                  <strong>
                    Workspace mode
                  </strong>

                  <span>
                    Security analysis environment
                  </span>

                </div>

                <span className="settings-value">
                  Active
                </span>

              </div>


              <div className="settings-row">

                <div className="settings-row-icon">
                  <ShieldCheck size={18} />
                </div>

                <div className="settings-row-text">

                  <strong>
                    AI analysis
                  </strong>

                  <span>
                    Conflict detection engine
                  </span>

                </div>

                <span className="settings-value online">
                  Online
                </span>

              </div>

            </div>


            {/* APPEARANCE */}

            <div className="settings-section">

              <div className="settings-section-title">
                APPEARANCE
              </div>


              <div className="theme-options">

                {/* DARK */}

                <button
                  type="button"
                  className={
                    selectedTheme === "Dark"
                      ? "theme-option active"
                      : "theme-option"
                  }
                  onClick={() =>
                    setSelectedTheme("Dark")
                  }
                >

                  <Moon size={19} />

                  <div>

                    <strong>
                      Dark
                    </strong>

                    <span>
                      Dark workspace
                    </span>

                  </div>

                </button>


                {/* LIGHT */}

                <button
                  type="button"
                  className={
                    selectedTheme === "Light"
                      ? "theme-option active"
                      : "theme-option"
                  }
                  onClick={() =>
                    setSelectedTheme("Light")
                  }
                >

                  <Sun size={19} />

                  <div>

                    <strong>
                      Light
                    </strong>

                    <span>
                      Light workspace
                    </span>

                  </div>

                </button>

              </div>

            </div>


            {/* SETTINGS FOOTER */}

            <div className="settings-footer">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setShowSettingsPanel(false)
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="primary-btn"
                onClick={saveSettings}
              >

                <CheckCircle2 size={16} />

                Save Settings

              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}