/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { VILLAS } from "../data";
import { Check, Compass, Ruler, Home, ArrowUpRight, Maximize2 } from "lucide-react";

interface VillaConfiguratorProps {
  onVillaSelect: (villaName: string) => void;
}

export default function VillaConfigurator({ onVillaSelect }: VillaConfiguratorProps) {
  const [selectedVillaIndex, setSelectedVillaIndex] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState<"ground" | "first" | "second">("ground");

  const villa = VILLAS[selectedVillaIndex];

  // Helper to draw clean schematic mock layouts for each floor
  const getFloorPlanRooms = (villaId: string, floor: "ground" | "first" | "second") => {
    if (villaId === "v-east" || villaId === "v-west") {
      switch (floor) {
        case "ground":
          return [
            { name: "Grand Foyer", size: "11'0\" x 6'0\"" },
            { name: "Double-Height Living Room", size: "13'0\" x 17'0\"" },
            { name: "Drawing Room", size: "13'3\" x 10'0\"" },
            { name: "Kitchen & Utility Area", size: "11'0\" x 10'0\"" },
            { name: "Guest Bedroom with Toilet", size: "13'7\" x 12'0\"" },
            { name: "Elevator Shaft (Lift Space)", size: "5'0\" x 5'0\"" },
            { name: "Powder Room / Toilet", size: "5'6\" x 4'0\"" },
          ];
        case "first":
          return [
            { name: "Master Bedroom", size: "13'7\" x 15'0\"" },
            { name: "Children's Bedroom", size: "13'7\" x 13'0\"" },
            { name: "Family Lounge", size: "11'0\" x 13'6\"" },
            { name: "Dressing Closet (W.I.C.)", size: "6'0\" x 9'0\"" },
            { name: "En-Suite Bathrooms (x2)", size: "5'6\" x 9'0\"" },
            { name: "Glass Sit-Out Balcony", size: "13'7\" x 10'7\"" },
          ];
        case "second":
          return [
            { name: "Multipurpose Hall / Home Theatre", size: "11'0\" x 13'6\"" },
            { name: "Open Bar Lounge & Pantry", size: "9'0\" x 9'0\"" },
            { name: "Servant Toilet & Utility", size: "4'0\" x 7'0\"" },
            { name: "Spacious Open Sky Terrace", size: "320 Sft Area" },
          ];
      }
    } else {
      // Corner Villas
      switch (floor) {
        case "ground":
          return [
            { name: "Double-Car Parking Porch", size: "22'0\" x 19'0\"" },
            { name: "Premium Foyer & Pooja Room", size: "11'0\" x 6'0\"" },
            { name: "Grand Double-Height Drawing", size: "19'0\" x 12'0\"" },
            { name: "Dining Hall & Glass Lounge", size: "20'1\" x 14'9\"" },
            { name: "Gourmet Kitchen & Wet Kitchen", size: "11'0\" x 12'0\"" },
            { name: "Guest Bedroom & Attached Bath", size: "14'0\" x 12'0\"" },
            { name: "Servant Quarters with Bath", size: "7'0\" x 7'0\"" },
          ];
        case "first":
          return [
            { name: "VVIP Master Suite & Walk-In Wardrobe", size: "19'0\" x 13'0\"" },
            { name: "Bedroom 2 with Attached Toilet", size: "14'0\" x 14'0\"" },
            { name: "Bedroom 3 with Wardrobe space", size: "11'0\" x 12'0\"" },
            { name: "Cozy Family Lounge", size: "20'1\" x 14'9\"" },
            { name: "Glass Deck Sit-Out", size: "18'1\" x 5'0\"" },
          ];
        case "second":
          return [
            { name: "Executive Suite / Bedroom 4", size: "14'0\" x 14'0\"" },
            { name: "Bar Lounge & Private Pantry", size: "10'10\" x 9'9\"" },
            { name: "Elevator Cabin Space", size: "5'0\" x 5'0\"" },
            { name: "Panoramic Open Sky Roof Garden", size: "480 Sft Area" },
          ];
      }
    }
  };

  const currentRooms = getFloorPlanRooms(villa.id, selectedFloor);

  return (
    <div id="villa_config_panel" className="bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-100/50 overflow-hidden">
      {/* Selector Tab for Villa facing */}
      <div className="bg-slate-900 p-5 sm:p-7 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none"></div>
        <div className="relative z-10 flex flex-wrap gap-3">
          {VILLAS.map((v, idx) => (
            <button
              id={`btn_villa_tab_${v.id}`}
              key={v.id}
              onClick={() => {
                setSelectedVillaIndex(idx);
                setSelectedFloor("ground");
              }}
              className={`px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                selectedVillaIndex === idx
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-700/30"
                  : "bg-slate-800 hover:bg-slate-750 text-slate-300"
              }`}
            >
              {v.facing} Facing ({v.totalArea})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Specifications Left Panel */}
        <div className="lg:col-span-5 p-6 sm:p-10 border-r border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-5">
              <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-md text-[11px] font-bold uppercase tracking-widest">
                {villa.facing} FACING
              </span>
              <span className="flex items-center text-[11px] font-mono tracking-wider font-bold text-slate-400">
                <Compass className="h-3.5 w-3.5 mr-1 text-violet-600 animate-spin" />
                VASTU COMPLIANT
              </span>
            </div>

            <h3 className="text-3xl font-light text-slate-900 tracking-tight leading-tight">
              The <span className="font-black text-violet-700">{villa.name.split(' ')[0]}</span> {villa.name.split(' ').slice(1).join(' ')}
            </h3>

            <p className="text-slate-500 text-sm mt-4 leading-relaxed font-sans">
              {villa.description}
            </p>

            {/* Sizes Key metrics */}
            <div className="grid grid-cols-2 gap-4 my-6 py-5 border-y border-slate-100">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-violet-50 text-violet-700 rounded-lg">
                  <Ruler className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Plot Dimensions
                  </span>
                  <span className="text-sm font-bold text-slate-800">{villa.plotSize}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-violet-50 text-violet-700 rounded-lg">
                  <Maximize2 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Plot Area
                  </span>
                  <span className="text-sm font-bold text-slate-800">{villa.plotArea}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-violet-50 text-violet-700 rounded-lg">
                  <Home className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Total Sft Area
                  </span>
                  <span className="text-sm font-bold text-violet-800">{villa.totalArea}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-violet-50 text-violet-700 rounded-lg">
                  <Maximize2 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Structure
                  </span>
                  <span className="text-sm font-bold text-slate-800">Ground + 2 Floors</span>
                </div>
              </div>
            </div>

            {/* Features check-list */}
            <div className="space-y-3">
              <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                Key Premium Features
              </span>
              {villa.features.map((feature, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="mt-1 p-0.5 bg-violet-50 text-violet-700 rounded-full border border-violet-100">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <button
              id={`btn_interest_villa_${villa.id}`}
              onClick={() => onVillaSelect(`${villa.facing} Facing Triplex Villa (${villa.totalArea})`)}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold transition-all duration-300 shadow-lg shadow-violet-200 cursor-pointer hover:scale-[1.01]"
            >
              <span>Enquire About This Floorplan</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Interactive Floor blueprints Right Panel */}
        <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-sans font-bold text-lg text-slate-950">
                Interactive Floor Layout Spec
              </h4>

              {/* Floor Tabs */}
              <div className="flex bg-slate-200/50 p-1 rounded-lg">
                {[
                  { key: "ground", label: "Ground" },
                  { key: "first", label: "First" },
                  { key: "second", label: "Second" },
                ].map((fl) => (
                  <button
                    id={`btn_floor_tab_${fl.key}`}
                    key={fl.key}
                    onClick={() => setSelectedFloor(fl.key as any)}
                    className={`px-4.5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                      selectedFloor === fl.key
                        ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-100"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {fl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Floor area detail label */}
            <div className="mb-4 text-xs font-mono font-bold text-violet-700">
              {selectedFloor === "ground" && `GROUND FLOOR AREA: ${villa.groundFloor}`}
              {selectedFloor === "first" && `FIRST FLOOR AREA: ${villa.firstFloor}`}
              {selectedFloor === "second" && `SECOND FLOOR AREA: ${villa.secondFloor}`}
            </div>

            {/* Room Schematic list with graphical indicator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentRooms.map((room, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-400 font-mono tracking-wider">
                      SPACE {index + 1}
                    </span>
                    <span className="block font-bold text-sm text-violet-950 mt-0.5">
                      {room.name}
                    </span>
                  </div>
                  <div className="bg-violet-50 text-violet-800 border border-violet-100 font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg shrink-0">
                    {room.size}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphical Blueprint Preview Illustration */}
          <div className="mt-8 bg-white/50 border border-dashed border-violet-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <Compass className="h-10 w-10 text-violet-400 mb-2 animate-pulse" />
            <span className="font-display font-bold text-xs text-violet-900 uppercase tracking-wider">
              Autogenerated Vastu Blueprint Matrix
            </span>
            <span className="text-[10px] text-slate-400 max-w-sm mt-1 leading-normal">
              Continuous cross-ventilation, 8-foot internal doors, and 1200x1800mm glazed vitrified tiles included by default in {villa.facing} Layout.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
