import { motion } from "motion/react";
import { CheckCircle, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-[40px] text-center max-w-lg w-full"
      >
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="font-display text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-white/60 mb-10">
          Thank you for choosing Conqify Tech Solution. Your order has been processed and our team will contact you within 2 hours to start the onboarding process.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link to="/" className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            Back to Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="text-white/40 hover:text-white text-sm font-medium transition-colors">
            Download Invoice (Receipt)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
