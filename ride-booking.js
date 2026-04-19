/**
 * @fileoverview SmartVenue — Ride Booking Integration Module
 * @description Modular cab booking component for Uber, Rapido, and Ola.
 * Drop into any frontend project. Zero backend, zero APIs.
 * @version 1.0.0
 */

"use strict";

/* ─── Configuration ─────────────────────────────────────── */

/**
 * @typedef {Object} RideService
 * @property {string} id       - Unique service identifier
 * @property {string} name     - Display name
 * @property {string} logo     - Emoji or SVG icon
 * @property {number} price    - Estimated fare in INR
 * @property {number} eta      - Estimated time in minutes
 * @property {string} color    - Brand/accent color (hex)
 * @property {string} buildUrl - Function returning the deep-link URL
 */

/** @type {RideService[]} */
const RIDE_SERVICES = [
  {
    id: 'uber',
    name: 'Uber',
    logo: '⚫',
    price: 250,
    eta: 15,
    color: '#000000',
    buildUrl: (lat, lng) =>
      `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&dropoff[nickname]=Wankhede+Stadium`
  },
  {
    id: 'rapido',
    name: 'Rapido',
    logo: '🟡',
    price: 120,
    eta: 10,
    color: '#FFCB05',
    buildUrl: (lat, lng) =>
      `https://rapido.bike/?lat=${lat}&lng=${lng}`
  },
  {
    id: 'ola',
    name: 'Ola',
    logo: '🟢',
    price: 230,
    eta: 14,
    color: '#2CC56F',
    buildUrl: () => 'olacabs://app/launch'
  }
];

/* ─── Core Logic ────────────────────────────────────────── */

/**
 * Books a ride with the given service.
 * Handles deep-linking for Uber, Rapido, and Ola.
 * Falls back gracefully if app URL scheme is unsupported.
 *
 * @param {string} serviceId - One of: 'uber' | 'rapido' | 'ola'
 * @param {number} lat       - Drop-off latitude
 * @param {number} lng       - Drop-off longitude
 */
function bookRide(serviceId, lat, lng) {
  const service = RIDE_SERVICES.find(s => s.id === serviceId);
  if (!service) return;

  // Track in GA4
  if (typeof gtag === 'function') {
    gtag('event', 'ride_booked', { service: serviceId, destination_lat: lat, destination_lng: lng });
  }

  if (serviceId === 'ola') {
    // Ola uses an app URL scheme — detect support via iFrame trick
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'olacabs://app/launch';
    document.body.appendChild(iframe);
    setTimeout(() => {
      document.body.removeChild(iframe);
      // If we're still on the page, app didn't open — show fallback
      RideBookingUI.showOlaFallback();
    }, 1500);
  } else {
    window.open(service.buildUrl(lat, lng), '_blank', 'noopener,noreferrer');
  }
}

/* ─── UI Module ─────────────────────────────────────────── */

