import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    // Check if there's an existing token in localStorage, if so redirect to the dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard'); // Redirect if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/admin/dashboard', formData);
       const { token } = res.data;
    
    // Save the token in localStorage after a successful login
      localStorage.setItem('adminToken', token);
      console.log('Login success:', res.data);
      navigate('/admin/dashboard'); // or wherever the dashboard is
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/30 text-white transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent text-center mb-6 animate-pulse">
          🔐 Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block font-semibold mb-1 text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-500 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold mb-1 text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-500 shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-white/80">
          Forgot your password? <a href="#" className="underline hover:text-yellow-300">Recover</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
