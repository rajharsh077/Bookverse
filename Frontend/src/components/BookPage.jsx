import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import search icon

const BookPage = () => {
  const location = useLocation();
  const books = location.state?.books || [];
  
  // State for the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-12">
        {/* BookVerse Title with Book Emoji */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl">📚</span>
          <h1 className="text-2xl font-bold text-white">BookVerse</h1>
        </div>

        {/* Home Button */}
        <a
          href="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-5 py-2 rounded-full transition duration-200 shadow-md"
        >
          Home
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full py-3 pl-10 pr-4 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Introduction Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Explore Our Curated Collection</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Dive into a world of knowledge and imagination with books from various genres. Your next great read is just a click away!
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <img
                src={book.image || 'https://via.placeholder.com/150x200'}
                alt={book.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">{book.title}</h3>
                <p className="text-sm text-gray-400">{book.author}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-3">{book.description}</p>

                {/* Buttons */}
                <div className="mt-5 flex justify-between items-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition duration-200 shadow-md">
                    🔍 View
                  </button>
                  <button
                    onClick={() => (window.location.href = '/login')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-sm px-4 py-2 rounded-full transition duration-200 shadow-md"
                  >
                    🤝 Lend
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl col-span-full">No books found.</p>
        )}
      </div>

      {/* Beautiful Content at the Bottom */}
      <div className="text-center mt-16 mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">More Books Available Soon!</h2>
        <p className="text-lg text-gray-400 mb-6">
          We're constantly adding new titles to our collection. Stay tuned for more exciting reads in the near future!
        </p>
        <a
          href="#"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-full transition duration-200 shadow-md"
        >
          Subscribe for Updates
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 mt-16">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 BookVerse. All Rights Reserved.</p>
          <p className="mt-2 text-sm">Created with ❤️ for book lovers.</p>
          <div className="mt-4">
            <a href="#" className="text-yellow-500 hover:text-yellow-600 mx-3">Privacy Policy</a>
            <a href="#" className="text-yellow-500 hover:text-yellow-600 mx-3">Terms of Service</a>
            <a href="#" className="text-yellow-500 hover:text-yellow-600 mx-3">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookPage;
