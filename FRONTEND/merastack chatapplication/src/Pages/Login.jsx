import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import axiosInstance from "../lib/axios";
import { setUser, setLoading, setError } from "../store/slices/authSlices.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      dispatch(setUser(response.data.user));

      navigate("/");
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Login failed"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-6 text-primary" />
              </div>

              <h1 className="text-2xl font-bold mt-2">
                Welcome Back
              </h1>

              <p className="text-base-content/60">
                Login to your account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

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

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary hover:underline"
            >
              Create account
            </a>
          </p>
        </div>
      </div>

      <AuthImagePattern
        title="Connect with your friends"
        subtitle="Send messages and stay connected with the people you care about."
      />
    </div>
  );
};

export default Login;