import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Clients() {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => setClients(data.clients || []));
  }, []);

  if (clients.length === 0) return null;

  return (
    <section className="py-20 border-y border-white/5 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-12">Trusted by Industry Leaders</h2>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {clients.map((client) => (
            <div 
              key={client.id}
              className="text-xl md:text-2xl font-display font-black text-white/60 hover:text-white transition-colors cursor-default"
            >
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
