/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import villaImg from "../assets/images/gmr_mukunda_villa_1783685666015.jpg";
import clubhouseImg from "../assets/images/gmr_mukunda_clubhouse_1783685682359.jpg";
import {
  X,
  Printer,
  FileText,
  Sparkles,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle,
  Building,
  Ruler,
  Maximize2,
  Home,
  Check,
  Map,
  Download
} from "lucide-react";
import { PROJECT_INFO, VILLAS, CLUBHOUSE_AMENITIES, AMENITIES, SPECIFICATIONS, NEARBY_PLACES } from "../data";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "printInfo">("preview");

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="brochure_modal_overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      {/* Modal Container */}
      <div
        id="brochure_modal_container"
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-fadeIn"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg leading-tight">
                Original Layout & Villa Brochure PDF
              </h3>
              <p className="text-xs text-blue-300 font-medium">
                Official high-resolution print-ready brochure & floor plans
              </p>
            </div>
          </div>
          <button
            id="btn_close_brochure_modal"
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        {/* Modal Actions and Quick Guide */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex bg-slate-200/60 p-1 rounded-lg w-fit">
            <button
              id="btn_brochure_tab_preview"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "preview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Interactive Brochure Preview
            </button>
            <button
              id="btn_brochure_tab_print_info"
              onClick={() => setActiveTab("printInfo")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "printInfo" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              How to Save as PDF
            </button>
          </div>

          <button
            id="btn_trigger_brochure_print"
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-200 transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print or Save to PDF</span>
          </button>
        </div>

        {/* Modal Content Window */}
        <div className="max-h-[65vh] overflow-y-auto p-6 sm:p-8 bg-slate-50/50">
          {activeTab === "printInfo" ? (
            <div id="pdf_instructions_panel" className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
                <h4 className="font-sans font-bold text-blue-950 flex items-center space-x-2 text-base">
                  <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                  <span>Interactive PDF Generation Guide</span>
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our system generates a perfectly structured, multi-page vector PDF containing all high-resolution renderings, floor plans, specifications, and landmarks. Follow these simple steps to download it:
                </p>
                <div className="space-y-3.5 text-sm text-slate-700">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-blue-200 text-blue-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">1</div>
                    <span className="leading-relaxed">
                      Click the <strong className="text-blue-700 font-bold">Print or Save to PDF</strong> button above.
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-blue-200 text-blue-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">2</div>
                    <span className="leading-relaxed">
                      In the print prompt, choose <strong className="text-blue-700 font-bold">Save as PDF</strong> as your "Destination" or "Printer".
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-blue-200 text-blue-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">3</div>
                    <span className="leading-relaxed">
                      Expand "More settings" (or layout settings) and verify that <strong className="text-blue-700 font-bold">Background graphics</strong> is checked/enabled. This renders the premium violet styling and original villa images correctly.
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-blue-200 text-blue-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">4</div>
                    <span className="leading-relaxed">
                      Set margins to <strong className="text-blue-700 font-bold">None</strong> or "Default" for the cleanest bleed-to-edge layout.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  id="btn_pdf_instructions_ok"
                  onClick={() => setActiveTab("preview")}
                  className="px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Go to Digital Brochure Preview
                </button>
              </div>
            </div>
          ) : (
            <div id="interactive_digital_brochure_reader" className="space-y-12">
              <div className="text-center max-w-lg mx-auto mb-6">
                <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-100/60 px-3 py-1 rounded-md uppercase tracking-wider">
                  Digital Document Preview
                </span>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Scroll down to view each page of the official GMR Mukunda Brochure. These pages will compile automatically into a multi-page PDF when printed or saved.
                </p>
              </div>

              {/* Cover Page Card (Page 1) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden max-w-3xl mx-auto">
                <span className="absolute top-4 right-4 bg-slate-900 text-white font-mono text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider z-10">
                  Page 1: Brand Cover
                </span>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                  <div className="md:col-span-5 space-y-6">
                    <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl w-fit">
                      <Building className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest block">
                        {PROJECT_INFO.developer} PRESENTATION
                      </span>
                      <h4 className="text-4xl font-black text-slate-950 tracking-tight leading-none uppercase">
                        {PROJECT_INFO.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-400 font-bold tracking-widest">
                        {PROJECT_INFO.tagline}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      A premium, CREDAI-approved gated community of 130 triplex luxury villas designed to perfection using modern MIVAN Shear Wall engineering.
                    </p>
                    <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600 font-medium">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>RERA ID: {PROJECT_INFO.reraNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>12.5 Acres Luxury Estate</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 h-80 rounded-2xl overflow-hidden relative shadow-md">
                    <img
                      src={villaImg}
                      alt="Original Luxury Villa Exterior"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[9px] font-mono tracking-widest font-bold text-blue-300 uppercase block">
                        Original Rendering
                      </span>
                      <h5 className="font-bold text-sm">GMR Mukunda Triplex Villa Facade</h5>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layout and Floorplans (Page 2) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden max-w-3xl mx-auto">
                <span className="absolute top-4 right-4 bg-slate-900 text-white font-mono text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider z-10">
                  Page 2: Original Layout Plans
                </span>
                
                <div className="space-y-6 pt-4">
                  <div className="border-b border-slate-100 pb-4">
                    <h4 className="text-xl font-bold text-slate-950 tracking-tight flex items-center space-x-2">
                      <Map className="h-5 w-5 text-blue-600" />
                      <span>Official Layout Matrix & Area Matrix</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Our villas are crafted symmetrically for elite community living, featuring distinct East and West facings.
                    </p>
                  </div>

                  {/* Matrix table */}
                  <div className="overflow-x-auto border border-slate-100 rounded-xl">
                    <table className="min-w-full divide-y divide-slate-100 text-xs">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold text-slate-600 uppercase tracking-wider">Facing</th>
                          <th className="px-4 py-3 text-left font-bold text-slate-600 uppercase tracking-wider">Plot Dimensions</th>
                          <th className="px-4 py-3 text-left font-bold text-slate-600 uppercase tracking-wider">Plot Area</th>
                          <th className="px-4 py-3 text-right font-bold text-slate-600 uppercase tracking-wider">Total Built Area</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {VILLAS.map((v, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-bold text-slate-900">{v.facing} Facing Triplex</td>
                            <td className="px-4 py-3 text-slate-500 font-mono">{v.plotSize}</td>
                            <td className="px-4 py-3 text-slate-500 font-medium">{v.plotArea}</td>
                            <td className="px-4 py-3 text-right font-bold text-blue-700 font-mono">{v.totalArea}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Floor Plan Breakdown Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100 space-y-3">
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md block w-fit uppercase">
                        Typical East Facing (3,610 Sft)
                      </span>
                      <ul className="space-y-2 text-xs text-slate-600">
                        <li className="flex justify-between"><strong>Ground Floor (1460 Sft):</strong> Double-Height Living, Kitchen, Bed + Bath</li>
                        <li className="flex justify-between"><strong>First Floor (1460 Sft):</strong> Master Suite, Child Bed, Family Lounge, Deck</li>
                        <li className="flex justify-between"><strong>Second Floor (690 Sft):</strong> Multipurpose Hall, Sky Bar, Open Terrace</li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100 space-y-3">
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md block w-fit uppercase">
                        Typical West Facing (3,580 Sft)
                      </span>
                      <ul className="space-y-2 text-xs text-slate-600">
                        <li className="flex justify-between"><strong>Ground Floor (1405 Sft):</strong> Drawing Room, Kitchen, Dining, Guest Bed</li>
                        <li className="flex justify-between"><strong>First Floor (1405 Sft):</strong> Master Bedroom, Second Bedroom, Lounge, Balcony</li>
                        <li className="flex justify-between"><strong>Second Floor (770 Sft):</strong> Multipurpose Hall, Open Sky Terrace & Provision for Lift</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clubhouse & Amenities Page (Page 3) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden max-w-3xl mx-auto">
                <span className="absolute top-4 right-4 bg-slate-900 text-white font-mono text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider z-10">
                  Page 3: Luxury Clubhouse
                </span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                  <div className="md:col-span-7 h-80 rounded-2xl overflow-hidden relative shadow-md">
                    <img
                      src={clubhouseImg}
                      alt="Original Premium Clubhouse"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[9px] font-mono tracking-widest font-bold text-blue-300 uppercase block">
                        Original Rendering
                      </span>
                      <h5 className="font-bold text-sm">GMR Mukunda 5-Level Clubhouse Facade</h5>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                        SOCIAL HUB
                      </span>
                      <h4 className="text-xl font-bold text-slate-950 tracking-tight leading-none uppercase">
                        {PROJECT_INFO.clubhouseSize} CLUBHOUSE
                      </h4>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      Experience extraordinary recreational activities across 5 levels of customized physical amenities, designed to match ultra-luxury resort-style standards.
                    </p>

                    <div className="space-y-2 text-xs">
                      {CLUBHOUSE_AMENITIES.map((lvl, index) => (
                        <div key={index} className="flex justify-between items-start border-b border-slate-100 pb-1.5 last:border-0">
                          <span className="font-bold text-slate-800 shrink-0 mr-3">L{index}: {lvl.floor}</span>
                          <span className="text-slate-500 text-right truncate max-w-[160px]">{lvl.items.join(", ")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications & Contact (Page 4) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden max-w-3xl mx-auto">
                <span className="absolute top-4 right-4 bg-slate-900 text-white font-mono text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider z-10">
                  Page 4: Specifications & Contact
                </span>

                <div className="space-y-6 pt-4">
                  <div className="border-b border-slate-100 pb-4">
                    <h4 className="text-xl font-bold text-slate-950 tracking-tight leading-none uppercase">
                      Technical Specifications & Layout Landmarks
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3.5">
                      <h5 className="text-xs font-bold text-blue-700 uppercase tracking-wider font-mono">Premium Materials</h5>
                      <div className="space-y-2 text-xs text-slate-600">
                        <p><strong>Structure:</strong> MIVAN high-precision Monolithic Shear Walls (earthquake resistant Zone 2).</p>
                        <p><strong>Flooring:</strong> 1200mm x 1800mm Glazed Vitrified Tiles of premium brand in all key rooms.</p>
                        <p><strong>Main Door:</strong> 8-foot wood frame, teak veneer finish with premium safety locks.</p>
                        <p><strong>Sanitary:</strong> Grohe / Kohler / Jaguar or equivalent single-lever diverter fittings.</p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <h5 className="text-xs font-bold text-blue-700 uppercase tracking-wider font-mono">Nearby Distance Key</h5>
                      <div className="space-y-2 text-xs text-slate-600">
                        <div className="flex justify-between border-b border-slate-100 pb-1"><span>DPS Warangal:</span> <strong className="font-mono text-slate-800">2.0 Km</strong></div>
                        <div className="flex justify-between border-b border-slate-100 pb-1"><span>Outer Ring Road (ORR):</span> <strong className="font-mono text-slate-800">2.0 Km</strong></div>
                        <div className="flex justify-between border-b border-slate-100 pb-1"><span>Kazipet Jn. Railway Station:</span> <strong className="font-mono text-slate-800">3.5 Km</strong></div>
                        <div className="flex justify-between border-b border-slate-100 pb-1"><span>NIT Warangal:</span> <strong className="font-mono text-slate-800">5.0 Km</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Brand Footer Block */}
                  <div className="mt-6 bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <div>
                      <span className="block text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">BROCHURE COMPILED BY</span>
                      <strong className="block text-sm text-white font-sans font-extrabold uppercase">{PROJECT_INFO.developer}</strong>
                      <span className="block text-[10px] text-slate-400 mt-1">{PROJECT_INFO.address.split(',').slice(0, 3).join(',')}</span>
                    </div>

                    <div className="flex flex-col items-center sm:items-end">
                      <span className="block text-[10px] font-mono text-slate-400 tracking-wider">VIP ENQUIRIES</span>
                      <a href={`tel:${PROJECT_INFO.phone}`} className="flex items-center text-white font-bold hover:text-blue-300 transition-colors text-base mt-0.5">
                        <Phone className="h-4 w-4 mr-1.5 text-blue-400" />
                        <span>+91 {PROJECT_INFO.phone}</span>
                      </a>
                      <span className="text-[9px] text-blue-300 bg-blue-900/40 px-2 py-0.5 rounded border border-blue-800/50 mt-1.5 font-mono">
                        TS RERA: {PROJECT_INFO.reraNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900/5 border-t border-slate-100 px-6 py-4.5 flex justify-end">
          <button
            id="btn_close_brochure_modal_footer"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* PRINT LAYOUT BLOCK (HIDDEN ON SCREEN, ONLY VISIBLE IN window.print() OUTPUT) */}
      {/* ========================================= */}
      <div id="printable-brochure" className="hidden">
        {/* Page 1: Front Cover */}
        <div className="print-page bg-white text-slate-900 border-none relative overflow-hidden flex flex-col justify-between" style={{ height: "100vh", padding: "3in 2in 2in 2in" }}>
          <div className="text-center space-y-6">
            <span className="font-mono font-bold text-xs text-blue-700 tracking-widest block uppercase">
              {PROJECT_INFO.developer}
            </span>
            <h1 className="text-6xl font-black tracking-tight text-slate-950 uppercase" style={{ fontSize: "3.5rem" }}>
              {PROJECT_INFO.name}
            </h1>
            <p className="text-sm font-mono tracking-widest text-slate-400 font-bold uppercase">
              &mdash; {PROJECT_INFO.tagline} &mdash;
            </p>
            <div className="h-px bg-slate-200 max-w-xs mx-auto my-6"></div>
            <p className="text-base text-slate-600 max-w-lg mx-auto font-sans leading-relaxed">
              Gated Community Luxury Triplex Villas<br />
              <strong className="text-slate-900">@ Rampur, Hanamkonda</strong>
            </p>
          </div>

          <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative border border-slate-100 flex-grow my-8 max-h-[350px]">
            <img
              src={villaImg}
              alt="GMR Mukunda Triplex Villa Facade"
              className="w-full h-full object-cover"
              style={{ objectFit: "cover" }}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex justify-between items-end border-t border-slate-100 pt-8 text-xs text-slate-400">
            <div>
              <span className="block font-bold text-slate-800">TS RERA REGISTERED</span>
              <span className="block font-mono text-[10px] mt-0.5">{PROJECT_INFO.reraNumber}</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-slate-800">GBR HOMES LLP</span>
              <span className="block text-[10px] mt-0.5">CREDAI Associated Builder</span>
            </div>
          </div>
        </div>

        {/* Page 2: Layout & Floorplans */}
        <div className="print-page bg-white text-slate-900 border-none relative flex flex-col justify-between" style={{ height: "100vh", padding: "1.5in" }}>
          <div>
            <div className="border-b-2 border-blue-700 pb-4 mb-8">
              <span className="font-mono font-bold text-[10px] text-blue-700 uppercase tracking-widest">SECTION 02</span>
              <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight">ORIGINAL LAYOUT & FLOOR PLANS</h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              Each triplex home is structured with state-of-the-art aluminum formwork (MIVAN) shear walls, optimizing double-height ceilings, modular spaces, personal lift shafts, and open sky sky lounges.
            </p>

            <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg text-sm mb-8">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 uppercase">Villa Facing</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 uppercase">Plot Size</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 uppercase">Plot Area</th>
                  <th className="px-4 py-3 text-right font-bold text-slate-700 uppercase">Sft Built Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {VILLAS.map((v, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-bold text-slate-900">{v.facing} Facing Triplex</td>
                    <td className="px-4 py-3 text-slate-600 font-mono">{v.plotSize}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{v.plotArea}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-blue-700">{v.totalArea}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-cols-2 gap-8 mt-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
                <h4 className="font-bold text-sm text-slate-950 border-b border-slate-200 pb-1.5 uppercase">Typical East Facing (3,610 Sft)</h4>
                <p className="text-xs text-slate-600"><strong>Ground Floor (1460 Sft):</strong> Luxury Double-Height Living, Drawing Area, Gourmet Kitchen, Guest Bed, and Lift shaft.</p>
                <p className="text-xs text-slate-600"><strong>First Floor (1460 Sft):</strong> Master Suite, Children's Bedroom with attached baths, wide Glass Balconies.</p>
                <p className="text-xs text-slate-600"><strong>Second Floor (690 Sft):</strong> Multipurpose Entertainment Hall, Bar Lounge and Sky Garden Terrace.</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
                <h4 className="font-bold text-sm text-slate-950 border-b border-slate-200 pb-1.5 uppercase">Typical West Facing (3,580 Sft)</h4>
                <p className="text-xs text-slate-600"><strong>Ground Floor (1405 Sft):</strong> Open Foyer, Kitchen & Dry Utility yard, Dining Lounge, and Elder's Bedroom.</p>
                <p className="text-xs text-slate-600"><strong>First Floor (1405 Sft):</strong> Private Master Bedroom suite, Bedroom 2, and double glass balcony.</p>
                <p className="text-xs text-slate-600"><strong>Second Floor (770 Sft):</strong> Spacious Home Theatre hall, bar deck, and wide sky-garden overlooks.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-xs text-slate-400">
            <span>GMR MUKUNDA - LUXURY VILLA PORTFOLIO</span>
            <span>Page 2</span>
          </div>
        </div>

        {/* Page 3: Clubhouse */}
        <div className="print-page bg-white text-slate-900 border-none relative flex flex-col justify-between" style={{ height: "100vh", padding: "1.5in" }}>
          <div>
            <div className="border-b-2 border-blue-700 pb-4 mb-8">
              <span className="font-mono font-bold text-[10px] text-blue-700 uppercase tracking-widest">SECTION 03</span>
              <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight">16,000 SFT RECREATION CLUBHOUSE</h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              The 5-story luxury clubhouse serves as the focal point of the community, equipped with AC guest suites, commercial spaces, fitness facilities, and rooftop lawns.
            </p>

            <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 h-80 my-8">
              <img
                src={clubhouseImg}
                alt="GMR Mukunda Clubhouse"
                className="w-full h-full object-cover"
                style={{ objectFit: "cover" }}
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-5 gap-4 mt-8">
              {CLUBHOUSE_AMENITIES.map((lvl, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  <span className="block text-[10px] font-mono font-bold text-blue-700 uppercase">LEVEL {idx}</span>
                  <strong className="block text-xs text-slate-950">{lvl.floor}</strong>
                  <p className="text-[10px] text-slate-500 leading-tight">{lvl.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-xs text-slate-400">
            <span>GMR MUKUNDA - RECREATION PORTFOLIO</span>
            <span>Page 3</span>
          </div>
        </div>

        {/* Page 4: Technical Specifications & Contact */}
        <div className="print-page bg-white text-slate-900 border-none relative flex flex-col justify-between" style={{ height: "100vh", padding: "1.5in" }}>
          <div>
            <div className="border-b-2 border-blue-700 pb-4 mb-8">
              <span className="font-mono font-bold text-[10px] text-blue-700 uppercase tracking-widest">SECTION 04</span>
              <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight">SPECIFICATIONS & ACCESS ROAD</h2>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-1.5 uppercase">Core Specifications</h3>
                <div className="space-y-3.5 text-xs text-slate-600">
                  <p><strong>Structure:</strong> Monolithic concrete casting using high-precision aluminum forms. Heavy wind and seismic protection.</p>
                  <p><strong>Flooring:</strong> Mirror-polished 1200x1800mm glazed tiles. Sleek leather-finish granite stairs.</p>
                  <p><strong>Power backup:</strong> 100% generator back-up including individual villa AC units.</p>
                  <p><strong>Toilets:</strong> Grohe Single Lever Diverters, wall-hung WC, concealed flushing cistern and designer tiles.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-1.5 uppercase">Proximity & Connectivity</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>Outer Ring Road (ORR):</span> <strong>2.0 Km</strong></div>
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>DPS Warangal School:</span> <strong>2.0 Km</strong></div>
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>Kazipet Junction Station:</span> <strong>3.5 Km</strong></div>
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>NIT Warangal Campus:</span> <strong>5.0 Km</strong></div>
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>Rohini Hospital:</span> <strong>7.5 Km</strong></div>
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>Hanumakonda Collectorate:</span> <strong>7.0 Km</strong></div>
                </div>
              </div>
            </div>

            {/* Official Contact Segment */}
            <div className="mt-12 p-8 bg-slate-950 text-white rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-wider">DEVELOPER OFFICE</span>
                <strong className="text-lg block uppercase">{PROJECT_INFO.developer}</strong>
                <p className="text-[11px] text-slate-400 mt-1 max-w-sm leading-relaxed">{PROJECT_INFO.address}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">VIP DIRECT DESK</span>
                <strong className="text-xl text-white block mt-0.5">+91 {PROJECT_INFO.phone}</strong>
                <span className="text-xs text-blue-300 block mt-1 font-mono">TS RERA No: {PROJECT_INFO.reraNumber}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-xs text-slate-400">
            <span>GMR MUKUNDA - ACCESS & STANDARDS</span>
            <span>Page 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
