import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import CartDrawer from "./components/CartDrawer";
import Reserve from "./components/Reserve";

// Testimonials
function Testimonials() {
  const reviews = [
    { name: "Amara F.", loc: "Regular guest · Lagos", text: "The Egusi soup here is the closest thing I've had to my grandmother's. This place is a gem,the smoky undertones are unreal.", init: "AF" },
    { name: "Tunde K.", loc: "Corporate client · Abuja", text: "We booked for our company dinner and they exceeded every expectation. Food, ambience, service. Absolutely world-class. Already planning our next visit.", init: "TK" },
    { name: "Sade B.", loc: "Food blogger · Lagos", text: "Best Jollof rice in Lagos, full stop. I said what I said. The smoky flavour is unmatched and the presentation is restaurant-magazine worthy.", init: "SB" },
  ];
  return (
    <section className="section" style={{ background: "var(--indigo)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "var(--orange)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.6rem" }}>— Reviews</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--cream)" }}>
            Guests Can't Stop<br /><em style={{ color: "var(--orange)", fontStyle: "italic" }}>Talking</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.2rem" }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1.2rem", padding: "1.8rem", transition: "border-color 0.3s",
              animation: `fadeUp 0.6s ${i * 0.15}s ease both`,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(232,84,26,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <div style={{ color: "var(--orange)", fontSize: "1rem", marginBottom: "1rem", letterSpacing: "2px" }}>★★★★★</div>
              <p style={{ color: "rgba(245,240,232,0.75)", fontSize: "0.9rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.4rem" }}>"{r.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>{r.init}</div>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--cream)" }}>{r.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{ background: "var(--indigo-deep)", borderTop: "1px solid var(--card-border)", padding: "3rem 0 2rem" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 600, color: "var(--cream)", marginBottom: "0.3rem" }}>
          Ember<span style={{ color: "var(--orange)", fontStyle: "italic" }}>&</span>Spice
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "3px", color: "var(--muted)", textTransform: "uppercase", marginBottom: "2rem" }}>Restaurant & Bar · Lagos</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {["Menu", "Story", "Chefs", "Reserve", "Instagram", "Facebook"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--cream)"}
              onMouseLeave={e => e.target.style.color = "var(--muted)"}
            >{l}</a>
          ))}
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.75rem" }}>© 2024 Ember & Spice Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

// WhatsApp FAB
function WhatsAppFAB() {
  return (
   <a href="https://wa.me/2348054110448" style={{
  position:"fixed", bottom:"2rem", right:"2rem",
  width:"56px", height:"56px", background:"#25D366",
  borderRadius:"50%", display:"flex", alignItems:"center",
  justifyContent:"center", zIndex:500, textDecoration:"none",
  boxShadow:"0 4px 20px rgba(37,211,102,0.4)",
  animation:"float 3s ease-in-out infinite",
}}>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => {
  const qty = item.qty || 1;   // use item's qty if provided, else 1
  setCart(prev => {
    const existing = prev.find(i => i.name === item.name);
    if (existing) return prev.map(i =>
      i.name === item.name ? { ...i, qty: i.qty + qty } : i
    );
    return [...prev, { ...item, qty }];
  });
  setCartOpen(true);
};

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <Menu onAddToCart={addToCart} />
      <Testimonials />
      <Reserve />
      <Footer />
      <WhatsAppFAB />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdate={updateQty}
        onRemove={removeItem}
      />
    </>
  );
}
