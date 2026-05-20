import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [books, setbooks] = useState([]);

  const showBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/books/');
      setbooks(res.data);
      // After fetching, navigate to the /books page and pass the books data as state
      navigate('/books', { state: { books: res.data } });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };



  return (
    <nav className="backdrop-blur-md bg-white/10 shadow-lg rounded-xl mx-auto mt-6 w-11/12 md:w-3/4 p-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-300 via-yellow-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
        📚 BookVerse
      </h1>

      <div className="flex flex-wrap gap-8 text-lg font-medium">
        <a
          href="/login"
          className="transition-all duration-300 hover:text-yellow-300 hover:underline"
        >
          Login
        </a>
        <a
          href="/signup"
          className="transition-all duration-300 hover:text-yellow-300 hover:underline"
        >
          Signup
        </a>
        <a
          href="/admin"
          className="transition-all duration-300 hover:text-yellow-300 hover:underline"
        >
          Admin
        </a>
        <a
          href="/books"
          onClick={(e) => {
            e.preventDefault();
            showBooks();
          }}
          className="transition-all duration-300 hover:text-yellow-300 hover:underline"
        >
          Books
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
