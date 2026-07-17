import { useState } from "react";

export default function Reserve() {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", date: "", time: "", guests: "", occasion: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.firstName || !form.phone || !form.date) return;
    setSent(true);
    const msg = encodeURIComponent(
      `🍽️ TABLE RESERVATION\n👤 ${form.firstName} ${form.lastName}\n📞 ${form.phone}\n📅 ${form.date} at ${form.time}\n👥 ${form.guests}\n${form.occasion ? `🎉 Occasion: ${form.occasion}` : ""}`
    );
    window.open(`https://wa.me/2348054110448?text=${msg}`, "_blank");
  };

  const inputStyle = {
    width: "100%", padding: "0.85rem 1rem",
    background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: "0.7rem", color: "var(--cream)", fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border 0.2s",
  };

  return (
    <section id="reserve" className="section" style={{ background: `linear-gradient(135deg, var(--indigo-deep), var(--indigo))` }}>
      <div className="container">
        <div className="res-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

          {/* Left info */}
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "var(--orange)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.8rem" }}>— Reservations</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.1, marginBottom: "1.2rem" }}>
              Reserve Your<br /><em style={{ color: "var(--orange)", fontStyle: "italic" }}>Experience</em>
            </h2>
            <p style={{ color: "var(--muted-light)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              Join us for an unforgettable dining experience. Book directly or ping us on WhatsApp — we confirm within minutes.
            </p>

            {[
              ["📍", "Location", "14 Victoria Island Way, Lagos"],
              ["🕐", "Hours", "Mon–Sat: 11am–10pm · Sun: 12pm–8pm"],
              ["📞", "WhatsApp", "+234 801 234 5678"],
              ["🚗", "Parking", "Free valet available from 6pm"],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem", alignItems: "flex-start" }}>
                <div style={{ width: "44px", height: "44px", background: "rgba(232,84,26,0.1)", border: "1px solid rgba(232,84,26,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>{label}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--cream)" }}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)", borderRadius: "1.5rem", padding: "2.5rem", backdropFilter: "blur(10px)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "var(--cream)", marginBottom: "0.5rem" }}>Reservation Sent!</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>We've opened WhatsApp with your details. We'll confirm within minutes.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[["firstName", "First Name", "Amara"], ["lastName", "Last Name", "Okafor"]].map(([key, label, ph]) => (
                    <div key={key}>
                      <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.4rem" }}>{label}</label>
                      <input style={inputStyle} placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = "var(--orange)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                      />
                    </div>
                  ))}
                </div>

                {[
                  { key: "phone", label: "WhatsApp Number", ph: "+234 801 234 5678", full: true },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.4rem" }}>{f.label}</label>
                    <input style={inputStyle} placeholder={f.ph} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = "var(--orange)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                ))}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[["date", "Date", "date"], ["time", "Time", "time"]].map(([key, label, type]) => (
                    <div key={key}>
                      <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.4rem" }}>{label}</label>
                      <input type={type} style={{ ...inputStyle, colorScheme: "dark" }} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        onFocus={e => e.target.style.borderColor = "var(--orange)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.4rem" }}>Number of Guests</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.guests} onChange={e => setForm(p => ({ ...p, guests: e.target.value }))}>
                    <option value="">Select guests</option>
                    {["1 Guest", "2 Guests", "3–5 Guests", "6–10 Guests", "10+ Guests (Private Event)"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.4rem" }}>Special Occasion (optional)</label>
                  <input style={inputStyle} placeholder="Birthday, Anniversary, Business dinner..." value={form.occasion} onChange={e => setForm(p => ({ ...p, occasion: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = "var(--orange)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>

                <button onClick={handleSubmit} style={{
                  width: "100%", padding: "1rem", background: "var(--orange)", color: "#fff",
                  border: "none", borderRadius: "2rem", fontSize: "0.95rem", fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  boxShadow: "0 8px 30px rgba(232,84,26,0.4)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.target.style.background = "#C93D0A"; e.target.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.target.style.background = "var(--orange)"; e.target.style.transform = "translateY(0)"; }}
                >
                  Reserve My Table via WhatsApp →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .res-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
