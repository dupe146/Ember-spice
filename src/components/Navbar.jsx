import { useState, useEffect } from "react";

export default function Navbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Menu", href: "#menu" },
   // { label: "Our Story", href: "#story" },
    { label: "Reserve", href: "#reserve" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 1000,
        padding: scrolled ? "0.9rem 0" : "1.4rem 0",
        background: scrolled || menuOpen ? "rgba(30,37,71,0.98)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#hero" style={{ textDecoration: "none" }} onClick={closeMenu}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--cream)", lineHeight: 1 }}>
              Ember<span style={{ color: "var(--orange)", fontStyle: "italic" }}>&</span>Spice
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "3px", color: "var(--muted)", textTransform: "uppercase", marginTop: "2px" }}>
              Restaurant & Bar
            </div>
          </a>

          {/* Desktop links */}
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", alignItems: "center" }} className="nav-desktop">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} style={{
                  textDecoration: "none", color: "var(--muted-light)", fontSize: "0.82rem",
                  fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "var(--cream)"}
                  onMouseLeave={e => e.target.style.color = "var(--muted-light)"}
                >{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Cart button */}
            <button onClick={onCartOpen} style={{
              position: "relative", background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2rem",
              padding: "0.45rem 0.9rem", cursor: "pointer", color: "var(--cream)",
              fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              🛒
              {cartCount > 0 && (
                <span style={{
                  background: "var(--orange)", color: "#fff", borderRadius: "2rem",
                  padding: "0 0.4rem", fontSize: "0.7rem", fontWeight: 700, minWidth: "18px", textAlign: "center",
                }}>{cartCount}</span>
              )}
            </button>

            {/* Reserve CTA — hidden on mobile, shown via mobile menu */}
            <a href="#reserve" className="nav-reserve-btn" style={{
              background: "var(--orange)", color: "#fff", padding: "0.6rem 1.3rem",
              borderRadius: "2rem", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(232,84,26,0.35)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.background = "#C93D0A"; }}
              onMouseLeave={e => { e.target.style.background = "var(--orange)"; }}
            >Reserve</a>

            {/* Hamburger — mobile only */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "none", flexDirection: "column", gap: "5px",
                padding: "6px",
              }}
            >
              <span style={{ display: "block", width: "22px", height: "2px", background: "var(--cream)", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "var(--cream)", borderRadius: "2px", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "var(--cream)", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className="mobile-menu" style={{
          maxHeight: menuOpen ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}>
          <div style={{ padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0" }}>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={closeMenu} style={{
                padding: "0.9rem 0", color: "var(--cream)", textDecoration: "none",
                fontSize: "1.1rem", fontFamily: "'Cormorant Garamond', serif",
                borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 400,
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "var(--orange)"}
                onMouseLeave={e => e.target.style.color = "var(--cream)"}
              >{l.label}</a>
            ))}
            <a href="#reserve" onClick={closeMenu} style={{
              marginTop: "1rem", background: "var(--orange)", color: "#fff",
              padding: "0.85rem", borderRadius: "2rem", textAlign: "center",
              textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
              boxShadow: "0 4px 20px rgba(232,84,26,0.35)",
            }}>Reserve a Table</a>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-reserve-btn { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
