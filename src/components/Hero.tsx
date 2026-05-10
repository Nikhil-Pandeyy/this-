import { motion } from "motion/react";
import { ArrowRight, Smartphone, Globe, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Hero() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setSettings(data.settings));
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-teal-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-emerald-500/20 backdrop-blur-sm">
            Bridging Talent and Innovation Since 2019
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold mb-8 leading-[0.95] tracking-tighter text-white drop-shadow-2xl">
            Building the <br /> 
            <span className="text-gradient italic">Next Generation</span> <br />
            of Digital Success
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            {settings?.summary || "Conqify builds high-performing software teams and world-class digital products. We don't just solve problems; we engineer growth."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/pricing" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 group transition-all shadow-2xl shadow-emerald-500/30">
              Start Building <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services" className="w-full sm:w-auto bg-white/[0.03] hover:bg-white/[0.08] text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest border border-white/10 block transition-all backdrop-blur-md">
              Our Capabilities
            </Link>
          </div>
        </motion.div>

        {/* Stats / Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-display font-bold">1k+</span>
            <span className="text-white/40 text-xs uppercase tracking-widest mt-1">Apps Delivered</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-display font-bold">100k+</span>
            <span className="text-white/40 text-xs uppercase tracking-widest mt-1">Monthly Service Users</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-display font-bold">99%</span>
            <span className="text-white/40 text-xs uppercase tracking-widest mt-1">Client Retention</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-display font-bold">24/7</span>
            <span className="text-white/40 text-xs uppercase tracking-widest mt-1">Ongoing Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
