/* ============================================================
   marketplace.js — Marketplace Logic
   MetaOffice.pro — AgentHub
   ============================================================ */

let currentFilter = 'all';
let currentSort = 'featured';
let currentPage = 1;
const AGENTS_PER_PAGE = 9;
let wishlist = JSON.parse(localStorage.getItem('agenthub_wishlist') || '[]');

function renderAgents(filter = currentFilter, sort = currentSort, reset = true) {
  currentFilter = filter;
  currentSort = sort;
  if (reset) currentPage = 1;

  const grid = document.getElementById('agentsGrid');
  if (!grid) return;

  const searchTerm = (document.getElementById('agentSearch')?.value || '').toLowerCase();

  let agents = [...AGENTS_DATA];

  // Filter by category
  if (filter !== 'all') {
    agents = agents.filter(a => a.category === filter);
  }

  // Filter by search
  if (searchTerm) {
    agents = agents.filter(a =>
      a.name.toLowerCase().includes(searchTerm) ||
      a.description.toLowerCase().includes(searchTerm) ||
      a.category.toLowerCase().includes(searchTerm) ||
      a.features.some(f => f.toLowerCase().includes(searchTerm))
    );
  }

  // Sort
  switch (sort) {
    case 'rating': agents.sort((a, b) => b.rating - a.rating); break;
    case 'newest': agents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    case 'price-low': agents.sort((a, b) => a.price - b.price); break;
    case 'price-high': agents.sort((a, b) => b.price - a.price); break;
    default:
      agents.sort((a, b) => {
        const featuredOrder = { featured: 0, hot: 1, new: 2 };
        return (featuredOrder[a.badge] ?? 3) - (featuredOrder[b.badge] ?? 3);
      });
  }

  const paginated = agents.slice(0, currentPage * AGENTS_PER_PAGE);

  if (paginated.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:60px; color:var(--text-muted);">
      <div style="font-size:3rem; margin-bottom:16px;">🔍</div>
      <p style="font-size:1rem; margin-bottom:8px;">No agents found</p>
      <p style="font-size:0.85rem;">Try adjusting your search or filter</p>
    </div>`;
    return;
  }

  grid.innerHTML = paginated.map((agent, i) => renderAgentCard(agent, i)).join('');

  // Update load more button
  const loadBtn = document.getElementById('loadMoreBtn');
  if (loadBtn) {
    loadBtn.style.display = paginated.length >= agents.length ? 'none' : 'inline-flex';
  }

  // Animate reveals
  requestAnimationFrame(() => {
    grid.querySelectorAll('.agent-card').forEach((el, i) => {
      el.style.animationDelay = `${i * 0.06}s`;
    });
  });
}

function renderAgentCard(agent, index = 0) {
  const stars = '★'.repeat(Math.floor(agent.rating)) + (agent.rating % 1 >= 0.5 ? '½' : '');
  const priceHtml = agent.isFree
    ? `<span class="price-free">Free</span>`
    : `<span class="price-amount">$${agent.price}</span><span class="price-period">${agent.pricePeriod}</span>`;
  const badgeHtml = agent.badge
    ? `<span class="badge badge-${agent.badge}">${agent.badge}</span>`
    : '';
  const catLabel = AGENT_CATEGORIES.find(c => c.id === agent.category)?.name.replace('AI ', '') || agent.category;
  const isWishlisted = wishlist.includes(agent.id);

  const featureTags = agent.features.slice(0, 3).map(f =>
    `<span class="agent-feature-tag">${f}</span>`
  ).join('');

  return `
    <div class="agent-card" onclick="openAgentModal(${agent.id})" style="animation-delay:${index * 0.06}s">
      <div class="agent-card-header">
        <div class="agent-avatar" style="background: ${getCategoryColor(agent.category)}">${agent.emoji}</div>
        <div class="agent-badges">
          ${badgeHtml}
          <span class="badge badge-cat">${catLabel}</span>
        </div>
      </div>
      <div class="agent-card-body">
        <div class="agent-name">${agent.name}</div>
        <div class="agent-desc">${agent.description}</div>
        <div class="agent-features">${featureTags}</div>
      </div>
      <div class="agent-card-footer">
        <div class="agent-rating">
          <span class="agent-stars">${'★'.repeat(Math.floor(agent.rating))}</span>
          <span class="agent-rating-num">${agent.rating}</span>
          <span class="agent-reviews">(${agent.reviews})</span>
        </div>
        <div class="agent-price">${priceHtml}</div>
      </div>
      <div class="agent-card-actions" onclick="event.stopPropagation()">
        <button class="btn-agent-buy" onclick="handlePurchase(${agent.id})">${agent.isFree ? 'Get Free' : 'Buy Now'}</button>
        <button class="btn-agent-wishlist ${isWishlisted ? 'wishlisted' : ''}" onclick="toggleWishlist(${agent.id}, this)" title="Wishlist">♡</button>
      </div>
    </div>
  `;
}

function getCategoryColor(catId) {
  const cat = AGENT_CATEGORIES.find(c => c.id === catId);
  return cat ? cat.color : 'var(--gradient-primary)';
}

function renderTopRated() {
  const grid = document.getElementById('topRatedGrid');
  if (!grid) return;

  const topAgents = [...AGENTS_DATA]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  grid.innerHTML = topAgents.map((agent, i) => `
    <div class="top-rated-card reveal" onclick="openAgentModal(${agent.id})" style="animation-delay:${i * 0.07}s">
      <div class="tr-rank">#${i + 1}</div>
      <div class="tr-avatar" style="background:${getCategoryColor(agent.category)}">${agent.emoji}</div>
      <div class="tr-name">${agent.name}</div>
      <div class="tr-cat">${AGENT_CATEGORIES.find(c => c.id === agent.category)?.name || ''}</div>
      <div class="tr-rating">
        <span class="agent-stars" style="font-size:0.8rem">${'★'.repeat(Math.floor(agent.rating))}</span>
        <span style="font-size:0.82rem; font-weight:600; color:var(--text-primary)">${agent.rating}</span>
        <span style="font-size:0.75rem; color:var(--text-muted)">(${agent.reviews})</span>
      </div>
      <div class="tr-price">${agent.isFree ? '<span class="price-free">Free</span>' : `$${agent.price}<span style="font-size:0.7rem;color:var(--text-muted)">${agent.pricePeriod}</span>`}</div>
    </div>
  `).join('');
}

function openAgentModal(agentId) {
  const agent = AGENTS_DATA.find(a => a.id === agentId);
  if (!agent) return;

  const modal = document.getElementById('agentModal');
  const content = document.getElementById('agentModalContent');
  if (!modal || !content) return;

  const catName = AGENT_CATEGORIES.find(c => c.id === agent.category)?.name || '';
  const isWishlisted = wishlist.includes(agent.id);

  const reviews = generateFakeReviews(agent.id);

  content.innerHTML = `
    <button class="modal-close" onclick="closeModal('agentModal')">✕</button>
    <div class="agent-modal-hero">
      <div class="agent-modal-avatar" style="background:${getCategoryColor(agent.category)}">${agent.emoji}</div>
      <div class="agent-modal-info">
        <h2 class="agent-modal-title">${agent.name}</h2>
        <div class="agent-modal-meta">
          <span class="badge badge-cat">${catName}</span>
          ${agent.badge ? `<span class="badge badge-${agent.badge}">${agent.badge}</span>` : ''}
          <span style="font-size:0.82rem; color:var(--text-secondary)">by <strong>${agent.creator.name}</strong>${agent.creator.verified ? ' ✓' : ''}</span>
        </div>
        <div class="agent-rating">
          <span class="agent-stars">${'★'.repeat(Math.floor(agent.rating))}</span>
          <span class="agent-rating-num">${agent.rating}</span>
          <span class="agent-reviews">(${agent.reviews} reviews)</span>
          <span style="font-size:0.78rem; color:var(--text-muted); margin-left:12px">${agent.purchases.toLocaleString()} purchases</span>
        </div>
      </div>
    </div>
    <div class="agent-modal-body">
      <div>
        <p class="agent-modal-desc">${agent.description}</p>
        <div class="modal-features-title">Key Features</div>
        <div class="modal-features-list">
          ${agent.features.map(f => `<div class="modal-feature-item">${f}</div>`).join('')}
        </div>
        <div class="modal-reviews">
          <div class="modal-features-title" style="margin-top:28px">Recent Reviews</div>
          ${reviews.map(r => `
            <div class="review-item">
              <div class="review-header">
                <span class="review-author">${r.author}</span>
                <span class="agent-stars" style="font-size:0.8rem">${'★'.repeat(r.rating)}</span>
              </div>
              <div class="review-text">${r.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="agent-sidebar">
        <div class="sidebar-card">
          <div class="sidebar-price">${agent.isFree ? 'Free' : `$${agent.price}`}</div>
          <div class="sidebar-period">${agent.isFree ? 'Always free' : `Per month`}</div>
          <button class="btn-primary btn-full" onclick="handlePurchase(${agent.id}); closeModal('agentModal')" style="margin-bottom:12px">
            ${agent.isFree ? 'Get for Free' : 'Purchase Now'}
          </button>
          <button class="btn-secondary btn-full ${isWishlisted ? '' : ''}" onclick="toggleWishlistFromModal(${agent.id}, this)">
            ${isWishlisted ? '♥ Wishlisted' : '♡ Add to Wishlist'}
          </button>
        </div>
        <div class="sidebar-card">
          <div class="modal-features-title" style="margin-bottom:16px">Agent Info</div>
          <div style="display:flex;flex-direction:column;gap:12px;font-size:0.83rem;color:var(--text-secondary)">
            <div style="display:flex;justify-content:space-between"><span>Category</span><strong style="color:var(--text-primary)">${catName}</strong></div>
            <div style="display:flex;justify-content:space-between"><span>Creator</span><strong style="color:var(--text-primary)">${agent.creator.name}</strong></div>
            <div style="display:flex;justify-content:space-between"><span>Rating</span><strong style="color:var(--text-primary)">${agent.rating}/5</strong></div>
            <div style="display:flex;justify-content:space-between"><span>Reviews</span><strong style="color:var(--text-primary)">${agent.reviews}</strong></div>
            <div style="display:flex;justify-content:space-between"><span>Purchases</span><strong style="color:var(--text-primary)">${agent.purchases.toLocaleString()}</strong></div>
          </div>
        </div>
      </div>
    </div>
  `;

  openModal('agentModal');
}

function generateFakeReviews(agentId) {
  const reviewPool = [
    { author: 'Sarah M.', rating: 5, text: 'Absolutely transformed our workflow. ROI was visible within the first week of deployment.' },
    { author: 'James K.', rating: 5, text: 'Best AI agent we\'ve tried. The accuracy and reliability are unmatched in this price range.' },
    { author: 'Priya L.', rating: 4, text: 'Great product overall. Onboarding was smooth and customer support was responsive.' },
    { author: 'Marcus R.', rating: 5, text: 'We\'ve cut our manual work by 60%. I can\'t imagine going back to doing this by hand.' },
    { author: 'Elena V.', rating: 4, text: 'Impressive results. Took a few days to configure but totally worth the setup time.' },
    { author: 'Tom H.', rating: 5, text: 'Our team was skeptical at first, but the agent delivered beyond expectations. Highly recommend.' }
  ];
  const seed = agentId % reviewPool.length;
  return [
    reviewPool[seed],
    reviewPool[(seed + 1) % reviewPool.length],
    reviewPool[(seed + 2) % reviewPool.length]
  ];
}

function toggleWishlist(agentId, btn) {
  const idx = wishlist.indexOf(agentId);
  if (idx === -1) {
    wishlist.push(agentId);
    btn.innerHTML = '♥';
    btn.classList.add('wishlisted');
    showToast('Added to wishlist', 'success');
  } else {
    wishlist.splice(idx, 1);
    btn.innerHTML = '♡';
    btn.classList.remove('wishlisted');
    showToast('Removed from wishlist', 'info');
  }
  localStorage.setItem('agenthub_wishlist', JSON.stringify(wishlist));
}

function toggleWishlistFromModal(agentId, btn) {
  const idx = wishlist.indexOf(agentId);
  if (idx === -1) {
    wishlist.push(agentId);
    btn.innerHTML = '♥ Wishlisted';
    showToast('Added to wishlist', 'success');
  } else {
    wishlist.splice(idx, 1);
    btn.innerHTML = '♡ Add to Wishlist';
    showToast('Removed from wishlist', 'info');
  }
  localStorage.setItem('agenthub_wishlist', JSON.stringify(wishlist));
}

function handlePurchase(agentId) {
  const agent = AGENTS_DATA.find(a => a.id === agentId);
  if (!agent) return;

  const user = JSON.parse(localStorage.getItem('agenthub_user') || 'null');
  if (!user) {
    showToast('Please sign in to purchase agents', 'info');
    openModal('loginModal');
    return;
  }

  const purchases = JSON.parse(localStorage.getItem('agenthub_purchases') || '[]');
  if (purchases.find(p => p.id === agentId)) {
    showToast(`You already own ${agent.name}`, 'info');
    return;
  }

  purchases.push({ id: agentId, purchasedAt: new Date().toISOString(), price: agent.price });
  localStorage.setItem('agenthub_purchases', JSON.stringify(purchases));

  showToast(`${agent.isFree ? 'Activated' : 'Purchased'}: ${agent.name} 🎉`, 'success');
}

// Filter tabs
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderAgents(tab.dataset.filter, currentSort);
    });
  });
}

// Sort select
function initSortSelect() {
  const select = document.getElementById('sortSelect');
  if (select) {
    select.addEventListener('change', () => {
      renderAgents(currentFilter, select.value);
    });
  }
}

// Search
function initSearch() {
  const input = document.getElementById('agentSearch');
  if (!input) return;
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => renderAgents(currentFilter, currentSort), 250);
  });
}

// Load more
function initLoadMore() {
  const btn = document.getElementById('loadMoreBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    currentPage++;
    renderAgents(currentFilter, currentSort, false);
  });
}

// Initialize all marketplace functionality
function initMarketplace() {
  renderAgents();
  renderTopRated();
  initFilterTabs();
  initSortSelect();
  initSearch();
  initLoadMore();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMarketplace);
} else {
  initMarketplace();
}
