"use client";

import { useEffect, useRef, useState } from "react";
import { Cover } from "./Cover";
import { Countdown } from "./Countdown";
import { RSVPForm } from "./RSVPForm";
import { Reveal } from "./Reveal";
import { event } from "@/data/event";

function guestFromUrl() {
  if (typeof window === "undefined") return "Bapak/Ibu/Saudara/i";
  const name = new URLSearchParams(window.location.search).get("to")?.trim();
  return name || "Bapak/Ibu/Saudara/i";
}
export function Invitation() {
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => setGuestName(guestFromUrl()), []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    void audio.play().then(() => setIsMusicPlaying(true)).catch(() => undefined);
  }, []);
  const openInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) void audio.play().then(() => setIsMusicPlaying(true)).catch(() => undefined);
    }
    window.setTimeout(() => {
      setHasOpened(true);
      window.requestAnimationFrame(() => document.getElementById("undangan")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }, 650);
  };
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(() => setIsMusicPlaying(true)).catch(() => undefined);
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };
  return <main>
    <audio ref={audioRef} autoPlay playsInline preload="auto" aria-hidden="true" onPlay={() => setIsMusicPlaying(true)} onPause={() => setIsMusicPlaying(false)}><source src="./audio/backsound.webm" type="audio/webm" /></audio>
    <button className="music-toggle" type="button" onClick={toggleMusic} aria-label={isMusicPlaying ? "Matikan musik" : "Nyalakan musik"}>
      {isMusicPlaying ? <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10H4Z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /></svg> : <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10H4Z" /><path d="m16 10 5 5m0-5-5 5" /></svg>}
    </button>
    {!hasOpened && <Cover guestName={guestName} onOpen={openInvitation} isOpening={isOpening} />}
    <div id="undangan" className="invitation">
      <section className="section greeting"><Reveal><p className="arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p><p className="eyebrow">Assalamu&apos;alaikum Warahmatullahi Wabarakatuh</p><p className="lead">Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri Peringatan Maulid Nabi Muhammad SAW.</p></Reveal></section>
      <section className="section intro-section"><Reveal><p className="eyebrow">KABISAT 07 Menghadirkan</p><h2>Maulid Nabi <span>MUHAMMAD SAW</span></h2><blockquote>“{event.theme}”</blockquote></Reveal></section>
      <section className="section speaker-section"><Reveal><p className="eyebrow">Bersama</p><img className="speaker-photo" src="./event/ust-naufal.jpg" alt={`Foto ${event.speaker}`} /><h2 className="speaker-name">{event.speaker}</h2><p className="speaker-title">{event.speakerTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</p></Reveal></section>
      <section className="section details-section"><Reveal><div className="section-grid"><div><p className="eyebrow">Waktu & tempat</p><h2>Hadir dalam <em>majelis</em> yang menghangatkan hati.</h2></div><div className="event-data"><div className="date-display"><span>Sabtu</span><strong>17</strong><p>Oktober<br />2026</p></div><div className="detail-line"><span>Waktu</span><strong>{event.time}</strong></div><div className="detail-line"><span>Lokasi</span><a className="location-link" href={event.mapsUrl} target="_blank" rel="noreferrer">{event.locationName}</a></div><p className="address">{event.address}</p></div></div></Reveal></section>
      <section className="section countdown-section"><Reveal><p className="eyebrow">Menuju hari yang dinanti</p><Countdown /></Reveal></section>
      <section className="section location-section"><Reveal><div className="location-layout"><div className="location-copy"><p className="eyebrow">Lokasi acara</p><h2>{event.locationName}</h2><p className="address">{event.address}</p><a className="button button-outline" href={event.mapsUrl} target="_blank" rel="noreferrer">Buka Google Maps <span aria-hidden="true">↗</span></a></div><img className="venue-photo" src="./event/venue.jpg" alt={`Lokasi acara di ${event.locationName}`} /></div></Reveal></section>
      <section className="section rsvp-section"><Reveal><div className="rsvp-heading"><p className="eyebrow">RSVP</p><h2>Konfirmasi<br /><em>Kehadiran</em></h2><p>Kesediaan Anda untuk hadir adalah kebahagiaan bagi kami.</p></div><RSVPForm defaultName={guestName === "Bapak/Ibu/Saudara/i" ? "" : guestName} /></Reveal></section>
      <section className="section closing-section"><Reveal><p className="arabic">وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p><p>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p><div className="closing-rule" /><strong>Keluarga Besar KABISAT</strong></Reveal></section>
    </div>
    <footer>© 2026 KABISAT Angkatan Tujuh</footer>
  </main>;
}
