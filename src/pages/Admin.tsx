import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Trash2, Save, LogOut, Package, 
  FileText, Briefcase, Settings, CheckCircle2,
  DollarSign, ShoppingCart, Megaphone, Edit2, ChevronDown, ChevronUp, Eye,
  Menu, X
} from "lucide-react";

export default function Admin() {
  const [db, setDb] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"plans" | "blogs" | "careers" | "services" | "promos" | "clients" | "orders" | "settings" | "banners" | "consultations">("plans");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<{coll: string, id: string} | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/admin/login");
    } else {
      fetchDb();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login");
  };

  const fetchDb = async () => {
    try {
      const res = await fetch("/api/db");
      if (!res.ok) throw new Error("Failed to fetch database");
      const data = await res.json();
      
      // Ensure settings exists with all required fields
      const defaultSettings = {
        email: "contact@conqify.com",
        phone: "+1 (555) 000-0000",
        address: "123 Business Avenue, Digital City",
        summary: "Conqify Tech Solution builds high-performing software teams and world-class digital products.",
        ctaTitle: "Let's Build Something Extraordinary",
        ctaDescription: "Ready to take your business to the next level? Our consultants and developers are standing by to help you strategize and build.",
        contactCall: "+1 (555) 000-0000",
        contactEmail: "contact@conqify.com",
        contactVisit: "123 Business Avenue, Digital City"
      };

      if (!data.settings) {
        data.settings = defaultSettings;
      } else {
        data.settings = { ...defaultSettings, ...data.settings };
      }
      
      setDb(data);
    } catch (error) {
      console.error("Fetch DB error:", error);
      // Fallback to minimal data if API fails
      setDb({
        plans: [], blogs: [], consultations: [], careers: [],
        services: [], promos: [], banners: [], clients: [],
        orders: [], settings: {
          email: "contact@conqify.com",
          phone: "+1 (555) 000-0000",
          address: "123 Business Avenue, Digital City",
          summary: "Conqify Tech Solution builds high-performing software teams and world-class digital products.",
          ctaTitle: "Let's Build Something Extraordinary",
          ctaDescription: "Ready to take your business to the next level? Our consultants and developers are standing by to help you strategize and build.",
          contactCall: "+1 (555) 000-0000",
          contactEmail: "contact@conqify.com",
          contactVisit: "123 Business Avenue, Digital City"
        }
      });
    }
  };

  const tabs = [
    { name: "Pricing Plans", key: "plans" as const, icon: Package },
    { name: "Blog Posts", key: "blogs" as const, icon: FileText },
    { name: "Consultations", key: "consultations" as const, icon: Megaphone },
    { name: "Careers", key: "careers" as const, icon: Briefcase },
    { name: "Services", key: "services" as const, icon: CheckCircle2 },
    { name: "Promo Codes", key: "promos" as const, icon: DollarSign },
    { name: "Ad Banners", key: "banners" as const, icon: Megaphone },
    { name: "Clients", key: "clients" as const, icon: Package },
    { name: "Orders", key: "orders" as const, icon: ShoppingCart },
    { name: "Settings", key: "settings" as const, icon: Settings },
  ];

  const handleUpdateCollection = async (key: string, value: any) => {
    setIsSaving(true);
    setSaveStatus("Saving...");
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchDb();
      setSaveStatus("Changes saved successfully!");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setSaveStatus("Error saving changes");
      alert("Failed to update: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddItem = async (collection: string, item: any) => {
    setSaveStatus("Adding item...");
    try {
      const res = await fetch("/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, item }),
      });
      if (!res.ok) throw new Error("Add failed");
      await fetchDb();
      setSaveStatus("Item added!");
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      console.error("Add error:", error);
      alert("Failed to add item");
    }
  };

  const handleDeleteItem = async (collection: string, id: string) => {
    setSaveStatus("Deleting...");
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchDb();
      setSaveStatus("Item deleted");
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item");
    } finally {
      setDeletingId(null);
    }
  };

  if (!db) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Dashboard...</div>;

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 border border-emerald-500/30 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold tracking-tight">{saveStatus}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDeletingId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-zinc-900 border border-white/10 p-8 rounded-[32px] max-w-sm w-full shadow-2xl"
            >
              <Trash2 className="w-12 h-12 text-red-500 mb-6 mx-auto" />
              <h3 className="text-xl font-bold text-center mb-2">Delete this item?</h3>
              <p className="text-white/40 text-sm text-center mb-8">This action cannot be undone. Are you sure you want to remove this data?</p>
              <div className="flex gap-4">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all">Cancel</button>
                <button onClick={() => handleDeleteItem(deletingId.coll, deletingId.id)} className="flex-1 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-bold transition-all">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 sticky top-0 bg-zinc-950 z-50">
        <h1 className="font-display font-bold text-xl uppercase tracking-tighter">Admin Panel</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/5 rounded-lg text-emerald-500">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? "flex shadow-2xl" : "hidden"} 
        md:flex w-full md:w-64 border-r border-white/5 p-6 flex-col gap-8 sticky top-0 h-auto md:h-screen z-40 bg-zinc-950 overflow-y-auto
      `}>
        <div className="hidden md:block flex-shrink-0">
          <h1 className="font-display font-bold text-2xl tracking-tighter">Admin Panel</h1>
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Conqify Dashboard</p>
        </div>
        
        <nav className="flex flex-col gap-1 flex-1">
          {tabs.map((tab) => (
            <button 
              key={tab.key}
              id={`tab-${tab.key}`}
              onClick={() => {
                setActiveTab(tab.key);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${activeTab === tab.key ? "bg-emerald-600 font-bold shadow-lg shadow-emerald-600/20" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.name}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all text-sm font-bold flex-shrink-0"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold capitalize">{activeTab} Management</h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {isSaving && <span className="text-xs text-emerald-400 font-bold animate-pulse">Saving...</span>}
            <button 
              onClick={() => navigate("/")}
              className="flex-1 md:flex-none bg-zinc-800 text-white px-6 py-2 rounded-lg text-sm font-bold border border-white/5"
            >
              Preview Site
            </button>
          </div>
        </header>

        <div className="max-w-full overflow-x-hidden">
          {activeTab === "plans" && (
          <div className="space-y-6">
            <button 
              onClick={() => handleAddItem("plans", { name: "New Plan", price: "0", period: "month", description: "Plan description", features: ["1 Feature"] })}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-white/20 transition-all"
            >
              <Plus className="w-5 h-5" /> Add New Plan
            </button>
            <div className="grid grid-cols-1 gap-6">
              {(db.plans || []).map((plan: any, i: number) => (
                <div key={plan.id} className="glass p-6 rounded-2xl border border-white/10">
                  <div className="grid md:grid-cols-4 gap-6 mb-6">
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase font-bold text-white/30 block mb-2">Plan Name</label>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                        value={plan.name}
                        onChange={(e) => {
                          const newPlans = [...db.plans];
                          newPlans[i].name = e.target.value;
                          setDb({...db, plans: newPlans});
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-white/30 block mb-2">Price ({db.currency})</label>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500 font-mono"
                        value={plan.price}
                        onChange={(e) => {
                          const newPlans = [...db.plans];
                          newPlans[i].price = e.target.value;
                          setDb({...db, plans: newPlans});
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-white/30 block mb-2">Period</label>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                        value={plan.period}
                        onChange={(e) => {
                          const newPlans = [...db.plans];
                          newPlans[i].period = e.target.value;
                          setDb({...db, plans: newPlans});
                        }}
                      />
                    </div>
                    <div className="flex items-end justify-end gap-2">
                       <button 
                        onClick={() => handleUpdateCollection("plans", db.plans)}
                        className="bg-emerald-600 p-2 rounded-lg"
                       >
                         <Save className="w-5 h-5" />
                       </button>
                       <button 
                        onClick={() => setDeletingId({ coll: "plans", id: plan.id })}
                        className="bg-red-600/20 text-red-500 p-2 rounded-lg"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-white/30 block">Features (one per line)</label>
                    <textarea 
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500 h-24 text-sm"
                      value={plan.features?.join('\n') || ''}
                      onChange={(e) => {
                        const newPlans = [...db.plans];
                        newPlans[i].features = e.target.value.split('\n');
                        setDb({...db, plans: newPlans});
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-[32px] border border-white/5">
              <div>
                <h3 className="text-xl font-bold italic">Blog Insights</h3>
                <p className="text-xs text-white/40">Manage your tech publications and updates.</p>
              </div>
              <button 
                onClick={async () => {
                  const newBlog = { title: "New Blog Post", date: new Date().toLocaleDateString(), category: "Tech", content: "Write content here", id: Date.now().toString() };
                  await handleAddItem("blogs", newBlog);
                  setEditingBlogId(newBlog.id);
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" /> Create Post
              </button>
            </div>

            <div className="grid gap-4">
              {(db.blogs || []).map((blog: any, i: number) => (
                <div key={blog.id} className="glass rounded-[32px] border border-white/5 overflow-hidden transition-all">
                  <div 
                    onClick={() => setEditingBlogId(editingBlogId === blog.id ? null : blog.id)}
                    className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center text-emerald-500">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{blog.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40 uppercase tracking-widest font-bold border border-white/5">{blog.category}</span>
                          <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">{blog.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-white/20 hover:text-white transition-colors">
                        {editingBlogId === blog.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {editingBlogId === blog.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-8 pb-8 pt-4 border-t border-white/5 space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Title</label>
                          <input 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:border-emerald-500 outline-none transition-all font-bold"
                            value={blog.title}
                            onChange={(e) => {
                              const newBlogs = [...db.blogs];
                              newBlogs[i].title = e.target.value;
                              setDb({...db, blogs: newBlogs});
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Category</label>
                          <input 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:border-emerald-500 outline-none transition-all font-bold"
                            value={blog.category}
                            onChange={(e) => {
                              const newBlogs = [...db.blogs];
                              newBlogs[i].category = e.target.value;
                              setDb({...db, blogs: newBlogs});
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Image URL (Direct Link)</label>
                          <input 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:border-emerald-500 outline-none transition-all font-mono text-xs"
                            value={blog.image || ""}
                            placeholder="https://images.unsplash.com/..."
                            onChange={(e) => {
                              const newBlogs = [...db.blogs];
                              newBlogs[i].image = e.target.value;
                              setDb({...db, blogs: newBlogs});
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Upload from Computer (Local jpj/png)</label>
                          <div className="relative group/upload">
                            <input 
                              type="file" 
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const newBlogs = [...db.blogs];
                                    newBlogs[i].image = reader.result as string;
                                    setDb({...db, blogs: newBlogs});
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-xl px-4 py-3 flex items-center justify-center gap-2 text-emerald-400 group-hover/upload:bg-emerald-600/20 transition-all font-bold text-xs uppercase tracking-widest">
                              <Plus className="w-4 h-4" /> Select Image
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Post Content</label>
                        <textarea 
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:border-emerald-500 outline-none transition-all min-h-[300px] text-sm leading-relaxed"
                          value={blog.content}
                          onChange={(e) => {
                            const newBlogs = [...db.blogs];
                            newBlogs[i].content = e.target.value;
                            setDb({...db, blogs: newBlogs});
                          }}
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-6">
                        <button 
                          onClick={async () => {
                            await handleUpdateCollection("blogs", db.blogs);
                            setEditingBlogId(null);
                          }}
                          className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-emerald-600/20 active:scale-95"
                        >
                          <Save className="w-4 h-4" /> Save Post Changes
                        </button>
                        <button 
                          onClick={() => setDeletingId({ coll: "blogs", id: blog.id })}
                          className="bg-red-600/10 text-red-500 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-600/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4" /> Delete Post
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "banners" && (
          <div className="space-y-6">
            <button 
              onClick={() => handleAddItem("banners", { text: "New Announcement Banner", link: "/", active: true })}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white"
            >
              <Plus className="w-5 h-5" /> Create New Ad Panel
            </button>
            <div className="grid gap-6">
              {(db.banners || []).map((banner: any, i: number) => (
                <div key={banner.id} className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
                  <div className="flex justify-between items-start gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Banner Text (The Ad Content)</label>
                        <input 
                          className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 w-full focus:border-emerald-500 outline-none transition-all font-bold text-lg"
                          value={banner.text}
                          onChange={(e) => {
                            const newBanners = [...db.banners];
                            newBanners[i].text = e.target.value;
                            setDb({...db, banners: newBanners});
                          }}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Link URL</label>
                          <input 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:border-emerald-500 outline-none transition-all font-mono"
                            value={banner.link}
                            onChange={(e) => {
                              const newBanners = [...db.banners];
                              newBanners[i].link = e.target.value;
                              setDb({...db, banners: newBanners});
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-4 pt-6">
                           <button 
                            onClick={() => {
                              const newBanners = [...db.banners];
                              newBanners[i].active = !newBanners[i].active;
                              setDb({...db, banners: newBanners});
                            }}
                            className={`flex-1 py-3 rounded-xl font-bold transition-all border ${banner.active ? "bg-emerald-600/20 text-emerald-500 border-emerald-500/30" : "bg-white/5 text-white/30 border-white/10"}`}
                           >
                             {banner.active ? "Running Now" : "Paused"}
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                    <button onClick={() => handleUpdateCollection("banners", db.banners)} className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2">
                      <Save className="w-4 h-4" /> Finish Editing
                    </button>
                    <button onClick={() => setDeletingId({ coll: "banners", id: banner.id })} className="bg-red-600/10 text-red-500 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-600/20 transition-all">
                      <Trash2 className="w-4 h-4" /> Remove Panel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "careers" && (
          <div className="space-y-6">
            <button 
              onClick={() => handleAddItem("careers", { title: "New Job", location: "Remote", type: "Full-time", salary: "TBD" })}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white"
            >
              <Plus className="w-5 h-5" /> Add Job Opening
            </button>
            <div className="grid gap-4">
              {(db.careers || []).map((job: any, i: number) => (
                <div key={job.id} className="glass p-6 rounded-2xl">
                  <div className="grid md:grid-cols-4 gap-4">
                    <input className="bg-white/5 p-2 rounded border border-white/10" value={job.title} onChange={(e) => {
                      const newCareers = [...db.careers];
                      newCareers[i].title = e.target.value;
                      setDb({...db, careers: newCareers});
                    }} />
                    <input className="bg-white/5 p-2 rounded border border-white/10" value={job.location} onChange={(e) => {
                      const newCareers = [...db.careers];
                      newCareers[i].location = e.target.value;
                      setDb({...db, careers: newCareers});
                    }} />
                    <input className="bg-white/5 p-2 rounded border border-white/10" value={job.salary} onChange={(e) => {
                      const newCareers = [...db.careers];
                      newCareers[i].salary = e.target.value;
                      setDb({...db, careers: newCareers});
                    }} />
                    <div className="flex gap-2">
                       <button onClick={() => handleUpdateCollection("careers", db.careers)} className="bg-emerald-600/10 text-emerald-400 p-2 rounded-lg flex-1">Save</button>
                       <button onClick={() => setDeletingId({ coll: "careers", id: job.id })} className="bg-red-600/10 text-red-500 p-2 rounded-lg">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-6">
            <button 
              onClick={() => handleAddItem("services", { title: "New Service", description: "Service details", category: "software", image: "" })}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white"
            >
              <Plus className="w-5 h-5" /> Add Service
            </button>
            <div className="grid gap-4">
              {(db.services || []).map((service: any, i: number) => (
                <div key={service.id} className="glass p-6 rounded-2xl">
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="flex-1">
                      <input className="bg-transparent text-xl font-bold w-full mb-1" value={service.title} onChange={(e) => {
                        const newServices = [...db.services];
                        newServices[i].title = e.target.value;
                        setDb({...db, services: newServices});
                      }} />
                      <div className="flex gap-4 items-center">
                        <select 
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] uppercase font-bold text-emerald-400"
                          value={service.category}
                          onChange={(e) => {
                            const newServices = [...db.services];
                            newServices[i].category = e.target.value;
                            setDb({...db, services: newServices});
                          }}
                        >
                          <option value="software">Software Service</option>
                          <option value="placement">Placement Service</option>
                        </select>
                        <input 
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] font-bold text-white/40 focus:text-white"
                          value={service.price || ""}
                          placeholder="Price (optional)"
                          onChange={(e) => {
                            const newServices = [...db.services];
                            newServices[i].price = e.target.value;
                            setDb({...db, services: newServices});
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/30 block">Service Image (JPG/GIF)</label>
                      <div className="flex gap-2">
                        <input 
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs font-mono flex-1 focus:outline-none focus:border-emerald-500"
                          value={service.image || ""}
                          placeholder="URL or use upload ->"
                          onChange={(e) => {
                            const newServices = [...db.services];
                            newServices[i].image = e.target.value;
                            setDb({...db, services: newServices});
                          }}
                        />
                        <div className="relative group/upload">
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const newServices = [...db.services];
                                  newServices[i].image = reader.result as string;
                                  setDb({...db, services: newServices});
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <button className="bg-emerald-600/20 text-emerald-500 p-2 rounded-lg hover:bg-emerald-600/30 transition-all">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <textarea className="bg-white/5 p-3 rounded w-full h-20 text-sm mb-4" value={service.description} onChange={(e) => {
                    const newServices = [...db.services];
                    newServices[i].description = e.target.value;
                    setDb({...db, services: newServices});
                  }} />
                  <div className="flex gap-2">
                     <button onClick={() => handleUpdateCollection("services", db.services)} className="bg-emerald-600 p-2 px-6 rounded-lg text-sm font-bold">Save Changes</button>
                     <button onClick={() => setDeletingId({ coll: "services", id: service.id })} className="bg-red-600/10 text-red-500 p-2 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div className="space-y-6">
            <button 
              onClick={() => handleAddItem("clients", { name: "New Client", industry: "Tech", logo: "" })}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white"
            >
              <Plus className="w-5 h-5" /> Add New Client
            </button>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {(db.clients || []).map((client: any, i: number) => (
                <div key={client.id} className="glass p-8 rounded-[40px] flex flex-col gap-6 relative group border border-white/5 hover:border-emerald-500/20 transition-all">
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl mx-auto flex items-center justify-center overflow-hidden border border-white/10">
                       {client.logo ? <img src={client.logo} className="w-full h-full object-contain p-4" alt="" /> : <Package className="w-8 h-8 text-white/10" />}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-white/20 ml-1">Company Name</label>
                        <input 
                          className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm w-full focus:border-emerald-500 outline-none" 
                          value={client.name} 
                          onChange={(e) => {
                            const newClients = [...db.clients];
                            newClients[i].name = e.target.value;
                            setDb({...db, clients: newClients});
                          }} 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-white/20 ml-1">Industry</label>
                        <input 
                          className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm w-full focus:border-emerald-500 outline-none" 
                          value={client.industry || ""} 
                          onChange={(e) => {
                            const newClients = [...db.clients];
                            newClients[i].industry = e.target.value;
                            setDb({...db, clients: newClients});
                          }} 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-white/20 ml-1 tracking-widest">Logo URL / Base64</label>
                        <input 
                          className="bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] font-mono w-full focus:border-emerald-500 outline-none" 
                          value={client.logo || ""} 
                          placeholder="https://... or data:image/..."
                          onChange={(e) => {
                            const newClients = [...db.clients];
                            newClients[i].logo = e.target.value;
                            setDb({...db, clients: newClients});
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                     <button onClick={() => handleUpdateCollection("clients", db.clients)} className="bg-emerald-600/10 text-emerald-500 p-3 rounded-2xl flex-1 hover:bg-emerald-600/20 transition-all">
                       <Save className="w-5 h-5 mx-auto" />
                     </button>
                     <button onClick={() => setDeletingId({ coll: "clients", id: client.id })} className="bg-red-600/10 text-red-500 p-3 rounded-2xl flex-1 hover:bg-red-600/20 transition-all">
                       <Trash2 className="w-5 h-5 mx-auto" />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "consultations" && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {(db.consultations || []).length === 0 ? (
                <div className="glass p-12 text-center text-white/30 rounded-3xl">No consultation requests yet.</div>
              ) : (
                [...db.consultations].reverse().map((req: any) => (
                  <div key={req.id} className="glass p-8 rounded-3xl flex flex-col md:flex-row justify-between gap-6 hover:bg-white/5 transition-all group border border-white/5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{req.service || "Placement"}</span>
                        <span className="text-xs text-white/30">{new Date(req.date).toLocaleString()}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-1">{req.name}</h4>
                      <p className="text-emerald-500 font-medium mb-4">{req.email}</p>
                      <div className="bg-white/5 p-4 rounded-2xl text-sm text-white/60 leading-relaxed italic border border-white/5">
                        "{req.message || "No message provided."}"
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                       <button 
                        onClick={() => setDeletingId({ coll: "consultations", id: req.id })} 
                        className="text-red-500 hover:text-red-400 text-xs font-bold flex items-center gap-2"
                       >
                         <Trash2 className="w-4 h-4" /> Delete Record
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "promos" && (
          <div className="space-y-6">
            <button 
              onClick={() => handleAddItem("promos", { code: "NEWCODE", discount: 10, type: "percentage" })}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white"
            >
              <Plus className="w-5 h-5" /> Create Promo Code
            </button>
            <div className="grid gap-4">
              {(db.promos || []).map((promo: any, i: number) => (
                <div key={promo.id} className="glass p-6 rounded-2xl flex items-center justify-between">
                  <div className="grid md:grid-cols-3 gap-6 flex-1 mr-8">
                     <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-white/30 uppercase font-bold">Code</label>
                        <input className="bg-white/5 border border-white/10 rounded p-2 uppercase" value={promo.code} onChange={(e) => {
                          const newPromos = [...db.promos];
                          newPromos[i].code = e.target.value.toUpperCase();
                          setDb({...db, promos: newPromos});
                        }} />
                     </div>
                     <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-white/30 uppercase font-bold">Discount (%)</label>
                        <input type="number" className="bg-white/5 border border-white/10 rounded p-2" value={promo.discount} onChange={(e) => {
                          const newPromos = [...db.promos];
                          newPromos[i].discount = parseInt(e.target.value);
                          setDb({...db, promos: newPromos});
                        }} />
                     </div>
                     <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-white/30 uppercase font-bold">Applicable To</label>
                        <select 
                          className="bg-white/5 border border-white/10 rounded p-2 text-sm" 
                          value={promo.planId || 'all'} 
                          onChange={(e) => {
                            const newPromos = [...db.promos];
                            newPromos[i].planId = e.target.value;
                            setDb({...db, promos: newPromos});
                          }}
                        >
                          <option value="all">All Plans</option>
                          {db.plans.map((p: any) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => handleUpdateCollection("promos", db.promos)} className="bg-emerald-600/10 text-emerald-400 p-2 rounded-lg">
                       <Save className="w-5 h-5" />
                     </button>
                     <button onClick={() => setDeletingId({ coll: "promos", id: promo.id })} className="bg-red-600/10 text-red-500 p-2 rounded-lg">
                       <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {(db.orders || []).length === 0 ? (
                <div className="glass p-12 text-center text-white/30 rounded-3xl">No orders found yet.</div>
              ) : (
                [...db.orders].reverse().map((order: any, i: number) => (
                  <div key={order.id} className="glass p-8 rounded-3xl flex flex-col md:flex-row justify-between gap-6 hover:bg-white/5 transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{order.planName}</span>
                        <span className="text-xs text-white/30">{order.date}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-1">{order.customerEmail}</h4>
                      <p className="text-sm text-white/50">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                       <div className="text-2xl font-black text-emerald-500 mb-2">{db.currency === 'INR' ? '₹' : '$'}{order.amount}</div>
                       <button onClick={() => setDeletingId({ coll: "orders", id: order.id })} className="text-red-500 hover:text-red-400 text-xs font-bold flex items-center gap-2 justify-end">
                         <Trash2 className="w-3 h-3" /> Remove Record
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl space-y-8 pb-20">
            {/* General Site Info */}
            <div className="glass p-10 rounded-[40px] border border-white/5">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Settings className="w-6 h-6 text-emerald-400" /> Site Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Support Email</label>
                  <input 
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full focus:border-emerald-500 outline-none transition-all"
                    value={db.settings?.email || ""}
                    onChange={(e) => {
                      const newSettings = { ...db.settings, email: e.target.value };
                      setDb({ ...db, settings: newSettings });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Contact Phone</label>
                  <input 
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full focus:border-emerald-500 outline-none transition-all"
                    value={db.settings?.phone || ""}
                    onChange={(e) => {
                      const newSettings = { ...db.settings, phone: e.target.value };
                      setDb({ ...db, settings: newSettings });
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Office Address</label>
                <input 
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full focus:border-emerald-500 outline-none transition-all"
                  value={db.settings?.address || ""}
                  onChange={(e) => {
                    const newSettings = { ...db.settings, address: e.target.value };
                    setDb({ ...db, settings: newSettings });
                  }}
                />
              </div>

              <div className="space-y-2 mb-10">
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Company Summary (Footer)</label>
                <textarea 
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full h-32 focus:border-emerald-500 outline-none transition-all text-sm leading-relaxed"
                  value={db.settings?.summary || ""}
                  onChange={(e) => {
                    const newSettings = { ...db.settings, summary: e.target.value };
                    setDb({ ...db, settings: newSettings });
                  }}
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleUpdateCollection("settings", db.settings)}
                  className="bg-zinc-800 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all border border-white/10"
                >
                  <Save className="w-4 h-4 inline-block mr-2" /> Save Info
                </button>
              </div>
            </div>

            {/* CTA & Contact Section */}
            <div className="glass p-10 rounded-[40px] border border-white/5">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 italic">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" /> "Extraordinary" Section & Contact Info
              </h3>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Section Title</label>
                    <input 
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full focus:border-emerald-500 outline-none transition-all font-bold"
                      value={db.settings?.ctaTitle || ""}
                      onChange={(e) => {
                        const newSettings = { ...db.settings, ctaTitle: e.target.value };
                        setDb({ ...db, settings: newSettings });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Call Us (Display)</label>
                    <input 
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full focus:border-emerald-500 outline-none transition-all"
                      value={db.settings?.contactCall || ""}
                      onChange={(e) => {
                        const newSettings = { ...db.settings, contactCall: e.target.value };
                        setDb({ ...db, settings: newSettings });
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Section Description</label>
                  <textarea 
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full h-24 focus:border-emerald-500 outline-none transition-all text-sm leading-relaxed"
                    value={db.settings?.ctaDescription || ""}
                    onChange={(e) => {
                      const newSettings = { ...db.settings, ctaDescription: e.target.value };
                      setDb({ ...db, settings: newSettings });
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Email Us (Display)</label>
                    <input 
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full focus:border-emerald-500 outline-none transition-all"
                      value={db.settings?.contactEmail || ""}
                      onChange={(e) => {
                        const newSettings = { ...db.settings, contactEmail: e.target.value };
                        setDb({ ...db, settings: newSettings });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1">Visit Us (Display)</label>
                    <input 
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full focus:border-emerald-500 outline-none transition-all"
                      value={db.settings?.contactVisit || ""}
                      onChange={(e) => {
                        const newSettings = { ...db.settings, contactVisit: e.target.value };
                        setDb({ ...db, settings: newSettings });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-white/30 italic">These changes apply instantly to the Contact/CTA section on the home page.</p>
                <button 
                  onClick={() => handleUpdateCollection("settings", db.settings)}
                  className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
                >
                  <Save className="w-4 h-4 inline-block mr-2" /> Save Settings
                </button>
              </div>
            </div>

            <div className="glass p-10 rounded-[40px] border border-white/5">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-emerald-400" /> Currency Configuration
              </h3>
              <div className="flex items-center gap-4">
                 <select 
                  value={db.currency}
                  onChange={(e) => handleUpdateCollection("currency", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 flex-1 appearance-none font-bold"
                 >
                   <option value="USD">USD ($)</option>
                   <option value="INR">INR (₹)</option>
                   <option value="EUR">EUR (€)</option>
                 </select>
                 <div className="p-4 bg-emerald-400/10 text-emerald-400 rounded-2xl">
                   <CheckCircle2 className="w-6 h-6" />
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
    </div>
    </>
  );
}
