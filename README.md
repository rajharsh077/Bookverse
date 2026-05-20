<div align="center">

# 📚 BookVerse

### A Full-Stack Library Management System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://bookverse-gilt.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-46E3B7?style=for-the-badge&logo=render)](https://bookverse-gs0o.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/rajharsh077/Bookverse)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-00D8FF?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

</div>

---

## 🌟 Overview

**BookVerse** is a feature-rich, full-stack Library Management System built on the **MERN stack**. It provides a seamless experience for both regular users and administrators — enabling book browsing, lending, returns, wishlist management, borrowed history tracking, and automatic overdue fine calculation. Admins get a dedicated dashboard to manage books and users across the platform.

---

## ✨ Features

### 👤 User Features
- 🔐 Secure **Signup / Login** with JWT authentication
- 📖 Browse all available books
- 📤 **Lend books** with a single click
- 📥 **Return books** easily
- ❤️ Add or remove books from your **Wishlist**
- 📋 View complete **borrowed books history**
- 💰 **Automatic fine calculation** for overdue books

### 🛠️ Admin Features
- 📊 **Admin Dashboard** with full system overview
- ➕ Add new books to the library
- 🗑️ Delete books from the inventory
- 👥 Manage users and book stock

### 🔐 Security
- JWT-based stateless authentication
- Password hashing using **bcrypt**
- **Role-Based Access Control (RBAC)** — User & Admin roles
- Protected API routes with middleware guards

---

## 🧑‍💻 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), Tailwind CSS, Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas + Mongoose ODM |
| **Auth** | JSON Web Tokens (JWT), bcrypt |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🏗️ Project Structure

```
Bookverse/
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
├── backend/                  # Node.js + Express backend
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── controllers/          # Business logic
│   ├── middleware/           # Auth & role guards
│   └── app.js
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Git](https://git-scm.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rajharsh077/Bookverse.git
cd Bookverse
```

### 2️⃣ Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
JWT_SECRET=your_secret_key
PORT=3000
MONGO_URL=your_mongodb_atlas_connection_string
```

Start the backend server:

```bash
npm start
```

### 3️⃣ Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Start the frontend development server:

```bash
npm run dev
```

The app will be live at `http://localhost:5173`.

---

## 🔗 API Reference

### 🔑 Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Login and receive JWT |

### 📚 Book Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/books` | Fetch all available books |
| `POST` | `/lend` | Lend a book |
| `DELETE` | `/return` | Return a borrowed book |

### ❤️ Wishlist Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/wishlist` | Get user's wishlist |
| `POST` | `/wishlist` | Add book to wishlist |
| `DELETE` | `/wishlist/remove` | Remove book from wishlist |

### 🛠️ Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/admin/submitBook` | Add a new book |
| `DELETE` | `/admin/delete/book/:id` | Delete a book by ID |
| `GET` | `/admin/dashboard` | Get dashboard stats |

---

## 📊 Key Functionalities

- ✅ **JWT Authentication** — Stateless, secure, role-aware
- ✅ **Real-Time Book Lending System** — Track availability instantly
- ✅ **Fine Calculation** — Auto-computed based on overdue days
- ✅ **Role-Based Access** — Separate flows for User and Admin
- ✅ **Fully Responsive UI** — Works across all screen sizes

---

## 📸 Screenshots

> *Screenshots coming soon — Home, Login, Dashboard, and Admin Panel*

---

## 🚀 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | [bookverse-gilt.vercel.app](https://bookverse-gilt.vercel.app) |
| Backend | Render | [bookverse-gs0o.onrender.com](https://bookverse-gs0o.onrender.com) |
| Database | MongoDB Atlas | 

---

## 🔮 Future Improvements

- [ ] 💳 Payment gateway integration for fine collection
- [ ] 📈 Advanced analytics dashboard for admins
- [ ] 🤖 AI-powered book recommendation system
- [ ] 📱 React Native mobile app

---

## 🤝 Contributing

Contributions are welcome!


<div align="center">

Made with ❤️ by [Raj Harsh](https://github.com/rajharsh077)

⭐ Star this repo if you found it helpful!

</div>
