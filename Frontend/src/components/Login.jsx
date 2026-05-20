import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Make sure to install this using `npm install jwt-decode`

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // ✅ Auto-redirect if token is valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // { name, email, exp, ... }
        const now = Date.now() / 1000;
        if (decoded.exp > now) {
          navigate(`/${decoded.name}`);
        } else {
          localStorage.removeItem("token"); // token expired
        }
      } catch (err) {
        localStorage.removeItem("token"); // invalid token
        console.error("Token decode error:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', formData);
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate(`/${res.data.name}`);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[90%] max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">🔐 User Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white/70 text-black placeholder:text-gray-600 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white/70 text-black placeholder:text-gray-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
