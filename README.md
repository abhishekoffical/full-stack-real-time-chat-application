# Talkie — Real-Time Chat Application

A full-stack real-time messaging app built with the MERN stack and Socket.io. Users can sign up, chat one-on-one in real time, see who's online, share images/videos, and manage their profile.

**Live demo:** _add your deployed link here once live_
**Video walkthrough:** _optional — add a Loom/YouTube link_

---

## Features

- 🔐 JWT authentication with secure httpOnly cookies (not localStorage)
- 💬 Real-time one-to-one messaging via Socket.io — no page refresh needed
- 🟢 Live online/offline status for all users
- 🖼️ Image & video sharing in chat, uploaded to Cloudinary
- 👤 Editable user profile with avatar upload
- 📱 Responsive UI built with Tailwind CSS

## Tech Stack

**Frontend:** React 19, Vite, Redux Toolkit, React Router, Axios, Socket.io-client, Tailwind CSS
**Backend:** Node.js, Express 5, MongoDB (Mongoose), Socket.io, JWT, bcryptjs
**File storage:** Cloudinary
**Deployment:** Vercel (frontend) + Render (backend) + MongoDB Atlas

## Architecture

```
React (Vercel) ── REST API (HTTPS) ──▶ Express (Render) ──▶ MongoDB Atlas
       │                                      │
       └──────── WebSocket (Socket.io) ───────┘
                                               │
                                               ▼
                                          Cloudinary (media)
```

## Project Structure

```
BACKEND/            → Express REST API + Socket.io server
  Controllers/       → Route handlers (auth, users, messages)
  models/             → Mongoose schemas (User, Message)
  routes/             → API route definitions
  middlewares/         → JWT auth middleware
  utils/               → JWT helper, Socket.io setup, error handling

FRONTEND/merastack chatapplication/  → React app (Vite)
  src/Pages/            → Login, Register, Home, Profile
  src/Components/        → Navbar, Sidebar, ChatContainer, MessageInput, etc.
  src/store/              → Redux Toolkit slices (auth, chat)
  src/lib/                  → Axios instance, Socket.io client setup
```

## Getting Started (local development)

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local MongoDB or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- A free [Cloudinary](https://cloudinary.com/) account

### 1. Clone the repo
```bash
git clone https://github.com/abhishekoffical/full-stack-real-time-chat-application.git
cd full-stack-real-time-chat-application
```

### 2. Backend setup
```bash
cd BACKEND
npm install
```
Create `BACKEND/Config/config.env` (copy `Config/config.env.example` and fill in your values — see that file for the full list of variables needed).

```bash
npm run dev
```
Backend runs on `http://localhost:4000`.

### 3. Frontend setup
```bash
cd "FRONTEND/merastack chatapplication"
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`. No `.env` file is needed for local development — it talks to `localhost:4000` automatically.

## API Overview

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/api/v1/user/sign-up` | Register a new user | ❌ |
| POST | `/api/v1/user/sign-in` | Log in | ❌ |
| GET | `/api/v1/user/sign-out` | Log out | ✅ |
| GET | `/api/v1/user/me` | Get current logged-in user | ✅ |
| PUT | `/api/v1/user/update-profile` | Update name/email/avatar | ✅ |
| GET | `/api/v1/message/users` | Get all users (for sidebar) | ✅ |
| GET | `/api/v1/message/:id` | Get chat history with a user | ✅ |
| POST | `/api/v1/message/send/:id` | Send a message (text/media) | ✅ |

## Known Limitations / Roadmap

- No message pagination yet (all messages load at once)
- No typing indicators or read receipts
- Online-status tracking is in-memory — would need Redis to scale across multiple server instances
- No automated tests yet

## License

MIT (or update to whatever you prefer)
