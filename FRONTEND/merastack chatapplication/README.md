# Talkie — Frontend

React (Vite) frontend for the Talkie real-time chat application.

> See the [root README](../../README.md) for the full project overview, architecture, and backend setup.

## Tech Stack

- React 19 + Vite
- Redux Toolkit (state management)
- React Router v7
- Axios (REST API calls)
- Socket.io-client (real-time messaging & online status)
- Tailwind CSS
- React Toastify (notifications)

## Setup

```bash
npm install
npm run dev
```
Runs on `http://localhost:5173` by default. **No `.env` file needed for local development** — it talks to the backend at `http://localhost:4000` automatically (see `src/lib/axios.js` / `src/lib/socket.js`).

## Environment Variables (production build only)

Only needed when building for a **deployed** environment (e.g. Vercel), where frontend and backend run on different domains. See [`.env.example`](./.env.example).

| Variable | Description |
|---|---|
| `VITE_API_URL` | Deployed backend REST API URL, e.g. `https://your-backend.onrender.com/api/v1` |
| `VITE_SOCKET_URL` | Deployed backend base URL, e.g. `https://your-backend.onrender.com` |

On Vercel, set these under **Project Settings → Environment Variables** — you don't need to commit a `.env` file.

## Folder Structure

```
src/
  Pages/         → Login, Register, Home, Profile
  Components/    → Navbar, Sidebar, ChatContainer, ChatHeader, MessageInput, NoChatSelected, skeleton loaders
  store/
    slices/       → authSlices.js (auth state), ChatSlice.js (messages/users state)
    store.js       → Redux store config
  lib/
    axios.js        → Configured Axios instance (baseURL, credentials)
    socket.js        → Socket.io-client connect/disconnect helpers
```

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
