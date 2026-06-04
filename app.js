/* ============================================================
   app.js — Core Application Logic
   MetaOffice.pro — AgentHub
   ============================================================ */

// ─── Theme ───────────────────────────────────────────────────
const themeKey = 'agenthub_theme';
let currentTheme = localStorage.getItem(themeKey) || 'dark';

function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = currentTheme === 'dark' ? '◐' : '○';
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem(themeKey, currentTheme);
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = currentTheme === 'dark' ? '◐' : '○';
}

// ─── Navbar ───────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', toggleTheme);

  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

// ─── Modals ───────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
}
function closeModalOnOverlay(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}
function switchModal(fromId, toId) {
  closeModal(fromId);
  setTimeout(() => openModal(toId), 150);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ─── Auth ─────────────────────────────────────────────────────
function handleLogin() {
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;
  if (!email || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  const user = { email, name: email.split('@')[0], loggedInAt: new Date().toISOString() };
  localStorage.setItem('agenthub_user', JSON.stringify(user));
  closeModal('loginModal');
  showToast(`Welcome back, ${user.name}! 👋`, 'success');
  updateAuthUI(user);
}

function handleSignup() {
  const first = document.getElementById('signupFirst')?.value;
  const last = document.getElementById('signupLast')?.value;
  const email = document.getElementById('signupEmail')?.value;
  const password = document.getElementById('signupPassword')?.value;
  const role = document.getElementById('signupRole')?.value;
  if (!first || !email || !password) {
    showToast('Please fill in required fields', 'error');
    return;
  }
  const user = { name: `${first} ${last}`, email, role, createdAt: new Date().toISOString() };
  localStorage.setItem('agenthub_user', JSON.stringify(user));
  closeModal('signupModal');
  showToast(`Welcome to AgentHub, ${first}! 🎉`, 'success');
  updateAuthUI(user);
}

function updateAuthUI(user) {
  const actions = document.querySelector('.nav-actions');
  if (!actions || !user) return;
  const existingUser = actions.querySelector('.nav-user');
  if (existingUser) existingUser.remove();
  const userEl = document.createElement('div');
  userEl.className = 'nav-user';
  userEl.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;cursor:pointer" onclick="handleLogout()">
      <div style="width:32px;height:32px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;color:#fff">
        ${user.name.charAt(0).toUpperCase()}
      </div>
      <span style="font-size:0.85rem;font-weight:500;color:var(--text-secondary)">${user.name.split(' ')[0]}</span>
    </div>`;
  actions.insertBefore(userEl, actions.querySelector('.btn-primary'));
  // Hide sign-in/up buttons
  const btns = actions.querySelectorAll('.btn-secondary, .btn-primary:last-child');
  btns.forEach(b => b.style.display = 'none');
}

function handleLogout() {
  localStorage.removeItem('agenthub_user');
  showToast('Signed out successfully', 'info');
  location.reload();
}

function initAuth() {
  const user = JSON.parse(localStorage.getItem('agenthub_user') || 'null');
  if (user) updateAuthUI(user);
}

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    text: 'AgentHub completely transformed how we handle customer acquisition. The Sales Agent Pro alone has added $2M in pipeline in three months.',
    author: 'Rachel Chen',
    role: 'VP Sales, NovaTech',
    initial: 'R',
    rating: 5
  },
  {
    text: 'We replaced an entire content team with ContentStudio AI. Quality is better, output is 10x, and cost is a fraction.',
    author: 'Marcus Williams',
    role: 'CMO, ScaleUp Labs',
    initial: 'M',
    rating: 5
  },
  {
    text: 'As an AI builder, AgentHub is the best marketplace to monetize my agents. My first month I earned $8,400.',
    author: 'Anya Sharma',
    role: 'AI Developer & Seller',
    initial: 'A',
    rating: 5
  },
  {
    text: 'SupportBot Elite handles 87% of our tickets automatically. Our team now focuses only on complex cases. CSAT is at an all-time high.',
    author: 'David Park',
    role: 'Head of CS, FlowCommerce',
    initial: 'D',
    rating: 5
  },
  {
    text: 'StrategyOS built our Series A pitch deck materials in 4 hours. Previously that took weeks with an expensive consulting firm.',
    author: 'Isabelle Morin',
    role: 'Founder, Lumina AI',
    initial: 'I',
    rating: 5
  },
  {
    text: 'The research agents are mind-blowing. We get competitor intelligence and market reports that used to take a week — now done overnight.',
    author: 'James Okafor',
    role: 'Strategy Director, Vertex Capital',
    initial: 'J',
    rating: 5
  }
];

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-card reveal" style="animation-delay:${i * 0.1}s">
      <div class="test-quote">"</div>
      <p class="test-text">${t.text}</p>
      <div class="test-author">
        <div class="test-avatar">${t.initial}</div>
        <div>
          <div class="test-name">${t.author}</div>
          <div class="test-role">${t.role}</div>
        </div>
        <div style="margin-left:auto">
          <span style="color:#f59e0b;font-size:0.8rem">${'★'.repeat(t.rating)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Pricing ──────────────────────────────────────────────────
const PRICING_PLANS = [
  {
    name: 'Free',
    monthly: 0,
    annual: 0,
    desc: 'Perfect for individuals exploring AI automation.',
    features: [
      'Access to 50+ free agents',
      '3 active agent deployments',
      'Community support',
      'Basic analytics',
      '1GB data processing/mo'
    ],
    cta: 'Get Started Free',
    featured: false
  },
  {
    name: 'Pro',
    monthly: 49,
    annual: 34,
    desc: 'For growing businesses ready to scale with AI.',
    features: [
      'Access to all 2,400+ agents',
      'Unlimited deployments',
      'Priority support',
      'Advanced analytics',
      '50GB data processing/mo',
      'API access',
      'Custom agent training'
    ],
    cta: 'Start Pro Trial',
    featured: true
  },
  {
    name: 'Enterprise',
    monthly: 199,
    annual: 139,
    desc: 'Custom AI infrastructure for large organizations.',
    features: [
      'Everything in Pro',
      'Dedicated agent hosting',
      'White-label options',
      'SLA guarantees',
      'Unlimited data processing',
      'Custom integrations',
      'Dedicated account manager',
      'SSO & security controls'
    ],
    cta: 'Contact Sales',
    featured: false
  }
];

function renderPricing(annual = false) {
  const grid = document.getElementById('pricingGrid');
  if (!grid) return;
  grid.innerHTML = PRICING_PLANS.map((plan, i) => {
    const price = annual ? plan.annual : plan.monthly;
    return `
      <div class="pricing-card ${plan.featured ? 'featured' : ''} reveal" style="animation-delay:${i * 0.1}s">
        ${plan.featured ? '<div class="pricing-popular">Most Popular</div>' : ''}
        <div class="plan-name">${plan.name}</div>
        <div class="plan-price">
          <sup>$</sup>${price}
        </div>
        <div class="plan-period">${price === 0 ? 'Forever free' : annual ? '/mo, billed annually' : '/month'}</div>
        <div class="plan-desc">${plan.desc}</div>
        <ul class="plan-features">
          ${plan.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <button class="btn-primary btn-full" onclick="handlePricingCTA('${plan.name}')">${plan.cta}</button>
      </div>
    `;
  });
}

function handlePricingCTA(planName) {
  const user = JSON.parse(localStorage.getItem('agenthub_user') || 'null');
  if (planName === 'Enterprise') {
    showToast('Opening contact form for Enterprise...', 'info');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  if (!user) {
    openModal('signupModal');
  } else {
    showToast(`Subscribed to ${planName} plan! 🎉`, 'success');
  }
}

function initPricingToggle() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;
  toggle.addEventListener('change', () => renderPricing(toggle.checked));
}

// ─── FAQ ──────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: 'What is an AI Agent on AgentHub?',
    a: 'An AI Agent is a specialized AI-powered tool trained to perform specific business tasks autonomously. Each agent is built by verified developers and available for purchase or subscription on AgentHub.'
  },
  {
    q: 'How do I purchase and deploy an AI agent?',
    a: 'Simply browse the marketplace, select an agent, and click "Purchase." After checkout, you\'ll receive deployment instructions and API credentials. Most agents can be live within minutes.'
  },
  {
    q: 'Can I sell my own AI agent on AgentHub?',
    a: 'Absolutely. Any developer or AI builder can apply to become a seller. Once approved, you can list agents with your own pricing. Sellers keep 80% of all revenue generated.'
  },
  {
    q: 'What\'s the difference between the subscription plans?',
    a: 'The Free plan gives access to 50+ free agents with basic deployments. Pro unlocks all 2,400+ agents with unlimited deployments and API access. Enterprise adds white-labeling, SLAs, and dedicated infrastructure.'
  },
  {
    q: 'Are the agents secure? Can they access my business data?',
    a: 'Yes, security is our top priority. All agents go through a security review before listing. Data processed by agents is encrypted in transit and at rest. Enterprise plans include additional security controls.'
  },
  {
    q: 'Can I get a refund if an agent doesn\'t perform as expected?',
    a: 'We offer a 7-day money-back guarantee on all paid agents. If an agent doesn\'t meet your expectations within the first week, contact support@metaoffice.pro for a full refund.'
  },
  {
    q: 'Do you offer custom agent development?',
    a: 'Yes. Enterprise customers can work with our team to build fully custom agents tailored to their specific workflows and data. Contact us at salatrir@gmail.com to discuss your requirements.'
  },
  {
    q: 'What integrations do the agents support?',
    a: 'Agents vary by integration capabilities. Common integrations include Slack, HubSpot, Salesforce, Notion, Google Workspace, Zapier, and REST APIs. Each agent page lists supported integrations.'
  }
];

function renderFAQ() {
  const grid = document.getElementById('faqGrid');
  if (!grid) return;
  grid.innerHTML = FAQ_DATA.map((item, i) => `
    <div class="faq-item reveal" style="animation-delay:${i * 0.05}s">
      <button class="faq-question" onclick="toggleFAQ(this)">
        <span>${item.q}</span>
        <span class="faq-chevron">▾</span>
      </button>
      <div class="faq-answer">${item.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── Counter Animation ────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + (el.dataset.count === '99' ? '%' : '+');
    }, 16);
  });
}

