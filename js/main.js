/* ════════════════════════════════════════════════
   NEXUS PRO — Main Application Script
   Complete redesign 2026
   ════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════
   COIN DATA
   ══════════════════════════════════════════════ */
const COINS = [
  { id:'bitcoin',   name:'Bitcoin',    sym:'BTC',  price:43291,   c24:2.68,  c7:5.67,  mcap:843_200_000_000, vol:28_500_000_000, color:'#F7931A', cls:'btc-logo',   rank:1,  cats:['layer1'] },
  { id:'ethereum',  name:'Ethereum',   sym:'ETH',  price:2847,    c24:-0.56, c7:8.45,  mcap:341_800_000_000, vol:15_200_000_000, color:'#627EEA', cls:'eth-logo',   rank:2,  cats:['layer1'] },
  { id:'solana',    name:'Solana',     sym:'SOL',  price:98.43,   c24:2.73,  c7:22.15, mcap:44_200_000_000,  vol:4_800_000_000,  color:'#9945FF', cls:'sol-logo',   rank:3,  cats:['layer1'] },
  { id:'bnb',       name:'BNB',        sym:'BNB',  price:312.50,  c24:2.67,  c7:3.22,  mcap:48_100_000_000,  vol:2_100_000_000,  color:'#F3BA2F', cls:'bnb-logo',   rank:4,  cats:['layer1'] },
  { id:'xrp',       name:'XRP',        sym:'XRP',  price:0.624,   c24:3.45,  c7:1.45,  mcap:34_300_000_000,  vol:1_800_000_000,  color:'#00AAE4', cls:'xrp-logo',   rank:5,  cats:['layer1'] },
  { id:'cardano',   name:'Cardano',    sym:'ADA',  price:0.587,   c24:2.69,  c7:-2.34, mcap:20_700_000_000,  vol:890_000_000,    color:'#4A90E2', cls:'ada-logo',   rank:6,  cats:['layer1'] },
  { id:'avalanche', name:'Avalanche',  sym:'AVAX', price:38.42,   c24:2.66,  c7:12.30, mcap:15_700_000_000,  vol:720_000_000,    color:'#E84142', cls:'avax-logo',  rank:7,  cats:['layer1'] },
  { id:'polkadot',  name:'Polkadot',   sym:'DOT',  price:8.92,    c24:2.61,  c7:-1.23, mcap:12_400_000_000,  vol:480_000_000,    color:'#E6007A', cls:'dot-logo',   rank:8,  cats:['layer1'] },
  { id:'chainlink', name:'Chainlink',  sym:'LINK', price:18.43,   c24:2.61,  c7:9.87,  mcap:10_800_000_000,  vol:560_000_000,    color:'#2A5ADA', cls:'link-logo',  rank:9,  cats:['defi','layer1'] },
  { id:'polygon',   name:'Polygon',    sym:'MATIC',price:1.023,   c24:2.66,  c7:5.43,  mcap:10_200_000_000,  vol:420_000_000,    color:'#8247E5', cls:'matic-logo', rank:10, cats:['layer2'] },
  { id:'uniswap',   name:'Uniswap',    sym:'UNI',  price:7.84,    c24:2.75,  c7:6.12,  mcap:5_900_000_000,   vol:290_000_000,    color:'#FF007A', cls:'uni-logo',   rank:11, cats:['defi'] },
  { id:'cosmos',    name:'Cosmos',     sym:'ATOM', price:9.42,    c24:-0.68, c7:3.67,  mcap:3_700_000_000,   vol:185_000_000,    color:'#8B8FA8', cls:'atom-logo',  rank:12, cats:['layer1'] },
  { id:'arbitrum',  name:'Arbitrum',   sym:'ARB',  price:1.18,    c24:2.67,  c7:8.90,  mcap:3_100_000_000,   vol:310_000_000,    color:'#298FC8', cls:'arb-logo',   rank:13, cats:['layer2'] },
  { id:'litecoin',  name:'Litecoin',   sym:'LTC',  price:68.40,   c24:1.23,  c7:-0.45, mcap:5_100_000_000,   vol:410_000_000,    color:'#7E8293', cls:'ltc-logo',   rank:14, cats:['layer1'] },
];

const TRENDING_IDS   = ['bitcoin','ethereum','solana','bnb','avalanche','chainlink'];
const TRENDING_RANKS = [56, 57, 63, 52, 69, 72];
const MOVERS_IDS     = ['polkadot','cardano','polygon','uniswap','cosmos','arbitrum'];
const MOVERS_RANKS   = [49, 52, 65, 63, 58, 34];

/* ══════════════════════════════════════════════
   TRANSACTIONS
   ══════════════════════════════════════════════ */
const TRANSACTIONS = [
  { type:'buy',  id:'bitcoin',   amount:0.05, price:43100, date:'Mar 15' },
  { type:'sell', id:'ethereum',  amount:0.8,  price:2890,  date:'Mar 14' },
  { type:'buy',  id:'solana',    amount:15,   price:94.20, date:'Mar 12' },
  { type:'buy',  id:'chainlink', amount:50,   price:17.80, date:'Mar 10' },
  { type:'sell', id:'polygon',   amount:500,  price:1.05,  date:'Mar 8'  },
];