const RideBookingUI = {
  /** Destination coordinates — override from your app's data */
  destLat: 18.9387,  // Wankhede Stadium, Mumbai
  destLng: 72.8257,

  /** Injects CSS into <head> once */
  _stylesInjected: false,

  injectStyles() {
    if (this._stylesInjected) return;
    this._stylesInjected = true;
    const style = document.createElement('style');
    style.textContent = `
      /* ── Ride Booking Trigger Button ── */
      .ride-trigger-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 14px 18px;
        background: linear-gradient(135deg, #1a2d4a, #0d1b2a);
        border: 1px solid rgba(0, 180, 166, 0.25);
        border-radius: 14px;
        color: #cdd9f0;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 12px;
        text-align: left;
      }
      .ride-trigger-btn:hover {
        background: linear-gradient(135deg, #1e3555, #112240);
        border-color: rgba(0, 180, 166, 0.5);
        box-shadow: 0 4px 20px rgba(0, 180, 166, 0.12);
        transform: translateY(-1px);
      }
      .ride-trigger-btn .rtb-icon {
        width: 36px; height: 36px;
        background: linear-gradient(135deg, #00B4A6, #009688);
        border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
      }
      .ride-trigger-btn .rtb-arrow {
        margin-left: auto;
        color: #00B4A6;
        font-size: 18px;
      }

      /* ── Modal Overlay ── */
      .ride-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(6, 13, 22, 0.85);
        backdrop-filter: blur(6px);
        z-index: 5000;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .ride-modal-overlay.open {
        opacity: 1;
        pointer-events: all;
      }

      /* ── Bottom Sheet ── */
      .ride-modal {
        width: 100%;
        max-width: 480px;
        background: #0D1B2A;
        border-radius: 24px 24px 0 0;
        padding: 0 0 32px;
        transform: translateY(100%);
        transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
        border-top: 1px solid rgba(255,255,255,0.08);
      }
      .ride-modal-overlay.open .ride-modal {
        transform: translateY(0);
      }

      /* ── Modal Header ── */
      .ride-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px 16px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .ride-modal-header h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        color: #E6F1FF;
        font-family: 'Inter', sans-serif;
      }
      .ride-modal-dest {
        font-size: 11px;
        color: #5A6480;
        margin-top: 2px;
        font-family: 'Inter', sans-serif;
      }
      .ride-modal-close {
        width: 32px; height: 32px;
        background: rgba(255,255,255,0.06);
        border: none;
        border-radius: 50%;
        color: #5A6480;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
        transition: background 0.2s;
      }
      .ride-modal-close:hover { background: rgba(255,255,255,0.12); color: #E6F1FF; }

      /* ── Drag Handle ── */
      .ride-drag-handle {
        width: 36px; height: 4px;
        background: rgba(255,255,255,0.12);
        border-radius: 2px;
        margin: 12px auto 0;
      }

      /* ── Ride Cards ── */
      .ride-cards {
        padding: 16px 16px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .ride-card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        background: #112240;
        border-radius: 14px;
        border: 1.5px solid rgba(255,255,255,0.06);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }
      .ride-card:hover {
        border-color: rgba(0, 180, 166, 0.35);
        box-shadow: 0 4px 16px rgba(0, 180, 166, 0.08);
        transform: translateY(-1px);
      }
      .ride-card.cheapest { border-color: rgba(0, 180, 166, 0.4); }
      .ride-card.fastest  { border-color: rgba(255, 203, 5, 0.4); }

      /* Accent line on left */
      .ride-card::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 3px;
        background: var(--rc-color, transparent);
        border-radius: 14px 0 0 14px;
      }

      .ride-logo {
        width: 42px; height: 42px;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px;
        background: rgba(255,255,255,0.05);
        flex-shrink: 0;
      }
      .ride-info { flex: 1; min-width: 0; }
      .ride-name {
        font-size: 15px;
        font-weight: 700;
        color: #E6F1FF;
        font-family: 'Inter', sans-serif;
      }
      .ride-meta {
        font-size: 12px;
        color: #5A6480;
        font-family: 'Inter', sans-serif;
        margin-top: 2px;
      }
      .ride-badges {
        display: flex;
        gap: 5px;
        margin-top: 6px;
        flex-wrap: wrap;
      }
      .ride-badge {
        font-size: 10px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 99px;
        font-family: 'Inter', sans-serif;
        letter-spacing: 0.3px;
      }
      .ride-badge.cheapest { background: rgba(0, 180, 166, 0.15); color: #00D4C4; border: 1px solid rgba(0,180,166,0.3); }
      .ride-badge.fastest  { background: rgba(255, 203, 5, 0.15);  color: #FFCB05; border: 1px solid rgba(255,203,5,0.3); }

      .ride-price-col { text-align: right; flex-shrink: 0; }
      .ride-price {
        font-size: 16px;
        font-weight: 700;
        color: #E6F1FF;
        font-family: 'Inter', sans-serif;
      }
      .ride-eta {
        font-size: 11px;
        color: #5A6480;
        font-family: 'Inter', sans-serif;
        margin-top: 2px;
      }

      /* ── Ola Fallback Toast ── */
      .ola-fallback {
        margin: 16px 16px 0;
        padding: 12px 16px;
        background: rgba(44, 197, 111, 0.1);
        border: 1px solid rgba(44, 197, 111, 0.25);
        border-radius: 12px;
        color: #2CC56F;
        font-size: 13px;
        font-family: 'Inter', sans-serif;
        display: none;
        align-items: center;
        gap: 10px;
      }
      .ola-fallback.visible { display: flex; }
      .ola-fallback span { font-size: 20px; }

      /* ── Disclaimer ── */
      .ride-disclaimer {
        padding: 14px 20px 0;
        font-size: 10px;
        color: rgba(90, 100, 128, 0.7);
        font-family: 'Inter', sans-serif;
        text-align: center;
      }
    `;
    document.head.appendChild(style);
  },

  /** Creates and injects the modal DOM once */
  init() {
    this.injectStyles();

    // Don't double-init
    if (document.getElementById('ride-modal-overlay')) return;

    const minPrice = Math.min(...RIDE_SERVICES.map(s => s.price));
    const minEta   = Math.min(...RIDE_SERVICES.map(s => s.eta));

    const cards = RIDE_SERVICES.map(service => {
      const isCheapest = service.price === minPrice;
      const isFastest  = service.eta === minEta;
      const cardClass  = isCheapest ? 'cheapest' : isFastest ? 'fastest' : '';
      const badges     = [
        isCheapest ? `<span class="ride-badge cheapest">💰 Cheapest</span>` : '',
        isFastest  ? `<span class="ride-badge fastest">⚡ Fastest</span>`  : ''
      ].join('');

      return `
        <div class="ride-card ${cardClass}" data-service="${service.id}"
             style="--rc-color:${service.color}"
             role="button" tabindex="0"
             aria-label="Book ${service.name} — ₹${service.price}, ${service.eta} min">
          <div class="ride-logo">${service.logo}</div>
          <div class="ride-info">
            <div class="ride-name">${service.name}</div>
            <div class="ride-meta">Estimated fare • via Wankhede Gate B</div>
            <div class="ride-badges">${badges}</div>
          </div>
          <div class="ride-price-col">
            <div class="ride-price">₹${service.price}</div>
            <div class="ride-eta">${service.eta} min</div>
          </div>
        </div>`;
    }).join('');

    const html = `
      <div class="ride-modal-overlay" id="ride-modal-overlay" role="dialog"
           aria-modal="true" aria-label="Book a Ride">
        <div class="ride-modal" id="ride-modal">
          <div class="ride-drag-handle"></div>
          <div class="ride-modal-header">
            <div>
              <h2>🚖 Book a Ride</h2>
              <div class="ride-modal-dest">📍 Drop-off: Wankhede Stadium, Mumbai</div>
            </div>
            <button class="ride-modal-close" id="ride-modal-close"
                    aria-label="Close ride booking">✕</button>
          </div>
          <div class="ride-cards">${cards}</div>
          <div class="ola-fallback" id="ola-fallback">
            <span>🟢</span>
            <div>Please open the <strong>Ola app</strong> manually and search for <strong>Wankhede Stadium</strong> as your destination.</div>
          </div>
          <div class="ride-disclaimer">
            Prices are estimated. Final fare may vary by traffic & surge pricing.
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', html);
    this._bindEvents();
  },

  /** Binds all modal event listeners */
  _bindEvents() {
    const overlay = document.getElementById('ride-modal-overlay');
    const closeBtn = document.getElementById('ride-modal-close');

    // Close on overlay click or close button
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });
    closeBtn.addEventListener('click', () => this.close());

    // Keyboard close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    // Ride card clicks
    overlay.querySelectorAll('.ride-card').forEach(card => {
      const handler = () => {
        const serviceId = card.dataset.service;
        bookRide(serviceId, this.destLat, this.destLng);
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
      });
    });
  },

  /** Opens the ride booking modal */
  open(lat, lng) {
    if (lat !== undefined) this.destLat = lat;
    if (lng !== undefined) this.destLng = lng;
    this.hideOlaFallback();
    const overlay = document.getElementById('ride-modal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      // Trap focus to modal
      document.getElementById('ride-modal-close').focus();
    }
  },

  /** Closes the modal */
  close() {
    const overlay = document.getElementById('ride-modal-overlay');
    if (overlay) overlay.classList.remove('open');
  },

  /** Shows the Ola fallback message */
  showOlaFallback() {
    const el = document.getElementById('ola-fallback');
    if (el) el.classList.add('visible');
  },

  /** Hides the Ola fallback message */
  hideOlaFallback() {
    const el = document.getElementById('ola-fallback');
    if (el) el.classList.remove('visible');
  }
};

/* ─── Auto-init on DOM ready ────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => RideBookingUI.init());
} else {
  RideBookingUI.init();
}

/* ─── Public API ────────────────────────────────────────── */
window.RideBookingUI = RideBookingUI;
window.bookRide = bookRide;
