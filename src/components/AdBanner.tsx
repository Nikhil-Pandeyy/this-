import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdBanner() {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => {
        const activeBanners = (data.banners || []).filter((b: any) => b.active);
        setBanners(activeBanners);
      });
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!isVisible || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentBanner.id}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="w-full z-[100] bg-blue-600 text-white border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center justify-center gap-4">
             <div className="hidden md:flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
               <Megaphone className="w-3 h-3" /> Live Promo
             </div>
             <p className="text-sm font-bold italic tracking-tight">{currentBanner.text}</p>
             <Link 
              to={currentBanner.link} 
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-white text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-all border border-blue-500 shadow-lg"
             >
               Explore <ArrowRight className="w-3 h-3" />
             </Link>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
