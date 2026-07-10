/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AMENITIES, CLUBHOUSE_AMENITIES, PROJECT_INFO } from "../data";
import {
  Sparkles,
  TreePine,
  Activity,
  Heart,
  ShieldAlert,
  ArrowDownCircle,
  Award,
  BookOpen,
  Coffee,
  CheckCircle2,
  CalendarDays
} from "lucide-react";

export default function AmenitiesSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "clubhouse" | "outdoor" | "facility">("all");

  const filteredAmenities = AMENITIES.filter(
    (amenity) => activeCategory === "all" || amenity.category === activeCategory
  );

  return (
    <div id="amenities_wrapper" className="space-y-20">
      {/* Overview stats of 16,000 sft Clubhouse */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-100/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-950 p-8 sm:p-12 text-white flex flex-col justify-between relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/10 text-violet-200 border border-white/15 rounded-md text-[11px] font-bold uppercase tracking-widest mb-6">
              Grand Clubhouse
            </span>
            <h3 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight">
              16,000 Sft of <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">Pure Luxury</span>
            </h3>
            <p className="text-sm text-violet-200/90 mt-5 leading-relaxed font-sans">
              Experience unparalleled community living with a 5-level luxury clubhouse. From a dynamic indoor AC Badminton Court to a premium private Coffee Deck and high-end AC Guest Suites.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 space-y-4 relative z-10">
            <div className="flex items-center space-x-3 text-sm text-violet-100 font-medium">
              <CheckCircle2 className="h-4.5 w-4.5 text-violet-400 shrink-0" />
              <span>CREDAI Approved Premium Amenities</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-violet-100 font-medium">
              <CheckCircle2 className="h-4.5 w-4.5 text-violet-400 shrink-0" />
              <span>TS RERA Registration: {PROJECT_INFO.reraNumber}</span>
            </div>
          </div>
        </div>

        {/* Level breakdown list */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-slate-50/40 relative">
          <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.05] pointer-events-none"></div>
          <div className="relative z-10">
            <h4 className="font-sans font-bold text-lg text-slate-950 mb-6 flex items-center space-x-2">
              <Award className="h-5 w-5 text-violet-600 shrink-0 animate-pulse" />
              <span>Clubhouse Floor-Wise Layout Matrix</span>
            </h4>

            <div className="space-y-4">
              {CLUBHOUSE_AMENITIES.map((level, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-violet-200 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3.5 shrink-0">
                    <div className="h-9 w-9 bg-violet-50 text-violet-700 font-mono text-xs font-bold rounded-lg flex items-center justify-center border border-violet-100">
                      L{i}
                    </div>
                    <span className="font-bold text-sm text-slate-900">{level.floor}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {level.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-3 py-1 bg-violet-50/50 text-violet-950 border border-violet-100/60 text-[11px] font-semibold rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main outdoor and estate amenities grid */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight leading-tight">
              Campus Facilities & <span className="font-black text-violet-700">Active Arenas</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Perfect lifestyle ecosystem across 12.5 green acres, featuring fully secured access parameters.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-1 bg-slate-200/50 p-1 rounded-lg">
            {[
              { id: "all", label: "All Layouts" },
              { id: "clubhouse", label: "Clubhouse" },
              { id: "outdoor", label: "Active & Parks" },
              { id: "facility", label: "Utilities" },
            ].map((cat) => (
              <button
                id={`btn_amenity_filter_${cat.id}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4.5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-violet-600 text-white shadow-md font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAmenities.map((amenity, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3.5 hover:shadow-2xl hover:shadow-slate-100/60 hover:border-violet-100 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="p-2.5 bg-violet-50 text-violet-700 rounded-lg shrink-0 border border-violet-100/50">
                {amenity.category === "clubhouse" && <Coffee className="h-4.5 w-4.5" />}
                {amenity.category === "outdoor" && <TreePine className="h-4.5 w-4.5" />}
                {amenity.category === "facility" && <ShieldAlert className="h-4.5 w-4.5" />}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                {amenity.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
