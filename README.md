# SmartVenue — AI-Powered Stadium Fan Experience

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Google Firebase](https://img.shields.io/badge/Google-Firebase-orange)](https://firebase.google.com)
[![Google Analytics](https://img.shields.io/badge/Google-Analytics_4-blue)](https://analytics.google.com)
[![Tests](https://img.shields.io/badge/Tests-Jest-green)](./tests)

## 🏟️ Problem Statement

Physical event venues (stadiums, concert halls, arenas) create massive crowd management challenges:
- **Fan Navigation:** Fans struggle to find exits, restrooms, and services in large stadiums
- **Crowd Congestion:** Real-time density data is unavailable to fans, causing dangerous bottlenecks
- **Long Wait Times:** Food & beverage ordering creates long queues that disrupt the fan experience
- **Communication Gaps:** Fans miss critical safety announcements during emergencies

## ✅ Solution: SmartVenue

SmartVenue is an **AI-powered fan companion app** that uses real-time crowd intelligence, natural language processing, and Google Cloud services to create a safer, smarter stadium experience.

### Key Features
- 🤖 **VenueIQ AI Assistant** — Natural language chatbot for live crowd routing, exit guidance, and food ordering
- 🗺️ **Real-time Crowd Heatmap** — Live venue zone density visualization with color-coded safety indicators
- 🍔 **Contactless Food Ordering** — In-seat ordering from multiple concession stands
- 🔔 **Smart Alert System** — Real-time push notifications for emergencies, delays, and crowd events
- 📊 **Live Cricket Scores** — Live match data via RapidAPI cricket integration
- 🌐 **Multi-language Support** — Google Translate AI for international fans

## 🔧 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (Vanilla), JavaScript ES2021 |
| AI Assistant | Custom NLP Intent Engine (VenueIQ) |
| Real-time Data | RapidAPI Cricket API |
| Cloud Platform | Google Firebase (Firestore, Hosting, Analytics) |
| Translation | Google Translate API |
| Analytics | Google Analytics 4 (GA4) |
| Testing | Jest (BDD/TDD) |
| Linting | ESLint (eslint:recommended) |

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/thebhavyarajput/Bold-SMARTVENUE.git
cd Bold-SMARTVENUE

# Install test dependencies
npm install

# Run the test suite
npm test

# Serve locally
npx serve .
```

## 🧪 Testing

```bash
npm test
```

Tests are located in `tests/app.spec.js` and use Jest with full BDD `describe/test/expect` coverage across:
- Crowd capacity bounds validation
- Exit routing algorithm accuracy
- Food cart calculation logic
- Real-time alert system state
- XSS sanitization safety

## 🔒 Security Architecture

- **Content Security Policy (CSP)** header on all pages  
- **XSS Sanitization** — All dynamic DOM variables passed through `escapeHTML()`  
- **API Key Abstraction** — Secrets managed via `window.ENV` fallback pattern, never hardcoded  
- **Firestore Security Rules** — Role-based read/write access controls  
- **Strict Mode** — `"use strict"` enforced across all JS modules  

## 📁 Project Structure

```
Bold-SMARTVENUE/
├── index.html          # Fan-facing mobile app
├── command-center.html # Venue Operations Dashboard
├── app.js              # Core app state & UI engine
├── assistant.js        # VenueIQ AI engine
├── styles.css          # Design system
├── firebase.json       # Firebase Hosting + Firestore config
├── firestore.rules     # Firestore security rules
├── package.json        # Node project config + Jest test runner
├── .eslintrc.json      # ESLint code quality rules
└── tests/
    └── app.spec.js     # Full Jest BDD test suite
```

## 🌐 Live Demo

**Fan App:** [https://bold-smartvenue.vercel.app](https://bold-smartvenue.vercel.app)

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
