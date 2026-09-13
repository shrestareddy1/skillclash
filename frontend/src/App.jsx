import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";


import Overview from "./pages/Overview";
import Scanner from "./pages/Scanner";
import Conflicts from "./pages/Conflicts";
import Skills from "./pages/Skills";
import Analytics from "./pages/Analytics";
import Network from "./pages/Network";
import Reports from "./pages/Reports";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />

        <div className="main-wrapper">
          <Topbar />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/overview" replace />}
              />

              <Route
                path="/overview"
                element={<Overview />}
              />

              <Route
                path="/scanner"
                element={<Scanner />}
              />

              <Route
                path="/conflicts"
                element={<Conflicts />}
              />

              <Route
                path="/skills"
                element={<Skills />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />

              <Route
                path="/network"
                element={<Network />}
              />

              <Route
                path="/reports"
                element={<Reports />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
