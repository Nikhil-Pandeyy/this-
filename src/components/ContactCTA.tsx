import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ContactCTA() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setSettings(data.settings));
  }, []);

  if (!settings) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-600/5 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 italic">
              {settings.ctaTitle || "Let's Build Something Extraordinary"}
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              {settings.ctaDescription || "Ready to take your business to the next level? Our consultants and developers are standing by to help you strategize and build."}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/pricing" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-emerald-600/20">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold border border-white/10 transition-all">
                Our Services
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600/20 p-3 rounded-xl">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Call Us</h4>
                  <p className="font-bold text-white">{settings.contactCall || settings.phone || "+1 (555) 000-0000"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600/20 p-3 rounded-xl">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Email Us</h4>
                  <p className="font-bold text-white">{settings.contactEmail || settings.email || "hello@conqify.com"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 sm:col-span-2">
                <div className="bg-emerald-600/20 p-3 rounded-xl">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Visit Us</h4>
                  <p className="font-bold text-white">{settings.contactVisit || settings.address || "123 Innovation Drive, Tech Valley"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-8 rounded-[40px] border border-white/10 relative z-10 overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-emerald-500/10 transition-colors">
                <Sparkles className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Request a Consultation</h3>
              <p className="text-white/50 text-sm mb-8">Fill in your details and one of our experts will contact you within 24 hours.</p>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-emerald-500 transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Business Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-emerald-500 transition-all"
                />
                <select className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-emerald-500 transition-all">
                  <option>Software Development</option>
                  <option>Placement Services</option>
                  <option>Graphic Design</option>
                  <option>Other</option>
                </select>
                <textarea 
                  placeholder="How can we help?" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-24 focus:outline-none focus:border-emerald-500 transition-all"
                ></textarea>
                <button className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-emerald-500 hover:text-white transition-all">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-600/20 blur-3xl rounded-full -z-0" />
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-teal-600/20 blur-3xl rounded-full -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Sparkles } from "lucide-react";
