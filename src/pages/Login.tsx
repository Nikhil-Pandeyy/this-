import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple mock auth for demonstration
    // In a real app, this would be a server-side check
    setTimeout(() => {
      if (username === "admin" && password === "conqify2026") {
        localStorage.setItem("isAdminAuthenticated", "true");
        navigate("/admin");
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[40px] w-full max-w-md border border-white/10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-600/20 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-white/40 text-sm">Secure access to Conqify Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-red-400 text-sm font-medium bg-red-400/10 p-4 rounded-xl"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : <>Access Panel <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-white/20">
          Forgot password? Contact system administrator.
        </p>
      </motion.div>
    </div>
  );
}
