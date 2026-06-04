/* ============================================================
   dashboard.js — Buyer Dashboard Logic
   MetaOffice.pro — AgentHub
   ============================================================ */

let currentDashTab = 'overview';

function switchDashTab(tab, el) {
  currentDashTab = tab;
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
  renderDashTab(tab);
  if (window.innerWidth < 1024) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDashTab(tab) {
  const main = document.getElementById('dashMain');
  if (!main) return;
  switch (tab) {
    case 'overview': main.innerHTML = renderOverview(); break;
    case 'myAgents': main.innerHTML = renderMyAgents(); break;
    case 'wishlist': main.innerHTML = renderWishlist(); break;
    case 'history': main.innerHTML = renderHistory(); break;
    case 'profile': main.innerHTML = renderProfile(); break;
    case 'subscription': main.innerHTML = renderSubscription(); break;
    default: main.innerHTML = renderOverview();
  }
  setTimeout(() => {
    main.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 60);
}

function getPurchases() {
  return JSON.parse(localStorage.getItem('agenthub_purchases') || '[]');
}
function getWishlist() {
  return JSON.parse(localStorage.getItem('agenthub_wishlist') || '[]');
}
function getUser() {
  return JSON.parse(localStorage.getItem('agenthub_user') || 'null') || {
    name: 'Guest User', email: 'guest@example.com', role: 'buyer', createdAt: new Date().toISOString()
  };
}

// ─── Overview ─────────────────────────────────────────────────
function renderOverview() {
  const purchases = getPurchases();
  const wishlist = getWishlist();
  const user = getUser();
  const totalSpent = purchases.reduce((sum, p) => sum + (p.price || 0), 0);

  const recentPurchases = purchases.slice(-3).reverse().map(p => {
    const agent = AGENTS_DATA.find(a => a.id === p.id);
    if (!agent) return '';
    return `
      <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border-color);">
        <div style="width:40px;height:40px;border-radius:10px;background:${getCategoryColorDash(agent.category)};display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">${agent.emoji}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:600;font-size:0.88rem;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${agent.name}</div>
          <div style="font-size:0.75rem;color:var(--text-muted)">${new Date(p.purchasedAt).toLocaleDateString()}</div>
        </div>
        <div style="font-weight:700;font-size:0.9rem;color:var(--accent-primary)">${agent.isFree ? 'Free' : '$' + agent.price}</div>
      </div>`;
  }).join('') || '<p style="color:var(--text-muted);font-size:0.85rem;padding:16px 0">No purchases yet. <a href="index.html#marketplace" style="color:var(--accent-primary)">Browse agents →</a></p>';

  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">Welcome back, ${user.name.split(' ')[0]} 👋</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">Here's your AgentHub overview.</p>
      </div>
      <a href="index.html#marketplace" class="btn-primary">Browse Agents</a>
    </div>

    <div class="stats-cards reveal">
      <div class="stat-card">
        <div class="stat-card-icon">🤖</div>
        <div class="stat-card-value">${purchases.length}</div>
        <div class="stat-card-label">Agents Owned</div>
        <div class="stat-card-change">+${purchases.length} total</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">♥</div>
        <div class="stat-card-value">${wishlist.length}</div>
        <div class="stat-card-label">Wishlisted</div>
        <div class="stat-card-change">Items saved</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">💰</div>
        <div class="stat-card-value">$${totalSpent}</div>
        <div class="stat-card-label">Total Spent</div>
        <div class="stat-card-change">Lifetime value</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">⭐</div>
        <div class="stat-card-value">Free</div>
        <div class="stat-card-label">Current Plan</div>
        <div class="stat-card-change"><a href="#" onclick="switchDashTab('subscription',null)" style="color:var(--accent-primary)">Upgrade →</a></div>
      </div>
    </div>

    <div class="dashboard-grid reveal">
      <div class="dashboard-card">
        <div class="dashboard-card-title">
          Recent Purchases
          <a href="#" onclick="switchDashTab('history',null)" style="font-size:0.8rem;color:var(--accent-primary);font-weight:500">View all</a>
        </div>
        ${recentPurchases}
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Quick Actions</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <a href="index.html#marketplace" class="btn-primary" style="text-align:center;text-decoration:none;display:block">🛒 Browse Marketplace</a>
          <a href="seller.html" class="btn-secondary" style="text-align:center;text-decoration:none;display:block">🚀 Start Selling Agents</a>
          <button class="btn-secondary btn-full" onclick="switchDashTab('wishlist',null)">♥ View Wishlist (${wishlist.length})</button>
          <button class="btn-secondary btn-full" onclick="switchDashTab('subscription',null)">⭐ Upgrade to Pro</button>
        </div>
      </div>
    </div>

    <div class="dashboard-card reveal" style="margin-top:24px;">
      <div class="dashboard-card-title">Recommended for You</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px;">
        ${AGENTS_DATA.slice(0,3).map(agent => `
          <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.25s" onmouseover="this.style.borderColor='var(--accent-primary)'" onmouseout="this.style.borderColor='var(--border-color)'" onclick="window.location='index.html#marketplace'">
            <div style="font-size:1.8rem;margin-bottom:10px">${agent.emoji}</div>
            <div style="font-weight:700;font-size:0.88rem;margin-bottom:6px">${agent.name}</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${agent.description}</div>
            <div style="font-weight:700;color:var(--accent-primary);font-size:0.9rem">${agent.isFree ? 'Free' : '$' + agent.price + '/mo'}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── My Agents ─────────────────────────────────────────────────
function renderMyAgents() {
  const purchases = getPurchases();
  const ownedAgents = purchases.map(p => AGENTS_DATA.find(a => a.id === p.id)).filter(Boolean);

  if (ownedAgents.length === 0) {
    return `
      <div class="dashboard-header reveal">
        <div class="dashboard-title">My Agents</div>
      </div>
      <div style="text-align:center;padding:80px 24px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:20px;" class="reveal">
        <div style="font-size:4rem;margin-bottom:20px">🤖</div>
        <h3 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:12px">No agents yet</h3>
        <p style="color:var(--text-secondary);margin-bottom:28px">Browse the marketplace to find AI agents for your business.</p>
        <a href="index.html#marketplace" class="btn-primary">Explore Marketplace</a>
      </div>`;
  }

  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">My Agents</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">${ownedAgents.length} agent${ownedAgents.length !== 1 ? 's' : ''} in your collection</p>
      </div>
      <a href="index.html#marketplace" class="btn-primary">+ Add Agents</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;" class="reveal">
      ${ownedAgents.map(agent => {
        const purchase = purchases.find(p => p.id === agent.id);
        return `
          <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:24px;transition:all 0.25s" onmouseover="this.style.borderColor='var(--accent-primary)'" onmouseout="this.style.borderColor='var(--border-color)'">
            <div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:16px">
              <div style="width:52px;height:52px;border-radius:12px;background:${getCategoryColorDash(agent.category)};display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0">${agent.emoji}</div>
              <div style="flex:1;min-width:0">
                <div style="font-family:var(--font-display);font-weight:700;font-size:1rem;margin-bottom:4px">${agent.name}</div>
                <div style="font-size:0.75rem;color:var(--accent-primary)">${AGENT_CATEGORIES.find(c => c.id === agent.category)?.name || ''}</div>
              </div>
              <div style="background:rgba(34,197,94,0.1);color:var(--accent-success);font-size:0.72rem;font-weight:700;padding:4px 10px;border-radius:999px;">Active</div>
            </div>
            <p style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${agent.description}</p>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px solid var(--border-color)">
              <span style="font-size:0.75rem;color:var(--text-muted)">Purchased ${new Date(purchase?.purchasedAt || Date.now()).toLocaleDateString()}</span>
              <button class="btn-secondary" style="padding:6px 16px;font-size:0.8rem" onclick="alert('Agent configuration panel coming soon!')">Configure</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ─── Wishlist ─────────────────────────────────────────────────
function renderWishlist() {
  const wishlistIds = getWishlist();
  const wishlisted = wishlistIds.map(id => AGENTS_DATA.find(a => a.id === id)).filter(Boolean);

  if (wishlisted.length === 0) {
    return `
      <div class="dashboard-header reveal"><div class="dashboard-title">Wishlist</div></div>
      <div style="text-align:center;padding:80px 24px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:20px;" class="reveal">
        <div style="font-size:4rem;margin-bottom:20px">♡</div>
        <h3 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:12px">Your wishlist is empty</h3>
        <p style="color:var(--text-secondary);margin-bottom:28px">Save agents you're interested in for easy access later.</p>
        <a href="index.html#marketplace" class="btn-primary">Browse Agents</a>
      </div>`;
  }

  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">Wishlist</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">${wishlisted.length} saved agent${wishlisted.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;" class="reveal">
      ${wishlisted.map(agent => `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:20px 24px;display:flex;align-items:center;gap:20px;transition:all 0.25s" onmouseover="this.style.borderColor='var(--accent-primary)'" onmouseout="this.style.borderColor='var(--border-color)'">
          <div style="width:52px;height:52px;border-radius:12px;background:${getCategoryColorDash(agent.category)};display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0">${agent.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-family:var(--font-display);font-weight:700;font-size:0.95rem;margin-bottom:4px">${agent.name}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden">${agent.description}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--text-primary);margin-bottom:8px">${agent.isFree ? 'Free' : '$' + agent.price + '/mo'}</div>
            <div style="display:flex;gap:8px">
              <button class="btn-primary" style="padding:8px 18px;font-size:0.82rem" onclick="handleDashPurchase(${agent.id})">Buy Now</button>
              <button class="btn-secondary" style="padding:8px 12px;font-size:0.82rem" onclick="removeFromWishlist(${agent.id})">✕</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function removeFromWishlist(agentId) {
  const wl = getWishlist().filter(id => id !== agentId);
  localStorage.setItem('agenthub_wishlist', JSON.stringify(wl));
  showToast('Removed from wishlist', 'info');
  renderDashTab('wishlist');
}

// ─── History ──────────────────────────────────────────────────
function renderHistory() {
  const purchases = getPurchases().reverse();

  if (purchases.length === 0) {
    return `
      <div class="dashboard-header reveal"><div class="dashboard-title">Purchase History</div></div>
      <div style="text-align:center;padding:80px 24px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:20px;" class="reveal">
        <div style="font-size:4rem;margin-bottom:20px">📋</div>
        <h3 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:12px">No purchases yet</h3>
        <p style="color:var(--text-secondary);margin-bottom:28px">Your purchase history will appear here.</p>
        <a href="index.html#marketplace" class="btn-primary">Browse Agents</a>
      </div>`;
  }

  const totalSpent = purchases.reduce((s, p) => s + (p.price || 0), 0);

  return `
    <div class="dashboard-header reveal">
      <div>
        <div class="dashboard-title">Purchase History</div>
        <p style="color:var(--text-secondary);font-size:0.9rem">${purchases.length} transaction${purchases.length !== 1 ? 's' : ''} · $${totalSpent} total</p>
      </div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;overflow:hidden;" class="reveal">
      <table class="compare-table" style="border:none">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Category</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${purchases.map(p => {
            const agent = AGENTS_DATA.find(a => a.id === p.id);
            if (!agent) return '';
            const cat = AGENT_CATEGORIES.find(c => c.id === agent.category);
            return `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:12px">
                    <span style="font-size:1.3rem">${agent.emoji}</span>
                    <span style="font-weight:600;color:var(--text-primary)">${agent.name}</span>
                  </div>
                </td>
                <td><span style="font-size:0.78rem;color:var(--accent-primary)">${cat?.name || ''}</span></td>
                <td style="color:var(--text-secondary)">${new Date(p.purchasedAt).toLocaleDateString()}</td>
                <td style="font-weight:700;color:var(--text-primary)">${p.price === 0 || agent.isFree ? 'Free' : '$' + p.price}</td>
                <td><span style="background:rgba(34,197,94,0.1);color:var(--accent-success);font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:999px">Active</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ─── Profile ──────────────────────────────────────────────────
function renderProfile() {
  const user = getUser();
  return `
    <div class="dashboard-header reveal">
      <div class="dashboard-title">My Profile</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:24px;" class="reveal">
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:32px;text-align:center">
        <div style="width:80px;height:80px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;color:#fff;margin:0 auto 16px;font-family:var(--font-display)">${user.name.charAt(0).toUpperCase()}</div>
        <div style="font-family:var(--font-display);font-weight:700;font-size:1.2rem;margin-bottom:4px">${user.name}</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:16px">${user.email}</div>
        <span style="background:rgba(79,156,249,0.1);color:var(--accent-primary);font-size:0.75rem;font-weight:700;padding:4px 14px;border-radius:999px;text-transform:capitalize">${user.role || 'buyer'}</span>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border-color)">
          <div style="font-size:0.78rem;color:var(--text-muted)">Member since</div>
          <div style="font-size:0.88rem;font-weight:600;margin-top:4px">${new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</div>
        </div>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:32px">
        <div style="font-family:var(--font-display);font-weight:700;font-size:1rem;margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid var(--border-color)">Edit Profile</div>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" class="form-input" value="${user.name}" id="profileName" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-input" value="${user.email}" id="profileEmail" />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select class="form-input" id="profileRole">
              <option value="buyer" ${user.role === 'buyer' ? 'selected' : ''}>Buyer</option>
              <option value="seller" ${user.role === 'seller' ? 'selected' : ''}>Seller</option>
              <option value="both" ${user.role === 'both' ? 'selected' : ''}>Buyer & Seller</option>
            </select>
          </div>
          <button class="btn-primary" style="margin-top:8px" onclick="saveProfile()">Save Changes</button>
        </div>
      </div>
    </div>
  `;
}

function saveProfile() {
  const name = document.getElementById('profileName')?.value;
  const email = document.getElementById('profileEmail')?.value;
  const role = document.getElementById('profileRole')?.value;
  const user = getUser();
  const updated = { ...user, name, email, role };
  localStorage.setItem('agenthub_user', JSON.stringify(updated));
  showToast('Profile updated successfully', 'success');
}

// ─── Subscription ─────────────────────────────────────────────
function renderSubscription() {
  return `
    <div class="dashboard-header reveal">
      <div class="dashboard-title">Subscription</div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:16px;padding:32px;margin-bottom:24px" class="reveal">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
        <div>
          <div style="font-family:var(--font-display);font-weight:700;font-size:1.2rem;margin-bottom:6px">Current Plan: <span style="color:var(--accent-primary)">Free</span></div>
          <p style="color:var(--text-secondary);font-size:0.88rem">Access to 50+ free agents · 3 deployments</p>
        </div>
        <button class="btn-primary" onclick="showToast('Redirecting to upgrade...','info')">Upgrade to Pro</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;" class="reveal">
      ${[
        { name: 'Free', price: '$0', period: 'Forever', color: 'var(--text-muted)', features: ['50+ free agents', '3 deployments', 'Community support'], cta: 'Current Plan', active: true },
        { name: 'Pro', price: '$49', period: '/month', color: 'var(--accent-primary)', features: ['All 2,400+ agents', 'Unlimited deployments', 'Priority support', 'API access'], cta: 'Upgrade to Pro', active: false },
        { name: 'Enterprise', price: '$199', period: '/month', color: 'var(--accent-secondary)', features: ['Everything in Pro', 'White-label', 'SLA guarantee', 'Dedicated manager'], cta: 'Contact Sales', active: false }
      ].map(plan => `
        <div style="background:${plan.active ? 'rgba(79,156,249,0.06)' : 'var(--bg-secondary)'};border:1px solid ${plan.active ? 'var(--accent-primary)' : 'var(--border-color)'};border-radius:16px;padding:28px;text-align:center">
          <div style="font-family:var(--font-display);font-weight:700;font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;color:${plan.color};margin-bottom:12px">${plan.name}</div>
          <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:800;margin-bottom:4px">${plan.price}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:20px">${plan.period}</div>
          <ul style="list-style:none;text-align:left;display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
            ${plan.features.map(f => `<li style="font-size:0.83rem;color:var(--text-secondary);display:flex;gap:8px;align-items:flex-start"><span style="color:var(--accent-success)">✓</span>${f}</li>`).join('')}
          </ul>
          <button class="${plan.active ? 'btn-secondary' : 'btn-primary'} btn-full" ${plan.active ? 'disabled' : `onclick="showToast('${plan.name === 'Enterprise' ? 'Opening contact form...' : 'Starting ' + plan.name + ' trial...'}', 'info')"`}>${plan.cta}</button>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── Helpers ──────────────────────────────────────────────────
function getCategoryColorDash(catId) {
  const cat = AGENT_CATEGORIES.find(c => c.id === catId);
  return cat ? cat.color : 'var(--gradient-primary)';
}

function handleDashPurchase(agentId) {
  const agent = AGENTS_DATA.find(a => a.id === agentId);
  if (!agent) return;
  const purchases = getPurchases();
  if (purchases.find(p => p.id === agentId)) {
    showToast(`You already own ${agent.name}`, 'info');
    return;
  }
  purchases.push({ id: agentId, purchasedAt: new Date().toISOString(), price: agent.price });
  localStorage.setItem('agenthub_purchases', JSON.stringify(purchases));
  showToast(`Purchased: ${agent.name} 🎉`, 'success');
  const wl = getWishlist().filter(id => id !== agentId);
  localStorage.setItem('agenthub_wishlist', JSON.stringify(wl));
  renderDashTab('wishlist');
}

// Update badge
function updateBadge() {
  const badge = document.getElementById('agentCountBadge');
  if (badge) badge.textContent = getPurchases().length;
}

// ─── Init ─────────────────────────────────────────────────────
function initDashboard() {
  renderDashTab('overview');
  updateBadge();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
