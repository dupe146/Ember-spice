import { useState } from "react";

export default function CartDrawer({ isOpen, onClose, cart, onUpdate, onRemove }) {
  const [step, setStep] = useState("cart"); // cart | details | confirm
  const [orderType, setOrderType] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email:"", address: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handlePayment = () => {
  // Validate form first
  if (!form.name || !form.phone || !form.email || !orderType) {
    alert("Please fill in your name, phone, email and order type.");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: "pk_test_0d6592bf2f3865892a8481c4b7bc2dab00e1da5a", // ← paste your test public key here
    email: form.email,
    amount: total * 100, // Paystack uses kobo — multiply naira by 100
    currency: "NGN",
    ref: `order_${Date.now()}`,
    metadata: {
      custom_fields: [
        { display_name:"Customer Name",  variable_name:"name",       value: form.name },
        { display_name:"Phone",          variable_name:"phone",      value: form.phone },
        { display_name:"Order Type",     variable_name:"orderType",  value: orderType },
        { display_name:"Address",        variable_name:"address",    value: form.address || "N/A" },
        { display_name:"Items",          variable_name:"items",      value: cart.map(i=>`${i.name} x${i.qty}`).join(", ") },
      ]
    },
    callback: function(response) {
      // Payment successful!
      // Now send WhatsApp notification
      const msg = encodeURIComponent(
`✅ PAYMENT CONFIRMED

Ref: ${response.reference}
👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email}
🚀 Type: ${orderType}${form.address ? `\n📍 Address: ${form.address}` : ""}${form.note ? `\n📝 Note: ${form.note}` : ""}

${cart.map(i => `• ${i.name} × ${i.qty} — ₦${(i.price*i.qty).toLocaleString()}`).join("\n")}

💰 TOTAL PAID: ₦${total.toLocaleString()}
`
      );
      window.open(`https://wa.me/2348054110448?text=${msg}`, "_blank");
      handleClose();
    },
    onClose: function() {
      // Customer closed payment popup without paying — do nothing
      console.log("Payment popup closed");
    }
  });

  handler.openIframe();
};

  const drawerStyle = {
    position: "fixed", top: 0, right: 0, height: "100vh", width: "min(420px, 100vw)",
    background: "var(--indigo-deep)", borderLeft: "1px solid var(--card-border)",
    zIndex: 2000, transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
    display: "flex", flexDirection: "column",
    boxShadow: isOpen ? "-20px 0 60px rgba(0,0,0,0.5)" : "none",
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1999, backdropFilter: "blur(4px)" }} />}

      <div style={drawerStyle}>
        {/* Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--card-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--cream)", fontWeight: 600 }}>
              {step === "cart" ? "Your Order" : step === "details" ? "Your Details" : "Confirm"}
            </h3>
            <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "2px" }}>{cart.length} item{cart.length !== 1 ? "s" : ""}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--card-border)", borderRadius: "50%", width: "36px", height: "36px", color: "var(--cream)", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        </div>

        {/* Steps indicator */}
        <div style={{ display: "flex", padding: "1rem 1.5rem", gap: "0.5rem" }}>
          {["cart", "details", "confirm"].map((s, i) => (
            <div key={s} style={{ flex: 1, height: "3px", borderRadius: "2px", background: ["cart", "details", "confirm"].indexOf(step) >= i ? "var(--orange)" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
          ))}
        </div>

        {/* STEP: CART */}
        {step === "cart" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "0 1.5rem" }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", paddingTop: "4rem", color: "var(--muted)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🍽️</div>
                <p>Your order is empty.<br />Add something delicious!</p>
              </div>
            ) : cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid var(--card-border)", alignItems: "center" }}>
                <div style={{ fontSize: "2rem", flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--cream)", marginBottom: "2px" }}>{item.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--orange-light)" }}>₦{(item.price * item.qty).toLocaleString()}</div>
                </div>
                {/* Qty controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.06)", borderRadius: "2rem", padding: "0.3rem 0.6rem" }}>
                  <button onClick={() => onUpdate(item.id, -1)} style={{ background: "none", border: "none", color: "var(--muted-light)", cursor: "pointer", fontSize: "1rem", lineHeight: 1, width: "20px" }}>−</button>
                  <span style={{ fontSize: "0.88rem", color: "var(--cream)", fontWeight: 600, minWidth: "16px", textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => onUpdate(item.id, 1)} style={{ background: "none", border: "none", color: "var(--orange)", cursor: "pointer", fontSize: "1rem", lineHeight: 1, width: "20px" }}>+</button>
                </div>
                <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.9rem" }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* STEP: DETAILS */}
        {step === "details" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "0 1.5rem" }}>
            {/* Order type */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.6rem" }}>Order Type *</label>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                {["Delivery", "Dine In", "Takeaway"].map(t => (
                  <button key={t} onClick={() => setOrderType(t)} style={{
                    flex: 1, padding: "0.7rem", border: `1.5px solid ${orderType === t ? "var(--orange)" : "var(--card-border)"}`,
                    borderRadius: "0.7rem", background: orderType === t ? "rgba(232,84,26,0.12)" : "transparent",
                    color: orderType === t ? "var(--orange)" : "var(--muted-light)", cursor: "pointer",
                    fontSize: "0.82rem", fontWeight: 500, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {[
              { key: "name",  label: "Full Name *",         placeholder: "Amara Okafor",           type: "text"  },
{ key: "phone", label: "WhatsApp Number *",   placeholder: "+234 801 234 5678",      type: "tel"   },
{ key: "email", label: "Email Address *",     placeholder: "yourname@gmail.com",     type: "email" },
...(orderType === "Delivery" ? [{ key: "address", label: "Delivery Address", placeholder: "14 Victoria Island, Lagos", type: "text" }] : []),
{ key: "note",  label: "Special Instructions", placeholder: "No pepper, extra sauce...", type: "text" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.4rem" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} style={{
                  width: "100%", padding: "0.8rem 1rem", background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid var(--card-border)", borderRadius: "0.7rem",
                  color: "var(--cream)", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif",
                  outline: "none", transition: "border 0.2s",
                }}
                  onFocus={e => e.target.style.borderColor = "var(--orange)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
            ))}
          </div>
        )}

        {/* STEP: CONFIRM */}
        {step === "confirm" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "0 1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "1rem", padding: "1.2rem", marginBottom: "1rem", border: "1px solid var(--card-border)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>Order Summary</div>
              {cart.map(i => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--cream)" }}>{i.name} × {i.qty}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--orange-light)" }}>₦{(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--card-border)", marginTop: "0.8rem", paddingTop: "0.8rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: "var(--cream)" }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--orange)" }}>₦{total.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "1rem", padding: "1.2rem", border: "1px solid var(--card-border)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>Your Details</div>
              {[["Name", form.name], ["Phone", form.phone], ["Type", orderType], form.address && ["Address", form.address], form.note && ["Note", form.note]].filter(Boolean).map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)", width: "60px" }}>{label}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--cream)" }}>{val}</span>
                </div>
              ))}
            </div>
           <div style={{ marginTop: "1rem", padding: "0.8rem", background: "rgba(74,222,128,0.08)", borderRadius: "0.7rem", border: "1px solid rgba(74,222,128,0.2)", fontSize: "0.78rem", color: "#4ADE80" }}>
  ✓ Payment is secured by Paystack. After payment, your order is sent to our WhatsApp instantly.
