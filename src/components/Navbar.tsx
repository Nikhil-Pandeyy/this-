import { motion } from "motion/react";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Admin Login", href: "/admin" },
  ];

  return (
    <nav className="relative z-50 px-6 pt-6 mb-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-[32px] px-10 py-5 border border-white/10 shadow-2xl">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <Rocket className="w-6 h-6 text-black" />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tighter uppercase whitespace-nowrap">
            Conqify <span className="text-emerald-500 italic font-medium">Tech Solution</span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/pricing" className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all active:scale-95 shadow-xl shadow-white/10">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white hover:text-emerald-500 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-6 right-6 mt-4 glass rounded-3xl p-8 flex flex-col gap-6 z-[60] border border-white/10"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-white/70 hover:text-emerald-400 transition-colors flex items-center justify-between"
            >
              {link.name} <ArrowRight className="w-4 h-4 opacity-20" />
            </Link>
          ))}
          <Link 
            to="/pricing" 
            onClick={() => setIsOpen(false)} 
            className="bg-emerald-600 text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-center shadow-xl shadow-emerald-500/20"
          >
            Get Started Fast
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
