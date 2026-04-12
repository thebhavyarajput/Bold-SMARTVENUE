/* ============================================
   VenueIQ — Smart Assistant Engine
   Context-aware AI for SmartVenue
   ============================================ */

// ─── TRANSLATION DATA ─────────────────────────
const Translations = {
  en: {
    greeting: "Hey! I'm VenueIQ, your smart stadium companion. How can I help?",
    askAnything: "Ask me anything about the venue...",
    bestExit: "Best exit?",
    orderFood: "Order food",
    findRestrooms: "Find restrooms",
    addCalendar: "Add to calendar",
    crowdAlert: "Crowd alert",
    weather: "Weather",
    typing: "VenueIQ is thinking...",
    poweredBy: "Powered by SmartVenue AI • Google Services",
    proactiveHalftime: "<span class="material-symbols-rounded">bolt</span> Halftime rush in {min} min — pre-order now to skip the queue!",
    proactiveCrowd: "<span class="material-symbols-rounded">group</span> {zone} getting crowded — consider moving now.",
    proactiveFood: "<span class="material-symbols-rounded">lunch_dining</span> {stand} has only {wait} min wait. Great time to grab food!",
    proactiveExit: "<span class="material-symbols-rounded">door_open</span> Post-match tip: Gate B clears fastest — just 8 min.",
    proactiveWeather: "<span class="material-symbols-rounded">rainy</span> Light rain expected soon. Covered seating at Sections 8-12.",
    calendarAdded: "<span class="material-symbols-rounded">calendar_month</span> Match added to your Google Calendar! MI vs CK at Wankhede Stadium.",
    noResults: "I couldn't find a specific answer. Try asking about exits, food, restrooms, or crowd status!",
    langSwitch: "Language switched to English 🇬🇧"
  },
  hi: {
    greeting: "नमस्ते! मैं VenueIQ हूँ, आपका स्मार्ट स्टेडियम साथी। कैसे मदद कर सकता हूँ?",
    askAnything: "स्टेडियम के बारे में कुछ भी पूछें...",
    bestExit: "सबसे अच्छा निकास?",
    orderFood: "खाना ऑर्डर करें",
    findRestrooms: "शौचालय खोजें",
    addCalendar: "कैलेंडर में जोड़ें",
    crowdAlert: "भीड़ अलर्ट",
    weather: "मौसम",
    typing: "VenueIQ सोच रहा है...",
    poweredBy: "SmartVenue AI द्वारा संचालित • Google सेवाएं",
    proactiveHalftime: "<span class="material-symbols-rounded">bolt</span> {min} मिनट में हाफटाइम — अभी ऑर्डर करें, लाइन से बचें!",
    proactiveCrowd: "<span class="material-symbols-rounded">group</span> {zone} में भीड़ बढ़ रही है — अभी निकलें।",
    proactiveFood: "<span class="material-symbols-rounded">lunch_dining</span> {stand} में सिर्फ {wait} मिनट की प्रतीक्षा। खाना लेने का अच्छा समय!",
    proactiveExit: "<span class="material-symbols-rounded">door_open</span> मैच के बाद: Gate B सबसे जल्दी खाली होगा — सिर्फ 8 मिनट।",
    proactiveWeather: "<span class="material-symbols-rounded">rainy</span> जल्द बारिश की संभावना। Section 8-12 में ढकी सीटें उपलब्ध हैं।",
    calendarAdded: "<span class="material-symbols-rounded">calendar_month</span> मैच आपके Google Calendar में जोड़ दिया गया! MI vs CK, वानखेड़े स्टेडियम।",
    noResults: "कोई विशेष उत्तर नहीं मिला। निकास, खाना, शौचालय, या भीड़ के बारे में पूछें!",
    langSwitch: "भाषा हिंदी में बदली गई 🇮🇳"
  },
  mr: {
    greeting: "नमस्कार! मी VenueIQ आहे, तुमचा स्मार्ट स्टेडियम साथीदार. कशी मदत करू?",
    askAnything: "स्टेडियमबद्दल काहीही विचारा...",
    bestExit: "सर्वोत्तम निर्गम?",
    orderFood: "जेवण ऑर्डर करा",
    findRestrooms: "शौचालय शोधा",
    addCalendar: "कॅलेंडरमध्ये जोडा",
    crowdAlert: "गर्दी अलर्ट",
    weather: "हवामान",
    typing: "VenueIQ विचार करत आहे...",
    poweredBy: "SmartVenue AI द्वारे • Google सेवा",
    proactiveHalftime: "<span class="material-symbols-rounded">bolt</span> {min} मिनिटांत हाफटाइम — आत्ता ऑर्डर करा, रांगा टाळा!",
    proactiveCrowd: "<span class="material-symbols-rounded">group</span> {zone} मध्ये गर्दी वाढत आहे — आता निघा.",
    proactiveFood: "<span class="material-symbols-rounded">lunch_dining</span> {stand} मध्ये फक्त {wait} मिनिटे प्रतीक्षा. जेवणासाठी चांगली वेळ!",
    proactiveExit: "<span class="material-symbols-rounded">door_open</span> सामन्यानंतर: Gate B सर्वात लवकर मोकळे — फक्त 8 मिनिटे.",
    proactiveWeather: "<span class="material-symbols-rounded">rainy</span> लवकरच पाऊस. Section 8-12 मध्ये छप्पर असलेल्या सीटा उपलब्ध.",
    calendarAdded: "<span class="material-symbols-rounded">calendar_month</span> सामना तुमच्या Google Calendar मध्ये जोडला! MI vs CK, वानखेडे स्टेडियम.",
    noResults: "विशिष्ट उत्तर सापडले नाही. निर्गम, जेवण, शौचालय, किंवा गर्दी बद्दल विचारा!",
    langSwitch: "भाषा मराठीत बदलली 🇮🇳"
  }
};

