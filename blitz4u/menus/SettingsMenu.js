class SettingsMenu extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div id="game-viewport">
  <header>
  <div class="header-left">
  <svg class="logo-icon" viewbox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"></path></svg>
  <h1>BLITZ4U</h1>
  </div>

  <!-- HOME BUTTON ADDED -->
  <div class="header-right">
    <button class="home-btn" id="settings-menu-home-btn">Home</button>
  </div>

  </header>
  <main>
  <div id="screen-container">
<!-- Difficulty Section -->
<div class="settings-section">
<span class="section-title">Select Difficulty</span>
<div class="btn-group difficulty-grid">
<button class="btn-setting" data-mode="easy">Easy</button>
<button class="btn-setting active" data-mode="normal">Normal</button>
<button class="btn-setting" data-mode="hard">Hard</button>
<button class="btn-setting" data-mode="focus">Focus Mode</button>
</div>
</div>
<!-- Death Behavior Section -->
<div class="settings-section">
<span class="section-title">Death Behavior</span>
<div class="btn-group behavior-grid">
<button class="btn-setting active" data-behavior="respawn">Save Progress</button>
<button class="btn-setting" data-behavior="restart">Full Restart</button>
</div>
</div>
</div>
  </main>
  <footer>
  <div class="status-left">
  <span><span class="online-dot"></span> 1 Online</span>
  <span style="opacity: 0.2;">|</span>
  <span>Server: 127.0.0.1:5500</span>
  </div>
  <div class="version-tag">v1.0.0</div>
  </footer>
  </div>
  `;
  }
}

customElements.define("settings-menu", SettingsMenu);

