import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [db, setDb] = useState<any>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [orderForm, setOrderForm] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setDb(data));
  }, []);

  const validatePromo = () => {
    if (!promoCode) return;
    const promo = db?.promos?.find((p: any) => p.code.toUpperCase() === promoCode.toUpperCase());
    if (promo) {
      setPromoError("");
      setIsPromoApplied(true);
    } else {
      setPromoError("Invalid promo code");
      setIsPromoApplied(false);
    }
  };

  const getPromoStatusForPlan = (planId: string) => {
    if (!isPromoApplied) return null;
    const promo = db?.promos?.find((p: any) => p.code.toUpperCase() === promoCode.toUpperCase());
    if (!promo) return null;
    
    if (!promo.planId || promo.planId === "all" || promo.planId === planId) {
      if (promo.type === "percentage") return `${promo.discount}% Off Applied!`;
      return `${currencySymbol}${promo.discount} Off Applied!`;
    }
    return null;
  };

  const getDiscountedPrice = (plan: any) => {
    if (!isPromoApplied) return plan.price;
    const promo = db?.promos?.find((p: any) => p.code.toUpperCase() === promoCode.toUpperCase());
    if (!promo) return plan.price;
    if (promo.planId && promo.planId !== "all" && promo.planId !== plan.id) return plan.price;

    let priceValue = parseInt(plan.price.replace(/,/g, ""));
    if (isNaN(priceValue)) return plan.price;

    if (promo.type === "percentage") {
      return Math.floor(priceValue * (1 - promo.discount / 100)).toLocaleString();
    }
    return Math.max(0, priceValue - promo.discount).toLocaleString();
  };

  const handleOrderSubmit = async (e: any) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    setLoadingPlan(selectedPlan.id);
    
    const orderData = {
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      amount: getDiscountedPrice(selectedPlan),
      customerName: orderForm.name,
      customerEmail: orderForm.email,
      date: new Date().toLocaleString(),
      status: "pending"
    };

    try {
      await fetch("/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: "orders", item: orderData }),
      });
      navigate("/success");
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setLoadingPlan(null);
    }
  };

  if (!db) return null;

  const currencySymbol = db.currency === "INR" ? "₹" : db.currency === "EUR" ? "€" : "$";

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-white/60">Choose the perfect plan for your project's scale.</p>
        </div>

        {/* Promo Code Section */}
        <div className="max-w-md mx-auto mb-16 glass p-6 rounded-3xl border border-white/10">
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Promo Code" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={isPromoApplied}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 uppercase font-bold tracking-widest transition-all"
            />
            {isPromoApplied ? (
              <button 
                onClick={() => { setIsPromoApplied(false); setPromoCode(""); }}
                className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Remove
              </button>
            ) : (
              <button 
                onClick={validatePromo}
                className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
              >
                Apply
              </button>
            )}
          </div>
          {promoError && <p className="text-red-400 text-[10px] mt-2 ml-1 font-bold">{promoError}</p>}
          {isPromoApplied && <p className="text-emerald-400 text-[10px] mt-2 ml-1 font-bold flex items-center gap-1">
            <Check className="w-3 h-3" /> Promo applied!
          </p>}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {(db.plans || []).map((plan: any, index: number) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col ${
                plan.isPopular 
                  ? "bg-emerald-600/10 border-emerald-500/50 shadow-2xl shadow-emerald-500/20" 
                  : "bg-white/5 border-white/10"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Recommended
                </div>
              )}
              
              <div className="mb-8">
                <span className="text-sm text-white/50">{plan.name}</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{currencySymbol}{getDiscountedPrice(plan)}</span>
                  {plan.price !== "Custom" && plan.price !== "100k" && <span className="text-white/40 text-sm">/{plan.period}</span>}
                </div>
                <p className="mt-4 text-sm text-white/60 leading-relaxed min-h-[4rem]">
                  {plan.description}
                </p>
                {getPromoStatusForPlan(plan.id) && (
                  <div className="mt-4 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/20 inline-block">
                    {getPromoStatusForPlan(plan.id)}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {(plan.features || []).map((feature: string) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-500/10 p-0.5 rounded-full">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                plan.isPopular 
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                  : "bg-white text-black hover:bg-white/90"
              }`}>
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[40px] p-10 overflow-hidden shadow-2xl"
            >
              <button onClick={() => setSelectedPlan(null)} className="absolute top-6 right-6 text-white/40 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold mb-2 italic">Confirm {selectedPlan.name}</h3>
              <p className="text-white/40 text-sm mb-8">Please provide your details to request access to this plan.</p>
              
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-white/30 ml-1 tracking-widest">Your Full Name</label>
                       <input 
                        required
                        type="text" 
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all font-bold"
                        placeholder="John Doe"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-white/30 ml-1 tracking-widest">Business Email</label>
                       <input 
                        required
                        type="email" 
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all font-bold"
                        placeholder="john@company.com"
                       />
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-6 text-sm">
                        <span className="text-white/40">Total Amount:</span>
                        <span className="text-xl font-bold text-emerald-500">{currencySymbol}{getDiscountedPrice(selectedPlan)}</span>
                      </div>
                      <button 
                        type="submit"
                        disabled={loadingPlan === selectedPlan.id}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
                      >
                        {loadingPlan === selectedPlan.id ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Order"}
                      </button>
                    </div>
                  </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
