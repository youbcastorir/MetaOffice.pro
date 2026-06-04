/* ============================================================
   agents.js — Agent Data & Categories
   MetaOffice.pro — AgentHub
   ============================================================ */

const AGENT_CATEGORIES = [
  {
    id: 'sales',
    name: 'AI Sales Agent',
    emoji: '💼',
    color: 'linear-gradient(135deg, #4f9cf9, #2563eb)',
    desc: 'Supercharge your pipeline with AI-powered lead gen, qualification, and outreach automation.',
    count: 342,
    features: ['Lead Generation', 'Prospect Qualification', 'Sales Outreach', 'CRM Assistance']
  },
  {
    id: 'marketing',
    name: 'AI Marketing Agent',
    emoji: '📣',
    color: 'linear-gradient(135deg, #7c6ff7, #a855f7)',
    desc: 'Create content, plan campaigns, and optimize SEO — all at AI speed.',
    count: 287,
    features: ['Content Creation', 'SEO Optimization', 'Campaign Planning', 'Social Media Management']
  },
  {
    id: 'support',
    name: 'AI Support Agent',
    emoji: '🎧',
    color: 'linear-gradient(135deg, #2dd4bf, #0891b2)',
    desc: 'Deliver 24/7 customer support, handle FAQs, and manage support tickets autonomously.',
    count: 198,
    features: ['Customer Service', 'FAQ Handling', 'Ticket Management', 'Helpdesk Assistance']
  },
  {
    id: 'research',
    name: 'AI Research Agent',
    emoji: '🔬',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)',
    desc: 'Deep-dive market research, competitor analysis, and automated report generation.',
    count: 174,
    features: ['Market Research', 'Competitor Analysis', 'Data Gathering', 'Report Generation']
  },
  {
    id: 'writing',
    name: 'AI Writing Agent',
    emoji: '✍️',
    color: 'linear-gradient(135deg, #f97316, #dc2626)',
    desc: 'Professional content at scale — articles, copy, product descriptions, and more.',
    count: 412,
    features: ['Articles & Blog Posts', 'Product Descriptions', 'Copywriting', 'Technical Writing']
  },
  {
    id: 'business',
    name: 'AI Business Agent',
    emoji: '📊',
    color: 'linear-gradient(135deg, #22c55e, #15803d)',
    desc: 'Strategic planning, financial analysis, and productivity support for modern businesses.',
    count: 231,
    features: ['Business Planning', 'Strategy Reports', 'Financial Summaries', 'Productivity Support']
  }
];

