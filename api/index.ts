import express from "express";
import path from "path";
import Stripe from "stripe";
import fs from "fs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock");

// Robust DB Path for different environments
const DB_PATH = path.resolve(process.cwd(), "db.json");

// In-memory cache for the database to handle read-only environments gracefully
let dbCache: any = null;

// Helper to read DB with caching
const readDB = () => {
  if (dbCache) return dbCache;
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      try {
        dbCache = JSON.parse(data);
        return dbCache;
      } catch (e) {
        console.error("JSON Parse error in DB:", e);
      }
    }
  } catch (err) {
    console.error("Error reading DB file:", err);
  }
  
  // Default structure if file missing or unreadable
  return {
    plans: [], blogs: [], consultations: [], careers: [], 
    services: [], promos: [], banners: [], clients: [], 
    orders: [], settings: {}
  };
};

// Helper to write DB with memory fallback
const writeDB = (data: any) => {
  dbCache = data; // Always update cache
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    console.log("DB updated successfully on disk.");
  } catch (err) {
    console.warn("Failed to write to disk (likely read-only environment like Vercel). Using in-memory storage.", err);
  }
};

const app = express();
app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Conqify API is live" });
});

// Database GET
app.get("/api/db", (req, res) => {
  res.json(readDB());
});

// Consultations
app.post("/api/consultation", (req, res) => {
  const { name, email, service, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Missing required fields" });
  
  const db = readDB();
  db.consultations.push({ id: Date.now().toString(), name, email, service, message, date: new Date() });
  writeDB(db);
  
  res.json({ success: true });
});

// Admin: Update Everything
app.post("/api/admin/update", (req, res) => {
  const { key, value } = req.body;
  const db = readDB();
  db[key] = value;
  writeDB(db);
  res.json({ success: true });
});

// Admin: Add Item
app.post("/api/admin/add", (req, res) => {
  const { collection, item } = req.body;
  const db = readDB();
  if (!db[collection]) db[collection] = [];
  db[collection].push({ ...item, id: Date.now().toString() });
  writeDB(db);
  res.json({ success: true });
});

// Admin: Delete Item
app.post("/api/admin/delete", (req, res) => {
  const { collection, id } = req.body;
  const db = readDB();
  if (db[collection]) {
    // Robust ID comparison: convert both to strings
    db[collection] = db[collection].filter((i: any) => String(i.id) !== String(id));
    writeDB(db);
  }
  res.json({ success: true });
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { planId, planName, price, promoCode } = req.body;
  const db = readDB();

  try {
    let unitAmount = parseInt(price.replace(/,/g, "")) * 100;
    
    // Handle Promo Code
    if (promoCode) {
      const promo = db.promos?.find((p: any) => p.code.toUpperCase() === promoCode.toUpperCase());
      if (promo) {
        // Check if promo is restricted to a specific plan
        const isApplicable = !promo.planId || promo.planId === "all" || promo.planId === planId;
        
        if (isApplicable) {
          if (promo.type === "percentage") {
            unitAmount = Math.floor(unitAmount * (1 - promo.discount / 100));
          } else {
            unitAmount = Math.max(0, unitAmount - (promo.discount * 100));
          }
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: db.currency?.toLowerCase() || "inr",
            product_data: {
              name: `Conqify - ${planName}`,
              description: `Purchase for ${planName} plan.${promoCode ? ` Applied promo: ${promoCode}` : ''}`,
            },
            unit_amount: isNaN(unitAmount) ? 5000000 : unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/pricing`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default app;
