import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmailVerificationPage() {
  const { id, hash } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (id && hash) {
      verifyEmail();
    } else {
      setStatus("pending");
    }
  }, [id, hash]);


  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const verifyEmail = async () => {
    try {
      const expires = searchParams.get("expires");
      const signature = searchParams.get("signature");

      const res = await axios.get(
        `/auth/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
      );

      if (res.data.verified) {
        setStatus("success");
        setMessage(res.data.message);
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.expired) {
        setStatus("expired");
      } else if (data?.verified) {
        setStatus("already_verified");
      } else {
        setStatus("error");
        setMessage(data?.message || "Verification failed.");
      }
    }
  };

  const resendVerification = async () => {
    setResending(true);
    try {
      await axios.post("/api/auth/email/verification-notification");
      setResendCooldown(60);
      setMessage("A new verification link has been sent to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to resend. Try again later.");
    } finally {
      setResending(false);
    }
  };

  const configs = {
    verifying: {
      icon: "⏳",
      title: "Verifying your email...",
      color: "text-blue-500",
      bg: "bg-blue-50 border-blue-200",
    },
    pending: {
      icon: "📧",
      title: "Check your inbox",
      color: "text-indigo-500",
      bg: "bg-indigo-50 border-indigo-200",
    },
    success: {
      icon: "✅",
      title: "Email Verified!",
      color: "text-green-500",
      bg: "bg-green-50 border-green-200",
    },
    already_verified: {
      icon: "✔️",
      title: "Already Verified",
      color: "text-green-500",
      bg: "bg-green-50 border-green-200",
    },
    expired: {
      icon: "⚠️",
      title: "Link Expired",
      color: "text-yellow-500",
      bg: "bg-yellow-50 border-yellow-200",
    },
    error: {
      icon: "❌",
      title: "Verification Failed",
      color: "text-red-500",
      bg: "bg-red-50 border-red-200",
    },
  };

  const current = configs[status] || configs.error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">UniStore</h1>
          <p className="text-slate-500 text-sm mt-1">UniStore Platform</p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
          <div className={`border rounded-xl p-4 mb-6 text-center ${current.bg}`}>
            <div className="text-4xl mb-2">{current.icon}</div>
            <h2 className={`text-xl font-bold ${current.color}`}>{current.title}</h2>
          </div>

          {message && (
            <p className="text-slate-600 text-center text-sm mb-4">{message}</p>
          )}

          {status === "pending" && (
            <div className="text-center">
              <p className="text-slate-600 text-sm mb-6">
                We sent a verification link to your email address. Please check your
                inbox and click the link to activate your account.
              </p>
              <p className="text-slate-400 text-xs mb-6">
                Didn't receive the email? Check your spam folder or resend below.
              </p>
              <button
                onClick={resendVerification}
                disabled={resending || resendCooldown > 0}
                className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold
                           hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
              >
                {resending
                  ? "Sending..."
                  : resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend Verification Email"}
              </button>
            </div>
          )}

          {(status === "success" || status === "already_verified") && (
            <div className="text-center">
              <p className="text-slate-600 text-sm mb-6">
                Your email has been verified successfully. You can now access all
                features of your store.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-green-600 text-white rounded-xl py-3 font-semibold
                           hover:bg-green-700 transition-all duration-200"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {status === "expired" && (
            <div className="text-center">
              <p className="text-slate-600 text-sm mb-6">
                Your verification link has expired. Request a new one below.
              </p>
              <button
                onClick={resendVerification}
                disabled={resending || resendCooldown > 0}
                className="w-full bg-yellow-500 text-white rounded-xl py-3 font-semibold
                           hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
              >
                {resending
                  ? "Sending..."
                  : resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Request New Link"}
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <p className="text-slate-600 text-sm mb-6">
                Something went wrong. Please try again or contact support.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-slate-700 text-white rounded-xl py-3 font-semibold
                           hover:bg-slate-800 transition-all duration-200"
              >
                Back to Login
              </button>
            </div>
          )}

          <p className="text-center text-xs text-slate-400 mt-6">
            Need help?{" "}
            <a href="mailto:support@multistore.com" className="text-indigo-500 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}