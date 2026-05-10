import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, Copy, Check, Sparkles } from "lucide-react";

export default function CouponGenerator() {
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCoupon = async () => {
    setIsGenerating(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const newCoupon = `ADVANTAGE-${result}`;

    try {
      await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: newCoupon }),
      });
      setCoupon(newCoupon);
    } catch (error) {
      console.error(error);
      setCoupon(newCoupon); // Fallback for demo
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (coupon) {
      navigator.clipboard.writeText(coupon);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass p-12 rounded-[40px] text-center relative overflow-hidden">
          {/* Decorative Sparks */}
          <Sparkles className="absolute top-10 left-10 w-8 h-8 text-emerald-500 opacity-20" />
          <Sparkles className="absolute bottom-10 right-10 w-8 h-8 text-teal-500 opacity-20" />

          <h2 className="font-display text-4xl font-bold mb-6">Limited Time Offer</h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto">
            Ready to start your journey? Generate a unique coupon code and get up to 
            <span className="text-emerald-400 font-bold"> 20% DISCOUNT</span> on your first monthly service.
          </p>

          <AnimatePresence mode="wait">
            {!coupon ? (
              <motion.button
                key="generate-btn"
                onClick={generateCoupon}
                disabled={isGenerating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-5 rounded-3xl font-bold flex items-center gap-3 mx-auto relative overflow-hidden"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <Ticket className="w-6 h-6" />
                )}
                {isGenerating ? "Generating Magic..." : "Claim My Discount"}
              </motion.button>
            ) : (
              <motion.div
                key="coupon-display"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="bg-white/5 border-2 border-dashed border-emerald-500/50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 w-full max-w-md">
                  <div className="text-center md:text-left flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-400 mb-2 block">Your Unique Code</span>
                    <span className="text-3xl font-mono font-bold tracking-wider">{coupon}</span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="bg-white text-black p-4 rounded-2xl hover:bg-white/90 transition-all flex items-center gap-2 text-sm font-bold"
                  >
                    {isCopied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                    {isCopied ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <p className="text-white/40 text-xs">Valid for 24 hours. Applicable on Startup and Growth plans.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
