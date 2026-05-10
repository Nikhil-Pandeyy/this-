import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, Clock, Tag, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setPosts(data.blogs || []));
  }, []);

  return (
    <div className="pt-40 pb-40 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Knowledge Hub</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold italic tracking-tighter">Insights & <br /> Innovations.</h1>
        </div>
        <p className="text-white/40 max-w-sm text-lg leading-relaxed">
          Exploring the frontiers of software engineering, artificial intelligence, and digital transformation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer glass rounded-[40px] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all flex flex-col h-full"
          >
            <div className="aspect-[16/10] bg-zinc-900 relative overflow-hidden">
               {post.image ? (
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               ) : (
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
               )}
               <div className="absolute top-4 left-4">
                 <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                   {post.category}
                 </span>
               </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase font-bold tracking-widest mb-4">
                <Clock className="w-3 h-3" /> {post.date}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight italic">
                {post.title}
              </h3>
              <p className="text-white/40 text-sm line-clamp-3 mb-8 leading-relaxed">
                {post.content}
              </p>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/btn">
                <span className="text-xs font-black uppercase tracking-widest text-blue-500 transition-all group-hover/btn:mr-2">Read Full Post</span>
                <ArrowUpRight className="w-5 h-5 text-blue-500 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[48px] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-8 right-8 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md p-3 rounded-full text-white/60 hover:text-white transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="relative">
                  {selectedPost.image ? (
                    <img 
                      src={selectedPost.image} 
                      alt={selectedPost.title} 
                      className="w-full h-auto object-contain bg-zinc-900/50" 
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-blue-900 to-zinc-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>

                <div className="p-10 md:p-16">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                      {selectedPost.category}
                    </span>
                    <span className="text-[10px] text-white/50 uppercase font-black tracking-widest flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {selectedPost.date}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-7xl font-bold italic leading-[1] tracking-tighter mb-12 max-w-4xl">
                    {selectedPost.title}
                  </h2>

                  <div className="text-white/60 text-xl leading-relaxed whitespace-pre-wrap font-medium max-w-4xl border-l border-white/10 pl-8">
                    {selectedPost.content}
                  </div>
                </div>
                
                <div className="p-12 pt-0 flex justify-between items-center bg-zinc-950">
                  <div className="flex gap-2">
                    <span className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-white/30 tracking-widest">#INNOVATION</span>
                    <span className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-white/30 tracking-widest">#TECH</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm hover:text-blue-500 transition-colors"
                  >
                    Back to Insights <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
