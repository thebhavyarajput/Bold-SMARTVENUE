import re
import os

def process_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements dictionary
    r = {
        '🏟️': '<span class="material-symbols-rounded">stadium</span>',
        '🔍': '<span class="material-symbols-rounded">search</span>',
        '🔔': '<span class="material-symbols-rounded">notifications</span>',
        '💺': '<span class="material-symbols-rounded">chair</span>',
        '🏠': '<span class="material-symbols-rounded">home</span>',
        '🧭': '<span class="material-symbols-rounded">explore</span>',
        '🍽️': '<span class="material-symbols-rounded">restaurant</span>',
        '🚻': '<span class="material-symbols-rounded">wc</span>',
        '🍕': '<span class="material-symbols-rounded">local_pizza</span>',
        '🚪': '<span class="material-symbols-rounded">door_open</span>',
        '♿': '<span class="material-symbols-rounded">accessible</span>',
        '🏥': '<span class="material-symbols-rounded">local_hospital</span>',
        '⏱️': '<span class="material-symbols-rounded">timer</span>',
        '🏃': '<span class="material-symbols-rounded">directions_run</span>',
        '🪑': '<span class="material-symbols-rounded">chair</span>',
        '🍔': '<span class="material-symbols-rounded">lunch_dining</span>',
        '🥤': '<span class="material-symbols-rounded">local_drink</span>',
        '🍟': '<span class="material-symbols-rounded">fastfood</span>',
        '👥': '<span class="material-symbols-rounded">group</span>',
        '🛡️': '<span class="material-symbols-rounded">security</span>',
        '📢': '<span class="material-symbols-rounded">campaign</span>',
        '✅': '<span class="material-symbols-rounded">check_circle</span>',
        '✨': '<span class="material-symbols-rounded">auto_awesome</span>',
        '☕': '<span class="material-symbols-rounded">local_cafe</span>',
        '🧋': '<span class="material-symbols-rounded">bubble_tea</span>',
        '🥟': '<span class="material-symbols-rounded">tapas</span>',
        '🌮': '<span class="material-symbols-rounded">lunch_dining</span>',
        '🍦': '<span class="material-symbols-rounded">icecream</span>',
        '🍛': '<span class="material-symbols-rounded">set_meal</span>',
        '🟢': '<span class="material-symbols-rounded" style="color:var(--success); font-size: 16px; vertical-align: middle;">circle</span>',
        '🟡': '<span class="material-symbols-rounded" style="color:var(--warning); font-size: 16px; vertical-align: middle;">circle</span>',
        '🔴': '<span class="material-symbols-rounded" style="color:var(--danger); font-size: 16px; vertical-align: middle;">circle</span>',
        '⚠️': '<span class="material-symbols-rounded">warning</span>',
        '💡': '<span class="material-symbols-rounded">lightbulb</span>',
        '🏏': '<span class="material-symbols-rounded">sports_cricket</span>',
        '📅': '<span class="material-symbols-rounded">calendar_month</span>',
        '🌤️': '<span class="material-symbols-rounded">partly_cloudy_day</span>',
        '🌡️': '<span class="material-symbols-rounded">device_thermostat</span>',
        '💧': '<span class="material-symbols-rounded">water_drop</span>',
        '🌧️': '<span class="material-symbols-rounded">rainy</span>',
        '💨': '<span class="material-symbols-rounded">air</span>',
        '☔': '<span class="material-symbols-rounded">umbrella</span>',
        '📶': '<span class="material-symbols-rounded">wifi</span>',
        '🌐': '<span class="material-symbols-rounded">public</span>',
        '🔑': '<span class="material-symbols-rounded">key</span>',
        '⚡': '<span class="material-symbols-rounded">bolt</span>',
        '📊': '<span class="material-symbols-rounded">bar_chart</span>',
        '📞': '<span class="material-symbols-rounded">call</span>',
        '🚑': '<span class="material-symbols-rounded">ambulance</span>',
        '🅿️': '<span class="material-symbols-rounded">local_parking</span>',
        '🤖': '<span class="material-symbols-rounded">smart_toy</span>',
        '🤔': '<span class="material-symbols-rounded">help</span>',
        '🗺️': '<span class="material-symbols-rounded">map</span>',
        '📍': '<span class="material-symbols-rounded">location_on</span>',
        '👋': '<span class="material-symbols-rounded">waving_hand</span>',
        '📈': '<span class="material-symbols-rounded">trending_up</span>',
        '🤝': '<span class="material-symbols-rounded">handshake</span>',
        '🎯': '<span class="material-symbols-rounded">track_changes</span>',
        '🏢': '<span class="material-symbols-rounded">business</span>',
        '🔮': '<span class="material-symbols-rounded">psychology</span>'
    }

    # First add linking to index.html
    if 'index.html' in filepath and 'Material+Symbols' not in content:
        content = content.replace('<link rel="stylesheet" href="styles.css">', 
                                  '<link rel="stylesheet" href="styles.css">\n  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />')
                                  
    # In app.js toast textContent -> innerHTML
    if 'app.js' in filepath:
        content = content.replace('toast.textContent = message;', 'toast.innerHTML = message;')

    for emoji, icon in r.items():
        content = content.replace(emoji, icon)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('index.html')
process_file('app.js')
process_file('assistant.js')
print("Icons replaced!")