/* ══════════════════════════════════════════════
   PORTFOLIO HOLDINGS
   ══════════════════════════════════════════════ */
const PORTFOLIO_HOLDINGS = [
  { id:'bitcoin',   qty:0.45,   avgBuy:38200 },
  { id:'ethereum',  qty:5.2,    avgBuy:2450  },
  { id:'solana',    qty:120,    avgBuy:64.50 },
  { id:'avalanche', qty:85,     avgBuy:25.10 },
  { id:'chainlink', qty:220,    avgBuy:14.20 },
  { id:'polygon',   qty:3500,   avgBuy:0.89  },
  { id:'bnb',       qty:4.5,    avgBuy:295   },
];

/* ══════════════════════════════════════════════
   UTILITY FUNCTIONS
   ══════════════════════════════════════════════ */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function fmtUSD(n, decimals = 2) {
  if (n === undefined || n === null) return '$0';
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000_000) {
    return '$' + (n / 1_000_000_000_000).toFixed(2) + 'T';
  }
  if (abs >= 1_000_000_000) {
    return '$' + (n / 1_000_000_000).toFixed(2) + 'B';
  }
  if (abs >= 1_000_000) {
    return '$' + (n / 1_000_000).toFixed(1) + 'M';
  }
  if (abs >= 1_000) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }
  return '$' + n.toFixed(decimals);
}

function fmtPrice(n) {
  if (n < 0.01)  return '$' + n.toFixed(6);
  if (n < 1)     return '$' + n.toFixed(4);
  if (n < 10)    return '$' + n.toFixed(3);
  if (n < 1000)  return '$' + n.toFixed(2);
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(n) {
  const sign = n >= 0 ? '+' : '';
  return sign + n.toFixed(2) + '%';
}

function coinById(id) {
  return COINS.find(c => c.id === id);
}

/* Seeded pseudo-random number generator (Mulberry32) */
function seededRng(seed) {
  let s = seed;
  return function() {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) >>> 0;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function genSeries(base, days, vol = 0.035, seed = 42) {
  const rng = seededRng(typeof seed === 'string' ? seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : seed);
  const now = Date.now();
  const msPerDay = 86_400_000;
  const series = [];
  let price = base * (0.85 + rng() * 0.1); // start slightly below base

  for (let i = 0; i < days; i++) {
    const t = now - (days - 1 - i) * msPerDay;
    // Combine trend, cycle and noise for a realistic curve
    const trend = (i / days) * 0.12;
    const cycle = Math.sin((i / days) * Math.PI * 2.5) * 0.04;
    const noise = (rng() - 0.5) * vol * 2;
    price = price * (1 + trend / days + cycle / days + noise);
    // Ensure last point equals base
    if (i === days - 1) price = base;
    series.push({ x: t, y: parseFloat(price.toFixed(2)) });
  }
  return series;
}

function genOHLC(base, count) {
  const rng = seededRng(12345);
  const now = Date.now();
  const msPerDay = 86_400_000;
  const candles = [];
  let price = base * 0.88;

  for (let i = 0; i < count; i++) {
    const ts = now - (count - 1 - i) * msPerDay;
    const open = price;
    // Daily volatility: 1.2% to 3%
    const range = price * (0.012 + rng() * 0.018);
    const direction = rng() > 0.42 ? 1 : -1;
    const body = range * (0.4 + rng() * 0.5);
    const close = open + direction * body;
    const high = Math.max(open, close) + rng() * range * 0.5;
    const low  = Math.min(open, close) - rng() * range * 0.5;

    candles.push({
      x: new Date(ts),
      y: [
        parseFloat(open.toFixed(2)),
        parseFloat(high.toFixed(2)),
        parseFloat(low.toFixed(2)),
        parseFloat(close.toFixed(2))
      ]
    });

    // Ensure last candle closes at base
    if (i === count - 1) {
      candles[i].y[3] = base;
      candles[i].y[0] = base * (0.995 + rng() * 0.01);
      candles[i].y[1] = Math.max(candles[i].y[0], base) * (1 + rng() * 0.005);
      candles[i].y[2] = Math.min(candles[i].y[0], base) * (1 - rng() * 0.005);
    }

    price = close;
  }
  return candles;
}

/* ══════════════════════════════════════════════
   THEME MANAGEMENT
   ══════════════════════════════════════════════ */
const THEME_KEY = 'nexus_theme';

function setTheme(t) {
  document.body.setAttribute('data-theme', t);
  localStorage.setItem(THEME_KEY, t);
  const icon = $('#themeIcon');
  if (icon) {
    icon.className = t === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
  }
  updateChartsTheme(t);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(saved);
  const btn = $('#themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

/* ══════════════════════════════════════════════
   LIVE CLOCK
   ══════════════════════════════════════════════ */
function initClock() {
  const el = $('#navClock');
  if (!el) return;
  function tick() {
    el.textContent = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
  tick();
  setInterval(tick, 1000);
}

/* ══════════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════════ */
let currentPage = 'explore';
let portfolioChartsInitialized = false;

function navigateTo(page) {
  // Hide all pages
  $$('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = $(`#page-${page}`);
  if (target) target.classList.add('active');

  // Update nav tab active states
  $$('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-page') === page);
  });

  currentPage = page;

  // Lazy-init portfolio charts
  if (page === 'portfolio' && !portfolioChartsInitialized) {
    portfolioChartsInitialized = true;
    setTimeout(() => {
      initHoldingsChart();
      initGrowthChart();
      renderHoldingsTable();
    }, 80);
  }
}

function initNavigation() {
  $$('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      navigateTo(tab.getAttribute('data-page'));
    });
  });

  // Coming soon "Go to Explore" buttons
  $$('.coming-soon .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => navigateTo('explore'));
  });
}

