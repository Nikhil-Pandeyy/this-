import { motion } from "motion/react";
import { Search, MapPin, Briefcase, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

export default function Careers() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setJobs(data.careers || []));
  }, []);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="font-display text-5xl font-bold mb-6">Join the Conqify Team</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We're looking for visionary developers, designers, and thinkers to help us shape the future of digital solutions.
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-all border border-white/5"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-white/50 text-sm">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
                  <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.type}</div>
                  <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> {job.salary}</div>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
