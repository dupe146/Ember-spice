import { useState } from "react";
import { menuItems, menuCategories } from "../data/menu";

// ─── TAG BADGE ─────────────────────────────────────────────────────────────
function TagBadge({ tag }) {
  if (!tag) return null;
  const colors = {
    "bestseller":    ["#E8541A", "rgba(232,84,26,0.15)"],
    "chef's pick":   ["#F2A65A", "rgba(242,166,90,0.15)"],
    "spicy":         ["#FF4444", "rgba(255,68,68,0.12)"],
    "new":           ["#4ADE80", "rgba(74,222,128,0.12)"],
    "premium":       ["#C084FC", "rgba(192,132,252,0.12)"],
    "house special": ["#60A5FA", "rgba(96,165,250,0.12)"],
  };
  const [text, bg] = colors[tag] || ["var(--muted-light)", "rgba(255,255,255,0.08)"];
  return (
    <span style={{
      background: bg, color: text, border: `1px solid ${text}33`,
      padding: "0.2rem 0.6rem", borderRadius: "2rem",
      fontSize: "0.65rem", fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.5px",
    }}>{tag}</span>
  );
}

// ─── SOUP CARD ─────────────────────────────────────────────────────────────
// Used for: soups with swallow options + pepper soup with protein variants
function SoupCard({ item, onAddToCart }) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [swallow, setSwallow]       = useState(null);
  const [swallowQty, setSwallowQty] = useState(1);
  const [proteins, setProteins]     = useState({});
  const [qty, setQty]               = useState(1);
  const [added, setAdded]           = useState(false);

  const current   = item.hasVariants ? item.variants?.[variantIdx] : null;
  const basePrice = item.hasVariants ? (current?.price ?? 0) : (item.price ?? 0);

  const swallowIncludedPrice = swallow?.price ?? 0;
  const swallowExtraQty      = Math.max(0, swallowQty - 1);
  const swallowExtraCost     = swallowExtraQty * (swallow?.price === 0 ? 300 : swallow?.price ?? 0);

  const proteinCost = Object.entries(proteins).reduce((sum, [name, q]) => {
    const p = item.extraProteins?.find(p => p.name === name);
    return sum + (p ? p.price * q : 0);
  }, 0);

  const totalPrice = (basePrice + swallowIncludedPrice + swallowExtraCost + proteinCost) * qty;

  const updateProtein = (name, delta) => {
    setProteins(prev => {
      const cur  = prev[name] || 0;
      const next = Math.max(0, cur + delta);
      if (next === 0) { const u = { ...prev }; delete u[name]; return u; }
      return { ...prev, [name]: next };
    });
  };

  const handleAdd = () => {
    let name = item.name;
    if (item.hasVariants && current) name += ` (${current.label})`;
    if (swallow) name += ` + ${swallow.name}${swallowQty > 1 ? ` ×${swallowQty}` : ""}`;
    Object.entries(proteins).forEach(([pName, pQty]) => {
      name += ` + ${pName}${pQty > 1 ? ` ×${pQty}` : ""}`;
    });
    onAddToCart({ ...item, price: totalPrice / qty, name, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const image = item.hasVariants ? current?.image : item.image;

  return (
    <div style={{
      background: "var(--card-bg)", border: "1px solid var(--card-border)",
      borderRadius: "1.2rem", overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
        e.currentTarget.style.borderColor = "rgba(232,84,26,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--card-border)";
      }}
    >
      {/* Image */}
      <div style={{ height: "180px", overflow: "hidden", position: "relative", background: "rgba(255,255,255,0.03)" }}>
        <img
          src={image} alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.35s ease" }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <TagBadge tag={item.tag} />
        </div>
        <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(30,37,71,0.9)", backdropFilter: "blur(8px)", padding: "0.3rem 0.7rem", borderRadius: "2rem", fontSize: "0.7rem", color: "var(--muted-light)" }}>
          🕐 {item.time}
        </div>
      </div>

      <div style={{ padding: "1.2rem" }}>
        <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 600, color: "var(--cream)", lineHeight: 1.2, marginBottom: "0.3rem" }}>{item.name}</h4>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>{item.desc}</p>

        {/* Protein variant — pepper soup only */}
        {item.hasVariants && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--muted-light)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", fontWeight: 600 }}>Choose protein</div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {item.variants.map((v, i) => (
                <button key={v.label} onClick={() => setVariantIdx(i)} style={{
                  padding: "0.3rem 0.85rem", borderRadius: "2rem", fontSize: "0.78rem",
                  border: `1.5px solid ${variantIdx === i ? "var(--orange)" : "rgba(232,84,26,0.25)"}`,
                  background: variantIdx === i ? "var(--orange)" : "transparent",
                  color: variantIdx === i ? "#fff" : "var(--muted-light)",
                  cursor: "pointer", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
                }}>{v.label}</button>
              ))}
            </div>
          </div>
        )}

        {/* Swallow selector — traditional soups only */}
        {item.hasSwallow && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--muted-light)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", fontWeight: 600 }}>
              Choose swallow <span style={{ fontWeight: 400, textTransform: "none" }}>(included)</span>
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: swallow ? "0.7rem" : 0 }}>
              {item.swallows.map(s => (
                <button key={s.name}
                  onClick={() => {
                    if (swallow?.name === s.name) { setSwallow(null); setSwallowQty(1); }
                    else { setSwallow(s); setSwallowQty(1); }
                  }}
                  style={{
                    padding: "0.28rem 0.8rem", borderRadius: "2rem", fontSize: "0.74rem",
                    border: `1.5px solid ${swallow?.name === s.name ? "var(--orange)" : "rgba(232,84,26,0.2)"}`,
                    background: swallow?.name === s.name ? "rgba(232,84,26,0.12)" : "transparent",
                    color: swallow?.name === s.name ? "var(--orange)" : "var(--muted-light)",
                    cursor: "pointer", fontWeight: 500, fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
                  }}
                >
                  {s.name}
                  {s.price > 0 && <span style={{ marginLeft: "0.3rem", fontSize: "0.62rem", opacity: 0.7 }}>+₦{s.price}</span>}
                </button>
              ))}
            </div>

            {/* Extra swallow qty — shows after swallow is picked */}
            {swallow && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0.9rem", background: "rgba(232,84,26,0.06)", borderRadius: "0.7rem", border: "1px solid rgba(232,84,26,0.15)" }}>
                <div>
                  <div style={{ fontSize: "0.78rem", color: "var(--cream)", fontWeight: 600 }}>{swallow.name}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "1px" }}>
                    1 wrap included · extras +₦{swallow.price === 0 ? "300" : swallow.price} each
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.06)", borderRadius: "2rem", padding: "0.25rem 0.6rem", border: "1px solid var(--card-border)" }}>
                  <button onClick={() => setSwallowQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", color: "var(--muted-light)", cursor: "pointer", fontSize: "1rem", width: "18px" }}>−</button>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)", minWidth: "14px", textAlign: "center" }}>{swallowQty}</span>
                  <button onClick={() => setSwallowQty(q => q + 1)} style={{ background: "none", border: "none", color: "var(--orange)", cursor: "pointer", fontSize: "1rem", width: "18px" }}>+</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Extra proteins */}
        {item.extraProteins && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--muted-light)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", fontWeight: 600 }}>
              Add extra protein <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span>
            </div>
            {item.extraProteins.map(p => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem", padding: "0.5rem 0.8rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.6rem", border: "1px solid var(--card-border)" }}>
                <div>
                  <span style={{ fontSize: "0.82rem", color: "var(--cream)", fontWeight: 500 }}>{p.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--orange-light)", marginLeft: "0.5rem" }}>+₦{p.price.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.06)", borderRadius: "2rem", padding: "0.2rem 0.5rem", border: "1px solid var(--card-border)" }}>
                  <button onClick={() => updateProtein(p.name, -1)} style={{ background: "none", border: "none", color: "var(--muted-light)", cursor: "pointer", fontSize: "0.95rem", width: "16px" }}>−</button>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--cream)", minWidth: "12px", textAlign: "center" }}>{proteins[p.name] || 0}</span>
                  <button onClick={() => updateProtein(p.name, 1)} style={{ background: "none", border: "none", color: "var(--orange)", cursor: "pointer", fontSize: "0.95rem", width: "16px" }}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Price breakdown + qty + add button */}
        <div style={{ marginTop: "0.8rem" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.7rem", padding: "0.7rem 0.9rem", marginBottom: "0.8rem", border: "1px solid var(--card-border)" }}>
            {/* Base item */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>
              <span>{item.name}</span>
              <span>₦{basePrice.toLocaleString()}</span>
            </div>
            {/* Swallow line */}
            {swallow && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>
                <span>{swallow.name} {swallowQty > 1 ? `×${swallowQty}` : "(included)"}</span>
                <span>{swallowIncludedPrice + swallowExtraCost > 0 ? `₦${(swallowIncludedPrice + swallowExtraCost).toLocaleString()}` : "Included"}</span>
              </div>
            )}
            {/* Protein lines */}
            {Object.entries(proteins).map(([name, pQty]) => {
              const p = item.extraProteins?.find(p => p.name === name);
              return (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>
                  <span>{name} ×{pQty}</span>
                  <span>₦{(p.price * pQty).toLocaleString()}</span>
                </div>
              );
            })}
            {/* Total */}
            <div style={{ borderTop: "1px solid var(--card-border)", marginTop: "0.5rem", paddingTop: "0.5rem", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--cream)" }}>Total {qty > 1 ? `×${qty}` : ""}</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--orange-light)" }}>₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Qty + Add */}
          <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.06)", borderRadius: "2rem", padding: "0.4rem 0.7rem", border: "1px solid var(--card-border)", flexShrink: 0 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", color: "var(--muted-light)", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, width: "18px" }}>−</button>
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--cream)", minWidth: "14px", textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", color: "var(--orange)", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, width: "18px" }}>+</button>
            </div>
            <button onClick={handleAdd} style={{
              flex: 1, padding: "0.65rem",
              background: added ? "#4ADE80" : "var(--orange)",
              color: "#fff", border: "none", borderRadius: "2rem",
              fontSize: "0.85rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s",
              boxShadow: added ? "0 4px 16px rgba(74,222,128,0.3)" : "0 4px 16px rgba(232,84,26,0.25)",
            }}>
              {added ? "✓ Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REGULAR CARD ──────────────────────────────────────────────────────────
// Used for: mains, grills, sides, drinks
function RegularCard({ item, onAddToCart }) {
  const [qty, setQty]           = useState(1);
  const [proteins, setProteins] = useState({});
  const [added, setAdded]       = useState(false);

  const proteinCost = Object.entries(proteins).reduce((sum, [name, q]) => {
    const p = item.extraProteins?.find(p => p.name === name);
    return sum + (p ? p.price * q : 0);
  }, 0);

  const totalPrice = (item.price + proteinCost) * qty;

  const updateProtein = (name, delta) => {
    setProteins(prev => {
      const cur  = prev[name] || 0;
      const next = Math.max(0, cur + delta);
      if (next === 0) { const u = { ...prev }; delete u[name]; return u; }
      return { ...prev, [name]: next };
    });
  };

  const handleAdd = () => {
    let name = item.name;
    Object.entries(proteins).forEach(([pName, pQty]) => {
      name += ` + ${pName}${pQty > 1 ? ` ×${pQty}` : ""}`;
    });
    onAddToCart({ ...item, price: totalPrice / qty, name, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div style={{
      background: "var(--card-bg)", border: "1px solid var(--card-border)",
      borderRadius: "1.2rem", overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
        e.currentTarget.style.borderColor = "rgba(232,84,26,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--card-border)";
      }}
    >
      {/* Image */}
      <div style={{ height: "180px", overflow: "hidden", position: "relative", background: "rgba(255,255,255,0.03)" }}>
        <img
          src={item.image} alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
          onError={e => {
            e.target.style.display = "none";
            const fb = document.createElement("div");
            fb.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;font-size:3.5rem";
            fb.textContent = item.emoji;
            e.target.parentElement.appendChild(fb);
          }}
        />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <TagBadge tag={item.tag} />
        </div>
        <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(30,37,71,0.9)", backdropFilter: "blur(8px)", padding: "0.3rem 0.7rem", borderRadius: "2rem", fontSize: "0.7rem", color: "var(--muted-light)" }}>
          🕐 {item.time}
        </div>
      </div>

      <div style={{ padding: "1.2rem" }}>
        <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 600, color: "var(--cream)", lineHeight: 1.2, marginBottom: "0.3rem" }}>{item.name}</h4>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>{item.desc}</p>

        {/* Extra proteins — only shows if item has extraProteins in menu.js */}
        {item.extraProteins && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--muted-light)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem", fontWeight: 600 }}>
              Add extra protein <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span>
            </div>
            {item.extraProteins.map(p => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem", padding: "0.5rem 0.8rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.6rem", border: "1px solid var(--card-border)" }}>
                <div>
                  <span style={{ fontSize: "0.82rem", color: "var(--cream)", fontWeight: 500 }}>{p.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--orange-light)", marginLeft: "0.5rem" }}>+₦{p.price.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.06)", borderRadius: "2rem", padding: "0.2rem 0.5rem", border: "1px solid var(--card-border)" }}>
                  <button onClick={() => updateProtein(p.name, -1)} style={{ background: "none", border: "none", color: "var(--muted-light)", cursor: "pointer", fontSize: "0.95rem", width: "16px" }}>−</button>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--cream)", minWidth: "12px", textAlign: "center" }}>{proteins[p.name] || 0}</span>
                  <button onClick={() => updateProtein(p.name, 1)} style={{ background: "none", border: "none", color: "var(--orange)", cursor: "pointer", fontSize: "0.95rem", width: "16px" }}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Price breakdown */}
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.7rem", padding: "0.7rem 0.9rem", marginBottom: "0.8rem", border: "1px solid var(--card-border)" }}>
          {/* Base price */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginBottom: proteinCost > 0 ? "0.2rem" : 0 }}>
            <span>{item.name}</span>
            <span>₦{item.price.toLocaleString()}</span>
          </div>
          {/* Each selected protein */}
          {Object.entries(proteins).map(([name, pQty]) => {
            const p = item.extraProteins?.find(p => p.name === name);
            return (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>
                <span>{name} ×{pQty}</span>
                <span>₦{(p.price * pQty).toLocaleString()}</span>
              </div>
            );
          })}
          {/* Total */}
          <div style={{ borderTop: "1px solid var(--card-border)", marginTop: "0.5rem", paddingTop: "0.5rem", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--cream)" }}>Total {qty > 1 ? `×${qty}` : ""}</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--orange-light)" }}>₦{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Qty + Add button */}
        <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.06)", borderRadius: "2rem", padding: "0.4rem 0.7rem", border: "1px solid var(--card-border)", flexShrink: 0 }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", color: "var(--muted-light)", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, width: "18px" }}>−</button>
            <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--cream)", minWidth: "14px", textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", color: "var(--orange)", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, width: "18px" }}>+</button>
          </div>
          <button onClick={handleAdd} style={{
            flex: 1, padding: "0.65rem",
            background: added ? "#4ADE80" : "var(--orange)",
            color: "#fff", border: "none", borderRadius: "2rem",
            fontSize: "0.85rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s",
            boxShadow: added ? "0 4px 16px rgba(74,222,128,0.3)" : "0 4px 16px rgba(232,84,26,0.25)",
          }}>
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN MENU SECTION ─────────────────────────────────────────────────────
export default function Menu({ onAddToCart }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? menuItems
    : menuItems.filter(i => i.category === active);

  return (
    <section id="menu" className="section" style={{ background: "var(--indigo-deep)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "var(--orange)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              — Our Menu
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.1 }}>
              Made Fresh,<br /><em style={{ color: "var(--orange)", fontStyle: "italic" }}>Every Day</em>
            </h2>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", background: "rgba(255,255,255,0.04)", padding: "0.4rem", borderRadius: "2rem", border: "1px solid var(--card-border)" }}>
            {menuCategories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: "0.45rem 1.1rem", borderRadius: "2rem", border: "none", cursor: "pointer",
                fontSize: "0.82rem", fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                background: active === cat ? "var(--orange)" : "transparent",
                color: active === cat ? "#fff" : "var(--muted-light)",
                transition: "all 0.25s",
                boxShadow: active === cat ? "0 4px 16px rgba(232,84,26,0.3)" : "none",
              }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Cards grid — routes each item to the right card type */}
        <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {filtered.map(item =>
            item.hasVariants || item.hasSwallow
              ? <SoupCard    key={item.id} item={item} onAddToCart={onAddToCart} />
              : <RegularCard key={item.id} item={item} onAddToCart={onAddToCart} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
