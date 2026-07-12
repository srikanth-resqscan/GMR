/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Building2, Menu, X, ArrowUpRight, ShieldCheck, User, FileText } from "lucide-react";
import { PROJECT_INFO } from "../data";

interface HeaderProps {
  onAdminClick: () => void;
  isAdminOpen: boolean;
  onOpenBrochure: () => void;
  onOpenEnquiry?: () => void;
}

export default function Header({ onAdminClick, isAdminOpen, onOpenBrochure, onOpenEnquiry }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (isAdminOpen) {
      onAdminClick(); // Close admin panel to return to the landing page
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <header
      id="header_main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-4 border-b border-blue-100"
          : "bg-gradient-to-b from-black/50 via-black/20 to-transparent text-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <button
            id="btn_brand_logo"
            onClick={() => handleNavClick("home_hero")}
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div className="p-2.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white shadow-md hover:from-blue-700 hover:to-violet-700 transition-colors">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <span
                className={`font-display text-2xl font-bold tracking-tight block ${
                  isScrolled ? "text-blue-950" : "text-white"
                }`}
              >
                {PROJECT_INFO.name}
              </span>
              <span
                className={`text-[9px] font-mono tracking-widest uppercase block -mt-1 ${
                  isScrolled ? "text-blue-600 font-semibold" : "text-blue-200"
                }`}
              >
                {PROJECT_INFO.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation links */}
          <nav id="nav_desktop" className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {[
              { label: "Home", target: "home_hero" },
              { label: "Villas", target: "villas_section" },
              { label: "Virtual Tour", target: "virtual_tour_section" },
              { label: "Clubhouse", target: "clubhouse_section" },
              { label: "Amenities", target: "amenities_section" },
              { label: "Specifications", target: "specifications_section" },
              { label: "Location", target: "location_section" },
            ].map((item) => (
              <button
                id={`nav_link_${item.target}`}
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className={`transition-colors relative py-1 focus:outline-none group cursor-pointer ${
                  isScrolled
                    ? "text-slate-600 hover:text-blue-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Call to Actions */}
          <div id="cta_desktop" className="hidden md:flex items-center space-x-3">
            <button
              id="btn_header_brochure_pdf_cta"
              onClick={onOpenBrochure}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-blue-50 hover:text-blue-950 focus:outline-none cursor-pointer border ${
                isScrolled
                  ? "border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100"
                  : "border-white/25 text-white bg-white/5 hover:bg-white/10"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Brochure PDF</span>
            </button>

            <button
              id="btn_header_contact_cta"
              onClick={onOpenEnquiry ? onOpenEnquiry : () => handleNavClick("contact_section")}
              className={`flex items-center space-x-1 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-blue-200 focus:outline-none ${
                isScrolled
                  ? "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                  : "bg-white text-blue-950 hover:bg-blue-50"
              }`}
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div id="mobile_menu_trigger" className="md:hidden flex items-center space-x-3">
            <button
              id="btn_hamburger_toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isScrolled ? "text-slate-700" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="nav_mobile_drawer"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-blue-100 shadow-xl py-6 px-4 animate-fadeIn"
        >
          <div className="flex flex-col space-y-4">
            {[
              { label: "Home", target: "home_hero" },
              { label: "Villas", target: "villas_section" },
              { label: "Virtual Tour", target: "virtual_tour_section" },
              { label: "Clubhouse", target: "clubhouse_section" },
              { label: "Amenities", target: "amenities_section" },
              { label: "Specifications", target: "specifications_section" },
              { label: "Location", target: "location_section" },
            ].map((item) => (
              <button
                id={`nav_mobile_link_${item.target}`}
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-left py-2 px-3 text-base font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-blue-100 my-2"></div>
            <div className="pt-2 space-y-2">
              <button
                id="btn_mobile_brochure_cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBrochure();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
              >
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Brochure PDF / Floorplans</span>
              </button>

              <button
                id="btn_mobile_enquiry_cta"
                onClick={onOpenEnquiry ? () => { setIsMobileMenuOpen(false); onOpenEnquiry(); } : () => handleNavClick("contact_section")}
                className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl font-semibold shadow-md shadow-blue-100"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
