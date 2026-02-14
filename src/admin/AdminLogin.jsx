import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Identity verification required";
    if (!formData.password)
      newErrors.password = "Security credentials required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // ✅ Admin Credentials
      if (formData.email === "admin" && formData.password === "admin") {
        setSuccess(true);

        // Save login
        localStorage.setItem("adminAuth", "true");

        // Redirect to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setErrors({ form: "Invalid credentials. Access denied." });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-brand-red selection:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1a1a1a_0%,_#000000_100%)] z-0"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl mb-4 shadow-[0_0_30px_rgba(255,0,51,0.2)]">
            <Shield size={32} className="text-brand-red" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            ADMIN <span className="text-brand-red">PANEL</span>
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            Restricted Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Error */}
            {errors.form && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded flex items-center gap-2 text-sm">
                <AlertCircle size={16} />
                {errors.form}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded flex items-center gap-2 text-sm">
                <CheckCircle size={16} />
                Authentication Successful...
              </div>
            )}

            {/* Username */}
            <div>
              <label className="text-xs text-gray-400 uppercase">
                Username
              </label>
              <div className="relative mt-2">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="admin"
                  className="w-full bg-black border border-white/10 text-white pl-10 p-3 rounded focus:border-brand-red outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 uppercase">
                Password
              </label>
              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="admin"
                  className="w-full bg-black border border-white/10 text-white pl-10 pr-10 p-3 rounded focus:border-brand-red outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full bg-white text-black font-bold py-3 rounded hover:bg-brand-red hover:text-white transition"
            >
              {isLoading
                ? "Verifying..."
                : success
                ? "Access Granted"
                : "Login"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
