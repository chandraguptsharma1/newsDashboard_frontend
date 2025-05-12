import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginScreen from "./Auth/LoginScreen";
import Registration from "./Auth/Registration";
import PrivateRoute from "./Auth/PrivateRoute";
import NavBar from "./components/NavBar";
import NewsDashboard from "./pages/Dashboard"; // assuming this is your NewsDashboard

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected Route */}
        <Route
          path="/news"
          element={
            <PrivateRoute>
              <NewsDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
