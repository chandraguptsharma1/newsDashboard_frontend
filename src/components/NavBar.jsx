import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">News Dashboard</Link>
      </div>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="hover:underline ml-4">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
