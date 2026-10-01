/* ==========================================================================
   wireframe.js — Frontier Economics prototype behaviour (V1, greyscale)

   Loaded after wireframe-core.js (flyouts, accordions, tabs, carousels,
   modals) and data.js (sample data). Everything is driven by ids and data
   attributes on the pages, so no page carries its own script.
   ========================================================================== */

(function () {
  'use strict';

  var FE = window.FE;

  /* --- Helpers ------------------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function store(key, val) { try { window.sessionStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ } }
  function load(key, fallback) { try { var v = JSON.parse(window.sessionStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; } }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function parseDate(s) { var p = String(s).split('-'); return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1); }
  function longDate(s) { if (!/^\d{4}-\d{2}/.test(s)) return s; var d = parseDate(s); return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function monthYear(s) { if (!/^\d{4}-\d{2}/.test(s)) return s; var d = parseDate(s); return MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function yearOf(s) { return String(s).slice(0, 4); }
  function person(id) { return FE.PEOPLE[id] || null; }
  function slug(s) { return String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  /* Query parameters carry context between pages (R03). Some hosts strip the
     query string, so the last clicked link's query is kept for the page it opens. */
  function currentFile() { return (window.location.pathname.split('/').pop() || 'index.html'); }
  function params() {
    var q = window.location.search;
    if (!q) {
      var saved = load('fe-q', null);
      if (saved && saved.file === currentFile()) q = '?' + saved.q;
    }
    try { return new URLSearchParams(q); } catch (e) { return { get: function () { return null; }, getAll: function () { return []; } }; }
  }
  function param(name) { return params().get(name); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.indexOf('?') !== -1) store('fe-q', { file: href.split('?')[0].split('/').pop(), q: href.split('?')[1].split('#')[0] });
    else if (href.charAt(0) !== '#') { try { window.sessionStorage.removeItem('fe-q'); } catch (err) { /* private mode */ } }
  }, true);

  /* --- Toast -------------------------------------------------------------- */
  var toastTimer = null;
  function toast(msg) {
    var t = $('#wf-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'wf-toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.hidden = true; }, 2800);
  }

  function initHeaderHeight() {
    var header = $('.site-header');
    if (!header) return;
    function set() { document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px'); }
    set();
    window.addEventListener('resize', set);
  }

  /* --- Notes switch (R02) -------------------------------------------------
     Shows or hides the proposal panel and numbered annotations. Off by
     default; remembered for the session. Hidden on pages with no notes. */
  function initNotes() {
    var hidden = true;
    try { hidden = window.sessionStorage.getItem('wf-notes-hidden') !== '0'; } catch (e) { /* private mode */ }
    var toggles = $all('[data-notes-toggle]');
    if (!document.querySelector('.wf-note, .proposal')) {
      toggles.forEach(function (t) { t.hidden = true; });
      return;
    }
    function apply() {
      document.body.classList.toggle('wf-notes-hidden', hidden);
      toggles.forEach(function (t) {
        t.setAttribute('aria-checked', hidden ? 'false' : 'true');
        var l = $('.notes-label', t);
        if (l) l.textContent = hidden ? 'Notes off' : 'Notes on';
      });
    }
    toggles.forEach(function (t) {
      t.addEventListener('click', function () {
        hidden = !hidden;
        try { window.sessionStorage.setItem('wf-notes-hidden', hidden ? '1' : '0'); } catch (e) { /* private mode */ }
        apply();
        if (!hidden) {
          var panel = $('.proposal');
          if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: 'start' });
        }
      });
    });
    apply();
  }

  /* --- Prototype navigator: current item and previous / next (R01) -------- */
  function initProtoNav() {
    var file = currentFile().replace('.html', '') || 'index';
    var links = $all('.proto-links a[data-proto]');
    var index = -1;
    links.forEach(function (a, i) {
      if (a.getAttribute('data-proto').split(' ').indexOf(file) !== -1) { a.setAttribute('aria-current', 'page'); index = i; }
    });
    var current = $('.proto-links a[aria-current]');
    if (current && window.innerWidth < 1024) {
      var list = current.closest('.proto-links');
      if (list) list.scrollLeft = current.offsetLeft - 16;
    }
    var pager = $('[data-proto-pager]');
    if (!pager || index < 0) return;
    function label(a) { return a.textContent.replace(/\s+/g, ' ').trim(); }
    var html = '';
    if (index > 0) html += '<a class="prev" href="' + links[index - 1].getAttribute('href') + '"><span class="wf-meta">Previous</span>' + esc(label(links[index - 1])) + '</a>';
    else html += '<span></span>';
    if (index < links.length - 1) html += '<a class="next" href="' + links[index + 1].getAttribute('href') + '"><span class="wf-meta">Next</span>' + esc(label(links[index + 1])) + '</a>';
    pager.innerHTML = html;
  }

  /* --- Drawers (mobile filters) -------------------------------------------- */
  var lastTrigger = null;
  function openDrawer(id, trigger) {
    var d = document.getElementById(id);
    if (!d) return;
    lastTrigger = trigger || null;
    d.classList.add('open');
    document.body.style.overflow = 'hidden';
    var f = $('.drawer-panel', d);
    if (f) { f.setAttribute('tabindex', '-1'); f.focus(); }
  }
  function closeDrawer(d) {
    d.classList.remove('open');
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  }
  function initDrawers() {
    $all('[data-drawer-open]').forEach(function (t) {
      t.addEventListener('click', function (e) { e.preventDefault(); openDrawer(t.getAttribute('data-drawer-open'), t); });
    });
    $all('.drawer').forEach(function (d) {
      d.addEventListener('click', function (e) {
        if (e.target === d || e.target.closest('[data-drawer-close]')) closeDrawer(d);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      $all('.drawer.open').forEach(closeDrawer);
    });
  }

  /* --- Dialogs built in script (credential, event registration) ----------- */
  var dialogTrigger = null;
  function openDialog(id, trigger) {
    var m = document.getElementById(id);
    if (!m) return;
    dialogTrigger = trigger || document.activeElement;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
    var p = $('.wf-modal-panel', m);
    if (p) { p.setAttribute('tabindex', '-1'); p.focus(); }
  }
  function closeDialog(m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
    if (dialogTrigger && dialogTrigger.focus) dialogTrigger.focus();
  }
  function initDialogs() {
    $all('.wf-modal[data-dialog]').forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target === m || e.target.closest('[data-dialog-close]')) closeDialog(m);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      $all('.wf-modal[data-dialog].open').forEach(closeDialog);
    });
  }

  /* --- Shared form validation ---------------------------------------------- */
  function validateForm(form) {
    var first = null;
    $all('[required]', form).forEach(function (input) {
      if (input.closest('[hidden]')) return;
      var field = input.closest('.field') || input.closest('fieldset');
      var ok;
      if (input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      else if (input.type === 'checkbox' && input.getAttribute('data-group')) ok = $all('[data-group="' + input.getAttribute('data-group') + '"]:checked', form).length > 0;
      else if (input.type === 'checkbox') ok = input.checked;
      else if (input.type === 'radio') ok = !!$('[name="' + input.name + '"]:checked', form);
      else ok = input.value.trim() !== '';
      if (field) {
        field.classList.toggle('has-error', !ok);
        var err = $('.field-error', field);
        if (err) err.hidden = ok;
      }
      if (!ok && !first) first = input;
    });
    var summary = $('.error-summary', form);
    if (summary) summary.hidden = !first;
    if (first) { first.focus(); return false; }
    return true;
  }
  function clearErrorsOnInput(form) {
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field && field.classList.contains('has-error')) {
        field.classList.remove('has-error');
        var err = $('.field-error', field);
        if (err) err.hidden = true;
      }
    });
  }
  function ref(prefix) { return prefix + '-' + String(Math.floor(100000 + Math.random() * 899999)); }

  /* --- Follow a topic, sector or expert (R51) ------------------------------ */
  function getFollows() { return load('fe-follows', []); }
  function setFollows(f) { store('fe-follows', f); syncFollows(); }
  function isFollowing(key) { return getFollows().some(function (f) { return f.key === key; }); }
  function toggleFollow(key, label, kind) {
    var f = getFollows();
    if (isFollowing(key)) {
      f = f.filter(function (x) { return x.key !== key; });
      setFollows(f);
      toast('You’ve stopped following ' + label);
    } else {
      f.push({ key: key, label: label, kind: kind || 'Topic' });
      setFollows(f);
      toast('Following ' + label + '. We’ll email you when something new is published.');
    }
  }
  function syncFollows() {
    var n = getFollows().length;
    $all('[data-follow-count]').forEach(function (el) { el.textContent = n; });
    $all('[data-follow]').forEach(function (b) {
      var on = isFollowing(b.getAttribute('data-follow'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var l = $('.follow-label', b);
      if (l) l.textContent = on ? 'Following' : 'Follow';
    });
    renderFollowing();
  }
  function initFollow() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-follow]');
      if (!b) return;
      e.preventDefault();
      toggleFollow(b.getAttribute('data-follow'), b.getAttribute('data-follow-label'), b.getAttribute('data-follow-kind'));
    });
    syncFollows();
  }
  function followButton(key, label, kind) {
    return '<button type="button" class="btn btn-secondary btn-sm follow-btn" data-follow="' + esc(key) + '" data-follow-label="' + esc(label) + '" data-follow-kind="' + esc(kind || 'Topic') + '" aria-pressed="false"><span aria-hidden="true">+</span> <span class="follow-label">Follow</span> <span class="visually-hidden">' + esc(label) + '</span></button>';
  }

  /* --- Copy link (R22, R26) ------------------------------------------------- */
  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(true); } catch (e) { done(false); }
      document.body.removeChild(ta);
    }
    try { navigator.clipboard.writeText(text).then(function () { done(true); }, fallback); } catch (e) { fallback(); }
  }
  function initCopyLinks() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-copy-link]');
      if (!b) return;
      e.preventDefault();
      copyText(window.location.href, function (ok) { toast(ok ? 'Link copied' : 'Copy the address from your browser bar'); });
    });
  }

  /* --- Shared markup -------------------------------------------------------- */
  function tagsFor(item) {
    return (item.sectors || []).concat(item.expertise || []).slice(0, 3);
  }
  function itemUrl(item) {
    if (item.url) return item.url;
    if (item.type === 'Event') return 'events.html';
    if (item.type === 'Frontier Focus') return 'subscribe.html#archive';
    return 'article.html?id=' + item.id;
  }
  function resultCard(item) {
    var authors = (item.authors || []).map(function (id) { var p = person(id); return p ? p.name : ''; }).filter(Boolean);
    return '<article class="result-card">' +
      '<p class="result-meta"><span class="badge">' + esc(item.type) + '</span> <time datetime="' + esc(item.date) + '">' + esc(longDate(item.date)) + '</time>' + (item.sampleDate ? ' <span class="muted small">[sample date]</span>' : '') + '</p>' +
      '<h3><a href="' + esc(itemUrl(item)) + '">' + esc(item.title) + '</a></h3>' +
      '<p class="result-summary">' + esc(item.summary) + '</p>' +
      '<p class="result-tags">' + tagsFor(item).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') +
      (authors.length ? '<span class="muted small">By ' + esc(authors.join(', ')) + '</span>' : '') +
      (item.commissioned ? '<span class="muted small">Commissioned by ' + esc(item.commissioned) + '</span>' : '') + '</p>' +
      '</article>';
  }
  function personCard(id, opts) {
    var p = person(id);
    if (!p) return '';
    return '<li class="person-card">' +
      '<span class="wf-placeholder avatar">Photo</span>' +
      '<div><h3><a href="#" data-profile>' + esc(p.name) + '</a></h3>' +
      '<p class="muted">' + esc(p.role) + '</p>' +
      (opts && opts.contact ? '<p class="person-actions"><a href="contact.html?route=new&amp;area=' + encodeURIComponent(opts.area || p.areas[0]) + '&amp;expert=' + encodeURIComponent(id) + '">Contact ' + esc(p.name.replace(/^Dr /, '').split(' ')[0]) + '</a><a href="#" data-profile>View profile</a></p>' : '') +
      '</div></li>';
  }
  function signupModule(context) {
    return '<section class="signup-module" aria-labelledby="su-' + context + '">' +
      '<div><h2 id="su-' + context + '">Get Frontier Focus</h2><p>Our newsletter and new analysis on the topics you choose, about once a month.</p></div>' +
      '<form class="signup-inline" data-signup-inline novalidate>' +
      '<div class="field"><label for="su-email-' + context + '">Email address</label><input type="email" id="su-email-' + context + '" autocomplete="email" required><p class="field-error" hidden>Enter an email address like name@organisation.com</p></div>' +
      '<button type="submit" class="btn">Choose topics</button></form></section>';
  }
  function initSignupInline() {
    $all('[data-signup-slot]').forEach(function (slot) { slot.innerHTML = signupModule(slot.getAttribute('data-signup-slot')); });
    $all('[data-signup-inline]').forEach(function (form) {
      clearErrorsOnInput(form);
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateForm(form)) return;
        store('fe-signup-email', $('input[type="email"]', form).value.trim());
        window.location.href = (currentFile() === 'index.html' ? 'pages/' : '') + 'subscribe.html?from=inline';
      });
    });
  }
  function profileLinks() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-profile]');
      if (!a) return;
      e.preventDefault();
      toast('Opens the profile page being redesigned in the Facelift project');
    });
  }

  /* ======================================================================
     Prototype 1 — Talk to the right person (R10–R17)
     ====================================================================== */
  var ROUTES = {
    new: { label: 'New work or a question about our services' },
    media: { label: 'A media enquiry' },
    careers: { label: 'Careers' },
    project: { label: 'An existing project' },
    other: { label: 'Something else' }
  };
  function areaLead(areaName) {
    for (var k in FE.AREAS) { if (FE.AREAS[k].name === areaName) return person(FE.AREAS[k].leads[0]); }
    return null;
  }
  function initContact() {
    var root = $('#contact');
    if (!root) return;
    var areaSel = $('#enq-area');
    var optS = FE.SECTORS.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join('');
    var optE = FE.EXPERTISE.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join('');
    areaSel.innerHTML = '<option value="">Choose one</option><optgroup label="Sectors">' + optS + '</optgroup><optgroup label="Expertise">' + optE + '</optgroup><option>Not sure</option>';
    var countrySel = $('#enq-country');
    var countries = ['United Kingdom', 'Ireland', 'Belgium', 'Czech Republic', 'France', 'Germany', 'Netherlands', 'Spain', 'Elsewhere in Europe', 'Latin America', 'Rest of the world'];
    countrySel.innerHTML = '<option value="">Choose one</option>' + countries.map(function (c) { return '<option>' + c + '</option>'; }).join('');

    var panels = $all('[data-route-panel]', root);
    function showRoute(r) {
      panels.forEach(function (p) { p.hidden = p.getAttribute('data-route-panel') !== r; });
      $all('input[name="route"]', root).forEach(function (i) { i.checked = i.value === r; });
      $('#route-prompt').hidden = !!r;
    }
    $all('input[name="route"]', root).forEach(function (i) {
      i.addEventListener('change', function () { showRoute(i.value); });
    });

    /* Context from the page the visitor came from (R12) */
    var route = param('route'), area = param('area'), cs = param('case'), expert = param('expert');
    if (area) { Array.prototype.forEach.call(areaSel.options, function (o) { if (o.text === area) areaSel.value = o.value || o.text; }); }
    var ctx = [];
    if (cs) ctx.push('the case study “' + cs + '”');
    if (expert && person(expert)) ctx.push(person(expert).name);
    if (ctx.length) {
      var box = $('#enq-context');
      box.hidden = false;
      $('#enq-context-text').textContent = 'You came from ' + ctx.join(' and ') + '. We’ve passed this on with your message.';
    }
    if (cs) $('#enq-msg').value = 'We’re facing a similar issue to the one in “' + cs + '”. ';
    function updateWho() {
      var lead = expert && person(expert) ? person(expert) : areaLead(areaSel.value);
      $('#enq-who').textContent = lead ? lead.name + ', ' + lead.role + ', or a colleague in the team' : 'the practice lead for your area';
    }
    areaSel.addEventListener('change', updateWho);
    updateWho();
    showRoute(route && ROUTES[route] ? route : (area || cs ? 'new' : ''));

    var form = $('#enq-form');
    clearErrorsOnInput(form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      var r = ref('FE');
      $('#enq-ref').textContent = r;
      $('#enq-done-email').textContent = $('#enq-email').value.trim();
      $('#enq-done-who').textContent = $('#enq-who').textContent;
      form.hidden = true;
      $('#enq-done').hidden = false;
      $('#enq-done').focus();
    });

    /* Office directory (R14) */
    var offSel = $('#office-country');
    var list = $('#office-list');
    var cs2 = [];
    FE.OFFICES.forEach(function (o) { if (cs2.indexOf(o.country) === -1) cs2.push(o.country); });
    offSel.innerHTML = '<option value="">All countries (' + FE.OFFICES.length + ' offices)</option>' + cs2.sort().map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('');
    function renderOffices() {
      var c = offSel.value;
      var shown = FE.OFFICES.filter(function (o) { return !c || o.country === c; });
      list.innerHTML = shown.map(function (o) {
        return '<li class="office-card" id="office-' + o.id + '"><h3>' + esc(o.city) + '</h3><p class="muted small">' + esc(o.country) + (o.note ? ' · ' + esc(o.note) : '') + '</p>' +
          '<dl class="kv-stack"><div><dt>Address</dt><dd>' + esc(o.address) + '</dd></div><div><dt>Phone</dt><dd>' + esc(o.phone) + '</dd></div><div><dt>Email</dt><dd>' + esc(o.email) + '</dd></div></dl>' +
          '<a href="#" class="small">Map and directions</a></li>';
      }).join('');
      $('#office-count').textContent = shown.length === 1 ? '1 office' : shown.length + ' offices';
    }
    offSel.addEventListener('change', renderOffices);
    renderOffices();
  }

  function initExpertise() {
    var root = $('#expertise');
    if (!root) return;
    var id = param('id') || 'energy';
    var a = FE.AREAS[id] || FE.AREAS.energy;
    $('#ex-kind').textContent = a.kind;
    $('#ex-crumb').textContent = a.kind === 'Sector' ? 'Sectors' : 'Expertise';
    $('#ex-name').textContent = a.name;
    $('#ex-name-crumb').textContent = a.name;
    $('#ex-standfirst').textContent = a.standfirst;
    $('#ex-intro').textContent = a.intro;
    document.title = a.name + ' — Frontier prototype';
    $('#ex-follow').innerHTML = followButton('area-' + id, a.name, a.kind);
    $('#ex-caps').innerHTML = a.capabilities.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('');
    $('#ex-team').innerHTML = a.leads.map(function (l) { return personCard(l, { contact: true, area: a.name }); }).join('');
    $('#ex-team-all').textContent = 'See all ' + a.people + ' people working in ' + a.name.toLowerCase() + ' [sample count]';
    $('#ex-enquire').setAttribute('href', 'contact.html?route=new&area=' + encodeURIComponent(a.name));
    $('#ex-team-h').textContent = 'Talk to our ' + a.name.toLowerCase() + ' team';
    var rec = $('#ex-recognition');
    if (a.recognition.length) {
      rec.hidden = false;
      $('#ex-rec-list').innerHTML = a.recognition.map(function (r) { return '<li><span class="rec-year">' + esc(r.year) + '</span><b>' + esc(r.what) + '</b><span>' + esc(r.detail) + '</span></li>'; }).join('');
    } else {
      rec.hidden = true;
    }
    var related = FE.INSIGHTS.filter(function (i) { return (i.sectors || []).concat(i.expertise || []).indexOf(a.name) !== -1 && i.type !== 'Event'; }).slice(0, 4);
    $('#ex-related').innerHTML = related.map(resultCard).join('');
    $('#ex-related-all').setAttribute('href', 'insights.html?' + (a.kind === 'Sector' ? 'sector' : 'expertise') + '=' + encodeURIComponent(a.name));
    var creds = FE.CREDENTIALS.filter(function (c) { return c.sectors.concat(c.expertise).indexOf(a.name) !== -1; }).slice(0, 3);
    $('#ex-creds').innerHTML = creds.map(function (c) { return '<li><b>' + esc(c.title) + '</b><span class="muted small">' + esc(c.client) + ' · ' + c.year + '</span></li>'; }).join('');
    $('#ex-creds-all').setAttribute('href', 'credentials.html?' + (a.kind === 'Sector' ? 'sector' : 'expertise') + '=' + encodeURIComponent(a.name));
    $all('[data-area-switch]').forEach(function (l) { l.setAttribute('aria-current', l.getAttribute('data-area-switch') === id ? 'page' : 'false'); });
  }

  /* ======================================================================
     Prototype 2 — Find any piece of Frontier thinking (R20–R27)
     ====================================================================== */
  function matchesQuery(item, q) {
    if (!q) return true;
    var hay = (item.title + ' ' + item.summary + ' ' + (item.sectors || []).join(' ') + ' ' + (item.expertise || []).join(' ') + ' ' + item.type + ' ' +
      (item.authors || []).map(function (id) { var p = person(id); return p ? p.name : ''; }).join(' ')).toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every(function (w) { return hay.indexOf(w) !== -1; });
  }
  function relevance(item, q) {
    if (!q) return 0;
    var t = item.title.toLowerCase(), s = 0;
    q.toLowerCase().split(/\s+/).forEach(function (w) { if (t.indexOf(w) !== -1) s += 3; });
    return s + (parseDate(item.date).getTime() / 1e13);
  }

  function initInsights() {
    var root = $('#insights');
    if (!root) return;
    var p = params();
    var state = {
      q: p.get('q') || '',
      type: p.getAll ? p.getAll('type') : [],
      sector: p.getAll ? p.getAll('sector') : [],
      expertise: p.getAll ? p.getAll('expertise') : [],
      year: p.getAll ? p.getAll('year') : [],
      sort: p.get('sort') || 'newest',
      shown: 12
    };
    var groups = [
      { key: 'type', label: 'Type', values: FE.TYPES },
      { key: 'sector', label: 'Sector', values: FE.SECTORS },
      { key: 'expertise', label: 'Expertise', values: FE.EXPERTISE },
      { key: 'year', label: 'Year', values: ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'] }
    ];
    function itemValues(item, key) {
      if (key === 'type') return [item.type];
      if (key === 'sector') return item.sectors || [];
      if (key === 'expertise') return item.expertise || [];
      if (key === 'year') return [yearOf(item.date)];
      return [];
    }
    function passes(item, except) {
      if (!matchesQuery(item, state.q)) return false;
      return groups.every(function (g) {
        if (g.key === except || !state[g.key].length) return true;
        var v = itemValues(item, g.key);
        return state[g.key].some(function (x) { return v.indexOf(x) !== -1; });
      });
    }
    function syncUrl() {
      var u = new URLSearchParams();
      if (state.q) u.set('q', state.q);
      ['type', 'sector', 'expertise', 'year'].forEach(function (k) { state[k].forEach(function (v) { u.append(k, v); }); });
      if (state.sort !== 'newest') u.set('sort', state.sort);
      var qs = u.toString();
      try { window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '')); } catch (e) { /* sandboxed */ }
      store('fe-q', { file: currentFile(), q: qs });
    }
    function renderFilters(host, prefix) {
      host.innerHTML = groups.map(function (g) {
        var opts = g.values.map(function (v) {
          var n = FE.INSIGHTS.filter(function (i) { return passes(i, g.key) && itemValues(i, g.key).indexOf(v) !== -1; }).length;
          var on = state[g.key].indexOf(v) !== -1;
          if (!n && !on) return '';
          var idv = prefix + '-' + g.key + '-' + slug(v);
          return '<label class="check facet" for="' + idv + '"><input type="checkbox" id="' + idv + '" data-facet="' + g.key + '" value="' + esc(v) + '"' + (on ? ' checked' : '') + '> <span>' + esc(v) + '</span> <span class="count-n">' + n + '</span></label>';
        }).join('');
        return '<fieldset class="facet-group"><legend>' + g.label + '</legend>' + (opts || '<p class="muted small">No options with these filters</p>') + '</fieldset>';
      }).join('');
    }
    function render() {
      var res = FE.INSIGHTS.filter(function (i) { return passes(i, null); });
      res.sort(function (a, b) {
        if (state.sort === 'relevance' && state.q) return relevance(b, state.q) - relevance(a, state.q);
        if (state.sort === 'oldest') return parseDate(a.date) - parseDate(b.date);
        return parseDate(b.date) - parseDate(a.date);
      });
      renderFilters($('#facets'), 'f');
      renderFilters($('#facets-m'), 'm');
      var chips = [];
      if (state.q) chips.push({ k: 'q', v: state.q, label: '“' + state.q + '”' });
      ['type', 'sector', 'expertise', 'year'].forEach(function (k) { state[k].forEach(function (v) { chips.push({ k: k, v: v, label: v }); }); });
      $('#active-filters').innerHTML = chips.map(function (c) { return '<button type="button" class="chip" data-remove="' + c.k + '" data-value="' + esc(c.v) + '">' + esc(c.label) + ' <span aria-hidden="true">×</span><span class="visually-hidden">Remove filter</span></button>'; }).join('') +
        (chips.length ? '<button type="button" class="btn-link" data-clear-all>Clear all</button>' : '');
      $('#result-count').textContent = res.length === 1 ? '1 result' : res.length + ' results';
      $('#m-filter-count').textContent = chips.length ? ' (' + chips.length + ')' : '';
      $('#m-apply').textContent = 'Show ' + res.length + ' results';
      var list = $('#results');
      if (!res.length) {
        list.innerHTML = '<div class="empty-state"><h3>No results</h3><p>Nothing matches all of these filters. Remove a filter, or try a broader word such as “energy”.</p><button type="button" class="btn btn-secondary" data-clear-all>Clear all filters</button></div>';
      } else {
        list.innerHTML = res.slice(0, state.shown).map(resultCard).join('');
      }
      var more = $('#show-more');
      more.hidden = res.length <= state.shown;
      more.textContent = 'Show more (' + Math.max(0, res.length - state.shown) + ' left)';
      $('#sort').value = state.sort;
      $('#lib-q').value = state.q;
      syncUrl();
    }
    document.addEventListener('change', function (e) {
      var f = e.target.getAttribute && e.target.getAttribute('data-facet');
      if (!f) return;
      var v = e.target.value;
      if (e.target.checked) { if (state[f].indexOf(v) === -1) state[f].push(v); }
      else state[f] = state[f].filter(function (x) { return x !== v; });
      state.shown = 12;
      render();
      var again = document.getElementById(e.target.id);
      if (again) again.focus();
    });
    root.addEventListener('click', function (e) {
      var r = e.target.closest('[data-remove]');
      if (r) {
        var k = r.getAttribute('data-remove'), v = r.getAttribute('data-value');
        if (k === 'q') state.q = ''; else state[k] = state[k].filter(function (x) { return x !== v; });
        render();
        return;
      }
      if (e.target.closest('[data-clear-all]')) { state.q = ''; state.type = []; state.sector = []; state.expertise = []; state.year = []; render(); }
    });
    $('#lib-search').addEventListener('submit', function (e) { e.preventDefault(); state.q = $('#lib-q').value.trim(); if (state.q) state.sort = 'relevance'; state.shown = 12; render(); });
    $('#sort').addEventListener('change', function () { state.sort = $('#sort').value; render(); });
    $('#show-more').addEventListener('click', function () { state.shown += 12; render(); });
    $('#m-apply').addEventListener('click', function () { closeDrawer($('#filter-drawer')); });
    render();
  }

  function initSearch() {
    var root = $('#search');
    if (!root) return;
    var q = param('q') || 'hydrogen';
    var tab = 'All';
    var sort = 'relevance';
    function render() {
      $('#s-q').value = q;
      var res = FE.INSIGHTS.filter(function (i) { return matchesQuery(i, q); });
      var counts = { All: res.length };
      res.forEach(function (i) { counts[i.type] = (counts[i.type] || 0) + 1; });
      var bets = FE.PAGES.filter(function (p) { return q && p.terms.some(function (t) { return q.toLowerCase().indexOf(t) !== -1 || t.indexOf(q.toLowerCase()) !== -1; }); });
      var people = [];
      Object.keys(FE.PEOPLE).forEach(function (id) {
        var p = FE.PEOPLE[id];
        if (p.name.charAt(0) === '[') return;
        if (q && (p.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 || p.areas.join(' ').toLowerCase().indexOf(q.toLowerCase()) !== -1)) people.push(id);
      });
      if (people.length) counts.People = people.length;
      $('#s-summary').textContent = (res.length + bets.length + people.length) + ' results for “' + q + '”';
      $('#s-bets').innerHTML = bets.length ? '<h2 class="h-small">Suggested pages</h2><ul class="bets">' + bets.map(function (b) { return '<li><a href="' + esc(b.url) + '"><span class="badge">' + esc(b.kind) + '</span> ' + esc(b.title) + '</a></li>'; }).join('') + '</ul>' : '';
      var order = ['All', 'Article', 'News', 'Report', 'Case study', 'Consultation response', 'Frontier Focus', 'Event', 'Podcast', 'People'];
      $('#s-tabs').innerHTML = order.filter(function (t) { return counts[t]; }).map(function (t) {
        return '<button type="button" class="tab' + (t === tab ? ' active' : '') + '" role="tab" aria-selected="' + (t === tab) + '" data-stab="' + esc(t) + '">' + esc(t) + ' <span class="count-n">' + counts[t] + '</span></button>';
      }).join('');
      var list;
      if (tab === 'People') {
        list = '<ul class="team-grid">' + people.map(function (id) { return personCard(id, { contact: true }); }).join('') + '</ul>';
      } else {
        var shown = res.filter(function (i) { return tab === 'All' || i.type === tab; });
        shown.sort(function (a, b) { return sort === 'newest' ? parseDate(b.date) - parseDate(a.date) : relevance(b, q) - relevance(a, q); });
        list = shown.length ? shown.slice(0, 10).map(resultCard).join('') : '<div class="empty-state"><h3>No results for “' + esc(q) + '”</h3><p>Check the spelling, or try a broader word. You can also browse <a href="insights.html">all insights</a>.</p></div>';
        if (shown.length > 10) list += '<p class="muted">Showing 10 of ' + shown.length + '. <a href="insights.html?q=' + encodeURIComponent(q) + '">See all in the insights library</a></p>';
      }
      $('#s-results').innerHTML = list;
      $('#s-sort').value = sort;
      $('#s-sortwrap').hidden = tab === 'People';
      try { window.history.replaceState(null, '', window.location.pathname + '?q=' + encodeURIComponent(q)); } catch (e) { /* sandboxed */ }
    }
    $('#s-form').addEventListener('submit', function (e) { e.preventDefault(); q = $('#s-q').value.trim() || q; tab = 'All'; render(); });
    $('#s-sort').addEventListener('change', function () { sort = $('#s-sort').value; render(); });
    $('#s-tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-stab]'); if (!b) return; tab = b.getAttribute('data-stab'); render(); var again = $('[data-stab="' + tab + '"]'); if (again) again.focus(); });
    $all('[data-try]').forEach(function (b) { b.addEventListener('click', function () { q = b.getAttribute('data-try'); tab = 'All'; render(); }); });
    render();
  }

  function initArticle() {
    var root = $('#article');
    if (!root) return;
    var id = param('id') || 'north-sea-article';
    var item = FE.INSIGHTS.filter(function (i) { return i.id === id; })[0] || FE.INSIGHTS.filter(function (i) { return i.id === 'north-sea-article'; })[0];
    var full = item.id === 'north-sea-article';
    $('#ar-title').textContent = item.title;
    document.title = item.title + ' — Frontier prototype';
    $('#ar-type').textContent = item.type;
    $('#ar-date').textContent = longDate(item.date);
    $('#ar-date').setAttribute('datetime', item.date);
    $('#ar-mins').textContent = (item.minutes || 4) + ' min read';
    $('#ar-tags').innerHTML = tagsFor(item).map(function (t) { return '<a class="tag" href="insights.html?' + (FE.SECTORS.indexOf(t) !== -1 ? 'sector' : 'expertise') + '=' + encodeURIComponent(t) + '">' + esc(t) + '</a>'; }).join('');
    $all('[data-full-only]').forEach(function (el) { el.hidden = !full; });
    $all('[data-generic-only]').forEach(function (el) { el.hidden = full; });
    var authors = item.authors || [];
    $('#ar-authors').innerHTML = authors.length ? authors.map(function (a) { return personCard(a, { contact: true, area: (item.sectors[0] || item.expertise[0]) }); }).join('') : '<li class="muted">[Author]</li>';
    var related = FE.INSIGHTS.filter(function (i) { return i.id !== item.id && i.type !== 'Event' && tagsFor(i).some(function (t) { return tagsFor(item).indexOf(t) !== -1; }); }).slice(0, 3);
    $('#ar-related').innerHTML = related.map(resultCard).join('');
    var tf = $('#ar-follow');
    if (item.topic === 'north-sea') tf.innerHTML = followButton('topic-north-sea', 'North Sea oil and gas', 'Topic');
    else if (item.sectors[0]) tf.innerHTML = followButton('area-' + slug(item.sectors[0]), item.sectors[0], 'Sector');
    var share = 'https://www.frontier-economics.com/uk/en/news-and-insights/articles/' + item.id + '/';
    $('#ar-li').setAttribute('href', 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(share));
  }

  /* ======================================================================
     Prototype 3 — Proof, not prose (R30–R36)
     ====================================================================== */
  function initCredentials() {
    var root = $('#credentials');
    if (!root) return;
    var view = param('view') === 'experts' ? 'experts' : 'work';
    var st = { q: '', sector: param('sector') || '', expertise: param('expertise') || '', country: '', year: '' };
    function fill(sel, values, label) { sel.innerHTML = '<option value="">' + label + '</option>' + values.map(function (v) { return '<option>' + esc(v) + '</option>'; }).join(''); }
    var countries = [];
    FE.CREDENTIALS.forEach(function (c) { c.country.split(', ').forEach(function (x) { if (countries.indexOf(x) === -1) countries.push(x); }); });
    fill($('#cr-sector'), FE.SECTORS, 'All sectors');
    fill($('#cr-expertise'), FE.EXPERTISE, 'All expertise');
    fill($('#cr-country'), countries.sort(), 'All countries');
    $('#cr-sector').value = st.sector;
    $('#cr-expertise').value = st.expertise;

    function showView(v) {
      view = v;
      $all('[data-cview]').forEach(function (b) { var on = b.getAttribute('data-cview') === v; b.classList.toggle('active', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      $('#cr-work').hidden = v !== 'work';
      $('#cr-experts').hidden = v !== 'experts';
    }
    $all('[data-cview]').forEach(function (b) { b.addEventListener('click', function () { showView(b.getAttribute('data-cview')); }); });

    function render() {
      var res = FE.CREDENTIALS.filter(function (c) {
        var hay = (c.title + ' ' + c.client + ' ' + c.question + ' ' + c.did + ' ' + c.outcome + ' ' + c.country + ' ' + c.forum).toLowerCase();
        if (st.q && st.q.toLowerCase().split(/\s+/).some(function (w) { return hay.indexOf(w) === -1; })) return false;
        if (st.sector && c.sectors.indexOf(st.sector) === -1) return false;
        if (st.expertise && c.expertise.indexOf(st.expertise) === -1) return false;
        if (st.country && c.country.split(', ').indexOf(st.country) === -1) return false;
        if (st.year === '2024+' && c.year < 2024) return false;
        if (st.year === '2020-2023' && (c.year < 2020 || c.year > 2023)) return false;
        if (st.year === 'before' && c.year >= 2020) return false;
        return true;
      }).sort(function (a, b) { return b.year - a.year; });
      $('#cr-count').textContent = res.length === 1 ? '1 engagement' : res.length + ' engagements';
      $('#cr-list').innerHTML = res.length ? res.map(function (c) {
        return '<li class="cred-card"><p class="result-meta"><span class="badge">' + c.year + '</span> <span class="muted small">' + esc(c.country) + '</span></p>' +
          '<h3><button type="button" class="link-btn" data-cred="' + c.id + '">' + esc(c.title) + '</button></h3>' +
          '<p class="small"><b>Client:</b> ' + esc(c.client) + '</p>' +
          '<p class="small muted">' + esc(c.outcome) + '</p>' +
          '<p class="result-tags">' + c.sectors.concat(c.expertise).slice(0, 3).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + (c.forum ? '<span class="tag">' + esc(c.forum) + '</span>' : '') + '</p></li>';
      }).join('') : '<li class="empty-state"><h3>No engagements match</h3><p>Try removing a filter.</p></li>';
    }
    root.addEventListener('input', function (e) {
      if (e.target.id === 'cr-q') { st.q = e.target.value.trim(); render(); }
    });
    ['sector', 'expertise', 'country', 'year'].forEach(function (k) {
      $('#cr-' + k).addEventListener('change', function () { st[k] = $('#cr-' + k).value; render(); });
    });
    $('#cr-reset').addEventListener('click', function () { st = { q: '', sector: '', expertise: '', country: '', year: '' }; ['q', 'sector', 'expertise', 'country', 'year'].forEach(function (k) { $('#cr-' + k).value = ''; }); render(); });

    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cred]');
      if (!b) return;
      var c = FE.CREDENTIALS.filter(function (x) { return x.id === b.getAttribute('data-cred'); })[0];
      if (!c) return;
      $('#cd-title').textContent = c.title;
      $('#cd-meta').textContent = c.client + ' · ' + c.country + ' · ' + c.year + (c.forum ? ' · ' + c.forum : '');
      $('#cd-q').textContent = c.question;
      $('#cd-did').textContent = c.did;
      $('#cd-out').textContent = c.outcome;
      $('#cd-team').innerHTML = c.team.length ? c.team.map(function (t) { var p = person(t); return '<li>' + esc(p.name) + ', ' + esc(p.role) + '</li>'; }).join('') : '<li class="muted">[Team to confirm]</li>';
      var links = '';
      if (c.caseUrl) links += '<a class="btn btn-secondary" href="' + esc(c.caseUrl) + '">Read the full case study</a>';
      links += '<a class="btn" href="contact.html?route=new&amp;area=' + encodeURIComponent(c.expertise[0] || c.sectors[0]) + '&amp;case=' + encodeURIComponent(c.title) + '">Discuss a similar issue</a>';
      $('#cd-links').innerHTML = links;
      openDialog('cred-modal', b);
    });

    var ex = Object.keys(FE.PEOPLE).filter(function (id) { return FE.PEOPLE[id].testifying; });
    $('#cr-expert-list').innerHTML = ex.map(function (id) {
      var p = FE.PEOPLE[id];
      return '<li class="expert-row"><span class="wf-placeholder avatar">Photo</span><div><h3>' + esc(p.name) + '</h3><p class="muted">' + esc(p.role) + ' · ' + esc(p.areas.join(', ')) + '</p><p class="small">' + esc(p.bio) + '</p></div>' +
        '<div><p class="small"><b>Has given evidence before</b></p><ul class="plain small">' + p.forums.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<p class="person-actions"><a href="contact.html?route=new&amp;area=Dispute%20Support&amp;expert=' + id + '">Instruct or enquire</a><a href="#" data-profile>View profile</a></p></div></li>';
    }).join('');
    showView(view);
    render();
  }

  function initCaseStudy() {
    var root = $('#case-study');
    if (!root) return;
    $('#cs-follow').innerHTML = followButton('area-competition', 'Competition', 'Expertise');
    var related = FE.CREDENTIALS.filter(function (c) { return c.id !== 'c-vodafone' && c.expertise.indexOf('Competition') !== -1; }).slice(0, 3);
    $('#cs-related').innerHTML = related.map(function (c) { return '<li class="cred-card"><p class="result-meta"><span class="badge">' + c.year + '</span></p><h3><a href="credentials.html?expertise=Competition">' + esc(c.title) + '</a></h3><p class="small muted">' + esc(c.outcome) + '</p></li>'; }).join('');
  }

  /* ======================================================================
     Prototype 4 — A home for each big question (R40–R44)
     ====================================================================== */
  function initTopics() {
    var root = $('#topics');
    if (!root) return;
    var area = '';
    var areas = ['All'];
    FE.TOPICS.forEach(function (t) { if (areas.indexOf(t.area) === -1 && t.area !== 'All') areas.push(t.area); });
    $('#tp-chips').innerHTML = areas.map(function (a) { return '<button type="button" class="chip" data-tp-area="' + esc(a) + '" aria-pressed="' + (a === 'All') + '">' + esc(a) + '</button>'; }).join('');
    function render() {
      var list = FE.TOPICS.filter(function (t) { return !area || area === 'All' || t.area === area || t.area === 'All'; });
      $('#tp-list').innerHTML = list.map(function (t) {
        var url = t.url || 'topic.html?id=' + t.id;
        return '<li class="topic-card"><span class="wf-placeholder ratio-16-9">Topic image</span><div class="topic-body"><p class="result-meta"><span class="badge">' + esc(t.area) + '</span>' + (t.isNew ? ' <span class="badge solid">New</span>' : '') + '</p>' +
          '<h3><a href="' + esc(url) + '">' + esc(t.title) + '</a></h3><p class="small">' + esc(t.summary) + '</p>' +
          '<p class="muted small">' + t.items + ' pieces · Updated ' + esc(monthYear(t.updated)) + '</p></div></li>';
      }).join('');
    }
    $('#tp-chips').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tp-area]');
      if (!b) return;
      area = b.getAttribute('data-tp-area');
      $all('[data-tp-area]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      render();
    });
    render();
  }

  function initTopic() {
    var root = $('#topic');
    if (!root) return;
    var id = param('id') || 'north-sea';
    var t = FE.TOPICS.filter(function (x) { return x.id === id; })[0] || FE.TOPICS[0];
    if (id !== 'north-sea') {
      $('#tp-other').hidden = false;
      $('#tp-other-name').textContent = t.title;
    }
    $('#tp-follow').innerHTML = followButton('topic-north-sea', 'North Sea oil and gas', 'Topic');
    var items = FE.INSIGHTS.filter(function (i) { return i.topic === 'north-sea'; });
    var events = FE.EVENTS.filter(function (e) { return e.topic === 'north-sea'; });
    var type = 'All';
    var types = ['All'];
    items.forEach(function (i) { if (types.indexOf(i.type) === -1) types.push(i.type); });
    $('#tp-types').innerHTML = types.map(function (x) { return '<button type="button" class="chip" data-tp-type="' + esc(x) + '" aria-pressed="' + (x === 'All') + '">' + esc(x) + '</button>'; }).join('');
    function render() {
      var shown = items.filter(function (i) { return type === 'All' || i.type === type; }).sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); });
      $('#tp-timeline').innerHTML = shown.map(function (i) {
        return '<li><time datetime="' + i.date + '">' + esc(longDate(i.date)) + '</time><div><span class="badge">' + esc(i.type) + '</span><h3><a href="' + esc(itemUrl(i)) + '">' + esc(i.title) + '</a></h3><p class="small muted">' + esc(i.summary) + '</p></div></li>';
      }).join('');
    }
    $('#tp-types').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tp-type]');
      if (!b) return;
      type = b.getAttribute('data-tp-type');
      $all('[data-tp-type]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      render();
    });
    $('#tp-experts').innerHTML = ['dan-roberts', 'claire-thornhill', 'sharon-white'].map(function (p) { return personCard(p, { contact: true, area: 'Energy' }); }).join('');
    $('#tp-events').innerHTML = events.map(function (e) { return '<li><b>' + esc(e.title) + '</b><span class="muted small">' + esc(longDate(e.date)) + ' · ' + esc(e.place) + '</span><a href="events.html?event=' + e.id + '">Register</a></li>'; }).join('');
    render();
  }

  function initModel() {
    var root = $('#model');
    if (!root) return;
    var id = param('id') || 'comet';
    var m = FE.MODELS[id] || FE.MODELS.comet;
    $('#md-nav').innerHTML = Object.keys(FE.MODELS).map(function (k) { return '<li><a href="model.html?id=' + k + '"' + (k === id ? ' aria-current="page"' : '') + '>' + esc(FE.MODELS[k].name) + '</a></li>'; }).join('');
    $('#md-name').textContent = m.name;
    $('#md-full').textContent = m.full;
    $('#md-q').textContent = m.question;
    document.title = m.name + ' — Frontier prototype';
    $('#md-features').innerHTML = m.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
    $('#md-uses').innerHTML = m.uses.map(function (f) { return '<li class="panel"><h3>' + esc(f) + '</h3><p class="small muted">[Two or three examples of questions this answers.]</p></li>'; }).join('');
    var used = m.used.map(function (u) { return FE.CREDENTIALS.filter(function (c) { return c.id === u; })[0]; }).filter(Boolean);
    $('#md-used').innerHTML = used.length ? used.map(function (c) { return '<li class="cred-card"><p class="result-meta"><span class="badge">' + c.year + '</span></p><h3><a href="credentials.html?sector=Energy">' + esc(c.title) + '</a></h3><p class="small"><b>Client:</b> ' + esc(c.client) + '</p></li>'; }).join('') : '<li class="muted">[Engagements that used this model]</li>';
    var c = person(m.contact);
    $('#md-contact').innerHTML = c ? personCard(m.contact, { contact: true, area: 'Energy' }) : '<li class="muted">[Model lead]</li>';
    $('#md-brochure').hidden = !m.brochure;
    $('#md-brochure-name').textContent = m.brochure;
    $('#md-placeholder-note').hidden = id === 'comet';
  }

  /* ======================================================================
     Prototype 5 — Stay close to Frontier (R50–R54)
     ====================================================================== */
  function renderFollowing() {
    var host = $('#following-list');
    if (!host) return;
    var f = getFollows();
    host.innerHTML = f.length ? f.map(function (x) {
      return '<li><span><span class="badge">' + esc(x.kind) + '</span> ' + esc(x.label) + '</span><button type="button" class="btn-link" data-follow="' + esc(x.key) + '" data-follow-label="' + esc(x.label) + '" data-follow-kind="' + esc(x.kind) + '">Stop following</button></li>';
    }).join('') : '<li class="muted">You aren’t following anything yet. Use Follow on a <a href="topic.html?id=north-sea">topic hub</a>, a <a href="expertise.html?id=energy">sector page</a> or an article.</li>';
  }
  function initSubscribe() {
    var root = $('#subscribe');
    if (!root) return;
    function boxes(host, values, group) {
      host.innerHTML = values.map(function (v) { var idv = 'sub-' + group + '-' + slug(v); return '<label class="check" for="' + idv + '"><input type="checkbox" id="' + idv + '" data-group="topics" value="' + esc(v) + '"> ' + esc(v) + '</label>'; }).join('');
    }
    boxes($('#sub-sectors'), FE.SECTORS, 's');
    boxes($('#sub-expertise'), FE.EXPERTISE, 'e');
    var first = $('[data-group="topics"]');
    first.setAttribute('required', '');
    var email = load('fe-signup-email', '');
    if (email) $('#sub-email').value = email;
    getFollows().forEach(function (f) {
      $all('[data-group="topics"]').forEach(function (b) { if (b.value === f.label) b.checked = true; });
    });
    $('#sub-all').addEventListener('click', function () {
      var boxesAll = $all('[data-group="topics"]');
      var on = boxesAll.some(function (b) { return !b.checked; });
      boxesAll.forEach(function (b) { b.checked = on; });
      $('#sub-all').textContent = on ? 'Clear all' : 'Select all';
    });
    var form = $('#sub-form');
    clearErrorsOnInput(form);
    form.addEventListener('change', function () { var f = $('#sub-topics-field'); if (f && $all('[data-group="topics"]:checked').length) { f.classList.remove('has-error'); $('.field-error', f).hidden = true; } });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      var topics = $all('[data-group="topics"]:checked').map(function (b) { return b.value; });
      $('#sub-check-email').textContent = $('#sub-email').value.trim();
      $('#sub-topics-chosen').textContent = topics.length > 3 ? topics.slice(0, 3).join(', ') + ' and ' + (topics.length - 3) + ' more' : topics.join(', ');
      store('fe-sub', { email: $('#sub-email').value.trim(), topics: topics, freq: ($('[name="sub-freq"]:checked') || {}).value });
      form.hidden = true;
      $('#sub-check').hidden = false;
      $('#sub-check').focus();
    });
    $('#sub-confirm').addEventListener('click', function () {
      $('#sub-check').hidden = true;
      $('#sub-done').hidden = false;
      $('#sub-done').focus();
    });
    $('#sub-edit').addEventListener('click', function () {
      $('#sub-done').hidden = true;
      form.hidden = false;
    });
    $('#archive-list').innerHTML = FE.EDITIONS.map(function (ed) {
      return '<li><time datetime="' + ed.date + '">' + esc(monthYear(ed.date)) + '</time><div><h3><a href="#">' + esc(ed.title) + '</a></h3><p class="small muted">' + esc(ed.sub) + '</p></div><a href="#" class="small">Read online</a></li>';
    }).join('');
    renderFollowing();
  }

  function icsFor(ev) {
    var d = ev.date.replace(/-/g, '');
    var times = (ev.time || '09:00–10:00').split('–');
    function t(s) { return s.replace(':', '') + '00'; }
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Frontier Economics prototype//EN', 'BEGIN:VEVENT',
      'UID:' + ev.id + '@frontier-prototype', 'DTSTART:' + d + 'T' + t(times[0]), 'DTEND:' + d + 'T' + t(times[1] || times[0]),
      'SUMMARY:' + ev.title.replace(/\[Sample\]\s*/, ''), 'LOCATION:' + ev.place, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  }
  function initEvents() {
    var root = $('#events');
    if (!root) return;
    var place = '';
    var places = [];
    FE.EVENTS.forEach(function (e) { if (places.indexOf(e.place) === -1) places.push(e.place); });
    $('#ev-place').innerHTML = '<option value="">All locations</option>' + places.sort().map(function (p) { return '<option>' + esc(p) + '</option>'; }).join('');
    function evDate(e) { var d = parseDate(e.date); return '<div class="event-date"><b>' + d.getDate() + '</b>' + SHORT[d.getMonth()] + ' ' + d.getFullYear() + '</div>'; }
    function render() {
      var up = FE.EVENTS.filter(function (e) { return e.upcoming && (!place || e.place === place); }).sort(function (a, b) { return parseDate(a.date) - parseDate(b.date); });
      var past = FE.EVENTS.filter(function (e) { return !e.upcoming && (!place || e.place === place); }).sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); });
      $('#ev-upcoming').innerHTML = up.length ? up.map(function (e) {
        var sp = (e.speakers || []).map(function (s) { var p = person(s); return p ? p.name : ''; }).filter(Boolean);
        return '<li id="ev-' + e.id + '">' + evDate(e) + '<div><h3>' + esc(e.title) + '</h3><p class="small muted">' + esc(e.time) + ' · ' + esc(e.place) + ' · ' + esc(e.format) + (sp.length ? ' · With ' + esc(sp.join(', ')) : '') + '</p></div>' +
          '<button type="button" class="btn btn-sm" data-register="' + e.id + '">Register</button></li>';
      }).join('') : '<li class="empty-state"><h3>Nothing scheduled here yet</h3><p>We’ll email you when we announce an event in ' + esc(place || 'your area') + '.</p><a class="btn btn-secondary" href="subscribe.html">Get event invitations</a></li>';
      $('#ev-past').innerHTML = past.length ? past.map(function (e) {
        return '<li>' + evDate(e) + '<div><h3>' + esc(e.title) + '</h3><p class="small muted">' + esc(e.place) + ' · ' + esc(e.format) + '</p></div>' +
          (e.materials ? '<a href="#" class="small">' + esc(e.materials) + '</a>' : '<span class="small muted">No materials</span>') + '</li>';
      }).join('') : '<li class="muted">No past events here.</li>';
    }
    $('#ev-place').addEventListener('change', function () { place = $('#ev-place').value; render(); });
    var current = null;
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-register]');
      if (!b) return;
      current = FE.EVENTS.filter(function (x) { return x.id === b.getAttribute('data-register'); })[0];
      $('#rg-title').textContent = current.title;
      $('#rg-meta').textContent = longDate(current.date) + ' · ' + current.time + ' · ' + current.place;
      $('#rg-form').hidden = false;
      $('#rg-done').hidden = true;
      $('#rg-form').reset();
      $('#rg-attend-field').hidden = current.format !== 'In person';
      openDialog('reg-modal', b);
    });
    var form = $('#rg-form');
    clearErrorsOnInput(form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      $('#rg-email').textContent = $('#rg-mail').value.trim();
      form.hidden = true;
      $('#rg-done').hidden = false;
      var a = $('#rg-ics');
      try {
        var blob = new Blob([icsFor(current)], { type: 'text/calendar' });
        a.href = URL.createObjectURL(blob);
        a.setAttribute('download', current.id + '.ics');
      } catch (err) { a.href = '#'; }
      $('#rg-done').focus();
    });
    render();
    var want = param('event');
    if (want) {
      var btn = $('[data-register="' + want + '"]');
      if (btn) { btn.scrollIntoView({ block: 'center' }); btn.focus(); }
    }
  }

  /* --- Module library --------------------------------------------------- */
  function initLibrary() {
    var root = $('#library');
    if (!root) return;
    $('#lib-result').innerHTML = resultCard(FE.INSIGHTS[0]);
    $('#lib-person').innerHTML = personCard('dan-roberts', { contact: true, area: 'Energy' });
    $('#lib-follow').innerHTML = followButton('area-energy', 'Energy', 'Sector');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderHeight();
    initNotes();
    initProtoNav();
    initDrawers();
    initDialogs();
    initCopyLinks();
    profileLinks();
    initSignupInline();
    initContact();
    initExpertise();
    initInsights();
    initSearch();
    initArticle();
    initCredentials();
    initCaseStudy();
    initTopics();
    initTopic();
    initModel();
    initSubscribe();
    initEvents();
    initLibrary();
    initFollow();
  });
})();
