import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Code2, UserCheck, ArrowRight, CheckCircle2, Package } from "lucide-react";
import Pricing from "../components/Pricing";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<"software" | "placement">("software");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: "", email: "", message: "", service: "Placement" });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setClients(data.clients || []);
      });
  }, []);

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat === "software" || cat === "placement") {
      setActiveCategory(cat as any);
    }
  }, [searchParams]);

  const filteredServices = services.filter((s) => s.category === activeCategory);

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consultForm),
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setConsultForm({ name: "", email: "", message: "", service: "Placement" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4">
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-display font-medium mb-6 italic tracking-tighter">
              The <span className="text-emerald-500">Conqify</span> Edge
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">
              Software services and world-class placement under one roof. We don't just build software; we build the teams that run them.
            </p>
          </div>

          {/* Category Switcher */}
          <div className="flex justify-center mb-20">
            <div className="bg-zinc-900/50 p-1.5 rounded-3xl flex border border-white/5 backdrop-blur-3xl">
              <button 
                onClick={() => setActiveCategory("software")}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl transition-all font-bold text-sm ${activeCategory === "software" ? "bg-emerald-600 text-white shadow-2xl shadow-emerald-600/20" : "text-white/30 hover:text-white"}`}
              >
                <Code2 className="w-5 h-5" /> Software
              </button>
              <button 
                onClick={() => setActiveCategory("placement")}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl transition-all font-bold text-sm ${activeCategory === "placement" ? "bg-emerald-600 text-white shadow-2xl shadow-emerald-600/20" : "text-white/30 hover:text-white"}`}
              >
                <UserCheck className="w-5 h-5" /> Placement
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredServices.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-10 rounded-[48px] border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
              >
                <div className="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {activeCategory === "software" ? <Code2 className="w-10 h-10 text-emerald-500" /> : <UserCheck className="w-10 h-10 text-emerald-500" />}
                </div>
                <h3 className="text-3xl font-bold mb-4 italic leading-tight">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-10">
                  {service.description}
                </p>
                
                <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-3 text-xs text-white/50 bg-white/5 p-3 rounded-2xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Professional Grade Execution
                   </div>
                   <div className="flex items-center gap-3 text-xs text-white/50 bg-white/5 p-3 rounded-2xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Scalable Architecture
                   </div>
                </div>

                <button 
                  onClick={() => {
                    const pricingSection = document.getElementById("pricing");
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = "/pricing";
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold transition-all"
                >
                  Request Quote <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {activeCategory === "software" && (
            <div className="mb-24" id="pricing-trigger">
              <Pricing />
            </div>
          )}

          {/* Client Logos Section (Specific to Placement) */}
          {activeCategory === "placement" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 border-t border-white/5"
            >
              <div className="text-center mb-16">
                <h2 className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4 font-mono">Our Global Clients</h2>
                <p className="text-2xl font-bold italic tracking-tight">Trusted by leading enterprises worldwide</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {clients.map((client) => (
                  <div 
                    key={client.id}
                    className="glass h-48 rounded-[48px] flex flex-col items-center justify-center border border-white/5 hover:border-emerald-500/20 transition-all group relative overflow-hidden bg-white/[0.02]"
                  >
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {client.logo ? (
                      <div className="relative z-10 w-24 h-24 mb-2 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                        <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="relative z-10 w-20 h-20 mb-4 bg-emerald-500/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Package className="w-10 h-10 text-emerald-500/40" />
                      </div>
                    )}
                    
                    <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">{client.name}</div>

                    <div className="absolute bottom-4 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.2em]">
                        {client.industry}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Consultation Form for Placement */}
              <div className="mt-24 max-w-4xl mx-auto">
                 <div className="glass p-12 rounded-[60px] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -z-10 rounded-full" />
                    <div className="text-center mb-10">
                      <h3 className="text-4xl font-display font-bold mb-4 italic tracking-tighter">Get a Free Consultation</h3>
                      <p className="text-white/40">Scale your team with elite talent. Tell us your requirements.</p>
                    </div>

                    {submitSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                         <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                         </div>
                         <h4 className="text-2xl font-bold mb-2">Requirement Received!</h4>
                         <p className="text-white/40">Our placement experts will contact you shortly.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleConsultSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <input 
                            required
                            type="text" 
                            placeholder="Full Name"
                            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none transition-all font-bold"
                            value={consultForm.name}
                            onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                          />
                          <input 
                            required
                            type="email" 
                            placeholder="Work Email"
                            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none transition-all font-bold"
                            value={consultForm.email}
                            onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                          />
                        </div>
                        <textarea 
                          required
                          placeholder="Your hiring requirements, technology stack, or specific needs..."
                          className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none transition-all w-full h-32 text-sm leading-relaxed"
                          value={consultForm.message}
                          onChange={(e) => setConsultForm({...consultForm, message: e.target.value})}
                        />
                        <button 
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 disabled:opacity-50"
                        >
                          {isSubmitting ? "Sending..." : "Submit Requirements"}
                        </button>
                      </form>
                    )}
                 </div>
              </div>
            </motion.div>
          )}

          {/* Summary Section */}
          <div className="mt-20 p-12 glass rounded-[60px] border border-white/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[120px] -z-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 italic tracking-tighter leading-tight">
                  Why Work <br /><span className="text-emerald-500">With Us?</span>
                </h2>
                <p className="text-white/40 leading-relaxed mb-8">
                  Conqify bridges the technological gap. Whether you need a robust digital product or a high-performance team to manage it, our placement and software services are designed to integrate seamlessly. We've helped dozens of companies like Zoho and Concentrix achieve their digital transformation goals.
                </p>
                <div className="flex gap-4">
                  <div className="glass p-6 rounded-3xl border border-white/5 flex-1">
                    <div className="text-2xl font-bold text-white mb-1">100+</div>
                    <div className="text-[10px] text-white/30 uppercase font-bold">Successful Projects</div>
                  </div>
                  <div className="glass p-6 rounded-3xl border border-white/5 flex-1">
                    <div className="text-2xl font-bold text-white mb-1">98%</div>
                    <div className="text-[10px] text-white/30 uppercase font-bold">Client Retention</div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[48px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass p-10 rounded-[48px] border border-white/10 bg-black">
                  <h4 className="text-xl font-bold mb-6 italic">Ready to accelerate?</h4>
                  <div className="space-y-4 mb-8">
                    {["Free Consultation", "Detailed Roadmap", "Transparent Pricing"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const pricingSection = document.getElementById("pricing");
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/pricing";
                      }
                    }}
                    className="w-full bg-emerald-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
