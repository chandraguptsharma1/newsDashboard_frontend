import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { AuthProvider } from "./Auth/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
