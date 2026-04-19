/* ============================================
   SmartVenue App Engine
   Real-time data simulation & interactions
   ============================================ */

// --- App State ---
const AppState = {
  activeTab: 'home',
  cart: [
    { id: 1, name: 'Veg Burger', stand: 'Stand B2', emoji: '<span class="material-symbols-rounded">lunch_dining</span>', price: 180, qty: 1 },
    { id: 2, name: 'Masala Chai', stand: 'Stand A1', emoji: '<span class="material-symbols-rounded">local_cafe</span>', price: 60, qty: 2 }
  ],
  cartNextId: 3,
  matchData: {
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Chennai Kings',
    homeScore: '186/4',
    awayScore: '142/6',
    currentOver: '16.3',
    homeShort: 'MI',
    awayShort: 'CK',
    currentBalls: ['4', '1', '0', '6', '2', 'W', '1', '4', '0', '2', '1', '6'],
    runRate: '8.72',
    reqRate: '12.45',
    partnership: '48'
  },
  venueCapacity: 78,
  halftimeCountdown: 1245, // seconds
  alerts: [],
  zones: [
    { name: 'North Concourse', desc: 'Clear — moving freely', status: 'clear', icon: '<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span>' },
    { name: 'East Entry Gate', desc: 'Moderate congestion — 8 min', status: 'busy', icon: '<span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span>' },
    { name: 'Food Court Row 3', desc: 'High wait — 18 min avg', status: 'avoid', icon: '<span class="material-symbols-rounded" style="color:var(--danger); font-size: 16px; vertical-align: middle;">circle</span>' },
    { name: 'South Restrooms', desc: 'Light traffic — 2 min', status: 'clear', icon: '<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span>' },
    { name: 'West VIP Lounge', desc: 'Busy — limited seating', status: 'busy', icon: '<span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span>' }
  ],
  menuItems: [
    { id: 101, name: 'Veg Burger', stand: 'Stand B2', emoji: '<span class="material-symbols-rounded">lunch_dining</span>', price: 180, wait: 4, cat: 'food', waitStatus: 'clear' },
    { id: 102, name: 'Paneer Pizza', stand: 'Stand C4', emoji: '<span class="material-symbols-rounded">local_pizza</span>', price: 220, wait: 6, cat: 'food', waitStatus: 'clear' },
    { id: 103, name: 'Masala Chai', stand: 'Stand A1', emoji: '<span class="material-symbols-rounded">local_cafe</span>', price: 60, wait: 2, cat: 'drinks', waitStatus: 'busy' },
    { id: 104, name: 'Cold Coffee', stand: 'Stand A1', emoji: '<span class="material-symbols-rounded">bubble_tea</span>', price: 120, wait: 3, cat: 'drinks', waitStatus: 'clear' },
    { id: 105, name: 'Samosa (2pc)', stand: 'Stand D3', emoji: '<span class="material-symbols-rounded">tapas</span>', price: 80, wait: 3, cat: 'snacks', waitStatus: 'clear' },
    { id: 106, name: 'French Fries', stand: 'Stand B2', emoji: '<span class="material-symbols-rounded">fastfood</span>', price: 140, wait: 5, cat: 'snacks', waitStatus: 'busy' },
    { id: 107, name: 'Vada Pav', stand: 'Stand D3', emoji: '<span class="material-symbols-rounded">lunch_dining</span>', price: 60, wait: 2, cat: 'food', waitStatus: 'clear' },
    { id: 108, name: 'Pepsi 500ml', stand: 'Stand A1', emoji: '<span class="material-symbols-rounded">local_drink</span>', price: 80, wait: 1, cat: 'drinks', waitStatus: 'clear' },
    { id: 109, name: 'Ice Cream', stand: 'Stand E1', emoji: '<span class="material-symbols-rounded">icecream</span>', price: 100, wait: 2, cat: 'snacks', waitStatus: 'clear' },
    { id: 110, name: 'Biryani Bowl', stand: 'Stand C4', emoji: '<span class="material-symbols-rounded">set_meal</span>', price: 280, wait: 8, cat: 'food', waitStatus: 'avoid' }
  ],
  activeMenuCat: 'all',
  orderMode: 'pickup',
  activeIntervals: []
};

