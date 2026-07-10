/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { NEARBY_PLACES } from "../data";
import {
  Compass,
  GraduationCap,
  Hospital,
  Train,
  Briefcase,
  Search,
  MapPin,
  Clock,
  Navigation
} from "lucide-react";

export default function NearbyLocations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "transit" | "education" | "healthcare" | "industry">("all");

  const filteredPlaces = NEARBY_PLACES.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || place.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <GraduationCap className="h-4.5 w-4.5 text-violet-600" />;
      case "healthcare":
        return <Hospital className="h-4.5 w-4.5 text-rose-600" />;
      case "transit":
        return <Train className="h-4.5 w-4.5 text-amber-600" />;
      case "industry":
        return <Briefcase className="h-4.5 w-4.5 text-emerald-600" />;
      default:
        return <MapPin className="h-4.5 w-4.5 text-violet-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "education":
        return "bg-violet-50 text-violet-700 border-violet-100";
      case "healthcare":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "transit":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "industry":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div id="nearby_locations_panel" className="bg-white rounded-3xl border border-violet-100 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Informative Panel */}
        <div className="lg:col-span-5 bg-violet-950 p-8 sm:p-12 text-white flex flex-col justify-between">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-violet-200 uppercase tracking-widest block w-fit mb-6">
              Strategic Proximity
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              An Address That Connects You Effortlessly
            </h3>
            <p className="text-sm text-violet-200 mt-4 leading-relaxed">
              Ideally positioned on the <strong>Hanamkonda-Hyderabad Highway</strong> (Rampur), GMR Mukunda is placed minutes from highly premium educational clusters, state-of-the-art super-specialty hospitals, and critical transport routes.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-start space-x-3 text-sm text-violet-100">
              <MapPin className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
              <span>
                <strong>Site Address:</strong> Old Thushara PG College Premises, Beside Kapil Foods, Rampur, Hanamkonda.
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-violet-100">
              <Navigation className="h-4.5 w-4.5 text-violet-400 shrink-0" />
              <span>Easy access to Hyderabad Highway & ORR</span>
            </div>
          </div>
        </div>

        {/* Right Searchable Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-slate-50/50 flex flex-col justify-between">
          <div>
            {/* Search inputs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  id="input_landmarks_search"
                  type="text"
                  placeholder="Search schools, hospitals, transit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 block w-full bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none"
                />
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap gap-1.5 bg-slate-200/50 p-1 rounded-xl">
                {[
                  { id: "all", label: "All" },
                  { id: "education", label: "Schools" },
                  { id: "healthcare", label: "Hospitals" },
                  { id: "transit", label: "Transit" },
                ].map((item) => (
                  <button
                    id={`btn_landmark_filter_${item.id}`}
                    key={item.id}
                    onClick={() => setCategoryFilter(item.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                      categoryFilter === item.id
                        ? "bg-white text-violet-950 shadow-sm font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List entries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-2">
              {filteredPlaces.length === 0 ? (
                <div className="col-span-2 py-12 text-center text-slate-400 text-xs font-medium">
                  No landmarks match your search query.
                </div>
              ) : (
                filteredPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between hover:border-violet-200 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(place.category)} shrink-0`}>
                        {getCategoryIcon(place.category)}
                      </div>
                      <div>
                        <span className="block font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                          {place.name}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-0.5 block">
                          {place.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 bg-violet-50 border border-violet-100 text-violet-800 font-mono text-xs font-bold px-2 py-1 rounded-lg shrink-0">
                      <Clock className="h-3 w-3" />
                      <span>{place.distance}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center">
              <Compass className="h-4 w-4 mr-1.5 text-violet-600 animate-spin" />
              Calculated from Old Thushara PG College Premises, Rampur.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
