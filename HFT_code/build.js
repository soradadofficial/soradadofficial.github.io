/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/*
 * Build script – produces the files index.html actually loads:
 *   style.css      -> style.min.css  (and inlined into index.html between the <!--css:start/end--> markers,
 *                                       so first paint needs no extra CSS request)
 *   js/**\/*.js    -> js/app.min.js   (one deferred, minified bundle)
 *
 * Usage:  node build.js        (needs Node 18+; esbuild is fetched with npx on first run)
 * Edit the readable sources (style.css, js/...), run the build, then publish.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

// load order matters: namespace -> data -> core -> ui -> systems -> main
const ORDER = [
  'js/core/namespace.js', 'js/data/dictionary.js', 'js/data/products.js', 'js/data/menu.js',
  'js/core/utils.js', 'js/core/state.js', 'js/core/i18n.js',
  'js/ui/toast.js', 'js/ui/cart.js', 'js/ui/modal.js', 'js/ui/products.js', 'js/ui/cartpanel.js', 'js/ui/minicart.js',
  'js/ui/navigation.js', 'js/ui/sections.js', 'js/ui/forms.js', 'js/ui/controls.js', 'js/ui/effects.js',
  'js/systems/search.js', 'js/systems/chat.js', 'js/systems/seo.js', 'js/systems/background.js',
  'js/main.js'
];
const BANNER = '/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */';

const tmp = path.join(os.tmpdir(), 'hft-bundle.js');
fs.writeFileSync(tmp, ORDER.map(f => fs.readFileSync(f, 'utf8')).join('\n;\n'));

const run = (args) => execFileSync('npx', ['--yes', 'esbuild@0.21', ...args], { stdio: 'inherit', shell: true });
run([`"${tmp}"`, '--minify', '--target=es2017', '--legal-comments=none', `--banner:js="${BANNER}"`, '--outfile=js/app.min.js']);
run(['style.css', '--minify', '--legal-comments=none', `--banner:css="${BANNER}"`, '--outfile=style.min.css']);

/* inline the minified CSS into index.html (replace between the markers; idempotent) */
let html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.min.css', 'utf8');
html = html.replace(/<!--css:start-->[\s\S]*?<!--css:end-->/, () => '<!--css:start--><style>' + css + '</style><!--css:end-->');
fs.writeFileSync('index.html', html);

for (const f of ['js/app.min.js', 'style.min.css']) console.log(f, (fs.statSync(f).size / 1024).toFixed(1) + ' KiB');
