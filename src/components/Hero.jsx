import { useState, useEffect } from "react";

const headlines = [
  { top: "Where Every", em: "Bite", rest: "Tells a Story" },
  { top: "Not Just Food.", em: "An", rest: "Experience" },
  { top: "Rooted in", em: "Tradition,", rest: "Refined by Fire" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % headlines.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const h = headlines[idx];

  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
      overflow: "hidden",
      background: `linear-gradient(135deg, var(--indigo-deep) 0%, var(--indigo) 60%, #3D2060 100%)`,
    }}>
      {/* Background texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Ambient glow — stays still, no animation */}
      <div style={{
        position: "absolute", top: "30%", right: "25%", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(232,84,26,0.15) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="hero-grid">

          {/* LEFT: TEXT */}
          <div className="hero-text-col">
            {/* Live badge */}
            <div className="animate-fadeUp" style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              paddingBottom: "40px",
              border: "1px solid rgba(232,84,26,0.4)", borderRadius: "2rem",
              padding: "0.4rem 1rem", marginBottom: "2rem",
            }}>
              <span style={{
                width: "6px", height: "6px", background: "var(--orange)",
                borderRadius: "50%", display: "inline-block",
                animation: "pulse-ring 1.5s ease-out infinite",
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                letterSpacing: "2px", color: "var(--orange)", textTransform: "uppercase",
              }}>
                Now Open · Victoria Island, Lagos
              </span>
            </div>

            {/* Animated headline — ONLY text fades, nothing else */}
            <h1 style={{
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
  fontWeight: 300, lineHeight: 1.05, marginBottom: "2rem",
  transition: "opacity 0.4s ease",
  opacity: visible ? 1 : 0,
  color: "var(--cream)",
  minHeight: "clamp(180px, 28vw, 320px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}}>
              {h.top}<br />
              <em style={{ color: "var(--orange)", fontStyle: "italic", fontWeight: 600 }}>{h.em} </em>
              {h.rest}
            </h1>

            <p className="animate-fadeUp delay-3" style={{
              color: "var(--muted-light)", fontSize: "1rem", lineHeight: 1.8,
              maxWidth: "400px", marginBottom: "2.5rem",
            }}>
              Authentic West African flavours reimagined for the modern palate — crafted with fire, tradition, and intention. Every dish is a chapter.
            </p>

            {/* CTA buttons */}
            <div className="animate-fadeUp delay-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <a href="#menu" style={{
                background: "var(--orange)", color: "#fff", padding: "0.9rem 2rem",
                borderRadius: "2rem", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                boxShadow: "0 8px 30px rgba(232,84,26,0.4)", transition: "transform 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Explore Our Menu →
              </a>
              <a href="#reserve" style={{
                background: "rgba(255,255,255,0.06)", color: "var(--cream)",
                padding: "0.9rem 2rem", borderRadius: "2rem", fontSize: "0.9rem",
                fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)",
                transition: "background 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              >
                Book a Table
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fadeUp delay-5" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[["4.9★", "840+ Reviews"], ["12yr", "Of Tradition"], ["50+", "Signature Dishes"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 600, color: "var(--orange-light)", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "2px", letterSpacing: "0.5px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: IMAGE — static, no float animation on the card itself */}
          <div className="hero-img-col">
            {/* Main image card — NO animation here */}
            <div style={{
              position: "absolute", top: "20px", left: "20px", right: "20px", bottom: "20px",
              background: `linear-gradient(160deg, #8B3A0F, #C8561A)`,
              borderRadius: "2rem", overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              /* ✅ NO animation: "float" here — removed */
            }}>
              <img
                src="/images/ember chef special.png"
                alt="Signature dish"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                onError={e => { e.target.style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,37,71,0.85) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#fff", fontWeight: 600 }}>Chef's Special Tonight</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>Smoky Jollof & Suya Chicken — ₦4,500</div>
              </div>
            </div>

            {/* Rating card — moved BELOW image, not overlapping */}
<div style={{
  position: "absolute",
  bottom: "-20px",       /* sits just below the image card */
  left: "20px",          /* aligns to left side */
  background: "rgba(30,37,71,0.95)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "1rem",
  padding: "0.8rem 1.2rem",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
}}>
  <div>
    <div style={{ display:"flex", gap:"2px", marginBottom:"2px" }}>
      {"★★★★★".split("").map((s,i) =>
        <span key={i} style={{ color:"var(--orange-light)", fontSize:"0.8rem" }}>{s}</span>
      )}
    </div>
    <div style={{ fontSize:"0.85rem", fontWeight:600, color:"var(--cream)" }}>4.9 / 5.0</div>
  </div>
  <div style={{ borderLeft:"1px solid rgba(255,255,255,0.15)", paddingLeft:"0.8rem" }}>
    <div style={{ fontSize:"0.72rem", color:"var(--muted)" }}>Happy guests</div>
    <div style={{ fontSize:"0.88rem", fontWeight:600, color:"var(--cream)" }}>840+</div>
  </div>
</div>

            {/* Open badge */}
            <div style={{
              position: "absolute", top: "0px", right: "10px",
              background: "var(--orange)", color: "#fff",
              padding: "0.5rem 1rem", borderRadius: "1rem",
              fontSize: "0.78rem", fontWeight: 600,
              boxShadow: "0 4px 20px rgba(232,84,26,0.4)", zIndex: 3,
            }}>🔴 Open Now</div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "var(--orange)", padding: "0.7rem 0", overflow: "hidden",
      }}>
        <div style={{ display: "flex", animation: "marquee 20s linear infinite", width: "max-content" }}>
          {Array(8).fill("✦ Dine In  ✦ Delivery  ✦ Catering  ✦ Private Events  ✦ Takeaway ").map((t, i) => (
            <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "2px", color: "#fff", whiteSpace: "nowrap", padding: "0 2rem" }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-img-col {
          position: relative;
          height: 520px;
        }
        .hero-text-col {
          /* nothing special on desktop */
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }
          .hero-text-col {
            order: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-img-col {
            order: 2;
            height: 320px;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
