import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx';
import BookPage from './components/BookPage.jsx';
import SignUp from './components/Signup.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import Dashboard from './components/Dashboard.jsx';
import AllBooks from './components/AllBooks.jsx';
import Login from './components/Login.jsx';
import Params from './components/Params.jsx';
import UserProfile from './components/UserProfile.jsx';
import Users from './components/Users.jsx';
import WishList from './components/WishList.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <BookPage />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard/users",
    element: <Users />,
  },
  {
    path: "/admin/dashboard/Allbooks",
    element: <AllBooks />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/:name",
    element: <Params />,
  },

  {
    path: "/:name/profile",
    element: <UserProfile />,
  },
  {
    path: "/:name/wishlist",
    element: <WishList />,
  },




]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
