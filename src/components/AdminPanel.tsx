/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Download,
  Lock,
  LogOut,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Clock,
  Eye,
  X,
  CheckCircle,
  KeyRound,
  FileSpreadsheet,
  Users,
  FileText
} from "lucide-react";
import { Lead } from "../types";
import LeadsReportModal from "./LeadsReportModal";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Searching & Filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "expired">("all");
  const [villaFilter, setVillaFilter] = useState("all");

  // Reset password states
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Detailed view state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Leads PDF report modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Load leads from API
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/leads", {
        headers: {
          Authorization: "Bearer gmr_secret_session_token_130_villas",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if token exists in session
    const token = sessionStorage.getItem("gmr_admin_token");
    if (token === "gmr_secret_session_token_130_villas") {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        sessionStorage.setItem("gmr_admin_token", data.token);
        setIsAuthenticated(true);
        setPassword("");
        fetchLeads();
      } else {
        setLoginError(data.error || "Incorrect password. Please try again.");
      }
    } catch (err) {
      setLoginError("Failed to authenticate. Is the server running?");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gmr_admin_token");
    setIsAuthenticated(false);
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer gmr_secret_session_token_130_villas",
        },
      });
      if (response.ok) {
        setLeads(leads.filter((lead) => lead.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete lead");
      }
    } catch (err) {
      alert("Error deleting lead.");
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    if (newPassword !== confirmPassword) {
      setResetError("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          token: "gmr_secret_session_token_130_villas",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResetSuccess("Admin password reset successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setIsResetOpen(false);
          setResetSuccess("");
        }, 2000);
      } else {
        setResetError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setResetError("Failed to connect to the server.");
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    window.open("/api/leads/export?token=gmr_secret_session_token_130_villas", "_blank");
  };

  // Filtering Logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.message && lead.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const isLeadValid = lead.isValid !== false; // defaults to active/true
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && isLeadValid) ||
      (statusFilter === "expired" && !isLeadValid);

    const matchesVilla =
      villaFilter === "all" || lead.villaType === villaFilter;

    return matchesSearch && matchesStatus && matchesVilla;
  });

  // Extract unique villa types for filter dropdown
  const uniqueVillas = Array.from(new Set(leads.map((l) => l.villaType))).filter(Boolean);

  // Calculate statistics
  const totalLeadsCount = leads.length;
  const activeLeadsCount = leads.filter((l) => l.isValid !== false).length;
  const expiredLeadsCount = totalLeadsCount - activeLeadsCount;

  if (!isAuthenticated) {
    return (
      <div id="admin_login_view" className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-violet-100">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 bg-violet-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-200">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-display font-bold text-violet-950">Admin Workspace</h2>
            <p className="mt-2 text-sm text-slate-500">
              Please authenticate to access lead details.
            </p>
          </div>

          <form id="form_admin_login" className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
                  Admin Passkey
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <KeyRound className="h-5 w-5" />
                  </span>
                  <input
                    id="input_admin_password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password (gmr123)"
                    className="pl-11 pr-4 py-3.5 block w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {loginError && (
              <div className="text-rose-600 text-sm flex items-center space-x-1.5 bg-rose-50 p-3 rounded-xl border border-rose-100 animate-shake">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <button
                id="btn_admin_login_submit"
                type="submit"
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all shadow-md shadow-violet-150 cursor-pointer"
              >
                Sign In to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin_dashboard_view" className="min-h-screen bg-slate-50 flex flex-col pt-24 pb-20">
      {/* Top statistics and Action panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-2">
              <h1 className="text-3xl font-display font-bold text-violet-950">GMR Mukunda Leads</h1>
              <span className="inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-800 border border-violet-200">
                Lead Validity: 365 Days
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1.5">
              Analyze, search, and manage leads for your 130 triplex luxury villas. All leads have 365 days validity.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              id="btn_refresh_leads"
              onClick={fetchLeads}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              id="btn_open_reset_password"
              onClick={() => setIsResetOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              <Lock className="h-3.5 w-3.5 text-violet-500" />
              <span>Reset Passkey</span>
            </button>

            <button
              id="btn_admin_logout"
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div id="admin_stats_grid" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="p-4 bg-violet-50 text-violet-600 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                Total Submissions
              </span>
              <span className="block text-2xl font-bold font-display text-violet-950">
                {totalLeadsCount}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                Active (Within 365 Days)
              </span>
              <span className="block text-2xl font-bold font-display text-emerald-700">
                {activeLeadsCount}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                Expired (&gt; 365 Days)
              </span>
              <span className="block text-2xl font-bold font-display text-rose-700">
                {expiredLeadsCount}
              </span>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <div id="admin_filters_panel" className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              id="input_leads_search"
              type="text"
              placeholder="Search leads by name, phone, message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
            <div>
              <select
                id="select_status_filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500 transition-all text-slate-700 font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active (365d validity)</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <select
                id="select_villa_filter"
                value={villaFilter}
                onChange={(e) => setVillaFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500 transition-all text-slate-700 font-medium"
              >
                <option value="all">All Villa Types</option>
                {uniqueVillas.map((villa) => (
                  <option key={villa} value={villa}>
                    {villa}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lead Table / list representation */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden mb-12">
          {filteredLeads.length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-slate-300 mb-3 flex justify-center">
                <Search className="h-12 w-12" />
              </div>
              <p className="text-slate-500 font-medium">No matching leads found</p>
              <p className="text-xs text-slate-400 mt-1">Try modifying your filters or search keywords.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Lead Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Villa Preference
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Date Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Validity Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredLeads.map((lead) => {
                    const isValid = lead.isValid !== false;
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-900 text-sm">{lead.name}</div>
                          <div className="text-xs text-violet-700 font-semibold">{lead.phone}</div>
                          {lead.email && lead.email !== "N/A" && (
                            <div className="text-xs text-slate-500 mt-0.5">{lead.email}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-800 border border-violet-100">
                            {lead.villaType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isValid ? (
                            <div className="flex flex-col">
                              <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 w-fit">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>Active</span>
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium mt-1">
                                {lead.daysRemaining} days left of 365
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="inline-flex items-center space-x-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 w-fit">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                                <span>Expired</span>
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium mt-1">
                                Over 365 days old
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              id={`btn_view_lead_${lead.id}`}
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg text-violet-600 hover:bg-violet-50 transition-all"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              id={`btn_delete_lead_${lead.id}`}
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-all"
                              title="Delete Lead"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Admin Dashboard Operations Footer (Required) */}
      <footer id="admin_dashboard_footer" className="fixed bottom-0 left-0 right-0 bg-white border-t border-violet-100 shadow-lg py-3 px-6 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-500">
            <span className="font-semibold text-violet-950 font-display">GMR MUKUNDA OPERATING FOOTER</span>
            <span className="text-slate-300">|</span>
            <span>Showing {filteredLeads.length} of {leads.length} leads</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              id="btn_footer_export_pdf"
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold shadow-md cursor-pointer transition-colors"
            >
              <FileText className="h-3.5 w-3.5 text-violet-400" />
              <span>Export PDF Report</span>
            </button>

            <button
              id="btn_footer_export_csv"
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold shadow-md shadow-violet-100 cursor-pointer transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV (Excel)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Lead details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-violet-100 animate-slideUp">
            <div className="bg-violet-950 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-display font-bold">Inquiry Details</h3>
                <p className="text-xs text-violet-200 mt-0.5">ID: {selectedLead.id}</p>
              </div>
              <button
                id="btn_close_lead_details"
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Prospect Name
                </span>
                <span className="text-base font-semibold text-slate-800">{selectedLead.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Phone Number
                  </span>
                  <span className="text-sm font-semibold text-violet-700">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Email Address
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{selectedLead.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Villa Interest
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-800 border border-violet-100 mt-1">
                    {selectedLead.villaType}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Lead Status
                  </span>
                  {selectedLead.isValid !== false ? (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 mt-1">
                      Active ({selectedLead.daysRemaining} days left)
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-100 mt-1">
                      Expired
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Message / Remarks
                </span>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 whitespace-pre-wrap border border-slate-100 leading-relaxed font-sans">
                  {selectedLead.message || "No comments entered."}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-right font-mono">
                Submitted: {new Date(selectedLead.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-slate-50 flex justify-end space-x-3 border-t border-slate-100">
              <button
                id="btn_modal_delete_lead"
                onClick={() => {
                  handleDeleteLead(selectedLead.id);
                }}
                className="flex items-center space-x-1 px-4 py-2 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Inquiry</span>
              </button>
              <button
                id="btn_modal_close"
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal (Inside Panel Option) */}
      {isResetOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-violet-100 animate-slideUp">
            <div className="bg-violet-950 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-display font-bold">Update Passkey</h3>
                <p className="text-xs text-violet-200 mt-0.5">Reset your admin portal entry password</p>
              </div>
              <button
                id="btn_close_password_reset"
                onClick={() => {
                  setIsResetOpen(false);
                  setResetError("");
                  setResetSuccess("");
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form id="form_password_reset" onSubmit={handlePasswordReset} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Current Admin Password
                </label>
                <input
                  id="input_old_password"
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="px-4 py-2.5 block w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm focus:bg-white transition-all outline-none"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  New Admin Password
                </label>
                <input
                  id="input_new_password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="px-4 py-2.5 block w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm focus:bg-white transition-all outline-none"
                  placeholder="At least 4 characters"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Confirm New Password
                </label>
                <input
                  id="input_confirm_password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-4 py-2.5 block w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm focus:bg-white transition-all outline-none"
                  placeholder="Re-enter new password"
                />
              </div>

              {resetError && (
                <div className="text-rose-600 text-xs bg-rose-50 p-3 rounded-xl border border-rose-100 flex items-center space-x-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{resetError}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="text-emerald-600 text-xs bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center space-x-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>{resetSuccess}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  id="btn_cancel_reset"
                  type="button"
                  onClick={() => setIsResetOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="btn_submit_reset"
                  type="submit"
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-semibold shadow-md transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leads Executive Report PDF & Print Generator */}
      <LeadsReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        filteredLeads={filteredLeads}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        villaFilter={villaFilter}
      />
    </div>
  );
}
