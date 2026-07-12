/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config();

// Resolve directories for ES Module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable JSON body parsing
app.use(express.json());

// Database file paths
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

// Ensure data directory and database files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
}

if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(
    CONFIG_FILE,
    JSON.stringify({ passwordHash: "gmr123" }, null, 2),
    "utf-8"
  );
}

// Supabase Client Setup (with fallback credentials)
const SUPABASE_URL = process.env.SUPABASE_URL || "https://ycrzykzjtuqsozzcvbqg.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_K4eu9n6AhTVzxd4WVqyocw_bP6gvdOC";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to read leads from local JSON cache
function readLeads() {
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);
    
    // Auto-enrich validity calculations (365 days)
    const now = new Date();
    return leads.map((lead: any) => {
      const createdDate = new Date(lead.createdAt || new Date());
      const daysElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysRemaining = Math.max(0, 365 - daysElapsed);
      const isValid = daysRemaining > 0;
      
      return {
        ...lead,
        daysRemaining,
        isValid,
        validUntil: new Date(createdDate.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()
      };
    });
  } catch (error) {
    console.error("Error reading local leads:", error);
    return [];
  }
}

// Helper to write leads to local JSON cache
function writeLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing local leads:", error);
  }
}

// Helper to read admin configuration from local JSON cache
function readConfig() {
  try {
    const data = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading local config:", error);
    return { passwordHash: "gmr123" };
  }
}

// Helper to write admin configuration to local JSON cache
function writeConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing local config:", error);
  }
}

// --- Supabase Asynchronous Helpers ---

// Get all leads from Supabase (syncs and falls back to local cache if table is missing or offline)
async function getLeads(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.warn("Supabase fetch leads error (table might not exist yet):", error.message);
      return readLeads();
    }

    if (data) {
      // Map both camelCase and snake_case properties to ensure full compatibility
      const mappedLeads = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email || "N/A",
        phone: item.phone,
        villaType: item.villaType || item.villa_type || "Not Specified",
        message: item.message || "",
        createdAt: item.createdAt || item.created_at || new Date().toISOString()
      }));

      // Cache locally to keep the warm backup in sync
      writeLeads(mappedLeads);

      // Add runtime validity properties
      const now = new Date();
      return mappedLeads.map((lead: any) => {
        const createdDate = new Date(lead.createdAt);
        const daysElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.max(0, 365 - daysElapsed);
        const isValid = daysRemaining > 0;
        
        return {
          ...lead,
          daysRemaining,
          isValid,
          validUntil: new Date(createdDate.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()
        };
      });
    }
  } catch (err: any) {
    console.error("Supabase leads exception, using local fallback:", err.message || err);
  }

  return readLeads();
}

