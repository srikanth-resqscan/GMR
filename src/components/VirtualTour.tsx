/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import villaImg from "../assets/images/gmr_mukunda_villa_1783685666015.jpg";
import clubhouseImg from "../assets/images/gmr_mukunda_clubhouse_1783685682359.jpg";
import {
  Map,
  Compass,
  Home,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  PhoneCall,
  Calendar,
  CheckCircle,
  HelpCircle,
  Video,
  Eye,
  MapPin,
  Flame,
  Wind,
  Droplets,
  Sunset
} from "lucide-react";
import { PROJECT_INFO } from "../data";

// Type definitions for Virtual Tour
interface Hotspot {
  id: string;
  name: string;
  top: string; // Percentage position
  left: string; // Percentage position
  title: string;
  description: string;
  tag: string;
}

interface TourZone {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  hotspots: Hotspot[];
}

interface RoomSpec {
  id: string;
  name: string;
  dimensions: string;
  vastu: {
    direction: string;
    benefit: string;
    element: string; // Fire, Water, Air, Earth, Space
  };
  highlights: string[];
  icon: string;
  color: string;
}

interface FloorPlanTour {
  id: string;
  name: string;
  tagline: string;
  area: string;
  rooms: RoomSpec[];
}

export default function VirtualTour() {
  const [activeTab, setActiveTab] = useState<"community" | "villa">("community");
  
  // Community Tour State
  const [selectedZoneId, setSelectedZoneId] = useState<string>("clubhouse");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Villa Tour State
  const [selectedFloorId, setSelectedFloorId] = useState<string>("ground");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("living");

  // Community Zones Data
  const zones: TourZone[] = [
    {
      id: "clubhouse",
      name: "The Grand Pavilion",
      tagline: "16,000 Sft Multi-Level Social Clubhouse",
      image: clubhouseImg,
      description: "Designed as the social anchor of GMR Mukunda, The Grand Pavilion stands as a statement of luxury in monolithic concrete. Crafted with double-height glass panels overlooking the deck, it serves as the ultimate leisure hub for sports, wellness, and private events.",
      features: [
        "Tempered Blue Glass Swimming Pool & Kids Splash Zone",
        "Fully Equipped Air-Conditioned Gymnasium",
        "Multipurpose Celebration Hall for 150+ Guests",
        "Dedicated Indoor Games Lounge & Billiards Room"
      ],
      specs: {
        "Total Built Area": "16,000 Square Feet",
        "Flooring Material": "Italian Statuario Marble & Laminated Wooden Decks",
        "Seismic Tolerance": "Zone 2 Complaint Engineering",
        "Social Capacity": "Comfortably hosts up to 250 residents simultaneously"
      },
      hotspots: [
        {
          id: "pool",
          name: "Blue Pool Deck",
          top: "45%",
          left: "60%",
          title: "Infinity-Edge Swimming Pool",
          description: "A continuous water deck styled with anti-skid premium vitreous tiles and a modern filtration system.",
          tag: "Wellness"
        },
        {
          id: "gym",
          name: "Elite Gym",
          top: "20%",
          left: "35%",
          title: "Panoramic Glass Gymnasium",
          description: "High-end cardiovascular machinery and free weight racks set against 14-foot floor-to-ceiling glass walls.",
          tag: "Fitness"
        },
        {
          id: "lounge",
          name: "Social Lounge",
          top: "65%",
          left: "25%",
          title: "Double-Height Main Lobby",
          description: "Rich brass accents, bespoke leather armchairs, and acoustic ceiling baffles for an upscale corporate feel.",
          tag: "Leisure"
        }
      ]
    },
    {
      id: "entrance",
      name: "The Arch of Triangles",
      tagline: "60-Feet Premium Main Entrance Portal",
      image: villaImg,
      description: "Your grand welcoming home is designed with a monolithic steel structure and premium security checkposts. A monumental entrance that ensures maximum perimeter security while celebrating luxury contemporary geometry.",
      features: [
        "RFID-Enabled Automated Boom Barriers for Residents",
        "24/7 CCTV Surveillance Control Hub",
        "Manicured Cascade Fountains with LED Uplighting",
        "Visitor Greeting Lounge and Delivery Transit Bay"
      ],
      specs: {
        "Structure Width": "60 Feet Clearance Width",
        "Security Tech": "Secure IP Cameras with AI License Plate Detection",
        "Roadways": "40-Feet Wide Internal Concrete Arterial Roads",
        "Landscaping": "Avenue-lining Royal Palms and Bougainvillea Beds"
      },
      hotspots: [
        {
          id: "security",
          name: "Safe Checkpost",
          top: "55%",
          left: "48%",
          title: "Biometric & RFID Security Hub",
          description: "Staffed 24/7 with instant intercom linkage to all 130 triplex villas.",
          tag: "Security"
        },
        {
          id: "fountain",
          name: "Water Cascades",
          top: "80%",
          left: "70%",
          title: "Ambient Water Fountains",
          description: "Monolithic granite sculptures producing a calm acoustic barrier from the street traffic.",
          tag: "Aesthetics"
        }
      ]
    }
  ];

  // Villa Floorplans Data
  const floors: FloorPlanTour[] = [
    {
      id: "ground",
      name: "Ground Floor",
      tagline: "Welcome & Living Lounge",
      area: "1,200 Sft Area",
      rooms: [
        {
          id: "living",
          name: "Formal Drawing Room",
          dimensions: "14'0\" x 18'6\"",
          vastu: {
            direction: "North-East (Eshanya)",
            benefit: "Brings positive energy, prosperity, and high mental clarity.",
            element: "Water (Jal)"
          },
          highlights: [
            "Premium 1200x1800mm High-Gloss Glazed Vitrified Tiles",
            "Huge French blue-glass sliding windows overlooking the front garden",
            "Concealed provisions for customizable home automation and lighting"
          ],
          icon: "🛋️",
          color: "from-violet-500/10 to-violet-600/10 border-violet-200"
        },
        {
          id: "dining",
          name: "Dining & Open Kitchen",
          dimensions: "16'0\" x 12'0\"",
          vastu: {
            direction: "South-East (Agneya)",
            benefit: "The absolute perfect placement for healthy digestive fire and abundance.",
            element: "Fire (Agni)"
          },
          highlights: [
            "Engineered granite kitchen platform counter options",
            "Dedicated wet kitchen utility yard with sink on the exterior",
            "Elegant wash basin niche styled with designer ceramic mosaics"
          ],
          icon: "🍳",
          color: "from-emerald-500/10 to-emerald-600/10 border-emerald-200"
        },
        {
          id: "bedroom1",
          name: "Parent's Guest Suite",
          dimensions: "12'0\" x 14'0\"",
          vastu: {
            direction: "North-West (Vayuvya)",
            benefit: "Ensures healthy air circulation, light, and comfortable guest stays.",
            element: "Air (Vayu)"
          },
          highlights: [
            "Comfortable, step-free access ideal for elderly guests",
            "Attached luxury toilet with premium anti-skid tiling",
            "Dedicated space for customized floor-to-ceiling wardrobes"
          ],
          icon: "🛌",
          color: "from-blue-500/10 to-blue-600/10 border-blue-200"
        }
      ]
    },
    {
      id: "first",
      name: "First Floor",
      tagline: "Master Bedrooms & Private Lounge",
      area: "1,200 Sft Area",
      rooms: [
        {
          id: "master",
          name: "King Master Suite",
          dimensions: "16'0\" x 20'0\"",
          vastu: {
            direction: "South-West (Nairuthya)",
            benefit: "Promotes extreme structural stability, strong leadership, and deep sleep.",
            element: "Earth (Prithvi)"
          },
          highlights: [
            "Ultra-luxurious Master Suite with custom walk-in dressing wardrobe room",
            "Aesthetic direct access to a private, wide viewing balcony with glass railings",
            "Premium toilet featuring single-lever wall-mixed shower controls"
          ],
          icon: "👑",
          color: "from-amber-500/10 to-amber-600/10 border-amber-200"
        },
        {
          id: "family",
          name: "Cozy Family Lounge",
          dimensions: "14'0\" x 12'0\"",
          vastu: {
            direction: "Center (Brahmasthan)",
            benefit: "Keeps the family connected, fostering peace and mutual understanding.",
            element: "Space (Akash)"
          },
          highlights: [
            "Centrally positioned family TV lounge connecting all level suites",
            "Double-height air shaft to optimize internal thermodynamic breeze cooling",
            "Custom recess niche perfect for books, soundbars, or personal art panels"
          ],
          icon: "📺",
          color: "from-rose-500/10 to-rose-600/10 border-rose-200"
        },
        {
          id: "bedroom2",
          name: "Children's Study Bedroom",
          dimensions: "12'0\" x 14'0\"",
          vastu: {
            direction: "East (Purva)",
            benefit: "Perfect for sharp concentration, high focus, and health vitality.",
            element: "Solar (Surya)"
          },
          highlights: [
            "East-facing study table desk space ensuring wonderful natural morning light",
            "Spacious bedroom layout supporting full double beds and toy chests",
            "Attached modern bathroom with premium sanitary fixtures"
          ],
          icon: "🎒",
          color: "from-sky-500/10 to-sky-600/10 border-sky-200"
        }
      ]
    },
    {
      id: "second",
      name: "Second Floor & Terrace",
      tagline: "Recreation & Outdoor Garden",
      area: "1,100 Sft Area",
      rooms: [
        {
          id: "theatre",
          name: "Home Theatre Lounge",
          dimensions: "14'0\" x 16'6\"",
          vastu: {
            direction: "North-West (Vayuvya)",
            benefit: "Perfect space for social entertainment, lively music, and movies.",
            element: "Air (Vayu)"
          },
          highlights: [
            "Acoustic panel-ready dry walls for deep sound insulation",
            "Concealed heavy electrical conduits for 4K projector and 7.1 surround sound",
            "Cozy, dimmable smart ceiling LED light tracks pre-installed"
          ],
          icon: "🎬",
          color: "from-purple-500/10 to-purple-600/10 border-purple-200"
        },
        {
          id: "terrace",
          name: "Sky Garden Deck",
          dimensions: "20'0\" x 12'0\"",
          vastu: {
            direction: "North-East (Eshanya)",
            benefit: "Ensures refreshing morning breeze, cool air, and serene meditation.",
            element: "Space (Akash)"
          },
          highlights: [
            "Bespoke porcelain exterior tiles with high thermal resistance on slab",
            "Provision for custom green turf, planters, or open-air dining settings",
            "Perfect scenic views of the 12.5-acre landscaped gated campus"
          ],
          icon: "🌿",
          color: "from-emerald-500/10 to-emerald-600/10 border-emerald-200"
        }
      ]
    }
  ];

  const currentZone = zones.find((z) => z.id === selectedZoneId) || zones[0];
  const currentFloor = floors.find((f) => f.id === selectedFloorId) || floors[0];
  const currentRoom = currentFloor.rooms.find((r) => r.id === selectedRoomId) || currentFloor.rooms[0];

  const getElementIcon = (element: string) => {
    switch (element.toLowerCase()) {
      case "fire (agni)":
        return <Flame className="h-4 w-4 text-orange-500" />;
      case "water (jal)":
        return <Droplets className="h-4 w-4 text-blue-500" />;
      case "air (vayu)":
        return <Wind className="h-4 w-4 text-sky-500" />;
      case "earth (prithvi)":
        return <Compass className="h-4 w-4 text-amber-700" />;
      default:
        return <Sunset className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <section id="virtual_tour_section" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-900/50 text-blue-300 rounded-md text-xs font-bold uppercase tracking-widest mb-4 border border-blue-800/40">
            <Video className="h-3.5 w-3.5 text-blue-400" />
            <span>Interactive 2D Experience</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-light leading-none tracking-tight">
            GMR Mukunda <span className="font-black text-blue-400">Virtual Tour</span>
          </h2>
          <p className="text-slate-400 text-sm mt-4">
            Explore our architectural layout blueprint. Instantly walk through community zones and review Vastu compliance in detailed room-by-room floor plans.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="flex justify-center mt-8">
            <div className="bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/50 flex space-x-1 shadow-xl">
              <button
                id="btn_tour_mode_community"
                onClick={() => setActiveTab("community")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === "community"
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-200"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Map className="h-4 w-4" />
                <span>12.5-Acre Layout Tour</span>
              </button>
              <button
                id="btn_tour_mode_villa"
                onClick={() => {
                  setActiveTab("villa");
                  // Auto reset rooms
                  setSelectedFloorId("ground");
                  setSelectedRoomId("living");
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === "villa"
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-200"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Triplex Spatial Tour</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab content 1: Community Layout Map Tour */}
        {activeTab === "community" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Visual Canvas (LHS) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video border border-slate-700/60 bg-slate-950 shadow-2xl group">
                <img
                  src={currentZone.image}
                  alt={currentZone.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/60 px-4 py-2 rounded-xl flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-300">
                    {currentZone.name} Preview
                  </span>
                </div>

                {/* Hotspot Markers */}
                {currentZone.hotspots.map((h) => (
                  <button
                    id={`btn_hotspot_${h.id}`}
                    key={h.id}
                    onClick={() => setActiveHotspot(h)}
                    style={{ top: h.top, left: h.left }}
                    className="absolute p-2 rounded-full bg-blue-600/80 hover:bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 focus:outline-none group/btn animate-pulse"
                    title={h.name}
                  >
                    <Eye className="h-4 w-4 text-white" />
                    
                    {/* Ring animation */}
                    <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></span>
                    
                    {/* Tooltip on Hover */}
                    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow border border-slate-700 whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity">
                      {h.name}
                    </span>
                  </button>
                ))}

                {/* Hotspot detail overlay popover */}
                {activeHotspot && (
                  <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-md p-5 rounded-xl border border-blue-500/30 text-white shadow-2xl animate-fadeIn z-20">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-blue-900/60 text-blue-300 border border-blue-800 text-[9px] font-mono uppercase rounded mb-1.5">
                          {activeHotspot.tag} Point
                        </span>
                        <h4 className="font-sans font-bold text-base text-blue-300">
                          {activeHotspot.title}
                        </h4>
                      </div>
                      <button
                        id="btn_close_hotspot_info"
                        onClick={() => setActiveHotspot(null)}
                        className="text-slate-400 hover:text-white font-bold text-xs bg-slate-800 p-1.5 rounded cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {activeHotspot.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Interaction Guide */}
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3 text-xs text-slate-400">
                <Info className="h-5 w-5 text-blue-400 shrink-0" />
                <span>Click the pulsing purple <strong>Eye Hotspots</strong> on the image to view specifications, architectural highlights, and built detail portfolios.</span>
              </div>
            </div>

            {/* Selection & Specifications Drawer (RHS) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Zone Selectors */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
                <h3 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">
                  Select Community Zone
                </h3>
                <div className="space-y-2">
                  {zones.map((z) => (
                    <button
                      id={`btn_zone_select_${z.id}`}
                      key={z.id}
                      onClick={() => {
                        setSelectedZoneId(z.id);
                        setActiveHotspot(null); // Reset active hotspot
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all border cursor-pointer flex items-center justify-between ${
                        selectedZoneId === z.id
                          ? "bg-blue-950/40 border-blue-500/50 shadow-inner"
                          : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${selectedZoneId === z.id ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                          <MapPin className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <strong className="block text-sm text-white font-sans">{z.name}</strong>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{z.tagline}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase ${selectedZoneId === z.id ? "text-blue-400" : "text-slate-500"}`}>
                        {selectedZoneId === z.id ? "Active" : "View"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlight Details */}
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 space-y-5">
                <div>
                  <h4 className="text-lg font-bold text-blue-300 font-sans">
                    {currentZone.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {currentZone.description}
                  </p>
                </div>

                <div className="h-px bg-slate-800/60"></div>

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Premium Technical Parameters
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    {Object.entries(currentZone.specs).map(([label, val], i) => (
                      <div key={i} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                        <span className="block text-slate-500 font-medium mb-0.5">{label}</span>
                        <span className="block font-semibold text-white truncate">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-800/60"></div>

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Community Integration Features
                  </h5>
                  <ul className="space-y-2 text-xs">
                    {currentZone.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2 text-slate-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab content 2: Triplex Villa Walkthrough */}
        {activeTab === "villa" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Blueprint Grid Layout Selector (LHS - 4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Floor Level Toggle */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
                <h3 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">
                  Select Triplex Floor
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {floors.map((f) => (
                    <button
                      id={`btn_floor_level_${f.id}`}
                      key={f.id}
                      onClick={() => {
                        setSelectedFloorId(f.id);
                        // Auto-select first room of new floor
                        setSelectedRoomId(f.rooms[0].id);
                      }}
                      className={`py-3.5 px-2 rounded-xl text-center border cursor-pointer transition-all ${
                        selectedFloorId === f.id
                          ? "bg-blue-950/40 border-blue-500 text-white shadow-inner"
                          : "bg-slate-900/30 border-slate-800/80 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span className="block font-sans text-xs font-bold">{f.name}</span>
                      <span className="block text-[9px] font-mono mt-0.5 text-slate-400">{f.area}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blueprint Layout Schema Simulator */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
                <h3 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Interactive 2D Blueprint</span>
                  <span className="text-[10px] bg-blue-900/60 text-blue-300 border border-blue-800 px-2 py-0.5 rounded uppercase font-mono">
                    {currentFloor.name}
                  </span>
                </h3>

                {/* 2D Grid Room Blueprint Schema */}
                <div className="aspect-[4/3] bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative shadow-inner">
                  {/* Outer Yard / Border Label */}
                  <div className="absolute inset-x-0 top-0 h-4 border-b border-slate-800/40 flex justify-center items-center">
                    <span className="text-[8px] font-mono tracking-widest text-slate-600 uppercase">FRONT LANDSCAPED GARDEN AREA</span>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-3 flex-grow my-4 text-center">
                    {currentFloor.rooms.map((room) => {
                      const isSelected = selectedRoomId === room.id;
                      return (
                        <button
                          id={`btn_blueprint_room_${room.id}`}
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          className={`col-span-12 relative flex flex-col justify-center items-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-blue-950/50 border-blue-500/80 text-white shadow-lg shadow-blue-950/40 scale-[1.01]"
                              : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700/80 hover:bg-slate-900/60"
                          }`}
                        >
                          <span className="text-xl mb-1">{room.icon}</span>
                          <strong className="block text-xs font-sans tracking-tight">{room.name}</strong>
                          <span className="block text-[10px] font-mono text-slate-500 mt-0.5">{room.dimensions}</span>
                          
                          {isSelected && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-4 border-t border-slate-800/40 flex justify-center items-center">
                    <span className="text-[8px] font-mono tracking-widest text-slate-600 uppercase">INTERNAL SHEAR WALL PARTITIONS</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 italic mt-3 text-center">
                  Click on rooms in the blueprint to walk through detailed specs.
                </div>
              </div>

            </div>

            {/* Room Visual & Spec Details Drawer (RHS - 8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Room Highlight Title */}
              <div className="bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-6">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/60 pb-5 gap-4">
                  <div className="flex items-center space-x-3.5">
                    <span className="text-4xl bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-md">
                      {currentRoom.icon}
                    </span>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white">
                        {currentRoom.name}
                      </h4>
                      <p className="text-xs text-blue-400 font-mono mt-0.5">
                        Blueprint Dimensions: <span className="text-white font-bold">{currentRoom.dimensions}</span>
                      </p>
                    </div>
                  </div>

                  {/* Vastu Element Badge */}
                  <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex items-center space-x-2.5 max-w-fit">
                    {getElementIcon(currentRoom.vastu.element)}
                    <div>
                      <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">Vastu Element</span>
                      <strong className="block text-xs text-white leading-none">{currentRoom.vastu.element}</strong>
                    </div>
                  </div>
                </div>

                {/* Vastu Science Compliance block */}
                <div className="bg-gradient-to-r from-blue-950/20 to-blue-900/10 border border-blue-800/25 rounded-2xl p-5 flex items-start space-x-4">
                  <div className="p-2.5 bg-blue-600/20 rounded-xl text-blue-400 border border-blue-800/30">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
                      Vastu Compliant Placement: {currentRoom.vastu.direction}
                    </h5>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {currentRoom.vastu.benefit} Fully aligned with ancient Vaastu guidelines for complete health, peace, and domestic balance.
                    </p>
                  </div>
                </div>

                {/* Technical Specifications of selected space */}
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 font-mono">
                    Luxury Finishes & Architectural Parameters
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">FLOORING MATERIAL</span>
                      <strong className="text-xs text-white block">1200x1800mm High Gloss Vitrified</strong>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">CEILING CLEAR HEIGHT</span>
                      <strong className="text-xs text-white block">10' 6\" Unobstructed Clear height</strong>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">ELECTRICAL INTEGRITY</span>
                      <strong className="text-xs text-white block">Finolex Conduits & Legrand Switches</strong>
                    </div>
                  </div>
                </div>

                {/* Dynamic Highlights List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Core Blueprint Highlights
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentRoom.highlights.map((h, i) => (
                      <div key={i} className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50 flex items-start space-x-2.5">
                        <CheckCircle className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 leading-normal">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