/* ══════════════════════════════════════════════
   TICKER STRIP
   ══════════════════════════════════════════════ */
function initTicker() {
  const track = $('#tickerTrack');
  if (!track) return;

  function buildItems() {
    return COINS.map(c => {
      const isUp = c.c24 >= 0;
      return `
        <div class="ticker-item">
          <span class="t-sym">${c.sym}</span>
          <span class="t-price" data-ticker-id="${c.id}">${fmtPrice(c.price)}</span>
          <span class="t-chg ${isUp ? 'up' : 'dn'}">${fmtPct(c.c24)}</span>
        </div>`;
    }).join('');
  }

  // Duplicate for seamless loop
  const html = buildItems();
  track.innerHTML = html + html;
}

/* ══════════════════════════════════════════════
   SPARKLINE SVG HELPER
   ══════════════════════════════════════════════ */
function buildSparkSVG(coin, width = 64, height = 28) {
  const seed = coin.id.charCodeAt(0);
  const data = genSeries(coin.price, 7, 0.04, seed);
  const prices = data.map(d => d.y);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const isUp = prices[prices.length - 1] >= prices[0];
  const color = isUp ? '#10B981' : '#EF4444';
  const fillColor = isUp ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';

  const pts = prices.map((p, i) => {
    const x = (i / (prices.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polyPoints = pts.join(' ');
  // Build closed polygon for fill: go from last to bottom-right to bottom-left
  const firstX = 0;
  const lastX = width;
  const fillPoly = `${firstX},${height} ` + polyPoints + ` ${lastX},${height}`;

  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="${fillPoly}" fill="${fillColor}" />
    <polyline points="${polyPoints}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}

/* ══════════════════════════════════════════════
   MINI CHART HELPERS
   ══════════════════════════════════════════════ */
function buildMiniBarsSVG(containerId) {
  const el = $(`#${containerId}`);
  if (!el) return;

  const rng = seededRng(99);
  const bars = 7;
  const w = 100;
  const h = 40;
  const barW = 10;
  const gap = 4;
  const totalW = bars * (barW + gap) - gap;
  const startX = (w - totalW) / 2;

  let svgBars = '';
  for (let i = 0; i < bars; i++) {
    const bh = 10 + rng() * 28;
    const x = startX + i * (barW + gap);
    const y = h - bh;
    // Gradient from purple to purple-2
    const opacity = 0.4 + (i / bars) * 0.5;
    svgBars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${bh.toFixed(1)}" rx="2" fill="#7B6FF0" opacity="${opacity.toFixed(2)}"/>`;
  }

  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <defs>
      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#A78BFA"/>
        <stop offset="100%" stop-color="#7B6FF0"/>
      </linearGradient>
    </defs>
    ${svgBars}
  </svg>`;
}

function buildMiniAreaSVG(containerId) {
  const el = $(`#${containerId}`);
  if (!el) return;

  const rng = seededRng(77);
  const points = 30;
  const w = 100;
  const h = 40;
  const values = [];

  let v = 50;
  for (let i = 0; i < points; i++) {
    v += (rng() - 0.48) * 12;
    v = Math.max(8, Math.min(92, v));
    values.push(v);
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const pts = values.map((val, i) => {
    const x = (i / (points - 1)) * w;
    const y = h - ((val - min) / range) * (h - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polyLine = pts.join(' ');
  const fillPoly = `0,${h} ` + polyLine + ` ${w},${h}`;

  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <defs>
      <linearGradient id="areaGrad${containerId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7B6FF0" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#7B6FF0" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    <polygon points="${fillPoly}" fill="url(#areaGrad${containerId})"/>
    <polyline points="${polyLine}" fill="none" stroke="#7B6FF0" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}

/* ══════════════════════════════════════════════
   ASSET TABLE RENDERER
   ══════════════════════════════════════════════ */
function renderAssetTable(containerId, coinIds, rankOverrides) {
  const el = $(`#${containerId}`);
  if (!el) return;

  el.innerHTML = coinIds.map((id, idx) => {
    const coin = coinById(id);
    if (!coin) return '';
    const rank = rankOverrides ? rankOverrides[idx] : coin.rank;
    const isUp = coin.c24 >= 0;
    const sparkSVG = buildSparkSVG(coin, 64, 28);

    return `
      <div class="asset-row">
        <span class="row-rank">${rank}</span>
        <div class="coin-cell-sm">
          <div class="coin-logo-sm ${coin.cls}">${coin.sym.slice(0,3)}</div>
          <div class="cn-wrap">
            <div class="cn-name">${coin.name}</div>
            <div class="cn-sym">${coin.sym}</div>
          </div>
        </div>
        <div class="spark-wrap">${sparkSVG}</div>
        <div class="asset-price">${fmtPrice(coin.price)}</div>
        <div class="asset-chg ${isUp ? 'up' : 'dn'}">${fmtPct(coin.c24)}</div>
      </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════
   MARKET TABLE RENDERER
   ══════════════════════════════════════════════ */
function renderMarketTable() {
  const tbody = $('#mktTableBody');
  if (!tbody) return;

  const searchVal = ($('#marketSearch') ? $('#marketSearch').value : '').toLowerCase().trim();
  const activeFilter = ($('.f-tab.active') ? $('.f-tab.active').getAttribute('data-filter') : 'all');

  let filtered = COINS.filter(c => {
    const matchSearch = !searchVal ||
      c.name.toLowerCase().includes(searchVal) ||
      c.sym.toLowerCase().includes(searchVal);
    const matchFilter = activeFilter === 'all' || c.cats.includes(activeFilter);
    return matchSearch && matchFilter;
  });

  tbody.innerHTML = filtered.map(coin => {
    const isUp24 = coin.c24 >= 0;
    const isUp7  = coin.c7  >= 0;
    const sparkSVG = buildSparkSVG(coin, 80, 32);

    return `
      <tr>
        <td class="td-rank">${coin.rank}</td>
        <td>
          <div class="coin-cell-mkt">
            <div class="coin-logo-mkt ${coin.cls}">${coin.sym.slice(0,3)}</div>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--text-1);">${coin.name}</div>
              <div style="font-size:11px;color:var(--text-3);">${coin.sym}</div>
            </div>
          </div>
        </td>
        <td class="mkt-price" data-id="${coin.id}-price">${fmtPrice(coin.price)}</td>
        <td style="text-align:right;"><span class="chg-badge ${isUp24 ? 'up' : 'dn'}">${fmtPct(coin.c24)}</span></td>
        <td style="text-align:right;"><span class="chg-badge ${isUp7  ? 'up' : 'dn'}">${fmtPct(coin.c7)}</span></td>
        <td class="mcap-td">${fmtUSD(coin.mcap)}</td>
        <td class="mcap-td">${fmtUSD(coin.vol)}</td>
        <td>
          <div style="width:80px;height:32px;">${sparkSVG}</div>
        </td>
        <td><button class="trade-btn">Trade →</button></td>
      </tr>`;
  }).join('');
}

/* ══════════════════════════════════════════════
   ACTIVITY LIST RENDERER
   ══════════════════════════════════════════════ */
function renderActivity() {
  const el = $('#activityList');
  if (!el) return;

  el.classList.add('activity-list');
  el.innerHTML = TRANSACTIONS.map(tx => {
    const coin = coinById(tx.id);
    if (!coin) return '';
    const isBuy = tx.type === 'buy';
    const total = (tx.amount * tx.price).toFixed(2);
    const icon = isBuy ? 'bi-arrow-up' : 'bi-arrow-down';

    return `
      <div class="act-row">
        <div class="act-icon ${isBuy ? 'buy' : 'sell'}">
          <i class="bi ${icon}"></i>
        </div>
        <div class="act-info">
          <div class="act-name">${isBuy ? 'Bought' : 'Sold'} ${coin.name}</div>
          <div class="act-meta">${tx.amount} ${coin.sym} @ ${fmtPrice(tx.price)}</div>
        </div>
        <div class="act-amount">
          <div class="act-val ${isBuy ? 'negative' : 'positive'}">${isBuy ? '-' : '+'}$${parseFloat(total).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2})}</div>
          <div class="act-date">${tx.date}</div>
        </div>
      </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════
   PORTFOLIO LEGEND RENDERER
   ══════════════════════════════════════════════ */
function renderPortfolioLegend() {
  const el = $('#portLegend');
  if (!el) return;

  const items = [
    { name:'Bitcoin',   pct:45, color:'#7B6FF0' },
    { name:'Ethereum',  pct:28, color:'#A78BFA' },
    { name:'Solana',    pct:12, color:'#C4B5FD' },
    { name:'Avalanche', pct:8,  color:'#00D4AA' },
    { name:'Other',     pct:7,  color:'#4E4A6A' },
  ];

  el.innerHTML = items.map(item => `
    <div class="pl-row">
      <span class="pl-dot" style="background:${item.color};"></span>
      <span class="pl-name">${item.name}</span>
      <span class="pl-pct">${item.pct}%</span>
    </div>`).join('');
}

/* ══════════════════════════════════════════════
   SENTIMENT BARS RENDERER
   ══════════════════════════════════════════════ */
function renderSentimentBars() {
  const el = $('#sentimentBars');
  if (!el) return;

  const bars = [
    { label:'Price Momentum',   val:72 },
    { label:'Volume Analysis',  val:68 },
    { label:'Social Sentiment', val:74 },
    { label:'Market Dominance', val:70 },
  ];

  el.innerHTML = bars.map(b => `
    <div class="sent-row">
      <span class="sent-label">${b.label}</span>
      <div class="sent-track">
        <div class="sent-fill" style="width:${b.val}%;"></div>
      </div>
      <span class="sent-val">${b.val}</span>
    </div>`).join('');
}

/* ══════════════════════════════════════════════
   HOLDINGS TABLE RENDERER
   ══════════════════════════════════════════════ */
function renderHoldingsTable() {
  const tbody = $('#holdingsBody');
  if (!tbody) return;

  const totalVal = PORTFOLIO_HOLDINGS.reduce((sum, h) => {
    const coin = coinById(h.id);
    return sum + (coin ? coin.price * h.qty : 0);
  }, 0);

  tbody.innerHTML = PORTFOLIO_HOLDINGS.map(h => {
    const coin = coinById(h.id);
    if (!coin) return '';
    const value  = coin.price * h.qty;
    const cost   = h.avgBuy   * h.qty;
    const pnl    = value - cost;
    const roi    = ((value - cost) / cost) * 100;
    const alloc  = (value / totalVal) * 100;
    const isPnlUp = pnl >= 0;
    const allocColor = coin.color || '#7B6FF0';

    return `
      <tr>
        <td>
          <div class="coin-cell-mkt">
            <div class="coin-logo-mkt ${coin.cls}">${coin.sym.slice(0,3)}</div>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--text-1);">${coin.name}</div>
              <div style="font-size:11px;color:var(--text-3);">${coin.sym}</div>
            </div>
          </div>
        </td>
        <td style="text-align:right;font-family:'Manrope',sans-serif;font-weight:600;color:var(--text-1);">${h.qty.toLocaleString()} ${coin.sym}</td>
        <td style="text-align:right;color:var(--text-2);">${fmtPrice(h.avgBuy)}</td>
        <td style="text-align:right;font-family:'Manrope',sans-serif;font-weight:700;color:var(--text-1);">${fmtPrice(coin.price)}</td>
        <td style="text-align:right;font-family:'Manrope',sans-serif;font-weight:700;color:var(--text-1);">${fmtUSD(value)}</td>
        <td style="text-align:right;"><span class="chg-badge ${isPnlUp ? 'up' : 'dn'}">${isPnlUp?'+':''}${fmtUSD(pnl)}</span></td>
        <td style="text-align:right;"><span class="chg-badge ${isPnlUp ? 'up' : 'dn'}">${isPnlUp?'+':''}${roi.toFixed(1)}%</span></td>
        <td>
          <div class="holdings-alloc" style="display:flex;align-items:center;gap:8px;justify-content:flex-end;">
            <div class="holdings-alloc-bar" style="width:56px;height:3px;background:var(--border);border-radius:2px;overflow:hidden;">
              <div class="holdings-alloc-fill" style="width:${alloc.toFixed(1)}%;height:100%;border-radius:2px;background:${allocColor};"></div>
            </div>
            <span style="font-size:11px;color:var(--text-3);width:32px;text-align:right;">${alloc.toFixed(1)}%</span>
          </div>
        </td>
      </tr>`;
  }).join('');
}

/* ══════════════════════════════════════════════
   APEXCHARTS — THEME REGISTRY & UPDATER
   ══════════════════════════════════════════════ */
const chartRegistry = {};   // keyed by name → ApexCharts instance

function updateChartsTheme(t) {
  const isDark    = t === 'dark';
  const axisColor = isDark ? '#9B96C4' : '#5A6478';
  const gridColor = isDark ? '#2A2640' : '#E8ECF4';
  const tipTheme  = isDark ? 'dark'    : 'light';
  const textColor = isDark ? '#F1F0FF' : '#1A1D2E';
  const altSlice  = isDark ? '#2A2640' : '#E8ECF4';

  const axisUpdate = {
    xaxis: { labels: { style: { colors: axisColor } } },
    yaxis: { labels: { style: { colors: axisColor } } },
    grid:  { borderColor: gridColor },
    tooltip: { theme: tipTheme }
  };

  // Line / area / candlestick charts
  ['candle', 'area', 'growth'].forEach(k => {
    if (chartRegistry[k]) chartRegistry[k].updateOptions(axisUpdate, false, false);
  });

  // Donut / radial charts — also update inner text colors
  const donutLabelUpdate = {
    ...axisUpdate,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: { color: textColor },
            value: { color: textColor }
          }
        }
      }
    }
  };
  ['btcDom', 'portfolioDonut', 'holdings'].forEach(k => {
    if (chartRegistry[k]) {
      // btcDom altcoin slice color switches with theme
      if (k === 'btcDom') {
        chartRegistry[k].updateOptions({
          ...donutLabelUpdate,
          colors: ['#7B6FF0', altSlice]
        }, false, false);
      } else {
        chartRegistry[k].updateOptions(donutLabelUpdate, false, false);
      }
    }
  });

  // Fear & Greed radial
  if (chartRegistry['fearGreed']) {
    chartRegistry['fearGreed'].updateOptions({
      tooltip: { theme: tipTheme },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name:  { color: isDark ? '#9B96C4' : '#5A6478' },
            value: { color: textColor }
          }
        }
      }
    }, false, false);
  }
}

/* ══════════════════════════════════════════════
   APEXCHARTS — CANDLESTICK
   ══════════════════════════════════════════════ */
let candleChart = null;

function initCandlestickChart() {
  const el = $('#candlestickChart');
  if (!el || typeof ApexCharts === 'undefined') return;
  if (candleChart) { candleChart.destroy(); candleChart = null; }

  const ohlcData = genOHLC(43291, 30);

  const options = {
    chart: {
      type: 'candlestick',
      height: 220,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
      fontFamily: 'Inter, sans-serif',
    },
    series: [{ name: 'BTC/USD', data: ohlcData }],
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#10B981',
          downward: '#EF4444'
        },
        wick: { useFillColor: true }
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { fontFamily: 'Inter, sans-serif', colors: '#9B96C4', fontSize: '10px' },
        datetimeFormatter: { day: 'MMM dd' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        formatter: v => '$' + (v / 1000).toFixed(0) + 'k',
        style: { fontFamily: 'Manrope, sans-serif', colors: '#9B96C4', fontSize: '10px' }
      }
    },
    grid: {
      borderColor: '#2A2640',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } }
    },
    tooltip: {
      theme: 'dark',
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const d = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        const isUp = c >= d;
        const color = isUp ? '#10B981' : '#EF4444';
        return `<div style="background:#1A1830;border:1px solid #2A2640;border-radius:8px;padding:10px 14px;font-family:Manrope,sans-serif;font-size:12px;">
          <div style="color:#9B96C4;margin-bottom:6px;">${new Date(w.globals.seriesX[seriesIndex][dataPointIndex]).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;">
            <span style="color:#9B96C4;">Open</span><span style="color:#F1F0FF;font-weight:700;">$${d.toLocaleString()}</span>
            <span style="color:#9B96C4;">High</span><span style="color:#10B981;font-weight:700;">$${h.toLocaleString()}</span>
            <span style="color:#9B96C4;">Low</span><span style="color:#EF4444;font-weight:700;">$${l.toLocaleString()}</span>
            <span style="color:#9B96C4;">Close</span><span style="color:${color};font-weight:700;">$${c.toLocaleString()}</span>
          </div>
        </div>`;
      }
    }
  };

  candleChart = new ApexCharts(el, options);
  candleChart.render();
  chartRegistry['candle'] = candleChart;
}

