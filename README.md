# GMR Mukunda | Gated Community Luxury Triplex Villas

GMR Mukunda is a premium, full-stack real estate platform designed with a high-contrast **white and violet luxury theme**. It exhibits a professional presentation of 130 triplex villas spread across 12.5 acres in Rampur, Hanamkonda.

## 🚀 Key Features

- **Interactive Floor Plan Matrix**: Explore East, West, North-East Corner, and North-West Corner villa layouts on different floors (Ground, First, Second) with dimensions.
- **Dynamic Proximity Search**: Search and filter transit, educational institutes, super-specialty hospitals, and IT/Textile parks relative to the site.
- **Clubhouse Showcase**: Breakdown of the grand 5-level 16,000 Sft Clubhouse amenities with rich descriptions.
- **Secure Lead Capture**: Robust validation of prospect phone numbers and preferences, persist to backend.
- **Admin Dashboard `/admin` (Click footer option "PORTAL ADMINISTRATOR ACCESS")**:
  - Secure passkey authentication (Default: `gmr123`).
  - Search, filter, and delete leads.
  - Interactive Leads Validity Tracker: Automatic countdown calculation based on **365-day validity**.
  - **CSV / Excel Lead Export**: One-click download of all lead details formatted directly as an Excel-friendly sheet.
  - **Internal Password Reset**: Option directly inside the dashboard to securely reset the admin passkey.

## 📁 Project Architecture

- `/server.ts`: Full-stack Express backend handling REST API services, lead persistence, CSV export pipelines, and password configurations.
- `/src/data.ts`: Fully extracted brochure specifications, nearby places, and clubhouse layouts.
- `/src/App.tsx`: Layout entry point supporting conditional rendering between user landing page and secure admin workspace.
- `/src/components/`:
  - `Header.tsx`: Responsive navigation with smooth scrolling.
  - `VillaConfigurator.tsx`: Interactive floorplan blueprint display.
  - `AmenitiesSection.tsx`: Clubhouse levels and campus amenities filtering.
  - `NearbyLocations.tsx`: Searchable proximity list.
  - `LeadForm.tsx`: Secured prospect application.
  - `AdminPanel.tsx`: Full-featured administration center.

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run local development:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to preview.

## ⚙️ Administration

- Access the Admin Panel by scrolling to the footer of the page and clicking the link **"PORTAL ADMINISTRATOR ACCESS"** or the Admin button in the header.
- Default Password: `gmr123`
- Inside the Admin Panel, click **"Reset Passkey"** to update your password instantly.
