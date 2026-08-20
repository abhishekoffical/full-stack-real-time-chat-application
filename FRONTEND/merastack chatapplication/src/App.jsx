import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;