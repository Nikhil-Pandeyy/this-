import { motion } from "motion/react";
import { Code2, Smartphone, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const iconMap: any = {
  Code2, Smartphone, Shield, Zap
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setServices(data.services || []));
  }, []);

  if (services.length === 0) return null;

  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px]">What we engineer</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-tight tracking-tighter">
            Our Core <span className="text-emerald-500 italic">Capabilities</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[250px]">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const size = i === 0 || i === 3 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1";
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group glass rounded-[40px] border border-white/5 p-8 relative overflow-hidden transition-all hover:border-emerald-500/30 ${size}`}
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-emerald-500 group-hover:text-black transition-all overflow-hidden">
                    {service.image ? (
                      <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform tracking-tight">{service.title}</h3>
                    <p className="text-white/40 text-sm mb-6 leading-relaxed max-w-md font-medium">{service.desc}</p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {(service.features || []).map((f: string) => (
                      <span key={f} className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5 whitespace-nowrap">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to="/services"
                  className="absolute top-8 right-8 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all bg-emerald-500 text-black shadow-2xl shadow-emerald-500/20"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
