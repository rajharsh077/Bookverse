import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { name } = useParams();
  const [lentBooks, setLentBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLentBooks = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.log("No token found. Redirecting to login.");
          navigate('/login');
          return;
        }

          const payload = JSON.parse(atob(token.split('.')[1])); // simple JWT decode
      const tokenUsername = payload.username || payload.name;

      if (tokenUsername !== name) {
     toast.info("Redirected to your profile.");
     navigate(`/${tokenUsername}`,{ replace: true });
  return;
}

        const res = await axios.get('http://localhost:3000/lent', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const books = res.data;
        console.log(books);

        books.forEach(book => {
          if (book.daysLent >= 27 && book.daysLent < 30) {
            const daysLeft = 30 - book.daysLent;
            toast.warn(`📢 "${book.title}" is due in ${daysLeft} day(s)!`, {
              position: "top-right",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          }
        });

        setLentBooks(books);
      } catch (err) {
        console.error("Failed to fetch lent books", err);
        setError("Failed to fetch lent books.");
      } finally {
        setLoading(false);
      }
    };

    fetchLentBooks();
  }, [name]);

  const handleReturn = async (bookId) => {
    const confirmReturn = window.confirm("Are you sure you want to return this book?");
    if (!confirmReturn) return;

    const token = localStorage.getItem('token');

    if (!token) {
      alert("You must be logged in to return a book.");
      return;
    }

    try {
      const res = await axios.delete("http://localhost:3000/return", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { bookId }
      });
      toast.success(res.data.message || "Book returned successfully!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      setLentBooks(prev => prev.filter(book => book.id !== bookId));
    } catch (err) {
      console.error("Failed to return book", err);
      toast.error(err.response?.data?.message || "Error returning book", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const handlePay = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch("http://localhost:3000/pay-fine", 
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(`✅ Fine for "${res.data.bookTitle}" paid! Returning book...`, {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });

        const returnRes = await axios.delete("http://localhost:3000/return", {
          headers: { Authorization: `Bearer ${token}` },
          data: { bookId },
        });

        toast.success(returnRes.data.message || "Book returned successfully!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });

        setLentBooks(prev => prev.filter(book => book.id !== bookId));
      } else {
        toast.error("❌ Error paying fine.", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error("Payment/return error:", err);
      toast.error("Something went wrong during payment or return.", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const handleView = (book) => {
    alert(`Title: ${book.title}\nAuthor: ${book.author}\nDays Lent: ${book.daysLent}\nFine: ₹${book.fine}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/',{ replace: true }); // Redirect to the home page or login page
  };

  if (loading) return <p>Loading your lent books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md">
  <h1 className="text-2xl font-semibold">📚 Your Lent Books</h1>
  
  <div className="flex space-x-4">
    <a
      href={`/${name}`}
      className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold"
    >
      Back
    </a>
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
    >
      Logout
    </button>
  </div>
</nav>


      {/* Greeting */}
      <div className="text-center mt-6 text-xl font-semibold">
        Hello, {name}! Here are your lent books:
      </div>

      {/* Lent Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {lentBooks.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No books lent yet.</p>
        ) : (
          lentBooks.map(book => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative">
              <img src={book.image || 'https://via.placeholder.com/150x200'} alt={book.title} className="h-48 w-full object-cover rounded" />
              <h3 className="mt-2 font-bold text-lg">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>

              <p className="mt-2 text-sm text-gray-700">
                Days Lent: <span className="font-semibold">{book.daysLent}</span>
              </p>
              <p className={`text-sm ${book.fine > 0 ? 'text-red-600' : 'text-green-600'}`}>
                Fine: ₹<span className="font-semibold">{book.fine}</span>
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4 items-center">
                {book.daysLent <= 30 ? (
                  <button
                    onClick={() => handleReturn(book.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                  >
                    Return
                  </button>
                ) : book.fine > 0 && !book.finePaid ? (
                  <button
                    onClick={() => handlePay(book.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                  >
                    Pay ₹{book.fine}
                  </button>
                ) : (
                  <span className="text-green-600 font-medium">Returned</span>
                )}

                <button
                  onClick={() => handleView(book)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default UserProfile;
