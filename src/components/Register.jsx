import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess("Registration successful! Please login.");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Sign Up</h2>
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" name="name" className="w-full border rounded px-3 py-2" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" name="password" className="w-full border rounded px-3 py-2" value={form.password} onChange={handleChange} required minLength={6} />
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Register</button>
      </form>
      <div className="mt-4 text-sm text-center">
        Already have an account? <a href="/login" className="text-blue-700 hover:underline">Sign in</a>
      </div>
    </div>
  );
};

export default Register;
