/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Maximize2, Sparkles, LayoutGrid, Calendar, ChevronRight, X, ZoomIn } from "lucide-react";
import facadePremiumImg from "../assets/images/villa_facade_premium_1783833565416.jpg";
import livingRoomImg from "../assets/images/villa_living_room_1783833580237.jpg";
import bedroomSuiteImg from "../assets/images/villa_bedroom_suite_1783833594415.jpg";
import terraceGardenImg from "../assets/images/villa_terrace_garden_1783833608394.jpg";

const VILLA_SAMPLES = [
  {
    id: "facade",
    title: "Premium Triplex Exterior Facade",
    subtitle: "GMR Mukunda Signature Elevation",
    category: "Exterior",
    image: facadePremiumImg,
    description: "Designed with state-of-the-art monolithic aluminum formwork (MIVAN) for clean structural edges, featuring a high-contrast palette of minimalist white and charcoal textured concrete. Complimented by custom glass balconies, wide double-height window openings, and bespoke ambient lighting fixtures.",
    highlights: ["MIVAN Shear Wall Structure", "High-Performance Glass Balustrades", "Seismic Zone-2 Resistant Design", "Eco-friendly landscaping plaza"]
  },
  {
    id: "living",
    title: "Double-Height Luxury Living Room",
    subtitle: "Grand Vertical Volume & Airflow",
    category: "Living Space",
    image: livingRoomImg,
    description: "Experience absolute grandeur in our signature double-height drawing area. Flooded with natural daylight from floor-to-ceiling high-performance windows, finished with massive 1200mm x 1800mm premium glazed vitrified tiles, and designed for optimal cross ventilation under strict Vastu guidance.",
    highlights: ["22-Foot Double Height Ceiling", "1200x1800mm Premium Tiles", "Floor-to-Ceiling Glass Panels", "Integrated Airflow Engineering"]
  },
  {
    id: "bedroom",
    title: "Presidential Master Bedroom Suite",
    subtitle: "Your Personal Sanctuary of Comfort",
    category: "Bedrooms",
    image: bedroomSuiteImg,
    description: "A gorgeous master bedroom featuring premium warm light wood paneling, dedicated custom walk-in closet space, and direct sliding glass access to an expansive private balcony overlooking lush green avenue trees. Features elite bathroom fittings of international repute.",
    highlights: ["Sliding Glass Balcony Doors", "Luxury Wood-Textured Accent Walls", "Premium Wardrobe Provisions", "Designer Concealed Fitting Baths"]
  },
  {
    id: "terrace",
    title: "Private Sky Lounge & Terrace Garden",
    subtitle: "Under the Celestial Canopy",
    category: "Terrace Lounge",
    image: terraceGardenImg,
    description: "Elevate your evening gatherings with an exclusive second-floor open terrace garden. Complete with weather-resistant luxury outdoor seating, ambient mood lighting, safety steel railings, and provisions for a bespoke sky-bar where memories are written under starry skies.",
    highlights: ["Open-Sky Sit-out Lounge", "Anti-Skid Weatherproof Tiling", "Provision for Sky-Bar & Counter", "Potted Evergreen Flora Borders"]
  }
];

interface SampleVillasShowcaseProps {
  onBookTour: () => void;
}

export default function SampleVillasShowcase({ onBookTour }: SampleVillasShowcaseProps) {
  const [activeTab, setActiveTab] = useState(VILLA_SAMPLES[0].id);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string; desc: string } | null>(null);

  const activeSample = VILLA_SAMPLES.find((s) => s.id === activeTab) || VILLA_SAMPLES[0];

  return (
    <section id="sample_villas_showcase" className="py-20 bg-white relative overflow-hidden">
      {/* Absolute Background accents */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.1] pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-100 rounded-full filter blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Interactive Real Estate Showroom</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 leading-tight">
            Explore the <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Sample Villa Interiors</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Step inside GMR Mukunda. Browse our freshly rendered high-resolution sample interior structures, showcasing premium specifications, double-height volumes, and spacious balconies.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
          {VILLA_SAMPLES.map((sample) => (
            <button
              id={`tab_trigger_${sample.id}`}
              key={sample.id}
              onClick={() => setActiveTab(sample.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === sample.id
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 scale-102"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
              }`}
            >
              <Camera className="h-3.5 w-3.5" />
              <span>{sample.category}</span>
            </button>
          ))}
        </div>

        {/* Interactive Feature Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/50 p-4 sm:p-8 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-100/30">
          
          {/* Left Column: Premium Interactive Viewport */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl bg-slate-950 aspect-[16/10] shadow-xl border border-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSample.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <img
                  src={activeSample.image}
                  alt={activeSample.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Visual Glass Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Top Category Badge */}
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-mono tracking-widest uppercase font-extrabold px-3 py-1 rounded-md shadow-lg">
                  {activeSample.category}
                </span>

                {/* Bottom Showroom Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-blue-300 font-bold block uppercase">
                      {activeSample.subtitle}
                    </span>
                    <h4 className="font-sans font-bold text-base sm:text-lg block">
                      {activeSample.title}
                    </h4>
                  </div>

                  <button
                    id={`btn_zoom_showroom_${activeSample.id}`}
                    onClick={() => setLightboxImg({
                      src: activeSample.image,
                      title: activeSample.title,
                      desc: activeSample.description
                    })}
                    className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white hover:scale-110 transition-all cursor-pointer border border-white/10"
                    title="View High-Res Lightbox"
                  >
                    <Maximize2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Descriptions & Premium Specs List */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-blue-600 tracking-widest uppercase block">
                VIP Architectural Showcase
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase">
                {activeSample.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                {activeSample.description}
              </p>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {activeSample.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white px-4 py-3 rounded-xl border border-slate-200/50 shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0"></span>
                  <span className="text-xs font-semibold text-slate-700 leading-none">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                id="btn_showroom_book_visit"
                onClick={onBookTour}
                className="flex-1 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-500/10 transition-all text-center cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Site Tour</span>
              </button>

              <button
                id="btn_showroom_lightbox_trigger"
                onClick={() => setLightboxImg({
                  src: activeSample.image,
                  title: activeSample.title,
                  desc: activeSample.description
                })}
                className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all text-center cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <ZoomIn className="h-4 w-4 text-blue-400" />
                <span>View Fullscreen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview strip below the panel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {VILLA_SAMPLES.map((sample) => (
            <div
              id={`thumbnail_preview_${sample.id}`}
              key={sample.id}
              onClick={() => setActiveTab(sample.id)}
              className={`relative rounded-xl overflow-hidden aspect-[16/10] cursor-pointer border-2 transition-all duration-300 ${
                activeTab === sample.id
                  ? "border-blue-600 shadow-lg scale-102"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={sample.image}
                alt={sample.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/40"></div>
              <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-sans uppercase">
                {sample.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            id="showroom_lightbox_overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-center items-center p-4"
          >
            {/* Close trigger */}
            <button
              id="btn_showroom_lightbox_close"
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-10 border border-white/10"
              title="Close Fullscreen View"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Immersive Image Viewer Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="max-w-5xl w-full flex flex-col items-center space-y-4"
            >
              <div className="w-full relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl bg-black">
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Informative description strip below image */}
              <div className="text-center text-white max-w-2xl px-4 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-blue-300">
                  {lightboxImg.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {lightboxImg.desc}
                </p>
                <div className="pt-2">
                  <button
                    id="btn_lightbox_dismiss_cta"
                    onClick={() => {
                      setLightboxImg(null);
                      onBookTour();
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Request Real Price Sheet for This Layout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