/* ══════════════════════════════════════════════
   APEXCHARTS — AREA CHART
   ══════════════════════════════════════════════ */
let areaChartInstance = null;

function initAreaChart() {
  const el = $('#areaChart');
  if (!el || typeof ApexCharts === 'undefined') return;
  if (areaChartInstance) { areaChartInstance.destroy(); areaChartInstance = null; }

  const seriesData = genSeries(43291, 30).map(p => ({ x: p.x, y: p.y }));

  const options = {
    chart: {
      type: 'area',
      height: 220,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, speed: 800 },
      fontFamily: 'Inter, sans-serif',
    },
    series: [{ name: 'Volume', data: seriesData }],
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#7B6FF0']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.02,
        colorStops: [
          { offset: 0,   color: '#7B6FF0', opacity: 0.35 },
          { offset: 100, color: '#7B6FF0', opacity: 0.02 }
        ]
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { fontFamily: 'Inter, sans-serif', colors: '#9B96C4', fontSize: '10px' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        formatter: v => '$' + (v / 1000).toFixed(0) + 'k',
        style: { fontFamily: 'Manrope, sans-serif', colors: '#9B96C4', fontSize: '10px' }
      }
    },
    grid: {
      borderColor: '#2A2640',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } }
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'MMM dd' },
      y: { formatter: v => '$' + v.toLocaleString() }
    },
    markers: {
      size: 0,
      hover: { size: 4 }
    },
    colors: ['#7B6FF0']
  };

  areaChartInstance = new ApexCharts(el, options);
  areaChartInstance.render();
  chartRegistry['area'] = areaChartInstance;
}