// ─── VENUE IQ ASSISTANT ───────────────────────
const VenueIQ = {
  isOpen: false,
  currentLang: 'en',
  messages: [],
  conversationMemory: new Set(),
  lastProactiveSuggestion: 0,
  proactiveDismissed: false,
  proactiveMessage: '',
  suggestionCooldown: 60000, // 60s between proactive suggestions

  // ── Get translated string ──
  t(key, replacements = {}) {
    let str = Translations[this.currentLang]?.[key] || Translations.en[key] || key;
    Object.entries(replacements).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, v);
    });
    return str;
  },

  // ── Initialize ──
  init() {
    this.setupEventListeners();
    this.addMessage('ai', this.t('greeting'));
    this.conversationMemory.add('greeted');
    this.startProactiveEngine();
  },

  // ── Setup Event Listeners ──
  setupEventListeners() {
    // FAB toggle
    const fab = document.getElementById('venueiq-fab');
    if (fab) fab.addEventListener('click', () => this.toggleDrawer());

    // Close button
    const closeBtn = document.getElementById('venueiq-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggleDrawer());

    // Send button
    const sendBtn = document.getElementById('venueiq-send');
    if (sendBtn) sendBtn.addEventListener('click', () => this.handleUserInput());

    // Input enter key
    const input = document.getElementById('venueiq-input');
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUserInput();
      });
    }

    // Quick action chips
    document.querySelectorAll('.viq-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const action = chip.dataset.action;
        this.handleQuickAction(action);
      });
    });

    // Language selector
    const langSelect = document.getElementById('venueiq-lang');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        this.currentLang = e.target.value;
        this.addMessage('ai', this.t('langSwitch'));
      });
    }

    // Proactive pill dismiss
    const proactivePill = document.getElementById('venueiq-proactive');
    if (proactivePill) {
      proactivePill.addEventListener('click', () => {
        this.proactiveDismissed = true;
        proactivePill.classList.remove('show');
        this.toggleDrawer();
        // Add the proactive message to chat
        if (this.proactiveMessage) {
          this.addMessage('ai', this.proactiveMessage);
          this.proactiveMessage = '';
        }
      });
    }
  },

  // ── Toggle Drawer ──
  toggleDrawer() {
    const drawer = document.getElementById('venueiq-drawer');
    const fab = document.getElementById('venueiq-fab');
    const overlay = document.getElementById('venueiq-overlay');
    if (!drawer) return;

    this.isOpen = !this.isOpen;
    drawer.classList.toggle('open', this.isOpen);
    if (fab) fab.classList.toggle('hidden', this.isOpen);
    if (overlay) overlay.classList.toggle('show', this.isOpen);

    if (this.isOpen) {
      this.scrollToBottom();
      const input = document.getElementById('venueiq-input');
      if (input) setTimeout(() => input.focus(), 400);
      // Hide proactive pill when opening
      const pill = document.getElementById('venueiq-proactive');
      if (pill) pill.classList.remove('show');
    }
  },

  // ── Handle User Text Input ──
  handleUserInput() {
    const input = document.getElementById('venueiq-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    this.addMessage('user', text);
    this.processQuery(text);
  },

  // ── Handle Quick Action Chips ──
  handleQuickAction(action) {
    const labels = {
      exit: this.t('bestExit'),
      food: this.t('orderFood'),
      restroom: this.t('findRestrooms'),
      calendar: this.t('addCalendar'),
      crowd: this.t('crowdAlert'),
      weather: this.t('weather')
    };

    this.addMessage('user', labels[action] || action);

    switch (action) {
      case 'exit': this.respondExit(); break;
      case 'food': this.respondFood(); break;
      case 'restroom': this.respondRestroom(); break;
      case 'calendar': this.respondCalendar(); break;
      case 'crowd': this.respondCrowd(); break;
      case 'weather': this.respondWeather(); break;
      default: this.respondFallback();
    }
  },

  // ── Process Natural Language Query ──
  processQuery(text) {
    const lower = text.toLowerCase();

    // Show typing indicator
    this.showTyping();

    setTimeout(() => {
      this.hideTyping();

      // Keyword matching for intent detection
      if (this.matchesIntent(lower, ['exit', 'leave', 'go out', 'gate', 'nikalna', 'bahar', 'nirgam'])) {
        this.respondExit();
      } else if (this.matchesIntent(lower, ['food', 'eat', 'hungry', 'burger', 'pizza', 'order', 'khana', 'jevan'])) {
        this.respondFood();
      } else if (this.matchesIntent(lower, ['restroom', 'bathroom', 'toilet', 'washroom', 'loo', 'shauchalay'])) {
        this.respondRestroom();
      } else if (this.matchesIntent(lower, ['calendar', 'schedule', 'remind', 'save date'])) {
        this.respondCalendar();
      } else if (this.matchesIntent(lower, ['crowd', 'busy', 'congestion', 'people', 'bheed', 'gardi'])) {
        this.respondCrowd();
      } else if (this.matchesIntent(lower, ['weather', 'rain', 'cold', 'hot', 'umbrella', 'mausam', 'havaman'])) {
        this.respondWeather();
      } else if (this.matchesIntent(lower, ['score', 'match', 'run', 'wicket', 'over', 'cricket'])) {
        this.respondMatch();
      } else if (this.matchesIntent(lower, ['help', 'what can', 'options', 'madad'])) {
        this.respondHelp();
      } else if (this.matchesIntent(lower, ['seat', 'section', 'row', 'where am i'])) {
        this.respondSeat();
      } else if (this.matchesIntent(lower, ['wifi', 'internet', 'connect', 'network'])) {
        this.respondWifi();
      } else if (this.matchesIntent(lower, ['medical', 'first aid', 'doctor', 'hurt', 'injured', 'emergency'])) {
        this.respondMedical();
      } else if (this.matchesIntent(lower, ['parking', 'car', 'vehicle', 'park'])) {
        this.respondParking();
      } else if (this.matchesIntent(lower, ['thank', 'thanks', 'dhanyavad', 'shukriya'])) {
        this.addMessage('ai', '😊 You\'re welcome! I\'m here anytime you need help during the match. Enjoy! <span class="material-symbols-rounded">sports_cricket</span>');
      } else if (this.matchesIntent(lower, ['hello', 'hi', 'hey', 'namaste', 'namaskar'])) {
        this.addMessage('ai', this.t('greeting'));
      } else {
        this.respondSmartFallback(lower);
      }
    }, 800 + Math.random() * 700); // Simulate thinking time
  },

  matchesIntent(text, keywords) {
    return keywords.some(k => text.includes(k));
  },

  // ─── RESPONSE GENERATORS (Context-Aware) ───

  respondExit() {
    const zones = typeof AppState !== 'undefined' ? AppState.zones : [];
    const capacity = typeof AppState !== 'undefined' ? AppState.venueCapacity : 78;

    // Analyze gate congestion from zone data
    let gateAnalysis = this.analyzeGates(zones);
    let recommendation = gateAnalysis.bestGate;
    let avoidGate = gateAnalysis.worstGate;

    let response = `<span class="material-symbols-rounded">door_open</span> **Smart Exit Analysis**\n\n`;
    response += `Based on current crowd density (${capacity}%):\n\n`;
    response += `<span class="material-symbols-rounded">check_circle</span> **${recommendation.name}** — ${recommendation.reason}\n`;
    response += `<span class="material-symbols-rounded">timer</span> Estimated clear time: **${recommendation.clearTime}**\n\n`;
    response += `❌ Avoid **${avoidGate.name}** — ${avoidGate.reason}\n\n`;
    response += `<span class="material-symbols-rounded">lightbulb</span> *Tip: Use Parking Lot P3 via ${recommendation.name} for fastest overall exit.*`;

    this.addMessage('ai', response);
    this.conversationMemory.add('exit_advice');

    // Add Google Maps embed
    setTimeout(() => {
      this.addMapEmbed('Exit Route — ' + recommendation.name,
        'Wankhede Stadium', recommendation.name + ', Wankhede Stadium, Mumbai');
    }, 500);
  },

  respondFood() {
    const menuItems = typeof AppState !== 'undefined' ? AppState.menuItems : [];
    const countdown = typeof AppState !== 'undefined' ? AppState.halftimeCountdown : 1245;
    const minsToHalftime = Math.floor(countdown / 60);

    // Find best options (lowest wait)
    const sorted = [...menuItems].sort((a, b) => a.wait - b.wait);
    const top3 = sorted.slice(0, 3);

    let response = `<span class="material-symbols-rounded">restaurant</span> **Smart Food Recommendations**\n\n`;

    if (minsToHalftime < 10) {
      response += `<span class="material-symbols-rounded">bolt</span> **Halftime in ${minsToHalftime} min!** Order NOW to beat the rush.\n\n`;
    }

    top3.forEach(item => {
      const waitBadge = item.wait <= 3 ? '<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span>' : item.wait <= 5 ? '<span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span>' : '<span class="material-symbols-rounded" style="color:var(--danger); font-size: 16px; vertical-align: middle;">circle</span>';
      response += `${item.emoji} **${item.name}** — ₹${item.price} • ${waitBadge} ${item.wait} min wait\n`;
      response += `   <span class="material-symbols-rounded">location_on</span> ${item.stand}\n\n`;
    });

    // Smart suggestion based on context
    if (sorted[0] && sorted[0].wait <= 3) {
      response += `<span class="material-symbols-rounded">lightbulb</span> *Best deal right now: ${sorted[0].emoji} ${sorted[0].name} at ${sorted[0].stand} — only ${sorted[0].wait} min!*`;
    }

    this.addMessage('ai', response);
    this.conversationMemory.add('food_advice');
  },

  respondRestroom() {
    let response = `<span class="material-symbols-rounded">wc</span> **Nearest Restrooms**\n\n`;
    response += `<span class="material-symbols-rounded">location_on</span> **Gate 6, Left Side** — 1 min walk from your seat\n`;
    response += `   Status: <span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span> Clear — no wait\n\n`;
    response += `<span class="material-symbols-rounded">location_on</span> **Block C, Level 1** — 3 min walk\n`;
    response += `   Status: <span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span> Light traffic\n\n`;
    response += `<span class="material-symbols-rounded">location_on</span> **South Concourse** — 4 min walk\n`;
    response += `   Status: <span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span> Moderate — ~3 min wait\n\n`;
    response += `<span class="material-symbols-rounded">lightbulb</span> *Recommended: Gate 6 restrooms — closest and clear right now.*`;

    this.addMessage('ai', response);

    setTimeout(() => {
      this.addMapEmbed('Restroom Route', 'Section 14, Wankhede Stadium', 'Gate 6 Restrooms, Wankhede Stadium');
    }, 500);
  },

  respondCalendar() {
    const match = typeof AppState !== 'undefined' ? AppState.matchData : {};
    const title = `${match.homeTeam || 'Mumbai Indians'} vs ${match.awayTeam || 'Chennai Kings'} — IPL 2026`;
    const location = 'Wankhede Stadium, Mumbai, India';

    // Generate Google Calendar URL
    const now = new Date();
    const startDate = this.formatCalendarDate(now);
    const endTime = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours
    const endDate = this.formatCalendarDate(endTime);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(title)}` +
      `&dates=${startDate}/${endDate}` +
      `&details=${encodeURIComponent('Live IPL match at Wankhede Stadium. Your seat: Section 14, Row C, Seat 22. Powered by SmartVenue.')}` +
      `&location=${encodeURIComponent(location)}` +
      `&sf=true&output=xml`;

    let response = `<span class="material-symbols-rounded">calendar_month</span> **Add to Google Calendar**\n\n`;
    response += `<span class="material-symbols-rounded">sports_cricket</span> **${title}**\n`;
    response += `<span class="material-symbols-rounded">location_on</span> ${location}\n`;
    response += `<span class="material-symbols-rounded">chair</span> Your Seat: Section 14, Row C, Seat 22\n\n`;

    this.addMessage('ai', response);

    // Add calendar button
    setTimeout(() => {
      this.addCalendarButton(calendarUrl);
    }, 300);

    this.conversationMemory.add('calendar_added');
  },

  respondCrowd() {
    const zones = typeof AppState !== 'undefined' ? AppState.zones : [];
    const capacity = typeof AppState !== 'undefined' ? AppState.venueCapacity : 78;

    let response = `<span class="material-symbols-rounded">group</span> **Live Crowd Intelligence**\n\n`;
    response += `<span class="material-symbols-rounded">stadium</span> Overall Capacity: **${capacity}%**\n\n`;

    zones.forEach(zone => {
      const badge = zone.status === 'clear' ? '<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span>' : zone.status === 'busy' ? '<span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span>' : '<span class="material-symbols-rounded" style="color:var(--danger); font-size: 16px; vertical-align: middle;">circle</span>';
      response += `${badge} **${zone.name}**\n`;
      response += `   ${zone.desc}\n\n`;
    });

    // Smart recommendation
    const avoidZones = zones.filter(z => z.status === 'avoid');
    if (avoidZones.length > 0) {
      response += `<span class="material-symbols-rounded">warning</span> *Avoid: ${avoidZones.map(z => z.name).join(', ')}. Use alternate routes.*`;
    } else if (capacity > 85) {
      response += `<span class="material-symbols-rounded">warning</span> *Stadium is filling up. Move between sections now if needed.*`;
    } else {
      response += `<span class="material-symbols-rounded">check_circle</span> *Overall flow is good. No major bottlenecks detected.*`;
    }

    this.addMessage('ai', response);
    this.conversationMemory.add('crowd_briefing');
  },

  respondWeather() {
    let response = `<span class="material-symbols-rounded">partly_cloudy_day</span> **Weather Update — Wankhede Stadium**\n\n`;
    response += `<span class="material-symbols-rounded">device_thermostat</span> Temperature: **28°C** (Feels like 31°C)\n`;
    response += `<span class="material-symbols-rounded">water_drop</span> Humidity: **72%**\n`;
    response += `<span class="material-symbols-rounded">rainy</span> Rain chance: **35%** (light showers possible after 8 PM)\n`;
    response += `<span class="material-symbols-rounded">air</span> Wind: **12 km/h** NW\n\n`;
    response += `<span class="material-symbols-rounded">umbrella</span> *Advisory: Light rain expected around 8 PM. Covered seating available at Sections 8-12.*\n\n`;
    response += `<span class="material-symbols-rounded">lightbulb</span> *Tip: If you're in an open section, grab a rain poncho from the merchandise stand near Gate C (₹50).*`;

    this.addMessage('ai', response);
  },

  async respondMatch() {
    const m = typeof AppState !== 'undefined' ? AppState.matchData : {};

    let response = `<span class="material-symbols-rounded">sports_cricket</span> **Live Match Update**\n\n`;
    response += `**${m.homeTeam || 'India'}** ${m.homeScore || '186/4'}\n`;
    response += `**${m.awayTeam || 'Australia'}** ${m.awayScore || '142/6'}\n\n`;
    response += `<span class="material-symbols-rounded">bar_chart</span> Over: **${m.currentOver || '16.3'}**\n`;
    response += `<span class="material-symbols-rounded">trending_up</span> Run Rate: **${m.runRate || '8.72'}** | Req. Rate: **${m.reqRate || '12.45'}**\n`;
    response += `<span class="material-symbols-rounded">handshake</span> Partnership: **${m.partnership || '48'}** runs\n\n`;

    // Smart analysis
    const rr = parseFloat(m.runRate || 8.72);
    const reqRr = parseFloat(m.reqRate || 12.45);
    if (reqRr > rr * 1.3) {
      response += `<span class="material-symbols-rounded">bar_chart</span> *Analysis: ${m.awayShort || 'AUS'} needs ${(reqRr - rr).toFixed(1)} more RPO than current rate. Pressure building!*\n\n`;
    } else if (reqRr < rr) {
      response += `<span class="material-symbols-rounded">bar_chart</span> *Analysis: ${m.awayShort || 'AUS'} is ahead of the asking rate. Close contest!*\n\n`;
    } else {
      response += `<span class="material-symbols-rounded">bar_chart</span> *Analysis: Tight match! Both teams in the game. Every ball matters.*\n\n`;
    }

    // Connect to RapidAPI for Score Prediction
    try {
      const apiResp = await fetch('https://cricket-api-free-data.p.rapidapi.com/cricket-players?teamid=2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'cricket-api-free-data.p.rapidapi.com',
          'x-rapidapi-key': 'e5a4d73dcemshd659392f0935a6fp17b897jsn910b7b620242'
        }
      });
      const data = await apiResp.json();
      
      if (data && data.response && data.response.length > 0) {
        const topPlayers = data.response.slice(0, 5); // Get top players
        const player1 = topPlayers.find(p => p.title.includes('Shubman') || p.title.includes('Rohit'))?.title || data.response[0].title;
        const player2 = topPlayers.find(p => p.title.includes('Virat') || p.title.includes('Suryakumar'))?.title || data.response[3].title;
        
        // Accelerated projection
        const remOvers = 20 - parseFloat(m.currentOver || 16.3);
        const accRr = rr * 1.15; // 15% acceleration
        const currentRuns = parseInt((m.homeScore || '186/4').split('/')[0]);
        const projScore = Math.round(currentRuns + (accRr * remOvers));

        response += `<span class="material-symbols-rounded">track_changes</span> **AI Score Prediction:**\n`;
        response += `With **${player1}** and **${player2}** powering the lineup, our projected final score is **${projScore}**!`;
      }
    } catch (error) {
      console.warn("Could not fetch cricket API", error);
    }

    this.addMessage('ai', response);
  },

  respondSeat() {
    let response = `<span class="material-symbols-rounded">chair</span> **Your Seat Information**\n\n`;
    response += `<span class="material-symbols-rounded">location_on</span> **Section 14, Row C, Seat 22**\n`;
    response += `<span class="material-symbols-rounded">business</span> Pavilion End — Level 2\n\n`;
    response += `**Nearby Facilities:**\n`;
    response += `<span class="material-symbols-rounded">wc</span> Restrooms — Gate 6, 1 min walk\n`;
    response += `<span class="material-symbols-rounded">local_pizza</span> Food (Stand B2) — 2 min walk\n`;
    response += `<span class="material-symbols-rounded">door_open</span> Nearest Exit — Gate B, 3 min walk\n`;
    response += `<span class="material-symbols-rounded">local_hospital</span> First Aid — Block C entrance\n\n`;
    response += `<span class="material-symbols-rounded">lightbulb</span> *Your section has great sight lines. Enjoy the match!*`;

    this.addMessage('ai', response);
  },

  respondWifi() {
    let response = `<span class="material-symbols-rounded">wifi</span> **Wi-Fi Information**\n\n`;
    response += `<span class="material-symbols-rounded">public</span> Network: **SmartVenue-5G**\n`;
    response += `<span class="material-symbols-rounded">key</span> Password: Auto-connect via SmartVenue app\n`;
    response += `<span class="material-symbols-rounded">bolt</span> Speed optimized for Section 14\n\n`;
    response += `<span class="material-symbols-rounded">bar_chart</span> Current Status:\n`;
    response += `   Upload: ~15 Mbps\n`;
    response += `   Download: ~45 Mbps\n`;
    response += `   Latency: ~12ms\n\n`;
    response += `<span class="material-symbols-rounded">lightbulb</span> *Tip: SmartVenue-5G gives the best speeds for your section. Avoid "Stadium_Public" — it's congested.*`;

    this.addMessage('ai', response);
  },

  respondMedical() {
    let response = `<span class="material-symbols-rounded">local_hospital</span> **Medical Assistance**\n\n`;
    response += `<span class="material-symbols-rounded">location_on</span> **First Aid Station** — Block C entrance, Level 1\n`;
    response += `   Status: <span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span> Open & Staffed\n`;
    response += `   Distance: ~4 min walk from your seat\n\n`;
    response += `<span class="material-symbols-rounded">call</span> **Emergency Contact:** Stadium Medical: Ext 999\n\n`;
    response += `<span class="material-symbols-rounded">ambulance</span> For urgent medical emergencies, alert any steward in a hi-vis vest or use the SOS button in the app.\n\n`;
    response += `<span class="material-symbols-rounded">lightbulb</span> *Nearest stewarts are at Gate 6 entrance and Block C junction.*`;

    this.addMessage('ai', response);

    setTimeout(() => {
      this.addMapEmbed('Medical Station', 'Section 14, Wankhede Stadium', 'Block C First Aid, Wankhede Stadium');
    }, 500);
  },

  respondParking() {
    let response = `<span class="material-symbols-rounded">local_parking</span> **Parking Information**\n\n`;
    response += `Your nearest lots:\n\n`;
    response += `<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span> **Lot P3** — Available (65% full)\n`;
    response += `   Via Gate B — 5 min walk\n\n`;
    response += `<span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span> **Lot P2** — Almost Full (95%)\n`;
    response += `   Via Gate A — 8 min walk\n\n`;
    response += `<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span> **Lot P5** — Available (40% full)\n`;
    response += `   Via Gate D — 7 min walk\n\n`;
    response += `<span class="material-symbols-rounded">lightbulb</span> *Post-match recommendation: Exit via Gate B to Lot P3 for fastest departure. Lot P2 will be gridlocked.*`;

    this.addMessage('ai', response);

    setTimeout(() => {
      this.addMapEmbed('Parking Route', 'Gate B, Wankhede Stadium', 'Parking Lot P3, Wankhede Stadium, Mumbai');
    }, 500);
  },

  respondHelp() {
    let response = `<span class="material-symbols-rounded">smart_toy</span> **I can help you with:**\n\n`;
    response += `<span class="material-symbols-rounded">door_open</span> **Exits** — Best exit analysis with route\n`;
    response += `<span class="material-symbols-rounded">restaurant</span> **Food** — Menu with live wait times\n`;
    response += `<span class="material-symbols-rounded">wc</span> **Restrooms** — Nearest with availability\n`;
    response += `<span class="material-symbols-rounded">group</span> **Crowd** — Live zone density report\n`;
    response += `<span class="material-symbols-rounded">sports_cricket</span> **Match** — Score & smart analysis\n`;
    response += `<span class="material-symbols-rounded">calendar_month</span> **Calendar** — Add match to Google Calendar\n`;
    response += `<span class="material-symbols-rounded">partly_cloudy_day</span> **Weather** — Live + forecast\n`;
    response += `<span class="material-symbols-rounded">wifi</span> **Wi-Fi** — Network info & speed\n`;
    response += `<span class="material-symbols-rounded">local_hospital</span> **Medical** — First aid locations\n`;
    response += `<span class="material-symbols-rounded">local_parking</span> **Parking** — Lot availability & routes\n`;
    response += `<span class="material-symbols-rounded">chair</span> **Seat** — Your section info & nearby facilities\n\n`;
    response += `*Just tap a chip below or type your question!*`;

    this.addMessage('ai', response);
  },

  respondSmartFallback(text) {
    // Try to provide something contextually useful
    const capacity = typeof AppState !== 'undefined' ? AppState.venueCapacity : 78;
    const countdown = typeof AppState !== 'undefined' ? AppState.halftimeCountdown : 1245;
    const minsToHalftime = Math.floor(countdown / 60);

    let response = '';

    if (capacity > 85) {
      response = `<span class="material-symbols-rounded">help</span> I'm not sure about "${text}", but here's something useful:\n\n`;
      response += `<span class="material-symbols-rounded">warning</span> Stadium is at **${capacity}%** capacity. If you need to move, now is the best time.\n\n`;
      response += `Try asking about: exits, food, restrooms, crowd status, or match score.`;
    } else if (minsToHalftime < 15) {
      response = `<span class="material-symbols-rounded">help</span> Didn't catch that, but quick tip:\n\n`;
      response += `<span class="material-symbols-rounded">timer</span> Halftime in **${minsToHalftime} min**! Pre-order food now to skip the halftime rush.\n\n`;
      response += `Try asking about: exits, food, restrooms, or match analysis.`;
    } else {
      response = this.t('noResults');
    }

    this.addMessage('ai', response);
  },

  // ─── GOOGLE SERVICES HELPERS ───

  formatCalendarDate(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  },

  addMapEmbed(title, origin, destination) {
    const messagesEl = document.getElementById('venueiq-messages');
    if (!messagesEl) return;

    const mapDiv = document.createElement('div');
    mapDiv.className = 'viq-msg viq-ai';
    mapDiv.innerHTML = `
      <div class="viq-avatar"><span class="material-symbols-rounded">map</span></div>
      <div class="viq-bubble viq-bubble-ai">
        <div class="viq-map-container">
          <div class="viq-map-header">
            <span class="viq-map-icon"><span class="material-symbols-rounded">location_on</span></span>
            <span class="viq-map-title">${title}</span>
          </div>
          <div class="viq-map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9876!2d72.8258!3d18.9387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c0c14a65e5%3A0x53c5e4893d580d90!2sWankhede%20Stadium!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="180" style="border:0;border-radius:8px;" allowfullscreen loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <a href="https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}"
             target="_blank" class="viq-map-link" rel="noopener">
            <span class="material-symbols-rounded">explore</span> Open in Google Maps →
          </a>
        </div>
      </div>
    `;

    messagesEl.appendChild(mapDiv);
    this.scrollToBottom();
  },

  addCalendarButton(url) {
    const messagesEl = document.getElementById('venueiq-messages');
    if (!messagesEl) return;

    const calDiv = document.createElement('div');
    calDiv.className = 'viq-msg viq-ai';
    calDiv.innerHTML = `
      <div class="viq-avatar"><span class="material-symbols-rounded">calendar_month</span></div>
      <div class="viq-bubble viq-bubble-ai">
        <a href="${url}" target="_blank" class="viq-calendar-btn" rel="noopener">
          <span class="viq-cal-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
          <span>Open Google Calendar</span>
          <span class="viq-cal-arrow">→</span>
        </a>
        <div class="viq-cal-note">${this.t('calendarAdded')}</div>
      </div>
    `;

    messagesEl.appendChild(calDiv);
    this.scrollToBottom();
  },

  // ─── PROACTIVE SUGGESTIONS ENGINE ───

  startProactiveEngine() {
    setInterval(() => this.evaluateProactiveSuggestion(), 20000); // Check every 20s
  },

  evaluateProactiveSuggestion() {
    if (this.isOpen) return; // Don't interrupt open conversations
    if (Date.now() - this.lastProactiveSuggestion < this.suggestionCooldown) return;

    const suggestion = this.generateProactiveSuggestion();
    if (!suggestion) return;

    this.proactiveMessage = suggestion;
    this.lastProactiveSuggestion = Date.now();

    const pill = document.getElementById('venueiq-proactive');
    const pillText = document.getElementById('venueiq-proactive-text');
    if (pill && pillText) {
      pillText.textContent = suggestion.length > 65 ? suggestion.substring(0, 62) + '...' : suggestion;
      pill.classList.add('show');

      // Auto-hide after 12 seconds
      setTimeout(() => {
        pill.classList.remove('show');
      }, 12000);
    }
  },

  generateProactiveSuggestion() {
    if (typeof AppState === 'undefined') return null;

    const countdown = AppState.halftimeCountdown;
    const minsToHalftime = Math.floor(countdown / 60);
    const capacity = AppState.venueCapacity;
    const zones = AppState.zones || [];
    const menuItems = AppState.menuItems || [];
    const cart = AppState.cart || [];

    // Priority 1: Halftime approaching + empty cart
    if (minsToHalftime < 12 && minsToHalftime > 2 && cart.length === 0 && !this.conversationMemory.has('halftime_nudge')) {
      this.conversationMemory.add('halftime_nudge');
      return this.t('proactiveHalftime', { min: minsToHalftime });
    }

    // Priority 2: Zone becoming crowded
    const avoidZones = zones.filter(z => z.status === 'avoid');
    if (avoidZones.length > 0 && !this.conversationMemory.has('crowd_nudge_' + avoidZones[0].name)) {
      this.conversationMemory.add('crowd_nudge_' + avoidZones[0].name);
      return this.t('proactiveCrowd', { zone: avoidZones[0].name });
    }

    // Priority 3: Low wait food stand found
    const fastFood = menuItems.find(m => m.wait <= 2 && m.waitStatus === 'clear');
    if (fastFood && !this.conversationMemory.has('food_nudge')) {
      this.conversationMemory.add('food_nudge');
      return this.t('proactiveFood', { stand: fastFood.stand, wait: fastFood.wait });
    }

    // Priority 4: High capacity warning
    if (capacity > 90 && !this.conversationMemory.has('capacity_warning')) {
      this.conversationMemory.add('capacity_warning');
      return this.t('proactiveExit');
    }

    return null;
  },

  analyzeGates(zones) {
    // Simulate analysis based on zone statuses
    const gates = [
      { name: 'Gate A', congestion: 0.7, reason: 'Heavy traffic — 25 min to clear', clearTime: '25 min' },
      { name: 'Gate B', congestion: 0.2, reason: 'Light traffic — recommended!', clearTime: '8 min' },
      { name: 'Gate C', congestion: 0.8, reason: 'Very congested — main fan exit', clearTime: '30 min' },
      { name: 'Gate D', congestion: 0.5, reason: 'Moderate — some congestion', clearTime: '15 min' }
    ];

    // Adjust based on zone data
    zones.forEach(z => {
      if (z.name.includes('East') && z.status === 'avoid') {
        gates.find(g => g.name === 'Gate D').congestion = 0.9;
      }
      if (z.name.includes('North') && z.status === 'clear') {
        gates.find(g => g.name === 'Gate B').congestion = 0.15;
      }
    });

    gates.sort((a, b) => a.congestion - b.congestion);

    return {
      bestGate: gates[0],
      worstGate: gates[gates.length - 1]
    };
  },

  // ─── MESSAGE RENDERING ───

  addMessage(sender, text) {
    const msg = {
      id: Date.now(),
      sender,
      text,
      time: new Date()
    };
    this.messages.push(msg);
    this.renderMessage(msg);
    this.scrollToBottom();
  },

  renderMessage(msg) {
    const messagesEl = document.getElementById('venueiq-messages');
    if (!messagesEl) return;

    const div = document.createElement('div');
    div.className = `viq-msg ${msg.sender === 'ai' ? 'viq-ai' : 'viq-user'}`;

    const time = msg.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    // Simple markdown-like formatting
    let formattedText = this.formatText(msg.text);

    if (msg.sender === 'ai') {
      div.innerHTML = `
        <div class="viq-avatar"><span class="material-symbols-rounded">auto_awesome</span></div>
        <div class="viq-bubble viq-bubble-ai">
          <div class="viq-text">${formattedText}</div>
          <div class="viq-time">${time}</div>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="viq-bubble viq-bubble-user">
          <div class="viq-text">${formattedText}</div>
          <div class="viq-time">${time}</div>
        </div>
      `;
    }

    messagesEl.appendChild(div);
  },

  formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  },

  showTyping() {
    const messagesEl = document.getElementById('venueiq-messages');
    if (!messagesEl) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'viq-msg viq-ai viq-typing-msg';
    typingDiv.innerHTML = `
      <div class="viq-avatar"><span class="material-symbols-rounded">auto_awesome</span></div>
      <div class="viq-bubble viq-bubble-ai">
        <div class="viq-typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesEl.appendChild(typingDiv);
    this.scrollToBottom();
  },

  hideTyping() {
    const typingEl = document.querySelector('.viq-typing-msg');
    if (typingEl) typingEl.remove();
  },

  scrollToBottom() {
    const messagesEl = document.getElementById('venueiq-messages');
    if (messagesEl) {
      setTimeout(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }, 50);
    }
  }
};
