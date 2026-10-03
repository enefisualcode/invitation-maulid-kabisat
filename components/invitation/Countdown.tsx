"use client";

import { useEffect, useState } from "react";
import { event } from "@/data/event";

function getRemaining() {
  const distance = new Date(event.dateISO).getTime() - Date.now();
  if (distance <= 0) return null;
  return { hari: Math.floor(distance / 86400000), jam: Math.floor((distance / 3600000) % 24), menit: Math.floor((distance / 60000) % 60), detik: Math.floor((distance / 1000) % 60) };
}
export function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining>>(null);
  useEffect(() => { setRemaining(getRemaining()); const timer = window.setInterval(() => setRemaining(getRemaining()), 1000); return () => window.clearInterval(timer); }, []);
  if (!remaining) return <p className="countdown-ended">Acara telah berlangsung</p>;
  return <div className="countdown" aria-label="Hitung mundur acara">{Object.entries(remaining).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}
