import { Rocket, Twitter, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setSettings(data.settings));
  }, []);

  return (
    <footer className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Link to="/" className="bg-emerald-600 p-2 rounded-xl">
                <Rocket className="w-5 h-5 text-black" />
              </Link>
              <Link to="/" className="font-display font-bold text-2xl tracking-tight">
                Conqify <span className="text-emerald-500 italic">Tech Solution</span>
              </Link>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed text-sm mb-8">
              {settings?.summary || "We empower businesses through exceptional mobile and web solutions. With 5 years of industry experience, our team of expert full-stack developers is committed to delivering high-quality software that drives real growth."}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link to="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-xs text-white/30 font-medium">
          <p>© 2026 Conqify Tech Solution. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
