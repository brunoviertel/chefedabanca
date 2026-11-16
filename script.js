(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Conteúdo a partir do config ---------- */
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  setText("name", cfg.name);
  setText("tagline", cfg.tagline);

  var photo = document.getElementById("photo");
  if (photo) {
    if (cfg.photo) photo.src = cfg.photo;
    if (cfg.photoAlt) photo.alt = cfg.photoAlt;
  }

  /* ---------- UTM ---------- */
  function utmParams() {
    var out = [];
    try {
      new URLSearchParams(window.location.search).forEach(function (v, k) {
        if (/^utm_/i.test(k)) out.push([k, v]);
      });
    } catch (e) {}
    return out;
  }

  function withUtm(url, params) {
    if (!params.length) return url;
    try {
      var u = new URL(url);
      params.forEach(function (p) { u.searchParams.set(p[0], p[1]); });
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  var utm = cfg.forwardUtm === false ? [] : utmParams();

  /* ---------- Botões ---------- */
  var nav = document.getElementById("links");
  if (nav && Array.isArray(cfg.links) && cfg.links.length) {
    nav.innerHTML = "";
    cfg.links.forEach(function (link) {
      var a = document.createElement("a");
      a.className = "link-btn";
      a.href = withUtm(link.url, utm);
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      if (link.track) a.setAttribute("data-track", link.track);
      a.textContent = link.label;
      nav.appendChild(a);
    });
  } else if (nav) {
    Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) {
      a.href = withUtm(a.href, utm);
    });
  }

  /* ---------- Avisos ---------- */
  var list = document.getElementById("notices");
  if (list && Array.isArray(cfg.notices) && cfg.notices.length) {
    list.innerHTML = "";
    cfg.notices.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });
  }

  /* ---------- Rastreamento de cliques ---------- */
  function track(name, url) {
    var props = { botao: name, destino: url };
    try { if (typeof window.plausible === "function") window.plausible("Clique", { props: props }); } catch (e) {}
    try { if (typeof window.gtag === "function") window.gtag("event", "clique_botao", props); } catch (e) {}
    try { if (typeof window.fbq === "function") window.fbq("trackCustom", "CliqueBotao", props); } catch (e) {}
    try { (window.dataLayer = window.dataLayer || []).push({ event: "clique_botao", botao: name, destino: url }); } catch (e) {}
    try { document.dispatchEvent(new CustomEvent("link:click", { detail: props })); } catch (e) {}
  }

  document.addEventListener("click", function (ev) {
    var el = ev.target.closest && ev.target.closest("[data-track]");
    if (el) track(el.getAttribute("data-track"), el.href);
  });

  /* Micro-interação ao tocar */
  document.addEventListener("pointerdown", function (ev) {
    var btn = ev.target.closest && ev.target.closest(".link-btn");
    if (!btn) return;
    btn.classList.add("is-pressed");
    var up = function () { btn.classList.remove("is-pressed"); };
    btn.addEventListener("pointerup", up, { once: true });
    btn.addEventListener("pointerleave", up, { once: true });
  });

  /* ---------- Animação de entrada ---------- */
  if (!reduceMotion) {
    var items = [document.querySelector(".avatar"), document.getElementById("name"), document.getElementById("tagline")]
      .concat(Array.prototype.slice.call(document.querySelectorAll("#links .link-btn")))
      .concat([document.querySelector(".notices")]);
    items.forEach(function (el, i) {
      if (!el) return;
      el.classList.add("reveal");
      el.style.animationDelay = (i * 80) + "ms";
    });
  }

  /* ---------- Faíscas douradas ---------- */
  var canvas = document.querySelector(".sparks");
  if (!canvas || reduceMotion || cfg.sparks === false || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0, sparks = [], running = true;

  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(40, (w * h) / 22000));
    while (sparks.length < count) sparks.push(spawn(true));
    sparks.length = count;
  }

  function spawn(anywhere) {
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.4 + .4,
      vy: Math.random() * .35 + .12,
      vx: (Math.random() - .5) * .15,
      a: Math.random() * .5 + .2,
      t: Math.random() * Math.PI * 2
    };
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < sparks.length; i++) {
      var s = sparks[i];
      s.y -= s.vy; s.x += s.vx; s.t += .03;
      if (s.y < -10) sparks[i] = s = spawn(false);
      var alpha = s.a * (.6 + .4 * Math.sin(s.t));
      ctx.beginPath();
      ctx.fillStyle = "rgba(232, 196, 92," + alpha.toFixed(3) + ")";
      ctx.shadowColor = "rgba(212, 175, 55, .8)";
      ctx.shadowBlur = 6;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
