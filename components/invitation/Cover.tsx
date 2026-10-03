import Image from "next/image";

export function Cover({ guestName, onOpen, isOpening }: { guestName: string; onOpen: () => void; isOpening: boolean }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return <section className={`cover${isOpening ? " is-opening" : ""}`} aria-label="Sampul undangan">
    <div className="cover-pattern" aria-hidden="true" style={{ backgroundImage: `url('${basePath}/brand/pattern.png')` }} />
    <div className="cover-inner">
      <Image className="cover-logo" src={`${basePath}/brand/logo-kabisat.jpg`} alt="KABISAT Angkatan Tujuh" width={1280} height={853} priority />
      <p className="eyebrow">Peringatan penuh cinta</p>
      <h1>Maulid Nabi <span>Muhammad SAW</span></h1>
      <p className="cover-intro">Merawat cinta kepada Rasulullah, meneguhkan ikatan dalam kebaikan.</p>
      <div className="guest-block"><p>Kepada Yth.</p><strong>{guestName}</strong></div>
      <button className="button button-primary" type="button" onClick={onOpen}>Buka Undangan <span aria-hidden="true">↓</span></button>
    </div>
  </section>;
}
