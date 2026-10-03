export function Cover({ guestName, onOpen, isOpening }: { guestName: string; onOpen: () => void; isOpening: boolean }) {
  return <section className={`cover${isOpening ? " is-opening" : ""}`} aria-label="Sampul undangan">
    <div className="cover-pattern" aria-hidden="true" style={{ backgroundImage: "url('./brand/pattern.png')" }} />
    <div className="cover-inner">
      <img className="cover-logo" src="./brand/logo-kabisat.jpg" alt="KABISAT Angkatan Tujuh" width={1280} height={853} />
      <p className="eyebrow">Peringatan penuh cinta</p>
      <h1>Maulid Nabi <span>Muhammad SAW</span></h1>
      <p className="cover-intro">Merawat cinta kepada Rasulullah, meneguhkan ikatan dalam kebaikan.</p>
      <div className="guest-block"><p>Kepada Yth.</p><strong>{guestName}</strong></div>
      <button className="button button-primary" type="button" onClick={onOpen}>Buka Undangan <span aria-hidden="true">↓</span></button>
    </div>
  </section>;
}
