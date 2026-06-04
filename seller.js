/* ============================================================
   seller.js — Seller Dashboard Logic
   MetaOffice.pro — AgentHub
   ============================================================ */

let currentSellerTab = 'overview';

function switchSellerTab(tab, el) {
  currentSellerTab = tab;
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
  renderSellerTab(tab);
  if (window.innerWidth < 1024) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSellerTab(tab) {
  const main = document.getElementById('sellerMain');
  if (!main) return;
  switch (tab) {
    case 'overview':  main.innerHTML = renderSellerOverview(); break;
    case 'publish':   main.innerHTML = renderPublishForm(); break;
    case 'listings':  main.innerHTML = renderListings(); break;
    case 'analytics': main.innerHTML = renderAnalytics(); break;
    case 'earnings':  main.innerHTML = renderEarnings(); break;
    case 'reviews':   main.innerHTML = renderReviews(); break;
    case 'guide':     main.innerHTML = renderGuide(); break;
    default:          main.innerHTML = renderSellerOverview();
  }
  setTimeout(() => {
    main.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 60);
}

function getSellerListings() {
  return JSON.parse(localStorage.getItem('agenthub_seller_listings') || '[]');
}

// ─── Overview ─────────────────────────────────────────────────
function renderSellerOverview() {
  const listings = getSellerListings();
  const totalEarnings = listings.reduce((s, l) => s + (l.earnings || 0), 0);
  const totalSales = listings.reduce((s, l) => s + (l.sales || 0), 0);

  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">Seller Overview</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">Your agent marketplace performance at a glance.</p>
      </div>
      <button class="btn-primary" onclick="switchSellerTab('publish', null)">+ Publish New Agent</button>
    </div>

    <div class="stats-cards reveal">
      <div class="stat-card">
        <div class="stat-card-icon">📦</div>
        <div class="stat-card-value">${listings.length}</div>
        <div class="stat-card-label">Published Agents</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">💸</div>
        <div class="stat-card-value">$${totalEarnings.toFixed(0)}</div>
        <div class="stat-card-label">Total Earnings</div>
        <div class="stat-card-change">80% revenue share</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">🛒</div>
        <div class="stat-card-value">${totalSales}</div>
        <div class="stat-card-label">Total Sales</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">⭐</div>
        <div class="stat-card-value">${listings.length > 0 ? '4.8' : '—'}</div>
        <div class="stat-card-label">Avg Rating</div>
      </div>
    </div>

    <!-- Seller Benefits -->
    <div class="dashboard-card reveal" style="margin-bottom:24px;">
      <div class="dashboard-card-title">Why Sell on AgentHub?</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px">
        ${[
          { icon: '💰', title: '80% Revenue Share', desc: 'Keep 80% of every sale. Competitive rates and no hidden fees.' },
          { icon: '🌍', title: '18,500+ Buyers', desc: 'Instant access to a global marketplace of AI-hungry businesses.' },
          { icon: '🚀', title: 'Publish in Minutes', desc: 'Simple listing process. Go from idea to live agent in under 30 minutes.' },
          { icon: '📊', title: 'Full Analytics', desc: 'Track views, conversions, revenue, and ratings in real-time.' },
          { icon: '🔒', title: 'Secure Payments', desc: 'Stripe-powered payments. Monthly payouts, no delays.' },
          { icon: '🤝', title: 'Seller Support', desc: 'Dedicated seller success team to help you grow your listings.' }
        ].map(b => `
          <div style="padding:20px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px">
            <div style="font-size:1.8rem;margin-bottom:10px">${b.icon}</div>
            <div style="font-family:var(--font-display);font-weight:700;font-size:0.9rem;margin-bottom:6px">${b.title}</div>
            <div style="font-size:0.82rem;color:var(--text-secondary)">${b.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="dashboard-card reveal">
      <div class="dashboard-card-title">Get Started</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="btn-primary btn-full" onclick="switchSellerTab('publish', null)">➕ Publish Your First Agent</button>
        <button class="btn-secondary btn-full" onclick="switchSellerTab('guide', null)">📖 Read the Seller Guide</button>
      </div>
    </div>
  `;
}

// ─── Publish Form ─────────────────────────────────────────────
function renderPublishForm() {
  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">Publish Agent</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">List your AI agent on the marketplace and start earning.</p>
      </div>
    </div>
    <div class="publish-form reveal">
      <div class="form-section-title">Agent Identity</div>
      <div style="display:flex;flex-direction:column;gap:20px;margin-bottom:40px">
        <div class="form-row">
          <div class="form-group">
            <label>Agent Name *</label>
            <input type="text" class="form-input" id="pub_name" placeholder="e.g. SalesForce AI Pro" />
          </div>
          <div class="form-group">
            <label>Emoji / Icon</label>
            <input type="text" class="form-input" id="pub_emoji" placeholder="🤖" maxlength="2" />
          </div>
        </div>
        <div class="form-group">
          <label>Category *</label>
          <select class="form-input" id="pub_category">
            <option value="">Select a category...</option>
            ${AGENT_CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Short Description *</label>
          <textarea class="form-textarea" id="pub_desc" placeholder="Describe what your agent does and the problem it solves (2-3 sentences)..." rows="3"></textarea>
        </div>
      </div>

      <div class="form-section-title">Features & Capabilities</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:40px">
        ${[1,2,3,4,5].map(i => `
          <div class="form-group" style="margin:0">
            <input type="text" class="form-input" id="pub_feature${i}" placeholder="Feature ${i} (e.g. Automated lead scoring)" />
          </div>
        `).join('')}
        <p style="font-size:0.78rem;color:var(--text-muted)">Add up to 5 key features. Be specific about capabilities.</p>
      </div>

      <div class="form-section-title">Pricing</div>
      <div style="display:flex;flex-direction:column;gap:20px;margin-bottom:40px">
        <div class="form-row">
          <div class="form-group">
            <label>Pricing Model</label>
            <select class="form-input" id="pub_pricingModel" onchange="handlePricingModelChange()">
              <option value="subscription">Monthly Subscription</option>
              <option value="one-time">One-Time Purchase</option>
              <option value="free">Free</option>
            </select>
          </div>
          <div class="form-group" id="priceFieldWrap">
            <label>Price (USD)</label>
            <div class="price-input-wrap">
              <span class="price-prefix">$</span>
              <input type="number" class="form-input" id="pub_price" placeholder="49" min="0" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Free Trial?</label>
          <select class="form-input" id="pub_trial">
            <option value="none">No trial</option>
            <option value="7">7-day free trial</option>
            <option value="14">14-day free trial</option>
            <option value="30">30-day free trial</option>
          </select>
        </div>
      </div>

      <div class="form-section-title">Technical Details</div>
      <div style="display:flex;flex-direction:column;gap:20px;margin-bottom:40px">
        <div class="form-group">
          <label>Integrations (comma-separated)</label>
          <input type="text" class="form-input" id="pub_integrations" placeholder="HubSpot, Salesforce, Slack, Zapier..." />
        </div>
        <div class="form-group">
          <label>Demo URL (optional)</label>
          <input type="url" class="form-input" id="pub_demo" placeholder="https://..." />
        </div>
        <div class="form-group">
          <label>Documentation URL (optional)</label>
          <input type="url" class="form-input" id="pub_docs" placeholder="https://..." />
        </div>
      </div>

      <div class="form-section-title">Listing Options</div>
      <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:40px">
        <label style="display:flex;align-items:center;gap:14px;cursor:pointer;padding:16px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px">
          <input type="checkbox" id="pub_featured" style="width:18px;height:18px;accent-color:var(--accent-primary)" />
          <div>
            <div style="font-weight:600;font-size:0.9rem">Featured Listing (+$29/mo)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary)">Appear at the top of search results and category pages</div>
          </div>
        </label>
        <label style="display:flex;align-items:center;gap:14px;cursor:pointer;padding:16px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px">
          <input type="checkbox" id="pub_verified" style="width:18px;height:18px;accent-color:var(--accent-primary)" />
          <div>
            <div style="font-weight:600;font-size:0.9rem">Apply for Verified Badge</div>
            <div style="font-size:0.8rem;color:var(--text-secondary)">Our team will review your agent for quality and security (1-3 business days)</div>
          </div>
        </label>
      </div>

      <div style="display:flex;gap:12px;justify-content:flex-end">
        <button class="btn-secondary" onclick="saveDraft()">Save Draft</button>
        <button class="btn-primary" onclick="publishAgent()">🚀 Publish Agent</button>
      </div>
    </div>
  `;
}

function handlePricingModelChange() {
  const model = document.getElementById('pub_pricingModel')?.value;
  const wrap = document.getElementById('priceFieldWrap');
  if (wrap) wrap.style.opacity = model === 'free' ? '0.4' : '1';
  const price = document.getElementById('pub_price');
  if (price && model === 'free') price.value = '0';
}

function saveDraft() {
  const name = document.getElementById('pub_name')?.value;
  if (!name) { showToast('Please enter an agent name', 'error'); return; }
  showToast('Draft saved locally', 'success');
}

function publishAgent() {
  const name = document.getElementById('pub_name')?.value;
  const category = document.getElementById('pub_category')?.value;
  const desc = document.getElementById('pub_desc')?.value;
  const price = parseFloat(document.getElementById('pub_price')?.value || '0');
  const pricingModel = document.getElementById('pub_pricingModel')?.value;
  const emoji = document.getElementById('pub_emoji')?.value || '🤖';

  if (!name || !category || !desc) {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  const features = [1,2,3,4,5]
    .map(i => document.getElementById(`pub_feature${i}`)?.value)
    .filter(Boolean);

  const listing = {
    id: Date.now(),
    name,
    category,
    desc,
    emoji,
    price: pricingModel === 'free' ? 0 : price,
    isFree: pricingModel === 'free',
    pricingModel,
    features,
    status: 'pending',
    createdAt: new Date().toISOString(),
    sales: 0,
    earnings: 0,
    views: Math.floor(Math.random() * 50)
  };

  const listings = getSellerListings();
  listings.push(listing);
  localStorage.setItem('agenthub_seller_listings', JSON.stringify(listings));

  showToast(`Agent "${name}" submitted for review! 🎉`, 'success');
  setTimeout(() => switchSellerTab('listings', null), 1200);
}

// ─── Listings ─────────────────────────────────────────────────
function renderListings() {
  const listings = getSellerListings();

  if (listings.length === 0) {
    return `
      <div class="dashboard-header reveal"><div class="dashboard-title">My Listings</div></div>
      <div style="text-align:center;padding:80px 24px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:20px;" class="reveal">
        <div style="font-size:4rem;margin-bottom:20px">📦</div>
        <h3 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:12px">No agents listed yet</h3>
        <p style="color:var(--text-secondary);margin-bottom:28px">Publish your first AI agent and start earning.</p>
        <button class="btn-primary" onclick="switchSellerTab('publish', null)">+ Publish Agent</button>
      </div>`;
  }

  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">My Listings</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">${listings.length} agent${listings.length !== 1 ? 's' : ''} listed</p>
      </div>
      <button class="btn-primary" onclick="switchSellerTab('publish', null)">+ New Agent</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;" class="reveal">
      ${listings.map((l, i) => `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px;display:grid;grid-template-columns:auto 1fr auto;gap:20px;align-items:center">
          <div style="width:52px;height:52px;border-radius:12px;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-size:1.6rem">${l.emoji}</div>
          <div>
            <div style="font-family:var(--font-display);font-weight:700;font-size:0.95rem;margin-bottom:4px">${l.name}</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:8px">${AGENT_CATEGORIES.find(c=>c.id===l.category)?.name || l.category} · ${l.isFree ? 'Free' : '$' + l.price + '/mo'}</div>
            <span style="background:${l.status === 'live' ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.1)'};color:${l.status === 'live' ? 'var(--accent-success)' : 'var(--accent-warm)'};font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:999px;text-transform:capitalize">${l.status === 'live' ? '● Live' : '○ ' + (l.status || 'pending')}</span>
          </div>
          <div style="text-align:right">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:12px;text-align:center">
              <div><div style="font-family:var(--font-display);font-weight:700;font-size:1rem">${l.views || 0}</div><div style="font-size:0.72rem;color:var(--text-muted)">Views</div></div>
              <div><div style="font-family:var(--font-display);font-weight:700;font-size:1rem">${l.sales || 0}</div><div style="font-size:0.72rem;color:var(--text-muted)">Sales</div></div>
              <div><div style="font-family:var(--font-display);font-weight:700;font-size:1rem;color:var(--accent-success)">$${(l.earnings || 0).toFixed(0)}</div><div style="font-size:0.72rem;color:var(--text-muted)">Earned</div></div>
            </div>
            <div style="display:flex;gap:8px;justify-content:flex-end">
              <button class="btn-secondary" style="padding:6px 14px;font-size:0.8rem" onclick="editListing(${i})">Edit</button>
              <button class="btn-secondary" style="padding:6px 14px;font-size:0.8rem;color:var(--accent-danger);border-color:var(--accent-danger)" onclick="deleteListing(${i})">Delete</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function editListing(index) {
  showToast('Edit functionality coming soon!', 'info');
}

function deleteListing(index) {
  if (!confirm('Are you sure you want to delete this listing?')) return;
  const listings = getSellerListings();
  listings.splice(index, 1);
  localStorage.setItem('agenthub_seller_listings', JSON.stringify(listings));
  showToast('Listing deleted', 'info');
  renderSellerTab('listings');
}

// ─── Analytics ────────────────────────────────────────────────
function renderAnalytics() {
  const mockData = [
    { month: 'Jan', views: 320, sales: 12 },
    { month: 'Feb', views: 480, sales: 18 },
    { month: 'Mar', views: 390, sales: 14 },
    { month: 'Apr', views: 620, sales: 28 },
    { month: 'May', views: 810, sales: 35 },
    { month: 'Jun', views: 740, sales: 31 }
  ];
  const maxViews = Math.max(...mockData.map(d => d.views));

  return `
    <div class="dashboard-header reveal">
      <div class="dashboard-title">Analytics</div>
    </div>
    <div class="stats-cards reveal">
      <div class="stat-card"><div class="stat-card-icon">👁️</div><div class="stat-card-value">3,360</div><div class="stat-card-label">Total Views</div><div class="stat-card-change">+24% vs last period</div></div>
      <div class="stat-card"><div class="stat-card-icon">🛒</div><div class="stat-card-value">138</div><div class="stat-card-label">Total Sales</div><div class="stat-card-change">+18% vs last period</div></div>
      <div class="stat-card"><div class="stat-card-icon">📊</div><div class="stat-card-value">4.1%</div><div class="stat-card-label">Conversion Rate</div><div class="stat-card-change">↑ from 3.6%</div></div>
      <div class="stat-card"><div class="stat-card-icon">⏱️</div><div class="stat-card-value">2m 14s</div><div class="stat-card-label">Avg Time on Page</div></div>
    </div>
    <div class="dashboard-card reveal" style="margin-top:24px">
      <div class="dashboard-card-title">Monthly Views (Last 6 Months)</div>
      <div style="display:flex;align-items:flex-end;gap:16px;height:180px;padding-top:20px;margin-top:16px">
        ${mockData.map(d => `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;height:100%">
            <div style="flex:1;display:flex;align-items:flex-end;width:100%">
              <div style="width:100%;background:var(--gradient-primary);border-radius:6px 6px 0 0;height:${(d.views/maxViews)*100}%;min-height:4px;transition:height 1s ease;opacity:0.85"></div>
            </div>
            <div style="font-size:0.7rem;color:var(--text-muted)">${d.month}</div>
            <div style="font-size:0.75rem;font-weight:700">${d.views}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="dashboard-card reveal" style="margin-top:24px">
      <div class="dashboard-card-title">Traffic Sources</div>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:16px">
        ${[
          { source: 'Organic Search', pct: 42, color: 'var(--accent-primary)' },
          { source: 'AgentHub Marketplace', pct: 35, color: 'var(--accent-secondary)' },
          { source: 'Direct', pct: 14, color: 'var(--accent-tertiary)' },
          { source: 'Referral', pct: 9, color: 'var(--accent-warm)' }
        ].map(s => `
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:0.85rem;color:var(--text-secondary)">${s.source}</span>
              <span style="font-size:0.85rem;font-weight:600">${s.pct}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${s.pct}%;background:${s.color}"></div></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── Earnings ─────────────────────────────────────────────────
function renderEarnings() {
  const listings = getSellerListings();
  const totalEarnings = listings.reduce((s, l) => s + (l.earnings || 0), 0);

  return `
    <div class="dashboard-header reveal">
      <div class="dashboard-title">Earnings</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px" class="reveal">
      <div style="background:linear-gradient(135deg,rgba(79,156,249,0.12),rgba(124,111,247,0.12));border:1px solid var(--border-accent);border-radius:20px;padding:40px;text-align:center">
        <div style="font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent-primary);margin-bottom:12px">Total Earnings</div>
        <div style="font-family:var(--font-display);font-size:3.5rem;font-weight:800;color:var(--text-primary)">$${totalEarnings.toFixed(2)}</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:8px">Lifetime earnings on AgentHub</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px">
          <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:8px">Pending Payout</div>
          <div style="font-family:var(--font-display);font-size:1.8rem;font-weight:800;color:var(--accent-success)">$${(totalEarnings * 0.3).toFixed(2)}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px">Next payout: July 1, 2025</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px">
          <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:8px">Revenue Share</div>
          <div style="font-family:var(--font-display);font-size:1.8rem;font-weight:800;color:var(--accent-primary)">80%</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px">You keep 80% of all sales</div>
        </div>
      </div>
    </div>
    <div class="dashboard-card reveal">
      <div class="dashboard-card-title">Revenue Breakdown</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px">
        ${[
          { label: 'Subscription Revenue', amount: totalEarnings * 0.65, pct: 65 },
          { label: 'One-Time Purchases', amount: totalEarnings * 0.25, pct: 25 },
          { label: 'Featured Listing Bonus', amount: totalEarnings * 0.10, pct: 10 }
        ].map(r => `
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:0.85rem;color:var(--text-secondary)">${r.label}</span>
              <span style="font-size:0.85rem;font-weight:600">$${r.amount.toFixed(2)} (${r.pct}%)</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${r.pct}%"></div></div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="dashboard-card reveal" style="margin-top:24px">
      <div class="dashboard-card-title">Payout Settings</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:8px">
        <div class="form-group">
          <label>Payout Method</label>
          <select class="form-input"><option>Stripe (Recommended)</option><option>PayPal</option><option>Bank Transfer</option></select>
        </div>
        <div class="form-group">
          <label>Payout Frequency</label>
          <select class="form-input"><option>Monthly</option><option>Weekly</option><option>Daily (Pro+)</option></select>
        </div>
      </div>
      <button class="btn-primary" style="margin-top:16px" onclick="showToast('Payout settings saved','success')">Save Settings</button>
    </div>
  `;
}

// ─── Reviews ──────────────────────────────────────────────────
function renderReviews() {
  const sampleReviews = [
    { agent: 'SalesForce AI Pro', author: 'Sarah M.', rating: 5, text: 'Absolutely incredible agent. Transformed our outbound workflow.', date: '2025-05-15' },
    { agent: 'ContentStudio AI', author: 'James K.', rating: 4, text: 'Great output quality, minor tweaks needed for our brand voice.', date: '2025-05-10' },
    { agent: 'SalesForce AI Pro', author: 'Priya L.', rating: 5, text: 'Best investment we\'ve made this year. ROI was immediate.', date: '2025-05-03' }
  ];

  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">Reviews</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">Manage and respond to customer reviews.</p>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:32px" class="reveal">
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px;text-align:center">
        <div style="font-family:var(--font-display);font-size:3rem;font-weight:800;color:var(--text-primary)">4.8</div>
        <div style="color:#f59e0b;font-size:1.2rem;margin:8px 0">★★★★★</div>
        <div style="font-size:0.82rem;color:var(--text-muted)">Average rating</div>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px;text-align:center">
        <div style="font-family:var(--font-display);font-size:3rem;font-weight:800;color:var(--text-primary)">${sampleReviews.length}</div>
        <div style="font-size:0.82rem;color:var(--text-muted);margin-top:12px">Total reviews</div>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px;text-align:center">
        <div style="font-family:var(--font-display);font-size:3rem;font-weight:800;color:var(--accent-success)">97%</div>
        <div style="font-size:0.82rem;color:var(--text-muted);margin-top:12px">Positive rate</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;" class="reveal">
      ${sampleReviews.map(r => `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px">
            <div>
              <span style="font-weight:700;font-size:0.9rem;color:var(--text-primary)">${r.author}</span>
              <span style="font-size:0.78rem;color:var(--text-muted);margin-left:10px">on ${r.agent}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="color:#f59e0b">${'★'.repeat(r.rating)}</span>
              <span style="font-size:0.75rem;color:var(--text-muted)">${r.date}</span>
            </div>
          </div>
          <p style="font-size:0.88rem;color:var(--text-secondary);font-style:italic;margin-bottom:14px">"${r.text}"</p>
          <button class="btn-secondary" style="padding:6px 16px;font-size:0.8rem" onclick="showToast('Reply feature coming soon!','info')">Reply</button>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── Guide ────────────────────────────────────────────────────
function renderGuide() {
  return `
    <div class="dashboard-header reveal">
      <div class="dashboard-title">Seller Guide</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:20px;" class="reveal">
      ${[
        { step: '01', title: 'Build Your Agent', desc: 'Create a specialized AI agent using any framework or API. Focus on a specific business problem and make it easy to configure. The most successful agents solve one problem exceptionally well.' },
        { step: '02', title: 'Write a Great Listing', desc: 'Your listing title and description are crucial. Be specific about what your agent does, who it\'s for, and what results they can expect. Add real metrics like "reduces support load by 70%".' },
        { step: '03', title: 'Set the Right Price', desc: 'Research similar agents in your category. Monthly subscriptions ($19-$99) perform better than one-time purchases. Offer a free tier or trial to build trust with first-time buyers.' },
        { step: '04', title: 'Get Your First Reviews', desc: 'Reach out to beta users and ask for honest reviews. A few 5-star reviews dramatically increase conversion. Respond to all reviews to show you\'re an engaged seller.' },
        { step: '05', title: 'Optimize & Scale', desc: 'Use your analytics dashboard to understand what\'s working. Update your listing regularly, add new features, and consider applying for Featured status to boost visibility.' }
      ].map(s => `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:28px;display:flex;gap:24px;align-items:flex-start">
          <div style="width:52px;height:52px;border-radius:12px;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:800;font-size:1rem;color:#fff;flex-shrink:0">${s.step}</div>
          <div>
            <div style="font-family:var(--font-display);font-weight:700;font-size:1rem;margin-bottom:8px">${s.title}</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7">${s.desc}</div>
          </div>
        </div>
      `).join('')}
      <div style="background:rgba(79,156,249,0.06);border:1px solid var(--border-accent);border-radius:16px;padding:28px;text-align:center">
        <div style="font-size:2rem;margin-bottom:12px">✉</div>
        <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem;margin-bottom:8px">Need Help?</div>
        <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:16px">Our seller success team is available to help you grow your listings.</p>
        <a href="mailto:salatrir@gmail.com" class="btn-primary" style="display:inline-block">Contact Seller Support</a>
      </div>
    </div>
  `;
}

// ─── Init ─────────────────────────────────────────────────────
function initSeller() {
  renderSellerTab('overview');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSeller);
} else {
  initSeller();
}
