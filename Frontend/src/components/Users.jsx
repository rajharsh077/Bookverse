import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  // Define the calculateFine function
  const calculateFine = (lentDate) => {
    const lent = new Date(lentDate);
    const today = new Date();
  
    // Normalize both dates to ignore the time part
    const lentOnly = new Date(lent.getFullYear(), lent.getMonth(), lent.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
    const diffDays = Math.floor((todayOnly - lentOnly) / (1000 * 60 * 60 * 24));
    const fine = diffDays > 30 ? (diffDays - 30) * 2 : 0;
  
    return { diffDays, fine };
  };
  

  useEffect(() => {
    const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
          // alert('You are not authorized. Please log in.');
          navigate('/admin');  // Redirect to admin login page
          return;
        }
    const response = await axios.get("http://localhost:3000/admin/dashboard/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (Array.isArray(response.data)) {
      setUsers(response.data);
    } else {
      setError("Received data is not in the expected format.");
    }
  } catch (err) {
    console.error("Failed to fetch users:", err);
    setError("Failed to load users.");
  } finally {
    setLoading(false);
  }
};


    fetchUsers();
  }, [navigate]);

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.length === 0 ? (
        <p className="text-gray-500 col-span-full">No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-sm text-gray-600 mb-1">ID: {user.id}</p>
            <p className="text-sm text-gray-600 mb-1">Email: {user.email}</p>
            <p className="text-sm text-gray-600 mb-3">Role: {user.role}</p>

            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Lent Books:</h4>
              {Array.isArray(user.books) && user.books.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  {user.books.map((book) => {
                    const { diffDays, fine } = calculateFine(book.lentDate);
                    return (
                      <li key={book.id}>
                        <span className="font-medium">{book.title}</span>
                        <div className="ml-4 text-xs text-gray-500">
                        Lent on: {new Date(book.lentDate).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
                          Days Since Lent: {diffDays} days<br />
                          Fine: <span className={fine > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>₹{fine}</span>
                        </div>

                        {fine > 0 && (
                          <div className="mt-1">
                            <p className={`text-xs ${book.finePaid ? 'text-green-600' : 'text-yellow-600'}`}>
                              Fine Paid: {book.finePaid ? 'Yes' : 'No'}
                            </p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic">No books lent</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
