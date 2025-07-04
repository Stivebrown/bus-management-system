import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "$rodez$";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", "mock-admin-token"); // Set mock token for analytics
      setError("");
      navigate("/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Admin Login</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Admin Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Sign In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