/* ══════════════════════════════════════════════
   APEXCHARTS — BTC DOMINANCE DONUT
   ══════════════════════════════════════════════ */
function initBTCDomChart() {
  const el = $('#btcDomChart');
  if (!el || typeof ApexCharts === 'undefined') return;

  const options = {
    chart: {
      type: 'donut',
      height: 110,
      background: 'transparent',
      toolbar: { show: false },
      sparkline: { enabled: false },
      animations: { enabled: true }
    },
    series: [52.31, 47.69],
    labels: ['BTC', 'Altcoins'],
    colors: ['#7B6FF0', '#2A2640'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Dominance',
              formatter: () => '52.3%',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '11px',
              color: '#F1F0FF',
              fontWeight: 700
            },
            value: {
              show: true,
              fontFamily: 'Manrope, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              color: '#F1F0FF',
              formatter: v => v + '%'
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 0 },
    tooltip: { theme: 'dark' }
  };

  const chart = new ApexCharts(el, options);
  chart.render();
  chartRegistry['btcDom'] = chart;
}

/* ══════════════════════════════════════════════
   APEXCHARTS — PORTFOLIO DONUT (Explore page)
   ══════════════════════════════════════════════ */
function initPortfolioDonut() {
  const el = $('#portfolioDonut');
  if (!el || typeof ApexCharts === 'undefined') return;

  const options = {
    chart: {
      type: 'donut',
      height: 220,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true }
    },
    series: [45, 28, 12, 8, 7],
    labels: ['Bitcoin', 'Ethereum', 'Solana', 'Avalanche', 'Other'],
    colors: ['#7B6FF0', '#A78BFA', '#C4B5FD', '#00D4AA', '#4E4A6A'],
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: () => '$42.8k',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '13px',
              color: '#F1F0FF',
              fontWeight: 700
            },
            value: {
              show: true,
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: '#F1F0FF',
              formatter: v => v + '%'
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 2, colors: ['#13111F'] },
    tooltip: { theme: 'dark' }
  };

  const chart = new ApexCharts(el, options);
  chart.render();
  chartRegistry['portfolioDonut'] = chart;
}

