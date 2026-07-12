/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, CheckCircle, Smartphone, Mail, User, MessageSquare, Building, ArrowRight, FileText } from "lucide-react";
import { PROJECT_INFO } from "../data";

interface LeadFormProps {
  defaultVillaType?: string;
  onOpenBrochure?: () => void;
}

export default function LeadForm({ defaultVillaType = "General Inquiry", onOpenBrochure }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [villaType, setVillaType] = useState(defaultVillaType);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      setIsSubmitting(false);
      return;
    }

    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          villaType,
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitSuccess(true);
        // Clear fields
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMsg(data.error || "Failed to submit lead. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network failure. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div id="lead_success_message" className="bg-white/95 border border-blue-100 p-8 sm:p-12 rounded-3xl shadow-xl text-center space-y-6 animate-fadeIn">
        <div className="mx-auto h-16 w-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-50">
          <CheckCircle className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-blue-950">Inquiry Received!</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Thank you for choosing GMR Mukunda. Our dedicated relationship manager from GBR Homes LLP will contact you on <span className="font-semibold text-blue-700">{phone}</span> within 2 hours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          {onOpenBrochure && (
            <button
              id="btn_success_download_brochure"
              onClick={onOpenBrochure}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-200 cursor-pointer hover:scale-[1.01]"
            >
              <FileText className="h-4.5 w-4.5" />
              <span>Download PDF Brochure</span>
            </button>
          )}

          <button
            id="btn_submit_another_lead"
            onClick={() => {
              setSubmitSuccess(false);
              setVillaType(defaultVillaType);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-all cursor-pointer"
          >
            <span>Submit Another Inquiry</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="lead_form_panel" className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-100 shadow-2xl shadow-slate-100/50 relative overflow-hidden">
      {/* Decorative blue-violet gradient border bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 via-blue-600 to-violet-600"></div>

      <div className="mb-10">
        <h3 className="text-3xl font-light text-slate-900 tracking-tight leading-tight">
          Schedule a <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">VIP Site Visit</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-sans">
          Experience the 12.5-acre luxury community. Fill out the secure form, and GBR Homes will prepare your personalized villa brochure.
        </p>
      </div>

      <form id="form_property_enquiry" onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <User className="h-4 w-4" />
            </span>
            <input
              id="input_lead_name"
              type="text"
              required
              placeholder="e.g. Srikanth Rao"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-11 pr-4 py-3.5 block w-full bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm focus:bg-white transition-all duration-300 outline-none font-sans text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Smartphone className="h-4 w-4" />
              </span>
              <input
                id="input_lead_phone"
                type="tel"
                required
                placeholder="e.g. 9704707976"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-11 pr-4 py-3.5 block w-full bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm focus:bg-white transition-all duration-300 outline-none font-sans text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2.5">
              Email Address <span className="text-slate-400 font-medium">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                id="input_lead_email"
                type="email"
                placeholder="e.g. srikanth@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 pr-4 py-3.5 block w-full bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm focus:bg-white transition-all duration-300 outline-none font-sans text-slate-900"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2.5">
            Villa Facing Preference
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <Building className="h-4 w-4" />
            </span>
            <select
              id="select_lead_villa_type"
              value={villaType}
              onChange={(e) => setVillaType(e.target.value)}
              className="pl-11 pr-4 py-3.5 block w-full bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm focus:bg-white transition-all duration-300 outline-none text-slate-700 font-sans"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="East Facing Triplex Villa (3610 Sft)">East Facing Triplex Villa (3610 Sft)</option>
              <option value="West Facing Triplex Villa (3580 Sft)">West Facing Triplex Villa (3580 Sft)</option>
              <option value="North-East Corner Triplex Villa (4716 Sft)">North-East Corner Triplex Villa (4716 Sft)</option>
              <option value="North-West Corner Triplex Villa (4490 Sft)">North-West Corner Triplex Villa (4490 Sft)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2.5">
            Custom Message / Request Details <span className="text-slate-400 font-medium">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute top-3.5 left-4 text-slate-400">
              <MessageSquare className="h-4 w-4" />
            </span>
            <textarea
              id="input_lead_message"
              rows={3}
              placeholder="Would love to schedule a visit this Saturday at 11:00 AM..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pl-11 pr-4 py-3.5 block w-full bg-slate-50/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm focus:bg-white transition-all duration-300 outline-none resize-none font-sans text-slate-900"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="text-xs text-rose-600 font-semibold bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-center space-x-1.5 animate-fadeIn">
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          id="btn_submit_lead_form"
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center space-x-2 py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 disabled:from-blue-400 disabled:to-violet-400 text-white font-bold rounded-lg text-sm transition-all duration-300 shadow-lg shadow-blue-100 cursor-pointer hover:scale-[1.01]"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit VIP Registration</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
