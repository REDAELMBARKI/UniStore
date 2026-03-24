import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await axios.post("/auth/forgot-password", { email });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      const errors = err.response?.data?.errors;
      if (errors?.email) {
        setErrorMsg(errors.email[0]);
      } else {
        setErrorMsg(err.response?.data?.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-2xl font-bold"></span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">UniStore</h1>
          <p className="text-slate-500 text-sm mt-1">Unistore Platform</p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          {status !== "sent" ? (
            <>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Forgot Password?</h2>
                <p className="text-slate-500 text-sm mt-2">
                  No worries! Enter your email and we'll send you a reset link.
                </p>
              </div>

             
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm flex items-start gap-2">
                  <span className="mt-0.5">⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

             
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                               placeholder-slate-400 transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
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
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                >
                  ← Back to Login
                </Link>
              </div>
            </>
          ) : (
           
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Check your email</h2>
              <p className="text-slate-500 text-sm mb-2">
                We sent a password reset link to
              </p>
              <p className="font-semibold text-slate-800 mb-6">{email}</p>
              <p className="text-xs text-slate-400 mb-6">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setStatus("idle")}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  try again
                </button>
              </p>
              <Link
                to="/login"
                className="block w-full text-center bg-slate-100 text-slate-700 rounded-xl py-3
                           font-semibold hover:bg-slate-200 transition-all duration-200"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}