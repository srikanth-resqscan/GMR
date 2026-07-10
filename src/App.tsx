/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import villaImg from "./assets/images/gmr_mukunda_villa_1783685666015.jpg";
import clubhouseImg from "./assets/images/gmr_mukunda_clubhouse_1783685682359.jpg";
import Header from "./components/Header";
import AdminPanel from "./components/AdminPanel";
import LeadForm from "./components/LeadForm";
import VillaConfigurator from "./components/VillaConfigurator";
import AmenitiesSection from "./components/AmenitiesSection";
import NearbyLocations from "./components/NearbyLocations";
import BrochureModal from "./components/BrochureModal";
import VirtualTour from "./components/VirtualTour";
import { PROJECT_INFO, SPECIFICATIONS } from "./data";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  CheckCircle,
  HelpCircle,
  Compass,
  ArrowRight,
  Info,
  FileText
} from "lucide-react";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedVillaPreference, setSelectedVillaPreference] = useState("General Inquiry");
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsAdminOpen(true);
    }
  }, []);

  // Handler from VillaConfigurator to auto-select and scroll to contact form
  const handleVillaPreferenceSelect = (villaName: string) => {
    setSelectedVillaPreference(villaName);
    const element = document.getElementById("contact_section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleAdmin = () => {
    const nextState = !isAdminOpen;
    setIsAdminOpen(nextState);
    if (nextState) {
      setTimeout(() => {
        const element = document.getElementById("admin_panel_section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div id="app_root" className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-violet-100 selection:text-violet-900">
      {/* Navigation Header */}
      <Header onAdminClick={toggleAdmin} isAdminOpen={isAdminOpen} onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* Main Customer Portal containing all landing page modules */}
      <main id="main_customer_portal" className="flex-grow">
          {/* HERO BANNER SECTION */}
          <section
            id="home_hero"
            className="relative min-h-screen flex items-center justify-center bg-violet-950 text-white pt-28 pb-20 overflow-hidden"
          >
            {/* Background image overlay with soft dark glass effects */}
            <div className="absolute inset-0 z-0">
              <img
                src={villaImg}
                alt="GMR Mukunda Luxury Triplex Villa Exterior"
                className="w-full h-full object-cover opacity-25 object-center scale-105 filter brightness-75 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-violet-900/65 to-indigo-950/85"></div>
              {/* Immersive Theme Dotted Grid Background */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mt-12">
              <div className="space-y-5">
                <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-[11px] font-mono font-bold bg-violet-800/40 text-violet-200 border border-violet-500/30 uppercase tracking-widest animate-fadeIn">
                  <Sparkles className="h-4 w-4 text-violet-300 animate-pulse" />
                  <span>TS RERA REGISTERED NO. {PROJECT_INFO.reraNumber}</span>
                </span>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none max-w-5xl mx-auto text-white drop-shadow-md">
                  LIVE <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-200 to-fuchsia-300">WHOLEHEARTEDLY</span>
                </h1>
                
                <p className="text-lg sm:text-2xl font-light text-violet-100 max-w-3xl mx-auto tracking-wide font-sans leading-relaxed">
                  Breathtaking architecture meets modern violet aesthetics. <br />
                  <span className="font-semibold text-white">Gated Community Luxury Triplex Villas</span> @ Rampur, Hanamkonda
                </p>
                
                <p className="text-[10px] sm:text-xs font-mono text-violet-300/80 tracking-widest uppercase mt-4 font-bold">
                  A PROJECT BY {PROJECT_INFO.developer} &bull; CREDAI MEMBER &bull; 100% VASTU COMPLIANT
                </p>
              </div>

              {/* Core metrics badges - styled with fine borders and glowing violet shadows */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
                {[
                  { value: "12.5 Acres", label: "Massive Campus" },
                  { value: "130 Villas", label: "Exclusive Community" },
                  { value: "16,000 Sft", label: "Grand Clubhouse" },
                  { value: "G + 2 Floors", label: "Luxury Triplex Layout" }
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col justify-center shadow-xl hover:border-violet-400/40 hover:bg-slate-900/60 transition-all duration-300 group"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-violet-300 transition-colors">{metric.value}</span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-violet-300 uppercase tracking-widest mt-1.5">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action trigger buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <button
                  id="btn_hero_villas_cta"
                  onClick={() => {
                    const el = document.getElementById("villas_section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-violet-700/30 hover:shadow-violet-600/50 hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Explore Floorplans</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  id="btn_hero_brochure_pdf_cta"
                  onClick={() => setIsBrochureOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-violet-900/60 backdrop-blur-md hover:bg-violet-800/80 text-white rounded-xl font-bold transition-all duration-300 hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer border border-violet-500/30 shadow-lg shadow-violet-950/20"
                >
                  <FileText className="h-4 w-4 text-violet-300" />
                  <span>Download PDF Brochure</span>
                </button>
                
                <button
                  id="btn_hero_contact_cta"
                  onClick={() => {
                    const el = document.getElementById("contact_section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-xl font-bold transition-all duration-300 hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer border border-white/20"
                >
                  <span>Book Site Visit</span>
                </button>
              </div>
            </div>
          </section>

          {/* INTRO SPECS / BRIEF */}
          <section id="brief_section" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.15] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                  The Sanctuary of Silence & Spaces
                </div>
                <h2 className="text-4xl sm:text-6xl font-light leading-tight text-slate-900 tracking-tight">
                  Belong To <span className="font-black text-violet-700">Vastness</span>
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4">
                  Set in the middle of greens and lovely landscapes, these spacious villas are a treat to the eyes for their panoramic views and connection to nature. Discover a life of boundless serenity in the charming villa commune of GMR Mukunda. Experience luxury, privacy, and the freedom to embrace open skies, where every moment feels limitless.
                </p>
              </div>

              {/* Layout Map Graphic / Isometric Overview Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-2xl shadow-slate-100/40">
                <div className="space-y-6">
                  <div className="p-3 bg-violet-100 text-violet-700 rounded-lg w-fit shadow-sm">
                    <Compass className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    MIVAN Shear Wall Engineering
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Unlike standard brick structures, GMR Mukunda utilizes precision <strong>MIVAN (Aluminium Formwork) Shear Wall Technology</strong>. This provides 3x stronger structural stability to withstand seismic loads (Zone 2), offers uniform finishes, increases useable carpet area, and guarantees zero leakage points for generation-safe luxury.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["High Seismic Resistance", "Maximum Carpet Area", "Zero Joint Leakages", "Durable Monolithic Slabs"].map((f, i) => (
                      <span key={i} className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl shadow-violet-200 border border-slate-100">
                  <img
                    src={clubhouseImg}
                    alt="Clubhouse Rendering"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-950/85 to-transparent"></div>
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-violet-300 block uppercase">
                      Premium Social Center
                    </span>
                    <span className="font-display font-bold text-lg block mt-0.5">
                      16,000 Sft Multi-Level Clubhouse & Pool
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE VILLA SPEC / FLOOR PLAN SELECTOR */}
          <section id="villas_section" className="py-24 bg-slate-50/50 border-y border-slate-100 relative">
            <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.05] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                  Select Facing & Sizes
                </div>
                <h2 className="text-4xl sm:text-6xl font-light leading-none text-slate-900 tracking-tight">
                  Vastu-Compliant <span className="font-black text-violet-700">Villa Blueprints</span>
                </h2>
                <p className="text-slate-500 text-sm mt-4">
                  Click on the facing options to explore carpet details, floor-by-floor specifications, plot size metrics, and key structural variables.
                </p>
              </div>

              <VillaConfigurator onVillaSelect={handleVillaPreferenceSelect} />
            </div>
          </section>

          {/* INTERACTIVE 2D VIRTUAL TOUR */}
          <VirtualTour />

          {/* CLUBHOUSE & AMENITIES */}
          <section id="clubhouse_section" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.1] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                  Ecosystem Amenities
                </div>
                <h2 className="text-4xl sm:text-6xl font-light leading-none text-slate-900 tracking-tight">
                  World-Class <span className="font-black text-violet-700">Leisure Facilities</span>
                </h2>
                <p className="text-slate-500 text-sm mt-4">
                  GMR Mukunda has designed active zones for children, quiet meditation lawns for adults, and secured perimeters for maximum family relief.
                </p>
              </div>

              <AmenitiesSection />
            </div>
          </section>

          {/* TECHNICAL ACCORDION SPECIFICATIONS */}
          <section id="specifications_section" className="py-24 bg-slate-50/50 border-y border-slate-100 relative">
            <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.03] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                  Structural Integrity & Finishes
                </div>
                <h2 className="text-4xl sm:text-6xl font-light leading-none text-slate-900 tracking-tight">
                  Reputed <span className="font-black text-violet-700">Brand Specifications</span>
                </h2>
                <p className="text-slate-500 text-sm mt-4">
                  We have selected only elite materials, from 1200x1800mm glazed vitrified tiles to modular premium switches and single-lever bath fittings.
                </p>
              </div>

              {/* Accordion List */}
              <div id="specs_accordion_grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {SPECIFICATIONS.map((spec, i) => (
                  <div
                    key={i}
                    className="bg-white p-8 rounded-xl border border-slate-100 shadow-2xl shadow-slate-100/35 hover:border-violet-200 transition-colors duration-300"
                  >
                    <h3 className="font-sans font-bold text-lg text-slate-900 mb-4 flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-violet-600"></span>
                      <span>{spec.title}</span>
                    </h3>
                    <ul className="space-y-3">
                      {spec.details.map((detail, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          &bull; {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEARBY LOCATIONS MAP SECTION */}
          <section id="location_section" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.1] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                  Transit Distance Lookups
                </div>
                <h2 className="text-4xl sm:text-6xl font-light leading-none text-slate-900 tracking-tight">
                  Proximity & <span className="font-black text-violet-700">Nearby Landmarks</span>
                </h2>
                <p className="text-slate-500 text-sm mt-4">
                  Strategically situated on Hanamkonda-Hyderabad Highway, keeping school commutes and railway transit fast and simple.
                </p>
              </div>

              <NearbyLocations />
            </div>
          </section>

          {/* LEAD GENERATION CONTACT SECTION */}
          <section id="contact_section" className="py-24 bg-slate-50 border-t border-slate-100 relative">
            <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.06] pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <LeadForm defaultVillaType={selectedVillaPreference} onOpenBrochure={() => setIsBrochureOpen(true)} />
            </div>
          </section>

          {/* Embedded Admin Panel Section at bottom of site */}
          {isAdminOpen && (
            <section id="admin_panel_section" className="border-t-2 border-violet-200 bg-slate-50 relative">
              <AdminPanel />
            </section>
          )}
        </main>

      {/* FOOTER SECTION */}
      <footer id="footer_customer_portal" className="bg-violet-950 text-white pt-16 pb-8 border-t border-violet-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-12 mb-10">
            {/* Left: Branding */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-violet-600 rounded-xl text-white shadow-md">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-display text-2xl font-bold tracking-tight block">
                    {PROJECT_INFO.name}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase block -mt-1 text-violet-300">
                    {PROJECT_INFO.tagline}
                  </span>
                </div>
              </div>
              <p className="text-xs text-violet-200/80 leading-relaxed max-w-xs">
                Premium gated community of 130 triplex luxury villas spread across 12.5 lush acres in Hanamkonda. Built with aluminum shear wall technology.
              </p>
            </div>

            {/* Middle: Contact */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-violet-300 uppercase tracking-wider">
                Reach Us
              </h4>
              <div className="space-y-3 text-xs text-violet-200/90">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-4.5 w-4.5 text-violet-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {PROJECT_INFO.address}
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-violet-400" />
                  <span>+91 {PROJECT_INFO.phone}</span>
                </div>
              </div>
            </div>

            {/* Middle: Quick navigation */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-violet-300 uppercase tracking-wider">
                Fast Links
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "Home", target: "home_hero" },
                  { label: "Villa Facing", target: "villas_section" },
                  { label: "2D Virtual Tour", target: "virtual_tour_section" },
                  { label: "Clubhouse", target: "clubhouse_section" },
                  { label: "Amenities", target: "amenities_section" },
                  { label: "Technical Specs", target: "specifications_section" },
                  { label: "Landmarks", target: "location_section" },
                ].map((item) => (
                  <button
                    id={`footer_link_${item.target}`}
                    key={item.target}
                    onClick={() => {
                      const el = document.getElementById(item.target);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-left text-violet-200/85 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Accreditations */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm text-violet-300 uppercase tracking-wider">
                Registration & Approvals
              </h4>
              <div className="space-y-3 text-xs text-violet-200">
                <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/10">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-[10px] text-violet-300">TS RERA REGISTERED</span>
                    <span className="block font-mono text-[10px]">{PROJECT_INFO.reraNumber}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/10">
                  <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-[10px] text-violet-300">GBR HOMES LLP</span>
                    <span className="block text-[10px]">CREDAI Associated Builder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-violet-300/80 gap-4">
            <div>
              &copy; {new Date().getFullYear()} {PROJECT_INFO.name}. All Rights Reserved by {PROJECT_INFO.developer}.
            </div>
            <div className="flex items-center space-x-4">
              <button
                id="btn_footer_admin_toggle"
                onClick={toggleAdmin}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-violet-300 hover:text-white border border-white/10 transition-all font-semibold font-sans text-xs tracking-wide cursor-pointer"
              >
                <span>🔑</span>
                <span>{isAdminOpen ? "Close Admin Panel" : "Admin CRM Login"}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        id="btn_floating_whatsapp"
        href="https://wa.me/919704707976?text=Hi!%20I'm%20interested%20in%20GMR%20Mukunda%20Luxury%20Triplex%20Villas."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        {/* Pulsating Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-75"></span>
        <svg
          className="h-6 w-6 relative z-10 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.463h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Hover Label */}
        <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-medium tracking-wide px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl pointer-events-none border border-slate-800">
          Chat on WhatsApp
        </span>
      </a>

      {/* Official Brochure PDF Generator & Floorplan Modal */}
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
    </div>
  );
}
