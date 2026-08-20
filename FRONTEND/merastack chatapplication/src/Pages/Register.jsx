import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthImagePattern from "../Components/AuthImagePattern.jsx";
import axiosInstance from "../lib/axios.js";
import {
  setUser,
  setLoading,
  setError,
} from "../store/slices/authSlices.js";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await axiosInstance.post("/user/register", {
        fullName,
        email,
        password,
      });

      dispatch(setUser(response.data.user));

      navigate("/");
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Registration failed"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          {/* Logo / Heading */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-6 text-primary" />
              </div>

              <h1 className="text-2xl font-bold mt-2">
                Create Account
              </h1>

              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Full Name
                </span>
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input input-bordered w-full pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Email
                </span>
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Password
                </span>
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pl-10 pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Confirm Password
                </span>
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="input input-bordered w-full pl-10 pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share messages, and stay connected."
      />
    </div>
  );
};

export default Register;