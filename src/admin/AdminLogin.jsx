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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.password) newErrors.password = "Password required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!validate()) return;

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem("adminAuth", "true");
      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setErrors({ form: "Invalid credentials. Access denied." });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1a1a1a_0%,_#000000_100%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl mb-4">
            <Shield size={32} className="text-brand-red" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            ADMIN <span className="text-brand-red">PANEL</span>
          </h1>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.form && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded flex items-center gap-2 text-sm">
                <AlertCircle size={16} />
                {errors.form}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded flex items-center gap-2 text-sm">
                <CheckCircle size={16} />
                Login Successful
              </div>
            )}

            <div>
              <label className="text-xs text-gray-400 uppercase">Email</label>
              <div className="relative mt-2">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  className="w-full bg-black border border-white/10 text-white pl-10 p-3 rounded focus:border-brand-red outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

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
                  className="w-full bg-black border border-white/10 text-white pl-10 pr-10 p-3 rounded focus:border-brand-red outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
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