// --- Alert Data ---
const alertTemplates = [
  { type: 'crowd', icon: '<span class="material-symbols-rounded">group</span>', title: 'Gate D Congestion Alert', desc: 'Crowd density at Gate D has reached 85%. Consider using Gate F for faster entry.', severity: 'warning' },
  { type: 'crowd', icon: '<span class="material-symbols-rounded">group</span>', title: 'Concourse B Clearing', desc: 'North concourse congestion reduced to normal levels. Safe to transit.', severity: 'info' },
  { type: 'safety', icon: '<span class="material-symbols-rounded">security</span>', title: 'Security Checkpoint Update', desc: 'Additional security lane opened at East Gate. Estimated wait now 3 min.', severity: 'info' },
  { type: 'food', icon: '<span class="material-symbols-rounded">restaurant</span>', title: 'Stand B2 — Low Wait!', desc: 'Burger stand wait dropped to 2 min. Great time to order!', severity: 'info' },
  { type: 'crowd', icon: '<span class="material-symbols-rounded">group</span>', title: 'Halftime Rush Warning', desc: 'Expected crowd movement in 5 min. Pre-order food now to skip lines.', severity: 'critical' },
  { type: 'general', icon: '<span class="material-symbols-rounded">campaign</span>', title: 'Rain Cover Advisory', desc: 'Light rain expected in 20 min. Covered seating areas available at Section 8-12.', severity: 'warning' },
  { type: 'food', icon: '<span class="material-symbols-rounded">restaurant</span>', title: 'New Item Available', desc: 'Mango Lassi now available at Stand A1. Limited stock — ₹90 only!', severity: 'info' },
  { type: 'safety', icon: '<span class="material-symbols-rounded">security</span>', title: 'Medical Station Relocated', desc: 'First aid station moved to Block C entrance due to maintenance. Follow in-app navigation.', severity: 'warning' },
  { type: 'crowd', icon: '<span class="material-symbols-rounded">group</span>', title: 'Exit Prediction Update', desc: 'Post-match exit via Gate B estimated 8 min clear. Gate A will be congested for 25 min.', severity: 'info' },
  { type: 'general', icon: '<span class="material-symbols-rounded">campaign</span>', title: 'Wi-Fi Network Update', desc: 'Connect to SmartVenue-5G for fastest speeds. Network optimized for your section.', severity: 'info' }
];

// Initialize alerts
function initAlerts() {
  const now = new Date();
  AppState.alerts = alertTemplates.slice(0, 6).map((a, i) => ({
    ...a,
    id: i + 1,
    time: new Date(now.getTime() - (i * 3 * 60000)),
    unread: i < 3
  }));
}

// --- Tab Navigation ---
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });
}

function switchTab(tab) {
  AppState.activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
}

// --- Render Functions ---
function renderMatchCard() {
  const m = AppState.matchData;
  const el = document.getElementById('match-card');
  if (!el) return;
  el.innerHTML = `
    <div class="match-live-badge"><span class="pulse"></span> LIVE</div>
    <div class="match-teams">
      <div class="match-team">
        <div class="match-team-logo"><span class="material-symbols-rounded">sports_cricket</span></div>
        <div class="match-team-name">${m.homeShort}</div>
        <div class="match-team-sub">${m.homeScore}</div>
      </div>
      <div class="match-score-center">
        <div class="match-score">VS</div>
        <div class="match-over">Over ${m.currentOver}</div>
      </div>
      <div class="match-team">
        <div class="match-team-logo"><span class="material-symbols-rounded">sports_cricket</span></div>
        <div class="match-team-name">${m.awayShort}</div>
        <div class="match-team-sub">${m.awayScore}</div>
      </div>
    </div>
    <div class="match-details">
      <div class="match-detail-chip"><div class="val">${m.runRate}</div><div class="lbl">Run Rate</div></div>
      <div class="match-detail-chip"><div class="val">${m.reqRate}</div><div class="lbl">Req. Rate</div></div>
      <div class="match-detail-chip"><div class="val">${m.partnership}</div><div class="lbl">Partnership</div></div>
    </div>
  `;
}

