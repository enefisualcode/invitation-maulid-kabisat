"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type FormState = { name: string; attendance: string; whatsapp: string; message: string };
const attendanceChoices = [
  { label: "Hadir", value: "InsyaAllah Hadir" },
  { label: "Tidak Hadir", value: "Mohon Maaf Tidak Hadir" },
] as const;
export function RSVPForm({ defaultName }: { defaultName: string }) {
  const [form, setForm] = useState<FormState>({ name: defaultName, attendance: "", whatsapp: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    if (defaultName) setForm((current) => current.name ? current : { ...current, name: defaultName });
  }, [defaultName]);
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError("");
    if (!form.name.trim() || !form.attendance) { setStatus("error"); setError("Mohon lengkapi nama dan status kehadiran."); return; }
    setStatus("loading");
    const supabase = getSupabaseClient();
    if (!supabase) { setStatus("error"); setError("RSVP belum terhubung. Silakan hubungi panitia."); return; }
    const { error: submitError } = await supabase.from("rsvp").insert({ guest_name: form.name.trim(), attendance_status: form.attendance, guest_count: 1, whatsapp: form.whatsapp.trim() || null, message: form.message.trim() || null });
    if (submitError) { setStatus("error"); setError("Konfirmasi belum terkirim. Silakan coba kembali."); return; }
    setStatus("success");
  }
  if (status === "success") return <div className="rsvp-success" role="status"><span>✓</span><p>Jazakumullahu khairan.<br />Konfirmasi kehadiran Anda telah kami terima.</p></div>;
  return <form className="rsvp-form" onSubmit={submit} noValidate>
    <label>Nama<input value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" required /></label>
    <fieldset className="attendance-field"><legend>Status Kehadiran</legend><div className="attendance-options">{attendanceChoices.map((choice) => <button key={choice.value} type="button" className={form.attendance === choice.value ? "is-selected" : ""} onClick={() => update("attendance", choice.value)} aria-pressed={form.attendance === choice.value}>{choice.label}</button>)}</div></fieldset>
    <label>Nomor WhatsApp <small>(opsional)</small><input type="tel" inputMode="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} autoComplete="tel" /></label>
    <label>Pesan / Doa <small>(opsional)</small><textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} /></label>
    {status === "error" && <p className="form-error" role="alert">{error}</p>}
    <button className={`button button-primary submit-button ${status === "loading" ? "is-loading" : ""}`} type="submit" disabled={status === "loading"}>
      {status === "loading" ? <><span className="submit-spinner" aria-hidden="true" /> Mengirim…</> : <>Kirim Konfirmasi <span className="submit-arrow" aria-hidden="true">↗</span></>}
    </button>
  </form>;
}