// ─── Scroll Reveal ────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Observer for counters
function initCounterObserver() {
  const hero = document.querySelector('.hero-stats');
  if (!hero) return;
  let triggered = false;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      animateCounters();
    }
  });
  observer.observe(hero);
}

// ─── Contact Form ─────────────────────────────────────────────
function submitContact() {
  const name = document.getElementById('contactName')?.value;
  const email = document.getElementById('contactEmail')?.value;
  const subject = document.getElementById('contactSubject')?.value;
  const message = document.getElementById('contactMessage')?.value;

  if (!name || !email || !message) {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  showToast(`Message sent! We'll get back to you at ${email} shortly.`, 'success');
  if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
  if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
  if (document.getElementById('contactSubject')) document.getElementById('contactSubject').value = '';
  if (document.getElementById('contactMessage')) document.getElementById('contactMessage').value = '';
}

// ─── Toast System ─────────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = { success: '✓', error: '✕', info: '✦' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span style="color:${type === 'success' ? 'var(--accent-success)' : type === 'error' ? 'var(--accent-danger)' : 'var(--accent-primary)'}">${icons[type]}</span>${message}`;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// ─── Init All ─────────────────────────────────────────────────
function initApp() {
  initTheme();
  initNavbar();
  initAuth();
  renderTestimonials();
  renderPricing(false);
  initPricingToggle();
  renderFAQ();
  initCounterObserver();
  // Delayed scroll reveal (after everything renders)
  setTimeout(initScrollReveal, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
