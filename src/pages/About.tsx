import { motion } from "motion/react";
import { Users, History, Award, BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Our Journey</h1>
          <p className="text-white/60 text-lg">5 Years of Innovation, Excellence, and Global Impact.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="glass p-10 rounded-3xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Founded in 2021</h3>
            <p className="text-white/50 leading-relaxed text-sm">
              Conqify Tech Solution started with a small team of passionate developers in a shared workspace. 
              Our mission was simple: build software that actually solves business problems. 
              Today, we have scaled to a global agency with offices in 3 continents.
            </p>
          </div>
          <div className="glass p-10 rounded-3xl">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">World-Class Team</h3>
            <p className="text-white/50 leading-relaxed text-sm">
              We employ the top 1% of talent across React, Node.js, Swift, and AI engineering. 
              Our culture of continuous learning ensures we always use the most cutting-edge tools to bring your 
              vision to life efficiently.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-20">
          <h2 className="text-3xl font-bold mb-12 text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">1k+</div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Projects Done</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">5</div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Years Active</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-500 mb-2">50+</div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Expert Devs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">99%</div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Growth Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
