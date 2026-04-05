"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Tab = "leads" | "messages" | "bookings";

interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  status: string;
  createdAt: string;
}

interface Message {
  id: string;
  fullName: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  converted: "bg-green-500/10 text-green-400 border-green-500/20",
  archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  unread: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  read: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  replied: "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(tab);
  }, [tab]);

  async function loadData(activeTab: Tab) {
    setLoading(true);
    try {
      const endpoints: Record<Tab, string> = {
        leads: "/api/admin/leads",
        messages: "/api/admin/messages",
        bookings: "/api/admin/bookings",
      };
      const res = await fetch(endpoints[activeTab], { credentials: "include" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (activeTab === "leads") setLeads(data.items || []);
      if (activeTab === "messages") setMessages(data.items || []);
      if (activeTab === "bookings") setBookings(data.items || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(type: Tab, id: string, status: string) {
    const endpoints: Record<Tab, string> = {
      leads: "/api/admin/leads",
      messages: "/api/admin/messages",
      bookings: "/api/admin/bookings",
    };
    await fetch(endpoints[type], {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadData(type);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const statusOptions: Record<Tab, string[]> = {
    leads: ["new", "contacted", "converted", "archived"],
    messages: ["unread", "read", "replied"],
    bookings: ["pending", "confirmed", "cancelled"],
  };

  return (
    <div className="min-h-screen bg-[#0D1521] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-[#C9A96E]/10 bg-[#0D1521]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <circle cx="16" cy="16" r="14" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.6" />
              <circle cx="16" cy="16" r="9" stroke="#C9A96E" strokeWidth="1" fill="none" />
              <circle cx="16" cy="16" r="2" fill="#C9A96E" />
            </svg>
            <div>
              <span
                className="text-[#C9A96E] text-lg font-light"
                style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              >
                Golden Circle
              </span>
              <p className="text-[#8A95A5] text-[10px] tracking-widest uppercase">Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[#8A95A5] text-sm hover:text-white transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-white/20"
            >
              ← Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#8A95A5] text-sm hover:text-red-400 transition-colors px-4 py-2 rounded-lg border border-white/10 hover:border-red-500/30"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1
            className="text-3xl font-light text-white mb-1"
            style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
          >
            Dashboard
          </h1>
          <p className="text-[#8A95A5] text-sm">Manage inquiries, messages, and bookings.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#C9A96E]/10">
          {(["leads", "messages", "bookings"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px cursor-pointer ${
                tab === t
                  ? "text-[#C9A96E] border-[#C9A96E]"
                  : "text-[#8A95A5] border-transparent hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-[#8A95A5]">Loading...</div>
        ) : (
          <>
            {/* Leads */}
            {tab === "leads" && (
              <div className="bg-[#1B2A4A]/30 rounded-2xl border border-[#C9A96E]/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#C9A96E]/10 flex justify-between items-center">
                  <h2 className="text-white font-medium">Leads ({leads.length})</h2>
                </div>
                {leads.length === 0 ? (
                  <div className="text-center py-12 text-[#8A95A5] text-sm">No leads yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#C9A96E]/10">
                          {["Name", "Email", "Service", "Date", "Status", "Action"].map((h) => (
                            <th key={h} className="text-left px-6 py-3 text-[#8A95A5] text-xs uppercase tracking-wider font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C9A96E]/5">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-white/[0.02]">
                            <td className="px-6 py-4 text-white font-light">{lead.fullName}</td>
                            <td className="px-6 py-4 text-[#8A95A5]">{lead.email}</td>
                            <td className="px-6 py-4 text-[#8A95A5]">{lead.serviceInterest || "—"}</td>
                            <td className="px-6 py-4 text-[#8A95A5]">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[lead.status] || statusColors.new}`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={lead.status}
                                onChange={(e) => updateStatus("leads", lead.id, e.target.value)}
                                className="text-xs bg-[#1B2A4A] border border-[#C9A96E]/20 rounded-lg px-2 py-1 text-[#8A95A5] cursor-pointer"
                              >
                                {statusOptions.leads.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Messages */}
            {tab === "messages" && (
              <div className="bg-[#1B2A4A]/30 rounded-2xl border border-[#C9A96E]/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#C9A96E]/10">
                  <h2 className="text-white font-medium">Messages ({messages.length})</h2>
                </div>
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-[#8A95A5] text-sm">No messages yet.</div>
                ) : (
                  <div className="divide-y divide-[#C9A96E]/5">
                    {messages.map((msg) => (
                      <div key={msg.id} className="px-6 py-5 hover:bg-white/[0.02]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-white font-light">{msg.fullName}</span>
                              <span className="text-[#8A95A5] text-xs">{msg.email}</span>
                              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${statusColors[msg.status] || statusColors.unread}`}>
                                {msg.status}
                              </span>
                            </div>
                            {msg.subject && (
                              <p className="text-[#C9A96E] text-sm mb-1">{msg.subject}</p>
                            )}
                            <p className="text-[#8A95A5] text-sm font-light leading-relaxed line-clamp-2">
                              {msg.message}
                            </p>
                            <p className="text-[#8A95A5] text-xs mt-2">
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <select
                            value={msg.status}
                            onChange={(e) => updateStatus("messages", msg.id, e.target.value)}
                            className="flex-shrink-0 text-xs bg-[#1B2A4A] border border-[#C9A96E]/20 rounded-lg px-2 py-1 text-[#8A95A5] cursor-pointer"
                          >
                            {statusOptions.messages.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bookings */}
            {tab === "bookings" && (
              <div className="bg-[#1B2A4A]/30 rounded-2xl border border-[#C9A96E]/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#C9A96E]/10">
                  <h2 className="text-white font-medium">Bookings ({bookings.length})</h2>
                </div>
                {bookings.length === 0 ? (
                  <div className="text-center py-12 text-[#8A95A5] text-sm">No bookings yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#C9A96E]/10">
                          {["Name", "Email", "Service", "Preferred Date", "Status", "Action"].map((h) => (
                            <th key={h} className="text-left px-6 py-3 text-[#8A95A5] text-xs uppercase tracking-wider font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C9A96E]/5">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-white/[0.02]">
                            <td className="px-6 py-4 text-white font-light">{booking.fullName}</td>
                            <td className="px-6 py-4 text-[#8A95A5]">{booking.email}</td>
                            <td className="px-6 py-4 text-[#8A95A5]">{booking.serviceInterest || "—"}</td>
                            <td className="px-6 py-4 text-[#8A95A5]">
                              {booking.preferredDate || "—"} {booking.preferredTime ? `(${booking.preferredTime})` : ""}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[booking.status] || statusColors.pending}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={booking.status}
                                onChange={(e) => updateStatus("bookings", booking.id, e.target.value)}
                                className="text-xs bg-[#1B2A4A] border border-[#C9A96E]/20 rounded-lg px-2 py-1 text-[#8A95A5] cursor-pointer"
                              >
                                {statusOptions.bookings.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
