# 🍽️ Ember & Spice — Restaurant Web App

A full-featured restaurant ordering web application built with React and Vite. Designed to help Nigerian restaurants move beyond WhatsApp-only ordering into a structured, beautiful digital experience.

![Ember & Spice Preview](public/images/ember%20chef%20special.png)

## 🔗 Live Demo
[ember-spice.vercel.app](https://ember-spice-wheat.vercel.app/)

---

## ✨ Features

- **Interactive Menu** — categorised by Mains, Soups, Grills, Sides and Drinks
- **Smart Soup Cards** — traditional soups include swallow selection (Eba, Pounded Yam, Amala etc.) with pricing per option; Pepper Soup includes protein variant selector (Beef, Chicken, Catfish) with image that swaps per selection
- **Extra Protein Add-ons** — customers can add extra Meat, Chicken or Turkey to any main or soup with live price calculation
- **Live Price Breakdown** — running total updates in real time as customers customise their order
- **Cart System** — add, remove and update quantities with a smooth slide-in drawer
- **3-Step Checkout** — Cart → Customer Details → Order Review
- **Paystack Payment** — secure card payment powered by Paystack; order confirmation sent to restaurant WhatsApp automatically after successful payment
- **WhatsApp Notifications** — formatted order summary sent directly to restaurant's WhatsApp Business number
- **Table Reservation** — reservation form with WhatsApp confirmation
- **Fully Responsive** — optimised for mobile, tablet and desktop
- **Floating WhatsApp Button** — quick contact access on every page

---

## 🛠️ Built With

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Paystack Inline JS](https://paystack.com/docs/payments/accept-payments/#popup)
- CSS Variables & inline styles — no CSS framework dependency
- Google Fonts — Cormorant Garamond + DM Sans + DM Mono

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/dupe146/Ember-spice.git

# Navigate into the project
cd Ember-spice

# Install dependencies
npm install

# Start the dev server
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 💳 Paystack Setup

This project uses Paystack for payment processing.

1. Create a free account at [paystack.com](https://paystack.com)
2. Get your API keys from **Settings → API Keys & Webhooks**
3. Replace the test public key in `src/components/CartDrawer.jsx`:

```js
key: "pk_test_your_key_here",
```

**Test card details:**
```
Card Number:  4084 0840 8408 4081
Expiry:       12/26
CVV:          408
OTP:          123456
```

Switch to `pk_live_` key before going live.

---

## 📁 Project Structure

```
ember-spice/
├── public/
│   └── images/          # All food and restaurant photos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Responsive navbar with mobile hamburger menu
│   │   ├── Hero.jsx         # Hero section with rotating headlines
│   │   ├── Menu.jsx         # Menu grid — SoupCard + RegularCard components
│   │   ├── CartDrawer.jsx   # Slide-in cart with Paystack checkout
│   │   └── Reserve.jsx      # Table reservation form
│   ├── data/
│   │   └── menu.js          # All menu items, prices, variants and add-ons
│   ├── App.jsx              # Root component with cart state management
│   ├── main.jsx             # Vite entry point
│   └── index.css            # Global styles and CSS variables
├── index.html
└── vite.config.js
```

---

## 🎨 Design Decisions

- **Dark indigo palette** (`#1E2547`) with burnt orange accents (`#E8541A`) — premium, editorial feel inspired by modern food publication design
- **Cormorant Garamond** for headings — dramatic serif that feels high-end without being stiff
- **DM Sans** for body — clean, readable, modern
- **Glass-morphism** cards and drawer — depth without heaviness
- All interactions have hover states, transitions and feedback

---

## 📱 Responsive Breakpoints

- **Mobile** (`< 768px`) — single column menu, hamburger nav, stacked hero
- **Tablet** (`768px – 1024px`) — two column menu grid
- **Desktop** (`> 1024px`) — full layout with side-by-side hero

---

## 🔄 How Orders Work

```
Customer browses menu
→ Customises dish (protein, swallow, extras)
→ Adds to cart
→ Proceeds to checkout
→ Fills in name, phone, email, order type
→ Reviews order summary
→ Pays via Paystack popup
→ On success: formatted order + payment reference sent to restaurant WhatsApp
→ Restaurant confirms and prepares order
```

---

## 🌍 Deployment

Deployed on [Vercel](https://vercel.com) with automatic deploys on every push to `main`.

---

## 👩🏾‍💻 Author

Built by **Modupe** — a frontend developer building beautiful web experiences for Nigerian businesses.

