"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Lead {
  id: string;
  email: string;
  source?: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  converted: "bg-green-500/10 text-green-400 border-green-500/20",
  archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const statusOptions = ["new", "contacted", "converted", "archived"];

export default function AdminPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", { credentials: "include" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setLeads(data.items || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadLeads();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0D1521] text-white">
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
        <div className="mb-8">
          <h1
            className="text-3xl font-light text-white mb-1"
            style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
          >
            Leads
          </h1>
          <p className="text-[#8A95A5] text-sm">Email addresses collected from the site.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#8A95A5]">Loading...</div>
        ) : (
          <div className="bg-[#1B2A4A]/30 rounded-2xl border border-[#C9A96E]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#C9A96E]/10">
              <h2 className="text-white font-medium">Leads ({leads.length})</h2>
            </div>
            {leads.length === 0 ? (
              <div className="text-center py-12 text-[#8A95A5] text-sm">No leads yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#C9A96E]/10">
                      {["Email", "Source", "Date", "Status", "Action"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-[#8A95A5] text-xs uppercase tracking-wider font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9A96E]/5">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 text-white font-light">{lead.email}</td>
                        <td className="px-6 py-4 text-[#8A95A5]">{lead.source || "—"}</td>
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
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                            className="text-xs bg-[#1B2A4A] border border-[#C9A96E]/20 rounded-lg px-2 py-1 text-[#8A95A5] cursor-pointer"
                          >
                            {statusOptions.map((s) => (
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
      </div>
    </div>
  );
}
