document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("statusToggle");
  const tiles = document.querySelectorAll(".tile");
  const subdomains = {
    coding: "https://coding.bluenexus.dev",
    knowledge: "https://knowledge.bluenexus.dev",
    tools: "https://tools.bluenexus.dev",
    picker: "https://picker.bluenexus.dev",
    design: "https://design.bluenexus.dev",
    play: "https://play.bluenexus.dev"
  };

  // 🔍 Updated Keywords
  const keywordLinks = [
    {
      title: "Coding",
      url: subdomains.coding,
      keywords: [
        "bn", "coding", "programming", "developer", "web", "app", "software",
        "html", "css", "script", "java", "data", "http", "https", "json",
        "console", "log", "error", "testing", "nigma"
      ]
    },
    {
      title: "Knowledge",
      url: subdomains.knowledge,
      keywords: [
        "bn", "knowledge", "docs", "documentation", "guides", "help", "faq", "support", "articles", "learning",
        "tutorials", "manuals", "reference", "how", "information", "resources", "education", "explanations",
        "developer", "api", "integration", "troubleshooting"
      ]
    },
    {
      title: "Tools",
      url: subdomains.tools,
      keywords: [
        "bn", "tools", "utilities", "calculator", "converter", "generator", "benchmark", "speed", "tester",
        "diagnostic", "utility", "productivity", "assist", "automation", "builder", "creator", "interactive"
      ]
    },
    {
      title: "Picker",
      url: subdomains.picker,
      keywords: [
        "bn", "colour", "picker", "palette", "design", "shade", "tint", "tone", "rgb", "hex", "hsl", "contrast",
        "ui", "ux", "visual", "selection", "tool", "graphics", "interface", "preview", "paint"
      ]
    },
    {
      title: "Design",
      url: subdomains.design,
      keywords: [
        "bn", "design", "branding", "layout", "mockup", "ui", "ux", "interface", "graphics", "style", "template",
        "creative", "visual", "illustration", "animation", "concept", "prototype", "typography", "aesthetic",
        "logo", "art", "elements"
      ]
    },
    {
      title: "Play",
      url: subdomains.play,
      keywords: [
        "bn", "play", "games", "fun", "interactive", "simulator", "sandbox", "demo", "experiment", "try", "test",
        "experience", "virtual", "simulation", "entertainment", "explore", "beta", "gameplay", "activity"
      ]
    },
    {
      title: "Enigma",
      url: "https://enigma.bluenexus.dev",
      keywords: [
        "bn", "enigma", "turing", "machine", "ww"
      ]
    }
  ];

  // Accent map
  const accentColours = {
    coding: "#188038",
    knowledge: "#F5A623",
    design: "#D0021B",
    play: "#9013FE",
    picker: "#B8E986",
    tools: "#50E3C2"
  };

  // 🟢 Ping subdomains
  function pingSite(url, timeout = 5000) {
    return new Promise(resolve => {
      const timer = setTimeout(() => resolve(false), timeout);
      fetch(url + "/favicon.ico", { mode: "no-cors" })
        .then(() => { clearTimeout(timer); resolve(true); })
        .catch(() => { clearTimeout(timer); resolve(false); });
    });
  }

  async function updateIndicators() {
    for (const tile of tiles) {
      const siteKey = tile.dataset.site;
      const indicator = tile.querySelector(".status-indicator");
      if (!indicator) continue;
      const url = subdomains[siteKey];
      const isUp = await pingSite(url);
      if (isUp) {
        tile.classList.add("active");
        tile.classList.remove("inactive");
      } else {
        tile.classList.add("inactive");
        tile.classList.remove("active");
      }
    }
  }

  // ✅ Hide indicators initially
  document.querySelectorAll(".status-indicator").forEach(ind => ind.style.display = "none");

  toggle.addEventListener("change", () => {
    const show = toggle.checked;
    document.querySelectorAll(".status-indicator").forEach(ind => {
      ind.style.display = show ? "block" : "none";
    });
  });

  updateIndicators();

  // 💬 NaviBot
  const chatButton = document.getElementById("navibot-button");
  const chatWindow = document.getElementById("navibot-chat-window");
  const input = document.getElementById("navibot-input");
  const send = document.getElementById("navibot-send");
  const messages = document.getElementById("navibot-messages");

  chatButton.addEventListener("click", () => {
    chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
  });

  function addMessage(text, sender = "navibot") {
    const msg = document.createElement("div");
    msg.className = sender === "navibot" ? "bot-message" : "user-message";
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    await new Promise(r => setTimeout(r, 1200));
    typing.remove();

    const lower = text.toLowerCase();
    const matches = keywordLinks.filter(link => link.keywords.some(k => lower.includes(k)));

    if (matches.length === 0) {
      addMessage("Sorry, I couldn’t find anything related to that.");
      return;
    }

    // ✅ Redirect in SAME TAB instead of opening a new one
    const linksHTML = matches
      .map(link => {
        const subdomainKey = Object.keys(subdomains).find(
          key => subdomains[key] === link.url
        );
        const colour = accentColours[subdomainKey] || "#00ff73";
        return `For more information on <b style="color:${colour};">${link.title}</b>, click <a href="${link.url}" class="link-${subdomainKey}">here</a>.`;
      })
      .join("<br>");
    addMessage(linksHTML);
  }

  send.addEventListener("click", sendMessage);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  addMessage("Hello! I'm <b>NaviBot</b>. How can I help you today?");
});
