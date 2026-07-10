/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

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
  // Store default password "gmr123" securely
  fs.writeFileSync(
    CONFIG_FILE,
    JSON.stringify({ passwordHash: "gmr123" }, null, 2),
    "utf-8"
  );
}

// Helper to read leads
function readLeads() {
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);
    
    // Auto-enrich validity calculations (365 days)
    const now = new Date();
    return leads.map((lead: any) => {
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
  } catch (error) {
    console.error("Error reading leads:", error);
    return [];
  }
}

// Helper to write leads
function writeLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing leads:", error);
  }
}

// Helper to read admin configuration
function readConfig() {
  try {
    const data = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading config:", error);
    return { passwordHash: "gmr123" };
  }
}

// Helper to write admin configuration
function writeConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing config:", error);
  }
}

// API Routes

// 1. Submit a lead
app.post("/api/leads", (req, res) => {
  const { name, email, phone, villaType, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone number are required." });
  }

  const leads = readLeads();
  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name,
    email: email || "N/A",
    phone,
    villaType: villaType || "Not Specified",
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  leads.unshift(newLead); // Add new lead to the beginning
  writeLeads(leads);

  res.status(201).json({ success: true, lead: newLead });
});

// 2. Admin Login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const config = readConfig();

  if (password === config.passwordHash) {
    // Return simple access token
    return res.json({ success: true, token: "gmr_secret_session_token_130_villas" });
  }

  return res.status(401).json({ error: "Invalid password." });
});

// 3. Reset Admin Password inside admin panel
app.post("/api/admin/reset-password", (req, res) => {
  const { oldPassword, newPassword, token } = req.body;

  if (token !== "gmr_secret_session_token_130_villas") {
    return res.status(403).json({ error: "Unauthorized access." });
  }

  const config = readConfig();

  if (oldPassword !== config.passwordHash) {
    return res.status(400).json({ error: "Incorrect current password." });
  }

  if (!newPassword || newPassword.trim().length < 4) {
    return res.status(400).json({ error: "New password must be at least 4 characters long." });
  }

  config.passwordHash = newPassword.trim();
  writeConfig(config);

  res.json({ success: true, message: "Password updated successfully." });
});

// 4. Retrieve leads (authorized)
app.get("/api/leads", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer gmr_secret_session_token_130_villas") {
    return res.status(403).json({ error: "Unauthorized access." });
  }

  const leads = readLeads();
  res.json({ leads });
});

// 5. Delete a lead (authorized)
app.delete("/api/leads/:id", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer gmr_secret_session_token_130_villas") {
    return res.status(403).json({ error: "Unauthorized access." });
  }

  const { id } = req.params;
  let leads = readLeads();
  const initialLength = leads.length;
  
  leads = leads.filter((lead: any) => lead.id !== id);
  
  if (leads.length === initialLength) {
    return res.status(404).json({ error: "Lead not found." });
  }

  // Preserve database format (remove runtime calculations before writing)
  const cleanLeads = leads.map(({ id, name, email, phone, villaType, message, createdAt }: any) => ({
    id, name, email, phone, villaType, message, createdAt
  }));

  writeLeads(cleanLeads);
  res.json({ success: true, message: "Lead deleted successfully." });
});

// 6. CSV Lead Export API Endpoint (Authorized)
app.get("/api/leads/export", (req, res) => {
  const token = req.query.token;
  if (token !== "gmr_secret_session_token_130_villas") {
    return res.status(403).send("Unauthorized");
  }

  const leads = readLeads();
  
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
