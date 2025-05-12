import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./Auth/LoginScreen";
import Registration from "./Auth/Registration";
import PrivateRoute from "./Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<Registration />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