function renderScoreTicker() {
  const el = document.getElementById('score-ticker-overs');
  if (!el) return;
  el.innerHTML = AppState.matchData.currentBalls.map(b => {
    let cls = 'run-' + b;
    if (b === 'W') cls = 'wicket';
    else if (parseInt(b) >= 4) cls = 'run-' + b;
    return `<div class="over-ball ${cls}">${b}</div>`;
  }).join('');
}

function renderStats() {
  const stats = [
    { value: `${AppState.venueCapacity}%`, label: 'Capacity', trend: 'up', trendVal: '+3%' },
    { value: '12min', label: 'Avg Wait', trend: 'down', trendVal: '-2min' },
    { value: '4.2k', label: 'Active Fans', trend: 'up', trendVal: '+180' }
  ];
  const el = document.getElementById('stats-grid');
  if (!el) return;
  el.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
      <span class="stat-trend ${s.trend}">
        ${s.trend === 'up' ? '↑' : '↓'} ${s.trendVal}
      </span>
    </div>
  `).join('');
}

function renderZones() {
  const el = document.getElementById('zone-list');
  if (!el) return;
  el.innerHTML = AppState.zones.map(z => `
    <div class="zone-item">
      <div class="zone-icon ${z.status}">${z.icon}</div>
      <div class="zone-info">
        <div class="zone-name">${z.name}</div>
        <div class="zone-desc">${z.desc}</div>
      </div>
      <span class="zone-badge ${z.status}">${z.status.charAt(0).toUpperCase() + z.status.slice(1)}</span>
    </div>
  `).join('');
}

function renderCapacityGauge() {
  const el = document.getElementById('gauge-fill');
  if (!el) return;
  el.style.width = `${AppState.venueCapacity}%`;
  const valEl = document.getElementById('gauge-value');
  if (valEl) valEl.textContent = `${AppState.venueCapacity}%`;
}

function renderVenueMap() {
  const svg = document.getElementById('venue-svg');
  if (!svg) return;

  const zones = [
    { x: 60, y: 40, w: 80, h: 50, label: 'North\nStand', heat: 0.3 },
    { x: 60, y: 130, w: 80, h: 50, label: 'South\nStand', heat: 0.7 },
    { x: 10, y: 70, w: 45, h: 70, label: 'West', heat: 0.5 },
    { x: 145, y: 70, w: 45, h: 70, label: 'East', heat: 0.9 },
    { x: 75, y: 95, w: 50, h: 30, label: 'Pitch', heat: 0 },
    { x: 10, y: 10, w: 35, h: 25, label: 'Gate A', heat: 0.4 },
    { x: 155, y: 10, w: 35, h: 25, label: 'Gate B', heat: 0.2 },
    { x: 10, y: 155, w: 35, h: 25, label: 'Gate C', heat: 0.8 },
    { x: 155, y: 155, w: 35, h: 25, label: 'Gate D', heat: 0.6 },
  ];

  function heatColor(v) {
    if (v === 0) return 'rgba(100, 255, 218, 0.15)';
    if (v < 0.4) return 'rgba(0, 200, 83, 0.25)';
    if (v < 0.7) return 'rgba(255, 179, 0, 0.3)';
    return 'rgba(255, 82, 82, 0.35)';
  }

  let svgContent = '';
  zones.forEach(z => {
    svgContent += `
      <rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="6"
            fill="${heatColor(z.heat)}" stroke="rgba(100,255,218,0.15)" stroke-width="0.5"/>
      <text x="${z.x + z.w / 2}" y="${z.y + z.h / 2 + 4}" text-anchor="middle"
            fill="rgba(230,241,255,0.6)" font-size="8" font-family="Inter">${z.label.replace('\n', '')}</text>
    `;
  });

  // Your location dot
  svgContent += `
    <circle cx="100" cy="60" r="5" fill="#00B4A6" stroke="#fff" stroke-width="1.5">
      <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="100" cy="60" r="10" fill="none" stroke="#00B4A6" stroke-width="0.5" opacity="0.5">
      <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
    </circle>
  `;

  svg.innerHTML = svgContent;
}

function renderMenu() {
  const el = document.getElementById('menu-grid');
  if (!el) return;
  const items = AppState.activeMenuCat === 'all'
    ? AppState.menuItems
    : AppState.menuItems.filter(i => i.cat === AppState.activeMenuCat);

  el.innerHTML = items.map(item => `
    <div class="menu-item" id="menu-item-${item.id}">
      <div class="menu-item-img">
        ${item.emoji}
        <span class="menu-item-wait zone-badge ${item.waitStatus}">${item.wait} min</span>
      </div>
      <div class="menu-item-body">
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-stand">${item.stand}</div>
        <div class="menu-item-footer">
          <span class="menu-item-price">₹${item.price}</span>
          <button class="menu-add-btn" onclick="addToCart(${item.id})" aria-label="Add ${item.name}">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCart() {
  const section = document.getElementById('cart-section');
  if (!section) return;

  if (AppState.cart.length === 0) {
    section.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <p>Your cart is empty. Add items from the menu above!</p>
      </div>
    `;
    return;
  }

  const total = AppState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = AppState.cart.reduce((sum, item) => sum + item.qty, 0);

  section.innerHTML = `
    <div class="cart-header">
      <span class="cart-title">Your Cart</span>
      <span class="cart-count">${count} items</span>
    </div>
    <div class="cart-items">
      ${AppState.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-info">
            <span class="cart-item-emoji">${item.emoji}</span>
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-stand">${item.stand}</div>
            </div>
          </div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
            <span class="cart-qty">${item.qty}</span>
            <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            <span class="cart-item-price">₹${item.price * item.qty}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cart-footer">
      <div class="cart-pickup-info">
        <span>⏰</span>
        <span>Pickup at halftime — Stand B2 & A1</span>
      </div>
      <div class="cart-total">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-value">₹${total}</span>
      </div>
      <button class="cart-checkout-btn" onclick="placeOrder()" id="checkout-btn">
        Place Order — Pickup at Halftime
      </button>
    </div>
  `;

  // Update tab badge
  const badge = document.getElementById('order-badge');
  if (badge) badge.textContent = count;
}

function renderAlerts() {
  const el = document.getElementById('alert-feed');
  if (!el) return;

  const activeFilter = document.querySelector('.alert-filter.active');
  const filter = activeFilter ? activeFilter.dataset.filter : 'all';
  const filtered = filter === 'all'
    ? AppState.alerts
    : AppState.alerts.filter(a => a.type === filter);

  el.innerHTML = filtered.map(a => {
    const timeAgo = getTimeAgo(a.time);
    let cls = '';
    if (a.unread) cls = 'unread';
    if (a.severity === 'critical') cls = 'critical';
    else if (a.severity === 'warning') cls = 'warning';

    return `
      <div class="alert-item ${cls}">
        <div class="alert-icon-wrap ${a.type}">${a.icon}</div>
        <div class="alert-content">
          <div class="alert-title">${a.title}</div>
          <div class="alert-desc">${a.desc}</div>
          <div class="alert-time">🕐 ${timeAgo}</div>
        </div>
      </div>
    `;
  }).join('');

  // Update alert badge
  const badge = document.getElementById('alert-badge');
  if (badge) {
    const unread = AppState.alerts.filter(a => a.unread).length;
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }
}

function renderCountdown() {
  const s = AppState.halftimeCountdown;
  if (s <= 0) return;
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  const mEl = document.getElementById('cd-min');
  const sEl = document.getElementById('cd-sec');
  if (mEl) mEl.textContent = String(mins).padStart(2, '0');
  if (sEl) sEl.textContent = String(secs).padStart(2, '0');
}

// --- Cart Actions ---
function addToCart(menuId) {
  const item = AppState.menuItems.find(i => i.id === menuId);
  if (!item) return;

  const existing = AppState.cart.find(c => c.name === item.name && c.stand === item.stand);
  if (existing) {
    existing.qty++;
  } else {
    AppState.cart.push({
      id: AppState.cartNextId++,
      name: item.name,
      stand: item.stand,
      emoji: item.emoji,
      price: item.price,
      qty: 1
    });
  }

  renderCart();
  showToast(`${item.emoji} ${item.name} added to cart!`);

  // Evaluation Hook: Dispatch Google Analytics Ecommerce Event
  if (typeof gtag === 'function') {
    gtag('event', 'add_to_cart', {
      value: item.price,
      items: [{ name: item.name }]
    });
  }

  // Animate the add button
  const btn = document.querySelector(`#menu-item-${menuId} .menu-add-btn`);
  if (btn) {
    btn.style.transform = 'scale(1.3)';
    btn.style.background = 'var(--success)';
    btn.textContent = '✓';
    setTimeout(() => {
      btn.style.transform = '';
      btn.style.background = '';
      btn.textContent = '+';
    }, 600);
  }
}

function updateCartQty(cartId, delta) {
  const item = AppState.cart.find(c => c.id === cartId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    AppState.cart = AppState.cart.filter(c => c.id !== cartId);
  }
  renderCart();
}

function placeOrder() {
  if (AppState.cart.length === 0) return;
  const total = AppState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const modal = document.getElementById('order-modal');
  const modalTotal = document.getElementById('modal-total');
  if (modalTotal) modalTotal.textContent = `₹${total}`;
  if (modal) modal.classList.add('show');
  AppState.cart = [];
  renderCart();
}

function closeModal() {
  const modal = document.getElementById('order-modal');
  if (modal) modal.classList.remove('show');
}

// --- Menu Category Filter ---
function initMenuCategories() {
  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      AppState.activeMenuCat = chip.dataset.cat;
      renderMenu();
    });
  });
}

