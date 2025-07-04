import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Simulate API call
    // Replace with real API call to /api/auth/login
    if (form.email === "admin@bueabus.com" && form.password === "$rodez$") {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else if (form.email && form.password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Sign In</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" name="password" className="w-full border rounded px-3 py-2" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Login</button>
      </form>
      <div className="mt-4 text-sm text-center">
        Don't have an account? <a href="/register" className="text-blue-700 hover:underline">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
