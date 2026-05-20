import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const navigate=useNavigate();

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
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log('Signup successful', response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      alert('Signup successful!');
      navigate("/");
    } catch (error) {
      console.error('Error during signup', error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-center border border-white/30 transition duration-500 ease-in-out transform hover:scale-[1.01]">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-300 via-yellow-300 to-blue-300 bg-clip-text text-transparent mb-6 flex items-center justify-center gap-2">
          ✨ Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="block text-white font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className="w-full px-4 py-2 mt-1 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-white text-sm">
          Already have an account?{' '}
          <a href="/login" className="underline text-yellow-300 hover:text-yellow-400 transition">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
