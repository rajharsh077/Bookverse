import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const Dashboard = () => {

  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    image: '',
    author: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // current time in seconds
      if (decoded.exp < now) {
        // Token expired
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
    } catch (error) {
      // Invalid token format or decode failed
      localStorage.removeItem('adminToken');
      navigate('/admin');
    }
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    if (!token) {
      setMessage("Unauthorized. Please login as admin.");
      navigate("/admin");
      return;
    }

    try {
      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/admin/submitBook`,
  bookData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (res.data.status === 'success') {
        setMessage(res.data.message);
        setBookData({ id: '', title: '', image: '', author: '' });
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error('Error submitting book:', error);
      setMessage('Failed to add book. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top bar with logout */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center p-8">
        <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <div className="mb-4">
            <label className="block font-medium">ID</label>
            <input
              type="text"
              name="id"
              value={bookData.id}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Book Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={bookData.image}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <input
            type="submit"
            value="Add Book"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          />
        </form>

        {/* Displaying the message */}
        {message && (
          <div className="mt-4 text-center text-lg font-semibold">
            {message}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <a
            href="/admin/dashboard/Allbooks"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View All Books
          </a>
          <a
            href="/"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Home
          </a>
          <a
            href="/admin/dashboard/users"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Users
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