/* ══════════════════════════════════════════════
   APEXCHARTS — FEAR & GREED GAUGE
   ══════════════════════════════════════════════ */
function initFearGreedGauge() {
  const el = $('#fearGreedGauge');
  if (!el || typeof ApexCharts === 'undefined') return;

  const options = {
    chart: {
      type: 'radialBar',
      height: 200,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true }
    },
    series: [72],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: '55%',
          background: 'transparent'
        },
        track: {
          background: '#2A2640',
          strokeWidth: '100%'
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 26,
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            color: '#9B96C4',
            formatter: () => 'Greed'
          },
          value: {
            show: true,
            offsetY: -8,
            fontSize: '28px',
            fontWeight: 800,
            fontFamily: 'Manrope, sans-serif',
            color: '#F1F0FF',
            formatter: () => '72'
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        colorStops: [
          { offset: 0,   color: '#7B6FF0', opacity: 1 },
          { offset: 100, color: '#F59E0B', opacity: 1 }
        ]
      }
    },
    stroke: { lineCap: 'round' },
    labels: ['Greed'],
    tooltip: { enabled: false }
  };

  const chart = new ApexCharts(el, options);
  chart.render();
  chartRegistry['fearGreed'] = chart;
}

/* ══════════════════════════════════════════════
   APEXCHARTS — HOLDINGS CHART (Portfolio page)
   ══════════════════════════════════════════════ */
