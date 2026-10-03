"use client";

import { useEffect, useRef, useState } from "react";
import { donation } from "@/data/donation";

async function copyText(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Some mobile browsers expose Clipboard API but reject the write request.
      // Fall through to the supported selection-based method in that case.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  textArea.style.pointerEvents = "none";
  document.body.appendChild(textArea);
  textArea.select();
  textArea.setSelectionRange(0, value.length);
  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) throw new Error("Clipboard is unavailable");
}

export function Donation() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
  }, []);

  const copyAccountNumber = async () => {
    try {
      await copyText(donation.accountNumber);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus("idle"), 2500);
  };

  return (
    <div className="donation-layout">
      <div className="donation-heading">
        <p className="eyebrow">Dukungan untuk kegiatan</p>
        <h2>Infak<br /><em>Maulid</em></h2>
        <p>
          Bagi Bapak/Ibu/Saudara/i yang ingin ikut mendukung terselenggaranya
          kegiatan ini, infak dapat disalurkan melalui QRIS atau transfer bank.
        </p>
      </div>

      <div className="donation-methods">
        <article className="donation-card qris-card">
          <div className="donation-card-heading">
            <span className="method-number">01</span>
            <div>
              <p className="method-label">Pembayaran digital</p>
              <h3>Scan QRIS</h3>
            </div>
          </div>
          <div className="qris-frame">
            <img src={donation.qrisImage} alt="Kode QRIS untuk infak kegiatan Maulid" width="640" height="664" />
          </div>
          <strong className="qris-name">{donation.qrisName}</strong>
          <p className="method-note">Pindai menggunakan aplikasi pembayaran favorit Anda.</p>
          <a className="button button-primary donation-action" href={donation.qrisImage} download="QRIS-Infak-Maulid-KABISAT.jpg">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>
            Unduh QRIS
          </a>
        </article>

        <article className="donation-card bank-card">
          <div className="donation-card-heading">
            <span className="method-number">02</span>
            <div>
              <p className="method-label">Transfer manual</p>
              <h3>Rekening Bank</h3>
            </div>
          </div>
          <div className="bank-details">
            <p>Bank tujuan</p>
            <strong>{donation.bankName}</strong>
            <p>Nomor rekening</p>
            <div className="account-number-row">
              <strong className="account-number">{donation.accountNumber}</strong>
              <button className={copyStatus === "copied" ? "copy-button is-copied" : "copy-button"} type="button" onClick={copyAccountNumber} aria-label="Salin nomor rekening">
                {copyStatus === "copied" ? (
                  <><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg>Tersalin</>
                ) : (
                  <><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>Salin</>
                )}
              </button>
            </div>
            <p>Atas nama</p>
            <strong>{donation.accountHolder}</strong>
          </div>
          <p className="copy-status" role="status" aria-live="polite">
            {copyStatus === "copied" && "Nomor rekening berhasil disalin."}
            {copyStatus === "error" && "Nomor belum tersalin. Silakan coba lagi."}
          </p>
        </article>
      </div>
    </div>
  );
}
