(()=>{(function(){if(window.__sfBanner)return;let e="sf-banner-stack",t="sf-banner-stack-tk",s={download:".sf-download-banner.sf-ready, .sf-download-banner.sf-error",transcribe:".sf-trans-banner.sf-ready, .sf-trans-banner.sf-error, .sf-trans-banner.sf-limit",gsheets:".sf-gsheets-banner.sf-ready, .sf-gsheets-banner.sf-error, .sf-gsheets-banner.sf-signin",upgrade:".sf-upgrade-banner"},n=_=>chrome.runtime.getURL(_);function o(){return/(^|\.)tiktok\.com$/.test(location.hostname)}document.documentElement.classList.add(o()?"sf-on-tk":"sf-on-ig");function r(){let _=o()?t:e,y=document.getElementById(_);return y||(y=document.createElement("div"),y.id=_,y.style.cssText=["position:fixed","top:15%","left:50%","transform:translateX(-50%)","display:flex","flex-direction:column","gap:8px","width:90%","max-width:600px","z-index:100000"].join(";"),document.body.appendChild(y)),y}function a(_,y,x,L,I){if(!_)return function(){};let q=_.querySelector(".sf-progress-fill"),v=_.querySelector(".sf-progress-pct"),M=Date.now(),J=!1;function pe(){if(J)return;let T=Date.now()-M,$=Math.min(1,T/L),V=1-Math.pow(1-$,2),te=Math.round(y+(x-y)*V);q&&(q.style.width=te+"%"),v&&(v.textContent=te+"%"),$<1?requestAnimationFrame(pe):I&&I()}return requestAnimationFrame(pe),function(){J=!0}}function i(_,y){if(!_)return;let x=Math.max(0,Math.min(100,Math.round(y))),L=_.querySelector(".sf-progress-fill"),I=_.querySelector(".sf-progress-pct");L&&(L.style.width=x+"%"),I&&(I.textContent=x+"%")}function c(_,y){return _?new Promise(function(x){setTimeout(function(){if(!_.isConnected){x();return}_.style.animation="sfSlideBounceUp 0.25s ease forwards",setTimeout(function(){_.remove(),x()},250)},y||0)}):Promise.resolve()}function l(_,y){let x=r(),L=s[y],I=L?Array.prototype.slice.call(document.querySelectorAll(L)):[];I.forEach(function(v){c(v,0)});let q=I.length?260:0;return new Promise(function(v){setTimeout(function(){x.appendChild(_),v(_)},q)})}function u(_){if(!_)return;_.classList.add("sf-static");let y=_.querySelector(".sf-icon");y&&y.classList.add("sf-static")}function p(_,y){let x=document.createElement("button");x.className="sf-banner-close",x.type="button",x.setAttribute("aria-label",y||"Close");let L=document.createElement("span");if(L.className="sf-banner-close-x",L.textContent="\xD7",x.appendChild(L),y){let I=document.createElement("span");I.className="sf-banner-close-tooltip",I.textContent=y,x.appendChild(I)}return x.addEventListener("click",function(I){I.stopPropagation(),typeof _=="function"&&_(I)}),x}function f(_,y){let x=document.createElement("button");x.className="sf-banner-stop",x.type="button",x.setAttribute("aria-label",y||"Stop");let L=document.createElement("span");if(L.className="sf-banner-stop-square",x.appendChild(L),y){let I=document.createElement("span");I.className="sf-banner-close-tooltip",I.textContent=y,x.appendChild(I)}return x.addEventListener("click",function(I){I.stopPropagation(),typeof _=="function"&&_(I)}),x}function d(_,y){let x=document.createElement("button");return x.className="sf-copy-btn",x.type="button",x.innerHTML='<img src="'+n("Icons/copyBlack.png")+'" alt="" /><span>Copy</span>',x.addEventListener("click",function(L){L.stopPropagation();let I=typeof _=="function"?_():String(_||"");I&&Promise.resolve(navigator.clipboard.writeText(I)).then(function(){x.classList.add("sf-copy-btn--fading"),setTimeout(function(){x.innerHTML='<img src="'+n("Icons/checkBlack.png")+'" alt="" /><span>Copied</span>',x.classList.remove("sf-copy-btn--fading"),x.classList.add("sf-copy-btn--copied"),typeof y=="function"&&y()},100)}).catch(function(){})}),x}function m(){try{return!!(chrome&&chrome.runtime&&chrome.runtime.id)}catch{return!1}}function g(_){let y=_||"Tab timed out from inactivity. Refresh the page to reconnect";if(document.querySelector(".sf-ctx-dead-banner"))return;if(!document.getElementById("sf-ctx-dead-style")){let J=document.createElement("style");J.id="sf-ctx-dead-style",J.textContent=["@keyframes sfCtxDeadIn{0%{transform:translateY(-120%);opacity:0}60%{transform:translateY(10px);opacity:1}80%{transform:translateY(-5px)}100%{transform:translateY(0)}}","@keyframes sfCtxDeadOut{0%{transform:translateY(0);opacity:1}20%{transform:translateY(-10px)}100%{transform:translateY(-120%);opacity:0}}","#sf-ctx-dead-stack{position:fixed;top:15%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:8px;width:90%;max-width:600px;z-index:100001;pointer-events:none}",".sf-ctx-dead-banner{pointer-events:auto;position:relative;width:100%;box-sizing:border-box;background:#ffffff;padding:12px 16px;padding-right:36px;display:flex;align-items:center;gap:10px;border:1px solid rgba(0,0,0,0.15);border-radius:0.75rem;box-shadow:0 4px 12px rgba(0,0,0,0.12);animation:sfCtxDeadIn 0.25s ease;font-family:-apple-system,BlinkMacSystemFont,system-ui,'Segoe UI',Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}",".sf-ctx-dead-banner .sf-ctx-dead-msg{font-size:16px;font-weight:500;color:#37352f;flex-grow:1;letter-spacing:-0.01em;line-height:1.4}",".sf-ctx-dead-banner .sf-ctx-dead-x{position:absolute;top:8px;right:8px;width:20px;height:20px;border:0;background:transparent;color:rgba(0,0,0,0.25);font-size:16px;line-height:1;cursor:pointer;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;padding:0;font-family:inherit;transition:background 0.15s ease,color 0.15s ease}",".sf-ctx-dead-banner .sf-ctx-dead-x:hover{background:rgba(0,0,0,0.05);color:rgba(0,0,0,0.55)}"].join(`
`),(document.head||document.documentElement).appendChild(J)}let x=document.getElementById("sf-ctx-dead-stack");x||(x=document.createElement("div"),x.id="sf-ctx-dead-stack",document.body.appendChild(x));let L=document.createElement("div");L.className="sf-ctx-dead-banner";let I=document.createElement("div");I.className="sf-ctx-dead-msg",I.textContent=y,L.appendChild(I);let q=!1;function v(){q||(q=!0,L.style.animation="sfCtxDeadOut 0.25s ease forwards",setTimeout(function(){L.isConnected&&L.remove()},250))}let M=document.createElement("button");M.className="sf-ctx-dead-x",M.type="button",M.setAttribute("aria-label","Close"),M.textContent="\xD7",M.addEventListener("click",function(J){J.stopPropagation(),v()}),L.appendChild(M),x.appendChild(L),setTimeout(v,6e3)}let k={isDownloading:!1,isTranscribing:!1,isGSheetsLoading:!1};window.__sfBanner={getStack:r,animateProgress:a,setProgress:i,dismissBanner:c,enterBanner:l,setStatic:u,makeCloseButton:p,makeStopButton:f,makeCopyButton:d,guards:k,iconURL:n,isContextAlive:m,showContextDeadBanner:g}})();function Mo(e){let t=e.replace(/^\/|\/$/g,"").split("/").filter(Boolean);return t.length>=2?t[1].toLowerCase():""}function Ar(e){let t=Mo(e);return!(t==="reels"||t==="tagged"||t==="feed"||t==="reposts")}function Fr(e){return Mo(e)==="reels"}function Io(e,t){if(!/^\/explore\/search\//.test(e))return!1;try{let n=new URLSearchParams(t||"").get("q");return!!(n&&n.trim().length>0)}catch{return!1}}function Yn(e){let t=e.match(/^\/[^\/]+\/saved(?:\/(.*))?$/);if(!t)return null;let s=(t[1]||"").replace(/\/$/,"");return s===""||s==="audio"?"saved_root":s==="all-posts"?"saved_all_posts":"saved_collection"}function Hr(e,t,s,n){if(document.getElementById("banner_most_viewed_reels")!==null&&typeof mo=="function"){let o=mo({sort_by:e,no_items:s,dates_items:t,outlier_scores:n===!0}),r=o.warm?Mi(o.plan):null;if(r){try{let a=chrome.runtime.sendMessage({sort_feed_resorted:!0,sort_by:e,count:r.count,noun:r.noun,selection_changed:r.selectionChanged});a&&typeof a.catch=="function"&&a.catch(()=>{})}catch{}return!1}}if(Io(location.pathname,location.search)){if(e==="outlier")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"outlier_go_to_profiles"}),!1;if(e==="views")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"explore_views_unsupported"}),!1;if(t==="dates")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"explore_dates_unsupported"}),!1;if(s==="all_reels")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"explore_all_unsupported"}),!1;sessionStorage.setItem("sortFeedSurface","explore_search"),sessionStorage.setItem("sortFeedPostsVSReels","Posts");try{let r=(new URLSearchParams(location.search).get("q")||"").trim().slice(0,60).replace(/[^a-zA-Z0-9_-]+/g,"_")||"results";sessionStorage.setItem("sortFeedSearchQuery",r)}catch{}return!0}else if(Yn(location.pathname)){let o=Yn(location.pathname);if(e==="outlier")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"outlier_go_to_profiles"}),!1;if(o==="saved_root")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"saved_root_unsupported"}),!1;if(t==="dates")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"saved_dates_unsupported"}),!1;if(o==="saved_all_posts"){if(e==="comments")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"saved_all_posts_comments_unsupported"}),!1;if(e==="views")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"saved_all_posts_views_unsupported"}),!1}else if(e==="views")return chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"saved_collection_views_unsupported"}),!1;return sessionStorage.setItem("sortFeedSurface","saved"),sessionStorage.setItem("sortFeedPostsVSReels","Posts"),sessionStorage.setItem("sortFeedSavedSubMode",o==="saved_all_posts"?"all_posts":"collection"),!0}else{let o=document.querySelectorAll('[role="tablist"]')[0],r=window.__sfReels&&window.__sfReels.ctx,a=!o&&r&&r.surface==="profile"&&r.path===location.pathname&&document.getElementById("banner_most_viewed_reels")!==null?r.tab:null;if(typeof o<"u"||a){let i,c;if(a)i=a==="Posts",c=a==="Reels";else{let u=o.querySelectorAll('[aria-selected="true"]')[0].getAttribute("href");i=Ar(u),c=Fr(u)}return i?e==="views"?(chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"post_views"}),!1):(sessionStorage.setItem("sortFeedPostsVSReels","Posts"),!0):c?(sessionStorage.setItem("sortFeedPostsVSReels","Reels"),!0):e==="outlier"?(chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"outlier_posts_reels_tabs_only"}),!1):(chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"no_posts_reels"}),!1)}else return e==="outlier"?(chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"outlier_go_to_profiles"}),!1):t==="dates"?(chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"dates_go_to_profiles"}),!1):(chrome.runtime.sendMessage({sort_feed_error:!0,error_type:"profile_pages"}),!1)}}async function Dr(){let e=await openDB(),t=e.transaction("TabData","readwrite");await t.objectStore("TabData").clear(),await t.done,e.close()}chrome.runtime.onMessage.addListener((e,t,s)=>{if(e.action==="refreshPage"&&Hr(e.sort_by,e.dates_items,e.no_items,e.outlier_scores)){sessionStorage.removeItem("sortFeedSortBy"),sessionStorage.removeItem("sortFeedNoItems"),sessionStorage.removeItem("sortFeedStatus"),sessionStorage.removeItem("sortItemsVsDates"),sessionStorage.removeItem("sortFeedData"),sessionStorage.removeItem("sortFeedPrepLabel"),sessionStorage.removeItem("sortFeedStopSorting");let n=Yn(location.pathname),o=n==="saved_all_posts"||n==="saved_collection";!Io(location.pathname,location.search)&&!o&&(sessionStorage.removeItem("sortFeedSurface"),sessionStorage.removeItem("sortFeedSavedSubMode")),Dr(),sessionStorage.setItem("sortFeedSortBy",e.sort_by),sessionStorage.setItem("sortFeedNoItems",e.no_items),sessionStorage.setItem("sortFeedStatus",!0),sessionStorage.setItem("sortItemsVsDates",e.dates_items);let r=sessionStorage.getItem("sortFeedPostsVSReels");e.outlier_scores===!0&&(r==="Reels"||r==="Posts")&&!sessionStorage.getItem("sortFeedSurface")?sessionStorage.setItem("sortFeedOutlier","on"):sessionStorage.removeItem("sortFeedOutlier");let a=sessionStorage.getItem("sortFeedSurface"),i="profile";a==="explore_search"?i="search":a==="saved"&&(i=sessionStorage.getItem("sortFeedSavedSubMode")==="collection"?"collection":"saved"),sessionStorage.setItem("sortFeedPrepLabel",i),window.location.reload()}});function Nr(){if(document.getElementById("sf-select-anim"))return;let e=document.createElement("style");e.id="sf-select-anim",e.textContent=`
    @keyframes sf-btn-in {
      from { opacity: 0; transform: translateY(4px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }
    @keyframes sf-btn-out {
      from { opacity: 1; transform: translateY(0)    scale(1);    }
      to   { opacity: 0; transform: translateY(-2px) scale(0.96); }
    }
    .sf-btn-out { animation: sf-btn-out 130ms cubic-bezier(0.4, 0, 1, 1) forwards; }
    .sf-btn-in  { animation: sf-btn-in  220ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    @keyframes sf-row-in {
      from { opacity: 0; transform: scale(0.985) translateY(2px); }
      to   { opacity: 1; transform: scale(1)     translateY(0);   }
    }
    .sf-row-in { animation: sf-row-in 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    /* Count badge spring-in \u2014 only fires on the initial 0\u21921 swap (Beta \u2192 1).
       Subsequent count changes and the exit back to 0 are intentionally
       instant. */
    @keyframes sf-count-badge-in {
      from { opacity: 0; transform: scale(0.5); }
      to   { opacity: 1; transform: scale(1);   }
    }
    .sf-count-badge-in { animation: sf-count-badge-in 240ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

    body.sf-select-active [data-sf-custom-ui],
    body.sf-select-active [data-sf-custom-ui] * {
      opacity: 0 !important;
      pointer-events: none !important;
    }

    body.sf-select-active .sf-hover-btns-wrapper {
      display: none !important;
    }
  `,document.head.appendChild(e)}function $r(){if(document.getElementById("sortfeed-export-menu-styles"))return;let e=document.createElement("style");e.id="sortfeed-export-menu-styles",e.textContent=`
    .sf-menu, .sf-menu * { box-sizing: border-box; }

    .sf-menu {
      position: absolute;
      bottom: calc(100% + 8px);
      right: 0;
      min-width: 170px;
      padding: 6px;
      border-radius: 10px;

      opacity: 0;
      pointer-events: none;

      transform-origin: bottom right;
      transform: translateY(6px) scale(0.98);

      transition:
        opacity 120ms ease,
        transform 140ms cubic-bezier(.2,.8,.2,1);

      z-index: 2147483647;
    }

    .sf-menu.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .sf-menu-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      font-size: 13px;
      font-weight: 500;
      line-height: 1;
      margin: 0;
    }
  `,document.head.appendChild(e)}function Ys(e,t,s){if(!e)return;let n=e.dataset.sfThemeDark==="1",o=e.dataset.sfIconFilter||"none",r=e.querySelector("span.sf-btn-label")||e.querySelector("span"),a=e.querySelector("img"),i=e.querySelector(".sf-beta-tag"),c=document.getElementById(t),l=document.getElementById("sf-beta-badge");if(s>0)if(e.style.pointerEvents="auto",e.style.cursor="pointer",r&&(r.style.color=""),a&&(a.style.filter=o),l&&(l.style.display="none"),i&&(i.style.background=n?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.06)",i.style.color=n?"rgba(242,243,245,0.5)":"rgba(0,0,0,0.38)"),c)c.textContent=s;else{c=document.createElement("span"),c.id=t;let u=document.getElementById("banner_most_viewed_reels")?.classList.contains("sf-primary-export");c.style.cssText=u?`
        display: inline-flex;
        align-items: center;
        color: ${n?"#a8a8a6":"rgba(0,0,0,0.45)"};
        font-size: 0.82rem;
        font-weight: 400;
        letter-spacing: -0.02em;
        line-height: 1;
        transform-origin: center;
        will-change: transform, opacity;
      `:`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: ${n?"#f2f3f5":"#1a1a1a"};
        color: ${n?"#1a1a1a":"#ffffff"};
        font-size: 0.68rem;
        font-weight: 500;
        border-radius: 100px;
        height: 18px;
        min-width: 18px;
        padding: 0 5px;
        line-height: 1;
        box-sizing: border-box;
        transform-origin: center;
        will-change: transform, opacity;
      `,c.textContent=s,e.appendChild(c),c.offsetWidth,c.classList.add("sf-count-badge-in")}else e.style.pointerEvents="none",e.style.cursor="default",c&&c.remove(),l&&(l.style.display=""),r&&(r.style.color=n?"rgba(242,243,245,0.25)":"rgba(0,0,0,0.28)"),a&&(a.style.filter=n?"brightness(0) invert(1) brightness(0.3)":"brightness(0) opacity(0.22)"),i&&(i.style.background=n?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",i.style.color=n?"rgba(242,243,245,0.35)":"rgba(0,0,0,0.32)")}function qr(){let e=document.querySelectorAll(".sf-select-circle[data-sf-selected='true']").length;Ys(document.getElementById("sf-export-transcripts-btn"),"sf-select-count-badge",e),Ys(document.getElementById("sf-select-download-btn"),"sf-select-download-count-badge",e)}var Ur=0,To=25;function Vr(){let e=window.__sfBanner;if(!e||document.querySelector(".sf-select-cap-banner"))return;let t=document.createElement("div");t.className="sf-banner sf-trans-banner sf-static sf-select-cap-banner",t.innerHTML=`
    <img class="sf-icon sf-static" src="${e.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-message">You can only transcribe up to ${To} videos at a time</div>
  `,t.appendChild(e.makeCloseButton(()=>e.dismissBanner(t,0))),e.enterBanner(t,"transcribe"),setTimeout(()=>e.dismissBanner(t,0),5e3)}function Or(e){let t=e.querySelector("img");if(e.dataset.sfSelected==="true")e.dataset.sfSelected="false",e.dataset.sfSelectOrder="",e.style.background="transparent",e.style.borderColor="rgba(255,255,255,0.9)",t&&(t.style.opacity="0");else{if(document.querySelectorAll(".sf-select-circle[data-sf-selected='true']").length>=To){Vr();return}e.dataset.sfSelected="true",e.dataset.sfSelectOrder=++Ur,e.style.background="white",e.style.borderColor="white",t&&(t.style.opacity="1")}qr()}function zr(){document.body.dataset.sfSelectMode="true",document.body.classList.add("sf-select-active"),document.querySelectorAll("[data-sf-custom-ui]").forEach(n=>{n.style.display="none",Array.from(n.children).forEach(o=>{o.style.opacity="0"})});let e=chrome.runtime.getURL("Icons/ButtonIcons/check.svg");document.querySelectorAll("[data-sf-sorted-item]").forEach(n=>{if(n.querySelector(".sf-select-circle"))return;let o=document.createElement("div");o.className="sf-select-circle",o.dataset.sfSelected="false",o.dataset.sfAction="true",o.style.cssText=`
      position: absolute;
      top: 8px; left: 8px;
      width: 22px; height: 22px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.9);
      background: transparent;
      z-index: 20;
      cursor: pointer;
      box-sizing: border-box;
      display: flex; align-items: center; justify-content: center;
      transition: background-color 0.12s ease, border-color 0.12s ease;
      box-shadow: 0 1px 4px rgba(0,0,0,0.35);
    `;let r=document.createElement("img");r.src=e,r.style.cssText=`
      width: 10px; height: 10px;
      pointer-events: none;
      opacity: 0;
      filter: brightness(0);
      transition: opacity 0.1s ease;
    `,o.appendChild(r),n.appendChild(o)});let s=n=>{let o=n.target.closest("[data-sf-sorted-item]");if(!o)return;n.stopPropagation(),n.preventDefault();let r=o.querySelector(".sf-select-circle");r&&Or(r)};document._sfSelectClickHandler=s,document.addEventListener("click",s,!0)}function jr(){delete document.body.dataset.sfSelectMode,document.body.classList.remove("sf-select-active"),document.querySelectorAll("[data-sf-custom-ui]").forEach(e=>{Array.from(e.children).forEach(t=>{t.style.opacity="0"}),e.style.display=""}),document.querySelectorAll(".sf-select-circle").forEach(e=>e.remove()),document._sfSelectClickHandler&&(document.removeEventListener("click",document._sfSelectClickHandler,!0),delete document._sfSelectClickHandler)}function Bo(e){let t=document.getElementById("sf-filters-row");if(t)if(t.style.overflow="hidden",e){t.style.display="flex",t.style.maxHeight="",t.style.opacity="1",t.style.marginTop="",t.style.paddingTop="",t.style.borderTopWidth="";let s=t.offsetHeight;t.style.maxHeight="0px",t.style.opacity="0",t.style.marginTop="0px",t.style.paddingTop="0px",t.style.borderTopWidth="0px",t.offsetWidth,requestAnimationFrame(()=>{t.style.maxHeight=s+"px",t.style.opacity="1",t.style.marginTop="",t.style.paddingTop="",t.style.borderTopWidth=""}),setTimeout(()=>{t.style.maxHeight="",t.style.overflow=""},360)}else t.style.maxHeight=t.offsetHeight+"px",t.offsetWidth,requestAnimationFrame(()=>{t.style.maxHeight="0px",t.style.opacity="0",t.style.marginTop="0px",t.style.paddingTop="0px",t.style.borderTopWidth="0px"}),setTimeout(()=>{t.style.display="none"},340)}function Yr(e){let t=document.getElementById("sf-btn-row");if(!t)return;if(window.__sfBanner&&!window.__sfBanner.isContextAlive()){window.__sfBanner.showContextDeadBanner();return}Nr(),t.style.alignItems="stretch",Bo(!1);let s=document.getElementById("sf-pill-group"),n=document.getElementById("export-native"),o=document.getElementById("select-native"),r=document.getElementById("sf-select-sep"),a=e.isDark?"transparent":"white",i=e.isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.04)",c=document.getElementById("banner_most_viewed_reels"),u=c?.classList.contains("sf-sorted-banner")?getComputedStyle(c).getPropertyValue("--sf-rb-quiet-icon").trim()||(e.isDark?"brightness(0) invert(1) opacity(0.6)":"brightness(0) opacity(0.5)"):e.isDark?"brightness(0) invert(1) brightness(0.85)":"brightness(0)",p=e.isDark?"rgba(255,255,255,0.22)":"rgb(230, 230, 230)",f=`
    background-color: ${a};
    color: ${e.isDark?"rgba(242,243,245,0.85)":"#1a1a1a"};
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.65rem;
    padding: 10px 16px;
    border-radius: 0;
    border: none;
    transition: background-color 0.15s ease;
    font-size: 0.82rem;
    font-weight: 500;
    line-height: 1;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    white-space: nowrap;
    user-select: none;
    position: relative;
    overflow: visible;
  `,d=document.createElement("div");d.id="sf-export-transcripts-btn",d.style.cssText=f,d.style.borderRadius="0 8px 8px 0",d.dataset.sfThemeDark=e.isDark?"1":"0",d.dataset.sfIconFilter=u;let m=document.createElement("img");m.src=chrome.runtime.getURL("Icons/BannerIconNew/ExportIconNew.svg"),m.style.cssText="height: 0.85rem; width: auto; pointer-events: none;";let g=document.createElement("span");g.className="sf-btn-label",g.textContent="Export + Transcripts",d.appendChild(m),d.appendChild(g);let k=F=>{let ee=document.createElement("div");return ee.className="tooltip",ee.textContent=F,ee.style.cssText=`
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background-color: rgb(0, 0, 0);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 400;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: all 0.2s ease;
      font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
      z-index: 1000;
    `,ee},_=k("Export selected data with video transcripts");d.appendChild(_);let y=document.createElement("div");y.id="sf-select-download-btn",y.style.cssText=f,y.style.borderRadius="8px 0 0 8px",y.dataset.sfThemeDark=e.isDark?"1":"0",y.dataset.sfIconFilter=u;let x=document.createElement("img");x.src=chrome.runtime.getURL("Icons/downloadCompact.svg"),x.style.cssText="height: 0.85rem; width: auto; pointer-events: none;";let L=document.createElement("span");L.className="sf-btn-label",L.textContent="Download",y.appendChild(x),y.appendChild(L);let I=k("Download media from selected posts");y.appendChild(I),y.style.pointerEvents="none",y.style.cursor="default",L.style.color=e.isDark?"rgba(242,243,245,0.25)":"rgba(0,0,0,0.28)",x.style.filter=e.isDark?"brightness(0) invert(1) brightness(0.3)":"brightness(0) opacity(0.22)",y.addEventListener("mouseover",()=>{y.style.pointerEvents!=="none"&&(y.style.backgroundColor=i,I.style.opacity="1",I.style.transform="translateX(-50%) translateY(0)")}),y.addEventListener("mouseout",()=>{y.style.backgroundColor=a,I.style.opacity="0",I.style.transform="translateX(-50%) translateY(4px)"}),y.addEventListener("click",()=>{if(y.style.pointerEvents==="none"||typeof Eo!="function")return;let F=Eo();if(F.length===0)return;let ee=sessionStorage.getItem("sortFeedSurface"),z=ee==="explore_search"||ee==="saved"?null:window.location.pathname.replace(/^\/|\/$/g,"").split("/")[0]||F[0]?.userName||"sortfeed";typeof _n=="function"&&_n(F,z,"selected")});let q=document.createElement("div");q.id="sf-select-pill-group",q.style.cssText=`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    background-color: ${a};
    border: 1px solid ${p};
    border-radius: 8px;
  `,d.style.pointerEvents="none",d.style.cursor="default",g.style.color=e.isDark?"rgba(242,243,245,0.25)":"rgba(0,0,0,0.28)",m.style.filter=e.isDark?"brightness(0) invert(1) brightness(0.3)":"brightness(0) opacity(0.22)";let v=document.createElement("div");v.id="sf-select-close-btn",v.style.cssText=`
    background-color: ${a};
    color: ${e.isDark?"rgba(242,243,245,0.85)":"#1a1a1a"};
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 16px;
    border-radius: 8px;
    border: 1px solid ${e.isDark?"rgba(255,255,255,0.22)":"rgb(230, 230, 230)"};
    transition: background-color 0.15s ease;
    font-size: 0.82rem;
    font-weight: 500;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    white-space: nowrap;
    user-select: none;
  `,v.textContent="Cancel",d.addEventListener("mouseover",()=>{d.style.pointerEvents!=="none"&&(d.style.backgroundColor=i,_.style.opacity="1",_.style.transform="translateX(-50%) translateY(0)")}),d.addEventListener("mouseout",()=>{d.style.backgroundColor=a,_.style.opacity="0",_.style.transform="translateX(-50%) translateY(4px)"}),v.addEventListener("mouseover",()=>{v.style.backgroundColor=i}),v.addEventListener("mouseout",()=>{v.style.backgroundColor=a}),v.addEventListener("click",()=>Zr(e)),$r();let M=document.createElement("div");M.className="sf-menu",M.style.background=e.menuBg,M.style.border=`1px solid ${e.menuBorder}`,M.style.boxShadow=e.menuShadow,M.style.color=e.menuText,M.style.fontFamily="SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",M.style.overflow="hidden",M.style.borderRadius="12px",M.style.padding="6px",M.style.zIndex="2147483647";let J=()=>M.classList.contains("open"),pe=()=>M.classList.add("open"),T=()=>M.classList.remove("open"),$=()=>J()?T():pe(),V=(F,ee)=>{let ue=document.createElement("div");return ue.className="sf-menu-item",ue.textContent=F,ue.addEventListener("mouseenter",()=>{ue.style.background=e.menuItemHoverBg}),ue.addEventListener("mouseleave",()=>{ue.style.background="transparent"}),ue.addEventListener("click",z=>{z.stopPropagation(),chrome.runtime.sendMessage({command:"checkProStatus"},j=>{if(j?.isPro){let H=Array.from(document.querySelectorAll(".sf-select-circle[data-sf-selected='true']")).sort((Ce,le)=>Number(Ce.dataset.sfSelectOrder)-Number(le.dataset.sfSelectOrder)),ie=[];H.forEach(Ce=>{let le=Ce.closest("[data-sf-sorted-item]");if(!(!le||!le.dataset.sfItemJson))try{ie.push(JSON.parse(le.dataset.sfItemJson))}catch{}}),oa(ie,ee,sessionStorage.getItem("sortFeedPostsVSReels"),e),T()}else{let H=document.querySelectorAll(".sf-select-circle[data-sf-selected='true']").length;T();let ie=`${H} Post${H!==1?"s":""} selected \u2014 Transcribe selected with Pro`;typeof ut=="function"&&ut(ie)}})}),ue};M.appendChild(V("Google Sheets","google_sheets")),M.appendChild(V("Excel","excel")),M.appendChild(V("CSV","csv")),M.appendChild(V("JSON","json")),d.appendChild(M),d.addEventListener("click",F=>{d.style.pointerEvents!=="none"&&(F.stopPropagation(),$())});let te=F=>{d.contains(F.target)||T()},ne=F=>{F.key==="Escape"&&T()};document.addEventListener("click",te),document.addEventListener("keydown",ne),d._sf_cleanup=()=>{document.removeEventListener("click",te),document.removeEventListener("keydown",ne)},[s,n,o,r].forEach(F=>{F&&(F.style.animationDelay="0ms",F.classList.add("sf-btn-out"))}),setTimeout(()=>{[s,n,o,r].forEach(ee=>{ee&&(ee.classList.remove("sf-btn-out"),ee.style.animationDelay="",ee.style.display="none")}),q.appendChild(y);let F=document.createElement("div");F.className="sf-pill-sep",F.style.cssText=`
      align-self: center;
      flex: 0 0 auto;
      width: 1px;
      height: 22px;
      background-color: ${p};
    `,q.appendChild(F),q.appendChild(d),q.classList.add("sf-btn-in"),v.classList.add("sf-btn-in"),v.style.animationDelay="0ms",document.getElementById("banner_most_viewed_reels")?.classList.contains("sf-primary-export")?(t.appendChild(v),t.appendChild(q)):(t.appendChild(q),t.appendChild(v)),zr()},175)}function Zr(e){let t=document.getElementById("sf-export-transcripts-btn"),s=document.getElementById("sf-select-pill-group"),n=document.getElementById("sf-select-close-btn");t?._sf_cleanup&&t._sf_cleanup(),jr(),[s,n].forEach(o=>{o&&(o.style.animationDelay="0ms",o.classList.add("sf-btn-out"))}),setTimeout(()=>{s&&s.remove(),n&&n.remove();let o=document.getElementById("sf-btn-row"),r=document.getElementById("sf-pill-group"),a=document.getElementById("export-native"),i=document.getElementById("select-native"),c=document.getElementById("sf-select-sep");o&&(o.style.alignItems="stretch"),[r,a,i,c].forEach(l=>{l&&(l.style.display="flex",l.classList.remove("sf-btn-in","sf-btn-out"),l.style.animationDelay="")}),Bo(!0),o&&(o.classList.remove("sf-btn-in"),o.offsetWidth,o.classList.add("sf-btn-in"),o.addEventListener("animationend",()=>{o.classList.remove("sf-btn-in")},{once:!0}))},150)}var $t=[],ze=0,je=0,Se=!1,pn=!1,De={},yt={},Xt={},un=new Set,Ro=0,Ne=0,bt=0,Po=null,Ao=null,Ue=0,tt=null,ot=null,mn=null,Gr=24e4;function Kt(){return document.querySelector(".sf-trans-banner.sf-progress")}function Wr(){return"Transcribing"}function Fo(){let e=Kt();if(!e)return;let t=Math.max(0,Math.min(100,Math.round(Ue)));window.__sfBanner.setProgress(e,t)}function Xr(){let e=window.__sfBanner;if(Kt())return;let t=document.createElement("div");t.className="sf-banner sf-trans-banner sf-progress",t.innerHTML=`
    <img class="sf-icon" src="${e.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-body">
      <div class="sf-message">${Wr()}</div>
      <div class="sf-progress-row">
        <div class="sf-progress-track"><div class="sf-progress-fill"></div></div>
        <span class="sf-progress-pct">0%</span>
      </div>
    </div>
  `,t.appendChild(e.makeStopButton(()=>{Se=!0,e.guards.isTranscribing=!1,dt(),chrome.runtime.sendMessage({command:"cancelSelectMission"}),us(),qt()},"Stop transcribing")),e.enterBanner(t,"transcribe")}function Kr(e,t){if(e==null||t==null)return;let s=Kt();if(!s)return;let n=s.querySelector(".sf-body");if(!n||n.querySelector(".sf-subtitle"))return;let o=Math.ceil(Number(t)/60),r=document.createElement("div");r.className="sf-subtitle",r.textContent=`${o} of ${e} monthly mins left`;let a=n.querySelector(".sf-progress-row");a?n.insertBefore(r,a):n.appendChild(r),r.animate([{opacity:0,transform:"translateY(-3px)"},{opacity:1,transform:"translateY(0)"}],{duration:220,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"both"})}function us(){let e=window.__sfBanner;dt();let t=Kt();t&&e.dismissBanner(t,0)}function Jr(){let e=window.__sfBanner;dt();let t=Kt();t&&e.animateProgress(t,Ue,100,400,()=>{e.dismissBanner(t,0)})}function Qr(e){return 1-(1-e)*(1-e)}function ms(e,t,s){clearInterval(tt),Ue=e;let n=Date.now(),o=Math.max(1,s|0);tt=setInterval(()=>{if(Se){clearInterval(tt);return}let r=Math.min(1,(Date.now()-n)/o);if(Ue=e+(t-e)*Qr(r),Fo(),r>=1&&(clearInterval(tt),tt=null,!Se&&je<Ne)){let a=(je+1)/Ne*100,i=Math.min(a-2,Ue+8);i>Ue+.5&&ms(Ue,i,9e3)}},80)}function dt(){clearInterval(tt),tt=null}function Ho(){for(;ze<2&&$t.length>0&&!Se;){let e=$t.shift();ze++,ea(e)}}async function ea(e){if(Se){ze--;return}let t=e.id,s=null,n=null;if(t)try{let i=await fetch(`https://www.instagram.com/api/v1/media/${t}/info/`,{method:"GET",credentials:"include",headers:{"x-ig-app-id":"936619743392459"}});if(i.ok){let c=await i.json(),l=Array.isArray(c)?c[0]:c?.items?.[0]??c,u=f=>f&&f.match(/<AdaptationSet[^>]*contentType="audio"[^>]*>[\s\S]*?<BaseURL>([^<]+)<\/BaseURL>/i)?.[1]?.replace(/&amp;/g,"&")||null,p=l?.clips_metadata?.original_sound_info?.progressive_download_url;if(p&&/^https?:\/\//i.test(p))s="progressive",n=p;else{let f=u(l?.video_dash_manifest);if(f)s="dashAudio",n=f;else{let d=l?.video_versions?.[0]?.url||null;d&&(s="videoFallback",n=d)}}}}catch{}if(!n||Se){De[e.code].transcript=null,Se||bt++,ze--,je++,hn(null);return}let o=++Ro;yt[o]=e.code;let r=await hs();Xt[o]={ReelType:s,ReelURL:n,reelIdUi:e.code,profileName:e.userName};let a=ta();chrome.runtime.sendMessage({command:"SelectMissionTranscribe",ReelType:s,ReelURL:a?_r(n,a):n,jobId:o,userID:r,reelIdUi:e.code,profileName:e.userName,platform:"instagram"})}function ta(){try{return typeof kn<"u"?kn:!1}catch{return!1}}async function na(e){let t=Xt[e],s=null;try{t?.ReelURL&&typeof ps=="function"&&!Se&&(s=await ps(t.ReelURL))}catch(o){console.error("IG mission fallback download failed:",o)}if(Se)return;if(s?.base64){chrome.runtime.sendMessage({command:"SelectMissionTranscribe",ReelType:t.ReelType,ReelBase64:s.base64,jobId:e,userID:await hs(),reelIdUi:t.reelIdUi,profileName:t.profileName,platform:"instagram"});return}let n=yt[e];n&&De[n]&&(De[n].transcript=null),bt++,ze--,je++,hn(e)}async function hs(){try{return(await chrome.storage.local.get("sort_feed_user_id"))?.sort_feed_user_id??null}catch{return null}}function hn(e){e!==null&&(delete yt[e],delete Xt[e],un.delete(e));let t=je>=Ne,s=$t.length===0&&ze===0;if(t||s)dt(),Jr(),setTimeout(()=>qt(),700);else{let n=je/Ne*100;ms(Ue,n,600),Ho()}}function sa(e){let{type:t,jobId:s}=e;if(t==="MISSION_TRANS_STARTED"){Kr(e.monthly_quota_mins,e.monthly_usage_secs);return}if(t!=="MISSION_TRANS_LOADING"){if(t==="MISSION_TRANS_RESULT"){let n=yt[s];n&&De[n]&&(De[n].transcript=e.transcription??null),ze--,je++,hn(s);return}if(t==="MISSION_TRANS_ERROR"){if(e.errorCode==="media_fetch_failed"&&!un.has(s)&&Xt[s]&&!Se){un.add(s),na(s);return}let n=yt[s];n&&De[n]&&(De[n].transcript=null),e.errorCode!=="cancelled"&&bt++,ze--,je++,hn(s);return}if(t==="MISSION_TRANS_LIMIT"){Se=!0,dt(),typeof ds=="function"&&e.limitMessage&&ds(e.limitMessage),us(),qt();return}}}function qt(){if(pn)return;pn=!0,window.__sfBanner.guards.isTranscribing=!1,clearTimeout(mn),mn=null,ot&&(chrome.runtime.onMessage.removeListener(ot),ot=null);let e=Object.values(De);if(e.length&&(chrome.runtime.sendMessage({export_click:!0,export_format:Po,posts_vs_reels:Ao,sorted_data:e}),bt>0&&!Se&&typeof Oe=="function")){let t=Ne-bt;setTimeout(()=>{Oe(`Transcribed ${t} of ${Ne} \u2014 failed items are blank in the export`)},1100)}}function oa(e,t,s){chrome.runtime.sendMessage({command:"checkProStatus"},n=>{if(!n?.isPro){typeof ut=="function"&&ut();return}let o=window.__sfBanner;if(!o||o.guards.isTranscribing)return;$t=[],ze=0,je=0,Se=!1,pn=!1,De={},yt={},Xt={},un=new Set,Ro=0,bt=0,Ue=0,dt(),Po=t,Ao=e[0]?.postsVsReels??s,e.forEach(i=>{De[i.code]={...i,transcript:i.mediaType===2?"":null}});let r=e.filter(i=>i.mediaType===2);if(Ne=r.length,$t=[...r],o.guards.isTranscribing=!0,Ne===0){qt();return}ot&&chrome.runtime.onMessage.removeListener(ot),ot=i=>{typeof i?.type!="string"||!i.type.startsWith("MISSION_TRANS")||sa(i)},chrome.runtime.onMessage.addListener(ot),Xr(),hs().then(i=>{i&&chrome.runtime.sendMessage({command:"fetchTransQuotaInfo",jobId:0,userID:i,mission:!0})}),Ho(),Fo();let a=1/Ne*100;ms(0,Math.max(4,Math.min(a-4,12)),8e3),clearTimeout(mn),mn=setTimeout(()=>{pn||(Se=!0,dt(),us(),qt())},Ne*Gr)})}var ra=!1,aa=!0,ia="ig";var He={badgeFs:16,badgeIc:12,badgeFw:600,hoverFs:19,hoverIc:14,hoverFw:600,gap:6,sep:10,inset:8,rowGap:24};function gn(){ra&&console.log.apply(console,["[sf-cm]"].concat([].slice.call(arguments)))}function Do(){let e=null;try{e=sessionStorage.getItem("sortFeedSurface")}catch{return!0}return!e||e==="explore_search"||e==="saved"}var la={views:{vb:"0 0 96 108",d:"M-7.84732e-05 97.499V10.0903C-7.84732e-05 6.6649 0.866581 4.12683 2.5999 2.47605C4.33322 0.825269 6.39669 -0.000120815 8.79032 -0.000120815C10.9363 -0.000120815 13.0823 0.598287 15.2284 1.7951L88.3373 44.509C90.9785 46.036 92.8769 47.4804 94.0324 48.8423C95.2293 50.2042 95.8277 51.855 95.8277 53.7947C95.8277 55.693 95.2293 57.3438 94.0324 58.747C92.8769 60.1089 90.9785 61.5533 88.3373 63.0803L15.2284 105.794C13.0823 106.991 10.9363 107.589 8.79032 107.589C6.39669 107.589 4.33322 106.743 2.5999 105.051C0.866581 103.401 -7.84732e-05 100.883 -7.84732e-05 97.499Z"},likes:{vb:"0 0 126 116",d:"M62.5231 115.885C61.7802 115.885 60.8723 115.637 59.7993 115.142C58.7263 114.647 57.7358 114.09 56.8279 113.471C45.2724 106.042 35.2233 98.2421 26.6805 90.0707C18.179 81.8994 11.5965 73.4804 6.93306 64.8138C2.31088 56.1472 -0.000211988 47.4187 -0.000211988 38.6283C-0.000211988 32.9331 0.907717 27.7332 2.72357 23.0285C4.53943 18.2825 7.0775 14.1968 10.3378 10.7714C13.5981 7.34605 17.3536 4.70481 21.6044 2.84768C25.8964 0.949285 30.5186 8.68328e-05 35.4709 8.68328e-05C41.6201 8.68328e-05 46.9851 1.56833 51.566 4.70481C56.1469 7.84129 59.7993 11.927 62.5231 16.9618C65.3294 11.8857 69.0024 7.80002 73.542 4.70481C78.1229 1.56833 83.488 8.68328e-05 89.6371 8.68328e-05C94.5894 8.68328e-05 99.2116 0.949285 103.504 2.84768C107.796 4.70481 111.551 7.34605 114.77 10.7714C117.989 14.1968 120.507 18.2825 122.323 23.0285C124.18 27.7332 125.108 32.9331 125.108 38.6283C125.108 47.4187 122.777 56.1472 118.113 64.8138C113.45 73.4804 106.867 81.8994 98.3656 90.0707C89.9054 98.2421 79.8975 106.042 68.3421 113.471C67.3929 114.09 66.3818 114.647 65.3087 115.142C64.277 115.637 63.3484 115.885 62.5231 115.885Z"},comments:{vb:"0 0 139 131",d:"M38.5043 130.742C36.6059 130.742 35.1409 130.123 34.1091 128.885C33.0774 127.688 32.5615 126.058 32.5615 123.994V106.166H28.6616C22.6775 106.166 17.5394 105.031 13.2474 102.761C8.99664 100.45 5.71572 97.1483 3.40463 92.8563C1.13481 88.523 -0.000105176 83.2817 -0.000105176 77.1326V29.0949C-0.000105176 22.9458 1.13481 17.7252 3.40463 13.4331C5.67445 9.09984 8.95537 5.77764 13.2474 3.46655C17.5807 1.15546 22.8632 -8.27387e-05 29.0949 -8.27387e-05H109.632C115.823 -8.27387e-05 121.085 1.15546 125.418 3.46655C129.751 5.77764 133.053 9.09984 135.323 13.4331C137.592 17.7252 138.727 22.9458 138.727 29.0949V77.1326C138.727 83.2817 137.592 88.523 135.323 92.8563C133.053 97.1483 129.751 100.45 125.418 102.761C121.085 105.031 115.823 106.166 109.632 106.166H68.7755L46.1185 126.656C44.5503 128.059 43.209 129.091 42.0948 129.751C40.9805 130.411 39.7837 130.742 38.5043 130.742ZM36.5853 36.2139H101.399C102.513 36.2139 103.462 35.8218 104.247 35.0377C105.031 34.2123 105.423 33.2425 105.423 32.1282C105.423 31.0139 105.031 30.0854 104.247 29.3425C103.462 28.5584 102.513 28.1663 101.399 28.1663H36.5853C35.5123 28.1663 34.5837 28.5584 33.7996 29.3425C33.0155 30.0854 32.6234 31.0139 32.6234 32.1282C32.6234 33.2425 33.0155 34.2123 33.7996 35.0377C34.5837 35.8218 35.5123 36.2139 36.5853 36.2139ZM36.5853 56.6423H101.399C102.513 56.6423 103.462 56.2502 104.247 55.4661C105.031 54.682 105.423 53.7122 105.423 52.5566C105.423 51.4836 105.031 50.555 104.247 49.7709C103.462 48.9868 102.513 48.5947 101.399 48.5947H36.5853C35.5123 48.5947 34.5837 49.0074 33.7996 49.8328C33.0155 50.6169 32.6234 51.5249 32.6234 52.5566C32.6234 53.7122 33.0155 54.682 33.7996 55.4661C34.5837 56.2502 35.5123 56.6423 36.5853 56.6423ZM36.5853 77.1326H78.804C79.9595 77.1326 80.9087 76.7405 81.6516 75.9564C82.4357 75.1723 82.8277 74.2231 82.8277 73.1088C82.8277 71.9945 82.4357 71.0453 81.6516 70.2612C80.9087 69.4771 79.9595 69.085 78.804 69.085H36.5853C35.5123 69.085 34.5837 69.4771 33.7996 70.2612C33.0155 71.0453 32.6234 71.9945 32.6234 73.1088C32.6234 74.2231 33.0155 75.1723 33.7996 75.9564C34.5837 76.7405 35.5123 77.1326 36.5853 77.1326Z"},outlier:{vb:"0 0 91 142",d:"M0.000235956 78.6803C0.000235956 77.3184 0.557374 75.9152 1.67165 74.4708L59.5521 2.97143C60.6664 1.56827 61.8632 0.722242 63.1425 0.433356C64.4219 0.14447 65.5774 0.268278 66.6092 0.804781C67.6409 1.34128 68.3631 2.22858 68.7758 3.46666C69.1885 4.66348 69.0647 6.08728 68.4044 7.73805L49.5855 58.4995H85.4281C86.8312 58.4995 87.9661 58.9328 88.8328 59.7995C89.7407 60.6249 90.1947 61.6979 90.1947 63.0185C90.1947 64.3804 89.6376 65.7629 88.5233 67.1661L30.6428 138.727C29.5286 140.089 28.3317 140.915 27.0524 141.204C25.773 141.534 24.6175 141.431 23.5857 140.894C22.554 140.358 21.8318 139.47 21.4191 138.232C21.0064 137.035 21.1302 135.591 21.7905 133.899L40.6094 83.1374H4.76686C3.3637 83.1374 2.20815 82.7247 1.30022 81.8993C0.433566 81.0327 0.000235956 79.9597 0.000235956 78.6803Z"},oldest:{vb:"0 0 128 128",d:"M32.6852 71.685H63.885C65.2881 71.685 66.4643 71.2104 67.4135 70.2612C68.3627 69.312 68.8373 68.1358 68.8373 66.7327V26.1854C68.8373 24.8235 68.3627 23.668 67.4135 22.7188C66.4643 21.7696 65.2881 21.295 63.885 21.295C62.5231 21.295 61.3675 21.7696 60.4183 22.7188C59.4691 23.668 58.9945 24.8235 58.9945 26.1854V61.8423H32.6852C31.2821 61.8423 30.1059 62.3169 29.1567 63.266C28.2075 64.174 27.7329 65.3295 27.7329 66.7327C27.7329 68.1358 28.2075 69.312 29.1567 70.2612C30.1059 71.2104 31.2821 71.685 32.6852 71.685ZM63.9469 127.894C55.1152 127.894 46.8407 126.223 39.1233 122.88C31.4059 119.578 24.6171 114.997 18.7568 109.137C12.8965 103.277 8.29498 96.488 4.95215 88.7706C1.6506 81.0532 -0.000183064 72.7787 -0.000183064 63.947C-0.000183064 55.1153 1.6506 46.8408 4.95215 39.1234C8.29498 31.3647 12.8965 24.5759 18.7568 18.7569C24.6171 12.8966 31.4059 8.31573 39.1233 5.01417C46.8407 1.67134 55.1152 -7.00466e-05 63.9469 -7.00466e-05C72.7786 -7.00466e-05 81.0531 1.67134 88.7705 5.01417C96.5291 8.31573 103.339 12.8966 109.199 18.7569C115.059 24.5759 119.64 31.3647 122.942 39.1234C126.284 46.8408 127.956 55.1153 127.956 63.947C127.956 72.7787 126.284 81.0532 122.942 88.7706C119.64 96.488 115.059 103.277 109.199 109.137C103.339 114.997 96.5291 119.578 88.7705 122.88C81.0531 126.223 72.7786 127.894 63.9469 127.894Z"}};function ca(e,t){if(t){let o=la[e];if(o)return'<svg class="sf-cm-ic" viewBox="'+o.vb+'" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="'+o.d+'"/></svg>'}let n=(typeof Vt<"u"&&Vt||[]).find(o=>o.key===e);return!n||!n.vb||!n.icon?"":'<svg class="sf-cm-ic" viewBox="'+n.vb+'" xmlns="http://www.w3.org/2000/svg">'+n.icon+"</svg>"}function fa(e){if(e==null||e===""||isNaN(e))return null;let t=Number(e),s=t<0?"-":"",n=Math.abs(t),o=[[1e9,"B"],[1e6,"M"],[1e3,"K"]];for(let r=0;r<o.length;r++){let a=o[r][0],i=n/a;if(i<.9995)continue;let c=i>=100?i.toFixed(0):i.toFixed(1).replace(/\.0$/,"");return s+c+o[r][1]}return s+String(Math.round(n))}function da(e){let t=typeof e=="number"?e:Date.parse(e);if(!t||isNaN(t))return null;let s=Math.max(0,Math.floor((Date.now()-t)/1e3));if(s<3600)return"now";let n=Math.floor(s/3600);if(n<24)return n+"h";let o=Math.floor(s/86400);return o<7?o+"d":o<28?Math.floor(o/7)+"w":o<365?Math.max(1,Math.floor(o/30.44))+"mo":Math.floor(o/365)+"y"}var Ut={reels:["views","likes","comments"],posts:["likes","comments"],search:["likes","comments"],saved_all:["likes","views"],saved_collection:["likes","comments","views"]},Dn=3;function pa(e){return(Ut[e]||Ut.reels)[0]}function ua(e,t,s){let o=(Ut[e]||Ut.reels).slice(),r=t==="outlier"&&s?"outlier":t==="oldest"?"date":null;return r&&(o.length>=Dn?o[Dn-1]=r:o.push(r)),o.slice(0,Dn)}function ma(e,t){return e!=="outlier"?e:typeof oe<"u"&&oe&&oe.status==="ok"&&oe.baseline>0?"outlier":t==="reels"?"views":"likes"}function Nn(e,t){if(!e)return null;if(t==="date"){let o=da(e.createDate);return o?{icon:aa?"oldest":null,text:o}:null}if(t==="outlier"){let o=typeof Rt=="function"?Rt(e):null;return o?{icon:"outlier",text:o}:null}let n=fa(e[t==="likes"?"likesCount":t==="comments"?"commentsCount":"viewCount"]);return n===null?null:{icon:t,text:n}}function Zs(e,t){return'<span class="sf-cm-row">'+(e.icon?ca(e.icon,t):"")+'<span class="sf-cm-val">'+e.text+"</span></span>"}function No(){if(document.getElementById("sf-card-metrics-style"))return;let e=document.createElement("style");e.id="sf-card-metrics-style",e.textContent=`
    .sf-cm-badge, .sf-cm-kpi{
      color:#fff; line-height:1;
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;
      -webkit-font-smoothing:antialiased;
    }
    .sf-cm-row{ display:flex; align-items:center; gap:var(--sf-cm-gap,.42em); white-space:nowrap; }
    .sf-cm-ic{ width:auto; flex-shrink:0; fill:currentColor; display:block; }
    .sf-cm-badge .sf-cm-ic{ height:var(--sf-cm-badge-ic,1em); }
    .sf-cm-kpi .sf-cm-ic{ height:var(--sf-cm-hover-ic,1em); }

    /* Corner badge \u2014 the sorted metric. Fades out on hover; the KPI stack
       re-states it in slot 1, so the card doesn't say the same number twice. */
    .sf-cm-badge{
      position:absolute; z-index:11; pointer-events:none;
      display:flex; align-items:center; gap:var(--sf-cm-sep,.62em);
      left:var(--sf-cm-inset,9px); bottom:var(--sf-cm-inset,9px);
      font-size:var(--sf-cm-badge-fs,14px); font-weight:var(--sf-cm-badge-fw,600);
      text-shadow:0 1px 3px rgba(0,0,0,.55);
      transition:opacity 150ms ease;
    }
    .sf-cm-badge .sf-cm-ic{ filter:drop-shadow(0 1px 2px rgba(0,0,0,.55)); }

    /* Hover stack \u2014 same centred column as before, just sized off the card and
       tightened. Gap was a fixed 30\u201340px, which swamped a narrow tile. */
    /* Notion-style separator: a dot, not a slash or a pipe. Sized off the type
       so it stays proportional, and translucent so it recedes behind both
       numbers rather than competing with them. */
    .sf-cm-dot{
      width:.22em; height:.22em; border-radius:50%;
      background:currentColor; opacity:.45; flex-shrink:0;
    }

    .sf-cm-kpi{
      display:flex; flex-direction:column; align-items:center;
      gap:var(--sf-cm-row-gap,1.5em); font-size:var(--sf-cm-hover-fs,16px); font-weight:var(--sf-cm-hover-fw,600);
    }

    /* IG's own count pill. A RULE, not an inline style, because the sorted grid
       holds IG's real nodes \u2014 MOVED out of the native grid, not cloned \u2014 so
       React still owns them and re-renders them after we have painted. Every
       re-render mints a fresh ._aaj_ with our inline display:none gone, which is
       exactly how the pill kept coming back. A rule applies to the new node the
       instant it lands. Scoped to our own marker, which only exists while a sort
       is on screen (clearing one reloads the page). */
    [data-sf-sorted-item="true"] ._aaj_{ display:none !important; }
  `,document.head.appendChild(e)}function $o(e){if(!e)return;let t=(r,a)=>e.style.setProperty(r,a);if(ia==="ig"){t("--sf-cm-badge-fs",He.badgeFs+"px"),t("--sf-cm-badge-ic",He.badgeIc+"px"),t("--sf-cm-badge-fw",String(He.badgeFw)),t("--sf-cm-hover-fs",He.hoverFs+"px"),t("--sf-cm-hover-ic",He.hoverIc+"px"),t("--sf-cm-hover-fw",String(He.hoverFw)),t("--sf-cm-gap",He.gap+"px"),t("--sf-cm-sep",He.sep+"px"),t("--sf-cm-inset",He.inset+"px"),t("--sf-cm-row-gap",He.rowGap+"px"),gn("size","ig-native");return}let s=e.querySelector('[data-sf-sorted-item="true"]'),n=s?s.getBoundingClientRect().width:0;if(!n)return;let o=(r,a,i)=>Math.max(a,Math.min(i,n*r)).toFixed(2)+"px";t("--sf-cm-badge-fs",o(.05,11,17)),t("--sf-cm-hover-fs",o(.06,12,20)),t("--sf-cm-inset",o(.026,6,12)),t("--sf-cm-badge-ic","1em"),t("--sf-cm-hover-ic","1em"),t("--sf-cm-gap",".42em"),t("--sf-cm-sep",".62em"),t("--sf-cm-row-gap","1.5em"),t("--sf-cm-badge-fw","700"),t("--sf-cm-hover-fw","500"),gn("size","scaled",{tileW:Math.round(n)})}var tn=null;function ha(e){!e||typeof ResizeObserver>"u"||(tn&&tn.disconnect(),tn=new ResizeObserver(()=>$o(e)),tn.observe(e))}var nn=null;function ga(e){if(!e||typeof MutationObserver>"u")return;nn&&nn.disconnect();let t=new Set,s=!1;nn=new MutationObserver(n=>{n.forEach(o=>{let r=o.target&&o.target.nodeType===1?o.target:null,a=r&&typeof r.closest=="function"?r.closest('[data-sf-sorted-item="true"]'):null;a&&t.add(a)}),!(!t.size||s)&&(s=!0,requestAnimationFrame(()=>{s=!1;let o=Array.from(t);t.clear(),o.forEach(r=>{r.isConnected&&qo(r)})}))}),nn.observe(e,{childList:!0,subtree:!0})}var ya=/^[\p{N}][\p{N}\s.,\u00b7'’]*[\p{L}\p{M}.\s]{0,24}$/u,ba=new RegExp(["(view|play|watch)\\s*count","reproduccion|reproducao|reproducoes|visualizacion|visualizacao","visualizzazion|riproduzion|vues|lectures","aufruf|wiedergabe|ansicht|weergave|afspeel","izlenme|goruntulenme|wyswietlen|odtworzen|prehran|zhlednut","visning|katselu|megtekint|vizionar|afisar|\u03C0\u03C1\u03BF\u03B2\u03BF\u03BB","\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440|\u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434|\u0645\u0634\u0627\u0647\u062F|\u56DE\u6570|\uC7AC\uC0DD|\uC870\uD68C|l\u01B0\u1EE3t xem|tayangan|\u0E04\u0E23\u0E31\u0E49\u0E07"].join("|"),"i");function Ca(e){let t=e.querySelector("title"),s=e.getAttribute("aria-label")||t&&t.textContent||"";return s.normalize?s.normalize("NFD").replace(/[\u0300-\u036f]/g,""):s}function va(e){let t=e.textContent||"";return e.querySelectorAll("svg").forEach(s=>{let n=s.textContent||"";n&&(t=t.split(n).join(""))}),t.replace(/[\u00a0\u202f\u2009]/g," ").trim()}function wa(e,t){return!e||e===t||e.querySelectorAll("svg").length!==1||e.querySelector("img, video, canvas, [style*='background-image']")||e.querySelector("[class*='sf-'], [data-sf-custom-ui]")?!1:ya.test(va(e))}function Gs(e,t,s){let n=e.parentElement,o=s?e:null;for(let r=0;r<6&&n&&n!==t&&n.tagName!=="A";r++){if(s){if(n.querySelector("img, [style*='background-image']")||n.querySelector("[class*='sf-'], [data-sf-custom-ui]"))break;o=n}else if(wa(n,t))o=n;else if(o)break;n=n.parentElement}return o}function qo(e){if(!e)return;e.dataset.sfCmStripped="1";let t=new Set;e.querySelectorAll("svg").forEach(s=>{if(typeof s.closest=="function"&&s.closest("[class*='sf-']"))return;let n=Gs(s,e,!1);!n&&ba.test(Ca(s))&&(n=Gs(s,e,!0)),n&&t.add(n)}),t.forEach(s=>{s.style.setProperty("display","none","important")}),gn("strip",{hidden:t.size,svgs:e.querySelectorAll("svg").length})}function xa(e,t,s,n){if(!e||!t)return;qo(e);let o=ma(s,n),r=Nn(t,pa(n)),a=e.querySelector(":scope > .sf-cm-badge");r?(a||(a=document.createElement("div"),a.className="sf-cm-badge",e.appendChild(a)),a.innerHTML=Zs(r,!0),a.style.opacity=""):a&&a.remove();let i=e.querySelector(".sf-cm-kpi");if(i){let c=ua(n,o,!!Nn(t,"outlier")).map(l=>Nn(t,l)).filter(Boolean);i.innerHTML=c.map(l=>Zs(l,!0)).join("")}}function yn(e){if(!Do())return;let t=window.__sfReels;if(!t||!t.grid)return;No(),$o(t.grid),ha(t.grid),ga(t.grid);let s=Ut[t.surface]?t.surface:t.label==="Reels"?"reels":"posts",n=t.view&&t.view.length?t.view:t.all||[];n.forEach(o=>xa(o.el,o.item,t.sortBy,s)),gn("repaint",e||"",{surface:s,sortBy:t.sortBy,tiles:n.length})}function Ct(){if(!Do())return null;No();let e=document.createElement("div");return e.className="sf-cm-kpi",e}function Re(e,t){let s=e&&e.querySelector(":scope > .sf-cm-badge");s&&(s.style.opacity=t?"0":"1")}var _a=!0,Sn=!0,ka=!1;function Ye(){try{return sessionStorage.getItem("sortFeedSavedSubMode")==="all_posts"}catch{return!1}}function Ze(){try{return sessionStorage.getItem("sortFeedSurface")==="saved"}catch{return!1}}function $e(e){let t=sessionStorage.getItem("sortFeedSurface");if(t==="explore_search")return`search_${sessionStorage.getItem("sortFeedSearchQuery")||"results"}`;if(t==="saved"){let n=location.pathname.replace(/^\/|\/$/g,"").split("/")[2]||"";if(n==="all-posts")return"saved_all_posts";let o=n;try{o=decodeURIComponent(n)}catch{}return`saved_${o.replace(/[^a-zA-Z0-9_-]+/g,"_")||"collection"}`}return e&&e[0]&&e[0].userName||"sortfeed"}function Zn(){if(document.getElementById("overlay_sort_reels"))return;let e=document.getElementsByTagName("body")[0],t=document.createElement("div");t.id="overlay_sort_reels",t.style=`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,215,112,0.4);
  -webkit-backdrop-filter: blur(4px) saturate(108%);
  backdrop-filter: blur(4px) saturate(108%);
  z-index: 2;
  cursor: pointer;
  `,t.class="animate__animated animate__zoomIn",e.append(t)}function ve(e){if(e===null||e===0||e>=1&&e<=999)return e;if(e>=1e3&&e<1e6)return(e/1e3).toFixed(1)+"K";if(e>=1e6)return(e/1e6).toFixed(1)+"M"}function Pe(e){return Array.isArray(e)&&e.some(t=>t&&typeof t.outlierScore=="number")}function Xe(e){return e&&typeof e.outlierScore=="number"?Math.round(e.outlierScore*100)/100:""}function gs(e){!e||e._sfNewTabAttached||(e._sfNewTabAttached=!0,e.style.cursor="pointer",e.addEventListener("click",t=>{if(t.target.closest('[data-sf-action="true"]'))return;if(typeof po=="function"&&po(e)){t.preventDefault(),t.stopPropagation();return}let s=t.target.closest("a")||e.querySelector("a");if(!s)return;let n=s.getAttribute("href");if(!n||!n.startsWith("/"))return;t.preventDefault(),t.stopPropagation();let o=new URL(n,"https://www.instagram.com").toString();window.open(o,"_blank","noopener,noreferrer")},!0))}function ys(e="",t=null,s=null,n=null,o=null,r=null){let a=document.createElement("div");a.innerHTML=e,a.style="position: relative;";let i=document.createElement("div");i.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.80);
    opacity: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
  `;let c=typeof Ct=="function"?Ct():null;if(c)i.appendChild(c);else if(t!==null&&s!==null){let d=document.createElement("div");d.style=`
      display: flex;
      gap: 40px;
      align-items: center;
      flex-direction: column;
    `;let m=document.createElement("span");m.style="display: flex; align-items: center; gap: 5px;",m.innerHTML=`
      <img src="${chrome.runtime.getURL("Icons/Hover/LoveIG.png")}" style="width: 16px;" />
      ${t}
    `;let g=document.createElement("span");g.style="display: flex; align-items: center; gap: 5px;",g.innerHTML=r!==null?`${ws(16)} ${r}`:`<img src="${chrome.runtime.getURL("Icons/Hover/whiteBubble.png")}" style="width: 16px;" /> ${s}`,d.appendChild(m),d.appendChild(g),i.appendChild(d)}let l=document.createElement("div");l.style=`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    z-index: 10;
    pointer-events: auto;
    transition: opacity 180ms ease;
  `;let u=document.createElement("img");u.src=chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),u.style=`
    width: 9px;
    height: 9px;
    border-radius: 3px;
    background: #fff;
    padding: 5px;
  `,l.appendChild(u);let p=document.createElement("div");p.textContent="Download",p.style=`
    position: absolute;
    top: 50%;
    left: -6px;
    transform: translate(-100%, -50%);
    background: #000;
    color: #fff;
    font-size: 0.75rem; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    z-index: 99999;
    transition: opacity 120ms ease;
  `,l.appendChild(p),l.addEventListener("mouseenter",()=>{p.style.opacity="1",l.style.opacity="1"}),l.addEventListener("mouseleave",()=>{p.style.opacity="0",l.style.opacity="0.90"}),l.addEventListener("click",d=>{d.stopPropagation(),window.postMessage({download:!0,download_item:"posts",download_post_id:n,download_profile_name:o})});let f=document.createElement("div");return f.dataset.sfCustomUi="true",f.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  `,f.appendChild(i),f.appendChild(l),a.appendChild(f),a.addEventListener("mouseenter",()=>{document.body.dataset.sfSelectMode||(i.style.opacity="1",l.style.opacity="0.90",typeof Re=="function"&&Re(a,!0))}),a.addEventListener("mouseleave",d=>{if(document.body.dataset.sfSelectMode)return;let m=d.relatedTarget;a.contains(m)||(i.style.opacity="0",l.style.opacity="0",typeof Re=="function"&&Re(a,!1))}),l.dataset.sfAction="true",gs(a),a}function bs(e="",t=null,s=null,n=null,o=null,r=null,a=null){let i=document.createElement("div");i.style="position: relative;";let c=document.createElement("div");c.innerHTML=e,c.style.pointerEvents="none",i.appendChild(c);let l=document.createElement("div");l.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.62);
    opacity: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
  `;let u=typeof Ct=="function"?Ct():null;if(u)l.appendChild(u);else if(t!==null&&s!==null){let x=document.createElement("div");x.style=`
      display: flex;
      gap: 40px;
      align-items: center;
      flex-direction: column;
    `;let L=document.createElement("span");L.style="display: flex; align-items: center; gap: 5px;",L.innerHTML=`
      <img src="${chrome.runtime.getURL("Icons/Hover/LoveIG.png")}" style="width: 16px;" />
      ${t}
    `;let I=document.createElement("span");I.style="display: flex; align-items: center; gap: 5px;",I.innerHTML=a!==null?`${ws(16)} ${a}`:`<img src="${chrome.runtime.getURL("Icons/Hover/whiteBubble.png")}" style="width: 16px;" /> ${s}`,x.appendChild(L),x.appendChild(I),l.appendChild(x)}let p=document.createElement("div");p.style=`
    position: absolute;
    bottom: 10px; right: 10px;
    display: flex; flex-direction: column; gap: 5px;
    align-items: flex-end;
    opacity: 0; z-index: 10;
    pointer-events: auto;
  `;let f=document.createElement("div");f.style=`
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative;
    opacity: 0.90; transition: opacity 180ms ease;
  `;let d=document.createElement("img");d.src=chrome.runtime.getURL("Icons/Hover/trans.png"),d.style=`
    width: 9px; height: 9px; border-radius: 3px;
    background: #fff; padding: 5px;
  `,f.appendChild(d);let m=document.createElement("div");m.textContent="Transcribe",m.style=`
    position: absolute; top: 50%; left: -6px;
    transform: translate(-100%, -50%);
    background: #000; color: #fff; font-size: 0.75rem; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1;
    padding: 4px 8px; border-radius: 4px; white-space: nowrap;
    opacity: 0; pointer-events: none; z-index: 99999; transition: opacity 120ms ease;
  `,f.appendChild(m),f.addEventListener("mouseenter",()=>{m.style.opacity="1",f.style.opacity="1"}),f.addEventListener("mouseleave",()=>{m.style.opacity="0",f.style.opacity="0.90"}),f.addEventListener("click",x=>{x.stopPropagation(),window.postMessage({trans:!0,download_reel_id:n,download_profile_name:o,download_reel_id_ui:r})});let g=document.createElement("div");g.style=`
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative;
    opacity: 0.90; transition: opacity 180ms ease;
  `;let k=document.createElement("img");k.src=chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),k.style=`
    width: 9px; height: 9px; border-radius: 3px;
    background: #fff; padding: 5px;
  `,g.appendChild(k);let _=document.createElement("div");_.textContent="Download",_.style=`
    position: absolute; top: 50%; left: -6px;
    transform: translate(-100%, -50%);
    background: #000; color: #fff; font-size: 0.75rem; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1;
    padding: 4px 8px; border-radius: 4px; white-space: nowrap;
    opacity: 0; pointer-events: none; z-index: 99999; transition: opacity 120ms ease;
  `,g.appendChild(_),g.addEventListener("mouseenter",()=>{_.style.opacity="1",g.style.opacity="1"}),g.addEventListener("mouseleave",()=>{_.style.opacity="0",g.style.opacity="0.90"}),g.addEventListener("click",x=>{x.stopPropagation(),window.postMessage({download:!0,download_item:"reels",download_reel_id:n,download_profile_name:o})});let y=document.createElement("div");return y.dataset.sfCustomUi="true",y.style=`
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 10; pointer-events: none;
  `,p.style.pointerEvents="auto",l.style.pointerEvents="none",p.appendChild(f),p.appendChild(g),y.appendChild(l),y.appendChild(p),i.appendChild(y),i.addEventListener("mouseover",()=>{document.body.dataset.sfSelectMode||(l.style.opacity="1",p.style.opacity="1",typeof Re=="function"&&Re(i,!0))}),i.addEventListener("mouseout",x=>{if(document.body.dataset.sfSelectMode)return;let L=x.relatedTarget;L&&i.contains(L)||(l.style.opacity="0",p.style.opacity="0",typeof Re=="function"&&Re(i,!1))}),f.dataset.sfAction="true",g.dataset.sfAction="true",gs(i),i}function Sa(e="",t=null,s=null,n=null,o=null,r=null,a=null,i=null){let c=document.createElement("div");c.style="position: relative;";let l=document.createElement("div");l.innerHTML=e,l.style.pointerEvents="none",c.appendChild(l);let u=document.createElement("div");u.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.62);
    opacity: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 15px;
    font-weight: bold;
  `;let p=typeof Ct=="function"?Ct():null;if(p)u.appendChild(p);else if(t!==null&&s!==null&&n!==null){let L=document.createElement("div");L.style=`
      display: flex;
      flex-direction: column;
      gap: 30px;
      align-items: center;
    `;let I=(q,v)=>{let M=document.createElement("span");return M.style="display: flex; align-items: center; gap: 5px;",M.innerHTML=`
        <img src="${q}" style="width: 15px;" />
        ${v}
      `,M};if(L.appendChild(I(chrome.runtime.getURL("Icons/Hover/PlayIG.png"),n)),L.appendChild(I(chrome.runtime.getURL("Icons/Hover/LoveWhite.png"),t)),i!==null){let q=document.createElement("span");q.style="display: flex; align-items: center; gap: 5px;",q.innerHTML=`${ws(15)} ${i}`,L.appendChild(q)}else L.appendChild(I(chrome.runtime.getURL("Icons/Hover/whiteBubble.png"),s));u.appendChild(L)}let f=document.createElement("div");f.style=`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 5px;
    opacity: 0;
    z-index: 10;
    pointer-events: auto;
    flex-direction: column;      /* \u2B05\uFE0F stack buttons vertically */
    align-items: flex-end;       /* \u2B05\uFE0F keep them right-aligned */
  `;let d=document.createElement("div");d.style=`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative; /* for centered tooltip */
    opacity: 0.90;
    transition: opacity 180ms ease;
  `;let m=document.createElement("img");m.src=chrome.runtime.getURL("Icons/Hover/trans.png"),m.style=`
    width: 9px;
    height: 9px;
    border-radius: 3px;
    background: #fff;
    padding: 5px;
  `,d.appendChild(m);let g=document.createElement("div");g.textContent="Transcribe",g.style=`
    position: absolute;
    top: 50%;
    left: -6px;
    transform: translate(-100%, -50%);
    background: #000;
    color: #fff;
    font-size: 0.75rem; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    z-index: 99999;
    transition: opacity 120ms ease;
  `,d.appendChild(g),d.addEventListener("mouseenter",()=>{g.style.opacity="1",d.style.opacity="1"}),d.addEventListener("mouseleave",()=>{g.style.opacity="0",d.style.opacity="0.90"}),d.addEventListener("click",L=>{L.stopPropagation(),window.postMessage({trans:!0,download_reel_id:o,download_profile_name:r,download_reel_id_ui:a})});let k=document.createElement("div");k.style=`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative; /* for centered tooltip */
    opacity: 0.90;
    transition: opacity 180ms ease;
  `;let _=document.createElement("img");_.src=chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),_.style=`
    width: 9px;
    height: 9px;
    border-radius: 3px;
    background: #fff;
    padding: 5px;
  `,k.appendChild(_);let y=document.createElement("div");y.textContent="Download",y.style=`
    position: absolute;
    top: 50%;
    left: -6px;
    transform: translate(-100%, -50%);
    background: #000;
    color: #fff;
    font-size: 0.75rem; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    z-index: 99999;
    transition: opacity 120ms ease;
  `,k.appendChild(y),k.addEventListener("mouseenter",()=>{y.style.opacity="1",k.style.opacity="1"}),k.addEventListener("mouseleave",()=>{y.style.opacity="0",k.style.opacity="0.90"}),f.appendChild(d),f.appendChild(k),k.addEventListener("click",L=>{L.stopPropagation(),window.postMessage({download:!0,download_item:"reels",download_reel_id:o,download_profile_name:r})});let x=document.createElement("div");return x.dataset.sfCustomUi="true",x.style=`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none; /* non-interactive container */
`,f.style.pointerEvents="auto",u.style.pointerEvents="none",x.appendChild(u),x.appendChild(f),c.appendChild(x),c.addEventListener("mouseover",()=>{document.body.dataset.sfSelectMode||(u.style.opacity="1",f.style.opacity="1",typeof Re=="function"&&Re(c,!0))}),c.addEventListener("mouseout",L=>{if(document.body.dataset.sfSelectMode)return;let I=L.relatedTarget;I&&c.contains(I)||(u.style.opacity="0",f.style.opacity="0",typeof Re=="function"&&Re(c,!1))}),d.dataset.sfAction="true",k.dataset.sfAction="true",gs(c),c}function Ws(){sessionStorage.removeItem("sortFeedSortBy"),sessionStorage.removeItem("sortFeedNoItems"),sessionStorage.removeItem("sortFeedStatus"),sessionStorage.removeItem("sortFeedData"),sessionStorage.removeItem("sortFeedDataSorted"),sessionStorage.removeItem("sortFeedPostsVSReels"),sessionStorage.removeItem("sortFeedProfileName"),sessionStorage.removeItem("sortItemsVsDates")}function Xs(){let s=document.getElementsByTagName("main")[0].getElementsByTagName("div")[0].querySelector('[role="tablist"]')?.parentElement;if(!s)return null;let n=s.nextElementSibling;for(;n&&n.tagName!=="DIV";)n=n.nextElementSibling;return n}function Ks(e){let t=0,s=0,n=0;try{let o=e?e.querySelectorAll("._ac7v"):[],r=o[0];r&&r.children[0]&&(t=r.children[0].getBoundingClientRect().width,r.children[1]&&(s=Math.max(0,r.children[1].getBoundingClientRect().left-r.children[0].getBoundingClientRect().right))),o[0]&&o[1]&&(n=Math.max(0,o[1].getBoundingClientRect().top-o[0].getBoundingClientRect().bottom)),n||(n=s),s||(s=n)}catch{}return{cellW:t,colGap:s,rowGap:n}}function Js(e,t,s,n){let o=Math.max(80,Math.round((t||220)-2));e.style.cssText=`display: grid;grid-template-columns: repeat(auto-fill, minmax(${o}px, 1fr));column-gap: ${Math.round(s||0)}px;row-gap: ${Math.round(n||0)}px;padding-bottom: 0px; padding-top: 0px; position: relative;`}function Ea(e,t){return new Promise(s=>{if(t==="Posts"){let n=Xs(),o=Ks(n);n.style.display="none";let r=document.createElement("div");r.id="div_most_viewed_reels",r.setAttribute("data-sortfeed","true"),r.className=n.className,Js(r,o.cellW,o.colGap,o.rowGap),n.after(r),e.forEach(a=>{let i=[1,8].includes(a.mediaType)?`https://www.instagram.com/${a.userName}/p/${a.code}/`:`https://www.instagram.com/${a.userName}/reel/${a.code}/`,c=JSON.stringify({id:a.postID??null,code:a.code??null,userName:a.userName??null,url:i,postsVsReels:"Posts",thumbnailUrl:a.thumbnailUrl??null,createDate:a.createDate||null,likesCount:a.likesCount??null,commentsCount:a.commentsCount??null,viewCount:a.viewCount??null,shareCount:a.shareCount??null,mediaType:a.mediaType??null,caption:a.caption??null,outlierScore:typeof a.outlierScore=="number"?a.outlierScore:null}),l;a.mediaType==2?l=bs(a.element,ve(a.likesCount),ve(a.commentsCount),a.postID,a.userName,a.code,Rt(a)):l=ys(a.element,ve(a.likesCount),ve(a.commentsCount),a.postID,a.userName,Rt(a)),l.dataset.sfSortedItem="true",l.dataset.sfItemJson=c,l.style.width="100%",l.style.minWidth="0",r.appendChild(l)}),s(!0)}else if(t==="Reels"){let n=Xs(),o=Ks(n);n.style.display="none";let r=document.createElement("div");r.id="div_most_viewed_reels",r.setAttribute("data-sortfeed","true"),r.className=n.className,Js(r,o.cellW,o.colGap,o.rowGap),n.after(r),e.forEach(a=>{let i=Sa(a.element,ve(a.likesCount),ve(a.commentsCount),ve(a.viewCount),a.reelID,a.userName,a.code,Rt(a));i.dataset.sfSortedItem="true",i.dataset.sfItemJson=JSON.stringify({id:a.reelID??null,code:a.code??null,userName:a.userName??null,url:`https://www.instagram.com/${a.userName}/reel/${a.code}/`,postsVsReels:"Reels",thumbnailUrl:a.thumbnailUrl??null,createDate:a.createDate||null,likesCount:a.likesCount??null,commentsCount:a.commentsCount??null,viewCount:a.viewCount??null,shareCount:a.shareCount??null,mediaType:a.mediaType??null,caption:a.caption??null,outlierScore:typeof a.outlierScore=="number"?a.outlierScore:null}),i.querySelectorAll("li").forEach(c=>{let l=c.querySelectorAll("span");l.length>=2&&(l[0].remove(),l[1].remove(),l[2].remove())}),i.style.width="100%",i.style.minWidth="0",r.appendChild(i)}),s(!0)}})}function La(e,t){let s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=new Date(e),o=new Date(t),r=new Date;return n.getFullYear()===o.getFullYear()&&n.getFullYear()===r.getFullYear()?`${s[n.getMonth()]} ${n.getDate()} \u2013 ${s[o.getMonth()]} ${o.getDate()}`:`${s[n.getMonth()]} ${n.getDate()}, ${n.getFullYear()} \u2013 ${s[o.getMonth()]} ${o.getDate()}, ${o.getFullYear()}`}function Gn(e,t,s,n){if(s==="items")return`${e} ${t}`;if(s==="dates"&&typeof n=="string"&&n.startsWith("custom_")){let o=/^custom_(\d+)_(\d+)$/.exec(n);if(o){let r=La(parseInt(o[1],10),parseInt(o[2],10));return`${e} ${t} from ${r}`}return`${e} ${t}`}else{if(s==="dates"&&n==="1_week")return`${e} ${t} from 1 Week Back`;if(s==="dates"&&n==="1_month")return`${e} ${t} from 1 Month Back`;if(s==="dates"&&n==="3_month")return`${e} ${t} from 3 Months Back`;if(s==="dates"&&n==="6_month")return`${e} ${t} from 6 Months Back`;if(s==="dates"&&n==="1_year")return`${e} ${t} from 1 Year Back`;if(s==="dates"&&n==="all_reels")return`${e} ${t}`}}function Uo(e,t){if(e==="views")return`Most Viewed ${t}`;if(e==="comments")return`Most Commented ${t}`;if(e==="likes")return`Most Liked ${t}`;if(e==="oldest")return`Oldest ${t}`;if(e==="outlier")return oe&&oe.status==="ok"&&oe.baseline>0?`Top Outlier ${t}`:/reel/i.test(t)?`Most Viewed ${t}`:`Most Liked ${t}`}function vt(e,t){return e===1?t.slice(0,-1):t}function Ma(e,t){let s,n,o=Ye(),r=Ze(),a=typeof Pe=="function"&&Pe(e);t==="Posts"?(s=["Profile","Post","Create Date","Likes"],a&&s.push("Outlier Score"),o||s.push("Comments"),r&&s.push("Views"),s.push("Caption"),n=e.map(c=>{let l=[1,8].includes(c.mediaType)?`https://www.instagram.com/${c.userName}/p/${c.code}/`:`https://www.instagram.com/${c.userName}/reel/${c.code}/`,u=c.createDate?c.createDate.slice(0,10):"",p=[c.userName,l,u,c.likesCount];return a&&p.push(Xe(c)),o||p.push(c.commentsCount),r&&p.push(c.viewCount??""),p.push(c.caption??""),p})):t==="Reels"&&(s=["Profile","Reel","Create Date","Views"],a&&s.push("Outlier Score"),s.push("Likes","Comments"),n=e.map(c=>{let l=`https://www.instagram.com/${c.userName}/reel/${c.code}/`,u=c.createDate?c.createDate.slice(0,10):"",p=[c.userName,l,u,c.viewCount];return a&&p.push(Xe(c)),p.push(c.likesCount,c.commentsCount),p}));let i=[s,...n].map(c=>c.join("	")).join(`
`);navigator.clipboard.writeText(i)}function Wn(){let e=document.documentElement;return Array.from(e.classList).some(s=>s.toLowerCase().includes("dark"))?{isDark:!0,backgroundColor:"rgb(14, 20, 26)",textColor:"#f2f3f5",bannerBorder:"rgba(255,255,255,0.08)",bannerShadow:"0 2px 10px rgba(0,0,0,0.35)",subHeaderText:"#76766f",subHeaderNumber:"#a8a8a6",buttonBg:"rgba(255,255,255,0.07)",buttonHoverBg:"rgba(255,255,255,0.22)",buttonBorder:"rgba(255,255,255,0.13)",buttonShadow:"none",buttonText:"rgba(242,243,245,0.85)",buttonIconFilter:"brightness(0) invert(1) brightness(0.85)",buttonIconFilterStrong:"brightness(0) invert(1) brightness(0.85)",menuBg:"rgba(20, 24, 29, 0.98)",menuBorder:"rgba(255,255,255,0.10)",menuShadow:"0 12px 30px rgba(0,0,0,0.55)",menuItemHoverBg:"rgba(255,255,255,0.08)",menuText:"#f2f3f5",menuMutedText:"rgba(242,243,245,0.7)",copyIcon:"Icons/BannerIconNew/CopyIconNew.svg",exportIcon:"Icons/BannerIconNew/ExportIconNew.svg",checkIcon:"Icons/BannerIcons/whiteCheckBanner.png"}:{isDark:!1,backgroundColor:"white",textColor:"black",bannerBorder:"rgba(0,0,0,0.08)",bannerShadow:"0 2px 8px rgba(0,0,0,0.08)",subHeaderText:"#9a9a97",subHeaderNumber:"#6b6b6b",buttonBg:"white",buttonHoverBg:"rgba(0,0,0,0.04)",buttonBorder:"#E6E6E6",buttonShadow:"0 1px 2px rgba(0,0,0,0.05)",buttonText:"#37352F",buttonIconFilter:"opacity(0.5)",buttonIconFilterStrong:"brightness(0)",menuBg:"rgba(255,255,255,0.98)",menuBorder:"rgba(0,0,0,0.10)",menuShadow:"0 12px 30px rgba(0,0,0,0.12)",menuItemHoverBg:"rgba(0,0,0,0.04)",menuText:"#111",menuMutedText:"rgba(0,0,0,0.55)",copyIcon:"Icons/BannerIconNew/CopyIconNew.svg",exportIcon:"Icons/BannerIconNew/ExportIconNew.svg",checkIcon:"Icons/BannerIcons/blackCheckBanner.png"}}function Ia(e,t,s){let n=document.getElementById("export-native");if(!n)return;if(n._sf_cleanup&&n._sf_cleanup(),!document.getElementById("sortfeed-export-menu-styles")){let m=document.createElement("style");m.id="sortfeed-export-menu-styles",m.textContent=`
      .sf-menu, .sf-menu * { box-sizing: border-box; }

      .sf-menu {
        position: absolute;
        bottom: calc(100% + 8px);   /* above the button */
        right: 0;
        min-width: 170px;
        padding: 6px;
        border-radius: 10px;

        opacity: 0;
        pointer-events: none;

        transform-origin: bottom right;
        transform: translateY(6px) scale(0.98);

        transition:
          opacity 120ms ease,
          transform 140ms cubic-bezier(.2,.8,.2,1);

        z-index: 2147483647;
      }

      .sf-menu.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .sf-menu-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        padding: 9px 10px;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
        font-size: 13px;
        font-weight: 500;
        line-height: 1;
        margin: 0;
      }

      /* \u2705 hide the export tooltip while menu is open */
      #export-native.sortfeed-menu-open .tooltip {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `,document.head.appendChild(m)}let o=n.querySelector(".sf-menu");o&&o.remove();let r=document.createElement("div");r.className="sf-menu",r.style.background=e.menuBg,r.style.border=`1px solid ${e.menuBorder}`,r.style.boxShadow=e.menuShadow,r.style.color=e.menuText,r.style.fontFamily="SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",r.style.overflow="hidden",r.style.borderRadius="12px",r.style.padding="6px",r.style.zIndex="2147483647";let a=()=>{let m=n.querySelector(".tooltip");m&&(m.style.opacity="0")},i=(m,g)=>{let k=document.createElement("div");return k.className="sf-menu-item",k.textContent=m,k.addEventListener("mouseenter",()=>{k.style.background=e.menuItemHoverBg}),k.addEventListener("mouseleave",()=>{k.style.background="transparent"}),k.addEventListener("click",_=>{if(_.stopPropagation(),window.__sfBanner&&!window.__sfBanner.isContextAlive()){window.__sfBanner.showContextDeadBanner(),u();return}chrome.runtime.sendMessage({export_click:!0,export_format:g,posts_vs_reels:t,sorted_data:s}),u()}),k};r.appendChild(i("Excel","excel")),r.appendChild(i("CSV","csv")),r.appendChild(i("JSON","json")),n.appendChild(r);let c=()=>r.classList.contains("open"),l=()=>{n.classList.add("sortfeed-menu-open"),r.classList.add("open"),a()},u=()=>{n.classList.remove("sortfeed-menu-open"),r.classList.remove("open")},p=()=>c()?u():l();n._sf_clickBound||(n._sf_clickBound=!0,n.addEventListener("click",m=>{m.stopPropagation(),p()}));let f=m=>{n.contains(m.target)||u()};document.addEventListener("click",f);let d=m=>{m.key==="Escape"&&u()};document.addEventListener("keydown",d),n._sf_cleanup=()=>{document.removeEventListener("click",f),document.removeEventListener("keydown",d)}}function Vo(){if(document.getElementById("sf-reels-filters-style"))return;let e=document.createElement("style");e.id="sf-reels-filters-style",e.textContent=`
    #sf-filters-row{
      display:flex; align-items:center; gap:8px; flex-wrap:wrap;
      /* full-bleed divider: negative side margins reach the banner edges, then
         re-inset the content with matching padding (banner padding = 24px). */
      margin:16px -24px 0; padding:14px 24px 0;
      border-top:1px solid var(--sf-ff-divider);
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;
      -webkit-font-smoothing:antialiased;   /* thinner text \u2014 IG doesn't smooth this by default */
      /* Notion-like shrink/grow + fade when Select hides the row / Cancel shows it. */
      transition:opacity 0.22s ease, max-height 0.32s cubic-bezier(0.16,1,0.3,1), margin-top 0.32s cubic-bezier(0.16,1,0.3,1), padding-top 0.32s cubic-bezier(0.16,1,0.3,1), border-top-width 0.3s ease;
    }
    /* Same Notion-like type on the action buttons (Copy / Export / Download all /
       Select, plus select-mode buttons + export menu). The shared banner innerHTML
       hardcodes SF Pro Display inline on each, so override to the Text optical cut
       with !important. Scoped to .sf-sorted-banner \u2192 every IG sorted banner
       (Profile Posts/Reels, Explore, Saved) gets it; FB / TikTok stay unchanged. */
    .sf-sorted-banner #sf-btn-row, .sf-sorted-banner #sf-btn-row *{
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif !important;
    }
    .sf-sorted-banner #sf-btn-row{ letter-spacing:0.01em; -webkit-font-smoothing:antialiased; }
    /* Same optical font on the title + subtitle ("Most Liked Reels" / "Showing N
       Reels"). -apple-system auto-picks the Display cut for the big title and the
       Text cut for the small subtitle. All IG sorted banners; sizes/weights unchanged. */
    .sf-sorted-banner .metrics_section h1, .sf-sorted-banner .metrics_section h2{
      font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
      -webkit-font-smoothing:antialiased;
    }
    #sf-filters-row .sf-fbtn, #sf-filters-row .sf-sort-chip{
      display:inline-flex; align-items:center; gap:7px; height:34px; padding:0 9px;
      border-radius:8px; border:1px solid transparent; background:transparent;
      color:var(--sf-ff-text); font-size:0.8rem; font-weight:500; line-height:1; letter-spacing:0.01em;
      cursor:pointer; user-select:none; white-space:nowrap;
      transition:background-color .12s ease, border-color .12s ease, color .12s ease;
    }
    #sf-filters-row .sf-fbtn:hover, #sf-filters-row .sf-sort-chip:hover{
      background:var(--sf-ff-hover); color:var(--sf-ff-text-strong);
    }
    /* custom FilterBanner glyphs (filled). They inherit the button's grey via
       currentColor; width-locked so the wide/short art keeps its aspect ratio.
       fill is forced on svg + path so IG's global svg rules can't override it. */
    #sf-filters-row .sf-ff-icon{ width:13px; height:auto; flex-shrink:0; fill:currentColor; }
    #sf-filters-row .sf-ff-icon path{ fill:currentColor; }
    #sf-filters-row .sf-ff-new{
      display:inline-flex; align-items:center; line-height:1;
      background:var(--sf-ff-new-bg); color:var(--sf-ff-new-text);
      font-size:0.58rem; font-weight:500; letter-spacing:0.01em;
      border-radius:3px; padding:2px 5px;
    }
    #sf-filters-row .sf-ff-badge{
      display:none; align-items:center; justify-content:center;
      min-width:18px; height:18px; padding:0 5px; border-radius:99px;
      background:var(--sf-ff-badge-bg); color:var(--sf-ff-badge-text); font-size:0.66rem; font-weight:700;
    }
    #sf-filters-row .sf-fbtn.sf-has-filters{ border-color:var(--sf-ff-accent-border); background:var(--sf-ff-accent-bg); }
    #sf-filters-row .sf-fbtn.sf-has-filters .sf-ff-badge{ display:inline-flex; }
    #sf-filters-row .sf-clear-all{
      margin-left:4px; font-size:0.8rem; font-weight:400; letter-spacing:0.012em;
      color:var(--sf-ff-muted); cursor:pointer; padding:6px 9px; border-radius:6px;
      background:transparent; border:none;
      /* lead with -apple-system so small text uses SF's Text optical cut (looser
         tracking) instead of the Display cut, which looks squashed at ~13px. */
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;
      transition:color .12s ease, background-color .12s ease;
    }
    #sf-filters-row .sf-clear-all:hover{ color:var(--sf-ff-text-strong); background:var(--sf-ff-hover); }

    /* ===== Sorted-banner restyle (Notion-ish mockup), app-wide on IG \u2014 theme
       tokens (--sf-rb-*) are set on .sf-sorted-banner from JS so both modes work.
       Title sits ABOVE the subtitle; Download/Copy/Export become quiet grey
       ghost buttons; SELECT is the primary and wears the outlined default-button
       look (the --sf-rb-ex-* tokens, which now mean "primary", not "Export" \u2014
       select mode reuses them for its own primary, Export + Transcripts). ===== */
    /* Square the bottom corners + drop the gap so the banner reads as the header
       of the sorted feed (connected), not a floating rounded card. */
    .sf-sorted-banner{ border-radius:12px 12px 0 0 !important; margin-bottom:0 !important; }
    .sf-sorted-banner .metrics_section{ display:flex; flex-direction:column-reverse; align-items:flex-start; }
    .sf-sorted-banner #reels_number_section{ margin:3px 0 0 !important; }
    .sf-sorted-banner #download-all-native, .sf-sorted-banner #copy-native, .sf-sorted-banner #export-native{
      color:var(--sf-rb-quiet-text) !important; border-color:transparent !important; background:transparent !important; }
    .sf-sorted-banner #download-all-native:hover, .sf-sorted-banner #copy-native:hover, .sf-sorted-banner #export-native:hover{
      background:var(--sf-rb-quiet-hover) !important; }
    .sf-sorted-banner #download-all-native img, .sf-sorted-banner #copy-native img, .sf-sorted-banner #export-native img{
      filter:var(--sf-rb-quiet-icon) !important; }
    .sf-sorted-banner #select-native{ background-color:var(--sf-rb-ex-bg) !important; color:var(--sf-rb-ex-text) !important;
      border:1px solid var(--sf-rb-ex-border) !important; box-shadow:none !important; }
    .sf-sorted-banner #select-native:hover{ background-color:var(--sf-rb-ex-hover) !important; }
    .sf-sorted-banner #select-native img{ filter:var(--sf-rb-ex-icon) !important; }
    /* Group Download all + Copy + Export (no divider); push Select away so it
       reads as its own thing. Positioning only \u2014 button styles unchanged. */
    .sf-sorted-banner .sf-pill-sep{ display:none !important; }
    .sf-sorted-banner #sf-pill-group{ gap:0.6rem; }
    .sf-sorted-banner #select-native{ margin-left:18px; }

    /* ===== Select mode (Reels) \u2014 same hierarchy as normal mode: Download +
       Cancel are quiet borderless; Export+Transcripts gets the Export look;
       Cancel is spaced as its own thing; the pill is un-boxed (no divider). ===== */
    .sf-sorted-banner #sf-select-pill-group{ border-color:transparent !important; background:transparent !important; gap:0.6rem; }
    .sf-sorted-banner #sf-select-download-btn{ background:transparent !important; border-radius:8px !important; color:var(--sf-rb-quiet-text) !important; }
    .sf-sorted-banner #sf-select-download-btn:hover{ background:var(--sf-rb-quiet-hover) !important; }
    .sf-sorted-banner #sf-export-transcripts-btn{ background-color:var(--sf-rb-ex-bg) !important; border:1px solid var(--sf-rb-ex-border) !important; border-radius:8px !important; color:var(--sf-rb-quiet-text) !important; }
    .sf-sorted-banner #sf-export-transcripts-btn:hover{ background-color:var(--sf-rb-ex-hover) !important; }
    .sf-sorted-banner #sf-select-close-btn{ background:transparent !important; border-color:transparent !important; color:var(--sf-rb-quiet-text) !important; margin-left:18px !important; }
    .sf-sorted-banner #sf-select-close-btn:hover{ background:var(--sf-rb-quiet-hover) !important; }

    /* ===== The action row reads [Select] \u2502 [Download all  Copy  Export], with
       EXPORT wearing the primary look \u2014 an outline with no fill. Select drops
       back to the quiet ghost look, set off from the group by one light
       hairline. Every IG surface carries .sf-primary-export (Profile, Explore
       and Saved), so this is the one and only row style. ===== */
    .sf-sorted-banner.sf-primary-export{ background-color:var(--sf-rb-banner-bg) !important; }
    /* The floating layers sit on the same surface as the card they belong to:
       the Export dropdown (normal + select mode) and the Sort-by popover both
       ship theme.menuBg, which is a different dark grey. The Filters modal
       themes itself off the theme object it is handed and is NOT touched here. */
    .sf-sorted-banner.sf-primary-export .sf-menu,
    .sf-sorted-banner.sf-primary-export .sf-sort-pop{
      background:var(--sf-rb-banner-bg) !important; }
    .sf-sorted-banner.sf-primary-export #select-native{
      background-color:transparent !important; color:var(--sf-rb-quiet-text) !important;
      border-color:transparent !important; box-shadow:none !important;
      margin-left:0 !important; margin-right:0 !important; }
    .sf-sorted-banner.sf-primary-export #select-native:hover{ background-color:var(--sf-rb-quiet-hover) !important; }
    .sf-sorted-banner.sf-primary-export #select-native img{ filter:var(--sf-rb-quiet-icon) !important; }
    .sf-sorted-banner.sf-primary-export #export-native{
      background-color:transparent !important; color:var(--sf-rb-ex-text) !important;
      border:1px solid var(--sf-rb-ghost-border) !important; box-shadow:none !important;
      padding-left:12px !important; padding-right:12px !important; gap:6px !important; }
    /* The 6px gap above is the label -> count spacing; the label wins back the
       icon's original 0.65rem so only the count moves in. */
    .sf-sorted-banner.sf-primary-export #export-native .sf-btn-label{
      margin-left:calc(0.65rem - 6px); font-weight:600 !important;
      color:var(--sf-rb-primary-text) !important; }
    .sf-sorted-banner.sf-primary-export #export-native:hover{ background-color:var(--sf-rb-ex-hover) !important; }
    .sf-sorted-banner.sf-primary-export #export-native img{ filter:var(--sf-rb-ex-icon) !important; }
    /* Row counts on Export and Download. Both spans ship in the shared markup and
       are hidden by default, so an un-restyled row can never sprout a stray
       number. One rule for both, because they are the same number in two places
       and must never diverge in tone or weight \u2014 this is also the tone select
       mode's Download badge builds itself with. */
    .sf-sorted-banner #export-native .sf-btn-count,
    .sf-sorted-banner #download-all-native .sf-btn-count{ display:none; }
    .sf-sorted-banner.sf-primary-export #export-native .sf-btn-count,
    .sf-sorted-banner.sf-primary-export #download-all-native .sf-btn-count{
      display:inline; color:var(--sf-rb-count-text) !important; font-weight:400 !important;
      letter-spacing:-0.02em !important; }
    /* Same spacing trick as Export and select mode's Download: the row gap drops
       to 6px for the label -> count step, and the label wins back the icon's
       original 0.65rem so only the count moves in. */
    .sf-sorted-banner.sf-primary-export #download-all-native{ gap:6px !important; }
    .sf-sorted-banner.sf-primary-export #download-all-native .sf-btn-label{
      margin-left:calc(0.65rem - 6px); }
    .sf-sorted-banner.sf-primary-export #sf-export-transcripts-btn{
      background-color:transparent !important;
      border:1px solid var(--sf-rb-ghost-border) !important; box-shadow:none !important;
      padding-left:12px !important; padding-right:12px !important; gap:6px !important; }
    /* Same trick as Export: the 6px gap is the label -> count spacing and the
       label wins back the icon's 0.65rem. The colour is deliberately NOT
       !important \u2014 _sfApplySelectBtnState writes the dimmed no-selection tone
       straight onto the element, and an inline style only beats a normal rule.
       So this supplies the enabled tone (matching Export) while the dimmed state
       still wins whenever nothing is selected. */
    .sf-sorted-banner.sf-primary-export #sf-export-transcripts-btn .sf-btn-label{
      margin-left:calc(0.65rem - 6px); font-weight:600 !important;
      color:var(--sf-rb-primary-text); }
    /* Download only needs the count pulled in to match. */
    .sf-sorted-banner.sf-primary-export #sf-select-download-btn{ gap:6px !important; }
    .sf-sorted-banner.sf-primary-export #sf-select-download-btn .sf-btn-label{
      margin-left:calc(0.65rem - 6px); }
    /* Needed explicitly: the rule above ties with the app-wide :hover rule on
       specificity and would win on source order, leaving no hover feedback. */
    .sf-sorted-banner.sf-primary-export #sf-export-transcripts-btn:hover{ background-color:var(--sf-rb-ex-hover) !important; }
    /* Spacing is placed by hand here: the row's inline 0.6rem gap is zeroed so
       every gutter is explicit \u2014 12px either side of the rule (so it sits dead
       centre), 6px inside the group (so Download all / Copy / Export read as
       one unit). */
    .sf-sorted-banner.sf-primary-export #sf-btn-row{ gap:0 !important; }
    .sf-sorted-banner.sf-primary-export #sf-pill-group{ gap:6px; }
    /* A touch more than the 6px inside the group: Export's border box starts
       right here, so the same gap reads tighter against it than it does
       between two borderless buttons. */
    .sf-sorted-banner.sf-primary-export #export-native{ margin-left:10px !important; }
    .sf-sorted-banner.sf-primary-export #sf-select-sep{
      align-self:center; flex:0 0 auto; width:1px; height:18px; margin:0 12px;
      background-color:var(--sf-rb-sep); }
    /* Select mode: Cancel leads the row, so its gutter flips to the right \u2014
       spacing only, no rule here \u2014 and it sits a step dimmer than Download /
       Export + Transcripts, returning to the full quiet tone on hover. */
    .sf-sorted-banner.sf-primary-export #sf-select-close-btn{
      margin-left:0 !important; margin-right:26px !important;
      color:var(--sf-rb-dim-text) !important;
      transition:background-color .15s ease, color .12s ease !important; }
    .sf-sorted-banner.sf-primary-export #sf-select-close-btn:hover{ color:var(--sf-rb-quiet-text) !important; }
  `,document.head.appendChild(e)}function Ta(e,t){Vo(),t.classList.add("sf-sorted-banner");let s=e.isDark,n=(r,a)=>t.style.setProperty(r,a);n("--sf-rb-quiet-text",s?"rgba(242,243,245,0.7)":"#6b6b6b"),n("--sf-rb-quiet-hover",s?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.04)"),n("--sf-rb-ex-bg",s?"rgba(255,255,255,0.05)":"#fbfbfa"),n("--sf-rb-ex-text",s?"rgba(242,243,245,0.7)":"#6b6b6b"),n("--sf-rb-ex-border",s?"rgba(255,255,255,0.11)":"#efefed"),n("--sf-rb-ex-hover",s?"rgba(255,255,255,0.09)":"#f4f4f2"),n("--sf-rb-primary-text",s?"#f2f3f5":"#1a1a1a");let o=s?"brightness(0) invert(32.06%) sepia(69.1%) saturate(380.6%) hue-rotate(173.4deg) brightness(89.82%) contrast(11.12%)":"brightness(0) invert(42.38%) sepia(18.52%) saturate(62.95%) hue-rotate(201.7deg) brightness(163.8%) contrast(73.16%)";n("--sf-rb-quiet-icon",o),n("--sf-rb-ex-icon",o),n("--sf-rb-sep",s?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.14)"),n("--sf-rb-ghost-border",s?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.13)"),n("--sf-rb-dim-text",s?"rgba(242,243,245,0.5)":"rgba(0,0,0,0.45)"),n("--sf-rb-count-text",s?"#a8a8a6":"rgba(0,0,0,0.45)"),n("--sf-rb-banner-bg",s?"rgb(32, 38, 45)":"white")}var Qs={reels:{metrics:["views","likes"],sorts:["views","likes","comments","oldest"],type:!1,noun:"Reels",rows:!1},posts:{metrics:["likes","comments"],sorts:["likes","comments","oldest"],type:!0,noun:"Posts",rows:!1},search:{metrics:["likes","comments"],sorts:["likes","comments","oldest"],type:!0,noun:"Posts",rows:!1},saved_all:{metrics:["likes"],sorts:["likes","oldest"],type:!0,noun:"Posts",rows:!0},saved_collection:{metrics:["likes","comments"],sorts:["likes","comments","oldest"],type:!0,noun:"Posts",rows:!0}};function Oo(e,t){let s=new Set(t);Array.from(e.children).forEach(n=>{n.id!=="sf-reels-empty"&&(s.has(n)||e.removeChild(n))}),e.append(...t)}var Ba="_ac7v xat24cr x1f01sob xcghwft xzboxd6",Ra="x11i5rnm x1ntc13c x9i3mqj x2pgyrj";function Pa(e,t){for(;e.firstChild;)e.removeChild(e.firstChild);for(let s=0;s<t.length;s+=3){let n=document.createElement("div");for(n.className=Ba,t.slice(s,s+3).forEach(o=>n.appendChild(o));n.children.length<3;){let o=document.createElement("div");o.className=Ra,n.appendChild(o)}e.appendChild(n)}}function Aa(e,t,s,n,o){let r=document.getElementById("div_most_viewed_reels");if(!r||!Array.isArray(e)){window.__sfReels=null;return}let a=o?window.__sfReels:null,i=Array.from(r.querySelectorAll('[data-sf-sorted-item="true"]')),c=e.map((l,u)=>({item:l,el:i[u]})).filter(l=>l.el);window.__sfReels={all:a?a.all:c,view:a?a.view:c.slice(),sortBy:t,grid:r,source:e,filters:a?a.filters:null,label:s||"Reels",render:n||Oo,ctx:a?a.ctx:rn,allCollected:a?a.allCollected:c.slice(),displaySelection:a?a.displaySelection:null,displayMode:a?a.displayMode:null}}function $n(e){let t=window.__sfReels;t&&(t.filters=e||null,Cs("banner-filters"))}function Fa(e,t){if(!t)return e.slice();let s=e;return t.performance&&typeof Qn=="function"&&(s=s.filter(n=>Qn(n.item,t.performance))),t.posted&&typeof es=="function"&&(s=s.filter(n=>es(n.item,t.posted))),t.type&&typeof ts=="function"&&(s=s.filter(n=>ts(n.item,t.type))),s}function Ha(e){if(e==="oldest")return(s,n)=>{let o=s.item.createDate?Date.parse(s.item.createDate):1/0,r=n.item.createDate?Date.parse(n.item.createDate):1/0;return o-r};if(e==="outlier"){let s=oe&&oe.metric==="likes"?"likesCount":"viewCount";return(n,o)=>{let r=n.item.outlierScore??n.item[s],a=o.item.outlierScore??o.item[s];return(a==null?-1/0:+a)-(r==null?-1/0:+r)}}let t=e==="likes"?"likesCount":e==="comments"?"commentsCount":"viewCount";return(s,n)=>{let o=s.item[t]==null?-1/0:+s.item[t];return(n.item[t]==null?-1/0:+n.item[t])-o}}function Da(e){let t=window.__sfReels,s=document.getElementById("sf-banner-title");t&&s&&(s.textContent=Uo(t.sortBy,vt(e,t.label||"Reels")))}function Na(e,t){let s=document.getElementById("sf-banner-subheader");if(!s)return;let n=s.querySelector("span"),o=n&&n.style.color||"inherit";if(e>=t){let r=decodeURIComponent(s.getAttribute("data-sf-suffix")||"");s.innerHTML=`Showing <span style="color: ${o};">${t}</span>${r}`}else{let r=vt(t,window.__sfReels&&window.__sfReels.label||"Reels");s.innerHTML=`Showing <span style="color: ${o};">${e}</span> of <span style="color: ${o};">${t}</span> ${r}`}$a(e)}function $a(e){document.querySelectorAll("#export-native .sf-btn-count, #download-all-native .sf-btn-count").forEach(t=>{t.textContent=String(e)})}function qa(e,t){let s=e.querySelector("#sf-reels-empty");t?s||(s=document.createElement("div"),s.id="sf-reels-empty",s.textContent="No reels match these filters",s.style.cssText="grid-column: 1 / -1; padding: 40px 12px; text-align: center; font-size: 0.95rem;color: rgba(142,142,142,0.95); font-family: SF Pro Display, Helvetica Neue, Arial, sans-serif;",e.appendChild(s)):s&&s.remove()}var qn=460,Un="cubic-bezier(0.2, 0.8, 0.2, 1)",et=!1;function eo(e){let t=e.getBoundingClientRect(),s=window.scrollX||window.pageXOffset||0,n=window.scrollY||window.pageYOffset||0;return{left:t.left+s,top:t.top+n}}function Cs(e){let t=window.__sfReels,s=e||"unknown";if(!t||!t.grid){et&&console.log("[sf-flip]",s,"ABORT \u2014 no state/grid",{st:!!t,grid:!!(t&&t.grid)});return}let n=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=n?null:new Map;o&&t.all.forEach(m=>{m.el&&t.grid.contains(m.el)&&o.set(m.el,eo(m.el))});let r=Fa(t.all,t.filters).sort(Ha(t.sortBy));t.grid.style.overflowAnchor="none";let a=window.scrollY||window.pageYOffset||0;et&&console.log("[sf-flip]",s,"start",{sortBy:t.sortBy,reduceMotion:n,all:t.all.length,view:r.length,measuredFirst:o?o.size:0,sameNodes:o?r.filter(m=>m.el&&o.has(m.el)).length:0,scrollY:Math.round(a)}),t.render(t.grid,r.map(m=>m.el));let i=window.scrollY||window.pageYOffset||0;if(i!==a&&(et&&console.log("[sf-flip]",s,"scroll anchoring jumped",a,"\u2192",i,"\u2014 restoring"),window.scrollTo({top:a,behavior:"auto"})),qa(t.grid,r.length===0),t.view=r,Array.isArray(t.source)&&(t.source.length=0,r.forEach(m=>t.source.push(m.item))),Da(r.length),Na(r.length,t.all.length),vs=Sn&&t.sortBy==="outlier"&&!!(oe&&oe.status==="ok"&&oe.baseline>0),Yo(),typeof yn=="function"&&yn("apply"),!o){et&&console.log("[sf-flip]",s,"no animation \u2014 prefers-reduced-motion is on");return}let c=new Map;r.forEach(m=>{m.el&&c.set(m.el,eo(m.el))});let l=[],u=[],p=0,f=0,d=0;if(r.forEach(m=>{let g=m.el;if(!g)return;let k=o.get(g),_=c.get(g);if(!_)return;if(!k){g.style.transition="none",g.style.opacity="0",g.style.transform="scale(0.96)",g.style.willChange="opacity, transform",u.push(g);return}let y=k.left-_.left,x=k.top-_.top;if(d=Math.max(d,Math.abs(x)),Math.abs(y)<.5&&Math.abs(x)<.5){p++;return}let L=(window.innerHeight||800)*1.2,I=(window.innerWidth||1200)*1.2;(Math.abs(x)>L||Math.abs(y)>I)&&f++,Math.abs(x)>L&&(x=Math.sign(x)*L),Math.abs(y)>I&&(y=Math.sign(y)*I),g.style.transition="none",g.style.transform=`translate(${y}px, ${x}px)`,g.style.willChange="transform",l.push(g)}),et&&console.log("[sf-flip]",s,"invert",{moved:l.length,entered:u.length,stationary:p,clampedToOneScreen:f,maxTravelPx:Math.round(d),scrollY:Math.round(window.scrollY||0)}),!l.length&&!u.length){et&&console.log("[sf-flip]",s,"no animation \u2014 every tile already in place");return}t.grid.offsetHeight,requestAnimationFrame(()=>{et&&console.log("[sf-flip]",s,"play",l.length,"gliding /",u.length,"fading in"),l.forEach(m=>{m.style.transition=`transform ${qn}ms ${Un}`,m.style.transform="translate(0, 0)";let g=k=>{k.target!==m||k.propertyName!=="transform"||(m.style.transition="",m.style.transform="",m.style.willChange="",m.removeEventListener("transitionend",g))};m.addEventListener("transitionend",g)}),u.forEach(m=>{m.style.transition=`opacity ${qn}ms ${Un}, transform ${qn}ms ${Un}`,m.style.opacity="1",m.style.transform="scale(1)";let g=k=>{k.target!==m||k.propertyName!=="transform"||(m.style.transition="",m.style.transform="",m.style.opacity="",m.style.willChange="",m.removeEventListener("transitionend",g))};m.addEventListener("transitionend",g)})})}function Ua(e){let t=window.__sfReels;t&&(t.sortBy=e,Cs("banner-sortby"))}function Va(e,t,s,n,o){Vo();let r=Qs[o]||Qs.reels,a=Sn&&(o==="reels"||o==="posts")&&!!(oe&&oe.status==="ok"&&oe.baseline>0);vs=a&&n==="outlier";let i=r;if(a){let _=r.sorts.slice(),y=_.indexOf("likes");_.splice(y>=0?y+1:_.length,0,"outlier"),i=Object.assign({},r,{sorts:_,metrics:r.metrics.concat("outlier")})}let c=i.rows?Pa:Oo,l=document.createElement("div");l.id="sf-filters-row";let u=e.isDark?{divider:"rgba(255,255,255,0.10)",border:"rgba(255,255,255,0.13)",btnBg:"transparent",hover:"rgba(255,255,255,0.07)",text:"rgba(242,243,245,0.62)",textStrong:"#f2f3f5",muted:"rgba(242,243,245,0.45)",newBg:"rgba(255,255,255,0.10)",newText:"rgba(242,243,245,0.5)",accentBorder:"rgba(255,255,255,0.22)",accentBg:"rgba(255,255,255,0.10)",badgeBg:"#f2f3f5",badgeText:"#1a1a1a"}:{divider:"rgba(0,0,0,0.08)",border:"#E6E6E6",btnBg:"#ffffff",hover:"rgba(0,0,0,0.04)",text:"#6b6b6b",textStrong:"#191919",muted:"#9a9a97",newBg:"rgba(0,0,0,0.06)",newText:"rgba(0,0,0,0.38)",accentBorder:"#c4c4c1",accentBg:"#eeeeec",badgeBg:"#191919",badgeText:"#ffffff"};l.style.cssText=`
    --sf-ff-divider:${u.divider}; --sf-ff-border:${u.border}; --sf-ff-btn-bg:${u.btnBg};
    --sf-ff-hover:${u.hover}; --sf-ff-text:${u.text}; --sf-ff-text-strong:${u.textStrong};
    --sf-ff-muted:${u.muted}; --sf-ff-new-bg:${u.newBg}; --sf-ff-new-text:${u.newText};
    --sf-ff-accent-border:${u.accentBorder}; --sf-ff-accent-bg:${u.accentBg};
    --sf-ff-badge-bg:${u.badgeBg}; --sf-ff-badge-text:${u.badgeText};
  `;let p='<svg class="sf-ff-icon" viewBox="0 0 126 74" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M30.7044 73.7279C29.3012 73.7279 28.125 73.2533 27.1758 72.3041C26.2267 71.3549 25.7521 70.1787 25.7521 68.7755C25.7521 67.3724 26.2267 66.1962 27.1758 65.247C28.125 64.2565 29.3012 63.7613 30.7044 63.7613H94.8372C96.2403 63.7613 97.4165 64.2565 98.3657 65.247C99.3562 66.1962 99.8514 67.3724 99.8514 68.7755C99.8514 70.1787 99.3562 71.3549 98.3657 72.3041C97.4165 73.2533 96.2403 73.7279 94.8372 73.7279H30.7044ZM18.014 41.8472C16.6109 41.8472 15.414 41.3726 14.4236 40.4234C13.4744 39.4742 12.9998 38.298 12.9998 36.8949C12.9998 35.4917 13.4744 34.3155 14.4236 33.3663C15.414 32.3759 16.6109 31.8806 18.014 31.8806H107.589C108.951 31.8806 110.107 32.3759 111.056 33.3663C112.047 34.3155 112.542 35.4917 112.542 36.8949C112.542 38.298 112.047 39.4742 111.056 40.4234C110.107 41.3726 108.951 41.8472 107.589 41.8472H18.014ZM4.95223 9.96653C3.59034 9.96653 2.41416 9.49193 1.42369 8.54274C0.474494 7.59354 -0.000105176 6.41736 -0.000105176 5.01419C-0.000105176 3.61103 0.474494 2.43485 1.42369 1.48565C2.41416 0.495186 3.59034 -4.75273e-05 4.95223 -4.75273e-05H120.28C121.683 -4.75273e-05 122.859 0.495186 123.808 1.48565C124.758 2.43485 125.232 3.61103 125.232 5.01419C125.232 6.41736 124.758 7.59354 123.808 8.54274C122.859 9.49193 121.683 9.96653 120.28 9.96653H4.95223Z"/></svg>',f='<svg class="sf-ff-icon" viewBox="0 0 145 117" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M32.995 1.91897C34.1505 0.63962 35.5331 0.0205776 37.1426 0.0618471C38.7521 0.0618471 40.1346 0.680889 41.2902 1.91897L72.4899 33.7996C73.6454 34.9965 74.2232 36.3584 74.2232 37.8853C74.2232 39.5361 73.7073 40.8774 72.6756 41.9091C71.6851 42.8996 70.3851 43.3948 68.7756 43.3948C67.2487 43.3948 65.9693 42.8583 64.9376 41.7853L51.9996 28.4759L42.0949 16.9617L42.652 31.2616V110.809C42.652 112.418 42.1362 113.739 41.1044 114.77C40.0727 115.843 38.7521 116.38 37.1426 116.38C35.4918 116.38 34.1505 115.843 33.1188 114.77C32.0871 113.739 31.5712 112.418 31.5712 110.809V31.2616L32.1902 16.9617L22.2236 28.4759L9.34757 41.7853C8.27456 42.8583 6.97457 43.3948 5.4476 43.3948C3.83809 43.3948 2.51747 42.8996 1.48573 41.9091C0.495266 40.8774 3.2153e-05 39.5361 3.2153e-05 37.8853C3.2153e-05 36.3584 0.577805 34.9965 1.73335 33.7996L32.995 1.91897ZM111.923 114.585C110.726 115.823 109.323 116.421 107.713 116.38C106.145 116.38 104.783 115.781 103.628 114.585L72.428 82.5802C71.2312 81.4246 70.6328 80.0627 70.6328 78.4945C70.6328 76.8437 71.1486 75.5231 72.1804 74.5326C73.2121 73.5422 74.5327 73.0469 76.1422 73.0469C77.6279 73.0469 78.9073 73.5628 79.9803 74.5945L92.8564 87.9039L102.823 99.48L102.204 85.1802V5.63323C102.204 4.02372 102.72 2.70309 103.752 1.67136C104.825 0.59835 106.166 0.0618471 107.775 0.0618471C109.385 0.0618471 110.705 0.59835 111.737 1.67136C112.769 2.70309 113.285 4.02372 113.285 5.63323V85.1802L112.728 99.48L122.694 87.9039L135.57 74.5945C136.602 73.5628 137.881 73.0469 139.408 73.0469C141.018 73.0469 142.318 73.5422 143.308 74.5326C144.34 75.5231 144.856 76.8437 144.856 78.4945C144.856 80.0627 144.278 81.4246 143.123 82.5802L111.923 114.585Z"/></svg>',d=document.createElement("div");d.id="sf-filters-btn",d.className="sf-fbtn",d.innerHTML=p+'<span>Filters</span><span class="sf-ff-badge" id="sf-filters-badge">0</span>';let m=document.createElement("div");m.id="sf-sortby-chip",m.className="sf-sort-chip",m.innerHTML=f+'<span id="sf-sortby-label">Sort by</span>';let g=document.createElement("div");g.id="sf-filters-clear",g.className="sf-clear-all",g.textContent="Clear all",l.appendChild(d),l.appendChild(m),l.appendChild(g),t.appendChild(l);let k=Array.isArray(s)?s.length:0;Aa(s,n,i.noun,!1),window.__sfReels&&(window.__sfReels.theme=e,window.__sfReels.surface=o),typeof gt=="function"&&gt(),typeof ro=="function"&&ro(m,e,n,_=>Ua(_),i.sorts),d.addEventListener("click",_=>{if(_.stopPropagation(),typeof co!="function")return;let y=window.__sfReels,x=y?y.all.map(L=>L.item):Array.isArray(s)?s:[];co(e,x.length,x,{onApply:L=>$n(L),onClear:()=>$n(null)},{typeAvailable:i.type,noun:i.noun.toLowerCase(),metrics:i.metrics})}),g.addEventListener("click",()=>{typeof gt=="function"&&gt(),$n(null)}),a&&Yo(),typeof yn=="function"&&yn("init")}var zo='<svg class="sf-outlier-bolt" viewBox="0 0 18 29" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M6.07988 27.5508C5.86698 27.8292 5.6336 27.9971 5.37975 28.0544C5.1259 28.1199 4.89253 28.0954 4.67962 27.9807C4.4749 27.8743 4.3316 27.6982 4.24972 27.4526C4.16783 27.2151 4.1924 26.9285 4.32341 26.5928L7.95918 16.9629H0.945593C0.667178 16.9629 0.437896 16.881 0.257745 16.7172C0.0857836 16.5453 -0.000197361 16.3324 -0.000197361 16.0785C-0.000197361 15.8083 0.11035 15.5299 0.331443 15.2433L11.816 0.614231C12.0289 0.335816 12.2623 0.163855 12.5162 0.0983453C12.77 0.032836 12.9993 0.057402 13.204 0.172043C13.4169 0.278496 13.5643 0.454552 13.6462 0.700212C13.7281 0.945872 13.7035 1.23247 13.5725 1.56002L9.93674 11.2022H16.9503C17.2287 11.2022 17.4539 11.2841 17.6259 11.4478C17.806 11.6116 17.8961 11.8204 17.8961 12.0743C17.8961 12.3445 17.7856 12.6229 17.5645 12.9095L6.07988 27.5508ZM6.80458 24.1362L6.37467 23.9396L14.4937 13.1797H6.86599L11.0913 4.0289L11.5212 4.21315L3.38991 14.9853H11.0299L6.80458 24.1362Z"/></svg>',vs=!1,oe=null,rn=null;function Oa(){if(document.getElementById("sf-outlier-style"))return;let e=document.createElement("style");e.id="sf-outlier-style",e.textContent=`
    /* Top-right tier tag on the top-3 sorted cards (Notion-like dark pill). */
    .sf-outlier-tag{ position:absolute; top:8px; right:8px; z-index:12;
      display:inline-flex; align-items:center; gap:3px; height:24px; padding:0 9px;
      border-radius:999px; background:rgba(18,18,20,0.82); -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px);
      box-shadow:0 1px 3px rgba(0,0,0,0.30), inset 0 0 0 0.5px rgba(255,255,255,0.12);
      color:#fff; cursor:default; pointer-events:auto;
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif; }
    .sf-outlier-tag .sf-outlier-bolt{ width:auto; height:13px; display:block; fill:currentColor; }
    /* Identical to the hover Download/Transcribe tooltips (same font + div), but
       two lines \u2014 line 1 white, line 2 grey. No arrow / no shadow, opacity fade. */
    .sf-outlier-tag-tip{ position:absolute; top:calc(100% + 6px); right:0; white-space:nowrap;
      display:flex; flex-direction:column; text-align:left;
      background:#000; color:#fff; border-radius:4px; padding:4px 8px;
      font-size:0.75rem; font-weight:400; line-height:1.35;
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased;
      opacity:0; pointer-events:none; z-index:99999; transition:opacity 120ms ease; }
    .sf-outlier-tag-tip .sf-ot-l2{ color:rgba(255,255,255,0.5); }
    .sf-outlier-tag:hover .sf-outlier-tag-tip{ opacity:1; }
  `,document.head.appendChild(e)}function to(e){return typeof e!="number"||!isFinite(e)?0:e>=10?3:e>=5?2:e>=2?1:0}function za(e){return Math.min(10,Math.max(3,Math.round(e*.15)))}function ja(e,t){let s=Math.max(1,Math.round(t*.2)),n=Math.max(1,Math.round(t*.3));return e<s?3:e<s+n?2:1}function jo(e){return e>=10?String(Math.round(e)):(Math.round(e*10)/10).toFixed(1)}function ws(e){return zo.replace('class="sf-outlier-bolt"','style="height:'+e+'px;width:auto;display:inline-block;vertical-align:middle;flex-shrink:0;fill:currentColor;"')}function Rt(e){return Sn&&oe&&oe.status==="ok"&&oe.baseline>0?!e||typeof e.outlierScore!="number"?"\u2014":jo(e.outlierScore)+"\xD7":null}function Ya(e,t,s){Oa();let n=oe&&oe.metric==="likes"?"likes":"views",o=n==="likes"?t.likesCount:t.viewCount,r=document.createElement("div");return r.className="sf-outlier-tag",r.innerHTML=zo.repeat(Math.max(1,e))+'<span class="sf-outlier-tag-tip"><span class="sf-ot-l1">'+jo(t.outlierScore)+"\xD7 more "+n+' than usual</span><span class="sf-ot-l2">'+ve(o)+" "+n+" vs. "+ve(Math.round(s))+" median</span></span>",r.addEventListener("click",a=>a.stopPropagation()),r}function Yo(){if(!Sn||(document.querySelectorAll(".sf-outlier-tag").forEach(c=>c.remove()),!vs))return;let e=window.__sfReels,t=oe&&oe.status==="ok"?oe.baseline:null;if(!e||!(t>0))return;let s=e.view&&e.view.length?e.view:e.all,n=[];s.forEach(c=>{!c||!c.el||!c.item||to(c.item.outlierScore)&&n.push({p:c,score:c.item.outlierScore})}),n.sort((c,l)=>l.score-c.score);let o=za(s.length),r=Math.min(o,n.length);for(;r<n.length&&n[r].score===n[r-1].score;)r++;let a=new Map,i=0;if(n.slice(0,r).forEach((c,l,u)=>{l>0&&c.score!==u[l-1].score&&(i=l);let p=Math.min(to(c.score),ja(i,o));a.set(c.p,p),getComputedStyle(c.p.el).position==="static"&&(c.p.el.style.position="relative"),c.p.el.appendChild(Ya(p,c.p.item,t))}),ka){let c=s.filter(u=>u&&u.item&&u.item.viewCount!=null).sort((u,p)=>+p.item.viewCount-+u.item.viewCount),l=1/0;c.forEach(u=>{let p=a.get(u)||0;p>l&&console.warn("[Outlier] monotonicity violated:",u.item),l=p})}}function no(e=null,t=null,s=null,n=null,o=null,r=null){let a=vt(e,t),i=Uo(s,a),c=Gn(e,a,o,r),l=String(e),u=c&&c.startsWith(l)?c.slice(l.length):c?" "+c:"",p=sessionStorage.getItem("sortFeedSurface")==="explore_search",f=sessionStorage.getItem("sortFeedSurface")==="saved",d=p||f,m=!d&&t==="Reels",g=!d&&t==="Posts",k=document.getElementsByTagName("main")[0].getElementsByTagName("div")[0],_=d?null:k.querySelectorAll('[role="tablist"]')[0],y=Wn(),x=document.createElement("div");if(x.id="banner_most_viewed_reels",x.style=`
    display: flex;
    flex-direction: column;    /* stack: title/actions row, then the Filters row */
    align-items: stretch;
    background-color: ${y.backgroundColor};
    color: ${y.textColor};
    padding: 18px 24px;
    justify-content: flex-start;
    margin-bottom: 16px;       /* gap so the card floats above the sorted grid */
    border: 1px solid ${y.bannerBorder};
    box-shadow: ${y.bannerShadow};
    border-radius: 12px;       /* fully rounded on all four corners */

      position: relative;     /* \u2705 creates stacking context */
      overflow: visible;      /* \u2705 dropdown can spill outside banner */

  `,!document.getElementById("sf-banner-enter-style")){let z=document.createElement("style");z.id="sf-banner-enter-style",z.textContent=`
      @keyframes sf-banner-enter {
        from { opacity: 0; transform: translateY(-8px) scale(0.985); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      .sf-banner-enter {
        animation: sf-banner-enter 380ms cubic-bezier(0.16, 1, 0.3, 1) both;
        will-change: opacity, transform;
      }
    `,document.head.appendChild(z)}x.className="sf-banner-enter",x.addEventListener("animationend",()=>{x.classList.remove("sf-banner-enter"),x.style.willChange="auto"},{once:!0});{let z=document.getElementById("sf-item-hover-style");z||(z=document.createElement("style"),z.id="sf-item-hover-style",document.head.appendChild(z)),z.textContent=`
      [data-sf-sorted-item="true"] {
        transition: box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      body:not([data-sf-select-mode]) [data-sf-sorted-item="true"]:hover {
        box-shadow: ${y.isDark?"0 2px 12px rgba(0,0,0,0.45)":"0 2px 12px rgba(0,0,0,0.12)"};
        z-index: 2;
      }
    `}if(d){let z=document.getElementById("div_most_viewed_reels"),j=z?.previousElementSibling,H=j&&j.style&&j.style.display==="none"?j:z;if(H&&H.parentElement)H.parentElement.insertBefore(x,H);else{let ie=document.getElementsByTagName("main")[0];ie?.insertBefore(x,ie.firstChild)}}else _.replaceWith(x);document.getElementById("banner_most_viewed_reels").innerHTML=`
    <div class="text_section" style="display: flex; flex-direction: row; width: 100%; justify-content: space-between;">
      <div class="metrics_section">
        <div id="reels_number_section" style="display: flex; flex-direction: row; margin-bottom: -2px; align-items: center;">
          <h2 id="sf-banner-subheader" data-sf-suffix="${encodeURIComponent(u)}" style="color: ${y.subHeaderText}; margin: 0; font-size: 0.8rem; line-height: 1.1667; font-weight: 500; letter-spacing: 0.02em; font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;">
            Showing <span style="color: ${y.subHeaderNumber};">${l}</span>${u}
          </h2>
        </div>
        <h1 id="sf-banner-title" style="color: ${y.textColor}; margin: 0; font-size: 1.6rem; line-height: 1.1667; font-weight: 600; letter-spacing: -0.01em; font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;">
          ${i}
        </h1>
      </div>

      <div class="button_section" style="display: flex; flex-direction: column; justify-content: center;">
        <div id="sf-btn-row" style="display: flex; flex-direction: row; gap: 0.6rem; align-items: stretch;">

          <!-- Borderless group: Download all + Copy, divided from Export by a thin rule -->
          <div id="sf-pill-group" style="
            display: flex;
            flex-direction: row;
            align-items: stretch;
            background-color: transparent;
            border: none;
            border-radius: 0;
          ">

          <!-- Copy Button (right end of the Download all | Copy pill) -->
          <div id="copy-native" style="
            background-color: ${y.isDark?"transparent":"white"};
            color: ${y.isDark?"rgba(242,243,245,0.85)":"#1a1a1a"};
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding: 10px 16px;
            border-radius: 8px;
            border: none;
            transition: background-color 0.15s ease;
            font-size: 0.82rem;
            font-weight: 500;
            font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
            white-space: nowrap;
            user-select: none;
            gap: 0.65rem;
          ">
            <img src="${chrome.runtime.getURL(y.copyIcon)}" style="
              height: 0.85rem;
              width: auto;
              pointer-events: none;
              filter: ${y.buttonIconFilterStrong};
            "/>
            <span class="sf-btn-label">Copy</span>
            <div class="tooltip" style="
              position: absolute;
              bottom: calc(100% + 6px);
              left: 50%;
              transform: translateX(-50%) translateY(4px);
              background-color: rgb(0, 0, 0);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 400;
              white-space: nowrap;
              pointer-events: none;
              opacity: 0;
              transition: all 0.2s ease;
              font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
              z-index: 1000;
            ">Copy as CSV</div>
          </div>

          <!-- Export Button \u2014 the banner PRIMARY, wearing the outlined
               default-button look via .sf-primary-export. -->
          <div id="export-native" style="
            background-color: ${y.isDark?"transparent":"white"};
            color: ${y.isDark?"rgba(242,243,245,0.85)":"#1a1a1a"};
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding: 10px 16px;
            border-radius: 8px;
            border: none;
            transition: background-color 0.15s ease;
            font-size: 0.82rem;
            font-weight: 500;
            /* Matches the line-height Export + Transcripts already declares.
               Padding was never the difference \u2014 both are 10px/12px \u2014 but
               without this the label box grows to the ~1.2 default and Export
               renders ~2px taller than its select-mode twin at identical
               padding. */
            line-height: 1;
            font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
            white-space: nowrap;
            user-select: none;
            gap: 0.65rem;
          ">
            <img src="${chrome.runtime.getURL(y.exportIcon)}" style="
              height: 0.85rem;
              width: auto;
              pointer-events: none;
              filter: ${y.buttonIconFilterStrong};
            "/>
            <span class="sf-btn-label">Export</span><span class="sf-btn-count">${l}</span>
            <div class="tooltip" style="
              position: absolute;
              bottom: calc(100% + 6px);
              left: 50%;
              transform: translateX(-50%) translateY(4px);
              background-color: rgb(0, 0, 0);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 400;
              white-space: nowrap;
              pointer-events: none;
              opacity: 0;
              transition: all 0.2s ease;
              font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
              z-index: 1000;
            ">Export sorted data</div>
          </div>

          <!-- Download all Button (icon + label, styled like Copy/Export) -->
          <div id="download-all-native" style="
            background-color: ${y.isDark?"transparent":"white"};
            color: ${y.isDark?"rgba(242,243,245,0.85)":"#1a1a1a"};
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding: 10px 16px;
            border-radius: 8px;
            border: none;
            transition: background-color 0.15s ease;
            font-size: 0.82rem;
            font-weight: 500;
            font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
            white-space: nowrap;
            user-select: none;
            gap: 0.65rem;
          ">
            <img src="${chrome.runtime.getURL("Icons/downloadCompact.svg")}" style="
              height: 0.85rem;
              width: auto;
              pointer-events: none;
              filter: ${y.buttonIconFilterStrong};
            "/>
            <span class="sf-btn-label">Download</span><span class="sf-btn-count">${l}</span>
            <div class="tooltip" style="
              position: absolute;
              bottom: calc(100% + 6px);
              left: 50%;
              transform: translateX(-50%) translateY(4px);
              background-color: rgb(0, 0, 0);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 400;
              white-space: nowrap;
              pointer-events: none;
              opacity: 0;
              transition: all 0.2s ease;
              font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
              z-index: 1000;
            ">Download media from all sorted posts</div>
          </div>

          </div><!-- /sf-pill-group -->

          <!-- Select Button \u2014 leads the row as a quiet ghost button (Export
               took the primary look).
               The glyph is inset in a 173-square viewBox (art fills only ~76% of
               it), so 1.1rem renders the same optical size as the 0.85rem
               tight-cropped Copy/Export/Download icons; the -2px block margins
               keep it from growing the button row. -->
          <div id="select-native" style="
            background-color: ${y.isDark?"transparent":"white"};
            color: ${y.isDark?"rgba(242,243,245,0.85)":"#1a1a1a"};
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding: 10px 16px;
            border-radius: 8px;
            border: 1px solid ${y.isDark?"rgba(255,255,255,0.22)":"rgb(230, 230, 230)"};
            transition: background-color 0.15s ease;
            font-size: 0.82rem;
            font-weight: 500;
            font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
            white-space: nowrap;
            user-select: none;
            gap: 0.65rem;
          "><img src="${chrome.runtime.getURL("Icons/checkmarkIcon.svg")}" style="
              /* 0.85rem, matching Copy / Export / Download all. The old glyph was
                 a check inside a RING, so its box was mostly empty and needed
                 1.1rem to read at the same weight; this one is bare check, all
                 ink, and at 1.1rem it would dominate the row. No negative margin
                 either \u2014 that was centring the ring, and there is no ring now.
                 Its #A5A5A5 fill is irrelevant: --sf-rb-ex-icon opens with
                 brightness(0), so it tints to #a8a8ad like every other icon. */
              height: 0.72rem;
              width: auto;
              pointer-events: none;
              filter: ${y.buttonIconFilterStrong};
            "/><span class="sf-btn-label">Select</span><div class="tooltip" style="
              position: absolute;
              bottom: calc(100% + 6px);
              left: 50%;
              transform: translateX(-50%) translateY(4px);
              background-color: rgb(0, 0, 0);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 400;
              white-space: nowrap;
              pointer-events: none;
              opacity: 0;
              transition: all 0.2s ease;
              font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
              z-index: 1000;
            ">Pick posts to export, download, transcribe</div></div>

        </div>
      </div>
    </div>
  `;{let z=document.getElementById("sf-btn-row"),j=document.getElementById("sf-pill-group"),H=document.getElementById("download-all-native"),ie=document.getElementById("copy-native"),Ce=document.getElementById("export-native"),le=document.getElementById("select-native");if(j&&H&&ie&&j.insertBefore(H,ie),z&&Ce&&le&&z.insertBefore(Ce,le),x.classList.add("sf-primary-export"),z&&le&&z.insertBefore(le,z.firstChild),z&&Ce&&z.appendChild(Ce),z&&le){let S=document.createElement("div");S.id="sf-select-sep",S.className="sf-row-sep",z.insertBefore(S,le.nextSibling)}if(j){let S=document.createElement("div");S.className="sf-pill-sep",S.style.cssText=`
        align-self: center;
        flex: 0 0 auto;
        width: 1px;
        height: 22px;
        margin: 0 0.5rem;
        background-color: ${y.isDark?"rgba(255,255,255,0.22)":"rgb(230, 230, 230)"};
      `,j.appendChild(S)}}let L=document.getElementById("export-native"),I=L.querySelector(".tooltip"),q="transparent",v=y.isDark?"rgba(255,255,255,0.09)":"#f4f4f2";L.addEventListener("mouseover",()=>{L.classList.contains("sortfeed-menu-open")||(L.style.backgroundColor=v,I.style.opacity="1",I.style.transform="translateX(-50%) translateY(0)")}),L.addEventListener("mouseout",()=>{L.style.backgroundColor=q,I.style.opacity="0",I.style.transform="translateX(-50%) translateY(4px)"});let M=document.getElementById("copy-native"),J=M.querySelector(".tooltip"),pe=y.isDark?"transparent":"white",T=y.isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.04)";M.addEventListener("mouseover",()=>{M.style.backgroundColor=T,J.style.opacity="1",J.style.transform="translateX(-50%) translateY(0)"}),M.addEventListener("mouseout",()=>{M.style.backgroundColor=pe,J.style.opacity="0",J.style.transform="translateX(-50%) translateY(4px)"});let $=document.getElementById("select-native"),V=y.isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.04)",te=y.isDark?"transparent":"white",ne=$.querySelector(".tooltip");$.addEventListener("mouseover",()=>{$.style.backgroundColor=V,ne&&(ne.style.opacity="1",ne.style.transform="translateX(-50%) translateY(0)")}),$.addEventListener("mouseout",()=>{$.style.backgroundColor=te,ne&&(ne.style.opacity="0",ne.style.transform="translateX(-50%) translateY(4px)")}),$.addEventListener("click",()=>{Yr(y)});let F=document.getElementById("download-all-native"),ee=F.querySelector(".tooltip");F.addEventListener("mouseover",()=>{F.style.backgroundColor=T,ee.style.opacity="1",ee.style.transform="translateX(-50%) translateY(0)"}),F.addEventListener("mouseout",()=>{F.style.backgroundColor=pe,ee.style.opacity="0",ee.style.transform="translateX(-50%) translateY(4px)"}),F.addEventListener("click",()=>{if(!n||n.length===0)return;let z=sessionStorage.getItem("sortFeedSurface"),H=z==="explore_search"||z==="saved"?null:window.location.pathname.replace(/^\/|\/$/g,"").split("/")[0]||n[0]?.userName||"sortfeed";typeof _n=="function"&&_n(n,H,"all")}),Ia(y,t,n),Ta(y,x);let ue=m?"reels":g?"posts":p?"search":f?sessionStorage.getItem("sortFeedSavedSubMode")==="collection"?"saved_collection":"saved_all":null;ue&&_a&&Va(y,x,n,s,ue),M.addEventListener("click",()=>{Ma(n,t);let z=M.querySelector(".tooltip"),j=M.querySelector("img"),H=M.querySelector(".sf-btn-label"),ie=z.textContent,Ce=j.src,le=H?H.textContent:null,S=j.style.height||"0.85rem";z.textContent="Results copied",H&&(H.textContent="Copied"),j.src=chrome.runtime.getURL(y.checkIcon),j.style.height="0.65rem",j.style.width="auto";let Y="opacity 0.18s ease, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)";j.style.transition="none",j.style.opacity="0",j.style.transform="scale(0.5)",H&&(H.style.display="inline-block",H.style.transition="none",H.style.opacity="0",H.style.transform="scale(0.5)"),requestAnimationFrame(()=>{j.style.transition=Y,j.style.opacity="1",j.style.transform="scale(1)",H&&(H.style.transition=Y,H.style.opacity="1",H.style.transform="scale(1)")}),setTimeout(()=>{let O="opacity 0.15s ease, transform 0.15s ease";j.style.transition=O,j.style.opacity="0",j.style.transform="scale(0.7)",H&&(H.style.transition=O,H.style.opacity="0",H.style.transform="scale(0.7)"),setTimeout(()=>{z.textContent=ie,H&&le!=null&&(H.textContent=le),j.src=Ce,j.style.height=S,j.style.transition="none",j.style.opacity="1",j.style.transform="scale(1)",H&&(H.style.transition="none",H.style.opacity="1",H.style.transform="scale(1)")},150)},1350)})}function Za(){document.querySelectorAll('img[style*="visibility: hidden"]').forEach(e=>{e.style.visibility="visible"})}function Ga(){let e=document.querySelector('[role="tablist"]');if(e){let t=e.parentElement,s=Array.from(t.children),n=s.indexOf(e),o=s[n+1];o&&o.remove()}}window.addEventListener("message",e=>{if(e.source===window){if(e.data.logo_animate_off){if(document.getElementById("banner_most_viewed_reels"))return;if(oe=e.data.sf_outlier||null,rn=e.data.sf_ctx||null,rn)try{sessionStorage.setItem("sortFeedLastSort",JSON.stringify(rn))}catch{}let t=e.data.payload,s=sessionStorage.getItem("sortFeedPostsVSReels"),n=e.data.sf_surface==="explore_search";(e.data.sf_surface==="saved"?Ni(t):n?Ai(t):Ea(t,s)).then(()=>{let a=t.length,i=sessionStorage.getItem("sortFeedSortBy"),c=sessionStorage.getItem("sortFeedPostsVSReels"),l=sessionStorage.getItem("sortItemsVsDates"),u=sessionStorage.getItem("sortFeedNoItems");window.scrollTo({top:0,behavior:"smooth"}),Za(),no(a,c,i,t,l,u),Ws(),chrome.runtime.sendMessage({logo_animate_off:!0})})}else if(e.data.logo_animate_off_zero_insta_time_period){let t=null,s=sessionStorage.getItem("sortFeedSortBy"),n=0,o=sessionStorage.getItem("sortItemsVsDates"),r=sessionStorage.getItem("sortFeedNoItems");window.scrollTo({top:0,behavior:"smooth"}),Ga(),no(n,"Posts",s,t,o,r),Ws(),chrome.runtime.sendMessage({logo_animate_off:!0})}else if(e.data.item_collected_no){let t=e.data.number_items;chrome.runtime.sendMessage({item_collected_no:!0,number_items:t})}}});window.addEventListener("load",function(){sessionStorage.getItem("sortFeedStatus")&&(Zn(),chrome.runtime.sendMessage({logo_animate_on:!0}))});var ge={views:{key:"viewCount",label:"Views",pre:"v_",min:"sf-v-min",max:"sf-v-max",el:"sf-dist-views"},likes:{key:"likesCount",label:"Likes",pre:"l_",min:"sf-l-min",max:"sf-l-max",el:"sf-dist-likes"},outlier:{key:"outlierScore",label:"Outlier score",pre:"o_",min:"sf-o-min",max:"sf-o-max",el:"sf-dist-outlier",dec:1},comments:{key:"commentsCount",label:"Comments",pre:"c_",min:"sf-c-min",max:"sf-c-max",el:"sf-dist-comments"},shares:{key:"sharesCount",label:"Shares",pre:"sh_",min:"sf-sh-min",max:"sf-sh-max",el:"sf-dist-shares"},saves:{key:"savesCount",label:"Saves",pre:"sv_",min:"sf-sv-min",max:"sf-sv-max",el:"sf-dist-saves"}},Pt=["views","likes","outlier","comments","shares","saves"],Fe=["views","likes"],At=30,Xn=["January","February","March","April","May","June","July","August","September","October","November","December"],rt=[],Be=null,Kn=null,Jn=null,Zo=56,Wa=.055;function Xa(e){let t=Zo,s=Wa,n=new Array(t).fill(0),o=0;for(let r=0;r<t;r++){let a=r/(t-1),i=0;for(let c=0;c<At;c++){if(!e[c])continue;let l=(a-(c+.5)/At)/s;i+=e[c]*Math.exp(-.5*l*l)}n[r]=i,i>o&&(o=i)}return o>0?n.map(r=>r/o):n}function Ka(e){let t={},s=()=>new Array(Zo).fill(.16);return Object.keys(ge).forEach(n=>{let o=ge[n].key,r=e.map(p=>p&&p[o]).filter(p=>p!=null&&+p>0).map(Number);if(r.length<2){t[n]={degenerate:!0,lo:r[0]||0,hi:r[0]||0,lnLo:0,lnHi:0,density:s()};return}let a=r[0],i=r[0];for(let p=1;p<r.length;p++)r[p]<a&&(a=r[p]),r[p]>i&&(i=r[p]);if(a===i){t[n]={degenerate:!0,lo:a,hi:i,lnLo:Math.log(a||1),lnHi:Math.log(i||1),density:s()};return}let c=Math.log(a),l=Math.log(i),u=new Array(At).fill(0);r.forEach(p=>{let f=Math.min(At-1,Math.floor((Math.log(p)-c)/(l-c)*At));u[f]++}),t[n]={degenerate:!1,lo:a,hi:i,lnLo:c,lnHi:l,density:Xa(u)}}),t}function Ja(e){let t=e.density||[],s=t.length;if(!s)return"M0,100 L100,100 Z";let n=t.map((r,a)=>[a/(s-1)*100,100-Math.max(0,Math.min(1,r))*92]),o="M0,100 L"+n[0][0].toFixed(2)+","+n[0][1].toFixed(2);for(let r=0;r<s-1;r++){let a=n[r-1]||n[r],i=n[r],c=n[r+1],l=n[r+2]||n[r+1],u=i[0]+(c[0]-a[0])/6,p=i[1]+(c[1]-a[1])/6,f=c[0]-(l[0]-i[0])/6,d=c[1]-(l[1]-i[1])/6;o+=" C"+u.toFixed(2)+","+p.toFixed(2)+" "+f.toFixed(2)+","+d.toFixed(2)+" "+c[0].toFixed(2)+","+c[1].toFixed(2)}return o+" L100,100 Z"}function Qa(e,t,s){let n=Math.pow(10,s||0);return Math.round(Math.exp(e.lnLo+t*(e.lnHi-e.lnLo))*n)/n}function so(e,t){return e.degenerate||t<=e.lo?0:t>=e.hi?1:(Math.log(t)-e.lnLo)/(e.lnHi-e.lnLo)}function Qn(e,t){if(!t)return!0;for(let s of Object.keys(t)){let n=t[s];if(!n||!n.active)continue;let o=e[ge[s].key];if(o==null)return!1;let r=+o;if(r<n.min||r>n.max)return!1}return!0}function Go(){let e={};return Fe.forEach(t=>{let s=Be&&Be[t];e[t]=s&&!s.degenerate?{active:Ln(t),min:qe(t,"min"),max:qe(t,"max")}:{active:!1,min:0,max:1/0}}),e}function es(e,t){if(!t)return!0;let s=e&&e.createDate;if(!s)return!1;let n=new Date(s).getTime();if(isNaN(n))return!1;if(t.mode==="last"){let a=+t.num;if(!a||a<=0)return!0;let i=new Date;return t.unit==="Days"?i.setDate(i.getDate()-a):t.unit==="Weeks"?i.setDate(i.getDate()-a*7):t.unit==="Months"?i.setMonth(i.getMonth()-a):t.unit==="Years"&&i.setFullYear(i.getFullYear()-a),n>=i.getTime()}if(!t.start||!t.end)return!0;let o=new Date(t.start.y,t.start.m,t.start.d,0,0,0,0).getTime(),r=new Date(t.end.y,t.end.m,t.end.d,23,59,59,999).getTime();return n>=o&&n<=r}function Wo(){if(!ar())return null;if(D.postedMode==="last"){let e=document.getElementById("sf-p-unit");return{mode:"last",num:_t("sf-p-num"),unit:e?e.value:D.p_unit}}return{mode:"range",start:D.d_start,end:D.d_end}}var at=[{t:1,label:"Photos",vb:"0 0 146 114",icon:'<path fill="currentColor" d="M139.594 91.4944C139.594 97.4372 138.191 101.936 135.385 104.99C132.578 108.085 128.369 109.632 122.756 109.632H19.0046C14.3824 109.632 10.9158 108.209 8.60471 105.361C6.29362 102.555 5.0349 98.3452 4.82855 92.7325L28.4141 71.4375C29.6934 70.2407 30.9934 69.374 32.314 68.8375C33.6347 68.2597 34.9965 67.9708 36.3997 67.9708C37.8441 67.9708 39.2679 68.2804 40.6711 68.8994C42.1155 69.4772 43.4774 70.3438 44.7568 71.4994L56.2091 81.8374L84.1898 56.8281C85.6342 55.59 87.1199 54.6614 88.6469 54.0424C90.1738 53.4233 91.7834 53.1138 93.4754 53.1138C95.1675 53.1138 96.7976 53.444 98.3658 54.1043C99.9753 54.7233 101.461 55.6725 102.823 56.9519L139.594 91.4944ZM46.1187 57.5709C43.4362 57.5709 40.9806 56.9312 38.7521 55.6519C36.5648 54.3313 34.8108 52.5567 33.4902 50.3281C32.1696 48.0996 31.5093 45.644 31.5093 42.9615C31.5093 40.3203 32.1696 37.8854 33.4902 35.6568C34.8108 33.4283 36.5648 31.6537 38.7521 30.3331C40.9806 29.0124 43.4362 28.3521 46.1187 28.3521C48.8012 28.3521 51.2361 29.0124 53.4234 30.3331C55.6107 31.6537 57.3646 33.4283 58.6852 35.6568C60.0059 37.8854 60.6662 40.3203 60.6662 42.9615C60.6662 45.644 60.0059 48.0996 58.6852 50.3281C57.3646 52.5567 55.6107 54.3313 53.4234 55.6519C51.2361 56.9312 48.8012 57.5709 46.1187 57.5709ZM19.438 113.966C12.9586 113.966 8.08884 112.356 4.82855 109.137C1.60953 105.959 2.45236e-05 101.193 2.45236e-05 94.8373V19.1903C2.45236e-05 12.7935 1.60953 8.00627 4.82855 4.82852C8.08884 1.6095 12.9586 -9.75281e-06 19.438 -9.75281e-06H126.532C133.053 -9.75281e-06 137.923 1.6095 141.142 4.82852C144.361 8.04754 145.97 12.8348 145.97 19.1903V94.8373C145.97 101.193 144.361 105.959 141.142 109.137C137.923 112.356 133.053 113.966 126.532 113.966H19.438ZM19.5618 103.999H126.408C129.462 103.999 131.815 103.194 133.466 101.585C135.158 99.934 136.004 97.4991 136.004 94.2801V19.7474C136.004 16.5284 135.158 14.0935 133.466 12.4427C131.815 10.792 129.462 9.96657 126.408 9.96657H19.5618C16.4665 9.96657 14.0936 10.792 12.4428 12.4427C10.792 14.0935 9.9666 16.5284 9.9666 19.7474V94.2801C9.9666 97.4991 10.792 99.934 12.4428 101.585C14.0936 103.194 16.4665 103.999 19.5618 103.999Z"/>'},{t:2,label:"Reels",vb:"0 0 93 104",icon:'<path fill="currentColor" d="M5.50412e-05 94.9611V9.03807C5.50412e-05 5.94286 0.76354 3.67304 2.29051 2.22861C3.81748 0.742908 5.63334 5.77793e-05 7.73808 5.77793e-05C9.59521 5.77793e-05 11.4936 0.536561 13.4333 1.60957L85.5517 43.7663C88.1104 45.252 89.885 46.5933 90.8755 47.7901C91.9072 48.9457 92.4231 50.3488 92.4231 51.9996C92.4231 53.6091 91.9072 55.0123 90.8755 56.2091C89.885 57.4059 88.1104 58.7472 85.5517 60.2329L13.4333 102.39C11.4936 103.463 9.59521 103.999 7.73808 103.999C5.63334 103.999 3.81748 103.256 2.29051 101.771C0.76354 100.285 5.50412e-05 98.0151 5.50412e-05 94.9611ZM9.96664 90.5659C9.96664 91.1024 10.173 91.4945 10.5857 91.7421C10.9984 91.9485 11.4317 91.9072 11.8857 91.6183L78.0613 52.9901C78.5152 52.7425 78.7422 52.4123 78.7422 51.9996C78.7422 51.5044 78.5152 51.1742 78.0613 51.0091L11.8857 12.3809C11.4317 12.092 10.9984 12.0714 10.5857 12.319C10.173 12.5253 9.96664 12.8968 9.96664 13.4333V90.5659Z"/>'},{t:8,label:"Carousels",vb:"0 0 131 130",icon:'<path fill="currentColor" d="M19.4379 101.028C12.9586 101.028 8.08877 99.4388 4.82849 96.2611C1.60947 93.042 -4.4141e-05 88.2341 -4.4141e-05 81.8374V19.1903C-4.4141e-05 12.7935 1.60947 8.00626 4.82849 4.82851C8.08877 1.60949 12.9586 -1.54078e-05 19.4379 -1.54078e-05H81.5897C88.0278 -1.54078e-05 92.8563 1.60949 96.0753 4.82851C99.3356 8.04753 100.966 12.8348 100.966 19.1903V33.3045H90.9992V19.7474C90.9992 16.5284 90.1531 14.0935 88.4611 12.4427C86.8103 10.792 84.458 9.96656 81.404 9.96656H19.5617C16.4665 9.96656 14.0935 10.792 12.4427 12.4427C10.7919 14.0935 9.96654 16.5284 9.96654 19.7474V81.2802C9.96654 84.4993 10.7919 86.9342 12.4427 88.5849C14.0935 90.2357 16.4665 91.0611 19.5617 91.0611H35.0997V101.028H19.4379ZM49.4614 129.689C42.9821 129.689 38.1123 128.08 34.852 124.861C31.633 121.683 30.0235 116.896 30.0235 110.499V47.852C30.0235 41.4552 31.633 36.6679 34.852 33.4902C38.1123 30.2712 42.9821 28.6616 49.4614 28.6616H111.613C118.051 28.6616 122.88 30.2712 126.099 33.4902C129.359 36.7092 130.989 41.4965 130.989 47.852V110.499C130.989 116.855 129.359 121.642 126.099 124.861C122.88 128.08 118.051 129.689 111.613 129.689H49.4614ZM49.5852 119.723H111.428C114.482 119.723 116.834 118.897 118.485 117.247C120.177 115.596 121.023 113.161 121.023 109.942V48.4091C121.023 45.1901 120.177 42.7552 118.485 41.1044C116.834 39.4536 114.482 38.6282 111.428 38.6282H49.5852C46.49 38.6282 44.117 39.4536 42.4663 41.1044C40.8155 42.7552 39.9901 45.1901 39.9901 48.4091V109.942C39.9901 113.161 40.8155 115.596 42.4663 117.247C44.117 118.897 46.49 119.723 49.5852 119.723Z"/>'}],bn=!1,wt=[],ke=null;function Xo(){return wt.filter(e=>ke&&ke.has(e))}function ei(e){let t=new Set;return(e||[]).forEach(s=>{s&&s.mediaType!=null&&t.add(+s.mediaType)}),at.map(s=>s.t).filter(s=>t.has(s))}function ts(e,t){return!t||!t.length?!0:t.indexOf(e&&+e.mediaType)!==-1}function xs(){if(!bn||wt.length<2)return null;let e=Xo();return e.length?e:null}function ti(){let e=document.getElementById("sf-type-group");if(!e)return;let t=bn&&wt.length>=2;if(e.style.display=t?"block":"none",!t)return;let s=Xo();document.querySelectorAll("#sf-typechips .sf-typechip").forEach(n=>{let o=+n.dataset.t,r=wt.includes(o);n.style.display=r?"":"none",n.classList.toggle("sf-sel",r&&s.indexOf(o)!==-1)})}var Vt=[{key:"views",label:"Views",vb:"0 0 93 104",icon:'<path fill="currentColor" d="M5.50412e-05 94.961V9.03795C5.50412e-05 5.94274 0.76354 3.67292 2.29051 2.22849C3.81748 0.742786 5.63334 -6.42911e-05 7.73808 -6.42911e-05C9.59521 -6.42911e-05 11.4936 0.536439 13.4333 1.60945L85.5517 43.7662C88.1104 45.2519 89.885 46.5932 90.8755 47.79C91.9072 48.9455 92.4231 50.3487 92.4231 51.9995C92.4231 53.609 91.9072 55.0122 90.8755 56.209C89.885 57.4058 88.1104 58.747 85.5517 60.2327L13.4333 102.39C11.4936 103.463 9.59521 103.999 7.73808 103.999C5.63334 103.999 3.81748 103.256 2.29051 101.77C0.76354 100.285 5.50412e-05 98.015 5.50412e-05 94.961ZM9.96664 90.5658C9.96664 91.1023 10.173 91.4944 10.5857 91.742C10.9984 91.9483 11.4317 91.9071 11.8857 91.6182L78.0613 52.99C78.5152 52.7423 78.7422 52.4122 78.7422 51.9995C78.7422 51.5043 78.5152 51.1741 78.0613 51.009L11.8857 12.3808C11.4317 12.0919 10.9984 12.0713 10.5857 12.3189C10.173 12.5252 9.96664 12.8966 9.96664 13.4332V90.5658Z"/>'},{key:"likes",label:"Likes",vb:"0 0 123 114",icon:'<path fill="currentColor" d="M5.50412e-05 37.3903C5.50412e-05 31.9014 0.866714 26.8872 2.60003 22.3475C4.37462 17.7666 6.85079 13.8047 10.0285 10.4619C13.2063 7.11909 16.9205 4.53975 21.1713 2.72389C25.4633 0.908034 30.1061 0.000105079 35.0998 0.000105079C40.8362 0.000105079 45.9743 1.25882 50.5139 3.77626C55.0535 6.2937 58.7059 9.63653 61.471 13.8047C64.2773 9.63653 67.9296 6.2937 72.428 3.77626C76.9676 1.25882 82.1057 0.000105079 87.8422 0.000105079C92.877 0.000105079 97.5198 0.908034 101.771 2.72389C106.063 4.53975 109.777 7.11909 112.913 10.4619C116.091 13.8047 118.547 17.7666 120.28 22.3475C122.055 26.8872 122.942 31.9014 122.942 37.3903C122.942 46.1807 120.61 54.8885 115.947 63.5138C111.324 72.0979 104.742 80.4756 96.1992 88.647C87.6977 96.777 77.628 104.556 65.99 111.985C65.3296 112.398 64.5662 112.769 63.6995 113.099C62.8741 113.471 62.1313 113.656 61.471 113.656C60.8519 113.656 60.1091 113.471 59.2424 113.099C58.417 112.769 57.6742 112.398 57.0138 111.985C45.3759 104.556 35.2855 96.777 26.7427 88.647C18.1999 80.4756 11.5968 72.0979 6.93333 63.5138C2.31115 54.8885 5.50412e-05 46.1807 5.50412e-05 37.3903ZM9.96664 37.3903C9.96664 43.1267 11.3492 48.9457 14.1142 54.8472C16.8793 60.7075 20.6348 66.4646 25.3808 72.1185C30.1268 77.7724 35.4918 83.1787 41.4759 88.3374C47.5012 93.4549 53.7536 98.1596 60.2329 102.452C60.8932 102.947 61.3059 103.194 61.471 103.194C61.636 103.194 62.0694 102.947 62.7709 102.452C69.2502 98.1596 75.4819 93.4549 81.466 88.3374C87.4914 83.1787 92.8564 77.7724 97.5611 72.1185C102.307 66.4646 106.063 60.7075 108.828 54.8472C111.593 48.9457 112.975 43.1267 112.975 37.3903C112.975 31.9014 111.882 27.1142 109.694 23.0285C107.548 18.9015 104.577 15.7031 100.78 13.4333C97.0246 11.1222 92.7532 9.96669 87.966 9.96669C84.0866 9.96669 80.7438 10.6683 77.9375 12.0714C75.1724 13.4333 72.7788 15.1666 70.7566 17.2714C68.7756 19.3349 67.0836 21.3777 65.6804 23.3999C64.7725 24.5967 64.0297 25.4221 63.4519 25.8761C62.8741 26.33 62.2138 26.557 61.471 26.557C60.7281 26.557 60.0472 26.3507 59.4281 25.938C58.8503 25.484 58.1281 24.638 57.2615 23.3999C55.9408 21.3364 54.2901 19.273 52.3091 17.2095C50.3282 15.146 47.9139 13.4333 45.0663 12.0714C42.2187 10.6683 38.8553 9.96669 34.9759 9.96669C30.1887 9.96669 25.8967 11.1222 22.0999 13.4333C18.3443 15.7031 15.3729 18.9015 13.1857 23.0285C11.0396 27.1142 9.96664 31.9014 9.96664 37.3903Z"/>'},{key:"outlier",label:"Outlier score",vb:"0 0 18 29",icon:'<path fill="currentColor" d="M6.07988 27.5508C5.86698 27.8292 5.6336 27.9971 5.37975 28.0544C5.1259 28.1199 4.89253 28.0954 4.67962 27.9807C4.4749 27.8743 4.3316 27.6982 4.24972 27.4526C4.16783 27.2151 4.1924 26.9285 4.32341 26.5928L7.95918 16.9629H0.945593C0.667178 16.9629 0.437896 16.881 0.257745 16.7172C0.0857836 16.5453 -0.000197361 16.3324 -0.000197361 16.0785C-0.000197361 15.8083 0.11035 15.5299 0.331443 15.2433L11.816 0.614231C12.0289 0.335816 12.2623 0.163855 12.5162 0.0983453C12.77 0.032836 12.9993 0.057402 13.204 0.172043C13.4169 0.278496 13.5643 0.454552 13.6462 0.700212C13.7281 0.945872 13.7035 1.23247 13.5725 1.56002L9.93674 11.2022H16.9503C17.2287 11.2022 17.4539 11.2841 17.6259 11.4478C17.806 11.6116 17.8961 11.8204 17.8961 12.0743C17.8961 12.3445 17.7856 12.6229 17.5645 12.9095L6.07988 27.5508ZM6.80458 24.1362L6.37467 23.9396L14.4937 13.1797H6.86599L11.0913 4.0289L11.5212 4.21315L3.38991 14.9853H11.0299L6.80458 24.1362Z"/>'},{key:"shares",label:"Shares",vb:"0 0 134 114",icon:'<path fill="currentColor" d="M72.985 113.532C70.8803 113.532 69.1263 112.851 67.7232 111.489C66.3613 110.128 65.6803 108.394 65.6803 106.289V82.6421H63.8851C55.9201 82.6421 48.863 83.4262 42.7139 84.9944C36.5647 86.5627 31.1378 89.2658 26.4331 93.1039C21.7283 96.9007 17.5808 102.183 13.9903 108.951C12.9173 110.932 11.6999 112.191 10.338 112.728C9.01734 113.264 7.69671 113.532 6.37609 113.532C4.72531 113.532 3.23961 112.81 1.91898 111.366C0.63963 109.962 -4.71286e-05 107.92 -4.71286e-05 105.237C-4.71286e-05 93.8054 1.23804 83.5293 3.71421 74.4088C6.23164 65.247 10.0697 57.4264 15.2284 50.9471C20.4283 44.4678 27.0521 39.5154 35.0996 36.0901C43.1885 32.6647 52.7836 30.952 63.8851 30.952H65.6803V7.55223C65.6803 5.48875 66.3613 3.71417 67.7232 2.22846C69.1263 0.742763 70.9216 -8.80919e-05 73.1088 -8.80919e-05C74.5945 -8.80919e-05 75.9358 0.350703 77.1326 1.05228C78.3707 1.7126 79.8151 2.82687 81.4659 4.39511L130.308 50.0804C131.505 51.1947 132.331 52.3296 132.785 53.4852C133.238 54.6407 133.465 55.7343 133.465 56.7661C133.465 57.7566 133.238 58.8296 132.785 59.9851C132.331 61.1407 131.505 62.2756 130.308 63.3898L81.4659 109.508C79.9802 110.912 78.5564 111.923 77.1945 112.542C75.8739 113.202 74.4707 113.532 72.985 113.532ZM76.5136 100.223C76.885 100.223 77.2358 100.037 77.5659 99.6657L121.704 57.9423C121.951 57.6947 122.116 57.4883 122.199 57.3232C122.281 57.1169 122.323 56.9312 122.323 56.7661C122.323 56.3947 122.116 56.0026 121.704 55.5899L77.6279 13.3093C77.4628 13.1855 77.2771 13.0823 77.0707 12.9998C76.9056 12.876 76.7406 12.8141 76.5755 12.8141C75.9564 12.8141 75.6469 13.103 75.6469 13.6807V38.2567C75.6469 39.6186 74.966 40.2996 73.6041 40.2996H65.3089C56.8074 40.2996 49.4408 41.3932 43.2091 43.5805C36.9774 45.7265 31.7156 48.7185 27.4235 52.5566C23.1315 56.3534 19.6442 60.7486 16.9617 65.7422C14.3205 70.7358 12.3602 76.0802 11.0808 81.7754C9.80146 87.4293 9.03797 93.1658 8.79035 98.9848C8.79035 99.4387 8.9348 99.6657 9.22368 99.6657C9.38876 99.6657 9.51257 99.6244 9.59511 99.5419C9.67765 99.4181 9.76019 99.253 9.84272 99.0467C13.4744 91.288 19.9537 85.0563 29.2807 80.3516C38.6076 75.6469 50.617 73.2945 65.3089 73.2945H73.6041C74.966 73.2945 75.6469 73.9755 75.6469 75.3374V99.2943C75.6469 99.9133 75.9358 100.223 76.5136 100.223Z"/>'},{key:"comments",label:"Comments",vb:"0 0 137 129",icon:'<path fill="currentColor" d="M38.0711 128.08C35.9251 128.08 34.2537 127.358 33.0569 125.913C31.9014 124.51 31.3236 122.612 31.3236 120.218V104.123H28.3522C22.203 104.123 17.0237 103.029 12.8142 100.842C8.60473 98.6134 5.40635 95.3944 3.21907 91.1849C1.07305 86.9754 4.74118e-05 81.8374 4.74118e-05 75.7708V28.3521C4.74118e-05 22.2855 1.07305 17.1475 3.21907 12.938C5.40635 8.72849 8.60473 5.5301 12.8142 3.34282C17.0237 1.11427 22.203 -6.18398e-06 28.3522 -6.18398e-06H108.085C114.234 -6.18398e-06 119.413 1.11427 123.623 3.34282C127.832 5.5301 131.01 8.72849 133.156 12.938C135.343 17.1475 136.437 22.2855 136.437 28.3521V75.7708C136.437 81.8374 135.343 86.9754 133.156 91.1849C131.01 95.3944 127.832 98.6134 123.623 100.842C119.413 103.029 114.234 104.123 108.085 104.123H68.3423L46.9854 123.127C45.1282 124.778 43.56 126.016 42.2806 126.842C41.0013 127.667 39.5981 128.08 38.0711 128.08ZM40.6092 116.751L60.4186 97.0658C61.5741 95.869 62.6884 95.0849 63.7614 94.7135C64.8344 94.342 66.2376 94.1563 67.9709 94.1563H108.085C114.317 94.1563 118.939 92.6087 121.951 89.5135C124.964 86.377 126.47 81.7755 126.47 75.7089V28.3521C126.47 22.3268 124.964 17.7665 121.951 14.6713C118.939 11.5348 114.317 9.96657 108.085 9.96657H28.3522C22.0792 9.96657 17.4364 11.5348 14.4237 14.6713C11.4523 17.7665 9.96663 22.3268 9.96663 28.3521V75.7089C9.96663 81.7755 11.4523 86.377 14.4237 89.5135C17.4364 92.6087 22.0792 94.1563 28.3522 94.1563H35.9664C37.6585 94.1563 38.8553 94.5071 39.5568 95.2087C40.2584 95.9103 40.6092 97.1071 40.6092 98.7991V116.751ZM36.3378 34.9759C35.3061 34.9759 34.4394 34.6251 33.7379 33.9235C33.0775 33.2219 32.7474 32.3759 32.7474 31.3854C32.7474 30.395 33.0775 29.5696 33.7379 28.9093C34.4394 28.2077 35.3061 27.8569 36.3378 27.8569H99.2944C100.326 27.8569 101.172 28.2077 101.832 28.9093C102.534 29.5696 102.885 30.395 102.885 31.3854C102.885 32.3759 102.534 33.2219 101.832 33.9235C101.172 34.6251 100.326 34.9759 99.2944 34.9759H36.3378ZM36.3378 55.0948C35.3061 55.0948 34.4394 54.7646 33.7379 54.1043C33.0775 53.4027 32.7474 52.536 32.7474 51.5043C32.7474 50.5551 33.0775 49.7297 33.7379 49.0281C34.4394 48.2853 35.3061 47.9139 36.3378 47.9139H99.2944C100.326 47.9139 101.172 48.2853 101.832 49.0281C102.534 49.7297 102.885 50.5551 102.885 51.5043C102.885 52.536 102.534 53.4027 101.832 54.1043C101.172 54.7646 100.326 55.0948 99.2944 55.0948H36.3378ZM36.3378 75.2755C35.3061 75.2755 34.4394 74.9454 33.7379 74.2851C33.0775 73.5835 32.7474 72.7375 32.7474 71.747C32.7474 70.7153 33.0775 69.8486 33.7379 69.147C34.4394 68.4454 35.3061 68.0946 36.3378 68.0946H77.2565C78.247 68.0946 79.093 68.4454 79.7946 69.147C80.4962 69.8486 80.847 70.7153 80.847 71.747C80.847 72.7375 80.4962 73.5835 79.7946 74.2851C79.093 74.9454 78.247 75.2755 77.2565 75.2755H36.3378Z"/>'},{key:"saves",label:"Saves",vb:"0 0 84 133",icon:'<path fill="currentColor" d="M6.56179 132.785C4.49831 132.785 2.8888 132.124 1.73326 130.804C0.577711 129.483 -6.15045e-05 127.626 -6.15045e-05 125.232V17.7665C-6.15045e-05 11.8649 1.46501 7.42845 4.39514 4.45705C7.32527 1.48564 11.6998 -5.73546e-05 17.5188 -5.73546e-05H65.9279C71.7469 -5.73546e-05 76.1215 1.48564 79.0516 4.45705C81.9818 7.42845 83.4468 11.8649 83.4468 17.7665V125.232C83.4468 127.626 82.8691 129.483 81.7135 130.804C80.558 132.124 78.9485 132.785 76.885 132.785C75.358 132.785 73.9342 132.269 72.6136 131.237C71.3342 130.205 69.2914 128.348 66.4851 125.666L42.2805 101.832C41.9091 101.42 41.5377 101.42 41.1662 101.832L16.9617 125.666C14.1554 128.389 12.0919 130.246 10.7713 131.237C9.45065 132.269 8.04749 132.785 6.56179 132.785ZM11.6379 116.07L38.4425 90.0706C39.4329 89.1214 40.5266 88.6468 41.7234 88.6468C42.9202 88.6468 44.0138 89.1214 45.0043 90.0706L71.8088 116.07C72.2628 116.483 72.6755 116.628 73.0469 116.504C73.4596 116.421 73.666 116.07 73.666 115.451V17.8903C73.666 15.2077 72.9644 13.1855 71.5612 11.8236C70.1993 10.4618 68.1771 9.78081 65.4946 9.78081H18.0141C15.2903 9.78081 13.2268 10.4618 11.8236 11.8236C10.4618 13.1855 9.78081 15.2077 9.78081 17.8903V115.451C9.78081 116.07 9.96652 116.421 10.3379 116.504C10.7506 116.628 11.184 116.483 11.6379 116.07Z"/>'},{key:"oldest",label:"Oldest",vb:"0 0 127 127",icon:'<path fill="currentColor" d="M30.7664 69.828C29.5283 69.828 28.4966 69.4153 27.6712 68.5899C26.8458 67.7645 26.4331 66.7328 26.4331 65.4947C26.4331 64.2979 26.8458 63.2868 27.6712 62.4614C28.4966 61.636 29.5283 61.2233 30.7664 61.2233H58.809V23.7712C58.809 22.5744 59.2217 21.5633 60.0471 20.7379C60.8725 19.9125 61.8836 19.4998 63.0804 19.4998C64.3185 19.4998 65.3503 19.9125 66.1756 20.7379C67.001 21.5633 67.4137 22.5744 67.4137 23.7712V65.4947C67.4137 66.7328 67.001 67.7645 66.1756 68.5899C65.3503 69.4153 64.3185 69.828 63.0804 69.828H30.7664ZM63.1423 126.285C54.4345 126.285 46.2631 124.634 38.6283 121.332C30.9934 118.072 24.2871 113.553 18.5094 107.775C12.7317 101.998 8.19202 95.2912 4.89046 87.6564C1.63017 80.0215 2.29292e-05 71.8502 2.29292e-05 63.1423C2.29292e-05 54.4344 1.63017 46.2631 4.89046 38.6282C8.19202 30.9934 12.7317 24.2871 18.5094 18.5094C24.2871 12.6904 30.9934 8.15072 38.6283 4.89043C46.2631 1.63014 54.4345 -2.61515e-06 63.1423 -2.61515e-06C71.8502 -2.61515e-06 80.0216 1.63014 87.6564 4.89043C95.2913 8.15072 101.998 12.6904 107.775 18.5094C113.553 24.2871 118.072 30.9934 121.332 38.6282C124.634 46.2631 126.285 54.4344 126.285 63.1423C126.285 71.8502 124.634 80.0215 121.332 87.6564C118.072 95.2912 113.553 101.998 107.775 107.775C101.998 113.553 95.2913 118.072 87.6564 121.332C80.0216 124.634 71.8502 126.285 63.1423 126.285ZM63.1423 115.761C70.4058 115.761 77.2152 114.399 83.5707 111.675C89.9262 108.951 95.5182 105.175 100.347 100.347C105.175 95.5182 108.951 89.9262 111.675 83.5707C114.399 77.2152 115.761 70.4057 115.761 63.1423C115.761 55.8789 114.399 49.0694 111.675 42.7139C108.951 36.3171 105.175 30.7251 100.347 25.9379C95.5182 21.1093 89.9262 17.3332 83.5707 14.6094C77.2152 11.8856 70.4058 10.5237 63.1423 10.5237C55.8789 10.5237 49.0694 11.8856 42.7139 14.6094C36.3584 17.3332 30.7664 21.1093 25.9379 25.9379C21.1094 30.7251 17.3332 36.3171 14.6094 42.7139C11.8856 49.0694 10.5237 55.8789 10.5237 63.1423C10.5237 70.4057 11.8856 77.2152 14.6094 83.5707C17.3332 89.9262 21.1094 95.5182 25.9379 100.347C30.7664 105.175 36.3584 108.951 42.7139 111.675C49.0694 114.399 55.8789 115.761 63.1423 115.761Z"/>'}],Cn=(e,t)=>t&&t.vb&&t.icon?'<svg class="'+e+'" viewBox="'+t.vb+'" xmlns="http://www.w3.org/2000/svg">'+t.icon+"</svg>":"",xt={};Vt.forEach(e=>{e.vb&&e.icon&&(xt[e.key]=e)});var Ko={};Object.keys(xt).forEach(e=>{Ko[e]=Cn("sf-mt-ic",xt[e])});var _s={views:{vb:"0 0 158 175",icon:'<path fill="currentColor" d="M15.7461 174.992C11.5143 174.992 7.96615 173.462 5.10156 170.402C2.30208 167.408 0.902344 163.273 0.902344 158V17.1797C0.902344 11.9714 2.30208 7.86979 5.10156 4.875C7.96615 1.8151 11.5143 0.285156 15.7461 0.285156C17.8945 0.285156 19.9779 0.643229 21.9961 1.35938C24.0143 2.07552 26.2279 3.11719 28.6367 4.48438L144.652 71.7695C149.014 74.2435 152.204 76.6849 154.223 79.0938C156.241 81.4375 157.25 84.2695 157.25 87.5898C157.25 90.9753 156.241 93.8398 154.223 96.1836C152.204 98.5273 149.014 100.969 144.652 103.508L28.6367 170.695C26.2279 172.128 24.0143 173.202 21.9961 173.918C19.9779 174.634 17.8945 174.992 15.7461 174.992ZM24.3398 147.355C24.6003 147.355 24.9909 147.225 25.5117 146.965L126.488 88.5664C126.684 88.4362 126.846 88.306 126.977 88.1758C127.172 88.0456 127.27 87.8503 127.27 87.5898C127.27 87.3294 127.172 87.1341 126.977 87.0039C126.846 86.8737 126.684 86.7435 126.488 86.6133L25.5117 28.2148C24.9909 27.9544 24.6003 27.8242 24.3398 27.8242C23.7539 27.8242 23.4609 28.1823 23.4609 28.8984V146.281C23.4609 146.997 23.7539 147.355 24.3398 147.355Z"/>'},likes:{vb:"0 0 201 187",icon:'<path fill="currentColor" d="M0.902344 63.1484C0.902344 53.9036 2.36719 45.4727 5.29688 37.8555C8.29167 30.2383 12.4258 23.6628 17.6992 18.1289C23.0378 12.5951 29.1901 8.36328 36.1562 5.43359C43.1224 2.4388 50.6419 0.941406 58.7148 0.941406C68.1549 0.941406 76.4557 2.89453 83.6172 6.80078C90.7786 10.6419 96.5078 15.7201 100.805 22.0352C105.167 15.7201 110.896 10.6419 117.992 6.80078C125.154 2.89453 133.454 0.941406 142.895 0.941406C150.967 0.941406 158.487 2.4388 165.453 5.43359C172.484 8.36328 178.637 12.5951 183.91 18.1289C189.184 23.6628 193.285 30.2383 196.215 37.8555C199.21 45.4727 200.707 53.9036 200.707 63.1484C200.707 77.0807 197.029 90.9154 189.672 104.652C182.315 118.324 171.931 131.638 158.52 144.594C145.173 157.484 129.483 169.789 111.449 181.508C109.626 182.68 107.738 183.721 105.785 184.633C103.897 185.609 102.237 186.098 100.805 186.098C99.4375 186.098 97.7773 185.609 95.8242 184.633C93.8711 183.721 92.0156 182.68 90.2578 181.508C72.1589 169.789 56.4036 157.484 42.9922 144.594C29.6458 131.638 19.2943 118.324 11.9375 104.652C4.58073 90.9154 0.902344 77.0807 0.902344 63.1484ZM23.5586 63.0508C23.5586 71.319 25.5117 79.8151 29.418 88.5391C33.3893 97.1979 38.8581 105.792 45.8242 114.32C52.7904 122.784 60.8307 130.987 69.9453 138.93C79.0599 146.872 88.793 154.262 99.1445 161.098C99.9909 161.749 100.544 162.074 100.805 162.074C101.065 162.074 101.651 161.749 102.562 161.098C112.849 154.262 122.549 146.872 131.664 138.93C140.779 130.987 148.819 122.784 155.785 114.32C162.751 105.792 168.188 97.1979 172.094 88.5391C176.065 79.8151 178.051 71.319 178.051 63.0508C178.051 55.043 176.423 48.0443 173.168 42.0547C169.978 36.0651 165.583 31.4102 159.984 28.0898C154.385 24.7044 148.038 23.0117 140.941 23.0117C135.212 23.0117 130.329 23.9883 126.293 25.9414C122.257 27.8294 118.773 30.2708 115.844 33.2656C112.914 36.1953 110.375 39.1576 108.227 42.1523C106.794 44.0404 105.525 45.4076 104.418 46.2539C103.376 47.1003 102.172 47.5234 100.805 47.5234C99.4375 47.5234 98.2005 47.1328 97.0938 46.3516C95.987 45.5052 94.7174 44.1055 93.2852 42.1523C91.2669 39.1576 88.793 36.1953 85.8633 33.2656C82.9987 30.3359 79.5156 27.8945 75.4141 25.9414C71.3125 23.9883 66.3971 23.0117 60.668 23.0117C53.5716 23.0117 47.224 24.7044 41.625 28.0898C36.026 31.4102 31.599 36.0651 28.3438 42.0547C25.1536 48.0443 23.5586 55.043 23.5586 63.0508Z"/>'},comments:{vb:"0 0 218 209",icon:'<path fill="currentColor" d="M63.6953 208.551C59.4635 208.551 56.1107 207.151 53.6367 204.352C51.2279 201.552 50.0234 197.809 50.0234 193.121V169.977H46.5078C37.263 169.977 29.2227 168.121 22.3867 164.41C15.5508 160.699 10.2448 155.361 6.46875 148.395C2.75781 141.428 0.902344 133.062 0.902344 123.297V46.832C0.902344 37.0664 2.72526 28.7005 6.37109 21.7344C10.082 14.7682 15.4206 9.42969 22.3867 5.71875C29.3529 1.94271 37.7513 0.0546875 47.582 0.0546875H171.215C181.111 0.0546875 189.542 1.94271 196.508 5.71875C203.474 9.42969 208.78 14.7682 212.426 21.7344C216.137 28.7005 217.992 37.0664 217.992 46.832V123.297C217.992 133.062 216.137 141.428 212.426 148.395C208.78 155.361 203.474 160.699 196.508 164.41C189.542 168.121 181.111 169.977 171.215 169.977H114.867L81.6641 199.273C78.0182 202.464 74.8607 204.807 72.1914 206.305C69.5221 207.802 66.6901 208.551 63.6953 208.551ZM69.0664 184.234L99.8281 153.863C102.042 151.65 104.092 150.185 105.98 149.469C107.868 148.688 110.375 148.297 113.5 148.297H170.336C179.06 148.297 185.57 146.116 189.867 141.754C194.164 137.392 196.312 130.914 196.312 122.32V47.7109C196.312 39.1823 194.164 32.737 189.867 28.375C185.57 24.013 179.06 21.832 170.336 21.832H48.5586C39.7695 21.832 33.2266 24.013 28.9297 28.375C24.6979 32.737 22.582 39.1823 22.582 47.7109V122.32C22.582 130.914 24.6979 137.392 28.9297 141.754C33.2266 146.116 39.7695 148.297 48.5586 148.297H60.668C63.4674 148.297 65.5508 148.948 66.918 150.25C68.3503 151.487 69.0664 153.635 69.0664 156.695V184.234ZM60.1797 60.2109C58.4219 60.2109 56.9245 59.5924 55.6875 58.3555C54.5156 57.0534 53.9297 55.556 53.9297 53.8633C53.9297 52.1055 54.5156 50.6081 55.6875 49.3711C56.9245 48.1341 58.4219 47.5156 60.1797 47.5156H157.836C159.594 47.5156 161.091 48.1341 162.328 49.3711C163.565 50.6081 164.184 52.1055 164.184 53.8633C164.184 55.556 163.565 57.0534 162.328 58.3555C161.091 59.5924 159.594 60.2109 157.836 60.2109H60.1797ZM60.1797 90.7773C58.4219 90.7773 56.9245 90.1589 55.6875 88.9219C54.5156 87.6849 53.9297 86.1875 53.9297 84.4297C53.9297 82.737 54.5156 81.2396 55.6875 79.9375C56.9245 78.6354 58.4219 77.9844 60.1797 77.9844H157.836C159.594 77.9844 161.091 78.6354 162.328 79.9375C163.565 81.1745 164.184 82.6719 164.184 84.4297C164.184 86.1875 163.565 87.6849 162.328 88.9219C161.091 90.1589 159.594 90.7773 157.836 90.7773H60.1797ZM60.1797 121.441C58.4219 121.441 56.9245 120.823 55.6875 119.586C54.5156 118.284 53.9297 116.786 53.9297 115.094C53.9297 113.336 54.5156 111.839 55.6875 110.602C56.9245 109.299 58.4219 108.648 60.1797 108.648H123.852C125.609 108.648 127.107 109.267 128.344 110.504C129.581 111.741 130.199 113.271 130.199 115.094C130.199 116.786 129.581 118.284 128.344 119.586C127.107 120.823 125.609 121.441 123.852 121.441H60.1797Z"/>'},oldest:{vb:"0 0 205 205",icon:'<path fill="currentColor" d="M54.2891 115.773C51.8802 115.773 49.8294 114.96 48.1367 113.332C46.5091 111.704 45.6953 109.686 45.6953 107.277C45.6953 104.934 46.5091 102.948 48.1367 101.32C49.8294 99.6927 51.8802 98.8789 54.2891 98.8789H93.8398V44.7773C93.8398 42.3685 94.6536 40.3503 96.2812 38.7227C97.9089 37.0951 99.8945 36.2812 102.238 36.2812C104.647 36.2812 106.665 37.0951 108.293 38.7227C109.921 40.3503 110.734 42.3685 110.734 44.7773V107.277C110.734 109.686 109.921 111.704 108.293 113.332C106.665 114.96 104.647 115.773 102.238 115.773H54.2891ZM102.336 204.348C88.4036 204.348 75.2852 201.678 62.9805 196.34C50.6758 191.066 39.8359 183.742 30.4609 174.367C21.0859 164.992 13.7292 154.185 8.39062 141.945C3.11719 129.641 0.480469 116.49 0.480469 102.492C0.480469 88.5599 3.11719 75.474 8.39062 63.2344C13.7292 50.9297 21.0534 40.0898 30.3633 30.7148C39.7383 21.3398 50.5781 14.0156 62.8828 8.74219C75.1875 3.40365 88.306 0.734375 102.238 0.734375C116.171 0.734375 129.289 3.40365 141.594 8.74219C153.964 14.0156 164.803 21.3398 174.113 30.7148C183.488 40.0898 190.845 50.9297 196.184 63.2344C201.522 75.474 204.191 88.5599 204.191 102.492C204.191 116.49 201.522 129.641 196.184 141.945C190.845 154.185 183.488 164.992 174.113 174.367C164.803 183.742 153.996 191.066 141.691 196.34C129.387 201.678 116.268 204.348 102.336 204.348ZM102.336 181.984C113.339 181.984 123.625 179.934 133.195 175.832C142.831 171.73 151.294 166.066 158.586 158.84C165.878 151.548 171.574 143.117 175.676 133.547C179.777 123.911 181.828 113.56 181.828 102.492C181.828 91.4896 179.745 81.2031 175.578 71.6328C171.477 61.9974 165.78 53.5339 158.488 46.2422C151.262 38.9505 142.831 33.2539 133.195 29.1523C123.625 25.0508 113.306 23 102.238 23C91.2357 23 80.9167 25.0508 71.2812 29.1523C61.7109 33.2539 53.2799 38.9505 45.9883 46.2422C38.7617 53.5339 33.0977 61.9974 28.9961 71.6328C24.9596 81.2031 22.9414 91.4896 22.9414 102.492C22.9414 113.56 24.9596 123.911 28.9961 133.547C33.0977 143.117 38.7943 151.548 46.0859 158.84C53.3776 166.066 61.8086 171.73 71.3789 175.832C81.0143 179.934 91.3333 181.984 102.336 181.984Z"/>'},shares:{vb:"0 0 213 185",icon:'<path d="M114.207 184.289C110.105 184.289 106.688 182.922 103.953 180.188C101.219 177.518 99.8516 174.133 99.8516 170.031V136.438H97.7031C86.2448 136.438 76.2188 137.74 67.625 140.344C59.0312 142.883 51.5443 146.919 45.1641 152.453C38.7839 157.922 33.2174 165.083 28.4648 173.938C26.4466 177.779 24.168 180.35 21.6289 181.652C19.1549 182.954 16.4857 183.605 13.6211 183.605C9.71484 183.605 6.52474 181.75 4.05078 178.039C1.57682 174.328 0.339844 168.794 0.339844 161.438C0.339844 143.924 2.32552 128.234 6.29688 114.367C10.2682 100.5 16.2578 88.7161 24.2656 79.0156C32.3385 69.25 42.4948 61.8281 54.7344 56.75C66.974 51.6068 81.2969 49.0352 97.7031 49.0352H99.8516V15.3438C99.8516 11.3073 101.219 7.88932 103.953 5.08984C106.688 2.22526 110.138 0.792969 114.305 0.792969C117.039 0.792969 119.546 1.37891 121.824 2.55078C124.103 3.72266 126.707 5.67578 129.637 8.41016L207.176 80.4805C209.129 82.3034 210.529 84.2891 211.375 86.4375C212.221 88.5208 212.645 90.5391 212.645 92.4922C212.645 94.3802 212.221 96.3984 211.375 98.5469C210.529 100.695 209.129 102.681 207.176 104.504L129.637 177.062C126.967 179.602 124.428 181.424 122.02 182.531C119.611 183.703 117.007 184.289 114.207 184.289ZM120.75 156.555C121.271 156.555 121.792 156.262 122.312 155.676L187.449 94.3477C187.775 93.957 188.003 93.6315 188.133 93.3711C188.263 93.0456 188.328 92.7526 188.328 92.4922C188.328 91.9714 188.035 91.3854 187.449 90.7344L122.41 28.7227C122.15 28.5273 121.857 28.3646 121.531 28.2344C121.271 28.1042 121.01 28.0391 120.75 28.0391C119.708 28.0391 119.188 28.5273 119.188 29.5039V65.3438C119.188 67.4271 118.146 68.4688 116.062 68.4688H103.953C91.7786 68.4688 81.069 69.9336 71.8242 72.8633C62.6445 75.7279 54.7344 79.7969 48.0938 85.0703C41.5182 90.3438 36.082 96.5612 31.7852 103.723C27.5534 110.884 24.3958 118.729 22.3125 127.258C20.2292 135.721 19.0247 144.608 18.6992 153.918C18.6992 154.569 18.9271 154.895 19.3828 154.895C19.5781 154.895 19.7409 154.829 19.8711 154.699C20.0013 154.504 20.1315 154.243 20.2617 153.918C26.2513 141.874 36.2122 132.661 50.1445 126.281C64.0768 119.836 82.013 116.613 103.953 116.613H116.062C118.146 116.613 119.188 117.688 119.188 119.836V154.895C119.188 156.001 119.708 156.555 120.75 156.555Z" fill="currentColor"/>'},saves:{vb:"0 0 137 215",icon:'<path d="M12.7305 214.719C8.82422 214.719 5.73177 213.449 3.45312 210.91C1.23958 208.436 0.132812 205.018 0.132812 200.656V30.3438C0.132812 20.6432 2.60677 13.2865 7.55469 8.27344C12.5026 3.26042 19.7943 0.753906 29.4297 0.753906H107.066C116.702 0.753906 123.993 3.26042 128.941 8.27344C133.889 13.2865 136.363 20.6432 136.363 30.3438V200.656C136.363 205.018 135.224 208.436 132.945 210.91C130.732 213.449 127.704 214.719 123.863 214.719C121.194 214.719 118.753 213.905 116.539 212.277C114.326 210.715 111.103 207.883 106.871 203.781L69.0781 166.477C68.5573 165.891 68.0039 165.891 67.418 166.477L29.7227 203.781C25.4909 207.883 22.2357 210.715 19.957 212.277C17.7435 213.905 15.3346 214.719 12.7305 214.719ZM22.0078 182.883L61.8516 144.211C63.9349 142.258 66.0833 141.281 68.2969 141.281C70.5104 141.281 72.6263 142.258 74.6445 144.211L114.586 182.883C115.237 183.534 115.855 183.762 116.441 183.566C117.092 183.436 117.418 182.883 117.418 181.906V31.418C117.418 27.4466 116.409 24.5169 114.391 22.6289C112.438 20.6758 109.508 19.6992 105.602 19.6992H30.9922C27.0208 19.6992 24.026 20.6758 22.0078 22.6289C20.0547 24.5169 19.0781 27.4466 19.0781 31.418V181.906C19.0781 182.883 19.3711 183.436 19.957 183.566C20.6081 183.762 21.2917 183.534 22.0078 182.883Z" fill="currentColor"/>'}},ns={last:xt.oldest,range:{vb:"0 0 124 114",icon:'<path fill="currentColor" d="M19.4379 113.966C12.9586 113.966 8.08881 112.356 4.82852 109.137C1.6095 105.959 -5.99399e-06 101.172 -5.99399e-06 94.7753V19.1902C-5.99399e-06 12.7934 1.6095 8.00616 4.82852 4.82841C8.08881 1.60939 12.9586 -0.000117246 19.4379 -0.000117246H103.999C110.478 -0.000117246 115.328 1.60939 118.547 4.82841C121.766 8.00616 123.375 12.7934 123.375 19.1902V94.7753C123.375 101.172 121.766 105.959 118.547 109.137C115.328 112.356 110.478 113.966 103.999 113.966H19.4379ZM18.5094 103.999H104.804C107.569 103.999 109.694 103.256 111.18 101.77C112.666 100.326 113.409 98.18 113.409 95.3324V36.9567C113.409 34.1091 112.666 31.9631 111.18 30.5187C109.694 29.033 107.569 28.2901 104.804 28.2901H18.5094C15.7856 28.2901 13.6808 29.033 12.1951 30.5187C10.7094 31.9631 9.96657 34.1091 9.96657 36.9567V95.3324C9.96657 98.18 10.7094 100.326 12.1951 101.77C13.6808 103.256 15.7856 103.999 18.5094 103.999ZM49.6472 50.5756C48.5742 50.5756 47.8107 50.3693 47.3567 49.9566C46.944 49.5439 46.7377 48.801 46.7377 47.728V44.0757C46.7377 43.0027 46.944 42.2805 47.3567 41.909C47.8107 41.4963 48.5742 41.29 49.6472 41.29H53.2995C54.3725 41.29 55.1154 41.4963 55.5281 41.909C55.982 42.2805 56.209 43.0027 56.209 44.0757V47.728C56.209 48.801 55.982 49.5439 55.5281 49.9566C55.1154 50.3693 54.3725 50.5756 53.2995 50.5756H49.6472ZM70.1994 50.5756C69.1264 50.5756 68.3835 50.3693 67.9708 49.9566C67.5581 49.5439 67.3518 48.801 67.3518 47.728V44.0757C67.3518 43.0027 67.5581 42.2805 67.9708 41.909C68.3835 41.4963 69.1264 41.29 70.1994 41.29H73.8517C74.966 41.29 75.7295 41.4963 76.1422 41.909C76.5549 42.2805 76.7612 43.0027 76.7612 44.0757V47.728C76.7612 48.801 76.5549 49.5439 76.1422 49.9566C75.7295 50.3693 74.966 50.5756 73.8517 50.5756H70.1994ZM90.8135 50.5756C89.6992 50.5756 88.9357 50.3693 88.523 49.9566C88.1103 49.5439 87.904 48.801 87.904 47.728V44.0757C87.904 43.0027 88.1103 42.2805 88.523 41.909C88.9357 41.4963 89.6992 41.29 90.8135 41.29H94.4039C95.5182 41.29 96.2817 41.4963 96.6944 41.909C97.1071 42.2805 97.3134 43.0027 97.3134 44.0757V47.728C97.3134 48.801 97.1071 49.5439 96.6944 49.9566C96.2817 50.3693 95.5182 50.5756 94.4039 50.5756H90.8135ZM29.095 70.8183C27.9807 70.8183 27.2172 70.612 26.8045 70.1993C26.3918 69.7866 26.1855 69.0437 26.1855 67.9707V64.3803C26.1855 63.266 26.3918 62.5232 26.8045 62.1517C27.2172 61.739 27.9807 61.5327 29.095 61.5327H32.7473C33.8203 61.5327 34.5632 61.739 34.9759 62.1517C35.3886 62.5232 35.5949 63.266 35.5949 64.3803V67.9707C35.5949 69.0437 35.3886 69.7866 34.9759 70.1993C34.5632 70.612 33.8203 70.8183 32.7473 70.8183H29.095ZM49.6472 70.8183C48.5742 70.8183 47.8107 70.612 47.3567 70.1993C46.944 69.7866 46.7377 69.0437 46.7377 67.9707V64.3803C46.7377 63.266 46.944 62.5232 47.3567 62.1517C47.8107 61.739 48.5742 61.5327 49.6472 61.5327H53.2995C54.3725 61.5327 55.1154 61.739 55.5281 62.1517C55.982 62.5232 56.209 63.266 56.209 64.3803V67.9707C56.209 69.0437 55.982 69.7866 55.5281 70.1993C55.1154 70.612 54.3725 70.8183 53.2995 70.8183H49.6472ZM70.1994 70.8183C69.1264 70.8183 68.3835 70.612 67.9708 70.1993C67.5581 69.7866 67.3518 69.0437 67.3518 67.9707V64.3803C67.3518 63.266 67.5581 62.5232 67.9708 62.1517C68.3835 61.739 69.1264 61.5327 70.1994 61.5327H73.8517C74.966 61.5327 75.7295 61.739 76.1422 62.1517C76.5549 62.5232 76.7612 63.266 76.7612 64.3803V67.9707C76.7612 69.0437 76.5549 69.7866 76.1422 70.1993C75.7295 70.612 74.966 70.8183 73.8517 70.8183H70.1994ZM90.8135 70.8183C89.6992 70.8183 88.9357 70.612 88.523 70.1993C88.1103 69.7866 87.904 69.0437 87.904 67.9707V64.3803C87.904 63.266 88.1103 62.5232 88.523 62.1517C88.9357 61.739 89.6992 61.5327 90.8135 61.5327H94.4039C95.5182 61.5327 96.2817 61.739 96.6944 62.1517C97.1071 62.5232 97.3134 63.266 97.3134 64.3803V67.9707C97.3134 69.0437 97.1071 69.7866 96.6944 70.1993C96.2817 70.612 95.5182 70.8183 94.4039 70.8183H90.8135ZM29.095 91.061C27.9807 91.061 27.2172 90.8753 26.8045 90.5039C26.3918 90.0912 26.1855 89.3277 26.1855 88.2134V84.623C26.1855 83.5087 26.3918 82.7658 26.8045 82.3944C27.2172 81.9817 27.9807 81.7754 29.095 81.7754H32.7473C33.8203 81.7754 34.5632 81.9817 34.9759 82.3944C35.3886 82.7658 35.5949 83.5087 35.5949 84.623V88.2134C35.5949 89.3277 35.3886 90.0912 34.9759 90.5039C34.5632 90.8753 33.8203 91.061 32.7473 91.061H29.095ZM49.6472 91.061C48.5742 91.061 47.8107 90.8753 47.3567 90.5039C46.944 90.0912 46.7377 89.3277 46.7377 88.2134V84.623C46.7377 83.5087 46.944 82.7658 47.3567 82.3944C47.8107 81.9817 48.5742 81.7754 49.6472 81.7754H53.2995C54.3725 81.7754 55.1154 81.9817 55.5281 82.3944C55.982 82.7658 56.209 83.5087 56.209 84.623V88.2134C56.209 89.3277 55.982 90.0912 55.5281 90.5039C55.1154 90.8753 54.3725 91.061 53.2995 91.061H49.6472ZM70.1994 91.061C69.1264 91.061 68.3835 90.8753 67.9708 90.5039C67.5581 90.0912 67.3518 89.3277 67.3518 88.2134V84.623C67.3518 83.5087 67.5581 82.7658 67.9708 82.3944C68.3835 81.9817 69.1264 81.7754 70.1994 81.7754H73.8517C74.966 81.7754 75.7295 81.9817 76.1422 82.3944C76.5549 82.7658 76.7612 83.5087 76.7612 84.623V88.2134C76.7612 89.3277 76.5549 90.0912 76.1422 90.5039C75.7295 90.8753 74.966 91.061 73.8517 91.061H70.1994Z"/>'}},ni={last:_s.oldest,range:{vb:"0 0 13 12",icon:'<path fill="currentColor" d="M2.17091 11.7576C1.46988 11.7576 0.932832 11.5711 0.559769 11.198C0.186706 10.829 0.000174721 10.2961 0.000174733 9.59917L0.000174857 2.15841C0.000174868 1.46148 0.186706 0.928535 0.559769 0.559572C0.932832 0.186509 1.46988 -2.19189e-05 2.17091 -2.19072e-05L10.7432 -2.17645e-05C11.4442 -2.17528e-05 11.9792 0.18651 12.3481 0.559572C12.7212 0.928536 12.9077 1.46148 12.9077 2.15841L12.9077 9.59917C12.9077 10.2961 12.7212 10.829 12.3481 11.198C11.9792 11.5711 11.4442 11.7576 10.7432 11.7576L2.17091 11.7576ZM2.28775 10.1711L10.6202 10.1711C10.8497 10.1711 11.024 10.1137 11.1429 9.99888C11.2618 9.88409 11.3212 9.70576 11.3212 9.46388L11.3212 3.99093C11.3212 3.75315 11.2618 3.57687 11.1429 3.46208C11.024 3.34729 10.8497 3.2899 10.6202 3.2899L2.28775 3.2899C2.05817 3.2899 1.88394 3.34729 1.76505 3.46208C1.64616 3.57687 1.58672 3.75315 1.58672 3.99093L1.58672 9.46388C1.58672 9.70576 1.64616 9.88409 1.76505 9.99888C1.88394 10.1137 2.05817 10.1711 2.28775 10.1711ZM5.3071 5.28845C5.19231 5.28845 5.11237 5.2659 5.06727 5.22081C5.02217 5.17571 4.99963 5.09782 4.99963 4.98713L4.99963 4.62432C4.99963 4.51363 5.02217 4.43779 5.06727 4.39679C5.11237 4.35169 5.19231 4.32915 5.3071 4.32915L5.66376 4.32915C5.77855 4.32915 5.85849 4.35169 5.90359 4.39679C5.94868 4.43779 5.97123 4.51363 5.97123 4.62432L5.97123 4.98713C5.97123 5.09782 5.94868 5.17571 5.90359 5.22081C5.85849 5.2659 5.77855 5.28845 5.66376 5.28845L5.3071 5.28845ZM7.25645 5.28845C7.14576 5.28845 7.06787 5.2659 7.02277 5.22081C6.97768 5.17571 6.95513 5.09782 6.95513 4.98713L6.95513 4.62432C6.95513 4.51363 6.97768 4.43779 7.02277 4.39679C7.06787 4.35169 7.14576 4.32915 7.25645 4.32915L7.61927 4.32915C7.73405 4.32915 7.814 4.35169 7.85909 4.39679C7.90419 4.43779 7.92673 4.51363 7.92673 4.62432L7.92673 4.98713C7.92673 5.09782 7.90419 5.17571 7.85909 5.22081C7.814 5.2659 7.73405 5.28845 7.61927 5.28845L7.25645 5.28845ZM9.21196 5.28845C9.10127 5.28845 9.02338 5.2659 8.97828 5.22081C8.93318 5.17571 8.91064 5.09782 8.91064 4.98713L8.91064 4.62432C8.91064 4.51363 8.93318 4.43779 8.97828 4.39679C9.02338 4.35169 9.10127 4.32915 9.21196 4.32915L9.57477 4.32915C9.68956 4.32915 9.7695 4.35169 9.8146 4.39679C9.85969 4.43779 9.88224 4.51363 9.88224 4.62432L9.88224 4.98713C9.88224 5.09782 9.85969 5.17571 9.8146 5.22081C9.7695 5.2659 9.68956 5.28845 9.57477 5.28845L9.21196 5.28845ZM3.35159 7.20706C3.2368 7.20706 3.15686 7.18656 3.11176 7.14557C3.06667 7.10047 3.04412 7.02258 3.04412 6.91189L3.04412 6.54908C3.04412 6.43839 3.06667 6.36254 3.11176 6.32155C3.15686 6.27645 3.2368 6.2539 3.35159 6.2539L3.7144 6.2539C3.82509 6.2539 3.90299 6.27645 3.94808 6.32155C3.99318 6.36254 4.01572 6.43839 4.01572 6.54908L4.01572 6.91189C4.01572 7.02258 3.99318 7.10047 3.94808 7.14557C3.90299 7.18656 3.82509 7.20706 3.7144 7.20706L3.35159 7.20706ZM5.3071 7.20706C5.19231 7.20706 5.11237 7.18656 5.06727 7.14557C5.02217 7.10047 4.99963 7.02258 4.99963 6.91189L4.99963 6.54908C4.99963 6.43839 5.02217 6.36254 5.06727 6.32155C5.11237 6.27645 5.19231 6.2539 5.3071 6.2539L5.66376 6.2539C5.77855 6.2539 5.85849 6.27645 5.90359 6.32155C5.94868 6.36254 5.97123 6.43839 5.97123 6.54908L5.97123 6.91189C5.97123 7.02258 5.94868 7.10047 5.90359 7.14557C5.85849 7.18656 5.77855 7.20706 5.66376 7.20706L5.3071 7.20706ZM7.25645 7.20706C7.14576 7.20706 7.06787 7.18656 7.02277 7.14557C6.97768 7.10047 6.95513 7.02258 6.95513 6.91189L6.95513 6.54908C6.95513 6.43839 6.97768 6.36254 7.02277 6.32155C7.06787 6.27645 7.14576 6.2539 7.25645 6.2539L7.61927 6.2539C7.73405 6.2539 7.814 6.27645 7.85909 6.32155C7.90419 6.36254 7.92673 6.43839 7.92673 6.54908L7.92673 6.91189C7.92673 7.02258 7.90419 7.10047 7.85909 7.14557C7.814 7.18656 7.73405 7.20706 7.61927 7.20706L7.25645 7.20706ZM9.21196 7.20706C9.10127 7.20706 9.02338 7.18656 8.97828 7.14557C8.93318 7.10047 8.91064 7.02258 8.91064 6.91189L8.91064 6.54908C8.91064 6.43839 8.93318 6.36254 8.97828 6.32155C9.02338 6.27645 9.10127 6.2539 9.21196 6.2539L9.57477 6.2539C9.68956 6.2539 9.7695 6.27645 9.8146 6.32155C9.85969 6.36254 9.88224 6.43839 9.88224 6.54908L9.88224 6.91189C9.88224 7.02258 9.85969 7.10047 9.8146 7.14557C9.7695 7.18656 9.68956 7.20706 9.57477 7.20706L9.21196 7.20706ZM3.35159 9.13182C3.2368 9.13182 3.15686 9.11132 3.11176 9.07032C3.06667 9.02523 3.04412 8.94529 3.04412 8.8305L3.04412 8.47383C3.04412 8.35904 3.06667 8.28115 3.11176 8.24016C3.15686 8.19916 3.2368 8.17866 3.35159 8.17866L3.7144 8.17866C3.82509 8.17866 3.90299 8.19916 3.94808 8.24016C3.99318 8.28115 4.01572 8.35904 4.01572 8.47383L4.01572 8.8305C4.01572 8.94529 3.99318 9.02523 3.94808 9.07032C3.90299 9.11132 3.82509 9.13182 3.7144 9.13182L3.35159 9.13182ZM5.3071 9.13182C5.19231 9.13182 5.11237 9.11132 5.06727 9.07032C5.02217 9.02523 4.99963 8.94529 4.99963 8.8305L4.99963 8.47383C4.99963 8.35904 5.02217 8.28115 5.06727 8.24016C5.11237 8.19916 5.19231 8.17866 5.3071 8.17866L5.66376 8.17866C5.77855 8.17866 5.85849 8.19916 5.90359 8.24016C5.94868 8.28115 5.97123 8.35904 5.97123 8.47383L5.97123 8.8305C5.97123 8.94529 5.94868 9.02523 5.90359 9.07032C5.85849 9.11132 5.77855 9.13182 5.66376 9.13182L5.3071 9.13182ZM7.25645 9.13182C7.14576 9.13182 7.06787 9.11132 7.02277 9.07032C6.97768 9.02523 6.95513 8.94529 6.95513 8.8305L6.95513 8.47383C6.95513 8.35904 6.97768 8.28115 7.02277 8.24016C7.06787 8.19916 7.14576 8.17866 7.25645 8.17866L7.61927 8.17866C7.73405 8.17866 7.814 8.19916 7.85909 8.24016C7.90419 8.28115 7.92673 8.35904 7.92673 8.47383L7.92673 8.8305C7.92673 8.94529 7.90419 9.02523 7.85909 9.07032C7.814 9.11132 7.73405 9.13182 7.61927 9.13182L7.25645 9.13182Z"/>'}},Ot={1:{vb:"0 0 147 116",icon:'<path fill="currentColor" d="M140.213 91.9896C140.461 97.9737 139.057 102.534 136.004 105.67C132.95 108.807 128.307 110.375 122.075 110.375H21.7902C16.6315 110.375 12.7316 108.91 10.0903 105.98C7.44908 103.05 6.04592 98.7165 5.88084 92.9801L29.2187 72.0564C30.4981 70.8596 31.7774 69.993 33.0568 69.4565C34.3774 68.8787 35.7599 68.5898 37.2044 68.5898C38.6488 68.5898 40.0726 68.8993 41.4758 69.5184C42.9202 70.0961 44.2821 70.9628 45.5615 72.1183L57.0137 82.4564L84.9325 57.447C86.377 56.209 87.8627 55.2804 89.3896 54.6614C90.9166 54.0423 92.5261 53.7328 94.2182 53.7328C95.869 53.7328 97.4785 54.0629 99.0467 54.7233C100.656 55.3423 102.142 56.2915 103.504 57.5709L140.213 91.9896ZM47.9757 58.9327C45.2519 58.9327 42.7551 58.2724 40.4853 56.9518C38.2568 55.6312 36.4615 53.836 35.0996 51.5661C33.779 49.2963 33.1187 46.7995 33.1187 44.0757C33.1187 41.3932 33.779 38.917 35.0996 36.6472C36.4615 34.3774 38.2568 32.5822 40.4853 31.2616C42.7551 29.8997 45.2519 29.2187 47.9757 29.2187C50.6995 29.2187 53.1757 29.8997 55.4042 31.2616C57.6328 32.5822 59.4074 34.3774 60.728 36.6472C62.0899 38.917 62.7708 41.3932 62.7708 44.0757C62.7708 46.7995 62.0899 49.2963 60.728 51.5661C59.4074 53.836 57.6328 55.6312 55.4042 56.9518C53.1757 58.2724 50.6995 58.9327 47.9757 58.9327ZM20.3045 115.575C13.6189 115.575 8.56336 113.883 5.13799 110.499C1.71262 107.115 -5.93998e-05 102.121 -5.93998e-05 95.5181V20.1188C-5.93998e-05 13.5157 1.71262 8.52207 5.13799 5.13797C8.56336 1.71261 13.6189 -7.71843e-05 20.3045 -7.71843e-05H126.285C133.011 -7.71843e-05 138.088 1.71261 141.513 5.13797C144.938 8.52207 146.651 13.5157 146.651 20.1188V95.5181C146.651 102.121 144.938 107.115 141.513 110.499C138.088 113.883 133.011 115.575 126.285 115.575H20.3045ZM21.0474 103.442H125.604C128.451 103.442 130.638 102.699 132.165 101.213C133.692 99.6864 134.456 97.4372 134.456 94.4658V21.1712C134.456 18.1998 133.692 15.9712 132.165 14.4855C130.638 12.9585 128.451 12.1951 125.604 12.1951H21.0474C18.1585 12.1951 15.9506 12.9585 14.4236 14.4855C12.9379 15.9712 12.1951 18.1998 12.1951 21.1712V94.4658C12.1951 97.4372 12.9379 99.6864 14.4236 101.213C15.9506 102.699 18.1585 103.442 21.0474 103.442Z"/>'},2:{vb:"0 0 96 108",icon:'<path fill="currentColor" d="M-7.84732e-05 97.499V10.0903C-7.84732e-05 6.6649 0.866581 4.12683 2.5999 2.47605C4.33322 0.825269 6.39669 -0.000120815 8.79032 -0.000120815C10.9363 -0.000120815 13.0823 0.598287 15.2284 1.7951L88.3373 44.509C90.9785 46.036 92.8769 47.4804 94.0324 48.8423C95.2293 50.2042 95.8277 51.855 95.8277 53.7947C95.8277 55.693 95.2293 57.3438 94.0324 58.747C92.8769 60.1089 90.9785 61.5533 88.3373 63.0803L15.2284 105.794C13.0823 106.991 10.9363 107.589 8.79032 107.589C6.39669 107.589 4.33322 106.743 2.5999 105.051C0.866581 103.401 -7.84732e-05 100.883 -7.84732e-05 97.499ZM12.1951 91.1848C12.1951 91.7626 12.4014 92.1753 12.8141 92.4229C13.2681 92.6705 13.7633 92.6292 14.2998 92.2991L78.4945 54.9089C78.9897 54.62 79.2373 54.2486 79.2373 53.7947C79.2373 53.2581 78.9897 52.8867 78.4945 52.6804L14.2998 15.2902C13.7633 14.9601 13.2681 14.9188 12.8141 15.1664C12.4014 15.414 12.1951 15.8267 12.1951 16.4045V91.1848Z"/>'},8:{vb:"0 0 135 133",icon:'<path fill="currentColor" d="M20.3044 103.318C13.6188 103.318 8.56324 101.626 5.13788 98.2421C1.71251 94.858 -0.000173841 89.8438 -0.000173841 83.1994V20.119C-0.000173841 13.4746 1.71251 8.46035 5.13788 5.07625C8.56324 1.69216 13.6188 0.000108447 20.3044 0.000108447H83.0134C89.699 0.000108447 94.7546 1.71279 98.1799 5.13816C101.605 8.52226 103.318 13.5159 103.318 20.119V34.6665H91.1228V21.1714C91.1228 18.1587 90.3594 15.9095 88.8324 14.4238C87.3054 12.8968 85.1181 12.1333 82.2705 12.1333H21.0473C18.1584 12.1333 15.9505 12.8968 14.4235 14.4238C12.9378 15.9095 12.195 18.1587 12.195 21.1714V82.147C12.195 85.1597 12.9378 87.4295 14.4235 88.9565C15.9505 90.4422 18.1584 91.185 21.0473 91.185H36.8328V103.318H20.3044ZM51.1327 132.785C44.4471 132.785 39.3915 131.093 35.9662 127.709C32.5408 124.324 30.8281 119.31 30.8281 112.666V49.5235C30.8281 42.9204 32.5408 37.9268 35.9662 34.5427C39.3915 31.1173 44.4471 29.4046 51.1327 29.4046H113.842C120.527 29.4046 125.583 31.1173 129.008 34.5427C132.434 37.968 134.146 42.9616 134.146 49.5235V112.666C134.146 119.269 132.434 124.263 129.008 127.647C125.583 131.072 120.527 132.785 113.842 132.785H51.1327ZM51.8756 120.651H113.099C115.946 120.651 118.134 119.888 119.661 118.361C121.188 116.875 121.951 114.626 121.951 111.613V50.6378C121.951 47.6251 121.188 45.3759 119.661 43.8902C118.134 42.3632 115.946 41.5997 113.099 41.5997H51.8756C48.9867 41.5997 46.7788 42.3632 45.2518 43.8902C43.7248 45.3759 42.9614 47.6251 42.9614 50.6378V111.613C42.9614 114.626 43.7248 116.875 45.2518 118.361C46.7788 119.888 48.9867 120.651 51.8756 120.651Z"/>'}};Ot[101]=Ot[1];Ot[102]=Ot[2];{let e=at[1];at.push({t:101,label:"Photos",vb:at[0].vb,icon:at[0].icon},{t:102,label:"Videos",vb:e.vb,icon:e.icon})}var me=null,Jo=0,ss=null,oo=!1,D={metric:"views",v_min:null,v_max:null,l_min:null,l_max:null,c_min:null,c_max:null,o_min:null,o_max:null,sh_min:null,sh_max:null,sv_min:null,sv_max:null,p_num:"",p_unit:"Months",postedMode:"last",d_start:null,d_end:null},Ft=null,he=null,Te=null,an=[];function Qo(){D.metric="views",D.v_min=null,D.v_max=null,D.l_min=null,D.l_max=null,D.c_min=null,D.c_max=null,D.o_min=null,D.o_max=null,D.sh_min=null,D.sh_max=null,D.sv_min=null,D.sv_max=null,D.p_num="",D.p_unit="Months",D.postedMode="last",D.d_start=null,D.d_end=null,ke=null}function er(){if(document.getElementById("sf-reels-modal-style"))return;let e=document.createElement("style");e.id="sf-reels-modal-style",e.textContent=`
    /* ============ Sort-by popover (THEME-AWARE via vars on the chip) ============ */
    #sf-filters-row .sf-sort-chip.sf-open{ border-color:var(--sf-ff-accent-border); box-shadow:0 0 0 3px rgba(127,127,127,0.15); }
    .sf-sort-pop{ position:absolute; top:calc(100% + 8px); left:0; z-index:2147483646; min-width:206px; padding:6px;
      border-radius:12px; background:var(--sf-pop-bg); border:1px solid var(--sf-pop-border); box-shadow:var(--sf-pop-shadow);
      opacity:0; transform:translateY(-6px) scale(.985); pointer-events:none; transform-origin:top left;
      transition:opacity .14s ease, transform .15s cubic-bezier(.2,.8,.3,1);
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased; }
    .sf-sort-chip.sf-open .sf-sort-pop{ opacity:1; transform:none; pointer-events:auto; }
    .sf-sort-pop h4{ margin:4px 8px 6px; font-size:11px; font-weight:500; color:var(--sf-pop-muted); letter-spacing:.02em; }
    .sf-sort-opt{ display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; font-size:13px; font-weight:500;
      color:var(--sf-pop-text); cursor:pointer; }
    .sf-sort-opt:hover{ background:var(--sf-pop-hover); }
    .sf-sort-opt.sf-sel{ font-weight:600; background:var(--sf-pop-sel); }

    /* ---- Popup glyph sizing ----
       These used to sit in one 12x12 box. The popup does something more
       considered: it sizes each drawing on its own and pays the difference
       back in margin, so the labels still line up.

         Likes / Comments / Oldest  11px wide + 10px margin  = text at 21px
         Views                       9px wide + 12px margin  = text at 21px
         Outlier                    11x14 slot + 10px margin = text at 21px

       Views is smaller on purpose: a SOLID triangle carries more visual mass
       than a hollow heart or bubble, so drawing it at the same size makes it
       shout. Its 2px of give-back is SPLIT, one each side, so the narrower glyph
       still centres on the same axis as the 11px ones \u2014 hand the whole 2px to
       margin-right and the text lands correctly but the triangle sits a pixel
       left of every other icon, which at 9px is an 11% offset and reads as a
       misalignment. (The popup has that flush-left quirk; this does not.) The square box loses that, and worse, inverts it \u2014 with the default
       preserveAspectRatio the limiting dimension flips per glyph, so the tall
       triangle fills the full 12px height while the wide heart and bubble come
       out shorter. Views ends up the LARGEST glyph in a menu where the popup
       makes it the smallest.

       So mirror the popup instead of just shrinking everything: width-driven
       with height:auto, one exception for Views, and one for the bolt (tall and
       narrow \u2014 width-driven it would render ~18px tall, so it is height-driven
       into the same 11px-wide slot). The row's gap:10px plus the 2px give-back
       on Views reproduces the popup's constant 21px text start. Colour, opacity
       and fill are inherited from the rule above and deliberately untouched.

       Sizes are the popup's verbatim. Its rows are <button>s that never set a
       font-size, so they sit at Chrome's UA 13.333px against this menu's 13px \u2014
       a 2.5% gap that makes these glyphs a hair larger in ratio terms than the
       popup's, which is well inside the noise. */
    .sf-sort-opt .sf-sopt-ic{ width:11px; height:auto; flex-shrink:0; fill:currentColor; opacity:.55; }
    /* The two 9px glyphs, for different reasons that land on the same number.
       Views is a SOLID triangle carrying more mass than the hollow marks, so it
       is cut back to stop it shouting. Saves is the popup's medium bookmark, a
       137x215 drawing \u2014 width-driven at 11px it renders 17px tall and towers over
       a 13px row; at 9px it lands at 14.1px, the same height the bolt is pinned
       to. Both split their 2px give-back one per side so the narrower glyph still
       centres on the shared axis. */
    .sf-sort-opt[data-k="views"] .sf-sopt-ic,
    .sf-sort-opt[data-k="saves"] .sf-sopt-ic{ width:9px; margin:0 1px; }
    .sf-sort-opt[data-k="outlier"] .sf-sopt-ic{ height:14px; }

    /* ==== Filters modal \u2014 light-first; see the .sf-dark block at the end ==== */
    #sf-filters-overlay{ position:fixed; inset:0; z-index:2147483647; display:flex; align-items:center; justify-content:center; padding:24px;
      background:rgba(15,15,15,.34); opacity:0; visibility:hidden; transition:opacity .24s ease, visibility 0s linear .28s;
      font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased; color:#191919; }
    #sf-filters-overlay.sf-open{ opacity:1; visibility:visible; transition:opacity .24s ease, visibility 0s; }
    #sf-filters-overlay *{ box-sizing:border-box; }
    #sf-filters-overlay button{ outline:none; }
    .sf-modal{ width:520px; max-width:100%; max-height:88vh; background:#fff; border-radius:18px;
      box-shadow:0 12px 28px rgba(15,15,15,.16),0 32px 64px rgba(15,15,15,.20); display:flex; flex-direction:column;
      transform:translateY(40px); opacity:0; transition:transform .28s cubic-bezier(.2,.8,.2,1), opacity .22s ease; }
    #sf-filters-overlay.sf-open .sf-modal{ transform:none; opacity:1; }
    .sf-mhead{ position:relative; display:flex; align-items:center; justify-content:center; padding:18px 20px; border-bottom:1px solid #e9e9e7; }
    .sf-mhead h3{ margin:0; font-size:15px; font-weight:600; color:#191919; }
    .sf-mclose{ position:absolute; right:14px; top:50%; transform:translateY(-50%); width:32px; height:32px; border-radius:50%; border:none;
      background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#6b6b6b; }
    .sf-mclose:hover{ background:#f1f1ef; }
    .sf-mclose svg{ width:16px; height:16px; stroke:currentColor; fill:none; }
    /* Body scrolls inside a relative wrapper so the scroll-fade can pin to its
       bottom edge (just above the footer). */
    .sf-mbody-wrap{ position:relative; flex:1 1 auto; min-height:0; display:flex; flex-direction:column; }
    .sf-mbody{ flex:1 1 auto; min-height:0; padding:6px 24px 8px; overflow-y:auto; }
    /* Airbnb-style "more below" affordance: content fades to white above the
       footer while scrollable & not at the bottom (set via #sf-mscroll-fade.sf-show). */
    .sf-mscroll-fade{ position:absolute; left:0; right:0; bottom:0; height:46px; pointer-events:none; z-index:2;
      background:linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 58%, #fff 100%);
      opacity:0; transition:opacity .22s ease; }
    .sf-mscroll-fade.sf-show{ opacity:1; }
    .sf-fgroup{ padding:22px 0; border-bottom:1px solid #e9e9e7; }
    .sf-fgroup:last-child{ border-bottom:none; }
    .sf-fgroup > label{ display:block; font-size:12px; font-weight:500; color:#9a9a97; letter-spacing:0.03em; margin-bottom:13px; }

    .sf-modetoggle{ display:inline-flex; background:#f1f1ef; border-radius:9px; padding:3px; gap:2px; }
    .sf-modetoggle .sf-mt{ position:relative; display:inline-flex; align-items:center; justify-content:center; border:none; background:transparent;
      border-radius:7px; height:30px; padding:0 13px; font-size:13px; font-weight:500; color:#6b6b6b; cursor:pointer; font-family:inherit;
      transition:background .14s,color .14s,box-shadow .14s; }
    .sf-modetoggle .sf-mt:hover{ color:#191919; }
    .sf-modetoggle .sf-mt.sf-sel{ background:#fff; color:#191919; box-shadow:0 1px 2px rgba(0,0,0,.10); }
    .sf-modetoggle .sf-mt .sf-mtdot{ position:absolute; top:6px; right:7px; width:5px; height:5px; border-radius:50%; background:#e8b71d;
      opacity:0; transform:scale(.4); transition:opacity .14s, transform .16s cubic-bezier(.34,1.56,.64,1); }
    .sf-modetoggle .sf-mt.sf-has:not(.sf-sel) .sf-mtdot{ opacity:1; transform:scale(1); }
    /* Toggle glyphs left of the label \u2014 metric icons on Performance, clock /
       calendar on Posted.

       COLOUR: selected holds at the same .55 the Sort-by popover uses. It used to
       climb to .85, which took the glyph almost to the label's near-black
       (~#3c3c3c against #191919) so icon and text read as one weight and the play
       mark started looking like a marker. At .55 (~#808080) it stays a quiet
       marker while the pill and label say which option is on.

       SIZE: the same width-driven system the popover uses, for the same reasons \u2014
       see the .sf-sopt-ic block above for the full note. 11px base, Views cut to
       9px (and Saves with it \u2014 see the popover block for why the two share a
       number) with the 2px split one per side, so neither drifts off the shared
       centre line, and the tall-narrow outlier bolt pinned by height so a
       width-driven rule cannot stretch it past the row.
       Labels here are 13px, the same as the popover's, so its figures port
       unchanged. */
    .sf-modetoggle .sf-mt{ gap:6px; }
    .sf-modetoggle .sf-mt-ic{ display:block; width:11px; height:auto; fill:currentColor; opacity:.5; flex-shrink:0; }
    .sf-modetoggle .sf-mt.sf-sel .sf-mt-ic{ opacity:.55; }
    .sf-modetoggle .sf-mt[data-k="views"] .sf-mt-ic,
    .sf-modetoggle .sf-mt[data-k="saves"] .sf-mt-ic{ width:9px; margin:0 1px; }
    .sf-modetoggle .sf-mt[data-k="outlier"] .sf-mt-ic{ height:14px; }

    /* Type chips (Posts tab) \u2014 a row of standalone buttons, not a segmented
       control. It briefly was one \u2014 same track, same pills \u2014 but that
       construction says "pick one of these", and Type is a multi-select where
       zero picked is the normal opening state. A track full of flat pills reads
       as a control waiting to be answered; separate buttons read as options you
       may switch on, which is what they are.

       The palette matches the toggles above: the fill the pills used to get FROM
       the track is painted on each button, and selected keeps the raised white +
       hairline shadow. Only the container went away, so the Type row still speaks
       the same colour language as the toggles without borrowing their meaning. */
    .sf-typechips{ display:flex; flex-wrap:wrap; gap:8px; }
    .sf-typechip{ display:inline-flex; align-items:center; gap:6px; height:30px; padding:0 13px; border:none;
      border-radius:8px; background:#f1f1ef; color:#6b6b6b; cursor:pointer; font-family:inherit; box-shadow:none;
      transition:background .14s, color .14s, box-shadow .14s; }
    .sf-typechip:hover{ background:#e9e9e7; color:#191919; }
    /* Selected carries a 1px ring on top of the drop shadow. The pill in the
       toggles above gets the SAME paint \u2014 #fff plus the same shadow \u2014 and still
       reads as clearly picked, but only because it sits on a #f1f1ef track: the
       track is what draws its edge. Standing alone on the white modal there is
       nothing behind these buttons to do that job, so the identical styling came
       out undefined. The ring puts the missing edge back, in the same #dcdcd9 the
       Min/Max fields and the Months select use a few rows down.

       It is a box-shadow ring rather than a real border because everything in the
       overlay is border-box: a border that appears only when selected would eat
       1px of padding and nudge the label sideways on every click. */
    .sf-typechip.sf-sel,
    .sf-typechip.sf-sel:hover{
      background:#fff; color:#191919; box-shadow:0 0 0 1px #dcdcd9, 0 1px 2px rgba(0,0,0,.10); }
    /* Type glyphs size by HEIGHT, not width \u2014 the one place the width-driven rule
       used on the toggles above is wrong. These are pictographs with knocked-out
       interiors, not line marks, and the widest of them (Photos, 1.27:1) came out
       only 8.7px tall at 11px wide: the cutouts closed up and it read as a solid
       blob clipped along the bottom. A shared 11px height keeps every interior
       open and lands them at a consistent optical size. No Views-style exception
       either \u2014 the video mark is a hollow triangle, so it carries no more mass
       than the frame or the stack. Selected holds at the toggles' .55. */
    .sf-typechip .sf-tc-ic{ display:block; height:11px; width:auto; fill:currentColor; opacity:.5; }
    .sf-typechip.sf-sel .sf-tc-ic{ opacity:.55; }
    .sf-typechip .sf-tc-label{ font-size:13px; font-weight:500; }

    /* Clear all only exists while there is something to clear. It was always
       visible and inert most of the time \u2014 a control that does nothing when you
       press it teaches people not to trust the row.

       Hidden with opacity + pointer-events rather than display:none on purpose:
       the footer is justify-content:space-between, so removing the element from
       flow would slide the Show button across the footer every time the first
       filter is set. This way the layout never moves and only the ink does.

       The 2px rise is what keeps it from reading as a flicker \u2014 appearing purely
       by opacity looks like a rendering glitch, while the same fade with a small
       upward settle reads as deliberate. */
    #sf-filters-overlay .sf-mfoot .sf-clearall{
      opacity:0; transform:translateY(2px); pointer-events:none;
      transition:opacity .18s ease, transform .18s cubic-bezier(.2,.8,.3,1); }
    #sf-filters-overlay .sf-mfoot .sf-clearall.sf-on{
      opacity:1; transform:none; pointer-events:auto; }

    .sf-dist{ position:relative; height:76px; margin:14px 0 16px; }
    .sf-dist-hist{ position:absolute; left:0; right:0; top:0; height:62px; }
    .sf-dist-curve{ position:absolute; inset:0; width:100%; height:100%; display:block; overflow:visible; }
    .sf-dist-area-bg{ fill:#f1f1f1; }                 /* unselected density \u2014 silver */
    .sf-dist-area-hl{ fill:#fce694; }                 /* selected density \u2014 yellow */
    .sf-dist-rail{ position:absolute; left:0; right:0; top:62px; height:3px; background:#e4e4e4; border-radius:2px; } /* x-axis base \u2014 silver */
    .sf-dist-fill{ position:absolute; top:62px; height:3px; background:#f3cb44; border-radius:2px; } /* x-axis \u2014 yellow */
    .sf-dist-handle{ position:absolute; top:62px; width:24px; height:24px; transform:translate(-50%,-50%); background:#fff; border:1.5px solid #dcdcd9;
      border-radius:50%; box-shadow:0 1px 4px rgba(0,0,0,.2); cursor:grab; z-index:3; transition:box-shadow .12s; }
    .sf-dist-handle:hover{ box-shadow:0 0 0 6px rgba(0,0,0,.06),0 1px 4px rgba(0,0,0,.2); }
    .sf-dist-handle.sf-drag{ box-shadow:0 0 0 8px rgba(0,0,0,.09),0 1px 4px rgba(0,0,0,.22); cursor:grabbing; }
    /* Degenerate metric (all-equal / single reel): slider is inert. */
    .sf-dist-disabled .sf-dist-handle{ pointer-events:none; opacity:.5; }
    .sf-dist-disabled .sf-dist-curve{ opacity:.6; }

    .sf-numrange{ display:flex; align-items:flex-end; gap:14px; }
    .sf-nf-wrap{ flex:1; display:flex; flex-direction:column; gap:6px; }
    .sf-nf-label{ font-size:11px; font-weight:500; color:#9a9a97; letter-spacing:.02em; padding-left:2px; }
    .sf-nf{ flex:0 0 auto; display:flex; align-items:center; border:1.6px solid #dcdcd9; border-radius:10px; padding:0 14px; height:40px; background:#fff;
      transition:border-color .12s, box-shadow .12s; }
    .sf-nf input{ border:none; outline:none; font-size:14px; width:100%; font-weight:600; color:#191919; font-family:inherit; background:transparent; }
    .sf-nf input::placeholder{ color:#9a9a97; font-weight:400; }
    .sf-nf.sf-filled{ border-color:#c4c4c1; }
    .sf-nf:focus-within{ border-color:#a8a8a4; box-shadow:0 0 0 3px rgba(0,0,0,.06); }
    .sf-dash{ color:#9a9a97; font-weight:700; font-size:16px; height:40px; display:flex; align-items:center; }
    @keyframes sf-metricIn{ from{ opacity:0; transform:translateY(5px);} to{ opacity:1; transform:none; } }
    .sf-metric-anim{ animation:sf-metricIn .22s cubic-bezier(.2,.8,.3,1); }

    .sf-postedrow{ display:flex; gap:14px; }
    .sf-postedrow .sf-nf{ flex:0 0 150px; height:40px; }
    .sf-selwrap{ position:relative; flex:1; }
    .sf-selwrap select{ -webkit-appearance:none; appearance:none; width:100%; height:40px; border:1.6px solid #dcdcd9; border-radius:10px;
      padding:0 40px 0 14px; font-size:14px; font-weight:500; color:#191919; background:#fff; cursor:pointer; font-family:inherit; }
    .sf-selwrap svg{ position:absolute; right:14px; top:50%; transform:translateY(-50%); width:18px; height:18px; color:#9a9a97; stroke:currentColor; fill:none; pointer-events:none; }

    .sf-datefield{ display:flex; align-items:center; gap:11px; width:100%; height:40px; border:1.6px solid #dcdcd9; border-radius:10px; padding:0 14px;
      background:#fff; font-size:14px; font-weight:500; color:#9a9a97; cursor:pointer; font-family:inherit; text-align:left;
      transition:border-color .12s, box-shadow .12s, color .12s; }
    .sf-datefield:hover{ background:#f1f1ef; }
    .sf-datefield .sf-dlabel{ flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .sf-datefield .sf-dchev{ width:16px; height:16px; color:#9a9a97; stroke:currentColor; fill:none; flex-shrink:0; transition:transform .15s; }
    .sf-datefield.sf-set{ color:#191919; }
    .sf-datefield.sf-open{ border-color:#a8a8a4; box-shadow:0 0 0 3px rgba(0,0,0,.06); }
    .sf-datefield.sf-open .sf-dchev{ transform:rotate(180deg); }

    .sf-calendar{ margin-top:10px; border:1px solid #dcdcd9; border-radius:12px; padding:14px 14px 12px; background:#fff;
      box-shadow:0 1px 2px rgba(15,15,15,.04),0 4px 12px rgba(15,15,15,.06); animation:sf-metricIn .15s cubic-bezier(.2,.8,.3,1); }
    .sf-calhead{ display:flex; align-items:center; justify-content:space-between; padding:0 2px 10px; }
    .sf-cmonth{ font-size:15px; font-weight:700; color:#191919; }
    .sf-calnav{ width:32px; height:32px; border-radius:8px; border:none; background:transparent; cursor:pointer; display:flex; align-items:center;
      justify-content:center; color:#6b6b6b; transition:background .12s; }
    .sf-calnav:hover:not(:disabled){ background:#f1f1ef; }
    .sf-calnav:disabled{ color:#d6d6d3; cursor:default; }
    .sf-calnav svg{ width:18px; height:18px; stroke:currentColor; fill:none; }
    .sf-caldow{ display:grid; grid-template-columns:repeat(7,1fr); margin-bottom:2px; }
    .sf-caldow span{ text-align:center; font-size:12px; font-weight:600; color:#9a9a97; padding:6px 0; }
    .sf-calgrid{ display:grid; grid-template-columns:repeat(7,1fr); }
    .sf-cell{ position:relative; height:40px; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:550; color:#191919; cursor:pointer; }
    .sf-cell .sf-d{ position:relative; z-index:2; width:34px; height:34px; display:flex; align-items:center; justify-content:center; border-radius:8px; transition:background .1s; }
    .sf-cell.sf-selectable:not(.sf-sel):hover .sf-d{ background:#f1f1ef; }
    .sf-cell.sf-out{ color:#9a9a97; cursor:default; }
    .sf-cell.sf-disabled{ color:#cfcfcc; cursor:default; }
    .sf-cell.sf-today .sf-d{ box-shadow:inset 0 0 0 1.5px #dcdcd9; }
    .sf-cell.sf-inrange::before{ content:""; position:absolute; top:3px; bottom:3px; left:0; right:0; background:#f1f1ef; z-index:1; }
    .sf-cell.sf-inrange .sf-d{ color:#191919; }
    .sf-cell.sf-start::before{ left:50%; }
    .sf-cell.sf-end::before{ right:50%; }
    .sf-cell.sf-sel .sf-d{ background:#191919; color:#fff; font-weight:650; }
    .sf-cell.sf-today.sf-sel .sf-d{ box-shadow:none; }
    .sf-calfoot{ display:flex; align-items:center; gap:10px; margin-top:10px; padding-top:12px; border-top:1px solid #e9e9e7; }
    .sf-calfoot button{ flex:1; height:38px; border-radius:9px; font-size:13px; font-weight:650; cursor:pointer; font-family:inherit; transition:background .12s; }
    .sf-calfoot .sf-cancel{ border:1px solid #dcdcd9; background:#fff; color:#191919; }
    .sf-calfoot .sf-cancel:hover{ background:#f1f1ef; }
    .sf-calfoot .sf-accept{ border:none; background:#191919; color:#fff; box-shadow:0 1px 2px rgba(0,0,0,.18); }
    .sf-calfoot .sf-accept:hover:not(:disabled){ background:#000; }
    .sf-calfoot .sf-accept:disabled{ background:#efefed; color:#9a9a97; box-shadow:none; cursor:default; }

    .sf-mfoot{ display:flex; align-items:center; justify-content:space-between; padding:16px 24px; border-top:1px solid #e9e9e7; }
    .sf-mfoot .sf-clearall{ background:none; border:none; font-size:14px; font-weight:500; color:#6b6b6b; cursor:pointer; font-family:inherit; padding:8px 4px; }
    .sf-mfoot .sf-clearall:hover{ color:#191919; }
    .sf-mfoot .sf-show{ display:inline-flex; align-items:center; justify-content:center; min-width:112px; background:#191919; color:#fff; border:none;
      border-radius:9px; height:36px; padding:0 16px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; box-shadow:0 1px 2px rgba(0,0,0,.2); }
    .sf-mfoot .sf-show:hover{ background:#000; }
    /* While loading, the label is swapped for three softly pulsing dots. */
    .sf-show-spin{ display:none; align-items:center; justify-content:center; gap:5px; height:16px; }
    .sf-show-spin i{ width:6px; height:6px; border-radius:50%; background:#fff; opacity:.4;
      animation:sf-dots 1s ease-in-out infinite; }
    .sf-show-spin i:nth-child(2){ animation-delay:.16s; }
    .sf-show-spin i:nth-child(3){ animation-delay:.32s; }
    .sf-show.sf-loading .sf-show-content{ display:none; }
    .sf-show.sf-loading .sf-show-spin{ display:inline-flex; }
    @keyframes sf-dots{ 0%,80%,100%{ opacity:.35; transform:scale(.72); } 40%{ opacity:1; transform:scale(1); } }
    /* ===================== Dark mode (.sf-dark) =====================
       The modal shipped light-only, so this is written as one additive block
       rather than by re-plumbing the rules above: light mode cannot regress
       because not a single existing declaration was touched, and the whole theme
       can be lifted out in one delete.

       .sf-dark follows the CALLER'S theme, not the OS \u2014 every platform passes the
       same theme object it paints its banner with, so the modal is dark exactly
       when the page behind it is.

       Values are the banner's, not new inventions \u2014 rgb(32,38,45) is the same
       surface --sf-rb-banner-bg paints, #f2f3f5 the same strong text, and the
       rgba(255,255,255,.07/.10/.18) family the same quiet-hover / divider /
       ghost-border steps the action row uses. One extra tone, rgb(45,52,60), is
       introduced for things that must sit ABOVE the surface (inputs, the raised
       toggle pill, the calendar); the banner never needed it because it has
       nothing layered on itself.

       The yellow is deliberately untouched \u2014 density curve, range fill and the
       narrowed-metric dot all stay exactly as they are, since they carry meaning
       rather than theme.

       color-scheme:dark matters more than it looks: without it the native <select>
       for Days/Weeks/Months opens a white list on a dark field, and the text
       caret and selection inside the number inputs stay light-mode. */
    #sf-filters-overlay.sf-dark{
      background:rgba(0,0,0,.6); color:#f2f3f5; color-scheme:dark; }
    #sf-filters-overlay.sf-dark .sf-modal{
      background:rgb(32,38,45);
      box-shadow:0 12px 28px rgba(0,0,0,.5),0 32px 64px rgba(0,0,0,.6); }
    #sf-filters-overlay.sf-dark .sf-mhead,
    #sf-filters-overlay.sf-dark .sf-fgroup,
    #sf-filters-overlay.sf-dark .sf-calfoot,
    #sf-filters-overlay.sf-dark .sf-mfoot{
      border-color:rgba(255,255,255,0.10); }
    #sf-filters-overlay.sf-dark .sf-mhead h3,
    #sf-filters-overlay.sf-dark .sf-cmonth,
    #sf-filters-overlay.sf-dark .sf-cell,
    #sf-filters-overlay.sf-dark .sf-cell.sf-inrange .sf-d,
    #sf-filters-overlay.sf-dark .sf-datefield.sf-set,
    #sf-filters-overlay.sf-dark .sf-nf input,
    #sf-filters-overlay.sf-dark .sf-selwrap select{ color:#f2f3f5; }
    #sf-filters-overlay.sf-dark .sf-mclose,
    #sf-filters-overlay.sf-dark .sf-calnav,
    #sf-filters-overlay.sf-dark .sf-mfoot .sf-clearall{
      color:rgba(242,243,245,0.7); }
    #sf-filters-overlay.sf-dark .sf-mfoot .sf-clearall:hover{ color:#f2f3f5; }
    #sf-filters-overlay.sf-dark .sf-fgroup > label,
    #sf-filters-overlay.sf-dark .sf-nf-label,
    #sf-filters-overlay.sf-dark .sf-dash,
    #sf-filters-overlay.sf-dark .sf-caldow span,
    #sf-filters-overlay.sf-dark .sf-cell.sf-out,
    #sf-filters-overlay.sf-dark .sf-datefield,
    #sf-filters-overlay.sf-dark .sf-datefield .sf-dchev,
    #sf-filters-overlay.sf-dark .sf-selwrap svg,
    #sf-filters-overlay.sf-dark .sf-nf input::placeholder{
      color:rgba(242,243,245,0.45); }
    #sf-filters-overlay.sf-dark .sf-cell.sf-disabled,
    #sf-filters-overlay.sf-dark .sf-calnav:disabled{ color:rgba(242,243,245,0.25); }
    /* Hover fills + the segmented tracks all sit on the same quiet step. */
    #sf-filters-overlay.sf-dark .sf-mclose:hover,
    #sf-filters-overlay.sf-dark .sf-calnav:hover:not(:disabled),
    #sf-filters-overlay.sf-dark .sf-datefield:hover,
    #sf-filters-overlay.sf-dark .sf-calfoot .sf-cancel:hover,
    #sf-filters-overlay.sf-dark .sf-cell.sf-selectable:not(.sf-sel):hover .sf-d,
    #sf-filters-overlay.sf-dark .sf-cell.sf-inrange::before,
    #sf-filters-overlay.sf-dark .sf-modetoggle,
    #sf-filters-overlay.sf-dark .sf-typechip{ background:rgba(255,255,255,0.07); }
    #sf-filters-overlay.sf-dark .sf-typechip:hover{ background:rgba(255,255,255,0.12); }
    #sf-filters-overlay.sf-dark .sf-modetoggle .sf-mt,
    #sf-filters-overlay.sf-dark .sf-typechip{ color:rgba(242,243,245,0.7); }
    #sf-filters-overlay.sf-dark .sf-modetoggle .sf-mt:hover,
    #sf-filters-overlay.sf-dark .sf-typechip:hover{ color:#f2f3f5; }
    /* The selected pill has to CLEAR the track, and by more than light mode needs.
       rgba(255,255,255,.07) over the surface composites to rgb(48,53,60), so the
       first attempt at rgb(45,52,60) was actually a hair DARKER than the track it
       sits in \u2014 the selected state read as disabled. Light mode gets away with a
       14/255 step (#f1f1ef to #fff) because the eye is far more sensitive to
       luminance differences up there; down here the same step vanishes. This is
       ~27/255, about double, and it is the smallest step that still reads at a
       glance.

       Colour alone is not what sells "raised" though. The inset top highlight is
       the light catching the pill's upper edge and the drop shadow is it sitting
       above the track \u2014 the same two cues the white pill gets for free in light
       mode from being brighter than everything around it. */
    #sf-filters-overlay.sf-dark .sf-modetoggle .sf-mt.sf-sel,
    #sf-filters-overlay.sf-dark .sf-typechip.sf-sel,
    #sf-filters-overlay.sf-dark .sf-typechip.sf-sel:hover{
      background:rgb(72,80,90); color:#f2f3f5;
      box-shadow:0 1px 3px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.07); }
    /* Type buttons only - the toggle pill above keeps its track and needs no ring.
       Slightly firmer than the 0.18 field border since it rides a lifted fill. */
    #sf-filters-overlay.sf-dark .sf-typechip.sf-sel,
    #sf-filters-overlay.sf-dark .sf-typechip.sf-sel:hover{
      box-shadow:0 0 0 1px rgba(255,255,255,.22), 0 1px 3px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.07); }
    #sf-filters-overlay.sf-dark .sf-nf,
    #sf-filters-overlay.sf-dark .sf-selwrap select,
    #sf-filters-overlay.sf-dark .sf-datefield,
    #sf-filters-overlay.sf-dark .sf-calendar,
    #sf-filters-overlay.sf-dark .sf-calfoot .sf-cancel{
      background:rgb(45,52,60); border-color:rgba(255,255,255,0.18); }
    #sf-filters-overlay.sf-dark .sf-calfoot .sf-cancel{ color:#f2f3f5; }
    #sf-filters-overlay.sf-dark .sf-calendar{
      box-shadow:0 1px 2px rgba(0,0,0,.3),0 4px 12px rgba(0,0,0,.4); }
    #sf-filters-overlay.sf-dark .sf-nf.sf-filled{ border-color:rgba(255,255,255,0.28); }
    #sf-filters-overlay.sf-dark .sf-nf:focus-within,
    #sf-filters-overlay.sf-dark .sf-datefield.sf-open{
      border-color:rgba(255,255,255,0.4); box-shadow:0 0 0 3px rgba(255,255,255,.10); }
    #sf-filters-overlay.sf-dark .sf-cell.sf-today .sf-d{
      box-shadow:inset 0 0 0 1.5px rgba(255,255,255,0.18); }
    /* Slider: track + unselected density go dark, the handles stay light so they
       still read as grabbable. The YELLOW fill and highlight are untouched. */
    #sf-filters-overlay.sf-dark .sf-dist-area-bg{ fill:rgba(255,255,255,0.10); }
    #sf-filters-overlay.sf-dark .sf-dist-rail{ background:rgba(255,255,255,0.14); }
    #sf-filters-overlay.sf-dark .sf-dist-handle{
      background:#f2f3f5; border-color:rgba(255,255,255,0.3); box-shadow:0 1px 4px rgba(0,0,0,.45); }
    #sf-filters-overlay.sf-dark .sf-dist-handle:hover{
      box-shadow:0 0 0 6px rgba(255,255,255,.10),0 1px 4px rgba(0,0,0,.45); }
    #sf-filters-overlay.sf-dark .sf-dist-handle.sf-drag{
      box-shadow:0 0 0 8px rgba(255,255,255,.14),0 1px 4px rgba(0,0,0,.5); }
    /* The scroll-fade has to fade to whatever the modal actually is, or it paints
       a white haze across the bottom of a dark sheet. */
    #sf-filters-overlay.sf-dark .sf-mscroll-fade{
      background:linear-gradient(to bottom, rgba(32,38,45,0) 0%, rgba(32,38,45,0.9) 58%, rgb(32,38,45) 100%); }
    /* Primaries invert with the theme: near-black-on-white becomes white-on-dark
       for Show, Accept and the selected calendar day. The spinner dots ride on
       the button, so they invert with it. */
    #sf-filters-overlay.sf-dark .sf-mfoot .sf-show,
    #sf-filters-overlay.sf-dark .sf-calfoot .sf-accept,
    #sf-filters-overlay.sf-dark .sf-cell.sf-sel .sf-d{
      background:#f2f3f5; color:#1a1a1a; }
    #sf-filters-overlay.sf-dark .sf-mfoot .sf-show{ box-shadow:0 1px 2px rgba(0,0,0,.4); }
    #sf-filters-overlay.sf-dark .sf-mfoot .sf-show:hover,
    #sf-filters-overlay.sf-dark .sf-calfoot .sf-accept:hover:not(:disabled){ background:#fff; }
    #sf-filters-overlay.sf-dark .sf-calfoot .sf-accept:disabled{
      background:rgba(255,255,255,0.06); color:rgba(242,243,245,0.3); }
    #sf-filters-overlay.sf-dark .sf-show-spin i{ background:#1a1a1a; }

  `,document.head.appendChild(e)}function ro(e,t,s,n,o){er();let r=t.isDark,a=Array.isArray(o)&&o.length?o.map(l=>Vt.find(u=>u.key===l)).filter(Boolean):Vt.slice();e.style.setProperty("--sf-pop-bg",t.menuBg),e.style.setProperty("--sf-pop-border",t.menuBorder),e.style.setProperty("--sf-pop-shadow",t.menuShadow),e.style.setProperty("--sf-pop-text",t.menuText),e.style.setProperty("--sf-pop-muted",t.menuMutedText),e.style.setProperty("--sf-pop-hover",t.menuItemHoverBg),e.style.setProperty("--sf-pop-sel",r?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.05)");let i=document.createElement("div");i.className="sf-sort-pop",i.innerHTML="<h4>Sort by</h4>"+a.map(l=>{let u=_s[l.key]||l;return`<div class="sf-sort-opt${l.key===s?" sf-sel":""}" data-k="${l.key}">`+(u.vb&&u.icon?`<svg class="sf-sopt-ic" viewBox="${u.vb}" xmlns="http://www.w3.org/2000/svg">${u.icon}</svg>`:"")+`<span>${l.label}</span></div>`}).join(""),i.addEventListener("click",l=>l.stopPropagation()),e.appendChild(i);let c=()=>e.classList.remove("sf-open");e.addEventListener("click",l=>{l.stopPropagation(),e.classList.toggle("sf-open")}),i.querySelectorAll(".sf-sort-opt").forEach(l=>{l.addEventListener("click",()=>{let u=l.dataset.k;i.querySelectorAll(".sf-sort-opt").forEach(p=>p.classList.remove("sf-sel")),l.classList.add("sf-sel"),c(),typeof n=="function"&&n(u)})}),document.addEventListener("click",l=>{e.contains(l.target)||c()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&c()})}function ao(e){let t=document.querySelector("#sf-sortby-chip .sf-sort-pop");t&&t.querySelectorAll(".sf-sort-opt").forEach(s=>{s.classList.toggle("sf-sel",s.dataset.k===e)})}function tr(e){for(let t in ge){let s=ge[t];if(s.min===e||s.max===e)return s.dec||0}return 0}function _t(e){let t=document.getElementById(e);if(!t)return"";if(tr(e)){let s=(t.value||"").replace(/[^0-9.]/g,""),n=s.indexOf(".");return n===-1?s:s.slice(0,n+1)+s.slice(n+1).replace(/\./g,"")}return(t.value||"").replace(/[^0-9]/g,"")}function nr(e){return(+e).toLocaleString("en-US")}function zt(e){let t=document.getElementById(e);if(!t)return;let s=t.closest(".sf-nf");s&&s.classList.toggle("sf-filled",_t(e)!=="")}function vn(e,t){let s=document.getElementById(e);if(!s)return;let n=tr(e);s.value=t===""||t==null?"":n?String(Math.round(+t*Math.pow(10,n))/Math.pow(10,n)):nr(t),zt(e)}function qe(e,t){let s=ge[e],n=Be&&Be[e],o=_t(t==="min"?s.min:s.max);return n?o===""?t==="min"?n.lo:n.hi:Math.max(n.lo,Math.min(+o,n.hi)):o===""?0:+o}function si(e){let t=ge[e],s=Be&&Be[e],n=document.getElementById(t.el);if(!n||!s)return;n.classList.toggle("sf-dist-disabled",!!s.degenerate);let o=Ja(s),r="sf-dist-clip-"+e;if(n.innerHTML='<div class="sf-dist-hist"><svg class="sf-dist-curve" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><clipPath id="'+r+'" clipPathUnits="userSpaceOnUse"><rect class="sf-dist-cliprect" x="0" y="-2" width="100" height="104"></rect></clipPath></defs><path class="sf-dist-area-bg" d="'+o+'"></path><path class="sf-dist-area-hl" d="'+o+'" clip-path="url(#'+r+')"></path></svg></div><div class="sf-dist-rail"></div><div class="sf-dist-fill"></div><div class="sf-dist-handle sf-h-min"></div><div class="sf-dist-handle sf-h-max"></div>',s.degenerate)return;let a=n.querySelector(".sf-dist-rail");[["sf-h-min","min"],["sf-h-max","max"]].forEach(([i,c])=>{let l=n.querySelector("."+i);l.addEventListener("pointerdown",u=>{u.preventDefault(),l.setPointerCapture(u.pointerId),l.classList.add("sf-drag");let p=d=>{let m=a.getBoundingClientRect(),g=Math.max(0,Math.min(1,(d.clientX-m.left)/m.width)),k=Qa(s,g,ge[e].dec),_=qe(e,"min"),y=qe(e,"max");c==="min"?(k=Math.max(s.lo,Math.min(k,y)),vn(t.min,k)):(k=Math.min(s.hi,Math.max(k,_)),vn(t.max,k)),En(e),ks(),it()},f=()=>{l.classList.remove("sf-drag"),document.removeEventListener("pointermove",p),document.removeEventListener("pointerup",f)};document.addEventListener("pointermove",p),document.addEventListener("pointerup",f)})})}function En(e){let t=ge[e],s=Be&&Be[e],n=document.getElementById(t.el);if(!n||!s||!n.querySelector(".sf-dist-fill"))return;let o=(s.degenerate?0:so(s,qe(e,"min")))*100,r=(s.degenerate?1:so(s,qe(e,"max")))*100;n.querySelector(".sf-dist-fill").style.left=o+"%",n.querySelector(".sf-dist-fill").style.width=r-o+"%",n.querySelector(".sf-h-min").style.left=o+"%",n.querySelector(".sf-h-max").style.left=r+"%";let a=n.querySelector(".sf-dist-cliprect");a&&(a.setAttribute("x",o.toFixed(2)),a.setAttribute("width",Math.max(0,r-o).toFixed(2)))}function Ln(e){let t=Be&&Be[e];if(!t||t.degenerate)return!1;let s=Math.pow(10,ge[e].dec||0),n=o=>Math.round(o*s)/s;return n(qe(e,"min"))>n(t.lo)||n(qe(e,"max"))<n(t.hi)}function ks(){Fe.forEach(e=>{let t=document.querySelector('#sf-metrictoggle .sf-mt[data-k="'+e+'"]');t&&t.classList.toggle("sf-has",Ln(e))})}function oi(){Pt.forEach(e=>{let t=document.querySelector('#sf-metrictoggle .sf-mt[data-k="'+e+'"]');t&&(t.style.display=Fe.includes(e)?"inline-flex":"none")}),Fe.includes(D.metric)||(D.metric=Fe[0])}function sr(e){D.metric=e,document.querySelectorAll("#sf-metrictoggle .sf-mt").forEach(s=>s.classList.toggle("sf-sel",s.dataset.k===e)),Pt.forEach(s=>{let n=document.getElementById("sf-metric-"+s);n&&(n.style.display=s===e?"block":"none")});let t=document.getElementById("sf-metric-"+e);t&&(t.classList.remove("sf-metric-anim"),t.offsetWidth,t.classList.add("sf-metric-anim")),En(e)}function Mn(){let e=new Date;return{y:e.getFullYear(),m:e.getMonth(),d:e.getDate()}}function Ve(e){return e.y*1e4+e.m*100+e.d}function mt(e,t){return!!e&&!!t&&e.y===t.y&&e.m===t.m&&e.d===t.d}function ri(e){return Ve(e)>Ve(Mn())}function ai(e){if(!he||!Te)return!1;let t=Ve(e),s=Math.min(Ve(he),Ve(Te)),n=Math.max(Ve(he),Ve(Te));return t>=s&&t<=n}function ii(e,t){let s=Xn[e.m].slice(0,3)+" "+e.d;if(mt(e,t))return s+", "+e.y;let n=Xn[t.m].slice(0,3)+" "+t.d;return e.y===t.y?s+" \u2013 "+n+", "+e.y:s+", "+e.y+" \u2013 "+n+", "+t.y}function or(e){document.querySelectorAll("#sf-postedmode .sf-mt").forEach(n=>n.classList.toggle("sf-sel",n.dataset.m===e));let t=document.getElementById("sf-posted-last"),s=document.getElementById("sf-posted-range");t&&(t.style.display=e==="last"?"flex":"none"),s&&(s.style.display=e==="range"?"block":"none")}function li(e){if(D.postedMode=e,e==="range"){D.p_num="",D.p_unit="Months";let s=document.getElementById("sf-p-num");s&&(s.value=""),zt("sf-p-num");let n=document.getElementById("sf-p-unit");n&&(n.value="Months")}else D.d_start=null,D.d_end=null,he=null,Te=null,Ss();or(e);let t=document.getElementById(e==="last"?"sf-posted-last":"sf-posted-range");t&&(t.classList.remove("sf-metric-anim"),t.offsetWidth,t.classList.add("sf-metric-anim")),e!=="range"&&wn(),it()}function Ss(){let e=document.getElementById("sf-datefield"),t=document.getElementById("sf-datefield-label");!e||!t||(D.d_start&&D.d_end?(t.textContent=ii(D.d_start,D.d_end),e.classList.add("sf-set")):(t.textContent="Select date range",e.classList.remove("sf-set")))}function ci(){let e=document.getElementById("sf-calendar"),t=document.getElementById("sf-datefield");if(!e)return;if(e.style.display!=="none"){e.style.display="none",t.classList.remove("sf-open");return}he=D.d_start?{...D.d_start}:null,Te=D.d_end?{...D.d_end}:null;let s=Mn();Ft=he?{y:he.y,m:he.m}:{y:s.y,m:s.m},Es(),rr(),e.style.display="block",t.classList.add("sf-open")}function io(e){let t=Mn(),s=Ft.m+e,n=Ft.y;s<0&&(s=11,n--),s>11&&(s=0,n++),!(e>0&&(n>t.y||n===t.y&&s>t.m))&&(Ft={y:n,m:s},Es())}function Es(){let e=Mn(),{y:t,m:s}=Ft,n=document.getElementById("sf-cmonth");n&&(n.textContent=Xn[s]+" "+t);let o=document.getElementById("sf-cal-next");o&&(o.disabled=t>e.y||t===e.y&&s>=e.m);let r=new Date(t,s,1).getDay(),a=new Date(t,s+1,0).getDate(),i=new Date(t,s,0).getDate();an=[];for(let l=0;l<42;l++){let u=l-r+1,p=t,f=s,d,m=!1;u<1?(m=!0,d=i+u,f=s-1,f<0&&(f=11,p--)):u>a?(m=!0,d=u-a,f=s+1,f>11&&(f=0,p++)):d=u,an.push({y:p,m:f,d,out:m})}let c=document.getElementById("sf-calgrid");c&&(c.innerHTML=an.map((l,u)=>{let p=ri(l),f=!l.out&&!p,d="sf-cell";return l.out?d+=" sf-out":p&&(d+=" sf-disabled"),f&&(d+=" sf-selectable"),ai(l)&&(d+=" sf-inrange"),mt(l,he)&&(d+=" sf-start"),mt(l,Te)&&(d+=" sf-end"),(mt(l,he)||mt(l,Te))&&(d+=" sf-sel"),mt(l,e)&&(d+=" sf-today"),'<div class="'+d+'" data-i="'+u+'"><span class="sf-d">'+l.d+"</span></div>"}).join(""))}function fi(e){let t=e.target.closest(".sf-cell.sf-selectable");if(!t)return;let s=an[+t.dataset.i];!he||he&&Te?(he=s,Te=null):Ve(s)<Ve(he)?he=s:Te=s,Es(),rr()}function rr(){let e=document.getElementById("sf-cal-accept");e&&(e.disabled=!(he&&Te))}function di(){if(!(he&&Te))return;D.d_start={...he},D.d_end={...Te},Ss();let e=document.getElementById("sf-calendar");e&&(e.style.display="none");let t=document.getElementById("sf-datefield");t&&t.classList.remove("sf-open"),it()}function wn(){let e=document.getElementById("sf-calendar");e&&(e.style.display="none");let t=document.getElementById("sf-datefield");t&&t.classList.remove("sf-open")}function ar(){return D.postedMode==="last"?_t("sf-p-num")!==""&&_t("sf-p-num")!=="0":!!(D.d_start&&D.d_end)}function ir(){if(!Array.isArray(rt)||!rt.length)return Jo;let e=Go(),t=Wo(),s=xs();return rt.filter(n=>Qn(n,e)&&es(n,t)&&ts(n,s)).length}function lr(){let e=ar()?1:0;Fe.forEach(s=>{Ln(s)&&e++});let t=xs();return t&&(e+=t.length),e}function cr(){let e=me&&me.querySelector(".sf-mfoot .sf-clearall");e&&e.classList.toggle("sf-on",lr()>0)}function pi(){let e=document.querySelector("#sf-showbtn .sf-show-n");e&&(e.textContent=ir().toLocaleString("en-US"));let t=document.getElementById("sf-showbtn");t&&t.classList.remove("sf-loading"),clearTimeout(ss),cr()}function it(){let e=document.getElementById("sf-showbtn");e&&(cr(),e.classList.add("sf-loading"),clearTimeout(ss),ss=setTimeout(()=>{let t=document.querySelector("#sf-showbtn .sf-show-n");t&&(t.textContent=ir().toLocaleString("en-US")),e.classList.remove("sf-loading")},450))}function Ls(e){let t=document.getElementById("sf-filters-btn"),s=document.getElementById("sf-filters-badge");s&&(s.textContent=e),t&&t.classList.toggle("sf-has-filters",e>0)}var Vn=0;function fr(){let e=me&&me.querySelector(".sf-mbody"),t=me&&me.querySelector("#sf-mscroll-fade");if(!e||!t)return;let s=e.scrollHeight-e.clientHeight>2,n=e.scrollTop+e.clientHeight>=e.scrollHeight-2;t.classList.toggle("sf-show",s&&!n)}function os(){Vn||(Vn=requestAnimationFrame(()=>{Vn=0,fr()}))}function ui(){if(!me)return;let e=(t,s,n)=>{let o=Cn(s,n);if(!o)return;let r=t.querySelector("."+s);r?r.outerHTML=o:t.insertAdjacentHTML("afterbegin",o)};me.querySelectorAll("#sf-metrictoggle .sf-mt").forEach(t=>e(t,"sf-mt-ic",_s[t.dataset.k]||xt[t.dataset.k])),me.querySelectorAll("#sf-postedmode .sf-mt").forEach(t=>e(t,"sf-mt-ic",ni[t.dataset.m]||ns[t.dataset.m])),me.querySelectorAll("#sf-typechips .sf-typechip").forEach(t=>{let s=+t.dataset.t;e(t,"sf-tc-ic",Ot[s]||at.find(n=>n.t===s))})}function mi(){if(me)return me;er();let e=document.createElement("div");e.id="sf-filters-overlay",e.innerHTML=`
    <div class="sf-modal" role="dialog" aria-modal="true" aria-label="Filters">
      <div class="sf-mhead">
        <button class="sf-mclose" aria-label="Close"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <h3>Filters</h3>
      </div>
      <div class="sf-mbody-wrap"><div class="sf-mbody">
        <div class="sf-fgroup" id="sf-type-group" style="display:none;">
          <label>Type</label>
          <div class="sf-typechips" id="sf-typechips">
            ${at.map(n=>'<button class="sf-typechip" data-t="'+n.t+'"><svg class="sf-tc-ic" viewBox="'+n.vb+'" xmlns="http://www.w3.org/2000/svg">'+n.icon+'</svg><span class="sf-tc-label">'+n.label+"</span></button>").join("")}
          </div>
        </div>
        <div class="sf-fgroup">
          <label>Performance range</label>
          <div class="sf-modetoggle" id="sf-metrictoggle">
            ${Pt.map(n=>'<button class="sf-mt" data-k="'+n+'" style="display:none;">'+(Ko[n]||"")+ge[n].label+'<span class="sf-mtdot"></span></button>').join("")}
          </div>
          ${Pt.map(n=>{let o=ge[n],r=o.dec?"decimal":"numeric";return'<div class="sf-metric-panel" id="sf-metric-'+n+'" style="display:none;"><div class="sf-dist" id="'+o.el+'"></div><div class="sf-numrange"><div class="sf-nf-wrap"><label class="sf-nf-label">Min</label><div class="sf-nf"><input id="'+o.min+'" inputmode="'+r+'"></div></div><span class="sf-dash">\u2013</span><div class="sf-nf-wrap"><label class="sf-nf-label">Max</label><div class="sf-nf"><input id="'+o.max+'" inputmode="'+r+'"></div></div></div></div>'}).join("")}
        </div>
        <div class="sf-fgroup">
          <label>Posted</label>
          <div class="sf-modetoggle" id="sf-postedmode">
            <button class="sf-mt sf-sel" data-m="last">${Cn("sf-mt-ic",ns.last)}In the last</button>
            <button class="sf-mt" data-m="range">${Cn("sf-mt-ic",ns.range)}Between</button>
          </div>
          <div class="sf-postedrow" id="sf-posted-last" style="margin-top:14px;">
            <div class="sf-nf"><input id="sf-p-num" placeholder="0" inputmode="numeric"></div>
            <div class="sf-selwrap">
              <select id="sf-p-unit"><option>Days</option><option>Weeks</option><option selected>Months</option><option>Years</option></select>
              <svg viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9l4-4 4 4M8 15l4 4 4-4"/></svg>
            </div>
          </div>
          <div id="sf-posted-range" style="display:none; margin-top:14px;">
            <button class="sf-datefield" id="sf-datefield">
              <span class="sf-dlabel" id="sf-datefield-label">Select date range</span>
              <svg class="sf-dchev" viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="sf-calendar" id="sf-calendar" style="display:none;">
              <div class="sf-calhead">
                <button class="sf-calnav" id="sf-cal-prev" aria-label="Previous month"><svg viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
                <span class="sf-cmonth" id="sf-cmonth"></span>
                <button class="sf-calnav" id="sf-cal-next" aria-label="Next month"><svg viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
              </div>
              <div class="sf-caldow"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
              <div class="sf-calgrid" id="sf-calgrid"></div>
              <div class="sf-calfoot"><button class="sf-cancel">Cancel</button><button class="sf-accept" id="sf-cal-accept" disabled>Accept</button></div>
            </div>
          </div>
        </div>
      </div><div class="sf-mscroll-fade" id="sf-mscroll-fade" aria-hidden="true"></div></div>
      <div class="sf-mfoot">
        <button class="sf-clearall">Clear all</button>
        <button class="sf-show" id="sf-showbtn"><span class="sf-show-content">Show <span class="sf-show-n">0</span> <span class="sf-show-noun">reels</span></span><span class="sf-show-spin"><i></i><i></i><i></i></span></button>
      </div>
    </div>`,document.body.appendChild(e),me=e,e.addEventListener("click",n=>{n.target===e&&ln()}),e.querySelector(".sf-mclose").addEventListener("click",ln);let t=e.querySelector(".sf-mbody");t&&(t.addEventListener("scroll",fr,{passive:!0}),typeof ResizeObserver=="function"&&new ResizeObserver(os).observe(t),typeof MutationObserver=="function"&&new MutationObserver(os).observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style"]})),e.querySelectorAll("#sf-metrictoggle .sf-mt").forEach(n=>n.addEventListener("click",()=>sr(n.dataset.k))),e.querySelectorAll("#sf-postedmode .sf-mt").forEach(n=>n.addEventListener("click",()=>li(n.dataset.m))),e.querySelector("#sf-typechips").addEventListener("click",n=>{let o=n.target.closest(".sf-typechip");if(!o)return;let r=+o.dataset.t;ke||(ke=new Set),ke.has(r)?ke.delete(r):ke.add(r),o.classList.toggle("sf-sel",ke.has(r)),it()}),e.querySelector("#sf-datefield").addEventListener("click",ci),e.querySelector("#sf-cal-prev").addEventListener("click",()=>io(-1)),e.querySelector("#sf-cal-next").addEventListener("click",()=>io(1)),e.querySelector("#sf-calgrid").addEventListener("click",fi),e.querySelector(".sf-cancel").addEventListener("click",wn),e.querySelector("#sf-cal-accept").addEventListener("click",di),e.querySelector(".sf-clearall").addEventListener("click",hi),e.querySelector("#sf-showbtn").addEventListener("click",gi);let s={};return Pt.forEach(n=>{s[ge[n].min]=n,s[ge[n].max]=n}),e.addEventListener("input",n=>{let o=n.target.id;s[o]?(zt(o),En(s[o]),ks(),it()):o==="sf-p-num"&&(zt(o),it())}),e.addEventListener("change",n=>{n.target.id==="sf-p-unit"&&it()}),oo||(oo=!0,document.addEventListener("keydown",n=>{if(n.key!=="Escape"||!me||!me.classList.contains("sf-open"))return;let o=document.getElementById("sf-calendar");o&&o.style.display!=="none"?wn():ln()})),e}function lo(e,t){let s=D[ge[e].pre+t];if(s!=null)return s;let n=Be&&Be[e];return n?t==="min"?n.lo:n.hi:""}function Ms(){Fe.forEach(s=>{vn(ge[s].min,lo(s,"min")),vn(ge[s].max,lo(s,"max"))});let e=document.getElementById("sf-p-num");e&&(e.value=D.p_num===""?"":nr(D.p_num),zt("sf-p-num"));let t=document.getElementById("sf-p-unit");t&&(t.value=D.p_unit),or(D.postedMode),Ss(),wn(),oi(),Fe.forEach(s=>En(s)),ti(),sr(D.metric),ks(),pi()}function co(e,t,s,n,o){rt=Array.isArray(s)?s:[],Jo=t||rt.length||0,Be=Ka(rt),Kn=n&&n.onApply,Jn=n&&n.onClear,Fe=o&&Array.isArray(o.metrics)&&o.metrics.length?o.metrics.slice():["views","likes"],bn=!!(o&&o.typeAvailable),wt=bn?ei(rt):[];let r=!!(e&&e.isDark);ke&&(ke=new Set([...ke].filter(c=>wt.includes(c))),ke.size||(ke=null));let a=mi();a.classList.toggle("sf-dark",r),ui();let i=a.querySelector("#sf-showbtn .sf-show-noun");if(i){let c=o&&o.noun||"reels";i.textContent=c.charAt(0).toUpperCase()+c.slice(1)}Fe.forEach(c=>si(c)),Ms(),a.classList.add("sf-open"),os()}function ln(){me&&me.classList.remove("sf-open")}function hi(){Qo(),Ms(),Ls(0),typeof Jn=="function"&&Jn()}function gi(){Fe.forEach(t=>{let s=Ln(t),n=ge[t].pre;D[n+"min"]=s?qe(t,"min"):null,D[n+"max"]=s?qe(t,"max"):null}),D.p_num=_t("sf-p-num");let e=document.getElementById("sf-p-unit");D.p_unit=e?e.value:"Months",Ls(lr()),typeof Kn=="function"&&Kn({performance:Go(),posted:Wo(),type:xs()}),ln()}function gt(){Qo(),Ls(0),me&&Ms()}var yi=7200*1e3,bi=30*1e3,Lt=new Map,sn=new Map;function fo(e){let t=null,s=-1,n=e?.image_versions2?.candidates;if(Array.isArray(n))for(let o of n){let r=o?.width||0;o?.url&&r>s&&(s=r,t=o.url)}return t}function Ci(e){if(!e)return null;let t=e.media_type===8?"carousel":e.media_type===2?"video":"photo",s={kind:t,videoUrl:e.video_versions?.[0]?.url||null,durationSecs:Number.isFinite(e.video_duration)?e.video_duration:null,caption:e.caption?.text||null,posterUrl:fo(e),slides:null};return t==="carousel"&&Array.isArray(e.carousel_media)&&(s.slides=e.carousel_media.map(n=>({kind:n?.media_type===2?"video":"photo",videoUrl:n?.video_versions?.[0]?.url||null,posterUrl:fo(n),durationSecs:Number.isFinite(n?.video_duration)?n.video_duration:null}))),s}async function vi(e,t){let s=await fetch(`https://www.instagram.com/api/v1/media/${e}/info/`,{method:"GET",credentials:"include",signal:t,headers:{"x-ig-app-id":"936619743392459","x-ig-www-claim":window._sharedData?.config?.csrf_token||""}});if(!s.ok)throw new Error(`info failed: ${s.status}`);let n=await s.json(),o=Ci(n.items?.[0]);if(!o)throw new Error("empty info response");if(o.kind==="video"&&!o.videoUrl)throw new Error("no video_versions in response");if(o.kind==="carousel"&&(!o.slides||!o.slides.length))throw new Error("empty carousel");return o}function dr(e,{signal:t,fresh:s}={}){if(!e)return Promise.reject(new Error("no pk"));e=String(e);let n=Date.now();s&&Lt.delete(e);let o=Lt.get(e);if(o){let a=o.ok?yi:bi;if(n-o.at<a)return o.ok?Promise.resolve(o.value):Promise.reject(o.error);Lt.delete(e)}let r=sn.get(e);if(r&&r.controller.signal.aborted&&(sn.delete(e),r=null),!r){let a=new AbortController;r={controller:a,waiters:0,promise:null},r.promise=vi(e,a.signal).then(i=>(Lt.set(e,{ok:!0,value:i,at:Date.now()}),i)).catch(i=>{throw i&&i.name!=="AbortError"&&Lt.set(e,{ok:!1,error:i,at:Date.now()}),i}).finally(()=>{sn.delete(e)}),sn.set(e,r)}return r.waiters++,t?new Promise((a,i)=>{let c=()=>{r.waiters--,r.waiters<=0&&r.controller.abort(),i(new DOMException("aborted","AbortError"))};if(t.aborted){c();return}t.addEventListener("abort",c,{once:!0}),r.promise.then(l=>{t.removeEventListener("abort",c),a(l)},l=>{t.removeEventListener("abort",c),l&&l.name==="AbortError"&&!t.aborted?a(dr(e,{signal:t})):i(l)})}):r.promise}(function(){if(window.__sfPlayerCore)return;let e=null,t="player";function s(){if(!e||!e.openInKey)return;let h=e.openInKey,b=e.openInNewTab;try{typeof chrome<"u"&&chrome.storage?.local&&(chrome.storage.local.get([h],w=>{w&&w[h]===b&&(t=b)}),chrome.storage.onChanged.addListener(w=>{h in w&&(t=w[h].newValue===b?b:"player")}))}catch{}}let n={prev:{vb:"0 0 64 110",d:"M0.000438079 54.7851C0.000438079 53.7121 0.186151 52.7217 0.557576 51.8137C0.970271 50.9058 1.58931 50.0391 2.4147 49.2137L50.6381 2.04273C52.0413 0.680837 53.7333 -0.000109907 55.7142 -0.000109907C57.0761 -0.000109907 58.2936 0.330046 59.3666 0.990358C60.4809 1.6094 61.3682 2.45542 62.0285 3.52843C62.6888 4.60144 63.0189 5.81889 63.0189 7.18078C63.0189 9.12045 62.2555 10.8538 60.7285 12.3807L17.2717 54.7851L60.7285 97.1895C62.2555 98.7165 63.0189 100.47 63.0189 102.451C63.0189 103.772 62.6888 104.969 62.0285 106.042C61.3682 107.156 60.4809 108.023 59.3666 108.642C58.2936 109.302 57.0761 109.632 55.7142 109.632C53.7333 109.632 52.0413 108.931 50.6381 107.528L2.4147 60.3565C1.58931 59.5311 0.970271 58.6645 0.557576 57.7565C0.186151 56.8486 0.000438079 55.8581 0.000438079 54.7851Z"},next:{vb:"0 0 64 110",d:"M63.0185 54.7851C63.0185 55.8581 62.8122 56.8486 62.3995 57.7565C61.9868 58.6645 61.3677 59.5311 60.5423 60.3565L12.3189 107.528C10.957 108.931 9.265 109.632 7.24279 109.632C5.92217 109.632 4.70472 109.302 3.59044 108.642C2.47617 108.023 1.58887 107.156 0.928563 106.042C0.309521 104.969 -6.14673e-07 103.772 -6.14673e-07 102.451C-6.14673e-07 100.47 0.74285 98.7165 2.22855 97.1895L45.6853 54.7851L2.22855 12.3807C0.74285 10.8538 -6.14673e-07 9.12045 -6.14673e-07 7.18078C-6.14673e-07 5.81889 0.309521 4.60144 0.928563 3.52843C1.58887 2.45542 2.47617 1.6094 3.59044 0.990358C4.70472 0.330046 5.92217 -0.000109907 7.24279 -0.000109907C9.265 -0.000109907 10.957 0.680837 12.3189 2.04273L60.5423 49.2137C61.3677 50.0391 61.9868 50.9058 62.3995 51.8137C62.8122 52.7217 63.0185 53.7121 63.0185 54.7851Z"},dots:{vb:"0 0 118 26",d:"M12.5661 25.0713C10.2138 25.0713 8.0884 24.5141 6.19 23.3999C4.29161 22.2443 2.78527 20.7173 1.67099 18.819C0.556718 16.9206 -0.000419576 14.8364 -0.000419576 12.5666C-0.000419576 10.2555 0.556718 8.15079 1.67099 6.25239C2.78527 4.354 4.29161 2.84766 6.19 1.73338C8.0884 0.577839 10.2138 6.60233e-05 12.5661 6.60233e-05C14.836 6.60233e-05 16.9201 0.577839 18.8185 1.73338C20.7169 2.84766 22.2232 4.354 23.3375 6.25239C24.4517 8.15079 25.0089 10.2555 25.0089 12.5666C25.0089 14.8364 24.4517 16.9206 23.3375 18.819C22.2232 20.7173 20.7169 22.2443 18.8185 23.3999C16.9201 24.5141 14.836 25.0713 12.5661 25.0713ZM58.8086 25.0713C56.4975 25.0713 54.3928 24.5141 52.4944 23.3999C50.596 22.2443 49.069 20.7173 47.9135 18.819C46.7992 16.9206 46.242 14.8364 46.242 12.5666C46.242 10.2555 46.7992 8.15079 47.9135 6.25239C49.069 4.354 50.596 2.84766 52.4944 1.73338C54.3928 0.577839 56.4975 6.60233e-05 58.8086 6.60233e-05C61.1197 6.60233e-05 63.2038 0.577839 65.0609 1.73338C66.9593 2.84766 68.4657 4.354 69.5799 6.25239C70.7355 8.15079 71.3132 10.2555 71.3132 12.5666C71.3132 14.8364 70.7355 16.9206 69.5799 18.819C68.4657 20.7173 66.9593 22.2443 65.0609 23.3999C63.2038 24.5141 61.1197 25.0713 58.8086 25.0713ZM105.051 25.0713C102.74 25.0713 100.635 24.5141 98.7368 23.3999C96.8384 22.2443 95.3321 20.7173 94.2178 18.819C93.1035 16.9206 92.5464 14.8364 92.5464 12.5666C92.5464 10.2555 93.1035 8.15079 94.2178 6.25239C95.3321 4.354 96.8384 2.84766 98.7368 1.73338C100.635 0.577839 102.74 6.60233e-05 105.051 6.60233e-05C107.362 6.60233e-05 109.467 0.577839 111.365 1.73338C113.264 2.84766 114.77 4.354 115.884 6.25239C117.04 8.15079 117.618 10.2555 117.618 12.5666C117.618 14.8364 117.04 16.9206 115.884 18.819C114.77 20.7173 113.264 22.2443 111.365 23.3999C109.467 24.5141 107.362 25.0713 105.051 25.0713Z"},close:{vb:"0 0 101 101",d:"M2.22871 97.8706C1.32078 97.004 0.722373 95.9722 0.433487 94.7754C0.1446 93.5786 0.1446 92.3818 0.433487 91.185C0.763642 89.9882 1.36205 88.9771 2.22871 88.1517L40.2379 50.0187L2.22871 11.9476C1.36205 11.1222 0.784277 10.1111 0.495391 8.91426C0.206504 7.71744 0.206504 6.52063 0.495391 5.32381C0.784277 4.127 1.36205 3.09526 2.22871 2.2286C3.13664 1.32067 4.18901 0.722267 5.38582 0.43338C6.58264 0.144494 7.77945 0.144494 8.97627 0.43338C10.1731 0.722267 11.2048 1.30004 12.0715 2.1667L50.1426 40.2378L88.1518 2.1667C89.0184 1.25877 90.0502 0.680997 91.247 0.43338C92.4438 0.144494 93.62 0.144494 94.7755 0.43338C95.9723 0.722267 97.0453 1.32067 97.9945 2.2286C98.8612 3.09526 99.439 4.127 99.7279 5.32381C100.058 6.52063 100.058 7.71744 99.7279 8.91426C99.439 10.0698 98.8612 11.1015 97.9945 12.0095L59.9854 50.0187L97.9945 88.0898C98.8612 88.9977 99.439 90.0501 99.7279 91.2469C100.017 92.4024 100.017 93.5786 99.7279 94.7754C99.439 95.9722 98.8612 97.004 97.9945 97.8706C97.0866 98.7786 96.0342 99.377 94.8374 99.6659C93.6406 99.9547 92.4438 99.9547 91.247 99.6659C90.0502 99.377 89.0184 98.7992 88.1518 97.9325L50.1426 59.8614L12.0715 97.9325C11.2048 98.7992 10.1731 99.377 8.97627 99.6659C7.82072 99.9547 6.62391 99.9547 5.38582 99.6659C4.18901 99.377 3.13664 98.7786 2.22871 97.8706Z"},speaker:{vb:"0 0 144 111",d:"M67.7223 110.808C66.1541 110.808 64.6684 110.458 63.2652 109.756C61.862 109.096 60.397 108.043 58.87 106.599L32.994 82.0849C32.5814 81.7547 32.1068 81.5897 31.5702 81.5897H13.9894C9.49107 81.5897 6.02444 80.3516 3.58954 77.8754C1.19591 75.3992 -0.000906974 71.7469 -0.000906974 66.9183V43.9519C-0.000906974 39.1646 1.19591 35.5329 3.58954 33.0567C6.02444 30.5806 9.49107 29.3425 13.9894 29.3425H31.5702C32.1068 29.3425 32.5814 29.1568 32.994 28.7853L58.87 4.58079C60.6033 2.97128 62.1097 1.81574 63.389 1.11416C64.6684 0.371306 66.0715 -0.00011903 67.5985 -0.00011903C69.9921 -0.00011903 71.9318 0.804636 73.4175 2.41415C74.9445 4.02366 75.708 5.98396 75.708 8.29505V102.823C75.708 105.093 74.9651 106.991 73.4794 108.518C71.9937 110.045 70.0747 110.808 67.7223 110.808ZM97.8078 82.8277C96.3221 81.8373 95.4554 80.5166 95.2078 78.8659C95.0014 77.2151 95.476 75.5024 96.6316 73.7278C98.3236 71.2516 99.6443 68.4453 100.593 65.3088C101.543 62.1311 102.017 58.8089 102.017 55.3423C102.017 51.8756 101.543 48.5534 100.593 45.3757C99.6855 42.1979 98.3649 39.3916 96.6316 36.9567C95.4348 35.2234 94.9602 33.5313 95.2078 31.8806C95.4554 30.1885 96.3221 28.8473 97.8078 27.8568C99.1284 26.9901 100.552 26.7012 102.079 26.9901C103.606 27.279 104.824 28.0838 105.732 29.4044C108.249 32.7472 110.209 36.6885 111.612 41.2281C113.016 45.7265 113.717 50.4312 113.717 55.3423C113.717 60.2533 113.016 64.958 111.612 69.4564C110.209 73.9548 108.249 77.8754 105.732 81.2182C104.824 82.5801 103.606 83.4055 102.079 83.6944C100.552 83.942 99.1284 83.6531 97.8078 82.8277ZM122.508 99.3562C121.063 98.4482 120.238 97.1895 120.031 95.58C119.825 93.9292 120.258 92.2991 121.331 90.6896C124.592 85.8198 127.13 80.3516 128.946 74.285C130.761 68.2183 131.669 61.9041 131.669 55.3423C131.669 48.7804 130.761 42.4662 128.946 36.3996C127.171 30.2917 124.633 24.8235 121.331 19.9949C120.217 18.3854 119.763 16.7759 119.969 15.1664C120.217 13.5156 121.063 12.2363 122.508 11.3284C123.911 10.4204 125.376 10.1315 126.903 10.4617C128.471 10.7506 129.73 11.5966 130.679 12.9998C134.723 18.6537 137.839 25.1743 140.026 32.5615C142.255 39.9075 143.369 47.5011 143.369 55.3423C143.369 63.1835 142.255 70.777 140.026 78.123C137.798 85.4277 134.682 91.9483 130.679 97.6847C129.73 99.0879 128.471 99.9339 126.903 100.223C125.376 100.512 123.911 100.223 122.508 99.3562Z"},mute:{vb:"0 0 119 119",d:"M26.1237 81.5897C21.5841 81.5897 18.1587 80.3928 15.8476 77.9992C13.5365 75.6056 12.381 72.0151 12.381 67.2279V43.7043C12.381 39.1646 13.4334 35.7393 15.5381 33.4282L87.5327 105.361C86.9137 107.177 85.9438 108.539 84.6232 109.447C83.3439 110.354 81.8169 110.808 80.0423 110.808C78.5153 110.808 77.0503 110.458 75.6471 109.756C74.2439 109.096 72.7582 108.043 71.19 106.599L45.0045 82.0849C44.6331 81.7547 44.1585 81.5897 43.5807 81.5897H26.1237ZM88.0899 70.5088L44.7569 27.2996H46.3045C46.5934 27.2584 46.8823 27.0933 47.1712 26.8044L71.19 4.58079C72.9233 2.97128 74.4297 1.81574 75.709 1.11416C77.0296 0.371306 78.4534 -0.00011903 79.9804 -0.00011903C82.374 -0.00011903 84.3137 0.804636 85.7994 2.41415C87.3264 4.02366 88.0899 5.98396 88.0899 8.29505V70.5088ZM109.818 116.751L1.42394 8.54266C0.474744 7.59347 0.000144899 6.43792 0.000144899 5.07603C0.000144899 3.67287 0.474744 2.49668 1.42394 1.54749C2.37314 0.557019 3.52869 0.0824199 4.89058 0.123689C6.29374 0.123689 7.46992 0.598288 8.41912 1.54749L116.69 109.818C117.68 110.767 118.175 111.923 118.175 113.285C118.175 114.647 117.68 115.802 116.69 116.751C115.823 117.742 114.688 118.237 113.285 118.237C111.923 118.237 110.767 117.742 109.818 116.751Z"},pause:{vb:"0 0 80 106",d:"M8.85215 105.732C5.88074 105.732 3.65219 104.99 2.16649 103.504C0.722057 102.018 -0.000158582 99.7896 -0.000158582 96.8182V8.85228C-0.000158582 5.92215 0.742692 3.71423 2.22839 2.22853C3.71409 0.742826 5.92201 -2.42293e-05 8.85215 -2.42293e-05H23.3996C26.2885 -2.42293e-05 28.4758 0.722192 29.9615 2.16662C31.4885 3.61106 32.2519 5.83961 32.2519 8.85228V96.8182C32.2519 99.7896 31.4885 102.018 29.9615 103.504C28.4758 104.99 26.2885 105.732 23.3996 105.732H8.85215ZM55.7755 105.732C52.8041 105.732 50.5756 104.99 49.0899 103.504C47.6042 102.018 46.8613 99.7896 46.8613 96.8182V8.85228C46.8613 5.92215 47.6042 3.71423 49.0899 2.22853C50.5756 0.742826 52.8041 -2.42293e-05 55.7755 -2.42293e-05H70.1992C73.1706 -2.42293e-05 75.3992 0.722192 76.8849 2.16662C78.3706 3.61106 79.1134 5.83961 79.1134 8.85228V96.8182C79.1134 99.7896 78.3706 102.018 76.8849 103.504C75.3992 104.99 73.1706 105.732 70.1992 105.732H55.7755Z"},play:{vb:"0 0 96 108",d:"M0.000898089 97.499V10.0903C0.000898089 6.6649 0.867557 4.12683 2.60088 2.47605C4.33419 0.825269 6.39767 -0.000120815 8.7913 -0.000120815C10.9373 -0.000120815 13.0833 0.598287 15.2293 1.7951L88.3382 44.509C90.9795 46.036 92.8779 47.4804 94.0334 48.8423C95.2302 50.2042 95.8286 51.855 95.8286 53.7947C95.8286 55.693 95.2302 57.3438 94.0334 58.747C92.8779 60.1089 90.9795 61.5533 88.3382 63.0803L15.2293 105.794C13.0833 106.991 10.9373 107.589 8.7913 107.589C6.39767 107.589 4.33419 106.743 2.60088 105.051C0.867557 103.401 0.000898089 100.883 0.000898089 97.499Z"},back5:{vb:"0 0 128 140",d:"M63.9479 139.47C55.1162 139.47 46.8417 137.799 39.1243 134.456C31.4069 131.154 24.618 126.574 18.7578 120.713C12.8975 114.853 8.29596 108.064 4.95313 100.347C1.65157 92.6294 0.000793498 84.3548 0.000793498 75.5232C0.000793498 68.755 1.0119 62.2757 3.0341 56.0852C5.05631 49.8948 7.92453 44.179 11.6388 38.9378C15.3943 33.6965 19.8308 29.1156 24.9482 25.195C26.5577 23.7919 28.2704 23.2141 30.0862 23.4617C31.9021 23.6681 33.3259 24.4728 34.3576 25.876C35.4719 27.4442 35.8433 29.0537 35.4719 30.7045C35.1005 32.3553 34.1719 33.7997 32.6862 35.0378C28.6418 38.133 25.1133 41.7854 22.1006 45.9949C19.0879 50.1631 16.7562 54.744 15.1054 59.7376C13.4546 64.6899 12.6293 69.9518 12.6293 75.5232C12.6293 82.6215 13.9499 89.2659 16.5911 95.4563C19.2736 101.647 22.9673 107.094 27.672 111.799C32.3767 116.504 37.8243 120.177 44.0147 122.818C50.2464 125.501 56.8908 126.842 63.9479 126.842C71.0462 126.842 77.6906 125.501 83.881 122.818C90.0714 120.177 95.519 116.504 100.224 111.799C104.97 107.094 108.663 101.647 111.305 95.4563C113.946 89.2659 115.266 82.6215 115.266 75.5232C115.266 69.4978 114.297 63.8026 112.357 58.4376C110.459 53.0313 107.755 48.1409 104.248 43.7663C100.781 39.3917 96.6952 35.6775 91.9905 32.6235C87.327 29.5283 82.2302 27.2585 76.7001 25.8141V33.9235C76.7001 35.4092 76.3493 36.5441 75.6478 37.3283C74.9874 38.0711 74.1208 38.4425 73.0478 38.4425C72.016 38.4013 70.9224 37.9679 69.7669 37.1425L49.7718 22.7808C48.3686 21.7903 47.6464 20.6141 47.6051 19.2522C47.6051 17.8903 48.3274 16.7142 49.7718 15.7237L69.705 1.3C70.9018 0.474611 72.016 0.0619159 73.0478 0.0619159C74.1208 0.0206464 74.9874 0.392072 75.6478 1.17619C76.3493 1.91904 76.7001 3.05395 76.7001 4.58092V12.8761C83.9223 14.3205 90.6492 16.9205 96.8809 20.676C103.113 24.4315 108.56 29.1156 113.224 34.7283C117.887 40.2997 121.498 46.552 124.057 53.4853C126.657 60.4185 127.957 67.7645 127.957 75.5232C127.957 84.3548 126.285 92.6294 122.943 100.347C119.641 108.064 115.06 114.853 109.2 120.713C103.34 126.574 96.5301 131.154 88.7715 134.456C81.0541 137.799 72.7795 139.47 63.9479 139.47ZM64.1955 101.09C61.3479 101.09 58.5622 100.347 55.8384 98.8611C53.1146 97.3341 51.2988 95.2293 50.3908 92.5468C50.1019 92.1341 49.875 91.6595 49.7099 91.123C49.5448 90.5865 49.4623 90.05 49.4623 89.5135C49.4623 88.358 49.7924 87.45 50.4527 86.7897C51.1543 86.0882 52.0829 85.7374 53.2384 85.7374C55.0543 85.7374 56.3955 86.6453 57.2622 88.4611C57.8812 89.9469 58.7479 91.1849 59.8622 92.1754C61.0177 93.1659 62.4209 93.6611 64.0717 93.6611C66.3002 93.6611 67.9923 92.7532 69.1478 90.9373C70.3446 89.1215 70.943 86.9754 70.943 84.4993C70.943 82.2295 70.3859 80.2073 69.2716 78.4327C68.1573 76.6168 66.4653 75.7089 64.1955 75.7089C62.9987 75.7089 61.9257 75.9978 60.9765 76.5755C60.0685 77.112 59.2638 77.8549 58.5622 78.8041C57.9431 79.5057 57.3241 80.0422 56.7051 80.4136C56.1273 80.785 55.3432 80.9707 54.3527 80.9707C52.867 80.9707 51.7527 80.4961 51.0099 79.5469C50.3083 78.5565 49.9988 77.339 50.0813 75.8946L51.2575 58.4376C51.4638 54.971 53.1765 53.2376 56.3955 53.2376H74.224C75.3382 53.2376 76.2255 53.5884 76.8858 54.29C77.5462 54.9916 77.8763 55.8995 77.8763 57.0138C77.8763 58.0868 77.5462 58.9741 76.8858 59.6757C76.2255 60.3773 75.3382 60.7281 74.224 60.7281H58.9336L58.0051 74.0994H58.2527C59.0368 72.4899 60.2336 71.2518 61.8431 70.3851C63.4526 69.4772 65.2685 69.0232 67.2907 69.0232C71.2938 69.0232 74.389 70.5502 76.5763 73.6041C78.8049 76.6168 79.9191 80.166 79.9191 84.2517C79.9191 89.1215 78.4954 93.1452 75.6478 96.323C72.8414 99.5007 69.024 101.09 64.1955 101.09Z"},fwd5:{vb:"0 0 128 140",d:"M63.9479 139.47C55.1162 139.47 46.8417 137.799 39.1243 134.456C31.4069 131.154 24.618 126.574 18.7578 120.713C12.8975 114.853 8.29596 108.064 4.95313 100.347C1.65157 92.6294 0.000793498 84.3548 0.000793498 75.5232C0.000793498 67.7645 1.30078 60.4185 3.90076 53.4853C6.50074 46.552 10.1118 40.2997 14.734 34.7283C19.3975 29.1156 24.8244 24.4315 31.0148 20.676C37.2465 16.9205 43.9941 14.3205 51.2575 12.8761V4.58092C51.2575 3.05395 51.5876 1.91904 52.248 1.17619C52.9083 0.392072 53.7749 0.0206464 54.8479 0.0619159C55.9209 0.0619159 57.0352 0.474611 58.1908 1.3L78.1858 15.7237C79.589 16.7142 80.2699 17.8903 80.2287 19.2522C80.2287 20.6141 79.5477 21.7903 78.1858 22.7808L58.1289 37.1425C56.9733 37.9679 55.859 38.4013 54.786 38.4425C53.7543 38.4425 52.9083 38.0711 52.248 37.3283C51.5876 36.5441 51.2575 35.4092 51.2575 33.9235V25.8141C45.7274 27.2585 40.61 29.5283 35.9052 32.6235C31.2005 35.6775 27.1148 39.3917 23.6482 43.7663C20.1816 48.1409 17.4784 53.0313 15.5388 58.4376C13.5991 63.8026 12.6293 69.4978 12.6293 75.5232C12.6293 82.6215 13.9499 89.2659 16.5911 95.4563C19.2736 101.647 22.9673 107.094 27.672 111.799C32.3767 116.504 37.8243 120.177 44.0147 122.818C50.2464 125.501 56.8908 126.842 63.9479 126.842C71.0462 126.842 77.6906 125.501 83.881 122.818C90.0714 120.177 95.519 116.504 100.224 111.799C104.97 107.094 108.663 101.647 111.305 95.4563C113.946 89.2659 115.266 82.6215 115.266 75.5232C115.266 69.9518 114.441 64.6899 112.79 59.7376C111.14 54.744 108.808 50.1631 105.795 45.9949C102.824 41.7854 99.2952 38.133 95.2095 35.0378C93.7651 33.7997 92.8571 32.3553 92.4857 30.7045C92.1143 29.0537 92.4651 27.4442 93.5381 25.876C94.5698 24.4728 95.9936 23.6681 97.8095 23.4617C99.6253 23.2141 101.338 23.7919 102.948 25.195C108.065 29.1156 112.481 33.6965 116.195 38.9378C119.951 44.179 122.839 49.8948 124.862 56.0852C126.925 62.2757 127.957 68.755 127.957 75.5232C127.957 84.3548 126.285 92.6294 122.943 100.347C119.641 108.064 115.06 114.853 109.2 120.713C103.34 126.574 96.5301 131.154 88.7715 134.456C81.0541 137.799 72.7795 139.47 63.9479 139.47ZM64.1955 101.09C61.3479 101.09 58.5622 100.347 55.8384 98.8611C53.1146 97.3341 51.2988 95.2293 50.3908 92.5468C50.1019 92.1341 49.875 91.6595 49.7099 91.123C49.5448 90.5865 49.4623 90.05 49.4623 89.5135C49.4623 88.358 49.7924 87.45 50.4527 86.7897C51.1543 86.0882 52.0829 85.7374 53.2384 85.7374C55.0543 85.7374 56.3955 86.6453 57.2622 88.4611C57.8812 89.9469 58.7479 91.1849 59.8622 92.1754C61.0177 93.1659 62.4209 93.6611 64.0717 93.6611C66.3002 93.6611 67.9923 92.7532 69.1478 90.9373C70.3446 89.1215 70.943 86.9754 70.943 84.4993C70.943 82.2295 70.3859 80.2073 69.2716 78.4327C68.1573 76.6168 66.4653 75.7089 64.1955 75.7089C62.9987 75.7089 61.9257 75.9978 60.9765 76.5755C60.0685 77.112 59.2638 77.8549 58.5622 78.8041C57.9431 79.5057 57.3241 80.0422 56.7051 80.4136C56.1273 80.785 55.3432 80.9707 54.3527 80.9707C52.867 80.9707 51.7527 80.4961 51.0099 79.5469C50.3083 78.5565 49.9988 77.339 50.0813 75.8946L51.2575 58.4376C51.4638 54.971 53.1765 53.2376 56.3955 53.2376H74.224C75.3382 53.2376 76.2255 53.5884 76.8858 54.29C77.5462 54.9916 77.8763 55.8995 77.8763 57.0138C77.8763 58.0868 77.5462 58.9741 76.8858 59.6757C76.2255 60.3773 75.3382 60.7281 74.224 60.7281H58.9336L58.0051 74.0994H58.2527C59.0368 72.4899 60.2336 71.2518 61.8431 70.3851C63.4526 69.4772 65.2685 69.0232 67.2907 69.0232C71.2938 69.0232 74.389 70.5502 76.5763 73.6041C78.8049 76.6168 79.9191 80.166 79.9191 84.2517C79.9191 89.1215 78.4954 93.1452 75.6478 96.323C72.8414 99.5007 69.024 101.09 64.1955 101.09Z"},transcribe:{vb:"0 0 129 110",d:"M6.32303 12.9527C4.6042 12.9527 3.11045 12.3183 1.84179 11.0497C0.614051 9.78102 0.000182331 8.26681 0.000182331 6.50706C0.000182331 4.7473 0.614051 3.23309 1.84179 1.96443C3.06953 0.654841 4.56327 4.71473e-05 6.32303 4.71473e-05H122.344C124.145 4.71473e-05 125.659 0.634378 126.887 1.90304C128.156 3.1717 128.79 4.70637 128.79 6.50706C128.79 8.26681 128.156 9.78102 126.887 11.0497C125.618 12.3183 124.104 12.9527 122.344 12.9527H6.32303ZM6.32303 45.1194C4.6042 45.1194 3.11045 44.4851 1.84179 43.2164C0.614051 41.9068 0.000182331 40.3722 0.000182331 38.6124C0.000182331 36.8526 0.614051 35.3384 1.84179 34.0698C3.06953 32.8011 4.56327 32.1668 6.32303 32.1668H76.4882C78.2889 32.1668 79.8031 32.8011 81.0309 34.0698C82.2586 35.2975 82.8725 36.8117 82.8725 38.6124C82.8725 40.3722 82.2586 41.9068 81.0309 43.2164C79.8031 44.4851 78.2889 45.1194 76.4882 45.1194H6.32303ZM6.32303 77.2247C4.6042 77.2247 3.11045 76.5904 1.84179 75.3218C0.614051 74.0122 0.000182331 72.498 0.000182331 70.7791C0.000182331 69.0194 0.614051 67.5052 1.84179 66.2365C3.06953 64.9269 4.56327 64.2721 6.32303 64.2721H122.344C124.145 64.2721 125.659 64.9064 126.887 66.1751C128.156 67.4438 128.79 68.9784 128.79 70.7791C128.79 72.498 128.156 74.0122 126.887 75.3218C125.618 76.5904 124.104 77.2247 122.344 77.2247H6.32303ZM6.32303 109.33C4.6042 109.33 3.11045 108.696 1.84179 107.427C0.614051 106.158 0.000182331 104.644 0.000182331 102.884C0.000182331 101.125 0.614051 99.6105 1.84179 98.3418C3.06953 97.0322 4.56327 96.3775 6.32303 96.3775H76.4882C78.2889 96.3775 79.8031 97.0118 81.0309 98.2804C82.2586 99.5491 82.8725 101.084 82.8725 102.884C82.8725 104.644 82.2586 106.158 81.0309 107.427C79.8031 108.696 78.2889 109.33 76.4882 109.33H6.32303Z"},photo:{vb:"0 0 147 116",d:"M140.213 91.9896C140.461 97.9737 139.057 102.534 136.004 105.67C132.95 108.807 128.307 110.375 122.075 110.375H21.7902C16.6315 110.375 12.7316 108.91 10.0903 105.98C7.44908 103.05 6.04592 98.7165 5.88084 92.9801L29.2187 72.0564C30.4981 70.8596 31.7774 69.993 33.0568 69.4565C34.3774 68.8787 35.7599 68.5898 37.2044 68.5898C38.6488 68.5898 40.0726 68.8993 41.4758 69.5184C42.9202 70.0961 44.2821 70.9628 45.5615 72.1183L57.0137 82.4564L84.9325 57.447C86.377 56.209 87.8627 55.2804 89.3896 54.6614C90.9166 54.0423 92.5261 53.7328 94.2182 53.7328C95.869 53.7328 97.4785 54.0629 99.0467 54.7233C100.656 55.3423 102.142 56.2915 103.504 57.5709L140.213 91.9896ZM47.9757 58.9327C45.2519 58.9327 42.7551 58.2724 40.4853 56.9518C38.2568 55.6312 36.4615 53.836 35.0996 51.5661C33.779 49.2963 33.1187 46.7995 33.1187 44.0757C33.1187 41.3932 33.779 38.917 35.0996 36.6472C36.4615 34.3774 38.2568 32.5822 40.4853 31.2616C42.7551 29.8997 45.2519 29.2187 47.9757 29.2187C50.6995 29.2187 53.1757 29.8997 55.4042 31.2616C57.6328 32.5822 59.4074 34.3774 60.728 36.6472C62.0899 38.917 62.7708 41.3932 62.7708 44.0757C62.7708 46.7995 62.0899 49.2963 60.728 51.5661C59.4074 53.836 57.6328 55.6312 55.4042 56.9518C53.1757 58.2724 50.6995 58.9327 47.9757 58.9327ZM20.3045 115.575C13.6189 115.575 8.56336 113.883 5.13799 110.499C1.71262 107.115 -5.93998e-05 102.121 -5.93998e-05 95.5181V20.1188C-5.93998e-05 13.5157 1.71262 8.52207 5.13799 5.13797C8.56336 1.71261 13.6189 -7.71843e-05 20.3045 -7.71843e-05H126.285C133.011 -7.71843e-05 138.088 1.71261 141.513 5.13797C144.938 8.52207 146.651 13.5157 146.651 20.1188V95.5181C146.651 102.121 144.938 107.115 141.513 110.499C138.088 113.883 133.011 115.575 126.285 115.575H20.3045ZM21.0474 103.442H125.604C128.451 103.442 130.638 102.699 132.165 101.213C133.692 99.6864 134.456 97.4372 134.456 94.4658V21.1712C134.456 18.1998 133.692 15.9712 132.165 14.4855C130.638 12.9585 128.451 12.1951 125.604 12.1951H21.0474C18.1585 12.1951 15.9506 12.9585 14.4236 14.4855C12.9379 15.9712 12.1951 18.1998 12.1951 21.1712V94.4658C12.1951 97.4372 12.9379 99.6864 14.4236 101.213C15.9506 102.699 18.1585 103.442 21.0474 103.442Z"},download:{vb:"0 0 96 131",d:"M95.8904 69.5804C95.8904 71.4376 95.1889 73.0884 93.7857 74.5328L52.9908 115.39C52.3305 116.091 51.5464 116.628 50.6384 116.999C49.7718 117.371 48.8845 117.556 47.9766 117.556C47.0274 117.556 46.1194 117.371 45.2528 116.999C44.3861 116.628 43.602 116.091 42.9004 115.39L2.10553 74.5328C0.702369 73.0884 0.000787463 71.4376 0.000787463 69.5804C0.000787463 67.6821 0.61983 66.1138 1.85791 64.8757C3.096 63.6376 4.6436 63.0186 6.50073 63.0186C7.44993 63.0186 8.33722 63.2043 9.16261 63.5757C9.988 63.9059 10.7102 64.3805 11.3293 64.9995L25.3815 78.8661L46.0575 101.894L41.9099 103.937L41.1671 83.6946V6.80956C41.1671 4.82863 41.7861 3.19848 43.0242 1.91913C44.3036 0.639775 45.9544 9.75393e-05 47.9766 9.75393e-05C49.9575 9.75393e-05 51.567 0.639775 52.8051 1.91913C54.0844 3.19848 54.7241 4.82863 54.7241 6.80956V83.6946L53.9813 103.937L49.8956 101.894L70.5097 78.8661L84.562 64.9995C85.181 64.3805 85.9032 63.9059 86.7286 63.5757C87.554 63.2043 88.4413 63.0186 89.3905 63.0186C91.2476 63.0186 92.7952 63.6376 94.0333 64.8757C95.2714 66.1138 95.8904 67.6821 95.8904 69.5804ZM95.8904 124.18C95.8904 126.12 95.2714 127.729 94.0333 129.009C92.7952 130.288 91.2476 130.928 89.3905 130.928H6.62454C4.68487 130.928 3.096 130.288 1.85791 129.009C0.61983 127.729 0.000787463 126.12 0.000787463 124.18C0.000787463 122.282 0.61983 120.693 1.85791 119.413C3.096 118.175 4.68487 117.556 6.62454 117.556H89.3905C91.2476 117.556 92.7952 118.175 94.0333 119.413C95.2714 120.693 95.8904 122.282 95.8904 124.18Z"},external:{vb:"0 0 94 94",d:"M93.3516 69.3946C93.3516 71.4168 92.6706 73.1089 91.3087 74.4708C89.9468 75.8327 88.358 76.5136 86.5421 76.5136C84.685 76.5136 83.1167 75.8327 81.8374 74.4708C80.558 73.0676 79.9183 71.4375 79.9183 69.5803V46.4282L80.9088 20.9236L70.8803 32.1902L11.8856 91.1849C10.4412 92.5881 8.81103 93.2897 6.99517 93.2897C5.75709 93.2897 4.60154 92.9595 3.52853 92.2992C2.4968 91.6802 1.65077 90.8341 0.990462 89.7611C0.33015 88.6881 -5.99399e-06 87.5532 -5.99399e-06 86.3564C-5.99399e-06 84.5818 0.742845 82.9517 2.22855 81.466L61.0995 22.4093L72.366 12.5047L45.7472 13.4332H23.7093C21.8522 13.4332 20.2427 12.7935 18.8808 11.5142C17.5189 10.1936 16.8379 8.62532 16.8379 6.80946C16.8379 4.99361 17.4983 3.40473 18.8189 2.04284C20.1395 0.680944 21.8316 -2.21282e-06 23.895 -2.21282e-06H86.0469C88.2754 -2.21282e-06 90.0294 0.680944 91.3087 2.04284C92.6294 3.36346 93.2897 5.09678 93.2897 7.24279L93.3516 69.3946Z"},copy:{vb:"0 0 357 434",d:"M84.836 99.0311V57.2893C84.836 38.5872 89.6242 24.3916 99.2006 14.7026C108.89 4.90083 123.029 -2.4721e-05 141.618 -2.4721e-05H204.147C214.512 -2.4721e-05 223.75 1.4646 231.862 4.39385C239.974 7.3231 247.297 12.1676 253.831 18.9274L337.315 103.932C344.187 111.03 349.032 118.635 351.848 126.746C354.665 134.858 356.073 144.716 356.073 156.32V287.799C356.073 306.388 351.229 320.584 341.54 330.385C331.963 340.187 317.88 345.088 299.291 345.088H264.985V307.402H295.404C303.065 307.402 308.811 305.487 312.641 301.656C316.472 297.713 318.387 292.024 318.387 284.588V148.04H247.24C236.425 148.04 228.031 145.11 222.06 139.252C216.202 133.393 213.272 125 213.272 114.072V37.6859H145.505C137.731 37.6859 131.929 39.6575 128.099 43.6007C124.381 47.4313 122.522 53.0644 122.522 60.5002V99.0311H84.836ZM243.353 109.847C243.353 112.776 243.973 114.917 245.212 116.269C246.564 117.508 248.649 118.128 251.465 118.128H308.586L243.353 51.8815V109.847ZM0.00046517 376.183V145.674C0.00046517 127.084 4.78866 112.945 14.3651 103.256C24.0541 93.4543 38.1934 88.5534 56.7828 88.5534H115.086C125.789 88.5534 134.69 89.6801 141.787 91.9333C148.885 94.1866 155.983 98.9748 163.081 106.298L253.493 197.893C258.338 202.85 261.999 207.639 264.478 212.258C267.069 216.877 268.815 222.003 269.717 227.636C270.731 233.157 271.238 239.804 271.238 247.578V376.183C271.238 394.885 266.393 409.081 256.704 418.77C247.015 428.572 232.932 433.472 214.455 433.472H56.7828C38.1934 433.472 24.0541 428.572 14.3651 418.77C4.78866 409.081 0.00046517 394.885 0.00046517 376.183ZM37.5174 372.972C37.5174 380.408 39.4327 386.098 43.2632 390.041C47.0938 393.984 52.8396 395.956 60.5007 395.956H210.568C218.342 395.956 224.088 393.984 227.806 390.041C231.636 386.098 233.552 380.408 233.552 372.972V253.493H148.885C135.816 253.493 126.014 250.282 119.48 243.86C113.058 237.438 109.847 227.636 109.847 214.455V126.07H60.6697C52.8959 126.07 47.0938 128.042 43.2632 131.985C39.4327 135.928 37.5174 141.562 37.5174 148.885V372.972ZM152.265 221.553H229.496L141.956 132.83V211.244C141.956 214.849 142.745 217.497 144.322 219.187C146.012 220.764 148.66 221.553 152.265 221.553Z"},sheet:{vb:"0 0 107 135",d:"M75.1512 75.4613C76.2655 75.4613 77.194 75.8327 77.9369 76.5756C78.6797 77.3184 79.0511 78.247 79.0511 79.3613C79.0511 80.4756 78.6797 81.4248 77.9369 82.2089C77.194 82.9517 76.2655 83.3232 75.1512 83.3232H29.8373C28.6817 83.3232 27.7119 82.9517 26.9278 82.2089C26.1849 81.4248 25.8135 80.4756 25.8135 79.3613C25.8135 78.247 26.1849 77.3184 26.9278 76.5756C27.7119 75.8327 28.6817 75.4613 29.8373 75.4613H75.1512ZM75.1512 96.1992C76.2655 96.1992 77.194 96.5913 77.9369 97.3754C78.6797 98.1595 79.0511 99.1087 79.0511 100.223C79.0511 101.296 78.6797 102.204 77.9369 102.947C77.194 103.69 76.2655 104.061 75.1512 104.061H29.8373C28.6817 104.061 27.7119 103.69 26.9278 102.947C26.1849 102.204 25.8135 101.296 25.8135 100.223C25.8135 99.1087 26.1849 98.1595 26.9278 97.3754C27.7119 96.5913 28.6817 96.1992 29.8373 96.1992H75.1512ZM20.1183 134.023C13.4739 134.023 8.4597 132.31 5.0756 128.885C1.6915 125.459 -0.000547681 120.404 -0.000547681 113.718V20.3047C-0.000547681 13.6603 1.6915 8.62539 5.0756 5.20003C8.4597 1.73339 13.4739 7.01696e-05 20.1183 7.01696e-05H49.9562C52.5561 7.01696e-05 54.826 0.185783 56.7656 0.557208C58.7053 0.887364 60.5005 1.52704 62.1513 2.47624C63.8021 3.38417 65.4941 4.72543 67.2274 6.50001L99.6653 39.495C101.481 41.3108 102.843 43.0648 103.751 44.7568C104.7 46.4076 105.34 48.2441 105.67 50.2663C106 52.2472 106.165 54.6821 106.165 57.571V113.718C106.165 120.363 104.473 125.397 101.089 128.823C97.705 132.289 92.6907 134.023 86.0463 134.023H20.1183ZM21.1088 121.828H85.0559C88.0685 121.828 90.3177 121.064 91.8034 119.537C93.2891 118.01 94.032 115.823 94.032 112.975V59.2424H60.6656C56.2498 59.2424 52.9482 58.1488 50.7609 55.9615C48.6149 53.7742 47.5419 50.4726 47.5419 46.0568V12.1333H21.1707C18.158 12.1333 15.9088 12.9174 14.4231 14.4857C12.9374 16.0539 12.1946 18.2618 12.1946 21.1094V112.975C12.1946 115.823 12.9374 118.01 14.4231 119.537C15.9088 121.064 18.1374 121.828 21.1088 121.828ZM61.8418 48.533H92.3606L58.2513 13.8047V44.8806C58.2513 46.16 58.5196 47.0886 59.0561 47.6663C59.6339 48.2441 60.5624 48.533 61.8418 48.533Z"}},o={link:{vb:"3.74 3.74 16.51 16.51",inner:'<path d="M10.4 13.6a3.6 3.6 0 0 0 5.1 0l2.9-2.9a3.6 3.6 0 0 0-5.1-5.1l-1.3 1.3"/><path d="M13.6 10.4a3.6 3.6 0 0 0-5.1 0l-2.9 2.9a3.6 3.6 0 0 0 5.1 5.1l1.3-1.3"/>'},caption:{vb:"4.20 6.20 15.60 11.60",inner:'<path d="M5 7h14M5 12h14M5 17h9"/>'},check:{vb:"4.20 6.70 15.60 11.10",inner:'<path d="M5 12.5l4.5 4.5L19 7.5"/>'}},r={views:"views",likes:"likes",comments:"comments",shares:"shares",saves:"saves",outlier:"outlier"},a={photo:.82,transcribe:.92,comments:.93,outlier:1.1};function i(h){let b=v("span","sf-pl-ico",c(h)),w=e&&e.icoScale?e.icoScale[h]:void 0,C=w!==void 0?w:a[h],E=C&&b.firstElementChild;if(E){let R=(C*100).toFixed(1)+"%";E.style.width=R,E.style.height=R}return b}function c(h){let b=o[h];if(b)return b.fill?'<svg viewBox="'+b.vb+'" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">'+b.inner+"</svg>":'<svg viewBox="'+b.vb+'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">'+b.inner+"</svg>";let w=r[h];if(w){let E=null;try{E=xt[w]}catch{E=null}if(E&&E.vb&&E.icon)return'<svg viewBox="'+E.vb+'" xmlns="http://www.w3.org/2000/svg">'+E.icon+"</svg>"}let C=n[h]||(e&&e.icons?e.icons[h]:null);return C?'<svg viewBox="'+C.vb+'" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="'+C.d+'"/></svg>':""}let l=[.5,.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3],u=[],p=0,f=null,d=1,m="sortfeed_player_muted",g="sortfeed_ig_player_muted",k=!1;try{typeof chrome<"u"&&chrome.storage?.local&&(chrome.storage.local.get([m,g],h=>{h&&(typeof h[m]=="boolean"?k=h[m]:h[g]===!0&&(k=!0))}),chrome.storage.onChanged.addListener(h=>{m in h&&(k=h[m].newValue===!0,O())}))}catch{}let _=null,y=0,x=null;function L(h){if(h==null||Number.isNaN(+h))return"\u2014";let b=Number(h);return b<1e3?String(b):b<1e6?(b/1e3).toFixed(1).replace(/\.0$/,"")+"K":b<1e9?(b/1e6).toFixed(1).replace(/\.0$/,"")+"M":(b/1e9).toFixed(1).replace(/\.0$/,"")+"B"}function I(h){if(!h)return"";let b=new Date(h.includes("T")?h:h+"T12:00:00");if(Number.isNaN(b.getTime()))return"";let w=R=>new Date(R.getFullYear(),R.getMonth(),R.getDate()).getTime(),C=Math.round((w(new Date)-w(b))/864e5);if(C<=0)return"Today";if(C===1)return"Yesterday";if(C<7)return C+" days ago";if(C<14)return"1 week ago";if(C<60)return Math.floor(C/7)+" weeks ago";if(C<365)return Math.floor(C/30)+" months ago";let E=Math.floor(C/365);return E===1?"1 year ago":E+" years ago"}function q(h){if(h==null||!Number.isFinite(h))return"--:--";let b=Math.floor(h/60),w=Math.floor(h%60);return b+":"+String(w).padStart(2,"0")}function v(h,b,w){let C=document.createElement(h);return b&&(C.className=b),w!==void 0&&(C.innerHTML=w),C}function M(){if(document.getElementById("sf-player-style"))return;let h=document.createElement("style");h.id="sf-player-style",h.textContent=`
  #sf-player-overlay{
    --sf-ink:#111; --sf-text:#1f1f1f; --sf-muted:#8a8a8a; --sf-faint:#adadad;
    --sf-line:#ececec; --sf-line2:#e2e2e2; --sf-sunk:#f7f7f7; --sf-hover:#f1f1f1;
    --sf-ghost:#c2c2c2; --sf-glyph:#8f8f8f; --sf-card:#fff;
    --sf-stage:#f2f2f2; --sf-menu:#fff;
    position:fixed; inset:0; z-index:2147482000;
    display:flex; align-items:center; justify-content:center;
    background:rgba(16,16,16,.34);
    -webkit-backdrop-filter:blur(2px); backdrop-filter:blur(2px);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing:antialiased;
    color:var(--sf-text);
    animation:sfPlFade .16s ease;
  }
  @keyframes sfPlFade{from{opacity:0}to{opacity:1}}
  @keyframes sfPlRise{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
  @keyframes sfPlNavNext{from{opacity:.4;transform:translateX(7px)}to{opacity:1;transform:none}}
  @keyframes sfPlNavPrev{from{opacity:.4;transform:translateX(-7px)}to{opacity:1;transform:none}}
  @keyframes sfPlMenuIn{from{opacity:0;transform:translateY(-4px) scale(.98)}to{opacity:1;transform:none}}
  @keyframes sfPlMenuOut{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-2px) scale(.985)}}
  #sf-player-overlay .sf-pl-card.sf-next .sf-pl-stage,
  #sf-player-overlay .sf-pl-card.sf-next .sf-pl-right{
    animation:sfPlNavNext .15s cubic-bezier(.2,.7,.3,1);
  }
  #sf-player-overlay .sf-pl-card.sf-prev .sf-pl-stage,
  #sf-player-overlay .sf-pl-card.sf-prev .sf-pl-right{
    animation:sfPlNavPrev .15s cubic-bezier(.2,.7,.3,1);
  }
  @media (prefers-reduced-motion:reduce){
    #sf-player-overlay .sf-pl-card,
    #sf-player-overlay .sf-pl-card.sf-next .sf-pl-stage,
    #sf-player-overlay .sf-pl-card.sf-next .sf-pl-right,
    #sf-player-overlay .sf-pl-card.sf-prev .sf-pl-stage,
    #sf-player-overlay .sf-pl-card.sf-prev .sf-pl-right,
    #sf-player-overlay .sf-pl-omenu,
    #sf-player-overlay .sf-pl-omenu.sf-closing,
    #sf-player-overlay .sf-pl-stage .sf-pl-poster.sf-slide-next,
    #sf-player-overlay .sf-pl-stage .sf-pl-poster.sf-slide-prev,
    #sf-player-overlay .sf-pl-stage video.sf-slide-next,
    #sf-player-overlay .sf-pl-stage video.sf-slide-prev,
    #sf-player-overlay .sf-pl-stage.sf-slidewait .sf-pl-dots i.sf-on{animation:none}
  }

  /* \u2500\u2500 Resets: 1-0-1, above IG's bare element rules, below our components \u2500\u2500 */
  #sf-player-overlay div,
  #sf-player-overlay span,
  #sf-player-overlay button,
  #sf-player-overlay p,
  #sf-player-overlay img,
  #sf-player-overlay video{box-sizing:border-box; margin:0; padding:0}
  #sf-player-overlay button{
    font:inherit; color:inherit; background:transparent; border:0;
    cursor:pointer; -webkit-appearance:none; appearance:none;
    letter-spacing:normal; text-transform:none;
  }
  #sf-player-overlay button:focus{outline:none; box-shadow:none}
  #sf-player-overlay button:focus-visible{outline:1.5px solid var(--sf-glyph); outline-offset:2px}
  #sf-player-overlay svg{width:100%; height:100%; display:block}

  /* \u2500\u2500 Card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  #sf-player-overlay .sf-pl-card{
    /* 9:16 \u2014 a phone-shot reel, not a landscape video. */
    --sf-pl-h:clamp(440px, 89vh, 680px);
    height:var(--sf-pl-h);
    display:grid; grid-template-columns:calc((var(--sf-pl-h) - 2px) * 9 / 16) 330px;
    background:var(--sf-card);
    border:1px solid var(--sf-line); border-radius:14px; overflow:hidden;
    box-shadow:0 20px 56px rgba(0,0,0,.17), 0 2px 6px rgba(0,0,0,.05);
  }
  #sf-player-overlay .sf-pl-card.sf-in{
    animation:sfPlRise .22s cubic-bezier(.2,.7,.3,1);
  }

  /* \u2500\u2500 Stage \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  #sf-player-overlay .sf-pl-stage{
    position:relative; height:100%; background:var(--sf-stage); overflow:hidden;
    display:flex; align-items:center; justify-content:center;
    border-right:1px solid var(--sf-line);
  }
  #sf-player-overlay .sf-pl-stage img.sf-pl-poster,
  #sf-player-overlay .sf-pl-stage video{
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover; display:block;
  }
  #sf-player-overlay .sf-pl-vctl{
    position:absolute; left:0; right:0; bottom:0; padding:19px 12px 18px;
    background:linear-gradient(
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,.12) 28%,
      rgba(0,0,0,.55) 60%,
      rgba(0,0,0,.85) 100%);
    opacity:1; transition:opacity .2s ease;
  }
  #sf-player-overlay .sf-pl-stage.sf-playing .sf-pl-vctl{opacity:0}
  #sf-player-overlay .sf-pl-stage.sf-playing:hover .sf-pl-vctl{opacity:1}

  /* \u2500\u2500 Loading choreography (PLAYER_PLAN_REELS Phase B) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Phase 1 (.sf-loading): poster is up, controls at half strength and inert,
     duration reads --:--. The state the stage MOUNTS in.
     Phase 2 (.sf-slowload, added only if still loading at 0.4s): the track
     line breathes \u2014 the single moving element. Most loads never get here.
     Phase 3 (ready): both classes drop, controls fade to full over 150ms. */
  #sf-player-overlay .sf-pl-stage.sf-loading .sf-pl-vrow{
    opacity:.5; pointer-events:none;
    transition:opacity .15s ease;
  }
  #sf-player-overlay .sf-pl-stage .sf-pl-vrow{transition:opacity .15s ease}
  #sf-player-overlay .sf-pl-stage.sf-loading .sf-pl-track{pointer-events:none}
  #sf-player-overlay .sf-pl-time{transition:opacity .18s ease}
  #sf-player-overlay .sf-pl-stage.sf-loading .sf-pl-time{opacity:0}
  /* Loading pulse: the EMPTY track (::before \u2014 the fill is a separate
     element and never pulses) breathes between full and 40% opacity on a slow
     loop. Nothing blurs, nothing moves \u2014 this is the only element that
     changes. Gated behind the 0.4s sf-slowload timer so fast loads never
     flash it, and it stops the moment canplay drops the class. */
  @keyframes sfPlTrackBreathe{
    0%,100%{opacity:1} 50%{opacity:.55}
  }
  #sf-player-overlay .sf-pl-stage.sf-slowload .sf-pl-track{
    background:rgba(255,255,255,.5);
    animation:sfPlTrackBreathe 1.4s ease-in-out infinite;
  }
  /* \u2500\u2500 Carousel chrome (reference design: .snav / .dots) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  /* Notion-register slide nav: small soft discs, quiet grey chevron
     (player_icons/chevron_*.svg), gentle shadow; the reference's 30px circles
     read heavy over a photo. */
  #sf-player-overlay .sf-pl-snav{
    position:absolute; top:50%; transform:translateY(-50%); z-index:3;
    width:20px; height:20px; border-radius:50%;
    background:rgba(255,255,255,.6); color:rgba(25,25,25,.9);
    display:flex; align-items:center; justify-content:center;
    padding:5px; box-shadow:none;
    opacity:0; transition:opacity .16s, background .12s, color .12s;
  }
  #sf-player-overlay .sf-pl-stage:hover .sf-pl-snav{opacity:1}
  #sf-player-overlay .sf-pl-snav:hover{background:rgba(255,255,255,.85); color:#2f2f2f}
  #sf-player-overlay .sf-pl-snav.sf-l{left:8px}
  #sf-player-overlay .sf-pl-snav.sf-r{right:8px}
  /* The chevron files are geometrically centred, but a directional glyph's
     visual mass sits behind its point \u2014 nudge each toward where it points,
     same optical correction the play triangle carries. */
  #sf-player-overlay .sf-pl-snav.sf-r svg{transform:translateX(0.75px)}
  #sf-player-overlay .sf-pl-snav.sf-l svg{transform:translateX(-0.75px)}
  #sf-player-overlay .sf-pl-snav[disabled]{opacity:0 !important; pointer-events:none}
  #sf-player-overlay .sf-pl-dots{
    position:absolute; left:0; right:0; bottom:12px; z-index:3;
    display:flex; justify-content:center; gap:5px; pointer-events:none;
  }
  #sf-player-overlay .sf-pl-dots i{
    width:6px; height:6px; border-radius:50%;
    background:rgba(255,255,255,.45); transition:background .15s;
  }
  #sf-player-overlay .sf-pl-dots i.sf-on{background:#fff}
  @keyframes sfPlSlideNext{from{opacity:.35;transform:translateX(16px)}to{opacity:1;transform:none}}
  @keyframes sfPlSlidePrev{from{opacity:.35;transform:translateX(-16px)}to{opacity:1;transform:none}}
  #sf-player-overlay .sf-pl-stage .sf-pl-poster.sf-slide-next,
  #sf-player-overlay .sf-pl-stage video.sf-slide-next{
    animation:sfPlSlideNext .2s cubic-bezier(.2,.7,.3,1);
  }
  #sf-player-overlay .sf-pl-stage .sf-pl-poster.sf-slide-prev,
  #sf-player-overlay .sf-pl-stage video.sf-slide-prev{
    animation:sfPlSlidePrev .2s cubic-bezier(.2,.7,.3,1);
  }
  /* Video slide: transport is up \u2014 dots ride above it. */
  #sf-player-overlay .sf-pl-stage.sf-slide-video .sf-pl-dots{bottom:64px}

  /* \u2500\u2500 Photo loading (spec: the tile thumbnail fills the frame immediately,
     naturally soft because it IS lower-res; the full-res image cross-fades
     over it and snaps sharp. Fast loads: that's the whole event. Slow loads
     (past the 0.4s gate): the photo holds at 85% and settles to 100% when
     ready \u2014 the photo arriving, not a status). */
  #sf-player-overlay .sf-pl-stage.sf-imgwait img.sf-pl-poster{opacity:.85}
  #sf-player-overlay img.sf-pl-photofull{
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover; z-index:1; opacity:0; pointer-events:none;
    transition:opacity .2s ease;
  }
  #sf-player-overlay img.sf-pl-photofull.sf-in{opacity:1}

  /* \u2500\u2500 Slow carousel slide (past 0.4s): the ACTIVE dot breathes \u2014 it already
     means "this slide", so the indicator is positionally accurate for free \u2014
     and the arrows dim exactly like the transport row does. */
  #sf-player-overlay .sf-pl-stage.sf-slidewait .sf-pl-dots i.sf-on{
    animation:sfPlTrackBreathe 1.3s ease-in-out infinite;
  }
  #sf-player-overlay .sf-pl-stage.sf-slidewait .sf-pl-snav,
  #sf-player-overlay .sf-pl-stage.sf-slidewait:hover .sf-pl-snav{
    opacity:.5; pointer-events:none;
  }

  /* Busy toast \u2014 "finishing the current download first". Same dark pill
     voice as the scrub bubble, centered high on the stage, self-dismissing. */
  #sf-player-overlay .sf-pl-toast{
    position:absolute; top:14px; left:50%; transform:translateX(-50%);
    z-index:3; background:rgba(20,20,20,.92); color:#fff;
    font-size:12px; font-weight:500; padding:6px 11px; border-radius:7px;
    white-space:nowrap; pointer-events:none;
    animation:sfPlMenuIn .14s cubic-bezier(.2,.7,.3,1);
    transition:opacity .25s ease;
  }
  #sf-player-overlay .sf-pl-toast.sf-out{opacity:0}

  /* Error: controls stay dimmed; one quiet line low in the stage. */
  #sf-player-overlay .sf-pl-loaderr{
    position:absolute; left:0; right:0; bottom:96px;
    text-align:center; color:rgba(255,255,255,.85); font-size:12.5px;
    text-shadow:0 1px 4px rgba(0,0,0,.6); pointer-events:none;
  }
  @media (prefers-reduced-motion:reduce){
    #sf-player-overlay .sf-pl-stage.sf-slowload .sf-pl-track{
      animation:none; opacity:.7;
    }
  }

  /* \u2500\u2500 Video element (Phase C) \u2014 sits under the poster; the poster fades out
     on the first real frame so there is never a black flash. */
  #sf-player-overlay .sf-pl-stage video.sf-pl-video{
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover; display:block; background:transparent;
  }
  #sf-player-overlay .sf-pl-stage img.sf-pl-poster{
    z-index:1; transition:opacity .18s ease; pointer-events:none;
  }
  #sf-player-overlay .sf-pl-stage img.sf-pl-poster.sf-under{opacity:0}
  #sf-player-overlay .sf-pl-vctl{z-index:2}
  #sf-player-overlay .sf-pl-loaderr{z-index:2}

  #sf-player-overlay .sf-pl-track{
    position:relative; height:4px; border-radius:3px;
    background:rgba(255,255,255,.28); cursor:pointer; margin:0 2px 12px;
  }
  #sf-player-overlay .sf-pl-track::before{
    content:""; position:absolute; left:0; right:0; top:-9px; height:22px;
  }
  #sf-player-overlay .sf-pl-fill{
    position:absolute; left:0; top:0; bottom:0; width:0;
    background:#fff; border-radius:3px;
  }
  #sf-player-overlay .sf-pl-knob{
    position:absolute; top:50%; left:0; transform:translate(-50%,-50%);
    width:12px; height:12px; border-radius:50%; background:#fff;
    box-shadow:0 1px 4px rgba(0,0,0,.5); opacity:0; pointer-events:none;
    transition:opacity .12s ease;
  }
  #sf-player-overlay .sf-pl-stage:hover .sf-pl-knob{opacity:1}
  #sf-player-overlay .sf-pl-track.sf-dragging .sf-pl-knob{opacity:1}
  /* Hover ghost \u2014 a light-white preview of "if you clicked here", under the
     real fill. Hidden while dragging (the real fill tracks the pointer then). */
  #sf-player-overlay .sf-pl-hoverfill{
    position:absolute; left:0; top:0; bottom:0; width:0;
    background:rgba(255,255,255,.5); border-radius:3px;
    opacity:0; pointer-events:none; transition:opacity .12s ease;
  }
  #sf-player-overlay .sf-pl-track:hover .sf-pl-hoverfill{opacity:1}
  #sf-player-overlay .sf-pl-track.sf-dragging .sf-pl-hoverfill{opacity:0}
  /* Timestamp bubble above the cursor \u2014 the dark pill from the reference. */
  #sf-player-overlay .sf-pl-scrubtime{
    position:absolute; bottom:16px; transform:translateX(-50%);
    background:rgba(20,20,20,.92); color:#fff;
    font-size:10.5px; font-weight:600; padding:3px 6px; border-radius:5px;
    opacity:0; pointer-events:none; white-space:nowrap;
    font-variant-numeric:tabular-nums; transition:opacity .1s;
  }
  #sf-player-overlay .sf-pl-track:hover .sf-pl-scrubtime,
  #sf-player-overlay .sf-pl-track.sf-dragging .sf-pl-scrubtime{opacity:1}

  #sf-player-overlay .sf-pl-vrow{
    display:flex; align-items:center; gap:2px;
    color:rgba(255,255,255,.9); font-size:12px;
  }
  #sf-player-overlay .sf-pl-ctl{
    position:relative; width:36px; height:36px; border-radius:10px;
    background:transparent; color:#fff;
    display:flex; align-items:center; justify-content:center;
    transition:background .12s, transform .12s ease;
  }
  #sf-player-overlay .sf-pl-ctl:hover{background:rgba(255,255,255,.18)}
  #sf-player-overlay .sf-pl-ctl svg{width:17px; height:17px}
  #sf-player-overlay .sf-pl-ctl.sf-play{
    background:#fff; color:#111; width:33px; height:33px;
    border-radius:50%; margin:0 3px; box-shadow:0 1px 5px rgba(0,0,0,.28);
  }
  #sf-player-overlay .sf-pl-ctl.sf-play:hover{background:#fff; transform:scale(1.05)}
  #sf-player-overlay .sf-pl-ctl.sf-play .sf-pl-glyph{
    width:12px; height:12px; margin-left:1px;
    display:flex; align-items:center; justify-content:center;
  }
  #sf-player-overlay .sf-pl-ctl.sf-play.sf-is-pause .sf-pl-glyph{margin-left:0; padding:0.5px}
  #sf-player-overlay .sf-pl-ctl.sf-play .sf-pl-glyph svg{width:100%; height:100%}

  #sf-player-overlay .sf-pl-speedwrap{position:relative; margin-left:2px}
  /* Sized off the 1x pill beside it rather than the 36px transport buttons \u2014
     both are secondary controls and should read as a pair. */
  #sf-player-overlay .sf-pl-mute{
    position:relative; margin-left:1px; padding:8px; border-radius:9px;
    color:rgba(255,255,255,.6);
    display:flex; align-items:center; justify-content:center;
    transition:background .12s, color .12s;
  }
  #sf-player-overlay .sf-pl-mute:hover{background:rgba(255,255,255,.18); color:#fff}
  #sf-player-overlay .sf-pl-mute svg{width:13px; height:13px}
  /* mute.svg is a square canvas where speaker.svg is landscape, so the crossed
     -out state paints more ink in the same box. Trimmed to match. */
  #sf-player-overlay .sf-pl-mute.sf-muted svg{width:11.5px; height:11.5px}
  #sf-player-overlay .sf-pl-speed{
    position:relative; background:transparent; color:#fff; border-radius:9px;
    padding:7px 9px; font-size:12.5px; font-weight:600;
    font-variant-numeric:tabular-nums; transition:background .12s;
  }
  #sf-player-overlay .sf-pl-speed:hover,
  #sf-player-overlay .sf-pl-speed.sf-on{background:rgba(255,255,255,.18)}
  #sf-player-overlay .sf-pl-time{
    margin-left:auto; padding-right:4px;
    font-variant-numeric:tabular-nums; color:rgba(255,255,255,.75);
  }
  /* Same shell as the \u2022\u2022\u2022 menu \u2014 border, radius, padding and row metrics all
     match, so the two menus read as one family. Only the shadow is heavier,
     because this one sits over video rather than a white sidebar. */
  #sf-player-overlay .sf-pl-ratemenu{
    position:absolute; left:0; bottom:calc(100% + 8px); z-index:8;
    max-height:clamp(160px, 46vh, 252px); overflow-y:auto; overscroll-behavior:contain;
    background:var(--sf-menu); border:1px solid var(--sf-line); border-radius:11px;
    padding:6px; box-shadow:0 10px 30px rgba(0,0,0,.30), 0 1px 3px rgba(0,0,0,.08);
    min-width:112px;
  }
  #sf-player-overlay .sf-pl-rateitem{
    display:flex; align-items:center; gap:11px; width:100%;
    font-size:13px; font-weight:400; color:var(--sf-text);
    padding:8px 9px; border-radius:7px; text-align:left;
    font-variant-numeric:tabular-nums; white-space:nowrap;
  }
  #sf-player-overlay .sf-pl-rateitem:hover{background:var(--sf-sunk)}
  #sf-player-overlay .sf-pl-ratemenu::-webkit-scrollbar{width:5px}
  #sf-player-overlay .sf-pl-ratemenu::-webkit-scrollbar-thumb{background:#e0e0e0; border-radius:3px}
  /* Selected state is the grey fill alone \u2014 no tick. It sits one step darker
     than the hover fill so the current rate stays readable while the pointer
     is somewhere else in the list. */
  #sf-player-overlay .sf-pl-rateitem.sf-on{
    background:var(--sf-hover); color:var(--sf-ink); font-weight:500;
  }

  /* \u2500\u2500 Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  #sf-player-overlay .sf-pl-right{display:flex; flex-direction:column; min-width:0}
  #sf-player-overlay .sf-pl-shead{
    display:flex; align-items:center; gap:3px;
    padding:10px 10px 10px 11px;
    border-bottom:1px solid var(--sf-line); flex:0 0 auto;
  }
  #sf-player-overlay .sf-pl-mini{
    position:relative; width:26px; height:26px; border-radius:7px;
    background:transparent; color:var(--sf-ghost);
    display:flex; align-items:center; justify-content:center;
    transition:background .12s, color .12s;
  }
  #sf-player-overlay .sf-pl-mini:hover:not([disabled]){background:var(--sf-hover); color:var(--sf-ink)}
  #sf-player-overlay .sf-pl-mini[disabled]{opacity:.32; cursor:default}
  #sf-player-overlay .sf-pl-mini svg{width:9px; height:9px}
  #sf-player-overlay .sf-pl-pos{
    font-size:12.5px; font-weight:500; color:var(--sf-text);
    font-variant-numeric:tabular-nums; padding:0 2px; white-space:nowrap;
  }
  #sf-player-overlay .sf-pl-tools{margin-left:auto; display:flex; gap:2px}
  #sf-player-overlay .sf-pl-more{position:relative}
  #sf-player-overlay .sf-pl-tbtn{
    position:relative; width:30px; height:30px; border-radius:8px;
    background:transparent; color:var(--sf-ghost);
    display:flex; align-items:center; justify-content:center;
    transition:background .12s, color .12s;
  }
  #sf-player-overlay .sf-pl-tbtn:hover,
  #sf-player-overlay .sf-pl-tbtn.sf-on{background:var(--sf-hover); color:var(--sf-ink)}
  #sf-player-overlay .sf-pl-tbtn svg{width:10.5px; height:10.5px}
  #sf-player-overlay .sf-pl-tbtn.sf-close svg{width:7.5px; height:7.5px}

  #sf-player-overlay .sf-pl-sbody{
    flex:1 1 auto; overflow-y:auto; padding:14px 14px 16px; min-height:0;
    display:flex; flex-direction:column;
  }
  #sf-player-overlay .sf-pl-sbody::-webkit-scrollbar{width:6px}
  #sf-player-overlay .sf-pl-sbody::-webkit-scrollbar-thumb{background:#e0e0e0; border-radius:3px}
  #sf-player-overlay .sf-pl-table.sf-perf{margin-top:2px}

  /* "rules" variant: hairlines between rows only, never top or bottom. */
  #sf-player-overlay .sf-pl-trow{
    display:flex; align-items:center; gap:10px; width:100%;
    padding:11px 3px; border-top:1px solid var(--sf-line);
    background:transparent; font-size:13px; color:var(--sf-text);
    text-align:left;
  }
  #sf-player-overlay .sf-pl-trow:first-child{border-top:0}
  #sf-player-overlay .sf-pl-trow .sf-pl-ico{
    width:13px; height:13px; flex:0 0 13px; color:var(--sf-glyph);
    display:flex; align-items:center; justify-content:center;
  }
  #sf-player-overlay .sf-pl-trow .sf-pl-v{
    margin-left:auto; font-weight:600; color:var(--sf-ink);
    font-variant-numeric:tabular-nums; letter-spacing:-.015em;
  }
  #sf-player-overlay .sf-pl-trow.sf-act{
    position:relative;
    padding:9px 6px; border-radius:6px; cursor:pointer; transition:background .12s;
  }
  #sf-player-overlay .sf-pl-trow.sf-act:hover{background:var(--sf-sunk)}
  #sf-player-overlay .sf-pl-trow.sf-act[disabled]{opacity:.4; cursor:default}
  #sf-player-overlay .sf-pl-trow.sf-act[disabled]:hover{background:transparent}
  #sf-player-overlay .sf-pl-trow .sf-pl-go{
    margin-left:auto; margin-right:5px; width:6.5px; height:6.5px; color:var(--sf-ghost);
  }

  /* Auto top margin = the "sparse" variant: Instagram reports 3 metrics (4 with
     an outlier sort) where the reference had 6, so the actions ride the bottom
     of the stage instead of leaving a ragged gap under the rows. */
  #sf-player-overlay .sf-pl-secdiv{
    border-top:1px solid var(--sf-line); margin:auto -14px 15px;
  }
  #sf-player-overlay .sf-pl-posted{
    font-size:11.5px; color:var(--sf-faint); margin:13px 0 0 3px;
  }
  /* Same recipe as the popup's "New" badge \u2014 quiet, theme-aware. */
  /* Same recipe as the popup's "New" tag (.sf-outlier-new in popup.css),
     with its 0.58rem translated to px so IG's root font-size can't skew it. */
  #sf-player-overlay .sf-pl-beta{
    margin-left:7px; flex-shrink:0;
    font-size:9.3px; font-weight:500; line-height:1.4; letter-spacing:.02em;
    padding:2px 5px; border-radius:3px;
    background:rgba(0,0,0,.06); color:rgba(0,0,0,.38);
  }
  #sf-player-overlay.sf-dark .sf-pl-beta{
    background:rgba(255,255,255,.1); color:rgba(242,243,245,.5);
  }

  /* \u2500\u2500 Overflow menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  #sf-player-overlay .sf-pl-omenu{
    position:absolute; right:0; top:calc(100% + 7px); z-index:12;
    background:var(--sf-menu); border:1px solid var(--sf-line); border-radius:11px;
    padding:6px; min-width:224px;
    box-shadow:0 10px 30px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.05);
    transform-origin:top right;
    animation:sfPlMenuIn .12s cubic-bezier(.2,.7,.3,1);
  }
  #sf-player-overlay .sf-pl-omenu.sf-closing{
    animation:sfPlMenuOut .13s ease forwards; pointer-events:none;
  }
  #sf-player-overlay .sf-pl-oitem{
    display:flex; align-items:center; gap:11px; width:100%;
    font-size:13px; font-weight:400; color:var(--sf-text);
    padding:8px 9px; border-radius:7px; text-align:left; white-space:nowrap;
  }
  #sf-player-overlay .sf-pl-oitem:hover{background:var(--sf-sunk)}
  #sf-player-overlay .sf-pl-oitem[disabled]{opacity:.38; cursor:default}
  #sf-player-overlay .sf-pl-oitem[disabled]:hover{background:transparent}
  #sf-player-overlay .sf-pl-oitem .sf-pl-ico{
    width:12px; height:12px; flex:0 0 12px; color:var(--sf-glyph);
    display:flex; align-items:center; justify-content:center;
  }
  #sf-player-overlay .sf-pl-odiv{border-top:1px solid var(--sf-line); margin:6px -6px}

  /* \u2500\u2500 Tooltips \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  #sf-player-overlay .sf-pl-tip{
    position:absolute; top:calc(100% + 7px); left:50%; white-space:nowrap;
    pointer-events:none; background:#1f1f1f; border-radius:6px;
    padding:5px 8px; font-size:11px; font-weight:500; color:#fff;
    box-shadow:0 4px 14px rgba(0,0,0,.22); opacity:0;
    transform:translateX(-50%) translateY(-3px);
    transition:opacity .12s ease, transform .12s ease; transition-delay:0s;
    z-index:14;
  }
  #sf-player-overlay .sf-pl-tip i{font-style:normal; color:rgba(255,255,255,.5); margin-left:6px}
  #sf-player-overlay .sf-pl-tbtn:hover .sf-pl-tip,
  #sf-player-overlay .sf-pl-ctl:hover .sf-pl-tip,
  #sf-player-overlay .sf-pl-speed:hover .sf-pl-tip,
  #sf-player-overlay .sf-pl-mute:hover .sf-pl-tip,
  #sf-player-overlay .sf-pl-trow.sf-act:hover .sf-pl-tip,
  #sf-player-overlay .sf-pl-mini:hover:not([disabled]) .sf-pl-tip{
    opacity:1; transform:translateX(-50%) translateY(0); transition-delay:.24s;
  }
  #sf-player-overlay .sf-pl-tip.sf-end{left:auto; right:0; transform:translateX(0) translateY(-3px)}
  #sf-player-overlay .sf-pl-tbtn:hover .sf-pl-tip.sf-end{transform:translateX(0) translateY(0)}
  #sf-player-overlay .sf-pl-tip.sf-up{top:auto; bottom:calc(100% + 7px); transform:translateX(-50%) translateY(3px)}
  #sf-player-overlay .sf-pl-ctl:hover .sf-pl-tip.sf-up,
  #sf-player-overlay .sf-pl-speed:hover .sf-pl-tip.sf-up,
  #sf-player-overlay .sf-pl-mute:hover .sf-pl-tip.sf-up,
  #sf-player-overlay .sf-pl-trow.sf-act:hover .sf-pl-tip.sf-up{transform:translateX(-50%) translateY(0)}
  #sf-player-overlay .sf-pl-tip.sf-start{left:0; transform:translateX(0) translateY(3px)}
  #sf-player-overlay .sf-pl-ctl:hover .sf-pl-tip.sf-start{transform:translateX(0) translateY(0)}

  /* \u2500\u2500 Dark \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  /* The reference build is light-only; these retune the same tokens for IG's
     dark mode so one palette drives both. */
  #sf-player-overlay.sf-dark{
    --sf-ink:#f2f3f5; --sf-text:#e4e6e9; --sf-muted:rgba(242,243,245,.58);
    --sf-faint:rgba(242,243,245,.42); --sf-ghost:rgba(242,243,245,.34);
    --sf-line:rgba(255,255,255,.10); --sf-line2:rgba(255,255,255,.14);
    --sf-sunk:rgba(255,255,255,.06); --sf-hover:rgba(255,255,255,.10);
    --sf-glyph:rgba(242,243,245,.52); --sf-card:rgb(32,38,45);
    --sf-stage:#15191d; --sf-menu:rgb(38,45,53);
    background:rgba(0,0,0,.55);
  }
  #sf-player-overlay.sf-dark .sf-pl-card{
    box-shadow:0 20px 56px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06);
  }
  #sf-player-overlay.sf-dark .sf-pl-stage{background:var(--sf-stage)}
  #sf-player-overlay.sf-dark .sf-pl-tbtn{color:var(--sf-muted)}
  #sf-player-overlay.sf-dark .sf-pl-trow .sf-pl-go{color:var(--sf-ghost)}
  #sf-player-overlay.sf-dark .sf-pl-ratemenu,
  #sf-player-overlay.sf-dark .sf-pl-omenu{background:var(--sf-menu)}
  #sf-player-overlay.sf-dark .sf-pl-tip{background:#0b0e11}
  `,document.head.appendChild(h)}function J(h,b){if(!h)return[];let w=[];return h.querySelectorAll('[data-sf-sorted-item="true"]').forEach(C=>{if(C.offsetParent===null)return;let E=null;try{E=JSON.parse(C.dataset.sfItemJson||"null")}catch{}E&&(E._tile=C,b&&b(E,C),w.push(E))}),w}function pe(h){let b=null,w=-1;return h.querySelectorAll("img").forEach(C=>{let E=C.currentSrc||C.src||"";if(!/^https?:/.test(E))return;let R=C.naturalWidth||C.width||0;R>w&&(w=R,b=E)}),b}function T(h,b,w){let C=v("span","sf-pl-tip"+(w?" "+w:""));return C.appendChild(document.createTextNode(h)),b&&C.appendChild(v("i",null,"\xB7 "+b)),C}function $(h,b,w){let C=h&&h.querySelector(".sf-pl-tip");C&&(C.textContent=b,w&&C.appendChild(v("i",null,"\xB7 "+w)))}function V(h,b,w){let C=v("div","sf-pl-trow sf-stat");return C.appendChild(i(h)),C.appendChild(document.createTextNode(b)),C.appendChild(v("span","sf-pl-v",w)),C}function te(h,b,w={}){let C=v("button","sf-pl-trow sf-act");return C.appendChild(i(h)),C.appendChild(document.createTextNode(b)),w.external&&C.appendChild(v("span","sf-pl-go",c("external"))),w.tip&&C.appendChild(T(w.tip[0],w.tip[1],w.tip[2])),w.disabled&&(C.disabled=!0),w.title&&(C.title=w.title),w.onClick&&C.addEventListener("click",w.onClick),C}function ne(h,b,w={}){let C=v("button","sf-pl-oitem");return C.appendChild(i(h)),C.appendChild(v("span","sf-pl-lab",b)),w.disabled&&(C.disabled=!0),w.title&&(C.title=w.title),w.onClick&&C.addEventListener("click",w.onClick),C}function F(h){return h?h.includes("T")?new Date(h).toLocaleString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}):new Date(h+"T12:00:00").toLocaleDateString("en-US",{year:"numeric",month:"numeric",day:"numeric"}):""}function ee(h){let b=h==null?"":String(h);return/[\t\n\r"]/.test(b)?'"'+b.replace(/"/g,'""')+'"':b}function ue(h){let b=j(h),w=v("div","sf-pl-stage sf-loading");if(b==="carousel"&&w.classList.add("sf-carousel"),h._poster){let fe=v("img","sf-pl-poster");fe.alt="",fe.addEventListener("error",()=>{fe._sfFellBack||!h._posterFallback||h._posterFallback===h._poster||(fe._sfFellBack=!0,fe.src=h._posterFallback)}),fe.src=h._posterFallback||h._poster,w.appendChild(fe)}if(b==="photo")return w;if(b==="carousel"){let fe=v("button","sf-pl-snav sf-l",c("prev")),xe=v("button","sf-pl-snav sf-r",c("next"));fe.addEventListener("click",Ee=>{Ee.stopPropagation(),Hs(-1)}),xe.addEventListener("click",Ee=>{Ee.stopPropagation(),Hs(1)}),w.append(fe,xe,v("div","sf-pl-dots"))}let C=v("div","sf-pl-vctl"),E=v("div","sf-pl-track");E.appendChild(v("div","sf-pl-hoverfill")),E.appendChild(v("div","sf-pl-fill")),E.appendChild(v("div","sf-pl-knob")),E.appendChild(v("span","sf-pl-scrubtime","0:00")),C.appendChild(E);let R=v("div","sf-pl-vrow"),W=v("button","sf-pl-ctl",c("back5"));W.appendChild(T("Back 5s",null,"sf-up sf-start")),W.addEventListener("click",()=>le(-z));let N=v("button","sf-pl-ctl sf-play");N.appendChild(v("span","sf-pl-glyph",c("play"))),N.appendChild(T("Play","Space","sf-up")),N.addEventListener("click",Ce);let se=v("button","sf-pl-ctl",c("fwd5"));se.appendChild(T("Forward 5s",null,"sf-up")),se.addEventListener("click",()=>le(z));let A=v("span","sf-pl-speedwrap"),X=v("button","sf-pl-speed",Us());X.appendChild(T("Playback speed",null,"sf-up")),A.appendChild(X);let Q=v("button","sf-pl-mute");Q.appendChild(v("span","sf-pl-glyph")),Q.appendChild(T("Mute","M","sf-up")),Q.addEventListener("click",Y);let K=v("span","sf-pl-time");return R.append(W,N,se,A,Q,K),C.appendChild(R),w.appendChild(C),X.addEventListener("click",fe=>{fe.stopPropagation(),Er(A,X)}),w}let z=5;function j(h){if(!h||!e||typeof e.kindOf!="function")return"photo";let b=e.kindOf(h);return b==="video"||b==="carousel"?b:"photo"}let H=0;function ie(){return f?f.querySelector("video"):null}function Ce(){let h=ie();h&&(h.paused||h.ended?h.play():h.pause(),S())}function le(h){let b=ie();if(!b)return;let w=b.currentTime+h,C=b.duration;b.currentTime=Number.isFinite(C)&&C>0?Math.max(0,Math.min(C-.1,w)):Math.max(0,w)}function S(){if(!f)return;let h=f.querySelector(".sf-pl-ctl.sf-play");if(!h)return;let b=ie(),w=!!(b&&!b.paused&&!b.ended),C=h.querySelector(".sf-pl-glyph");C&&(C.innerHTML=c(w?"pause":"play")),h.classList.toggle("sf-is-pause",w),$(h,w?"Pause":"Play","Space");let E=f.querySelector(".sf-pl-stage");E&&E.classList.toggle("sf-playing",w)}function Y(){k=!k,O();try{typeof chrome<"u"&&chrome.storage?.local&&chrome.storage.local.set({[m]:k})}catch{}}function O(){if(!f)return;let h=f.querySelector(".sf-pl-mute");if(!h)return;let b=h.querySelector(".sf-pl-glyph");b&&(b.innerHTML=c(k?"mute":"speaker")),h.classList.toggle("sf-muted",k),$(h,k?"Unmute":"Mute","M");let w=ie();w&&(w.muted=k)}let Z=0,G=null,ce=null;function B(){ce&&ce.abort(),ce=new AbortController;let h=ce.signal,b=()=>{};[p+1,p-1].forEach(w=>{let C=u[w];if(C&&C.id&&j(C)!=="photo"&&e&&typeof e.resolve=="function"){let E;try{E=Promise.resolve(e.resolve(C,{signal:h}))}catch(R){E=Promise.reject(R)}E.then(R=>{R&&R.caption&&!C.caption&&(C.caption=R.caption)},b)}})}function P(){let h=ie();if(h){try{h.pause()}catch{}h.removeAttribute("src");try{h.load()}catch{}h.remove()}G&&(G.abort(),G=null)}function U(h,b){let w=f&&f.querySelector(".sf-pl-time");w&&(w.textContent=q(h??0)+" / "+q(b))}function re(h,b,w,C,E,R,W){let N=document.createElement("video");N.className="sf-pl-video",N.playsInline=!0,N.preload="auto",N.muted=k,N.loop=!1,b._poster&&(N.poster=b._poster),N.src=w;let se=()=>{if(!E())return;R();let de=Number.isFinite(N.duration)?N.duration:C;U(0,de),N.playbackRate=d;let ae=N.play();ae&&ae.catch&&ae.catch(()=>{if(E()&&!N.muted){k=!0,O();let Le=N.play();Le&&Le.catch&&Le.catch(()=>{})}})};N.readyState>=3?se():N.addEventListener("canplay",se,{once:!0}),N.addEventListener("error",()=>{E()&&W()}),N.addEventListener("playing",()=>{if(!E())return;let de=h.querySelector(".sf-pl-poster");de&&de.classList.add("sf-under"),S()}),N.addEventListener("pause",()=>{E()&&S()}),N.addEventListener("ended",()=>{E()&&S()});let A=h.querySelector(".sf-pl-track"),X=A.cloneNode(!0);A.replaceWith(X),A=X;let Q=A.querySelector(".sf-pl-fill"),K=A.querySelector(".sf-pl-knob"),fe=A.querySelector(".sf-pl-hoverfill"),xe=A.querySelector(".sf-pl-scrubtime"),Ee=()=>Number.isFinite(N.duration)&&N.duration>0?N.duration:C||0,Et=de=>{let ae=A.getBoundingClientRect();return Math.max(0,Math.min(1,(de-ae.left)/(ae.width||1)))},ye=()=>{let de=Ee(),ae=de?N.currentTime/de:0;Q.style.width=ae*100+"%",K.style.left=ae*100+"%"},An=!1,Pr=()=>{An||(An=!0,requestAnimationFrame(()=>{An=!1,E()&&ye()}))};N.addEventListener("timeupdate",()=>{if(!E())return;let de=Ee();U(N.currentTime,de),Pr()}),A.addEventListener("pointermove",de=>{if(!E()||A.classList.contains("sf-dragging"))return;let ae=Et(de.clientX);fe.style.width=ae*100+"%",xe.style.left=ae*100+"%",xe.textContent=q(ae*Ee())});let Fn=0,zs=null,js=de=>{let ae=Et(de),Le=Ee();if(Q.style.width=ae*100+"%",K.style.left=ae*100+"%",xe.style.left=ae*100+"%",xe.textContent=q(ae*Le),!Le)return;let Qe=Math.min(ae*Le,Le-.1),Hn=Date.now();Hn-Fn>=50?(Fn=Hn,N.currentTime=Qe):(clearTimeout(zs),zs=setTimeout(()=>{E()&&(Fn=Date.now(),N.currentTime=Qe)},50))};return A.addEventListener("pointerdown",de=>{if(!E())return;de.preventDefault();try{A.setPointerCapture(de.pointerId)}catch{}A.classList.add("sf-dragging"),js(de.clientX);let ae=Qe=>js(Qe.clientX),Le=Qe=>{A.classList.remove("sf-dragging"),A.removeEventListener("pointermove",ae),A.removeEventListener("pointerup",Le),A.removeEventListener("pointercancel",Le);try{A.releasePointerCapture(Qe.pointerId)}catch{}};A.addEventListener("pointermove",ae),A.addEventListener("pointerup",Le),A.addEventListener("pointercancel",Le)}),N.addEventListener("click",de=>{de.stopPropagation(),Ce()}),N.style.cursor="pointer",h.insertBefore(N,h.firstChild),N}let _e=null,Ge=null;function Hs(h){if(!_e)return;let b=H+h;b<0||b>=_e.length||(H=b,Ds(h>0?"next":"prev"))}function Ds(h){let b=f&&f.querySelector(".sf-pl-stage"),w=Ge;if(!b||!_e||!w||!w())return;let C=u[p],E=_e[H],R=b.querySelector("video");if(R){try{R.pause()}catch{}R.removeAttribute("src");try{R.load()}catch{}R.remove()}let W=b.querySelector(".sf-pl-poster");if(W){W.classList.remove("sf-under","sf-slide-next","sf-slide-prev");let X=()=>{h&&(W.offsetWidth,W.classList.add(h==="next"?"sf-slide-next":"sf-slide-prev"))},Q=E.posterUrl;if(Q&&W.src!==Q){let K=H,fe=setTimeout(()=>{w()&&H===K&&b.classList.add("sf-slidewait")},400),xe=new Image,Ee=()=>{clearTimeout(fe),!(!w()||H!==K)&&(b.classList.remove("sf-slidewait"),W.src=Q,X())};xe.onload=Ee,xe.onerror=Ee,xe.src=Q,xe.complete&&Ee()}else b.classList.remove("sf-slidewait"),X()}[H+1,H-1].forEach(X=>{let Q=_e[X];if(Q&&Q.posterUrl){let K=new Image;K.src=Q.posterUrl}}),b.classList.toggle("sf-slide-video",E.kind==="video");let N=b.querySelector(".sf-pl-vctl");if(N&&(N.style.display=E.kind==="video"?"":"none"),E.kind==="video"&&E.videoUrl){let X=re(b,C,E.videoUrl,E.durationSecs,w,()=>{},()=>{});X&&h&&X.classList.add(h==="next"?"sf-slide-next":"sf-slide-prev")}b.querySelectorAll(".sf-pl-dots i").forEach((X,Q)=>X.classList.toggle("sf-on",Q===H));let se=b.querySelector(".sf-pl-snav.sf-l"),A=b.querySelector(".sf-pl-snav.sf-r");se&&(se.disabled=H===0),A&&(A.disabled=H===_e.length-1)}function kr(h,b,w){let C=h.querySelector(".sf-pl-poster"),E=b._poster;if(!C||!E||C.src===E)return;let R=setTimeout(()=>{w()&&h.classList.add("sf-imgwait")},400),W=new Image,N=()=>{clearTimeout(R),w()&&h.classList.remove("sf-imgwait")};W.onload=()=>{if(!w()){clearTimeout(R);return}let se=v("img","sf-pl-photofull");se.alt="",se.src=E,h.insertBefore(se,h.querySelector(".sf-pl-vctl")||null),se.offsetWidth,se.classList.add("sf-in"),N()},W.onerror=N,W.src=E}function Sr(h){let b=++Z,w=()=>b===Z&&!!f,C=f&&f.querySelector(".sf-pl-stage");if(!C)return;let E=setTimeout(()=>{w()&&C.classList.add("sf-slowload")},400),R=()=>e&&typeof e.errorCopy=="function"&&e.errorCopy(h)||"Couldn't load this item",W=A=>{if(!w())return;clearTimeout(E),C.classList.remove("sf-slowload"),C.classList.add("sf-loading"),C.querySelector(".sf-pl-loaderr")?.remove();let X=v("div","sf-pl-loaderr",A);C.appendChild(X)},N=j(h);if(_e=null,H=0,N==="photo"){clearTimeout(E),C.classList.remove("sf-loading","sf-slowload"),kr(C,h,w);return}if(!h.id){W(R());return}if(!e||typeof e.resolve!="function"){W("Player data layer missing");return}let se=A=>{G&&G.abort(),G=new AbortController;let X=G,Q;try{Q=Promise.resolve(e.resolve(h,{signal:X.signal,fresh:A}))}catch(K){Q=Promise.reject(K)}Q.then(K=>{if(!(!w()||!K)){if(K.caption&&!h.caption&&(h.caption=K.caption),K.posterUrl&&!h._poster&&(h._poster=K.posterUrl),N==="carousel"&&K.slides&&K.slides.length){clearTimeout(E),C.classList.remove("sf-loading","sf-slowload"),_e=K.slides,Ge=w;let fe=C.querySelector(".sf-pl-dots");fe&&(fe.replaceChildren(),K.slides.forEach(()=>fe.appendChild(document.createElement("i")))),Ds(),B();return}if(!K.videoUrl){W(R());return}re(C,h,K.videoUrl,K.durationSecs,w,()=>{clearTimeout(E),C.classList.remove("sf-loading","sf-slowload"),B()},()=>{if(P(),!A){C.classList.add("sf-loading","sf-slowload"),C.querySelector(".sf-pl-poster")?.classList.remove("sf-under"),se(!0);return}W(R())})}}).catch(K=>{w()&&(K&&K.name==="AbortError"&&(!G||G.signal.aborted)||W(R()))})};se(!1)}let Ns={top:"15%",zIndex:"100000"};function $s(h){let b=window.__sfBanner;if(!b||!b.getStack)return;let w=b.getStack();w&&(w.style.top=h?"16px":Ns.top,w.style.zIndex=h?"2147482100":Ns.zIndex)}function Qt(h){if(!f)return;let b=f.querySelector(".sf-pl-stage");if(!b)return;b.querySelector(".sf-pl-toast")?.remove();let w=v("div","sf-pl-toast",h);b.appendChild(w),setTimeout(()=>{w.classList.add("sf-out")},1600),setTimeout(()=>{w.remove()},1900)}function qs(){let h=u[p];if(!(!h||!e||typeof e.transcribe!="function"||!(typeof e.canTranscribe=="function"?e.canTranscribe(h):j(h)==="video"))){if(window.__sfBanner?.guards?.isTranscribing){Qt("Finishing the current transcription first");return}e.transcribe(h)}}function Us(){return(d===1?"1":String(d))+"\xD7"}function Er(h,b){let w=h.querySelector(".sf-pl-ratemenu");if(w){w.remove(),b.classList.remove("sf-on");return}Pn(),b.classList.add("sf-on");let C=v("div","sf-pl-ratemenu");l.forEach(R=>{let W=v("button","sf-pl-rateitem",(R===1?"1":String(R))+"\xD7");R===d&&W.classList.add("sf-on"),W.addEventListener("click",N=>{N.stopPropagation(),d=R,b.firstChild.nodeValue=Us();let se=f&&f.querySelector("video");se&&(se.playbackRate=R),C.remove(),b.classList.remove("sf-on")}),C.appendChild(W)}),h.appendChild(C);let E=C.querySelector(".sf-on");E&&E.scrollIntoView({block:"center"})}function Lr(h){let b=v("div","sf-pl-right"),w=v("div","sf-pl-shead"),C=v("button","sf-pl-mini",c("prev"));C.disabled=p<=0,C.appendChild(T("Previous","\u2190")),C.addEventListener("click",()=>St(p-1));let E=v("span","sf-pl-pos",p+1+" of "+u.length),R=v("button","sf-pl-mini",c("next"));R.disabled=p>=u.length-1,R.appendChild(T("Next","\u2192")),R.addEventListener("click",()=>St(p+1));let W=v("span","sf-pl-beta","Beta"),N=v("span","sf-pl-tools"),se=v("span","sf-pl-more"),A=v("button","sf-pl-tbtn",c("dots"));A.addEventListener("click",ye=>{ye.stopPropagation(),Mr(se,A,h)}),se.appendChild(A);let X=v("button","sf-pl-tbtn sf-close",c("close"));X.appendChild(T("Close","Esc","sf-end")),X.addEventListener("click",en),N.append(se,X),w.append(C,E,R,W,N),b.appendChild(w);let Q=v("div","sf-pl-sbody"),K=v("div","sf-pl-table sf-perf");(e&&typeof e.kpiRows=="function"&&e.kpiRows(h)||[]).forEach(ye=>{ye&&K.appendChild(V(ye.icon,ye.label,ye.value))}),Q.appendChild(K),Q.appendChild(v("div","sf-pl-secdiv"));let xe=v("div","sf-pl-table sf-acts");(e&&typeof e.actions=="function"&&e.actions(h)||[]).forEach(ye=>{ye&&xe.appendChild(te(ye.icon,ye.label,{tip:ye.tip,external:ye.external,disabled:ye.disabled,title:ye.title,onClick:ye.onClick}))}),Q.appendChild(xe);let Et=I(h.createDate);return Et&&Q.appendChild(v("p","sf-pl-posted",Et)),b.appendChild(Q),b}function Mr(h,b,w){let C=h.querySelector(".sf-pl-omenu");if(C){C.remove(),b.classList.remove("sf-on");return}Pn(),b.classList.add("sf-on");let E=v("div","sf-pl-omenu"),R=()=>{E.classList.add("sf-closing"),b.classList.remove("sf-on"),setTimeout(()=>E.remove(),140)},W=(A,X)=>{(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(A):Promise.reject(new Error("clipboard unavailable"))).then(()=>{X.textContent="Copied"},()=>{X.textContent="Couldn't copy"}).then(()=>setTimeout(R,480))},N={dismiss:R,toast:Qt,downloadBusy:()=>window.__sfBanner?.guards?.isDownloading?(Qt("Finishing the current download first"),!0):!1};(e&&typeof e.menuItems=="function"&&e.menuItems(w,N)||[]).forEach(A=>{if(A){if(A.type==="divider"){E.appendChild(v("div","sf-pl-odiv"));return}if(A.type==="copy"){let X=ne(A.icon,A.label,{disabled:A.disabled,title:A.title});X.addEventListener("click",Q=>{Q.stopPropagation();let K=typeof A.text=="function"?A.text():A.text;W(K==null?"":String(K),X.querySelector(".sf-pl-lab"))}),E.appendChild(X);return}E.appendChild(ne(A.icon,A.label,{disabled:A.disabled,title:A.title,onClick:A.onClick}))}}),h.appendChild(E)}function Pn(){f&&(f.querySelectorAll(".sf-pl-omenu, .sf-pl-ratemenu").forEach(h=>h.remove()),f.querySelectorAll(".sf-on").forEach(h=>h.classList.remove("sf-on")))}function Vs(h){let b=u[p];if(!b||!f)return;let C=v("div","sf-pl-card"+({in:" sf-in",next:" sf-next",prev:" sf-prev"}[h]||""));C.appendChild(ue(b)),C.appendChild(Lr(b)),C.addEventListener("click",E=>{E.target.closest(".sf-pl-omenu, .sf-pl-ratemenu")||Pn()}),P(),f.replaceChildren(C),O(),S(),Sr(b)}function St(h){if(h<0||h>=u.length)return;let b=h>p?"next":"prev";p=h,Vs(b)}function Os(h,b,w){M(),u=h,p=b;let C=w&&typeof w=="object"?w:{isDark:!!w};if(f=v("div"),f.id="sf-player-overlay",C.isDark&&f.classList.add("sf-dark"),C.vars)for(let R in C.vars)Object.prototype.hasOwnProperty.call(C.vars,R)&&f.style.setProperty(R,C.vars[R]);f.addEventListener("click",R=>{R.target===f&&en()});let E=R=>{if(_!==E||!f||!f.isConnected){document.removeEventListener("keydown",E,!0);return}let W=R.target;if(!(W&&(W.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(W.tagName))))switch(R.key){case"Escape":R.preventDefault(),en();break;case"ArrowRight":R.preventDefault(),St(p+1);break;case"ArrowLeft":R.preventDefault(),St(p-1);break;case" ":case"Spacebar":R.preventDefault(),Ce();break;case"m":case"M":R.preventDefault(),Y();break;case"t":case"T":R.preventDefault(),qs();break}};_=E,document.addEventListener("keydown",E,!0),document.body.appendChild(f),Vs("in"),Ir(),$s(!0)}function Ir(){let h=document.scrollingElement||document.documentElement;y=h.scrollTop,x=w=>{let C=w.target;for(;C&&C!==f;){if(C.nodeType===1&&C.scrollHeight>C.clientHeight+1){let E=getComputedStyle(C).overflowY;if(E==="auto"||E==="scroll")return}C=C.parentNode}w.preventDefault()},f.addEventListener("wheel",x,{passive:!1}),f.addEventListener("touchmove",x,{passive:!1});let b=()=>{h.scrollTop!==y&&(h.scrollTop=y)};b(),requestAnimationFrame(()=>{b(),requestAnimationFrame(b)})}function Tr(){f&&x&&(f.removeEventListener("wheel",x),f.removeEventListener("touchmove",x)),x=null}function en(){$s(!1),Z++,ce&&(ce.abort(),ce=null),P(),_&&(document.removeEventListener("keydown",_,!0),_=null),Tr(),f?.remove(),f=null,u=[]}function Br(h){if(!e||e.enabled===!1||!h||t!=="player"||f||typeof e.gate=="function"&&!e.gate(h))return!1;let b=typeof e.collect=="function"&&e.collect()||[],w=b.findIndex(E=>E._tile===h);if(w<0)return!1;let C={isDark:!1};try{typeof e.theme=="function"&&(C=e.theme()||C)}catch{}return Os(b,w,C),!0}function Rr(h){return e=h||null,t="player",s(),{tryOpen:Br,open:Os,go:St,close:en,isOpen:()=>!!f,current:()=>u[p]||null,transcribe:qs,toast:Qt}}window.__sfPlayerCore={version:1,create:Rr,helpers:{collectFrom:J,bestTileImage:pe,exportDate:F,tsvCell:ee,num:L,when:I,time:q}}})();var wi=!0,xi={instagram:{vb:"-5 -5 250 250",d:"M70.301 0.83974C57.533 1.44214 48.8138 3.47974 41.1914 6.47494C33.3026 9.54934 26.6162 13.6749 19.9634 20.3517C13.3106 27.0285 9.21379 33.7197 6.16099 41.6205C3.20659 49.2597 1.20499 57.9861 0.640995 70.7613C0.0769946 83.5365 -0.0478054 87.6429 0.0145946 120.23C0.0769946 152.817 0.220995 156.902 0.840195 169.704C1.44979 182.469 3.48019 191.186 6.47539 198.811C9.55459 206.7 13.6754 213.384 20.3546 220.039C27.0338 226.694 33.7202 230.781 41.6402 233.839C49.2722 236.789 58.001 238.8 70.7738 239.359C83.5466 239.918 87.6578 240.048 120.235 239.985C152.813 239.923 156.915 239.779 169.714 239.172C182.513 238.565 191.184 236.52 198.811 233.539C206.7 230.453 213.389 226.339 220.039 219.657C226.69 212.976 230.784 206.28 233.835 198.374C236.791 190.742 238.8 182.013 239.355 169.25C239.914 156.441 240.046 152.352 239.983 119.769C239.921 87.1869 239.775 83.1021 239.167 70.3053C238.56 57.5085 236.527 48.8181 233.535 41.1885C230.451 33.2997 226.335 26.6205 219.658 19.9605C212.981 13.3005 206.28 9.20854 198.377 6.16534C190.74 3.21094 182.016 1.19734 169.243 0.64534C156.471 0.0933396 152.359 -0.0482604 119.77 0.0141396C87.1802 0.0765396 83.1002 0.21574 70.301 0.83974ZM71.7026 217.771C60.0026 217.262 53.6498 215.318 49.4162 213.691C43.8098 211.531 39.8162 208.92 35.597 204.741C31.3778 200.563 28.7858 196.555 26.597 190.961C24.953 186.727 22.973 180.381 22.4258 168.681C21.8306 156.036 21.7058 152.239 21.6362 120.201C21.5666 88.1637 21.689 84.3717 22.2434 71.7213C22.7426 60.0309 24.6986 53.6709 26.3234 49.4397C28.4834 43.8261 31.085 39.8397 35.273 35.6229C39.461 31.4061 43.457 28.8093 49.0562 26.6205C53.285 24.9693 59.6306 23.0061 71.3258 22.4493C83.981 21.8493 87.773 21.7293 119.806 21.6597C151.839 21.5901 155.64 21.7101 168.3 22.2669C179.991 22.7757 186.353 24.7125 190.579 26.3469C196.188 28.5069 200.179 31.1013 204.396 35.2965C208.613 39.4917 211.212 43.4733 213.401 49.0845C215.055 53.3013 217.018 59.6445 217.57 71.3469C218.172 84.0021 218.309 87.7965 218.367 119.827C218.424 151.857 218.311 155.661 217.757 168.307C217.246 180.007 215.307 186.362 213.677 190.601C211.517 196.205 208.913 200.201 204.723 204.415C200.532 208.629 196.541 211.226 190.939 213.415C186.715 215.064 180.363 217.032 168.677 217.589C156.022 218.184 152.23 218.309 120.185 218.378C88.1402 218.448 84.3602 218.318 71.705 217.771M169.529 55.8645C169.534 58.7128 170.383 61.4957 171.97 63.8612C173.556 66.2267 175.808 68.0686 178.442 69.154C181.075 70.2394 183.971 70.5194 186.764 69.9588C189.556 69.3981 192.12 68.0219 194.13 66.0042C196.14 63.9865 197.507 61.4179 198.058 58.6233C198.608 55.8288 198.317 52.9337 197.222 50.3044C196.127 47.675 194.277 45.4295 191.906 43.8517C189.534 42.2739 186.748 41.4348 183.9 41.4405C180.082 41.4482 176.423 42.972 173.728 45.6769C171.033 48.3818 169.523 52.0463 169.529 55.8645ZM58.385 120.12C58.4522 154.152 86.0906 181.677 120.115 181.613C154.14 181.548 181.685 153.912 181.62 119.88C181.555 85.8477 153.91 58.3149 119.88 58.3821C85.8506 58.4493 58.3202 86.0925 58.385 120.12ZM79.9994 120.077C79.9837 112.165 82.3145 104.427 86.6968 97.84C91.0791 91.2532 97.3162 86.1139 104.619 83.0719C111.923 80.0298 119.964 79.2218 127.726 80.7499C135.489 82.2779 142.624 86.0735 148.229 91.6566C153.834 97.2398 157.658 104.36 159.217 112.116C160.776 119.872 159.999 127.917 156.986 135.232C153.973 142.547 148.859 148.804 142.289 153.213C135.72 157.621 127.991 159.982 120.079 159.998C114.826 160.009 109.622 158.985 104.765 156.985C99.9076 154.984 95.4918 152.047 91.7699 148.34C88.048 144.632 85.0929 140.228 83.0733 135.379C81.0537 130.529 80.0092 125.33 79.9994 120.077Z"}},jt=null,Tt={name:"instagram",enabled:wi,openInKey:"sortfeed_ig_open_in",openInNewTab:"instagram",icons:xi,icoScale:{instagram:.95},gate(e){let t=null;try{t=JSON.parse(e.dataset.sfItemJson||"null")}catch{}if(!t||t.postsVsReels!=="Reels"&&t.postsVsReels!=="Posts")return!1;let s=null;try{s=sessionStorage.getItem("sortFeedSurface")}catch{}return!(s&&s!=="explore_search"&&s!=="saved")},collect(){let e=window.__sfPlayerCore.helpers;return e.collectFrom(document.getElementById("div_most_viewed_reels"),(t,s)=>{let n=e.bestTileImage(s);t._poster=t.thumbnailUrl||n,t._posterFallback=n})},kindOf(e){return e?e.postsVsReels==="Reels"?"video":e.mediaType===8?"carousel":e.mediaType===2?"video":"photo":"photo"},resolve(e,t){return dr(e.id,t)},errorCopy(){return"Couldn't load this reel \u2014 try Open on Instagram"},kpiRows(e){let t=window.__sfPlayerCore.helpers,s=[];return e.viewCount!=null&&s.push({icon:"views",label:"Views",value:t.num(e.viewCount)}),s.push({icon:"likes",label:"Likes",value:t.num(e.likesCount)}),e.commentsCount!=null&&s.push({icon:"comments",label:"Comments",value:t.num(e.commentsCount)}),typeof e.outlierScore=="number"&&s.push({icon:"outlier",label:"Outlier score",value:Math.round(e.outlierScore*10)/10+"\xD7"}),s},actions(e){let t=[];return Tt.kindOf(e)==="video"&&t.push({icon:"transcribe",label:"Transcribe",tip:["Transcribe","T","sf-up"],onClick:()=>{jt&&jt.transcribe()}}),t.push({icon:"instagram",label:"Open on Instagram",external:!0,onClick:()=>window.open(e.url,"_blank","noopener,noreferrer")}),t},canTranscribe(e){return Tt.kindOf(e)==="video"},transcribe(e){window.postMessage({trans:!0,download_reel_id:e.id,download_profile_name:e.userName,download_reel_id_ui:e.code})},menuItems(e,t){let s=Tt.kindOf(e),o=[{type:"action",icon:"download",label:s==="photo"?"Download photo":s==="carousel"?"Download carousel":"Download video",onClick:()=>{t.dismiss(),!t.downloadBusy()&&window.postMessage(e.postsVsReels==="Posts"?{download:!0,download_item:"posts",download_post_id:e.id,download_profile_name:e.userName}:{download:!0,download_item:"reels",download_reel_id:e.id,download_profile_name:e.userName})}},{type:"action",icon:"photo",label:"Download thumbnail",disabled:!e._poster,title:e._poster?"":"No thumbnail captured for this reel",onClick:()=>{e._poster&&(t.dismiss(),!t.downloadBusy()&&window.postMessage({download:!0,download_item:"thumbnail",download_url:e._poster,download_profile_name:e.userName,download_code:e.code}))}},{type:"divider"},{type:"copy",icon:"link",label:"Copy link",text:e.url||""}];return e.caption&&String(e.caption).trim()&&o.push({type:"copy",icon:"caption",label:"Copy caption",text:String(e.caption)}),o.push({type:"copy",icon:"sheet",label:"Copy row for spreadsheet",text:()=>Tt.spreadsheetRow(e)}),o},spreadsheetRow(e){let t=window.__sfPlayerCore.helpers;if(e.postsVsReels==="Posts"){let n=[e.userName||"",e.url||"",t.exportDate(e.createDate),e.likesCount??""];return typeof e.outlierScore=="number"&&n.push(Math.round(e.outlierScore*100)/100),n.push(e.commentsCount??"",e.caption||""),n.map(t.tsvCell).join("	")}let s=[e.userName||"",e.url||"",t.exportDate(e.createDate),e.viewCount??""];return typeof e.outlierScore=="number"&&s.push(Math.round(e.outlierScore*100)/100),s.push(e.likesCount??"",e.commentsCount??""),s.map(t.tsvCell).join("	")},theme(){let e=typeof Wn=="function"?Wn():{isDark:!1};return{isDark:!!(e&&e.isDark)}}};window.__sfPlayerCore&&(jt=window.__sfPlayerCore.create(Tt));function po(e){return jt?jt.tryOpen(e):!1}var rs=!1;function _i(e){if(e==="all_reels")return 1/0;let t=parseInt(String(e).replace("_reels",""),10);return Number.isFinite(t)&&t>0?t:1/0}function uo(e){if(typeof e=="string"&&e.startsWith("custom_")){let n=/^custom_(\d+)_(\d+)$/.exec(e);if(n){let o=parseInt(n[1],10),r=new Date(parseInt(n[2],10));return r.setHours(23,59,59,999),[o,r.getTime()]}return null}let t=new Date,s={"1_week":7,"1_month":30,"3_month":90,"6_month":180,"1_year":360,all_reels:3600}[e];return s===void 0?null:(t.setDate(t.getDate()-s),[t.getTime(),1/0])}function ki(e){let t=null;for(let s of e){if(!s.item||s.item.pinned)continue;let n=Date.parse(s.item.createDate);Number.isFinite(n)&&(t===null||n<t)&&(t=n)}return t}function Si(e){return e.length&&e[0].item&&e[0].item._sfSeq!==void 0?e.slice().sort((s,n)=>(s.item._sfSeq||0)-(n.item._sfSeq||0)):e.slice().sort((s,n)=>{let o=s.item&&s.item.pinned?1:0,r=n.item&&n.item.pinned?1:0;if(o!==r)return r-o;let a=s.item&&s.item.createDate?Date.parse(s.item.createDate):0;return(n.item&&n.item.createDate?Date.parse(n.item.createDate):0)-a})}function Ei(e,t){let s=e.dates_items==="dates",n=e.no_items==="all_reels";return t.surface==="explore_search"?!(s||n||e.sort_by==="views"):t.surface==="saved"?!(s||e.sort_by==="views"||t.savedSubMode==="all_posts"&&e.sort_by==="comments"):!(t.tab==="Posts"&&e.sort_by==="views")}function mo(e){let t=window.__sfReels,s=i=>(rs&&console.log("[sf-resort] cold:",i,e),{warm:!1,reason:i});if(!t||!t.ctx)return s("no state");if(!Array.isArray(t.allCollected)||!t.allCollected.length)return s("no items");let n=t.ctx;if(n.empty)return s("previous sort was empty");if(n.path!==location.pathname)return s("different page");if(n.surface!=="profile"&&n.surface!=="saved"&&n.surface!=="explore_search")return s("unknown surface");if(n.surface==="explore_search"&&n.search!==location.search)return s("different search query");if(n.surface==="profile"){let i=sessionStorage.getItem("sortFeedPostsVSReels")||Li();if(!i||i!==n.tab)return s("different or unknown tab")}if(e.sort_by==="outlier"||e.outlier_scores===!0){if(n.surface!=="profile")return s("outlier is profile-only");let i=typeof oe<"u"?oe:null;if(!i||i.status!=="ok"||!(i.baseline>0))return s("no outlier baseline available")}if(!Ei(e,n))return s("request rejected on this surface");let o=e.dates_items==="dates",r=n.mode==="dates";if(n.mode===e.dates_items&&n.selection===e.no_items)return{warm:!0,plan:{mode:o?"dates":"items",scope:"all",selection:e.no_items,sortBy:e.sort_by}};if(o){let i=uo(e.no_items);if(!i)return s("unknown date selection");if(n.feedExhausted)return On(e,i);if(r){let l=uo(n.selection);return l?i[0]<l[0]?s("date range starts before the one we collected"):i[1]>l[1]?s("date range ends after the one we collected"):On(e,i):s("unknown previous date selection")}let c=ki(t.allCollected);return c===null||c>i[0]?s("collected items don't reach back far enough"):On(e,i)}if(r&&!n.feedExhausted){if(n.pinnedSkipped)return s("date sort skipped a pinned item");if(typeof n.selection=="string"&&n.selection.startsWith("custom_"))return s("custom range isn't a run from now")}let a=_i(e.no_items);return!n.feedExhausted&&t.allCollected.length<a?s("more items requested than collected"):{warm:!0,plan:{mode:"items",selection:e.no_items,sortBy:e.sort_by,count:a}}}function On(e,t){return{warm:!0,plan:{mode:"dates",selection:e.no_items,sortBy:e.sort_by,startMs:t[0],endMs:t[1]}}}function Li(){try{let e=location.pathname.replace(/^\/|\/$/g,"").split("/").filter(Boolean);return e.length===1?"Posts":e.length===2&&e[1].toLowerCase()==="reels"?"Reels":null}catch{return null}}function Mi(e){let t=window.__sfReels;if(!t||!e)return null;let s;if(e.scope==="all"?s=t.allCollected.slice():e.mode==="items"?s=Number.isFinite(e.count)?Si(t.allCollected).slice(0,e.count):t.allCollected.slice():s=t.allCollected.filter(a=>{let i=a.item&&a.item.createDate?Date.parse(a.item.createDate):NaN;return Number.isFinite(i)&&i>=e.startMs&&i<=e.endMs}),!s.length)return null;let n=t.displaySelection||t.ctx&&t.ctx.selection,o=t.displayMode||t.ctx&&t.ctx.mode,r=e.selection!==n||e.mode!==o;return t.displaySelection=e.selection,t.displayMode=e.mode,t.all=s,t.sortBy=e.sortBy,t.filters=null,typeof gt=="function"&&gt(),Ii(e,s.length),rs&&console.log("[sf-resort] warm run",e,"\u2192",s.length,"items (was",(t.view||t.all||[]).length,"on screen)"),Cs("popup-resort"),typeof ao=="function"&&ao(e.sortBy),rs&&console.log("[sf-resort] warm:",e,"\u2192",s.length,"items"),{count:s.length,noun:typeof vt=="function"?vt(s.length,t.label||"Reels"):t.label||"Reels",selectionChanged:r}}function Ii(e,t){let s=document.getElementById("sf-banner-subheader");if(!s||typeof Gn!="function")return;let n=vt(t,window.__sfReels&&window.__sfReels.label||"Reels"),o=Gn(t,n,e.mode==="dates"?"dates":"items",e.selection);if(!o)return;let r=String(t),a=o.startsWith(r)?o.slice(r.length):" "+o;s.setAttribute("data-sf-suffix",encodeURIComponent(a))}function Ti(){if(document.getElementById("sf-explore-overrides"))return;let e=document.createElement("style");e.id="sf-explore-overrides",e.textContent=`
    /* Kill IG's infinite-scroll spinner only \u2014 narrowly target the SVG
     * itself, not "any element that contains it". An earlier :has(>...)
     * version could swallow ancestors that also contained IG's sticky
     * header, leaving items unclipped on scroll. */
    body[data-sf-explore-sort-active="true"] svg[aria-label="Loading..."] {
      display: none !important;
    }

    /* Banner needs a low but non-auto z-index so the Export dropdown
     * (z-index 2147483647) reliably paints above sorted-grid tiles, which
     * often live in their own stacking contexts (transform / will-change /
     * etc.). A modest value of 10 wins against auto-z items but stays
     * comfortably below IG's sticky search header (which we lock at 1000
     * below). */
    body[data-sf-explore-sort-active="true"] #banner_most_viewed_reels {
      z-index: 10 !important;
    }

    /* Pin IG's search-results header ("Nike", "running", etc.) to the top
     * of the viewport. IG's natural sticky breaks once we hide the original
     * grid (display:none shrinks the containing block, so the sticky
     * boundary collapses early and items scroll past the header). Forcing
     * sticky + a high z-index + a solid background keeps items from
     * showing above it on scroll. Light/dark backgrounds match IG's theme. */
    body[data-sf-explore-sort-active="true"] main > div > div.html-div:first-child {
      position: sticky !important;
      top: 0 !important;
      z-index: 1000 !important;
      background-color: rgb(255, 255, 255) !important;
    }
    html[class*="dark" i] body[data-sf-explore-sort-active="true"] main > div > div.html-div:first-child {
      background-color: rgb(0, 0, 0) !important;
    }

    /* Flip the Export dropdown and button tooltips to open DOWNWARD on
     * explore. Upward is where IG's chrome lives and that area both clips
     * (overflow) and over-paints (stacking) our content \u2014 opening into the
     * sorted-grid area below sidesteps both. */
    body[data-sf-explore-sort-active="true"] #banner_most_viewed_reels .sf-menu {
      bottom: auto !important;
      top: calc(100% + 8px) !important;
      transform-origin: top right !important;
    }
    body[data-sf-explore-sort-active="true"] #banner_most_viewed_reels .tooltip {
      bottom: auto !important;
      top: calc(100% + 6px) !important;
    }
  `,document.head.appendChild(e)}function Bi(){let e=document.querySelector('main a[href^="/p/"]')||document.querySelector('a[href^="/p/"]');if(!e)return null;let t=e.parentElement,s=0;for(;t&&t!==document.body&&t!==document.documentElement&&s<12;){if(Array.from(t.children).filter(o=>o.querySelector&&o.querySelector('a[href^="/p/"]')).length>=2)return t;t=t.parentElement,s++}return null}function Ri(e){let t=0,s=0,n=0;try{let r=getComputedStyle(e);s=parseFloat(r.columnGap)||0,n=parseFloat(r.rowGap)||0;let a=e.firstElementChild;if(a&&(t=a.getBoundingClientRect().width),!t&&r.gridTemplateColumns&&r.gridTemplateColumns!=="none"){let i=r.gridTemplateColumns.trim().split(/\s+/).length,c=e.getBoundingClientRect().width;i>=1&&c>0&&(t=(c-s*(i-1))/i)}}catch{}return`display: grid;grid-template-columns: repeat(auto-fill, minmax(${Math.max(80,Math.round((t||220)-2))}px, 1fr));column-gap: ${Math.round(s)}px;row-gap: ${Math.round(n)}px;padding-bottom: 0px; padding-top: 0px; position: relative;`}var Mt=null,zn=0;function Pi(e,t){Mt&&(Mt.disconnect(),Mt=null);let s=[],n=e.parentElement;for(let a=0;a<5&&n&&n!==document.body&&(s.push(n),n.tagName!=="MAIN");a++)n=n.parentElement;if(!s.length)return;let o=a=>a instanceof HTMLElement&&a!==t&&a.id!=="div_most_viewed_reels"&&!t.contains(a)&&!a.contains(t)&&typeof a.querySelector=="function"&&a.querySelector('a[href^="/p/"]'),r=()=>{document.body.getAttribute("data-sf-explore-sort-active")==="true"&&s.forEach(a=>Array.from(a.children).forEach(i=>{i.dataset&&i.dataset.sfExploreHidden==="1"||o(i)&&(i.style.setProperty("display","none","important"),i.dataset.sfExploreHidden="1")}))};r(),Mt=new MutationObserver(()=>{zn||(zn=requestAnimationFrame(()=>{zn=0,r()}))}),s.forEach(a=>Mt.observe(a,{childList:!0,subtree:!0}))}function Ai(e){return new Promise(t=>{let s=Bi();if(!s){console.error("[SortFeed][explore] grid container not found \u2014 DOM may have changed"),t(!1);return}let n=Ri(s);s.style.display="none",Ti(),document.body.setAttribute("data-sf-explore-sort-active","true");let o=document.createElement("div");o.id="div_most_viewed_reels",o.setAttribute("data-sortfeed","true"),o.className=s.className,o.style=n,s.after(o),Pi(s,o),e.forEach(r=>{let a=r.mediaType===2,i=a?`https://www.instagram.com/${r.userName}/reel/${r.code}/`:`https://www.instagram.com/${r.userName}/p/${r.code}/`,c=JSON.stringify({id:r.postID??null,code:r.code??null,userName:r.userName??null,url:i,postsVsReels:"Posts",thumbnailUrl:r.thumbnailUrl??null,createDate:r.createDate||null,likesCount:r.likesCount??null,commentsCount:r.commentsCount??null,viewCount:r.viewCount??null,shareCount:r.shareCount??null,mediaType:r.mediaType??null,caption:r.caption??null}),l;a?l=bs(r.element,ve(r.likesCount),ve(r.commentsCount),r.postID,r.userName,r.code):l=ys(r.element,ve(r.likesCount),ve(r.commentsCount),r.postID,r.userName),l.dataset.sfSortedItem="true",l.dataset.sfItemJson=c,l.style.width="100%",l.style.minWidth="0",o.appendChild(l)}),t(!0)})}function Fi(){if(document.getElementById("sf-saved-overrides"))return;let e=document.createElement("style");e.id="sf-saved-overrides",e.textContent=`
    /* Kill IG's infinite-scroll spinner. Narrowly target the SVG itself,
     * not "any element containing it" \u2014 a :has(>...) selector could
     * accidentally swallow the sticky header wrapper. */
    body[data-sf-saved-sort-active="true"] svg[aria-label="Loading..."] {
      display: none !important;
    }

    /* Banner z-index \u2014 same reasoning as explore: low enough to stay
     * under IG's sticky header, high enough to win against transformed /
     * will-change tiles in the sorted grid. */
    body[data-sf-saved-sort-active="true"] #banner_most_viewed_reels {
      z-index: 10 !important;
    }

    /* Trap the sorted grid in its own stacking context. Without this, the
     * Select-mode circles (z-index: 20) participate in the body's context
     * and paint OVER the banner's Export dropdown (whose menu inherits the
     * banner's z-index: 10). With an explicit z-index here, the grid
     * becomes a stacking context: circles still paint above their tiles,
     * but the grid as a whole sits below the banner. */
    body[data-sf-saved-sort-active="true"] #div_most_viewed_reels {
      z-index: 1 !important;
    }

    /* Pin Saved's header (Back link + "All Posts" / collection name) to
     * the top of the viewport. Hiding the <article> collapses IG's
     * sticky boundary, so we force sticky + high z-index + theme-aware
     * background to prevent sorted items showing above it on scroll. */
    body[data-sf-saved-sort-active="true"] main > div > div.html-div:first-child {
      position: sticky !important;
      top: 0 !important;
      z-index: 1000 !important;
      background-color: rgb(255, 255, 255) !important;
    }
    html[class*="dark" i] body[data-sf-saved-sort-active="true"] main > div > div.html-div:first-child {
      background-color: rgb(0, 0, 0) !important;
    }

    /* Flip the Export dropdown and button tooltips to open DOWNWARD on
     * saved, for the same reason as explore: upward area both clips
     * (overflow) and over-paints (stacking). */
    body[data-sf-saved-sort-active="true"] #banner_most_viewed_reels .sf-menu {
      bottom: auto !important;
      top: calc(100% + 8px) !important;
      transform-origin: top right !important;
    }
    body[data-sf-saved-sort-active="true"] #banner_most_viewed_reels .tooltip {
      bottom: auto !important;
      top: calc(100% + 6px) !important;
    }
  `,document.head.appendChild(e)}function Hi(){let e=document.querySelector('main[role="main"] article');if(e)return e;let t=document.querySelector('main a[href^="/p/"]')||document.querySelector('a[href^="/p/"]');if(!t)return null;let s=t.parentElement,n=0;for(;s&&s!==document.body&&s!==document.documentElement&&n<12;){let r=Array.from(s.children).filter(a=>a.querySelector&&a.querySelector('a[href^="/p/"]'));if(r.length>=2){let a=r[0];if(Array.from(a.children).filter(c=>c.querySelector&&c.querySelector('a[href^="/p/"]')).length>=2)return s}s=s.parentElement,n++}return null}function Di(e,t,s){let n=[],o=(r,a)=>`<span style="display: flex; align-items: center; gap: 5px;"><img src="${chrome.runtime.getURL(r)}" style="width: 15px; height: 15px; object-fit: contain;" />${a}</span>`;return e!=null&&n.push(o("Icons/Hover/LoveIG.png",ve(e))),t!=null&&n.push(o("Icons/Hover/whiteBubble.png",ve(t))),s!=null&&n.push(o("Icons/Hover/PlayIGFrame.png",ve(s))),n.length===0?"":`<div style="display: flex; flex-direction: column; gap: 30px; align-items: center;">${n.join("")}</div>`}function Ni(e){return new Promise(t=>{let s=Hi();if(!s){console.error("[SortFeed][saved] grid container not found \u2014 DOM may have changed"),t(!1);return}s.style.display="none",Fi(),document.body.setAttribute("data-sf-saved-sort-active","true");let n=document.createElement("div");n.id="div_most_viewed_reels",n.setAttribute("data-sortfeed","true"),n.className=s.className,n.style="display: flex; flex-direction: column; padding-bottom: 0px; padding-top: 0px; position: relative;",s.after(n);let o="_ac7v xat24cr x1f01sob xcghwft xzboxd6",r="x11i5rnm x1ntc13c x9i3mqj x2pgyrj";for(let a=0;a<e.length;a+=3){let i=document.createElement("div");for(i.className=o,e.slice(a,a+3).forEach(l=>{let u=l.mediaType===2,p=u?`https://www.instagram.com/${l.userName}/reel/${l.code}/`:`https://www.instagram.com/${l.userName}/p/${l.code}/`,f=JSON.stringify({id:l.postID??null,code:l.code??null,userName:l.userName??null,url:p,postsVsReels:"Posts",thumbnailUrl:l.thumbnailUrl??null,createDate:l.createDate||null,likesCount:l.likesCount??null,commentsCount:l.commentsCount??null,viewCount:l.viewCount??null,shareCount:l.shareCount??null,mediaType:l.mediaType??null,caption:l.caption??null}),d;u?d=bs(l.element,null,null,l.postID,l.userName,l.code):d=ys(l.element,null,null,l.postID,l.userName);let m=d.querySelector("[data-sf-custom-ui] > div");m&&!m.querySelector(".sf-cm-kpi")&&(m.innerHTML=Di(l.likesCount,l.commentsCount,l.viewCount)),d.dataset.sfSortedItem="true",d.dataset.sfItemJson=f,i.appendChild(d)});i.children.length<3;){let l=document.createElement("div");l.className=r,i.appendChild(l)}n.appendChild(i)}t(!0)})}window.addEventListener("message",e=>{if(e.data.insta_banner_notification)tl(e.data.count,e.data.type,e.data.scanProgress);else if(e.data.insta_date_range_empty){let t=e.data.type==="Reels"?"Reels":"Posts";cs(`Hmm! there's no ${t} in this date range`)}else e.data.sf_outlier_analyzing?sl(e.data.count,e.data.progress):e.data.sf_outlier_insufficient?is=e.data.metric==="likes"?"Needs a few more posts to measure outliers \u2014 sorted by likes instead":"Needs a few more reels to measure outliers \u2014 sorted by views instead":e.data.sf_outlier_no_breakout&&(ls="No outliers \u2014 nothing over 2\xD7 this account's median")});function pr(){let e=document.getElementById("sf-banner-stack");return e||(e=document.createElement("div"),e.id="sf-banner-stack",e.style.cssText=["position:fixed","top:15%","left:50%","transform:translateX(-50%)","display:flex","flex-direction:column","gap:8px","width:90%","max-width:600px","z-index:100000"].join(";"),document.body.appendChild(e)),e}function $i(){let e=parseInt(sessionStorage.getItem("sortFeedNoItems"));return Number.isFinite(e)&&e>0?e:0}function qi(){return sessionStorage.getItem("sortItemsVsDates")||"items"}var on=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ui(e,t){let s=new Date(e),n=new Date(t),o=new Date;return s.getFullYear()===n.getFullYear()&&s.getFullYear()===o.getFullYear()?`${on[s.getMonth()]} ${s.getDate()} to ${on[n.getMonth()]} ${n.getDate()}`:`${on[s.getMonth()]} ${s.getDate()}, ${s.getFullYear()} to ${on[n.getMonth()]} ${n.getDate()}, ${n.getFullYear()}`}function ho(e,t){if(e===0){let s=sessionStorage.getItem("sortFeedNoItems")||"",n=/^custom_(\d+)_(\d+)$/.exec(s);if(n)return`Searching ${Ui(parseInt(n[1],10),parseInt(n[2],10))} \u2014 don't scroll`}return`${e} ${t} sorted \u2014 don't scroll`}function cn(e,t,s){let n=/^(\d+)(\s[\s\S]*)$/.exec(t);if(!n){e.textContent=t;return}let o=n[1],r=n[2],a=e.querySelector(".sf-count");if(!a){e.textContent="",a=document.createElement("span"),a.className="sf-count",a.style.display="inline-block",a.textContent=o,e.appendChild(a),e.appendChild(document.createTextNode(r));return}let i=a.nextSibling;i&&i.nodeType===Node.TEXT_NODE&&i.textContent!==r&&(i.textContent=r);let c=parseInt(a.textContent,10)||0,l=parseInt(o,10);c!==l&&(s&&s.animate?Vi(a,c,l):a.textContent=String(l))}function Vi(e,t,s){e._sfRampTimer&&(clearTimeout(e._sfRampTimer),e._sfRampTimer=null);let n=Math.abs(s-t);if(!n){e.textContent=String(s);return}let o=Math.max(18,Math.min(60,Math.round(480/n))),r=s>t?1:-1,a=t,i=()=>{a+=r,e.textContent=String(a),e.animate([{opacity:.5,transform:"translateY(-1px)"},{opacity:1,transform:"translateY(0)"}],{duration:Math.min(140,o),easing:"ease-out"}),a!==s?e._sfRampTimer=setTimeout(i,o):e._sfRampTimer=null};e._sfRampTimer=setTimeout(i,o)}function Oi(e,t){let s=e.textContent||"",n=s.startsWith("Searching "),o=t.startsWith("Searching "),r=s.startsWith("Getting ready"),a=!/^\d/.test(t);if(!n&&!o&&!r&&!a){cn(e,t,{animate:!0});return}if(n&&o){cn(e,t);return}let i="cubic-bezier(0.22, 1, 0.36, 1)";e.animate([{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-4px)"}],{duration:150,easing:i,fill:"forwards"}).onfinish=()=>{cn(e,t),e.animate([{opacity:0,transform:"translateY(5px)"},{opacity:1,transform:"translateY(0)"}],{duration:200,easing:i,fill:"forwards"})}}function ur(){Is();try{sessionStorage.setItem("sortFeedStopSorting","on")}catch{}try{window.postMessage({sf_stop_sorting:!0},"*")}catch{}}function zi(e){let t=window.__sfBanner;if(!t||document.querySelector(".sf-sort-banner.sf-progress"))return;let s=document.createElement("div");s.className="sf-banner sf-sort-banner sf-progress sf-prep",s.innerHTML=`
    <img class="sf-icon" src="${t.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-body">
      <div class="sf-message"></div>
    </div>
  `,s.querySelector(".sf-message").textContent=e,s.style.animation="none",pr().appendChild(s),s.animate([{opacity:0,transform:"translateY(-120%)"},{opacity:1,transform:"translateY(10px)",offset:.6},{transform:"translateY(-5px)",offset:.8},{opacity:1,transform:"translateY(0)"}],{duration:360,easing:"ease",fill:"both"})}function mr(e){hr||Is(),e.classList.remove("sf-prep");let t=window.__sfBanner,s=e.querySelector(".sf-body");if(s&&!s.querySelector(".sf-progress-row")){let n=document.createElement("div");n.className="sf-progress-row",n.innerHTML='<div class="sf-progress-track"><div class="sf-progress-fill"></div></div><span class="sf-progress-pct">0%</span>',s.appendChild(n)}t&&!e.querySelector(".sf-banner-stop")&&e.appendChild(t.makeStopButton(ur,"Stop sorting"));try{sessionStorage.removeItem("sortFeedPrepLabel")}catch{}}function ji(){try{let t=location.pathname.replace(/^\/|\/$/g,"").split("/")[2]||"";if(t&&t!=="all-posts"){let s=t;try{s=decodeURIComponent(t)}catch{}let n=s.replace(/[-_]+/g," ").trim();if(n)return n}}catch{}return"Collection"}function Yi(e){return e==="profile"?"Getting ready to sort":e==="search"?"Getting ready to sort Search":e==="saved"?"Getting ready to sort Saved":e==="collection"?"Getting ready to sort "+ji():null}function Zi(e,t=4200){let s=document.querySelector(".sf-sort-banner.sf-progress"),n=()=>{let i=document.getElementById("overlay_sort_reels");i&&(i.style.transition="opacity 380ms ease",i.style.opacity="0",setTimeout(()=>i.remove(),400))};if(!s){n();return}s.classList.add("sf-static");let o=s.querySelector(".sf-icon");o&&o.classList.add("sf-static"),[s.querySelector(".sf-progress-row"),s.querySelector(".sf-banner-stop")].filter(Boolean).forEach(i=>{let c=i.animate([{opacity:1},{opacity:0}],{duration:160,easing:"ease",fill:"forwards"});c.onfinish=()=>i.remove()});let r=s.querySelector(".sf-message"),a="cubic-bezier(0.22, 1, 0.36, 1)";r&&(r.getAnimations().forEach(i=>i.cancel()),r.animate([{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-4px)"}],{duration:150,easing:a,fill:"forwards"}).onfinish=()=>{r.textContent=e,r.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"translateY(0)"}],{duration:240,easing:a,fill:"forwards"})}),setTimeout(()=>{xn(s).then(n)},t);try{chrome.runtime.sendMessage({logo_animate_off:!0})}catch{}}var Gi=1e4,hr=!1,Ht=null;function Is(){Ht!==null&&(clearTimeout(Ht),Ht=null)}function Wi(){Is(),Ht=setTimeout(()=>{Ht=null;let e=document.querySelector(".sf-sort-banner.sf-progress");!hr&&(!e||!e.classList.contains("sf-prep"))||sessionStorage.getItem("sortFeedStopSorting")!=="on"&&(["sortFeedStatus","sortFeedPrepLabel","sortItemsVsDates","sortFeedNoItems","sortFeedSortBy","sortFeedOutlier"].forEach(t=>{try{sessionStorage.removeItem(t)}catch{}}),Zi("Something on this page didn't load the way we expected",4200))},Gi)}function Xi(){let e;try{e=sessionStorage.getItem("sortFeedPrepLabel")}catch{return}let t=Yi(e);if(!t)return;let s=()=>{if(sessionStorage.getItem("sortFeedStopSorting")!=="on"&&!document.querySelector(".sf-sort-banner.sf-progress:not(.sf-prep)")){if(!window.__sfBanner||!document.body||typeof Zn!="function"){setTimeout(s,60);return}Zn(),zi(t),Wi()}};s()}Xi();var gr=95,as=2,Ki=.1,Ji=.012,Qi=.05,Dt=0;function go(e,t){if(!window.__sfBanner||!e||typeof t!="number")return;e._sfCrawlCancel&&(e._sfCrawlCancel(),e._sfCrawlCancel=null);let n=Math.max(0,Math.min(gr,Math.round(t*100))),o=e._sfScan||(e._sfScan={shown:0,step:as,raf:0});n>Dt&&(o.step=Math.max(as,(o.step+(n-Dt))/2),Dt=n),el(e)}function el(e){let t=e._sfScan,s=window.__sfBanner;if(!t||t.raf||!s)return;let n=()=>{if(t.raf=0,!e.isConnected||!e.querySelector(".sf-progress-fill"))return;let o=Dt,r=Math.min(gr,o+t.step/2);o-t.shown>Qi?t.shown+=(o-t.shown)*Ki:t.shown<o?t.shown=o:t.shown<r&&(t.shown+=(r-t.shown)*Ji),s.setProgress(e,t.shown),t.raf=requestAnimationFrame(n)};t.raf=requestAnimationFrame(n)}function Ts(e){Dt=0;let t=e&&e._sfScan;t&&(t.raf&&cancelAnimationFrame(t.raf),t.raf=0,t.shown=0,t.step=as)}function tl(e=25,t="Posts",s){let n=window.__sfBanner;if(!n)return;let o=document.querySelector(".sf-sort-banner.sf-progress"),r=qi(),a=$i(),i=typeof s=="number";if(o){o.classList.contains("sf-prep")&&mr(o);let l=o.querySelector(".sf-message");if(l&&Oi(l,ho(e,t)),i)go(o,s);else if(r==="items"&&a>0){let u=Math.min(100,Math.round(e/a*100));n.setProgress(o,u)}return}let c=document.createElement("div");if(c.className="sf-banner sf-sort-banner sf-progress",c.innerHTML=`
    <img class="sf-icon" src="${n.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-body">
      <div class="sf-message"></div>
      <div class="sf-progress-row">
        <div class="sf-progress-track"><div class="sf-progress-fill"></div></div>
        <span class="sf-progress-pct">0%</span>
      </div>
    </div>
  `,cn(c.querySelector(".sf-message"),ho(e,t)),c.appendChild(n.makeStopButton(ur,"Stop sorting")),pr().appendChild(c),i)go(c,s);else if(r==="items"&&a>0){let l=Math.min(100,Math.round(e/a*100));n.setProgress(c,l)}else c._sfCrawlCancel=n.animateProgress(c,0,90,6e4)}var ht=0,is=null,ls=null;function nl(e,t){let s=window.__sfBanner;if(!(!s||!e||typeof t!="number")){if(!ht){let n=e.querySelector(".sf-progress-pct");ht=n&&parseInt(n.textContent,10)||0}ht=Math.max(ht,Math.min(95,Math.round(t*100))),s.setProgress(e,ht)}}function sl(e,t){let s=document.querySelector(".sf-sort-banner.sf-progress");s&&(s.classList.contains("sf-prep")&&mr(s),s._sfCrawlCancel&&(s._sfCrawlCancel(),s._sfCrawlCancel=null),Ts(s),nl(s,t))}function xn(e){return!e||!e.isConnected?Promise.resolve():new Promise(t=>{let s=()=>{e.isConnected&&e.remove(),t()};e.getAnimations().forEach(o=>o.cancel());let n=e.animate([{opacity:1,transform:"translateY(0)"},{transform:"translateY(-10px)",offset:.2},{opacity:0,transform:"translateY(-120%)"}],{duration:250,easing:"ease",fill:"forwards"});n.onfinish=s,n.oncancel=s,setTimeout(s,320)})}function ol(){let e=document.querySelector(".sf-sort-banner.sf-progress");if(!e)return;Ts(e);let t=window.__sfBanner,s=e.querySelector(".sf-progress-pct"),n=s&&parseInt(s.textContent)||0;t&&n<100?t.animateProgress(e,n,100,300,()=>{xn(e)}):xn(e)}function cs(e,t=1800){let s=document.getElementById("overlay_sort_reels");s&&s.remove(),(window.scrollY||window.pageYOffset||0)>0&&window.scrollTo({top:0,behavior:"smooth"});let n=document.querySelector(".sf-sort-banner.sf-progress");if(n){Ts(n),n.classList.add("sf-static");let o=n.querySelector(".sf-icon");o&&o.classList.add("sf-static"),[n.querySelector(".sf-progress-row"),n.querySelector(".sf-banner-stop")].filter(Boolean).forEach(a=>{let i=a.animate([{opacity:1},{opacity:0}],{duration:160,easing:"ease",fill:"forwards"});i.onfinish=()=>a.remove()});let r=n.querySelector(".sf-message");if(r){r.getAnimations().forEach(i=>i.cancel());let a="cubic-bezier(0.22, 1, 0.36, 1)";r.animate([{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-4px)"}],{duration:150,easing:a,fill:"forwards"}).onfinish=()=>{r.textContent=e,r.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"translateY(0)"}],{duration:240,easing:a,fill:"forwards"})}}setTimeout(()=>xn(n),t)}try{chrome.runtime.sendMessage({logo_animate_off:!0})}catch{}}window.addEventListener("message",e=>{if(e.data.insta_banner_notification_remove){let t=is,s=ls;if(is=null,ls=null,ht=0,t){cs(t,4e3);return}if(s){cs(s,4500);return}let n=document.getElementById("overlay_sort_reels");n&&n.remove(),ol()}});var Ke="data-sf-hover-injected",Yt="sf-hover-btns-wrapper",In=!0,Tn=!0;chrome.storage.local.get(["sortfeed_ig_download_enabled","sortfeed_ig_transcribe_enabled"],e=>{e.sortfeed_ig_download_enabled===!1&&(In=!1),e.sortfeed_ig_transcribe_enabled===!1&&(Tn=!1)});chrome.storage.onChanged.addListener(e=>{"sortfeed_ig_download_enabled"in e&&(In=e.sortfeed_ig_download_enabled.newValue!==!1,yo()),"sortfeed_ig_transcribe_enabled"in e&&(Tn=e.sortfeed_ig_transcribe_enabled.newValue!==!1,yo())});function yo(){document.querySelectorAll(`[${Ke}]`).forEach(e=>{e.removeAttribute(Ke),e.querySelector(`.${Yt}`)?.remove()}),Bs()}function rl(e){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",s=BigInt(0);for(let n of e){let o=t.indexOf(n);o!==-1&&(s=s*BigInt(64)+BigInt(o))}return s.toString()}function al(){return window.location.pathname.replace(/^\/|\/$/g,"").split("/")[0]||""}function il(){let e=window.location.pathname;if(/\/saved\/audio\/?$/.test(e))return!1;if(/\/saved\//.test(e)||/^\/explore\/?$/.test(e)||/^\/explore\/search\/?/.test(e))return!0;let t=["explore","reels","stories","direct","accounts","notifications","p","reel","tv","locations","hashtag","audio"],s=e.replace(/^\/|\/$/g,"").split("/");return!!(s.length===1&&!t.includes(s[0])||s.length===2&&["reels","tagged"].includes(s[1]))}function ll(e){let t=e.getAttribute("href")||"";return!!(/\/reel\/[^\/]+\//.test(t)||e.querySelector('[aria-label="Clip"], [aria-label*="Reel"], [aria-label*="Video"]')||e.querySelector("video"))}function cl(){if(document.getElementById("sf-hover-style"))return;let e=document.createElement("style");e.id="sf-hover-style",e.textContent=`
    .${Yt} {
      position: absolute;
      bottom: 10px; right: 10px;
      display: flex; flex-direction: column; gap: 5px;
      align-items: flex-end;
      opacity: 0;
      pointer-events: none;
      z-index: 10;
    }

    /* Show on anchor hover \u2014 CSS keeps IG's KPI layer alive */
    a[${Ke}]:hover .${Yt} {
      opacity: 1;
      pointer-events: auto;
    }

    .sf-hover-btn {
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; position: relative;
      opacity: 0.90;
      transition: opacity 180ms ease;
    }

    .sf-hover-btn:hover {
      opacity: 1;
    }

    .sf-hover-btn img {
      width: 9px; height: 9px; border-radius: 3px;
      background: #fff; padding: 5px;
    }

    .sf-hover-tip {
      position: absolute; top: 50%; left: -6px;
      transform: translate(-100%, -50%);
      background: #000; color: #fff; font-size: 10px; line-height: 1;
      padding: 4px 8px; border-radius: 6px; white-space: nowrap;
      opacity: 0; pointer-events: none; z-index: 99999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: opacity 120ms ease;
    }

    .sf-hover-btn:hover .sf-hover-tip {
      opacity: 1;
    }
  `,document.head.appendChild(e)}function bo(e,t,s,n,o){let r=e==="trans"?chrome.runtime.getURL("Icons/Hover/trans.png"):chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),a=e==="trans"?"Transcribe":"Download",i=document.createElement("div");i.className="sf-hover-btn",i.dataset.sfAction="true";let c=document.createElement("img");c.src=r;let l=document.createElement("div");return l.className="sf-hover-tip",l.textContent=a,i.addEventListener("click",u=>{u.stopPropagation(),u.preventDefault(),e==="download"?window.postMessage({download:!0,download_item:o?"reels":"posts",download_reel_id:o?t:void 0,download_post_id:o?void 0:t,download_profile_name:n}):window.postMessage({trans:!0,download_reel_id:t,download_profile_name:n,download_reel_id_ui:s})}),i.appendChild(c),i.appendChild(l),i}function fl(e,t,s){if(e.hasAttribute(Ke))return;e.setAttribute(Ke,"true");let n=rl(t),o=al(),r=document.createElement("div");if(r.className=Yt,s&&Tn&&r.appendChild(bo("trans",n,t,o,s)),In&&r.appendChild(bo("download",n,t,o,s)),!r.hasChildNodes())return;let a=e.querySelector("._aajz");a?a.appendChild(r):e.appendChild(r)}function Bs(){if(!il()||sessionStorage.getItem("sortFeedStatus")==="true"||!In&&!Tn)return;Array.from(document.querySelectorAll("a[href]")).filter(t=>/\/(p|reel)\/[^\/]+\//.test(t.getAttribute("href")||"")).forEach(t=>{let n=t.getAttribute("href").match(/\/(p|reel)\/([^\/]+)\//);if(!n)return;let o=n[2];if(t.hasAttribute(Ke))return;let r=ll(t);fl(t,o,r)})}function yr(){document.querySelectorAll(`.${Yt}`).forEach(e=>e.remove()),document.querySelectorAll(`[${Ke}]`).forEach(e=>e.removeAttribute(Ke))}var Co=window.location.pathname,vo=null,dl=new MutationObserver(()=>{window.location.pathname!==Co&&(Co=window.location.pathname,yr()),clearTimeout(vo),vo=setTimeout(Bs,300)});window.addEventListener("message",e=>{e.data&&e.data.sf_sort_started&&yr()});function wo(){cl(),dl.observe(document.body,{childList:!0,subtree:!0}),Bs()}document.body?wo():document.addEventListener("DOMContentLoaded",wo);(function(){let e="sf-sp-pill",t=!0,s=!0;chrome.storage.local.get(["sortfeed_ig_download_enabled","sortfeed_ig_transcribe_enabled"],S=>{S.sortfeed_ig_download_enabled===!1&&(t=!1),S.sortfeed_ig_transcribe_enabled===!1&&(s=!1)}),chrome.storage.onChanged.addListener(S=>{"sortfeed_ig_download_enabled"in S&&(t=S.sortfeed_ig_download_enabled.newValue!==!1,te(),F()),"sortfeed_ig_transcribe_enabled"in S&&(s=S.sortfeed_ig_transcribe_enabled.newValue!==!1,te(),F())});function n(){return/\/(p|reel|reels)\/[^\/]+\/?$/.test(window.location.pathname)}function o(){let S=window.location.pathname.match(/\/(p|reel|reels)\/([^\/]+)/);return S?S[2]:null}function r(){return/\/(reel|reels)\//.test(window.location.pathname)}function a(S){let Y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",O=BigInt(0);for(let Z of S){let G=Y.indexOf(Z);G!==-1&&(O=O*BigInt(64)+BigInt(G))}return O.toString()}let i=["explore","reels","reel","p","direct","accounts","stories","notifications"];function c(){let S=window.location.pathname.match(/^\/([^\/]+)\/(p|reel)\//);if(S)return S[1];let Y=o();if(Y){let B=document.querySelector(`a[href*="/${Y}/"]`);if(B){let U=(B.getAttribute("href")||"").match(/^\/([^\/]+)\/(p|reel|reels)\//);if(U)return U[1]}}let O=document.querySelectorAll('a[role="link"][href*="/reels/"]');for(let B of O){let U=(B.getAttribute("href")||"").match(/^\/([^\/]+)\/reels\//);if(U&&!i.includes(U[1]))return U[1]}let Z=document.querySelectorAll('img[alt*="profile picture"]');for(let B of Z){let U=(B.getAttribute("alt")||"").match(/^([^']+)'s profile picture/);if(U){let re=U[1].trim();if(re&&!i.includes(re))return re}}let G=document.querySelectorAll('header a[href*="/"]');for(let B of G){let U=(B.getAttribute("href")||"").match(/^\/([^\/]+)\/?$/);if(U&&!i.includes(U[1]))return U[1]}let ce=document.querySelector('a[role="link"][href^="/"][tabindex="0"]');if(ce){let P=(ce.getAttribute("href")||"").match(/^\/([^\/]+)\/?$/);if(P&&!i.includes(P[1]))return P[1]}return""}function l(){if(document.getElementById("sf-sp-style"))return;let S=document.createElement("style");S.id="sf-sp-style",S.textContent=`
      @keyframes sf-sp-fadein {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
      }

      #${e} {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: flex-end;
        z-index: 10;
        animation: sf-sp-fadein 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
      }

      .sf-sp-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        opacity: 0.80;
        transition: opacity 180ms ease;
      }

      .sf-sp-btn:hover {
        opacity: 1 !important;
      }

      .sf-sp-btn img {
        width: 9px;
        height: 9px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.72);
        padding: 5px;
      }

      .sf-sp-tip {
        position: absolute;
        top: 50%;
        left: -6px;
        transform: translate(-100%, -50%);
        background: #000;
        color: #fff;
        font-size: 0.75rem; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;
        line-height: 1;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        z-index: 99999;
        transition: opacity 120ms ease;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .sf-sp-beta {
        font-size: 0.5rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        background: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.55);
        border-radius: 3px;
        padding: 1.5px 4px;
      }

      .sf-sp-btn:hover .sf-sp-tip {
        opacity: 1 !important;
      }
    `,document.head.appendChild(S)}function u(S,Y,O,Z,G){let ce=S==="trans"?chrome.runtime.getURL("Icons/Hover/trans.png"):chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),B=S==="trans"?"Transcribe":"Download",P=document.createElement("div");P.className="sf-sp-btn";let U=document.createElement("img");U.src=ce;let re=document.createElement("div");re.className="sf-sp-tip";let _e=document.createElement("span");return _e.textContent=B,re.appendChild(_e),P.appendChild(U),P.appendChild(re),P.addEventListener("click",Ge=>{Ge.stopPropagation(),Ge.preventDefault(),S==="download"?window.postMessage({download:!0,download_item:G?"reels":"posts",download_reel_id:G?Y:void 0,download_post_id:G?void 0:Y,download_profile_name:Z,download_code:O}):window.postMessage({trans:!0,download_reel_id:Y,download_profile_name:Z,download_reel_id_ui:O})}),P}function p(){if(f()){let B=document.querySelector('div[role="presentation"]');if(B){let P=B;for(;P.parentElement;){if(P=P.parentElement,P.getAttribute("role")==="button"&&P.hasAttribute("tabindex")){let U=P.getBoundingClientRect();if(U.width>200&&U.height>200)return{el:P,hasVideo:!!P.querySelector("video")}}if(P.tagName==="ARTICLE"||P===document.body)break}for(P=B;P.parentElement;){P=P.parentElement;let U=P.getBoundingClientRect();if(U.width>200&&U.height>200)return{el:P,hasVideo:!!P.querySelector("video")};if(P.tagName==="ARTICLE"||P===document.body)break}}}let S=document.querySelectorAll('div[aria-label="Video player"][role="group"]');if(S.length>1)for(let B of S){let P=B.getBoundingClientRect();if(P.top>=-100&&P.top<window.innerHeight/2)return{el:B,hasVideo:!0}}let Y=S[0];if(Y)return{el:Y,hasVideo:!0};let O=document.querySelector("div._aatk");if(O){let B=O.querySelector('div[role="button"][tabindex]');if(B)return{el:B,hasVideo:!!B.querySelector("video")}}for(let B of["article._aatb","article._ab6k","article._aalr"]){let P=document.querySelector(B);if(P){let U=P.querySelector('div[role="button"][tabindex]');if(U){let re=U.getBoundingClientRect();if(re.width>250&&re.height>250)return{el:U,hasVideo:!!U.querySelector("video")}}}}let Z=document.querySelector("div._aagu");if(Z){let B=Z;for(;B.parentElement;){if(B=B.parentElement,B.getAttribute("role")==="button"&&B.hasAttribute("tabindex"))return{el:B,hasVideo:!!B.querySelector("video")};if(B.tagName==="ARTICLE"||B===document.body)break}for(B=Z;B.parentElement;){B=B.parentElement;let P=B.getBoundingClientRect();if(P.width>200&&P.height>200)return{el:B,hasVideo:!!B.querySelector("video")};if(B.tagName==="ARTICLE"||B===document.body)break}return{el:Z,hasVideo:!1}}let G=document.querySelector("video");if(G){let B=G;for(;B.parentElement;){if(B=B.parentElement,B.getAttribute("role")==="button"&&B.hasAttribute("tabindex")){let P=B.getBoundingClientRect();if(P.width>250&&P.height>250)return{el:B,hasVideo:!0}}if(B===document.body)break}}let ce=document.querySelectorAll('img[crossorigin="anonymous"]');for(let B of ce){let P=B.getBoundingClientRect();if(P.width<200||P.height<200)continue;let U=B;for(;U.parentElement;){if(U=U.parentElement,U.getAttribute("role")==="button"&&U.hasAttribute("tabindex"))return{el:U,hasVideo:!!U.querySelector("video")};if(U.tagName==="ARTICLE"||U===document.body)break}}return null}function f(){return!!document.querySelector("._acnb")}function d(){let S=new URLSearchParams(window.location.search);return parseInt(S.get("img_index")||"1",10)}let m=null;function g(){return m!==null||(d()<=1?m=!!document.querySelector("video"):m=!1),m}let k=null;function _(){let S=document.querySelector("#"+e+" .sf-sp-btn-trans");if(!S)return;d()<=1&&g()?(S.style.opacity="",S.style.pointerEvents="",S.style.maxHeight="30px",S.style.marginBottom=""):(S.style.opacity="0",S.style.pointerEvents="none",S.style.maxHeight="0px",S.style.marginBottom="-5px")}function y(){if(k)return;let S=window.location.search;k=setInterval(()=>{window.location.search!==S&&(S=window.location.search,_())},200)}function x(){k&&(clearInterval(k),k=null),m=null}let L="data-sf-reels-injected",I=null;function q(){return/\/reels\//.test(window.location.pathname)}function v(S){let Y=S.querySelector('a[role="link"][href*="/reels/"]');if(Y){let Z=(Y.getAttribute("href")||"").match(/^\/([^\/]+)\/reels\//);if(Z&&!i.includes(Z[1]))return Z[1]}let O=S.querySelector('img[alt*="profile picture"]');if(O){let Z=(O.getAttribute("alt")||"").match(/^([^']+)'s profile picture/);if(Z)return Z[1].trim()}return""}function M(S,Y){let O=S==="trans"?chrome.runtime.getURL("Icons/Hover/trans.png"):chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),Z=S==="trans"?"Transcribe":"Download",G=document.createElement("div");G.className="sf-sp-btn";let ce=document.createElement("img");ce.src=O;let B=document.createElement("div");B.className="sf-sp-tip";let P=document.createElement("span");return P.textContent=Z,B.appendChild(P),G.appendChild(ce),G.appendChild(B),G.addEventListener("click",U=>{U.stopPropagation(),U.preventDefault();let re=o()||"",_e=a(re),Ge=v(Y)||c();S==="download"?window.postMessage({download:!0,download_item:"reels",download_reel_id:_e,download_profile_name:Ge,download_code:re}):window.postMessage({trans:!0,download_reel_id:_e,download_profile_name:Ge,download_reel_id_ui:re})}),G}function J(S){if(S.hasAttribute(L))return;S.setAttribute(L,"true");let Y=S.querySelector('div[aria-label="Video player"][role="group"]');if(!Y)return;let O=getComputedStyle(Y).position;(O==="static"||O==="")&&(Y.style.position="relative");let Z=document.createElement("div");Z.className="sf-sp-pill-reels",Z.style.cssText=`
      position: absolute; top: 10px; right: 10px;
      display: flex; flex-direction: column; gap: 5px; align-items: flex-end;
      z-index: 10;
      animation: sf-sp-fadein 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
    `,s&&Z.appendChild(M("trans",S)),t&&Z.appendChild(M("download",S)),Y.appendChild(Z)}function pe(){let S=document.querySelector('div[tabindex="-1"][style*="scroll-snap"]')||document.querySelector('div[tabindex="-1"].x1pq812k');if(!S)return!1;let Y=S.children;for(let O of Y)O.tagName==="DIV"&&J(O);return I||(I=new MutationObserver(O=>{for(let Z of O)for(let G of Z.addedNodes)G.nodeType===1&&G.tagName==="DIV"&&setTimeout(()=>J(G),200)}),I.observe(S,{childList:!0})),!0}function T(){I&&(I.disconnect(),I=null),document.querySelectorAll(".sf-sp-pill-reels").forEach(S=>S.remove()),document.querySelectorAll(`[${L}]`).forEach(S=>S.removeAttribute(L))}function $(){let S=document.getElementById(e);return S&&document.body.contains(S)}function V(){if(!n()||!t&&!s)return!1;if(q())return pe();if($())return!0;te();let S=o();if(!S)return!1;let Y=p();if(!Y)return!1;let{el:O,hasVideo:Z}=Y,G=getComputedStyle(O).position;(G==="static"||G==="")&&(O.style.position="relative");let ce=a(S),B=c(),P=r()||Z,U=f(),re=document.createElement("div");return re.id=e,U?(t&&re.appendChild(u("download",ce,S,B,!1)),O.appendChild(re)):(P&&s&&re.appendChild(u("trans",ce,S,B,!0)),t&&re.appendChild(u("download",ce,S,B,P)),O.appendChild(re)),!0}function te(){let S=document.getElementById(e);S&&S.remove(),T(),x()}let ne=null;function F(){if(ee(),!n())return;let S=0,Y=25;function O(){S>=Y||n()&&(S++,V()||(ne=setTimeout(O,150)))}O()}function ee(){ne&&(clearTimeout(ne),ne=null)}let ue=location.pathname;function z(){setTimeout(()=>{location.pathname!==ue&&(ue=location.pathname,ee(),te(),F())},0)}let j=history.pushState;history.pushState=function(){j.apply(this,arguments),z()};let H=history.replaceState;history.replaceState=function(){H.apply(this,arguments),z()},window.addEventListener("popstate",z);let ie=null,Ce=new MutationObserver(()=>{clearTimeout(ie),ie=setTimeout(()=>{n()&&!$()&&F()},100)});function le(){l(),Ce.observe(document.body,{childList:!0,subtree:!0}),F()}document.body?le():document.addEventListener("DOMContentLoaded",le)})();var Zt=null;function pt(){window.__sfBanner.guards.isGSheetsLoading=!1,Zt=null}function Jt(){return document.querySelector(".sf-gsheets-banner.sf-progress")}function pl(){let e=Jt();if(!e)return 0;let t=e.querySelector(".sf-progress-pct");return t&&parseInt(t.textContent)||0}function ul(){let e=window.__sfBanner;if(Jt())return;let t=document.createElement("div");t.className="sf-banner sf-gsheets-banner sf-progress",t.innerHTML=`
    <img class="sf-icon" src="${e.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-body">
      <div class="sf-message">Creating Google Sheet</div>
      <div class="sf-progress-row">
        <div class="sf-progress-track"><div class="sf-progress-fill"></div></div>
        <span class="sf-progress-pct">0%</span>
      </div>
    </div>
  `,t.appendChild(e.makeCloseButton(()=>{Zt&&Zt.abort(),e.dismissBanner(t,0),pt()})),e.enterBanner(t,"gsheets").then(()=>{e.animateProgress(t,0,85,4e3)})}function ml(){let e=window.__sfBanner,t=Jt();if(!t){pt();return}e.animateProgress(t,pl(),100,400,()=>{e.dismissBanner(t,0)}),pt()}function xo(){let e=window.__sfBanner,t=Jt();t&&e.dismissBanner(t,0),pt()}function _o(e){let t=window.__sfBanner,s=Jt();s&&t.dismissBanner(s,0),setTimeout(()=>{let n=document.createElement("div");n.className="sf-banner sf-gsheets-banner sf-error sf-static",n.innerHTML=`
      <img class="sf-icon sf-static" src="${t.iconURL("Icons/16 Sort Feed.png")}" />
      <div class="sf-message">${e||"Couldn't create sheet \u2014 try again"}</div>
    `,n.appendChild(t.makeCloseButton(()=>t.dismissBanner(n,0))),t.enterBanner(n,"gsheets"),setTimeout(()=>t.dismissBanner(n,0),5e3)},s?260:0),pt()}function hl(){let e=window.__sfBanner;if(document.querySelector(".sf-gsheets-banner.sf-signin"))return;let t=document.createElement("div");t.className="sf-banner sf-gsheets-banner sf-signin sf-static",t.innerHTML=`
    <img class="sf-icon sf-static" src="${e.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-message">Sign in to Sort Feed to use Google Sheets export</div>
    <button class="sf-signin-btn" type="button">Sign in</button>
  `,t.querySelector(".sf-signin-btn").addEventListener("click",()=>{void 0}),t.appendChild(e.makeCloseButton(()=>e.dismissBanner(t,0))),e.enterBanner(t,"gsheets"),setTimeout(()=>e.dismissBanner(t,0),5e3)}async function gl(e,t,s){let n=window.__sfBanner;if(!n)return;let t0=document.createElement("div");t0.className="sf-banner sf-gsheets-banner sf-static",t0.innerHTML="<div class=\"sf-body\"><div class=\"sf-message\">Google Sheets export is no longer available. Use Excel, CSV, or JSON.</div></div>",t0.appendChild(n.makeCloseButton(()=>n.dismissBanner(t0,0))),n.enterBanner(t0,"gsheets"),setTimeout(()=>n.dismissBanner(t0,0),3500)}chrome.runtime.onMessage.addListener((e,t,s)=>{if(e.export_click_background&&e.export_format==="google_sheets"){let n=e.sorted_data,o=e.posts_vs_reels,r=typeof $e=="function"?$e(n):n[0].userName;gl(r,n,o)}});function It(e){let t=e==null?"":String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)?'"'+t.replace(/"/g,'""')+'"':t}function yl(e=null,t=null,s=null){let n=t.some(o=>"transcript"in o);if(s==="Posts"){let o=typeof Ye=="function"&&Ye(),r=typeof Ze=="function"&&Ze(),a=typeof Pe=="function"&&Pe(t),i=["Profile","Post","Create Date","Likes"];a&&i.push("Outlier Score"),o||i.push("Comments"),r&&i.push("Views"),i.push("Caption"),n&&i.push("Transcript");let c=t.map(f=>{let d=[1,8].includes(f.mediaType)?`https://www.instagram.com/${f.userName}/p/${f.code}/`:`https://www.instagram.com/${f.userName}/reel/${f.code}/`,m=f.createDate?f.createDate.slice(0,10):"",g=[It(f.userName),It(d),m,f.likesCount];return a&&g.push(Xe(f)),o||g.push(f.commentsCount),r&&g.push(f.viewCount??""),g.push(It(f.caption)),n&&g.push(It(f.transcript??"")),g}),l=[i,...c].map(f=>f.join(",")).join(`
`),u=new Blob([l],{type:"text/csv;charset=utf-8;"}),p=document.createElement("a");if(p.download!==void 0){let f=URL.createObjectURL(u);p.setAttribute("href",f),p.setAttribute("download",`${e}_${t.length}_${s.toLowerCase()}.csv`),p.style.visibility="hidden",document.body.appendChild(p),p.click(),document.body.removeChild(p)}}else if(s==="Reels"){let o=typeof Pe=="function"&&Pe(t),r=["Profile","Reel","Create Date","Views"];o&&r.push("Outlier Score"),r.push("Likes","Comments"),n&&r.push("Transcript");let a=t.map(u=>{let p=`https://www.instagram.com/${u.userName}/reel/${u.code}/`,f=u.createDate?u.createDate.slice(0,10):"",d=[u.userName,p,f,u.viewCount];return o&&d.push(Xe(u)),d.push(u.likesCount,u.commentsCount),n&&d.push(It(u.transcript??"")),d}),i=[r,...a].map(u=>u.join(",")).join(`
`),c=new Blob([i],{type:"text/csv;charset=utf-8;"}),l=document.createElement("a");if(l.download!==void 0){let u=URL.createObjectURL(c);l.setAttribute("href",u),l.setAttribute("download",`${e}_${t.length}_${s.toLowerCase()}.csv`),l.style.visibility="hidden",document.body.appendChild(l),l.click(),document.body.removeChild(l)}}}chrome.runtime.onMessage.addListener((e,t,s)=>{if(e.export_click_background&&e.export_format==="csv"){let n=e.sorted_data,o=e.posts_vs_reels,r=typeof $e=="function"?$e(n):n[0].userName;yl(r,n,o)}});function bl(e=null,t=null,s=null){let n=`${e}_${t.length}_${s.toLowerCase()}.json`,o=t.some(f=>"transcript"in f),r=typeof Ye=="function"&&Ye(),a=typeof Ze=="function"&&Ze(),i=typeof Pe=="function"&&Pe(t),c=t.map(f=>{if(s==="Posts"){let d=[1,8].includes(f.mediaType)?`https://www.instagram.com/${f.userName}/p/${f.code}/`:`https://www.instagram.com/${f.userName}/reel/${f.code}/`,m=new Date(f.createDate).toLocaleString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}),g={Profile:f.userName,Post:d,"Create Date":m,Likes:f.likesCount};return i&&(g["Outlier Score"]=Xe(f)),r||(g.Comments=f.commentsCount),a&&(g.Views=f.viewCount??""),g.Captions=f.caption,o&&(g.Transcript=f.transcript??""),g}if(s==="Reels"){let d=`https://www.instagram.com/${f.userName}/reel/${f.code}/`,m=f.createDate?new Date(f.createDate).toLocaleString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}):"",g={Profile:f.userName,Reel:d,"Create Date":m,Views:f.viewCount};return i&&(g["Outlier Score"]=Xe(f)),g.Likes=f.likesCount,g.Comments=f.commentsCount,o&&(g.Transcript=f.transcript??""),g}return{}}),l=new Blob([JSON.stringify(c,null,2)],{type:"application/json;charset=utf-8;"}),u=document.createElement("a"),p=URL.createObjectURL(l);u.setAttribute("href",p),u.setAttribute("download",n),u.style.visibility="hidden",document.body.appendChild(u),u.click(),document.body.removeChild(u)}chrome.runtime.onMessage.addListener((e,t,s)=>{if(e.export_click_background&&e.export_format==="json"){let n=e.sorted_data,o=e.posts_vs_reels,r=typeof $e=="function"?$e(n):n[0].userName;bl(r,n,o)}});function Cl(e=null,t=null,s=null){let n=[],o=[],r=t.some(u=>"transcript"in u);if(s==="Posts"){let u=typeof Ye=="function"&&Ye(),p=typeof Ze=="function"&&Ze(),f=typeof Pe=="function"&&Pe(t);n=["Profile","Post","Create Date","Likes"],f&&n.push("Outlier Score"),u||n.push("Comments"),p&&n.push("Views"),n.push("Captions"),r&&n.push("Transcript"),o=t.map(d=>{let m=[1,8].includes(d.mediaType)?`https://www.instagram.com/${d.userName}/p/${d.code}/`:`https://www.instagram.com/${d.userName}/reel/${d.code}/`,g=new Date(d.createDate).toLocaleString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}),k=[d.userName,m,g,d.likesCount];return f&&k.push(Xe(d)),u||k.push(d.commentsCount),p&&k.push(d.viewCount??""),k.push(d.caption),r&&k.push(d.transcript??""),k})}else if(s==="Reels"){let u=typeof Pe=="function"&&Pe(t);n=["Profile","Reel","Create Date","Views"],u&&n.push("Outlier Score"),n.push("Likes","Comments"),r&&n.push("Transcript"),o=t.map(p=>{let f=`https://www.instagram.com/${p.userName}/reel/${p.code}/`,d=p.createDate?new Date(p.createDate).toLocaleString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0}):"",m=[p.userName,f,d,p.viewCount];return u&&m.push(Xe(p)),m.push(p.likesCount,p.commentsCount),r&&m.push(p.transcript??""),m})}let a=[n,...o],i=XLSX.utils.aoa_to_sheet(a),c=XLSX.utils.book_new();XLSX.utils.book_append_sheet(c,i,s);let l=`${e}_${t.length}_${s.toLowerCase()}.xlsx`;XLSX.writeFile(c,l)}chrome.runtime.onMessage.addListener((e,t,s)=>{if(e.export_click_background&&e.export_format==="excel"){let n=e.sorted_data,o=e.posts_vs_reels,r=typeof $e=="function"?$e(n):n[0].userName;Cl(r,n,o)}});var Ie=null;window.addEventListener("message",e=>{let t=e.data;if(!t||!t.download)return;let s=window.__sfBanner;if(s){if(t.download_item==="reels"){if(s.guards.isDownloading)return;s.guards.isDownloading=!0,Ie=new AbortController,lt("Downloading"),wl(t.download_reel_id,t.download_profile_name,t.download_code||"",Ie.signal)}else if(t.download_item==="thumbnail"){if(s.guards.isDownloading||!t.download_url)return;s.guards.isDownloading=!0,Ie=new AbortController,lt("Downloading"),Ps(t.download_url,t.download_profile_name,t.download_code||"",Ie.signal,`${fn(t.download_profile_name)}_${t.download_code||"thumbnail"}_thumbnail.jpg`).then(n=>{n&&We()})}else if(t.download_item==="posts"){if(s.guards.isDownloading)return;s.guards.isDownloading=!0,Ie=new AbortController,vl(t.download_post_id,t.download_profile_name,t.download_code||"",Ie.signal)}}});async function vl(e,t,s,n){let o=`https://www.instagram.com/api/v1/media/${e}/info/`;try{let r=await fetch(o,{method:"GET",credentials:"include",signal:n,headers:{"x-ig-app-id":"936619743392459","x-ig-www-claim":window._sharedData?.config?.csrf_token||""}});if(!r.ok)throw new Error(`Failed: ${r.status}`);let a=await r.json();s||(s=a.items?.[0]?.code||"");let{carouselFlag:i,ReelFlag:c}=br(a);if(!i&&c){lt("Downloading");let l=a.items?.[0]?.video_versions?.[0]?.url;l?await Rs(l,t,s,n)&&We():we("Couldn't find video \u2014 try again")}else if(!i&&!c){lt("Downloading");let l=a.items[0].image_versions2.candidates[0].url;l?await Ps(l,t,s,n)&&We():we("Couldn't find image \u2014 try again")}else if(i){let l=a.items[0].carousel_media,u=l.length;lt("Downloading");let p=[];for(let f=0;f<u&&!(n&&n.aborted);f++){let d=l[f],m=!!d.video_versions,g=m?d.video_versions[0].url:d.image_versions2.candidates[0].url,k=m?"mp4":"jpg",_=`${t}_${s}_${f+1}.${k}`,y=Math.round(f/u*100),x=Math.round((f+1)/u*100);try{let L=await fetch(g,{signal:n});if(!L.ok)continue;let I=L.headers.get("content-length"),q=I?parseInt(I,10):0,v=0,M=y,J=x-2,pe=setInterval(()=>{M<J&&(M++,Nt(M))},40),T=L.body.getReader(),$=[];try{for(;;){let{done:ne,value:F}=await T.read();if(ne)break;if($.push(F),v+=F.length,q>0){let ee=Math.round(v/q*100);M=y+Math.round(ee/100*(x-y)),Nt(Math.min(M,x-1))}}}finally{clearInterval(pe)}M=x,Nt(Math.min(M,99));let V=k==="mp4"?"video/mp4":"image/jpeg",te=new Blob($,{type:V});p.push({name:_,blob:te})}catch(L){if(L.name==="AbortError")throw L}}if(n&&n.aborted)return Je(),null;if(p.length>0){let f=await Cr(p),d=URL.createObjectURL(f),m=document.createElement("a");m.href=d,m.download=`${t}_${s}.zip`,document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(d),We()}else we("Download failed \u2014 try again")}return a}catch(r){return r.name==="AbortError"?(Je(),null):(console.error("Error fetching reel info:",r),we("Couldn't download \u2014 try again"),null)}}function br(e){let t=!!e.items?.[0]?.carousel_media_count,s=!!e.items?.[0]?.video_versions;return{carouselFlag:t,ReelFlag:s}}async function wl(e,t,s,n){let o=`https://www.instagram.com/api/v1/media/${e}/info/`;try{let r=await fetch(o,{method:"GET",credentials:"include",signal:n,headers:{"x-ig-app-id":"936619743392459","x-ig-www-claim":window._sharedData?.config?.csrf_token||""}});if(!r.ok)throw new Error(`Failed: ${r.status}`);let a=await r.json();s||(s=a.items?.[0]?.code||"");let i=a.items?.[0]?.video_versions?.[0]?.url;return i?await Rs(i,t,s,n)&&We():we("Couldn't find video \u2014 try again"),a}catch(r){return r.name==="AbortError"?(Je(),null):(console.error("Error fetching reel info:",r),we("Couldn't download \u2014 try again"),null)}}async function Rs(e,t,s,n){try{let o=await fetch(e,{signal:n});if(!o.ok)throw new Error(`Failed to fetch video: ${o.status}`);let r=o.headers.get("content-length"),a=r?parseInt(r,10):0,i=0,c=o.body.getReader(),l=[];for(;;){let{done:d,value:m}=await c.read();if(d)break;if(l.push(m),i+=m.length,a>0){let g=Math.round(i/a*100);Nt(g)}}let u=new Blob(l,{type:"video/mp4"}),p=URL.createObjectURL(u),f=document.createElement("a");return f.href=p,f.download=`${t}_${s}.mp4`,document.body.appendChild(f),f.click(),document.body.removeChild(f),URL.revokeObjectURL(p),!0}catch(o){return o.name==="AbortError"||(console.error("Error downloading reel:",o),we("Couldn't download reel")),!1}}async function Ps(e,t,s,n,o){try{let r=await fetch(e,{signal:n});if(!r.ok)throw new Error(`Failed to fetch image: ${r.status}`);let a=r.headers.get("content-length"),i=a?parseInt(a,10):0,c=0,l=r.body.getReader(),u=[];for(;;){let{done:m,value:g}=await l.read();if(m)break;if(u.push(g),c+=g.length,i>0){let k=Math.round(c/i*100);Nt(k)}}let p=new Blob(u,{type:"image/jpeg"}),f=URL.createObjectURL(p),d=document.createElement("a");return d.href=f,d.download=o||`${t}_${s}.jpg`,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(f),!0}catch(r){return r.name==="AbortError"||(console.error("Error downloading post:",r),we("Couldn't download post")),!1}}function Je(){window.__sfBanner.guards.isDownloading=!1,Ie=null}function xl(){let e=document.querySelector(".sf-download-banner.sf-progress");if(!e)return 0;let t=e.querySelector(".sf-progress-pct");return t&&parseInt(t.textContent)||0}function lt(e){let t=window.__sfBanner;if(document.querySelector(".sf-download-banner.sf-progress"))return;let s=document.createElement("div");s.className="sf-banner sf-download-banner sf-progress",s.innerHTML=`
    <img class="sf-icon" src="${t.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-body">
      <div class="sf-message">${e||"Downloading"}</div>
      <div class="sf-progress-row">
        <div class="sf-progress-track"><div class="sf-progress-fill"></div></div>
        <span class="sf-progress-pct">0%</span>
      </div>
    </div>
  `,s.appendChild(t.makeStopButton(()=>{Ie&&Ie.abort(),t.dismissBanner(s,0),Je()},"Stop downloading")),t.enterBanner(s,"download")}function Nt(e){let t=document.querySelector(".sf-download-banner.sf-progress");t&&window.__sfBanner.setProgress(t,e)}function We(){let e=window.__sfBanner,t=document.querySelector(".sf-download-banner.sf-progress");if(!t){Je();return}e.animateProgress(t,xl(),100,400,()=>{e.dismissBanner(t,0)}),Je()}function we(e){let t=window.__sfBanner,s=document.querySelector(".sf-download-banner.sf-progress");s&&t.dismissBanner(s,0),setTimeout(()=>{let n=document.createElement("div");n.className="sf-banner sf-download-banner sf-error sf-static",n.innerHTML=`
      <img class="sf-icon sf-static" src="${t.iconURL("Icons/16 Sort Feed.png")}" />
      <div class="sf-message">${e||"Download failed \u2014 try again"}</div>
    `,n.appendChild(t.makeCloseButton(()=>t.dismissBanner(n,0))),t.enterBanner(n,"download"),setTimeout(()=>t.dismissBanner(n,0),5e3)},s?260:0),Je()}async function Cr(e){let t=[],s=[],n=0;for(let i of e){let c=new TextEncoder().encode(i.name),l=new Uint8Array(await i.blob.arrayBuffer()),u=kl(l),p=new ArrayBuffer(30+c.length),f=new DataView(p);f.setUint32(0,67324752,!0),f.setUint16(4,20,!0),f.setUint16(6,0,!0),f.setUint16(8,0,!0),f.setUint16(10,0,!0),f.setUint16(12,0,!0),f.setUint32(14,u,!0),f.setUint32(18,l.length,!0),f.setUint32(22,l.length,!0),f.setUint16(26,c.length,!0),f.setUint16(28,0,!0),new Uint8Array(p,30).set(c);let d=new ArrayBuffer(46+c.length),m=new DataView(d);m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,20,!0),m.setUint16(8,0,!0),m.setUint16(10,0,!0),m.setUint16(12,0,!0),m.setUint16(14,0,!0),m.setUint32(16,u,!0),m.setUint32(20,l.length,!0),m.setUint32(24,l.length,!0),m.setUint16(28,c.length,!0),m.setUint16(30,0,!0),m.setUint16(32,0,!0),m.setUint16(34,0,!0),m.setUint16(36,0,!0),m.setUint32(38,0,!0),m.setUint32(42,n,!0),new Uint8Array(d,46).set(c),t.push(new Uint8Array(p),l),s.push(new Uint8Array(d)),n+=p.byteLength+l.length}let o=s.reduce((i,c)=>i+c.length,0),r=new ArrayBuffer(22),a=new DataView(r);return a.setUint32(0,101010256,!0),a.setUint16(4,0,!0),a.setUint16(6,0,!0),a.setUint16(8,e.length,!0),a.setUint16(10,e.length,!0),a.setUint32(12,o,!0),a.setUint32(16,n,!0),a.setUint16(20,0,!0),new Blob([...t,...s,new Uint8Array(r)],{type:"application/zip"})}var _l=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let s=t;for(let n=0;n<8;n++)s=s&1?3988292384^s>>>1:s>>>1;e[t]=s}return e})();function kl(e){let t=4294967295;for(let s=0;s<e.length;s++)t=_l[(t^e[s])&255]^t>>>8;return(t^4294967295)>>>0}async function fs(e,t,s,n){let o=await fetch(e,{signal:s});if(!o.ok)throw new Error(`HTTP ${o.status}`);let r=o.headers.get("content-length"),a=r?parseInt(r,10):0,i=0,c=0,l=null;!a&&n&&(l=setInterval(()=>{c<95&&(c+=1,n(c))},40));let u=o.body.getReader(),p=[];try{for(;;){let{done:f,value:d}=await u.read();if(f)break;p.push(d),i+=d.length,a>0&&n&&n(Math.min(99,Math.round(i/a*100)))}}finally{l&&clearInterval(l)}return n&&n(100),new Blob(p,{type:t})}async function Sl(e,t,s,n,o){let r=e.length,a=new Array(r).fill(0),i=()=>{if(!o)return;let l=0;for(let u=0;u<r;u++)l+=a[u];o(l/r*100)};return(await Promise.all(e.map(async(l,u)=>{if(n&&n.aborted)return null;let p=!!l.video_versions,f=p?l.video_versions[0].url:l.image_versions2.candidates[0].url,d=p?"mp4":"jpg",m=`${t}_${s}_${u+1}.${d}`;try{let g=await fs(f,p?"video/mp4":"image/jpeg",n,k=>{a[u]=Math.max(0,Math.min(1,k/100)),i()});return a[u]=1,i(),{name:m,blob:g}}catch{return null}}))).filter(Boolean)}function El(){let e=window.__sfBanner,t=document.querySelector(".sf-download-banner.sf-progress");if(!t)return;let s=t.querySelector(".sf-banner-stop");if(!s)return;let n=e.makeStopButton(()=>{Ie&&Ie.abort()},"Stop downloading");s.replaceWith(n)}function Ll(e){let t=document.querySelector(".sf-download-banner.sf-progress");if(!t)return;let s=t.querySelector(".sf-message");s&&(s.textContent=e)}function fn(e){return(e||"sortfeed").replace(/[^a-zA-Z0-9_\-]/g,"")||"sortfeed"}var ko=2;async function So(e,t){let s=window.__sfBanner;if(!s||s.guards.isDownloading||!e||e.length===0)return;s.guards.isDownloading=!0,Ie=new AbortController;let n=Ie.signal,o=e.length;lt(`Downloading 1 of ${o}`),El();let r=new Array(o),a=0,i=new Array(ko).fill(0),c=()=>{Ll(`Downloading ${Math.min(a+1,o)} of ${o}`);let g=0;for(let y=0;y<i.length;y++)g+=i[y];let k=(a+g)/o*100,_=document.querySelector(".sf-download-banner.sf-progress");_&&s.setProgress(_,Math.min(99,Math.round(k)))},l=0,u=()=>l<o?l++:-1;async function p(g){for(;!n.aborted;){let k=u();if(k<0)return;i[g]=0;let _=e[k]||{},y=_.id??_.postID??_.reelID,x=_.code||"",L=fn(t||_.userName||"creator");if(!y){a++,i[g]=0,c();continue}let I=q=>{i[g]=Math.max(0,Math.min(1,q/100)),c()};try{let q=`https://www.instagram.com/api/v1/media/${y}/info/`,v=await fetch(q,{method:"GET",credentials:"include",signal:n,headers:{"x-ig-app-id":"936619743392459","x-ig-www-claim":window._sharedData?.config?.csrf_token||""}});if(!v.ok)throw new Error(`HTTP ${v.status}`);let M=await v.json(),J=x||M.items?.[0]?.code||"",{carouselFlag:pe,ReelFlag:T}=br(M);if(!pe&&T){let $=M.items?.[0]?.video_versions?.[0]?.url;if($){let V=await fs($,"video/mp4",n,I);r[k]=[{name:`${L}_${J}.mp4`,blob:V}]}}else if(!pe&&!T){let $=M.items[0].image_versions2.candidates[0].url;if($){let V=await fs($,"image/jpeg",n,I);r[k]=[{name:`${L}_${J}.jpg`,blob:V}]}}else if(pe){let $=M.items[0].carousel_media,V=await Sl($,L,J,n,I);V.length>0&&(r[k]=V)}}catch(q){if(q.name==="AbortError")return}finally{a++,i[g]=0,c()}}}let f=[];for(let g=0;g<ko;g++)f.push(p(g));await Promise.all(f);let d=r.filter(Boolean),m=d.flat();if(m.length===0){Je();let g=document.querySelector(".sf-download-banner.sf-progress");g&&s.dismissBanner(g,0),n.aborted||we("Download failed \u2014 try again");return}try{let g=await Cr(m),k=URL.createObjectURL(g),_=document.createElement("a");_.href=k;let y;t?y=fn(t):typeof $e=="function"?y=fn($e(e)):y="sortfeed",_.download=`${y}_${d.length}.zip`,document.body.appendChild(_),_.click(),document.body.removeChild(_),URL.revokeObjectURL(k)}catch{}We()}function Eo(){let e=Array.from(document.querySelectorAll(".sf-select-circle[data-sf-selected='true']")).sort((s,n)=>Number(s.dataset.sfSelectOrder)-Number(n.dataset.sfSelectOrder)),t=[];return e.forEach(s=>{let n=s.closest("[data-sf-sorted-item]");if(!(!n||!n.dataset.sfItemJson))try{t.push(JSON.parse(n.dataset.sfItemJson))}catch{}}),t}function _n(e,t,s){if(!(!e||e.length===0)){if(s!=="selected"){So(e,t);return}chrome.runtime.sendMessage({command:"checkProStatus"},n=>{if(!n?.isPro){let o=e.length,r=`${o} Post${o!==1?"s":""} selected \u2014 Download selected media with Pro`;typeof ut=="function"&&ut(r);return}So(e,t)})}}(()=>{let t=(...T)=>!1,s="sf-story-download-button",n="sf-story-style",o=/^\/stories\/([^/]+)(?:\/(\d+))?\/?/,r=!0;chrome.storage.local.get(["sortfeed_ig_download_enabled"],T=>{T.sortfeed_ig_download_enabled===!1&&(r=!1,m())}),chrome.storage.onChanged.addListener(T=>{"sortfeed_ig_download_enabled"in T&&(r=T.sortfeed_ig_download_enabled.newValue!==!1,r?a(location.pathname)&&y():(x(),m()))});function a(T){let $=T.match(o);if(!$)return null;let V=$[1],te=T.split("/").filter(Boolean);if(V==="highlights"){let ne=te[2],F=te[3]||null;return ne?{kind:"highlight",highlightId:ne,mediaId:F,username:"highlights"}:null}return{kind:"live",username:V,mediaId:$[2]||null}}function i(){if(document.getElementById(n))return;let T=document.createElement("style");T.id=n,T.textContent=`
      @keyframes sf-story-fadein {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
      }

      #${s} {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 4px;
        margin-right: 14px;
        opacity: 0.80;
        transition: opacity 180ms ease;
        animation: sf-story-fadein 280ms cubic-bezier(0.16, 1, 0.3, 1) both;
        position: relative;
        z-index: 5;
      }

      #${s}:hover { opacity: 1; }

      #${s} .sf-story-icon {
        width: 10px;
        height: 10px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.72);
        padding: 5px;
        display: block;
      }

      #${s} .sf-story-tip {
        position: absolute;
        top: 50%;
        right: calc(100% + 8px);
        transform: translateY(-50%);
        background: #000;
        color: #fff;
        font-size: 0.75rem; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;
        line-height: 1;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        z-index: 99999;
        transition: opacity 120ms ease;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      #${s}:hover .sf-story-tip { opacity: 1; }
    `,document.head.appendChild(T)}function c(){let T=document.querySelector('div[style*="translateX("][style*="%"]');if(!T)return null;let $=T.parentElement,V=$&&$.parentElement;if(!V)return null;let te=V.nextElementSibling;return!te||!te.querySelector('[role="button"]')?null:te}function l(){let T=document.querySelectorAll('svg[aria-label="Menu"]');for(let $ of T){let V=$.closest('[role="button"]');if(!V||!V.parentElement)continue;let te=V.parentElement;if(Array.from(te.children).filter(F=>F===V||F.getAttribute&&F.getAttribute("role")==="button"||F.querySelector?.('[role="button"]')||F.querySelector?.("a[href]")).length>=2)return te}return null}function u(){return c()||l()}function p(){let T=document.querySelector('div[style*="translateX("][style*="%"]');if(!T)return-1;let $=T.parentElement,V=$&&$.parentElement;return V?Array.from(V.children).indexOf($):-1}function f(){let T=document.createElement("div");T.id=s,T.setAttribute("role","button"),T.setAttribute("tabindex","0"),T.setAttribute("aria-label","Download");let $=document.createElement("img");$.className="sf-story-icon",$.src=chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),$.alt="",$.draggable=!1,T.appendChild($);let V=document.createElement("div");V.className="sf-story-tip";let te=document.createElement("span");te.textContent="Download",V.appendChild(te),T.appendChild(V);let ne=F=>{F.stopPropagation(),F.preventDefault();let ee=a(location.pathname);if(!ee)return;let ue=p();t("click \u2192 route",ee,"currentIndex",ue),window.postMessage({download:!0,download_item:"story",route:ee,currentIndex:ue},"*")};return T.addEventListener("click",ne),T.addEventListener("keydown",F=>{(F.key==="Enter"||F.key===" ")&&ne(F)}),T}function d(){if(!r)return!1;if(document.getElementById(s))return!0;if(!a(location.pathname))return!1;let T=u();if(!T)return t("no icon row"),!1;let $=f(),V=T.children[1]||null;return T.insertBefore($,V),t("attached before",V,"in row",T),!0}function m(){let T=document.getElementById(s);T&&T.remove()}let g=null,k=0,_=40;function y(){x(),k=0;let T=()=>{if(k++,!a(location.pathname)){m();return}d()||k>=_||(g=setTimeout(T,150))};T()}function x(){g&&(clearTimeout(g),g=null)}let L=location.pathname;function I(){setTimeout(()=>{if(location.pathname===L)return;if(L=location.pathname,!a(L)){x(),m();return}document.getElementById(s)||y()},0)}let q=history.pushState;history.pushState=function(){q.apply(this,arguments),I()};let v=history.replaceState;history.replaceState=function(){v.apply(this,arguments),I()},window.addEventListener("popstate",I);let M=null,J=new MutationObserver(()=>{clearTimeout(M),M=setTimeout(()=>{a(location.pathname)&&!document.getElementById(s)&&y()},100)});function pe(){i(),J.observe(document.body,{childList:!0,subtree:!0}),a(location.pathname)&&y()}document.body?pe():document.addEventListener("DOMContentLoaded",pe)})();(()=>{let t=(...p)=>!1,s=()=>({"x-ig-app-id":"936619743392459","x-ig-www-claim":window._sharedData?.config?.csrf_token||""}),n={},o={};window.addEventListener("message",p=>{let f=p.data;if(f){if(f.sf_reels_media&&f.sf_reels_media.reel_id){let{reel_id:d,items:m,user:g}=f.sf_reels_media;o[d]={items:m,user:g},g&&g.username&&(n[g.username.toLowerCase()]=d),t("cached reel",d,m?.length,"items")}if(f.sf_reels_tray&&Array.isArray(f.sf_reels_tray)){for(let d of f.sf_reels_tray)d&&d.user&&d.user.username&&d.id&&(n[d.user.username.toLowerCase()]=d.id);t("cached tray entries",Object.keys(n).length)}}}),window.addEventListener("message",async p=>{let f=p.data;if(!f||!f.download||f.download_item!=="story")return;let d=window.__sfBanner;if(d&&!d.guards.isDownloading){d.guards.isDownloading=!0,lt("Downloading");try{await r(f)}catch(m){console.error("[SF Story Dl] unexpected",m),we("Couldn't download story \u2014 try again")}}});async function r({route:p,currentIndex:f}){t("runStoryDownload start",{route:p,currentIndex:f,cacheKeys:Object.keys(o),trayKeys:Object.keys(n)});let d=null,m=null;if(p.kind==="highlight")d="highlight:"+p.highlightId,m="highlights",t("highlight branch, reelId =",d);else{m=p.username;let v=m.toLowerCase();if(n[v])d=n[v],t("trayCache hit for",v,"\u2192",d);else{t("trayCache miss for",v,"\u2014 fetching tray");try{let M=await i();t("tray fetched, entries:",M.length);for(let J of M)J?.user?.username&&(n[J.user.username.toLowerCase()]=J.id);d=n[v],t("after tray fetch, reelId =",d)}catch(M){if(t("tray fetch failed",M),M&&M.status===401){we("Log in to Instagram first");return}}}if(!d){t("tray did not include",m,"\u2014 trying web_profile_info");try{let M=await a(m);t("web_profile_info \u2192 user_id",M),M&&(d=String(M),n[v]=d)}catch(M){if(t("web_profile_info fetch failed",M),M&&M.status===401){we("Log in to Instagram first");return}}}if(!d){t("could not resolve reelId for",m),we("Couldn't find this story \u2014 try again");return}}let g=o[d];if(g&&g.items)t("reelCache hit for",d,"items:",g.items.length);else{t("reelCache miss for",d,"\u2014 fetching reels_media");try{let v=await c(d);t("reels_media fetched",v?`items: ${v.items?.length}`:"null"),v&&(g=v,o[d]=v,v.user?.username&&(m=v.user.username))}catch(v){if(t("reels_media fetch failed",v),v&&v.status===401){we("Log in to Instagram first");return}}}if(!g||!g.items||g.items.length===0){t("no items available for",d),we("This story is no longer available");return}g.user?.username&&(m=g.user.username);let k=g.items;t("items summary",k.map((v,M)=>({i:M,pk:v.pk,id:v.id,media_type:v.media_type,has_video:!!v.video_versions?.length,has_image:!!v.image_versions2?.candidates?.length})));let _=null,y=null;typeof f=="number"&&f>=0&&f<k.length&&(_=k[f],y="currentIndex="+f),!_&&p.mediaId&&(_=k.find(v=>String(v.pk)===String(p.mediaId)||String(v.id||"").endsWith("_"+p.mediaId)),_&&(y="mediaId="+p.mediaId)),_||(_=k[0],y="fallback to items[0]"),t("picked item",{pk:_?.pk,media_type:_?.media_type,reason:y});let x=l(_);if(t("pickBestMedia \u2192",x),!x){t("FAIL: pickBestMedia returned null. item keys:",Object.keys(_||{})),we("Couldn't find this story's media");return}let L=m||"story",I="story_"+(_.pk||_.id||Date.now());t("downloading",x.type,"\u2192",x.url.slice(0,120));let q=new AbortController;if(x.type==="video"){let v=await Rs(x.url,L,I,q.signal);t("actually_download_reel returned",v),v&&We()}else{let v=await Ps(x.url,L,I,q.signal);t("actually_download_post returned",v),v&&We()}}async function a(p){let f="https://www.instagram.com/api/v1/users/web_profile_info/?username="+encodeURIComponent(p),d=await fetch(f,{method:"GET",credentials:"include",headers:s()});if(!d.ok){let g=new Error("web_profile_info "+d.status);throw g.status=d.status,g}return(await d.json())?.data?.user?.id||null}async function i(){let p=await fetch("https://www.instagram.com/api/v1/feed/reels_tray/?is_following_feed=false",{method:"GET",credentials:"include",headers:s()});if(!p.ok){let d=new Error("tray "+p.status);throw d.status=p.status,d}return(await p.json()).tray||[]}async function c(p){let f="https://www.instagram.com/api/v1/feed/reels_media/?reel_ids="+encodeURIComponent(p),d=await fetch(f,{method:"GET",credentials:"include",headers:s()});if(!d.ok){let k=new Error("reels_media "+d.status);throw k.status=d.status,k}let m=await d.json(),g=m?.reels_media?.[0]||m?.reels&&m.reels[p];return g?{items:g.items||[],user:g.user||null}:null}function l(p){if(!p)return null;let f=u(p.video_versions);if(f&&f.url)return{type:"video",url:f.url};let d=u(p.image_versions2?.candidates);return d&&d.url?{type:"image",url:d.url}:null}function u(p){if(!Array.isArray(p)||p.length===0)return null;let f=p[0];for(let d of p)(d.width||0)*(d.height||0)>(f.width||0)*(f.height||0)&&(f=d);return f}})();var ct=0,be=!1,vr="",wr="",Gt,Wt=0,nt=null,Me=null,Ml=16e4,kn=!1,Il=50*1024*1024,Bn=null,As=null,dn=!1,ft={offline:"You're offline \u2014 check your connection and try again",network:"Couldn't reach Sort Feed servers \u2014 check your connection and try again",timeout:"This took too long \u2014 you weren't charged. Try again",media_fetch_failed:"Couldn't download this reel's audio \u2014 refresh and try again",media_too_large:"This video is too long to transcribe",whisper_failed:"The transcription engine hiccuped \u2014 you weren't charged. Try again",empty_transcript:"No speech found in this video \u2014 you weren't charged",internal_error:"Couldn't reach Sort Feed servers \u2014 try again in a minute",missing_fields:"Something went wrong \u2014 refresh the page and try again",audio_extract_failed:"Couldn't read this reel's audio \u2014 refresh the page and try again",not_signed_in:"Sign in to Sort Feed to use transcription"};function Fs(){window.__sfBanner.guards.isTranscribing=!1}function kt(){return document.querySelector(".sf-trans-banner.sf-progress")}function Tl(){let e=window.__sfBanner;document.querySelectorAll(".sf-trans-banner.sf-ready, .sf-trans-banner.sf-limit, .sf-trans-banner.sf-error").forEach(t=>e.dismissBanner(t,0))}function xr(e,t){let s=window.__sfBanner;if(s.guards.isTranscribing=!0,kt())return;let n="";e!=null&&t!=null&&(n=`<div class="sf-subtitle">${Math.ceil(Number(t)/60)} of ${e} monthly mins left</div>`);let o=document.createElement("div");o.className="sf-banner sf-trans-banner sf-progress",o.innerHTML=`
    <img class="sf-icon" src="${s.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-body">
      <div class="sf-message">Transcribing</div>
      ${n}
      <div class="sf-progress-row">
        <div class="sf-progress-track"><div class="sf-progress-fill"></div></div>
        <span class="sf-progress-pct">0%</span>
      </div>
    </div>
  `,o.appendChild(s.makeStopButton(()=>Pl(),"Stop transcribing")),s.enterBanner(o,"transcribe"),clearTimeout(Gt),Gt=setTimeout(()=>{let r=Bn;r&&Rn().then(a=>{chrome.runtime.sendMessage({command:"refundTransJob",clientJobId:r,userID:a,platform:"instagram"})}),Ae(),Oe(ft.timeout)},Ml)}function Bl(e,t){if(e==null||t==null)return;let s=kt();if(!s)return;let n=s.querySelector(".sf-body");if(!n||n.querySelector(".sf-subtitle"))return;let o=Math.ceil(Number(t)/60),r=document.createElement("div");r.className="sf-subtitle",r.textContent=`${o} of ${e} monthly mins left`;let a=n.querySelector(".sf-progress-row");a?n.insertBefore(r,a):n.appendChild(r),r.animate([{opacity:0,transform:"translateY(-3px)"},{opacity:1,transform:"translateY(0)"}],{duration:220,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"both"})}function Lo(e){if(be)return;Wt=Math.max(0,Math.min(100,Math.round(e)));let t=kt();t&&window.__sfBanner.setProgress(t,Wt)}function Rl(e){return 1-(1-e)*(1-e)}function Bt(e,t,s){clearInterval(nt),nt=null,Lo(e);let n=Date.now(),o=Math.max(1,s|0);nt=setInterval(()=>{let r=Math.min(1,(Date.now()-n)/o),a=Rl(r);Lo(e+(t-e)*a),r>=1&&(clearInterval(nt),nt=null)},80)}function st(){clearInterval(nt),nt=null}function Ae(){st(),clearTimeout(Gt);let e=window.__sfBanner,t=kt();t&&e.dismissBanner(t,0),Fs()}function Pl(){if(be)return;be=!0,window.__sfBanner.guards.isTranscribing=!1,st(),clearTimeout(Gt),Bn=null;let e=window.__sfBanner,t=kt();t&&e.dismissBanner(t,0),chrome.runtime.sendMessage({command:"cancelTranscription",jobId:ct})}function Al(e,t,s){let n=window.__sfBanner,o=(e||"").trim(),r=o.length>0,a="Transcript ready";t&&(a=`Transcript ready \u2014 first ~${Math.max(1,Math.round(Number(s||0)/60))} min (video too long for a full transcript)`);let i=document.createElement("div");i.className="sf-banner sf-trans-banner sf-ready sf-static"+(r?"":" sf-no-snippet"),i.innerHTML=`
    <div class="sf-trans-ready-fill"></div>
    <div class="sf-trans-ready-top">
      <img class="sf-icon sf-static" src="${n.iconURL("Icons/16 Sort Feed.png")}" />
      <div class="sf-message"></div>
    </div>
  `,i.querySelector(".sf-message").textContent=a;let c=n.makeCopyButton(o,()=>{setTimeout(()=>n.dismissBanner(i,0),900)});if(r){let u=document.createElement("div");u.className="sf-trans-snippet-row";let p=document.createElement("div");p.className="sf-trans-snippet";let f=document.createElement("div");f.className="sf-trans-text";let d=140,m=o.length>d?o.slice(0,d).trimEnd()+"\u2026":o;f.textContent=`"${m}"`,p.appendChild(f),p.appendChild(c),u.appendChild(p),i.appendChild(u)}else i.querySelector(".sf-trans-ready-top").appendChild(c);i.appendChild(n.makeCloseButton(()=>n.dismissBanner(i,0))),n.enterBanner(i,"transcribe");let l=i.querySelector(".sf-trans-ready-fill");l&&l.addEventListener("animationend",()=>n.dismissBanner(i,0),{once:!0})}function ds(e){let t=window.__sfBanner,s=(e||"").replace(/(\d+\s+days?)/i,'<span style="font-weight:600;">$1</span>'),n=document.createElement("div");n.className="sf-banner sf-trans-banner sf-limit sf-static",n.innerHTML=`
    <img class="sf-icon sf-static" src="${t.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-message">${s}</div>
  `,n.appendChild(t.makeCloseButton(()=>t.dismissBanner(n,0))),t.enterBanner(n,"transcribe"),setTimeout(()=>t.dismissBanner(n,0),5e3),Fs()}function Oe(e){clearTimeout(Gt);let t=window.__sfBanner,s=kt();s&&t.dismissBanner(s,0),setTimeout(()=>{let n=document.createElement("div");n.className="sf-banner sf-trans-banner sf-error sf-static",n.innerHTML=`
      <img class="sf-icon sf-static" src="${t.iconURL("Icons/16 Sort Feed.png")}" />
      <div class="sf-message">${e||"Transcription failed \u2014 try again"}</div>
    `,n.appendChild(t.makeCloseButton(()=>t.dismissBanner(n,0))),t.enterBanner(n,"transcribe"),setTimeout(()=>t.dismissBanner(n,0),5e3)},s?260:0),Fs()}function ut(e){let t=window.__sfBanner;if(!t)return;let s=e||"Unlock 500 min/month of transcripts \u2014 Go Pro",n=document.querySelector(".sf-upgrade-banner");if(n){let r=n.querySelector(".sf-message");r&&(r.textContent=s);return}let o=document.createElement("div");o.className="sf-banner sf-upgrade-banner sf-static",o.innerHTML=`
    <img class="sf-icon sf-static" src="${t.iconURL("Icons/16 Sort Feed.png")}" />
    <div class="sf-message">${s}</div>
    <button class="sf-pro-btn" type="button">
      <img src="${t.iconURL("Icons/ZeroStateIcons/black_star.svg")}" alt="" />
      <span>Get Pro</span>
    </button>
  `,o.querySelector(".sf-pro-btn").addEventListener("click",()=>{void 0}),o.appendChild(t.makeCloseButton(()=>t.dismissBanner(o,0))),t.enterBanner(o,"upgrade"),setTimeout(()=>t.dismissBanner(o,0),5e3)}window.addEventListener("message",e=>{let t=e.data;t&&t.trans&&chrome.runtime.sendMessage({command:"checkProStatus"},s=>{if(!s?.isPro){ut();return}if(Tl(),window.__sfBanner.guards.isTranscribing)return;window.__sfBanner.guards.isTranscribing=!0,vr=t.download_profile_name||"",wr=t.download_reel_id_ui||"";let o=++ct;be=!1,Bn=null,xr(null,null),Rn().then(r=>{r&&chrome.runtime.sendMessage({command:"fetchTransQuotaInfo",jobId:o,userID:r})}),Fl(t.download_reel_id,t.download_profile_name,o,t.download_reel_id_ui)})});async function Fl(e,t,s,n){if(be){Ae?.();return}let o=`https://www.instagram.com/api/v1/media/${e}/info/`;try{let r=await fetch(o,{method:"GET",credentials:"include",headers:{"x-ig-app-id":"936619743392459","x-ig-www-claim":window._sharedData?.config?.csrf_token||""}});if(!r.ok)throw new Error(`Failed: ${r.status}`);let a=await r.json();if(be)return null;let i=Array.isArray(a)?a[0]:a?.items?.[0]??a,c=f=>f&&f.match(/<AdaptationSet[^>]*contentType="audio"[^>]*>[\s\S]*?<BaseURL>([^<]+)<\/BaseURL>/i)?.[1]?.replace(/&amp;/g,"&")||null,l=i?.clips_metadata?.original_sound_info?.progressive_download_url;if(l&&/^https?:\/\//i.test(l)){if(be){Ae?.();return}return jn("progressive",l,s,e,"instagram",n,t),l}let u=c(i?.video_dash_manifest);if(u){if(be){Ae?.();return}return jn("dashAudio",u,s,e,"instagram",n,t),u}let p=i?.video_versions?.[0]?.url||null;if(p){if(be){Ae?.();return}return jn("videoFallback",p,s,e,"instagram",n,t),p}return Ae(),Oe(ft.audio_extract_failed),null}catch{return Ae(),be||Oe(ft.audio_extract_failed),null}}async function Rn(){try{let t=(await chrome.storage.local.get("sort_feed_user_id"))?.sort_feed_user_id;return t||(console.warn("No userID found in storage."),null)}catch(e){return console.error("Error fetching userID from storage:",e),null}}function _r(e,t){try{if(t==="dns"){let s=new URL(e);return s.hostname="sf-forced-fallback.invalid",s.toString()}if(t==="403")return/[?&]oh=/.test(e)?e.replace(/([?&]oh=)[^&]*/,"$1sf_forced_break"):e+(e.includes("?")?"&":"?")+"oh=sf_forced_break"}catch{}return e}async function ps(e,t=Il,s=null){let n=await fetch(e);if(!n.ok)throw new Error(`fallback fetch failed: ${n.status}`);let o=n.headers.get("content-length"),r=o?parseInt(o,10):null,a=n.body.getReader(),i=[],c=0,l=!1;for(;;){if(be){try{await a.cancel()}catch{}return null}let{done:m,value:g}=await a.read();if(m)break;if(i.push(g),c+=g.length,c>=t){l=!0;try{await a.cancel()}catch{}break}r&&s&&s(Math.min(1,c/Math.min(r,t)))}let u=new Uint8Array(c),p=0;for(let m of i)u.set(m,p),p+=m.length;let f="",d=32768;for(let m=0;m<u.length;m+=d)f+=String.fromCharCode(...u.subarray(m,m+d));return{base64:btoa(f),truncated:l}}async function Hl(e){let t=As;if(!t?.ReelURL||be||e!==ct)return!1;let s=await Rn();if(!s||be||e!==ct)return!1;Bt(Math.max(Wt,20),55,1e4);let n=null;try{n=await ps(t.ReelURL)}catch(o){console.error("IG transcription fallback download failed:",o,"url host:",(()=>{try{return new URL(t.ReelURL).host}catch{return"?"}})())}return be||e!==ct||!n?.base64?!1:(chrome.runtime.sendMessage({command:"InstagramReelTranscribe",ReelType:t.ReelType,ReelBase64:n.base64,partialHint:n.truncated,jobId:e,userID:s,contentId:t.contentId,platform:t.platform,reelIdUi:t.reelIdUi,profileName:t.profileName}),!0)}async function jn(e=null,t=null,s=null,n=null,o=null,r=null,a=null){if(be)return;if(!t)return console.warn("No ReelURL to send."),!1;let i=await Rn();if(!i)return Ae(),Oe(ft.not_signed_in),!1;As={ReelType:e,ReelURL:t,contentId:n,platform:o,reelIdUi:r,profileName:a},dn=!1,chrome.runtime.sendMessage({command:"InstagramReelTranscribe",ReelType:e,ReelURL:kn?_r(t,kn):t,jobId:s,userID:i,contentId:n,platform:o,reelIdUi:r,profileName:a})}chrome.runtime.onMessage.addListener(e=>{if(e.type==="TRANS_LIMIT_REACHED"){try{Ae?.()}catch{}Me&&(clearTimeout(Me),Me=null),st?.(),ds(e.data||"You\u2019ve reached your monthly transcription limit.");return}if(!be&&!(!e||e.jobId!==ct)){if(e.type==="TRANS_STARTED"&&(Bn=e.clientJobId||null,xr(null,null)),e.type==="TRANS_QUOTA_INFO"&&Bl(e.monthly_quota_mins,e.monthly_usage_secs),e.type==="TRANS_LOADING"&&(st?.(),Me&&clearTimeout(Me),Bt(dn?Math.max(Wt,0):0,70,3500),Me=setTimeout(()=>{Bt(70,80,3500),Me=setTimeout(()=>{Bt(80,95,12e3)},3500)},3500)),e.type==="TRANSCRIPTION_RESULT"){Me&&(clearTimeout(Me),Me=null),st();let t=(e.data.transcription||"").trim();if(!t){Oe(ft.empty_transcript);return}Bt(Math.max(Wt,80),100,250),setTimeout(()=>{let s=new Blob([t],{type:"text/plain"}),n=URL.createObjectURL(s),o=document.createElement("a");o.href=n,o.download=`${vr}_${wr}.txt`,o.click(),URL.revokeObjectURL(n),Ae(),setTimeout(()=>{Al(t,e.data.partial,e.data.duration_seconds)},200)},300)}else if(e.type==="TRANSCRIPTION_ERROR"){if(Me&&(clearTimeout(Me),Me=null),st(),e.errorCode==="cancelled"){Ae();return}if(e.errorCode==="media_fetch_failed"&&!dn&&As?.ReelURL){dn=!0;let t=e.jobId;Hl(t).then(s=>{!s&&!be&&t===ct&&(st(),Oe(ft.media_fetch_failed))});return}Oe(ft[e.errorCode]||"Transcription failed \u2014 try again")}}});})();
