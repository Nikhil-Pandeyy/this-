import { motion } from "motion/react";
import { Database, Layout, Server, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

const iconMap: any = {
  Database, Layout, Server, Cpu
};

export default function TechStack() {
  const [techs, setTechs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setTechs(data.techStack || []));
  }, []);

  if (techs.length === 0) return null;

  return (
    <section className="py-24 border-y border-white/10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Our Technology Stack</h2>
          <p className="font-display text-3xl font-bold">Powered by the Most Cutting-Edge Frameworks</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {techs.map((tech) => {
            const Icon = iconMap[tech.icon] || Cpu;
            return (
              <div key={tech.name} className="flex flex-col items-center gap-4 group">
                <div className={`w-20 h-20 rounded-[2rem] glass flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-white/10 text-emerald-500`}>
                  <Icon className="w-10 h-10" />
                </div>
                <span className="font-bold text-sm text-white/40 group-hover:text-white transition-colors">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
