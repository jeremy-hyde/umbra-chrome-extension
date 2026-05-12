const STORAGE_KEY = 'umbra_enabled';
const HOST = location.hostname;
const IS_OLD_REDDIT = HOST === 'old.reddit.com';
const IS_GITHUB = HOST === 'github.com';

const REDDIT_CSS = `
  body, .content, .side, #header, #header-bottom-left, #header-bottom-right,
  .titlebox, .usertext-body, .md, .comment, .thing, .link, .self,
  .dropdown.srdrop, .drop-choices, .reddit-infobar,
  .RES-navTop, #sr-header-area {
    background-color: #1a1a1b !important;
    color: #d7dadc !important;
    border-color: #343536 !important;
  }
  #header { background-color: #1a1a1b !important; border-bottom: 1px solid #343536 !important; }
  #header-bottom-left .tabmenu li a,
  #header-bottom-right a,
  #header-bottom-left a { color: #818384 !important; }
  #header-bottom-left .tabmenu li.selected a { color: #d7dadc !important; border-bottom-color: #d7dadc !important; }
  .link .title a, a, a:visited { color: #4fbdba !important; }
  .link .title a:hover { color: #81d4d2 !important; }
  .link .score, .link .tagline, .comment .tagline { color: #818384 !important; }
  .arrow.up, .arrow.upmod { border-bottom-color: #ff6314 !important; }
  .arrow.down, .arrow.downmod { border-top-color: #9494ff !important; }
  .link .flat-list a, .comment .flat-list a { color: #818384 !important; }
  .link .flat-list a:hover, .comment .flat-list a:hover { color: #d7dadc !important; }
  .usertext-body .md blockquote { border-left: 3px solid #343536 !important; }
  .usertext-body .md pre, .usertext-body .md code {
    background-color: #272729 !important;
    color: #ff6314 !important;
    border-color: #343536 !important;
  }
  input, textarea, select {
    background-color: #272729 !important;
    color: #d7dadc !important;
    border-color: #343536 !important;
  }
  .side .spacer { border-color: #343536 !important; }
  .modactions .pretty-button, .pretty-button { background-color: #272729 !important; color: #d7dadc !important; }
  .rounded .thumbnail { filter: brightness(0.85) !important; }
  iframe { max-width: 100% !important; max-height: 80vh !important; }
`;

const GITHUB_CSS = `
  [class*="ContentWrapper-module__contentContainer"] {
    max-width: 1600px !important;
  }
  [class*="IssueViewer-module__metadataSidebar"] {
    width: 240px !important;
  }
  [class*="DiffComparisonViewer-module__Container"] {
    max-width: 1600px !important;
  }
  [class*="prc-PageLayout-Content-"] {
    max-width: none !important;
  }
`;

const GENERIC_CSS = `
  html {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  img, video, iframe, canvas, svg, [style*="background-image"] {
    filter: invert(1) hue-rotate(180deg) !important;
  }
`;

let styleEl = null;

function inject(css) {
  if (styleEl) return;
  styleEl = document.createElement('style');
  styleEl.id = 'umbra-dark';
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);
}

function eject() {
  if (styleEl) {
    styleEl.remove();
    styleEl = null;
  }
}

function apply(enabled) {
  if (enabled) {
    if (IS_OLD_REDDIT) inject(REDDIT_CSS);
    else inject(GENERIC_CSS);
  } else {
    eject();
  }
}

// Always-on GitHub layout widening
if (IS_GITHUB) {
  const githubEl = document.createElement('style');
  githubEl.id = 'umbra-github';
  githubEl.textContent = GITHUB_CSS;
  (document.head || document.documentElement).appendChild(githubEl);
}

// Apply on load from storage
chrome.storage.local.get(STORAGE_KEY, (res) => {
  const enabled = res[STORAGE_KEY] !== false; // default ON
  apply(enabled);
});

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'umbra_toggle') {
    apply(msg.enabled);
  }
});