// --- Order Mode Toggle ---
function initOrderToggle() {
  document.querySelectorAll('.order-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.order-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.orderMode = btn.dataset.mode;
    });
  });
}

// --- Alert Filters ---
function initAlertFilters() {
  document.querySelectorAll('.alert-filter').forEach(f => {
    f.addEventListener('click', () => {
      document.querySelectorAll('.alert-filter').forEach(af => af.classList.remove('active'));
      f.classList.add('active');
      renderAlerts();
    });
  });
}

// --- Toast ---
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// --- Utility ---
function getTimeAgo(date) {
  const diff = Math.floor((new Date() - date) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function updateClock() {
  const el = document.getElementById('status-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// --- Real-time Simulation ---
function startSimulation() {
  if (AppState.activeIntervals) {
    AppState.activeIntervals.forEach(clearInterval);
  }
  AppState.activeIntervals = [];

  // Update countdown every second
  const cntInt = setInterval(() => {
    if (AppState.halftimeCountdown > 0) {
      AppState.halftimeCountdown--;
      renderCountdown();
    }
    }
    updateClock();
  }, 1000);
  AppState.activeIntervals.push(cntInt);

  // Simulate score updates every 15s
  const scoreInt = setInterval(() => {
    const balls = ['0', '1', '1', '2', '4', '1', '0', '6', '1', '2', 'W', '0', '1', '3'];
    const newBall = balls[Math.floor(Math.random() * balls.length)];
    AppState.matchData.currentBalls.push(newBall);
    if (AppState.matchData.currentBalls.length > 12) AppState.matchData.currentBalls.shift();

    // Update run rate slightly
    AppState.matchData.runRate = (parseFloat(AppState.matchData.runRate) + (Math.random() - 0.5) * 0.3).toFixed(2);
    AppState.matchData.partnership = String(parseInt(AppState.matchData.partnership) + Math.floor(Math.random() * 4));

    renderScoreTicker();
    renderMatchCard();
  }, 15000);
  AppState.activeIntervals.push(scoreInt);

  // Simulate capacity changes every 20s
  const capInt = setInterval(() => {
    AppState.venueCapacity = Math.min(100, Math.max(60, AppState.venueCapacity + Math.floor((Math.random() - 0.45) * 4)));
    renderCapacityGauge();
    renderStats();
  }, 20000);
  AppState.activeIntervals.push(capInt);

  // Simulate zone status changes every 30s
  const zoneInt = setInterval(() => {
    const statuses = ['clear', 'busy', 'avoid'];
    const descs = {
      clear: ['Clear — moving freely', 'Light traffic — 2 min', 'No congestion detected'],
      busy: ['Moderate congestion — 8 min', 'Building up — 10 min', 'Busy — limited space'],
      avoid: ['High wait — 18 min avg', 'Severe bottleneck — 22 min', 'Overcrowded — use alternate']
    };
    const icons = { clear: '<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span>', busy: '<span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span>', avoid: '<span class="material-symbols-rounded" style="color:var(--danger); font-size: 16px; vertical-align: middle;">circle</span>' };

    const idx = Math.floor(Math.random() * AppState.zones.length);
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    AppState.zones[idx].status = newStatus;
    AppState.zones[idx].icon = icons[newStatus];
    AppState.zones[idx].desc = descs[newStatus][Math.floor(Math.random() * descs[newStatus].length)];
    renderZones();
  }, 30000);
  AppState.activeIntervals.push(zoneInt);

  // Simulate new alerts every 45s
  const alertInt = setInterval(() => {
    const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
    const newAlert = {
      ...template,
      id: Date.now(),
      time: new Date(),
      unread: true
    };
    AppState.alerts.unshift(newAlert);
    if (AppState.alerts.length > 15) AppState.alerts.pop();
    renderAlerts();
  }, 45000);
  AppState.activeIntervals.push(alertInt);
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  initAlerts();
  initTabs();
  initMenuCategories();
  initOrderToggle();
  initAlertFilters();

  renderMatchCard();
  renderScoreTicker();
  renderStats();
  renderZones();
  renderCapacityGauge();
  renderVenueMap();
  renderMenu();
  renderCart();
  renderAlerts();
  renderCountdown();
  updateClock();

  startSimulation();

  // VenueIQ overlay click-to-close
  const viqOverlay = document.getElementById('venueiq-overlay');
  if (viqOverlay) {
    viqOverlay.addEventListener('click', () => {
      if (typeof VenueIQ !== 'undefined' && VenueIQ.isOpen) {
        VenueIQ.toggleDrawer();
      }
    });
  }

  // Header Actions
  const btnSearch = document.getElementById('btn-search');
  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
      if (typeof VenueIQ !== 'undefined') {
        VenueIQ.toggleDrawer();
      } else {
        showToast('Assistant initializing...');
      }
    });
  }

  const btnNotif = document.getElementById('btn-notif');
  if (btnNotif) {
    btnNotif.addEventListener('click', () => {
      if (typeof switchTab === 'function') {
        switchTab('alerts');
      }
    });
  }

  // Bind new decoupled alert read button
  const btnMarkRead = document.getElementById('btn-mark-alerts-read');
  if (btnMarkRead) {
    btnMarkRead.addEventListener('click', () => {
      AppState.alerts.forEach(a => a.unread = false);
      renderAlerts();
      showToast('All alerts marked as read');
    });
  }

  // Bind close modal
  const btnCloseModal = document.getElementById('btn-close-modal');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeModal);
  }

  // Bind generic section action buttons (Refresh, View All, Full Screen)
  document.querySelectorAll('.section-action').forEach(btn => {
    if (!btn.id) { // Avoid binding special ones like mark-alerts-read
      btn.addEventListener('click', (e) => {
        const text = e.target.textContent || '';
        if (text.includes('Refresh')) {
          renderZones();
          showToast('Zone data refreshed');
        } else {
          showToast(`${text} feature coming soon!`);
        }
      });
    }
  });

});