// Add a lead to Supabase (caches locally first, then attempts insert)
async function addLead(lead: any): Promise<boolean> {
  // Always update local cache first for instant consistency
  const localLeads = readLeads();
  localLeads.unshift(lead);
  writeLeads(localLeads);

  try {
    // Attempt Supabase insert (we pass both camelCase and snake_case versions for robust schema parsing)
    const { error } = await supabase
      .from("leads")
      .insert([
        {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          villaType: lead.villaType,
          villa_type: lead.villaType,
          message: lead.message,
          createdAt: lead.createdAt,
          created_at: lead.createdAt
        }
      ]);

    if (error) {
      console.warn("Supabase lead insert failed, using local caching:", error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error("Supabase insert exception, using local caching:", err.message || err);
    return false;
  }
}

// Delete a lead from Supabase (deletes locally and attempts remote deletion)
async function deleteLead(id: string): Promise<boolean> {
  // Always update local cache first
  let localLeads = readLeads();
  localLeads = localLeads.filter((l: any) => l.id !== id);
  // Strip runtime fields before writing
  const cleanLeads = localLeads.map(({ id, name, email, phone, villaType, message, createdAt }: any) => ({
    id, name, email, phone, villaType, message, createdAt
  }));
  writeLeads(cleanLeads);

  try {
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.warn("Supabase lead deletion failed, using local deletion:", error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error("Supabase delete exception, using local deletion:", err.message || err);
    return false;
  }
}

// Get admin config from Supabase (with fallback)
async function getAdminConfig(): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("config")
      .select("*")
      .eq("id", "admin")
      .single();

    if (error) {
      console.warn("Supabase config fetch failed, using local config:", error.message);
      return readConfig();
    }

    if (data) {
      const config = { passwordHash: data.passwordHash || data.password_hash || "gmr123" };
      writeConfig(config);
      return config;
    }
  } catch (err: any) {
    console.error("Supabase config fetch exception, using local config:", err.message || err);
  }

  return readConfig();
}

// Update admin config password
async function updateAdminConfig(newPasswordHash: string): Promise<boolean> {
  // Update local cache
  writeConfig({ passwordHash: newPasswordHash });

  try {
    const { error } = await supabase
      .from("config")
      .upsert({
        id: "admin",
        passwordHash: newPasswordHash,
        password_hash: newPasswordHash
      });

    if (error) {
      console.warn("Supabase config update failed, using local update:", error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error("Supabase config update exception, using local update:", err.message || err);
    return false;
  }
}

// --- API Routes ---

// 1. Submit a lead
app.post("/api/leads", async (req, res) => {
  const { name, email, phone, villaType, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone number are required." });
  }

  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name,
    email: email || "N/A",
    phone,
    villaType: villaType || "Not Specified",
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  // Run lead insertion asynchronously in the background.
  // This writes to the local JSON file immediately and tries Supabase without delaying the client.
  addLead(newLead).catch((err) => {
    console.error("Background Supabase lead insertion error:", err);
  });

  res.status(201).json({ success: true, lead: newLead });
});

// 2. Admin Login
app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;
  const config = await getAdminConfig();

  if (password === config.passwordHash) {
    return res.json({ success: true, token: "gmr_secret_session_token_130_villas" });
  }

  return res.status(401).json({ error: "Invalid password." });
});

// 3. Reset Admin Password inside admin panel
app.post("/api/admin/reset-password", async (req, res) => {
  const { oldPassword, newPassword, token } = req.body;

  if (token !== "gmr_secret_session_token_130_villas") {
    return res.status(403).json({ error: "Unauthorized access." });
  }

  const config = await getAdminConfig();

  if (oldPassword !== config.passwordHash) {
    return res.status(400).json({ error: "Incorrect current password." });
  }

  if (!newPassword || newPassword.trim().length < 4) {
    return res.status(400).json({ error: "New password must be at least 4 characters long." });
  }

  await updateAdminConfig(newPassword.trim());

  res.json({ success: true, message: "Password updated successfully." });
});

// 4. Retrieve leads (authorized)
app.get("/api/leads", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer gmr_secret_session_token_130_villas") {
    return res.status(403).json({ error: "Unauthorized access." });
  }

  const leads = await getLeads();
  res.json({ leads });
});

// 5. Delete a lead (authorized)
app.delete("/api/leads/:id", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer gmr_secret_session_token_130_villas") {
    return res.status(403).json({ error: "Unauthorized access." });
  }

  const { id } = req.params;
  await deleteLead(id);
  
  res.json({ success: true, message: "Lead deleted successfully." });
});

// 6. CSV Lead Export API Endpoint (Authorized)
app.get("/api/leads/export", async (req, res) => {
  const token = req.query.token;
  if (token !== "gmr_secret_session_token_130_villas") {
    return res.status(403).send("Unauthorized");
  }

  const leads = await getLeads();
  
  let csvContent = "ID,Name,Email,Phone,Villa Preference,Message,Created At,Valid Until,Days Remaining,Status\n";
  
  leads.forEach((lead: any) => {
    const row = [
      lead.id,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.phone}"`,
      `"${lead.villaType.replace(/"/g, '""')}"`,
      `"${(lead.message || "").replace(/"/g, '""')}"`,
      lead.createdAt,
      lead.validUntil,
      lead.daysRemaining,
      lead.isValid ? "Active" : "Expired"
    ];
    csvContent += row.join(",") + "\n";
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=gmr_mukunda_leads.csv");
  res.status(200).send(csvContent);
});

// Integrate Vite development server or production build
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
