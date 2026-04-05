"use client";

import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  fullName?: string;
  email?: string;
  serviceInterest?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Your name is required.";
  if (!data.email.trim()) {
    errors.email = "Your email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

const serviceOptions = [
  { value: "", label: "Select a service..." },
  { value: "discovery", label: "Free Discovery Call (15 min)" },
  { value: "clarity-intensive", label: "Clarity Intensive (90 min)" },
  { value: "foundations", label: "Foundations Package (3 months)" },
  { value: "deep-immersion", label: "Deep Immersion (6 months)" },
  { value: "unsure", label: "Not sure yet — let's talk" },
];

const timeOptions = [
  { value: "", label: "Select a time..." },
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 5pm)" },
  { value: "evening", label: "Evening (5pm – 8pm)" },
];

export default function ConsultationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    serviceInterest: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          fullName: "", email: "", phone: "", serviceInterest: "",
          preferredDate: "", preferredTime: "", message: "", website: "",
        });
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full bg-white border border-[#E8D5B0] rounded-xl px-4 py-3 text-[#3D4B63] text-sm placeholder-[#8A95A5] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-all duration-200";
  const labelClass = "block text-[#3D4B63] text-sm font-medium mb-1.5";
  const errorClass = "text-red-500 text-xs mt-1";

  if (status === "success") {
    return (
      <div className="bg-[#F5EDD8] rounded-2xl p-10 text-center space-y-4">
        <div className="text-[#C9A96E] text-4xl">✦</div>
        <h3
          className="text-[#1B2A4A] text-2xl font-light"
          style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
        >
          Your request is in.
        </h3>
        <p className="text-[#8A95A5] text-sm font-light leading-relaxed">
          I'll be in touch within 24–48 hours to confirm your session details. Looking forward to speaking with you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot */}
      <div style={{ display: "none" }} aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="consult-fullName" className={labelClass}>
            Full Name <span className="text-[#C9A96E]">*</span>
          </label>
          <input
            id="consult-fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your name"
            className={`${inputClass} ${errors.fullName ? "border-red-400" : ""}`}
          />
          {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="consult-email" className={labelClass}>
            Email <span className="text-[#C9A96E]">*</span>
          </label>
          <input
            id="consult-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="consult-phone" className={labelClass}>
            Phone (optional)
          </label>
          <input
            id="consult-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="consult-serviceInterest" className={labelClass}>
            Service Interest
          </label>
          <select
            id="consult-serviceInterest"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            className={inputClass}
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="consult-preferredDate" className={labelClass}>
            Preferred Date (optional)
          </label>
          <input
            id="consult-preferredDate"
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="consult-preferredTime" className={labelClass}>
            Preferred Time (optional)
          </label>
          <select
            id="consult-preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className={inputClass}
          >
            {timeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="consult-message" className={labelClass}>
          Anything you'd like me to know beforehand? (optional)
        </label>
        <textarea
          id="consult-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Share what's bringing you here — no pressure to have it figured out..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#1B2A4A] text-white text-sm font-medium tracking-wide py-3.5 rounded-full hover:bg-[#C9A96E] hover:text-[#1B2A4A] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Request Consultation"}
      </button>

      <p className="text-[#8A95A5] text-xs text-center">
        All information is held in strict confidence.
      </p>
    </form>
  );
}
