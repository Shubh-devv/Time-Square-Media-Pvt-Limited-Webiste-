"use client";

import { useState } from "react";

type Lead = {
  id: string;
  name: string;
  phone: string;
  source: string;
  page: string;
  city: string;
  region: string;
  country: string;
  createdAt: string;
};

export default function LeadsAdmin() {
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchLeads(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        headers: { "x-admin-password": password },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load leads");
        setLeads(null);
      } else {
        setLeads(data.leads);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-16 text-paper">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl">Festival offer leads</h1>
        <p className="mt-2 text-sm text-slate">
          Enter the admin password to view phone numbers submitted through the festival offer popup.
        </p>

        <form onSubmit={fetchLeads} className="mt-6 flex max-w-md gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="flex-1 rounded-[2px] border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper placeholder:text-slate-dim focus:border-blue focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !password}
            className="rounded-[2px] bg-blue px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-blue-light disabled:opacity-50"
          >
            {loading ? "Loading…" : "View"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        {leads && (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-ink-line">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-line bg-ink-soft font-mono text-[0.68rem] uppercase tracking-[0.1em] text-slate-dim">
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Page</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-slate-dim">
                      No submissions yet.
                    </td>
                  </tr>
                )}
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-ink-line last:border-0">
                    <td className="px-4 py-3 text-slate-dim">
                      {new Date(l.createdAt).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">{l.name || "—"}</td>
                    <td className="px-4 py-3 font-mono">{l.phone}</td>
                    <td className="px-4 py-3">{l.city}</td>
                    <td className="px-4 py-3">{l.region}</td>
                    <td className="px-4 py-3">{l.country}</td>
                    <td className="px-4 py-3 text-slate-dim">{l.page}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
