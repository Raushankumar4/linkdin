# 📰 MERN Public Feed App

A full-stack MERN (MongoDB, Express, React, Node.js) application featuring user authentication and a public post feed. Authenticated users can create, update, and delete posts. Visitors can view user profiles and all public posts.

## 🚀 Features

- 🔐 User Authentication (JWT)
- 📝 Create, Read Posts as Instruction
- 👤 Public User Profile Pages
- 💬 Public Post Feed
- 📡 React Query (TanStack Query) for data fetching and cache
- 🎨 Tailwind CSS for responsive UI
- 🛡 Protected Routes using Auth Context

--

---

## 🧱 Tech Stack

### Frontend

- React
- React Router
- TanStack Query (React Query)
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt
- CORS, cookie-parser

---

## 🛠 Setup Instructions

### 1. Clone the repo

```bash
git clone repolink
cd project
```

Environment Variables
Create a .env file in both client and server directories.

📁 server/.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

client/.env
VITE_API_URL=http://localhost:5000/api

# Backend

cd server
npm install

# Frontend

cd ../client
npm install

# In one terminal - Backend

cd server
npm run dev

# In another terminal - Frontend

cd client
npm run dev
