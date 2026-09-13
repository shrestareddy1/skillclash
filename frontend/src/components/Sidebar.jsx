import {
  LayoutDashboard,
  ScanLine,
  AlertTriangle,
  Layers,
  BarChart3,
  Share2,
  FileText,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  {
    name: "Overview",
    path: "/overview",
    icon: LayoutDashboard,
  },
  {
    name: "Scanner",
    path: "/scanner",
    icon: ScanLine,
  },
  {
    name: "Conflicts",
    path: "/conflicts",
    icon: AlertTriangle,
  },
  {
    name: "Skills",
    path: "/skills",
    icon: Layers,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Network",
    path: "/network",
    icon: Share2,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          SC
        </div>

        {!collapsed && (
          <div className="logo-text">
            <strong>SkillClash</strong>
            <span>AI SKILL INTELLIGENCE</span>
          </div>
        )}
      </div>

      {/* AI STATUS */}
      {!collapsed && (
        <div className="ai-status">
          <span className="status-dot"></span>
          AI ENGINE <b>●</b> ONLINE
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              title={collapsed ? item.name : ""}
            >
              <Icon size={19} strokeWidth={1.8} />

              {!collapsed && (
                <span>{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* USER */}
      {!collapsed && (
        <div className="sidebar-user">
          <div className="user-avatar">
            S
          </div>

          <div className="user-info">
            <strong>SkillClash User</strong>

            <button className="settings-button">
              <Settings size={14} />
              Settings
            </button>
          </div>
        </div>
      )}

      {/* COLLAPSE BUTTON */}
      <button
        className="collapse-button"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen size={19} />
        ) : (
          <PanelLeftClose size={19} />
        )}

        {!collapsed && <span>Collapse</span>}
      </button>
    </aside>
  );
}