function initHoldingsChart() {
  const el = $('#holdingsChart');
  if (!el || typeof ApexCharts === 'undefined') return;

  const options = {
    chart: {
      type: 'donut',
      height: 280,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true }
    },
    series: [45, 28, 12, 8, 7],
    labels: ['Bitcoin', 'Ethereum', 'Solana', 'Avalanche', 'Other'],
    colors: ['#7B6FF0', '#A78BFA', '#C4B5FD', '#00D4AA', '#4E4A6A'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Portfolio',
              formatter: () => '$42.8k',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '13px',
              color: '#F1F0FF',
              fontWeight: 700
            },
            value: {
              show: true,
              fontFamily: 'Manrope, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: '#F1F0FF',
              formatter: v => v + '%'
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      labels: {
        colors: ['#9B96C4','#9B96C4','#9B96C4','#9B96C4','#9B96C4']
      }
    },
    stroke: { width: 2, colors: ['#13111F'] },
    tooltip: { theme: 'dark' }
  };

  const chart = new ApexCharts(el, options);
  chart.render();
  chartRegistry['holdings'] = chart;
}

/* ══════════════════════════════════════════════
   APEXCHARTS — GROWTH CHART (Portfolio page)
   ══════════════════════════════════════════════ */
function initGrowthChart() {
  const el = $('#growthChart');
  if (!el || typeof ApexCharts === 'undefined') return;

  const investedSeries = genSeries(35200, 90, 0.005, 999);
  const valueSeries    = genSeries(42847, 90, 0.025, 888);

  // Ensure invested line starts lower and grows less
  const investedData = investedSeries.map((p, i) => ({
    x: p.x,
    y: Math.round(32000 + (i / 90) * 3200)
  }));

  const options = {
    chart: {
      type: 'area',
      height: 280,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, speed: 800 },
      fontFamily: 'Inter, sans-serif',
    },
    series: [
      { name: 'Current Value', data: valueSeries.map(p => ({ x: p.x, y: p.y })) },
      { name: 'Invested',      data: investedData }
    ],
    colors: ['#10B981', '#7B6FF0'],
    stroke: { curve: 'smooth', width: [2, 2] },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.25,
        opacityTo: 0.01
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { fontFamily: 'Inter, sans-serif', colors: '#9B96C4', fontSize: '10px' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        formatter: v => '$' + (v / 1000).toFixed(0) + 'k',
        style: { fontFamily: 'Manrope, sans-serif', colors: '#9B96C4', fontSize: '10px' }
      }
    },
    grid: {
      borderColor: '#2A2640',
      strokeDashArray: 4
    },
    legend: {
      show: true,
      position: 'top',
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      labels: { colors: ['#9B96C4','#9B96C4'] }
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'MMM dd' },
      y: { formatter: v => '$' + v.toLocaleString() }
    },
    markers: { size: 0, hover: { size: 4 } }
  };

  const chart = new ApexCharts(el, options);
  chart.render();
  chartRegistry['growth'] = chart;
}

