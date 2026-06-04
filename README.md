# ⬡ AgentHub — AI Agent Marketplace
### by MetaOffice.pro

> **The world's premier marketplace for AI Agents.** Buy, sell, and deploy specialized AI agents across every business function.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made with: HTML/CSS/JS](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-orange.svg)](.)
[![GitHub Pages Ready](https://img.shields.io/badge/GitHub%20Pages-Ready-green.svg)](.)

---

## 📋 Project Overview

**AgentHub** is a fully functional, production-quality AI Agent Marketplace built as a pure frontend web application. It enables users to:

- 🛒 **Browse & purchase** AI agents across 6 business categories
- 🚀 **Publish & sell** custom AI agents with full seller tooling
- 📊 **Manage** purchases, wishlist, and subscriptions via a buyer dashboard
- 💰 **Earn revenue** as a seller with 80% revenue share

### Tech Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Fonts:** Syne (display) + DM Sans (body) — Google Fonts
- **Storage:** localStorage (client-side persistence)
- **Deployment:** Static hosting (GitHub Pages, Netlify, Vercel)
- **SEO:** sitemap.xml, robots.txt, Open Graph, Twitter Cards, Schema.org

### File Structure
```
metaoffice-pro/
├── index.html          # Main landing page
├── marketplace.html    # Full agent browsing page
├── dashboard.html      # Buyer dashboard
├── seller.html         # Seller hub & publish form
├── style.css           # Complete design system
├── app.js              # Core app logic (theme, modals, auth, FAQ)
├── agents.js           # Agent data & categories
├── marketplace.js      # Marketplace rendering & filtering
├── dashboard.js        # Dashboard tabs & logic
├── seller.js           # Seller dashboard logic
├── manifest.json       # PWA manifest
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler rules
└── README.md           # This file
```

---

## 🚀 GitHub Pages Deployment Guide

### Step 1: Create GitHub Repository

```bash
# Initialize and push project
git init
git add .
git commit -m "Launch MetaOffice AgentHub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/metaoffice-pro.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `Deploy from a branch`
4. Set **Branch** to `main` and **folder** to `/ (root)`
5. Click **Save**

### Step 3: Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/metaoffice-pro/
```

### Step 4: Custom Domain (Optional)

To use `metaoffice.pro`:

1. Add a `CNAME` file to the root:
```
metaoffice.pro
```

2. Update your DNS provider:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

3. Add an A record for the apex domain:
```
Type: A
Name: @
Values: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
```

---

## 🏗 Marketplace Architecture

### Data Flow
```
agents.js (data) 
  → marketplace.js (rendering + filtering)
  → app.js (modals, theme, auth, UI)
  → localStorage (persistence)
```

### Key Components

| Component | File | Purpose |
|-----------|------|---------|
| Agent Database | `agents.js` | 16 agents across 6 categories |
| Marketplace Grid | `marketplace.js` | Filter, sort, search, pagination |
| Auth System | `app.js` | Login/signup with localStorage |
| Dashboard | `dashboard.js` | Purchases, wishlist, profile, subscription |
| Seller Hub | `seller.js` | Publish agents, analytics, earnings, reviews |

### State Management
All state is persisted in `localStorage` under these keys:
- `agenthub_user` — Current user object
- `agenthub_purchases` — Array of purchased agent IDs
- `agenthub_wishlist` — Array of wishlisted agent IDs
- `agenthub_seller_listings` — Array of published agent listings
- `agenthub_theme` — Current theme (`dark` | `light`)

---

## 🎨 Customization Guide

### Adding New Agents
Edit `agents.js` — add an entry to `AGENTS_DATA`:

```javascript
{
  id: 17,                          // Unique ID
  name: 'My Custom Agent',         // Display name
  category: 'sales',               // Category ID
  emoji: '🎯',                     // Display emoji
  description: 'What it does...',  // Short description
  features: [                      // Up to 5 features
    'Feature one',
    'Feature two'
  ],
  price: 49,                       // Monthly price (0 = free)
  pricePeriod: '/mo',
  rating: 4.8,                     // Out of 5
  reviews: 120,                    // Review count
  badge: 'featured',               // 'featured' | 'hot' | 'new' | null
  isFree: false,
  creator: { name: 'Your Name', verified: true },
  purchases: 500,
  createdAt: '2025-06-01'
}
```

### Adding New Categories
Edit `AGENT_CATEGORIES` in `agents.js`:

```javascript
{
  id: 'finance',
  name: 'AI Finance Agent',
  emoji: '💹',
  color: 'linear-gradient(135deg, #22c55e, #15803d)',
  desc: 'Automate financial analysis and reporting.',
  count: 85,
  features: ['P&L Analysis', 'Budget Forecasting', 'Invoice Processing', 'Tax Assistance']
}
```

### Changing Colors
Edit CSS variables in `style.css`:

```css
:root {
  --accent-primary: #4f9cf9;    /* Main blue */
  --accent-secondary: #7c6ff7; /* Purple accent */
  --accent-tertiary: #2dd4bf;  /* Teal accent */
  --bg-primary: #080b14;       /* Dark background */
}
```

### Adding Real Backend
To connect to a real backend:
1. Replace `localStorage` calls in `app.js`, `dashboard.js`, `seller.js`
2. Add API calls to your preferred backend (Node.js, Supabase, Firebase)
3. Add Stripe for real payments
4. Set up authentication (Auth0, Supabase Auth, Firebase Auth)

---

## 💰 Monetization Ideas

### 1. Subscription Plans
Already built into the UI:
- **Free:** $0/mo — 50 agents, 3 deployments
- **Pro:** $49/mo — All agents, unlimited deployments, API
- **Enterprise:** $199/mo — White-label, SLA, dedicated support

### 2. Seller Commission
- Charge sellers 20% on each sale (built into the 80% revenue share model)
- Sellers earn more by upgrading to Premium Seller accounts

### 3. Featured Listings
- Charge sellers $29/mo for featured placement
- Already in the publish form UI

### 4. Premium Seller Accounts
- Basic Seller: Free (up to 3 listings)
- Pro Seller: $19/mo (unlimited listings + analytics)
- Agency: $79/mo (white-label + team seats)

### 5. Agent-as-a-Service
- Let enterprise customers run agents through your hosted API
- Charge per API call or compute unit

### 6. Verified Badge Program
- Charge $99/year for verified seller status
- Include security audit, priority support

---

## 🗺 Future Roadmap

### Phase 1 — Core Marketplace (Current)
- [x] Homepage with hero, categories, featured agents
- [x] Agent browsing with filter/sort/search
- [x] Agent detail modals
- [x] Buyer dashboard (purchases, wishlist, profile)
- [x] Seller hub (publish, listings, analytics, earnings)
- [x] Dark/Light theme
- [x] PWA manifest
- [x] SEO (sitemap, robots.txt, Open Graph)

### Phase 2 — Real Backend
- [ ] Supabase / Firebase integration
- [ ] Real user authentication (email + OAuth)
- [ ] Stripe payment integration
- [ ] Real agent API execution layer
- [ ] Email notifications (Resend / SendGrid)

### Phase 3 — Advanced Features
- [ ] Agent comparison tool (side-by-side)
- [ ] Agent reviews & ratings system
- [ ] Agent versioning (v1, v2, etc.)
- [ ] Agent playground / live demo
- [ ] Webhook integrations (Zapier, Make)
- [ ] Team & workspace management

### Phase 4 — Ecosystem
- [ ] AgentHub API for developers
- [ ] SDK for popular frameworks
- [ ] Mobile app (React Native)
- [ ] Agent bundles & stacks
- [ ] Affiliate program
- [ ] Partner marketplace (enterprise CRM, ERP)

---

## 📞 Contact & Support

**Contact:** [salatrir@gmail.com](mailto:salatrir@gmail.com)  
**Website:** [metaoffice.pro](https://metaoffice.pro)  
**Support:** [salatrir@gmail.com](mailto:salatrir@gmail.com)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built with ❤️ for the future of work. MetaOffice.pro — AgentHub.*
