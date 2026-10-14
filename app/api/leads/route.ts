import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

type Lead = {
  id: string;
  name: string;
  phone: string;
  source: string;
  page: string;
  city: string;
  region: string;
  country: string;
  ip: string;
  createdAt: string;
};

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

async function geolocate(ip: string): Promise<{ city: string; region: string; country: string }> {
  if (!ip || ip === "unknown" || ip.startsWith("127.") || ip.startsWith("::1") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return { city: "Unknown", region: "Unknown", country: "Unknown" };
  }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,regionName,country`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const data = await res.json();
    if (data.status === "success") {
      return { city: data.city || "Unknown", region: data.regionName || "Unknown", country: data.country || "Unknown" };
    }
  } catch {
    // ignore — geolocation is best-effort only
  }
  return { city: "Unknown", region: "Unknown", country: "Unknown" };
}

const PHONE_RE = /^[0-9+\-\s()]{7,16}$/;

export async function POST(req: NextRequest) {
  let body: { name?: string; phone?: string; source?: string; page?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const phone = (body.phone || "").trim();
  const name = (body.name || "").trim().slice(0, 100);

  if (!phone || !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "A valid phone number is required" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const { city, region, country } = await geolocate(ip);

  const lead: Lead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    phone,
    source: (body.source || "unknown").slice(0, 50),
    page: (body.page || "/").slice(0, 200),
    city,
    region,
    country,
    ip,
    createdAt: new Date().toISOString(),
  };

  const leads = await readLeads();
  leads.push(lead);
  await writeLeads(leads);

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const adminPassword = process.env.LEADS_ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "LEADS_ADMIN_PASSWORD is not configured on the server" },
      { status: 503 }
    );
  }

  const supplied = req.headers.get("x-admin-password");
  if (supplied !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await readLeads();
  leads.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ leads });
}