</div>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "1.5rem", borderTop: "1px solid var(--card-border)" }}>
          {cart.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--orange)" }}>₦{total.toLocaleString()}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: "0.7rem" }}>
            {step !== "cart" && (
              <button onClick={() => setStep(step === "confirm" ? "details" : "cart")} style={{ flex: 1, padding: "0.85rem", background: "rgba(255,255,255,0.06)", border: "1px solid var(--card-border)", borderRadius: "2rem", color: "var(--cream)", cursor: "pointer", fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif" }}>
                ← Back
              </button>
            )}
            <button onClick={() => {
              if (step === "cart" && cart.length > 0) setStep("details");
              else if (step === "details") setStep("confirm");
              else if (step === "confirm") handlePayment();
            }} style={{
              flex: 2, padding: "0.85rem", background: cart.length === 0 && step === "cart" ? "rgba(255,255,255,0.06)" : "var(--orange)",
              border: "none", borderRadius: "2rem", color: "#fff", cursor: cart.length === 0 ? "not-allowed" : "pointer",
              fontSize: "0.9rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
              boxShadow: cart.length > 0 ? "0 6px 24px rgba(232,84,26,0.35)" : "none",
              transition: "all 0.2s",
            }}>
             {step === "cart" ? "Proceed to Checkout →" : step === "details" ? "Review Order →" : `✓ Pay ₦${total.toLocaleString()} Now`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
