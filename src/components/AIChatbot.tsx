import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: "Hi! I'm the Conqify AI assistant. How can I help you today with our services or pricing?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dbData, setDbData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch DB data to provide context to the AI
    fetch("/api/db")
      .then(res => res.json())
      .then(data => setDbData(data))
      .catch(err => console.error("Error fetching context for AI:", err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      
      const systemInstruction = `
        You are a helpful and professional AI assistant for Conqify Tech Solution.
        Your goal is to answer questions about Conqify's services, pricing, and company information.
        
        Company Context:
        ${JSON.stringify(dbData?.settings || {})}
        
        Services:
        ${JSON.stringify(dbData?.services || [])}
        
        Pricing Plans:
        ${JSON.stringify(dbData?.plans || [])}
        
        Currency: ${dbData?.currency || 'INR'}
        
        Guidelines:
        - Be concise and friendly.
        - If someone asks for pricing, mention specific plans and prices from the data provided.
        - If someone asks about services, describe them using the provided service descriptions.
        - If you don't know something, suggest they contact us directly at ${dbData?.settings?.email || 'contact@conqify.com'}.
        - Always maintain a professional yet approachable tone.
        - Do not manufacture information not present in the context if it relates to core company facts.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: "user", content: userMessage }].map(m => ({
          role: m.role === "bot" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction,
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("AI Chatbot error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "I'm having trouble connecting to my brain right now. Please try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95 group"
        id="ai-chat-toggle"
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-zinc-900 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
            id="ai-chat-window"
          >
            {/* Header */}
            <div className="p-6 bg-emerald-600/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white leading-none">Conqify AI</h4>
                  <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest mt-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Online Now
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`
                    max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
                    ${m.role === "user" 
                      ? "bg-emerald-600 text-white rounded-tr-none" 
                      : "bg-white/5 text-white/80 rounded-tl-none border border-white/10"}
                  `}>
                    <div className="flex items-center gap-2 mb-1">
                      {m.role === "bot" ? <Bot className="w-3 h-3 text-emerald-500" /> : <User className="w-3 h-3" />}
                      <span className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">
                        {m.role === "user" ? "You" : "Conqify AI"}
                      </span>
                    </div>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-zinc-950/50 border-t border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input 
                  type="text"
                  placeholder="Type your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