const AGENTS_DATA = [
  // SALES
  {
    id: 1,
    name: 'SalesForce AI Pro',
    category: 'sales',
    emoji: '💼',
    description: 'Automate your entire outbound sales process. Identifies ideal prospects, crafts personalized outreach, and qualifies leads with human-level precision.',
    features: ['Lead scoring & qualification', 'Personalized email sequences', 'LinkedIn automation', 'CRM sync (HubSpot, Salesforce)', 'Real-time prospect research'],
    price: 49,
    pricePeriod: '/mo',
    rating: 4.9,
    reviews: 238,
    badge: 'featured',
    isFree: false,
    creator: { name: 'TechSales Inc.', verified: true },
    purchases: 1204,
    createdAt: '2025-02-14'
  },
  {
    id: 2,
    name: 'LeadHunter X',
    category: 'sales',
    emoji: '🎯',
    description: 'Precision lead generation at massive scale. Scrapes, qualifies, and enriches leads from 50+ data sources automatically.',
    features: ['Multi-source lead scraping', 'Contact enrichment', 'Intent signal detection', 'Automated follow-ups', 'Export to any CRM'],
    price: 39,
    pricePeriod: '/mo',
    rating: 4.7,
    reviews: 156,
    badge: 'hot',
    isFree: false,
    creator: { name: 'GrowthLabs', verified: true },
    purchases: 876,
    createdAt: '2025-03-01'
  },
  {
    id: 3,
    name: 'ColdOutreach AI',
    category: 'sales',
    emoji: '📧',
    description: 'Write and send hyper-personalized cold emails that actually get replies. Trained on millions of high-performing outreach campaigns.',
    features: ['AI personalization engine', 'A/B testing automation', 'Reply detection & routing', 'Deliverability optimization', 'Analytics dashboard'],
    price: 29,
    pricePeriod: '/mo',
    rating: 4.6,
    reviews: 94,
    badge: 'new',
    isFree: false,
    creator: { name: 'OutreachPro', verified: false },
    purchases: 432,
    createdAt: '2025-04-20'
  },
  // MARKETING
  {
    id: 4,
    name: 'ContentStudio AI',
    category: 'marketing',
    emoji: '🖊️',
    description: 'Your complete AI content team. Generates blogs, social posts, ad copy, and email campaigns — all on-brand and SEO-optimized.',
    features: ['Blog & article generation', 'Social media content calendar', 'SEO keyword optimization', 'Brand voice training', 'Multi-channel publishing'],
    price: 59,
    pricePeriod: '/mo',
    rating: 4.8,
    reviews: 312,
    badge: 'featured',
    isFree: false,
    creator: { name: 'ContentAI Labs', verified: true },
    purchases: 1876,
    createdAt: '2024-11-10'
  },
  {
    id: 5,
    name: 'SEO Mastermind',
    category: 'marketing',
    emoji: '🔍',
    description: 'Dominate search rankings with AI-powered SEO. Keyword research, content optimization, backlink analysis, and rank tracking automated.',
    features: ['Keyword gap analysis', 'On-page SEO optimizer', 'Competitor SERP analysis', 'Automated meta generation', 'Rank tracking & alerts'],
    price: 0,
    pricePeriod: 'Free',
    rating: 4.5,
    reviews: 203,
    badge: null,
    isFree: true,
    creator: { name: 'SEO.ai', verified: true },
    purchases: 3204,
    createdAt: '2025-01-05'
  },
  {
    id: 6,
    name: 'CampaignGenius',
    category: 'marketing',
    emoji: '🚀',
    description: 'Plan, build, and launch full marketing campaigns from a single prompt. Handles strategy, creative, targeting, and budget allocation.',
    features: ['Campaign strategy builder', 'Creative brief generator', 'Budget optimizer', 'Multi-channel launch pad', 'Performance prediction'],
    price: 79,
    pricePeriod: '/mo',
    rating: 4.7,
    reviews: 87,
    badge: 'hot',
    isFree: false,
    creator: { name: 'MarketMind AI', verified: true },
    purchases: 567,
    createdAt: '2025-02-28'
  },
  // SUPPORT
  {
    id: 7,
    name: 'SupportBot Elite',
    category: 'support',
    emoji: '🤖',
    description: 'Enterprise-grade customer support automation. Handles 80%+ of tickets without human intervention while maintaining CSAT scores above 95%.',
    features: ['Natural language understanding', 'Multi-language support (40+)', 'Escalation logic', 'CRM & helpdesk integration', 'Sentiment analysis'],
    price: 89,
    pricePeriod: '/mo',
    rating: 4.9,
    reviews: 445,
    badge: 'featured',
    isFree: false,
    creator: { name: 'SupportAI Corp', verified: true },
    purchases: 2341,
    createdAt: '2024-09-15'
  },
  {
    id: 8,
    name: 'FAQ Autopilot',
    category: 'support',
    emoji: '❓',
    description: 'Train on your documentation and instantly answer any customer question. Reduces support load by 70% from day one.',
    features: ['Doc ingestion & training', 'Instant FAQ responses', 'Knowledge base builder', 'Widget embed', 'Analytics on common queries'],
    price: 19,
    pricePeriod: '/mo',
    rating: 4.6,
    reviews: 178,
    badge: 'new',
    isFree: false,
    creator: { name: 'HelpDesk AI', verified: false },
    purchases: 890,
    createdAt: '2025-04-01'
  },
  // RESEARCH
  {
    id: 9,
    name: 'ResearchPulse',
    category: 'research',
    emoji: '📡',
    description: 'Deep market intelligence at your fingertips. Monitors competitors, tracks trends, and delivers executive-ready reports automatically.',
    features: ['Competitor monitoring', 'Market trend detection', 'News aggregation & analysis', 'Custom report templates', 'Weekly briefing automation'],
    price: 69,
    pricePeriod: '/mo',
    rating: 4.8,
    reviews: 132,
    badge: 'featured',
    isFree: false,
    creator: { name: 'ResearchAI', verified: true },
    purchases: 743,
    createdAt: '2025-01-20'
  },
  {
    id: 10,
    name: 'DataDigger AI',
    category: 'research',
    emoji: '⛏️',
    description: 'Automated data gathering and synthesis. Aggregates data from 200+ sources, cleans it, and surfaces actionable insights instantly.',
    features: ['200+ data source connectors', 'Automated data cleaning', 'Insight extraction', 'Custom dashboards', 'API export'],
    price: 49,
    pricePeriod: '/mo',
    rating: 4.7,
    reviews: 98,
    badge: null,
    isFree: false,
    creator: { name: 'DataMind Labs', verified: true },
    purchases: 521,
    createdAt: '2025-02-10'
  },
  // WRITING
  {
    id: 11,
    name: 'BlogMaster AI',
    category: 'writing',
    emoji: '📝',
    description: 'Publish SEO-optimized, authority-grade blog content at scale. Research, outline, write, and format — complete articles in 60 seconds.',
    features: ['Full article generation', 'SEO-first writing', 'Research integration', 'Tone customization', 'Plagiarism checking'],
    price: 39,
    pricePeriod: '/mo',
    rating: 4.8,
    reviews: 521,
    badge: 'hot',
    isFree: false,
    creator: { name: 'WriteFlow AI', verified: true },
    purchases: 3102,
    createdAt: '2024-08-20'
  },
  {
    id: 12,
    name: 'CopyWizard Pro',
    category: 'writing',
    emoji: '🪄',
    description: 'High-converting copy for ads, landing pages, email campaigns, and sales pages. Trained on millions of successful marketing campaigns.',
    features: ['Ad copy variants', 'Landing page copy', 'Email sequences', 'Sales page generator', 'AIDA & PAS frameworks'],
    price: 0,
    pricePeriod: 'Free',
    rating: 4.6,
    reviews: 389,
    badge: null,
    isFree: true,
    creator: { name: 'CopyAI Studios', verified: true },
    purchases: 4521,
    createdAt: '2024-07-01'
  },
  {
    id: 13,
    name: 'ProductDesc AI',
    category: 'writing',
    emoji: '🏷️',
    description: 'Instantly generate compelling product descriptions that sell. Optimized for ecommerce, Amazon, Shopify, and more.',
    features: ['Bulk description generation', 'Platform-specific formats', 'Keyword integration', 'Tone variants', 'Multi-language output'],
    price: 24,
    pricePeriod: '/mo',
    rating: 4.5,
    reviews: 267,
    badge: 'new',
    isFree: false,
    creator: { name: 'EcomAI', verified: false },
    purchases: 1432,
    createdAt: '2025-03-15'
  },
  // BUSINESS
  {
    id: 14,
    name: 'StrategyOS',
    category: 'business',
    emoji: '♟️',
    description: 'Your AI Chief Strategy Officer. Builds business plans, analyzes market opportunities, and creates investor-ready strategic documents.',
    features: ['Business plan builder', 'SWOT analysis', 'Market sizing', 'Financial projections', 'Pitch deck content'],
    price: 99,
    pricePeriod: '/mo',
    rating: 4.9,
    reviews: 187,
    badge: 'featured',
    isFree: false,
    creator: { name: 'Strategy.ai', verified: true },
    purchases: 892,
    createdAt: '2024-12-01'
  },
  {
    id: 15,
    name: 'FinanceBot',
    category: 'business',
    emoji: '💰',
    description: 'Automated financial intelligence. Analyze P&Ls, generate summaries, forecast cash flow, and produce board-ready reports.',
    features: ['P&L analysis', 'Cash flow forecasting', 'Budget variance reports', 'KPI tracking', 'Board report automation'],
    price: 79,
    pricePeriod: '/mo',
    rating: 4.7,
    reviews: 143,
    badge: null,
    isFree: false,
    creator: { name: 'FinAI Corp', verified: true },
    purchases: 634,
    createdAt: '2025-01-10'
  },
  {
    id: 16,
    name: 'ProductivityAI',
    category: 'business',
    emoji: '⚡',
    description: 'AI executive assistant that manages your schedule, prioritizes tasks, drafts communications, and keeps your team aligned.',
    features: ['Smart task prioritization', 'Meeting summarization', 'Email drafting', 'Project status tracking', 'Team alignment tools'],
    price: 0,
    pricePeriod: 'Free',
    rating: 4.6,
    reviews: 412,
    badge: null,
    isFree: true,
    creator: { name: 'ProductAI', verified: false },
    purchases: 5234,
    createdAt: '2024-06-15'
  }
];

// Render categories
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = AGENT_CATEGORIES.map(cat => `
    <div class="category-card reveal" style="--cat-color: ${cat.color}" onclick="filterByCategory('${cat.id}')">
      <span class="cat-emoji">${cat.emoji}</span>
      <div class="cat-name">${cat.name}</div>
      <div class="cat-desc">${cat.desc}</div>
      <span class="cat-count">${cat.count} agents</span>
    </div>
  `).join('');
}

function filterByCategory(catId) {
  const el = document.getElementById('marketplace');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(t => {
    t.classList.toggle('active', t.dataset.filter === catId);
  });
  if (typeof renderAgents === 'function') renderAgents(catId);
}

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCategories);
} else {
  renderCategories();
}
