/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Root namespace. Every module hangs off window.HFT (no build step, works from file://). */
window.HFT = {
  data: {},        // static game-like "assets": products, menus, dictionary
  ui: {},          // page components
  sys: {},         // self-contained systems (background, search, chat, seo)
  renderers: [],   // callbacks re-run whenever language/theme changes
  onRender: function (fn) { this.renderers.push(fn); }
};
