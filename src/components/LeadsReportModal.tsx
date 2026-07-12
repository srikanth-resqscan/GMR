/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  X,
  Printer,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  Building,
  Sparkles
} from "lucide-react";
import { Lead } from "../types";
import { PROJECT_INFO } from "../data";

interface LeadsReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredLeads: Lead[];
  searchTerm: string;
  statusFilter: string;
  villaFilter: string;
}

export default function LeadsReportModal({
  isOpen,
  onClose,
  filteredLeads,
  searchTerm,
  statusFilter,
  villaFilter
}: LeadsReportModalProps) {
  if (!isOpen) return null;

  // Analytical summary stats
  const totalCount = filteredLeads.length;
  const activeCount = filteredLeads.filter((l) => l.isValid !== false).length;
  const expiredCount = filteredLeads.filter((l) => l.isValid === false).length;

  const getTopVillaType = () => {
    if (filteredLeads.length === 0) return "No Data Available";
    const counts: Record<string, number> = {};
    filteredLeads.forEach((l) => {
      counts[l.villaType] = (counts[l.villaType] || 0) + 1;
    });
    let topType = "";
    let maxCount = 0;
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topType = type;
      }
    });
    return { type: topType, count: maxCount };
  };

  const topVilla = getTopVillaType();
  const currentDateStr = new Date().toLocaleDateString("en-IN", {
    dateStyle: "long"
  });
  const currentTimeStr = new Date().toLocaleTimeString("en-IN", {
    timeStyle: "short"
  });

  const handlePrint = () => {
    // Inject the print-leads-report class on body
    document.body.classList.add("print-leads-report");
    setTimeout(() => {
      window.print();
      document.body.classList.remove("print-leads-report");
    }, 150);
  };

  return (
    <div
      id="leads_report_modal_overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      {/* Modal Container */}
      <div
        id="leads_report_modal_container"
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
                Executive Leads PDF Report
              </h3>
              <p className="text-xs text-blue-300 font-medium">
                Generate and print structured client portfolios with 365-day validity status
              </p>
            </div>
          </div>
          <button
            id="btn_close_report_modal"
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        {/* Modal Action Bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              <span>Report contains {totalCount} filtered leads</span>
            </span>
          </div>

          <button
            id="btn_trigger_report_print"
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            <Printer className="h-4 w-4 text-blue-400" />
            <span>Save to PDF / Print Report</span>
          </button>
        </div>

        {/* Modal Scrollable Content: Interactive Document Preview */}
        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8 bg-slate-100/50">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-md p-8 sm:p-12 space-y-8 font-sans text-slate-800">
            {/* Report Letterhead */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-blue-900 pb-6 gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 tracking-widest uppercase block mb-1">
                  OFFICIAL CRM DOCUMENT
                </span>
                <h1 className="text-3xl font-black text-slate-950 tracking-tight uppercase">
                  {PROJECT_INFO.name}
                </h1>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  130 Triplex Luxury Villas Gated Community &bull; GBR Homes LLP
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Date Generated
                </span>
                <span className="block text-sm font-bold text-slate-900">{currentDateStr}</span>
                <span className="block text-[11px] text-slate-500 font-mono">{currentTimeStr} (Local Time)</span>
              </div>
            </div>

            {/* Filter Context / Parameters */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <strong className="block text-[10px] uppercase font-mono text-slate-400 tracking-wider">Search Keywords</strong>
                <span className="text-slate-800 font-medium truncate block mt-0.5">{searchTerm ? `"${searchTerm}"` : "None (All Leads)"}</span>
              </div>
              <div>
                <strong className="block text-[10px] uppercase font-mono text-slate-400 tracking-wider">Validity Status</strong>
                <span className="text-slate-800 font-semibold mt-0.5 block capitalize">{statusFilter === "all" ? "All statuses" : statusFilter === "active" ? "Active (Valid 365 Days)" : "Expired"}</span>
              </div>
              <div>
                <strong className="block text-[10px] uppercase font-mono text-slate-400 tracking-wider">Villa Filter</strong>
                <span className="text-slate-800 font-medium block truncate mt-0.5">{villaFilter === "all" ? "All Triplex Types" : villaFilter}</span>
              </div>
            </div>

            {/* Executive Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-center">
                <span className="block text-[10px] font-mono font-bold text-blue-500 uppercase tracking-wider mb-1">Matching Leads</span>
                <span className="text-2xl font-black text-blue-950 block">{totalCount}</span>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-center">
                <span className="block text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider mb-1">Active (Valid)</span>
                <span className="text-2xl font-black text-emerald-800 block">{activeCount}</span>
              </div>
              <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 text-center">
                <span className="block text-[10px] font-mono font-bold text-rose-500 uppercase tracking-wider mb-1">Expired Leads</span>
                <span className="text-2xl font-black text-rose-800 block">{expiredCount}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Top Requested</span>
                <span className="text-xs font-bold text-slate-800 block truncate mt-1">
                  {typeof topVilla === "object" ? `${topVilla.type}` : "N/A"}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                  {typeof topVilla === "object" ? `(${topVilla.count} times)` : ""}
                </span>
              </div>
            </div>

            {/* Document Table */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono border-b border-slate-100 pb-1">
                Leads Detail Ledger
              </h3>
              {filteredLeads.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No records to display for the current filters.
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="min-w-full divide-y divide-slate-200 text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left font-bold text-slate-500 uppercase font-mono tracking-wider w-10">S.No</th>
                        <th scope="col" className="px-4 py-3 text-left font-bold text-slate-500 uppercase font-mono tracking-wider">Client Details</th>
                        <th scope="col" className="px-4 py-3 text-left font-bold text-slate-500 uppercase font-mono tracking-wider">Villa preference</th>
                        <th scope="col" className="px-4 py-3 text-left font-bold text-slate-500 uppercase font-mono tracking-wider">Submission</th>
                        <th scope="col" className="px-4 py-3 text-left font-bold text-slate-500 uppercase font-mono tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
                      {filteredLeads.map((lead, idx) => (
                        <tr key={lead.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-mono text-slate-400 text-center">{idx + 1}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-900">{lead.name}</div>
                            <div className="text-[11px] font-mono text-slate-500">{lead.phone}</div>
                            {lead.email && lead.email !== "N/A" && (
                              <div className="text-[11px] text-slate-400 mt-0.5">{lead.email}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 font-medium text-blue-900">{lead.villaType}</td>
                          <td className="px-4 py-3 text-slate-500">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            {lead.isValid !== false ? (
                              <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                Active ({lead.daysRemaining ?? 365}d left)
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                                Expired
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Document Sign-off Footer */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-400 gap-4">
              <div>
                <span>GMR MUKUNDA - INTERNAL MANAGEMENT AUDIT PORTAL</span>
              </div>
              <div>
                <span>CONFIDENTIAL &bull; LEADS RETENTION POLICY (365 DAYS)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900/5 border-t border-slate-100 px-6 py-4.5 flex justify-end">
          <button
            id="btn_close_report_modal_footer"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Close Report Viewer
          </button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* PROFESSIONAL HIGH-CONTRAST VECTOR PRINT LAYOUT BLOCK  */}
      {/* ====================================================== */}
      <div id="printable-leads-report" className="hidden">
        <div className="print-page bg-white text-slate-900 border-none relative flex flex-col justify-between" style={{ height: "100vh", padding: "1.2in" }}>
          <div>
            {/* Header Letterhead */}
            <div className="border-b-4 border-slate-900 pb-4 mb-6 flex justify-between items-end">
              <div>
                <span className="font-mono font-bold text-[10px] text-slate-500 uppercase tracking-widest block mb-1">
                  OFFICIAL AUDIT REPORT &bull; GBR HOMES LLP
                </span>
                <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tight">
                  {PROJECT_INFO.name}
                </h1>
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  130 Triplex Luxury Villas Community &bull; Lead Audit Register
                </p>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  DOCUMENT GENERATED
                </span>
                <strong className="block text-sm text-slate-950 uppercase">{currentDateStr}</strong>
                <span className="block text-[10px] text-slate-500 font-mono uppercase">{currentTimeStr}</span>
              </div>
            </div>

            {/* Document Description */}
            <p className="text-xs text-slate-700 leading-relaxed mb-6">
              This official lead register comprises prospective clients for the 130 triplex luxury villas at Hanamkonda. 
              Per organization policy, lead validity is strictly maintained for <strong>365 days</strong> from submission. 
              Filters applied during export: 
              Search query: <strong>{searchTerm ? `"${searchTerm}"` : "None (All Leads)"}</strong> | 
              Validity filter: <strong>{statusFilter.toUpperCase()}</strong> | 
              Villa configuration: <strong>{villaFilter.toUpperCase()}</strong>.
            </p>

            {/* Executive Summary Block */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="border border-slate-300 p-3 rounded-lg text-center bg-slate-50">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-0.5">Matching Leads</span>
                <span className="text-xl font-black text-slate-950 block">{totalCount}</span>
              </div>
              <div className="border border-slate-300 p-3 rounded-lg text-center bg-slate-50">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-0.5">Active (Valid)</span>
                <span className="text-xl font-black text-slate-950 block">{activeCount}</span>
              </div>
              <div className="border border-slate-300 p-3 rounded-lg text-center bg-slate-50">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-0.5">Expired Leads</span>
                <span className="text-xl font-black text-slate-950 block">{expiredCount}</span>
              </div>
              <div className="border border-slate-300 p-3 rounded-lg text-center bg-slate-50">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-0.5">Top Preference</span>
                <span className="text-[10px] font-bold text-slate-900 block truncate mt-1">
                  {typeof topVilla === "object" ? `${topVilla.type}` : "N/A"}
                </span>
              </div>
            </div>

            {/* Structured Table */}
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 font-mono border-b-2 border-slate-300 pb-1 mb-3">
              I. CLIENT INQUIRY DETAIL REGISTER
            </h3>
            {filteredLeads.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-6">No matching leads recorded.</p>
            ) : (
              <table className="min-w-full text-[10px] border border-slate-300 text-slate-800">
                <thead className="bg-slate-100">
                  <tr className="border-b border-slate-300">
                    <th className="px-3 py-2 text-left font-bold text-slate-950 uppercase border-r border-slate-300 w-8">S.No</th>
                    <th className="px-3 py-2 text-left font-bold text-slate-950 uppercase border-r border-slate-300">Client Name</th>
                    <th className="px-3 py-2 text-left font-bold text-slate-950 uppercase border-r border-slate-300">Contact Number</th>
                    <th className="px-3 py-2 text-left font-bold text-slate-950 uppercase border-r border-slate-300">Villa Preference</th>
                    <th className="px-3 py-2 text-left font-bold text-slate-950 uppercase border-r border-slate-300">Submission Date</th>
                    <th className="px-3 py-2 text-left font-bold text-slate-950 uppercase">Validity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 bg-white">
                  {filteredLeads.map((lead, idx) => (
                    <tr key={lead.id} className="border-b border-slate-300">
                      <td className="px-3 py-2 font-mono text-center border-r border-slate-300">{idx + 1}</td>
                      <td className="px-3 py-2 font-bold border-r border-slate-300 text-slate-950">{lead.name}</td>
                      <td className="px-3 py-2 font-mono border-r border-slate-300">{lead.phone}</td>
                      <td className="px-3 py-2 border-r border-slate-300">{lead.villaType}</td>
                      <td className="px-3 py-2 border-r border-slate-300">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="px-3 py-2">
                        {lead.isValid !== false ? (
                          <span>ACTIVE (Valid - {lead.daysRemaining ?? 365} days remaining)</span>
                        ) : (
                          <span className="text-slate-400 font-bold">EXPIRED (&gt;365d)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Secure Audit Signature Panel */}
          <div>
            <div className="grid grid-cols-2 gap-12 mt-12 mb-6 text-xs pt-8">
              <div className="text-center">
                <div className="h-12 border-b border-slate-400 max-w-[200px] mx-auto mb-1.5"></div>
                <span className="block font-bold text-slate-900">CRM Administrator Signature</span>
                <span className="block text-[10px] text-slate-400">GMR Mukunda VIP Desk</span>
              </div>
              <div className="text-center">
                <div className="h-12 border-b border-slate-400 max-w-[200px] mx-auto mb-1.5"></div>
                <span className="block font-bold text-slate-900">GBR Homes LLP Authorized Signatory</span>
                <span className="block text-[10px] text-slate-400">Executive Management Desk</span>
              </div>
            </div>

            <div className="border-t border-slate-300 pt-4 flex justify-between items-center text-[9px] font-mono text-slate-400">
              <span>GMR MUKUNDA LEADERSHIP &bull; CONFIDENTIAL DOCUMENT REGISTER</span>
              <span>AUTHENTICATED CRM SECURE EXPORT &bull; PAGE 1 OF 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
