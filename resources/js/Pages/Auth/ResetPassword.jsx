import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") || "";
  const emailFromUrl = searchParams.get("email") || "";

  const [form, setForm] = useState({
    email: emailFromUrl,
    password: "",
    password_confirmation: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
      { label: "Too weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-400" },
      { label: "Fair", color: "bg-yellow-400" },
      { label: "Strong", color: "bg-blue-500" },
      { label: "Very strong", color: "bg-green-500" },
    ];
    return { score, ...map[score] };
  };

  const strength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    try {
      await axios.post("/auth/reset-password", {
        ...form,
        token,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      const validationErrors = err.response?.data?.errors || {};
      setErrors(validationErrors);
      if (err.response?.data?.message && !Object.keys(validationErrors).length) {
        setErrors({ general: err.response.data.message });
      }
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Password Reset!</h2>
            <p className="text-slate-500 text-sm mb-6">
              Your password has been changed successfully. You can now log in with your new password.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-2xl font-bold"></span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">UniStore</h1>
          <p className="text-slate-500 text-sm mt-1">UniStore Platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
            <p className="text-slate-500 text-sm mt-2">Enter your new password below.</p>
          </div>

          {/* General error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
              ⚠️ {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-xl border text-slate-800 focus:outline-none
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all
                  ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className={`w-full px-4 py-3 pr-10 rounded-xl border text-slate-800 focus:outline-none
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all
                    ${errors.password ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < strength.score ? strength.color : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">{strength.label}</p>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className={`w-full px-4 py-3 pr-10 rounded-xl border text-slate-800 focus:outline-none
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all
                    ${
                      form.password_confirmation && form.password !== form.password_confirmation
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
              {form.password_confirmation && form.password !== form.password_confirmation && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading" || (form.password_confirmation && form.password !== form.password_confirmation)}
              className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold
                         hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all duration-200 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-indigo-600 hover:underline font-medium">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