/* ══════════════════════════════════════════════
   3D TILT EFFECT
   ══════════════════════════════════════════════ */
function initTiltEffect() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  $$('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxDeg = 6;
      const rotX = -(dy / (rect.height / 2)) * maxDeg;
      const rotY =  (dx / (rect.width  / 2)) * maxDeg;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════════════
   COUNTER ANIMATION
   ══════════════════════════════════════════════ */
function animateCounters() {
  const els = $$('[data-target]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = target * ease;

        // Format as currency
        if (target >= 1e12) {
          el.textContent = '$' + (val / 1e12).toFixed(2) + 'T';
        } else if (target >= 1e9) {
          el.textContent = '$' + (val / 1e9).toFixed(2) + 'B';
        } else {
          el.textContent = '$' + val.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }

        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   ENTRANCE ANIMATIONS
   ══════════════════════════════════════════════ */
function initEntranceAnimations() {
  const cards = $$('.card');
  cards.forEach(c => c.classList.add('entrance'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger by index
      const allCards = Array.from($$('.card.entrance'));
      const idx = allCards.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

/* ══════════════════════════════════════════════
   LIVE PRICE UPDATES
   ══════════════════════════════════════════════ */
function startLivePrices() {
  setInterval(() => {
    COINS.forEach(coin => {
      // Apply tiny random delta
      const delta = coin.price * (Math.random() - 0.495) * 0.003;
      coin.price = Math.max(0.0001, coin.price + delta);

      // Update market table price cell
      const priceCell = $(`[data-id="${coin.id}-price"]`);
      if (priceCell) {
        const isUp = delta >= 0;
        priceCell.textContent = fmtPrice(coin.price);
        priceCell.classList.remove('tick-up', 'tick-down');
        // Force reflow to restart animation
        void priceCell.offsetWidth;
        priceCell.classList.add(isUp ? 'tick-up' : 'tick-down');
      }

      // Update ticker strip
      const tickerEls = document.querySelectorAll(`[data-ticker-id="${coin.id}"]`);
      tickerEls.forEach(el => {
        el.textContent = fmtPrice(coin.price);
      });
    });
  }, 4000);
}

/* ══════════════════════════════════════════════
   MARKET FILTER & SEARCH
   ══════════════════════════════════════════════ */
function initMarketFilters() {
  const searchInput = $('#marketSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderMarketTable());
  }

  $$('.f-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.f-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMarketTable();
    });
  });
}

/* ══════════════════════════════════════════════
   TIME TABS
   ══════════════════════════════════════════════ */
function initTimeTabs() {
  $$('.t-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active within the parent card
      const parentCard = tab.closest('.card');
      if (parentCard) {
        parentCard.querySelectorAll('.t-tab').forEach(t => t.classList.remove('active'));
      }
      tab.classList.add('active');
      // Future: re-render chart with different period
    });
  });
}

/* ══════════════════════════════════════════════
   WALLET ADDRESS COPY
   ══════════════════════════════════════════════ */
function initWalletCopy() {
  const pill = $('.wallet-pill');
  if (!pill) return;

  pill.addEventListener('click', () => {
    const addr = '0x7f3b...220F';
    navigator.clipboard.writeText(addr).then(() => {
      const copyEl = pill.querySelector('.wallet-copy');
      if (copyEl) {
        const original = copyEl.innerHTML;
        copyEl.innerHTML = '<i class="bi bi-check"></i>';
        copyEl.style.color = 'var(--positive)';
        setTimeout(() => {
          copyEl.innerHTML = original;
          copyEl.style.color = '';
        }, 1500);
      }
    }).catch(() => {
      // Fallback: select wallet addr text
      const range = document.createRange();
      range.selectNode(pill);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    });
  });
}

/* ══════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════ */
function init() {
  initTheme();
  initClock();
  initNavigation();
  initTicker();

  // Render data into DOM
  renderAssetTable('trendingTable', TRENDING_IDS, TRENDING_RANKS);
  renderAssetTable('moversTable', MOVERS_IDS, MOVERS_RANKS);
  renderMarketTable();
  renderActivity();
  renderPortfolioLegend();
  renderSentimentBars();

  // Mini charts (SVG)
  buildMiniBarsSVG('mcapBars');
  buildMiniAreaSVG('volArea');

  // Market filter + time tab listeners
  initMarketFilters();
  initTimeTabs();

  // Wallet copy
  initWalletCopy();

  // ApexCharts — staggered initialization
  initBTCDomChart();

  setTimeout(() => {
    initCandlestickChart();
    initAreaChart();
  }, 100);

  setTimeout(() => {
    initPortfolioDonut();
    initFearGreedGauge();
    // Sync all charts to the active theme once fully initialized
    const activeTheme = document.body.getAttribute('data-theme') || 'dark';
    if (activeTheme === 'light') updateChartsTheme('light');
  }, 200);

  // Entrance animations + tilt
  initEntranceAnimations();
  initTiltEffect();

  // Counter animation
  animateCounters();

  // Live price updates
  startLivePrices();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
