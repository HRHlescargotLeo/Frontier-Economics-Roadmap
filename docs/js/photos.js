/* ==========================================================================
   photos.js — Frontier Economics photography for the design layer (V2)

   Swaps the illustrated placeholders for Frontier's own images, loaded
   directly from frontier-economics.com/media (collected from the live site on
   1 October 2026). Each image is applied only once it has loaded, so where
   the images can't be reached (for example inside the Claude artifact host)
   the illustrated brand-colour placeholder stays in place. Before any image
   loads, every placeholder is given a tone from its subject so the
   illustrations vary in a meaningful way. Images © Frontier Economics, used
   to show how the proposals would look on the live site.
   ========================================================================== */

(function () {
  'use strict';

  var BASE = 'https://www.frontier-economics.com/media/';
  function m(path, w) { return BASE + path + '?width=' + (w || 900) + '&quality=80'; }

  /* Articles, news, reports and case studies, by title (lower case). */
  var BY_TITLE = {
    'rethinking alcohol taxation in the czech republic': 'ee0nal55/shutterstock_2733235969.jpg',
    'improved nhs productivity could deliver £33bn in annual savings and prevent 20,000 deaths every year': 'dfhmvipz/shutterstock_2307615387.jpg',
    'can blue and turquoise hydrogen meet the eu’s new low-carbon threshold?': 'h3in5lu3/electrical__pipeline.jpg',
    'opening up france’s passenger rail market: benefits and conditions for success': 'wfefuy2v/shutterstock_2764964781.jpg',
    'targeted, funded, delivered: making local investment work': '2snlx5qc/shutterstock_2509320031.jpg',
    'ai in energy: how assurance can support responsible deployment': 'bchnmkzv/power-grid-banner.jpg',
    'datacentre connections: babies and bathwater?': 'yvznhi3e/shutterstock_2818684011.jpg',
    'multiple frontier experts listed in the lexology 2026 competition report': 'nskhkjzb/shutterstock_2082120214.jpg',
    'france 2030: understanding the territorial anchoring of future investment': 'y22psnqn/shutterstock_2276379755.jpg',
    'create growth programme strengthens foundations for creative businesses': 'ky4daqo4/creative-abstract.jpg',
    'european commission proposes major shift in how merger benefits are assessed': 'x15bsw1r/shutterstock_2241763075.jpg',
    'the towns fund is helping regeneration on england’s high streets': 'shnjizaj/shutterstock_1100984270.jpg',
    'ai disputes: moving beyond ip': '3jdm0tgf/shutterstock_2631130389.jpg',
    'the uk’s ai regulation opportunity': 'hovfs0jq/shutterstock_2668000443.jpg',
    'what are the broader impacts of a more supportive north sea oil and gas environment?': '5ycbgebm/shutterstock_2187841849.jpg',
    'more north sea production: weighing up the real trade-offs': '5ycbgebm/shutterstock_2187841849.jpg',
    'the digital networks act: a path to a single telecoms market?': 'qf4lgdaw/shutterstock_2458372459.jpg',
    'evolution of the gb inertia market': 'u2vdf1dy/shutterstock_632039360-1.jpg',
    'prior planning and preparation prevents… prices performing perfectly?': 'jn1np4ff/shutterstock_2430094891.jpg',
    'a fixed-price offer, with plenty still to fix': 'sgedghis/untitled-design-1.png',
    'north sea oil and gas: tough trade-offs facing uk policymakers': '0lll5lvs/shutterstock_2725862785.jpg',
    '[part one] would more north sea production lower uk energy prices or improve security?': '0lll5lvs/shutterstock_2725862785.jpg',
    'the next stage of ai will be litigated in the courts': 'qp3c10jm/1774864776699.png',
    'vodafone and three uk: clearing a complex merger through efficiency-based arguments': 'b1hj4p25/shutterstock_1549657265_2.jpg',
    'how our tool models the optimal path to net zero': 'pt0ll04c/energy-transition-green-lines-net-zero.jpg',
    'uncovering the scale of black market gambling in great britain': 'httnm45u/gambling-slots-picture.jpg',
    'open banking: connecting retail and banking data': 'tuyj40vs/open-banking_connecting-retail-and-banking-data.jpg',
    'congestion at heathrow: assessing the impact on ticket prices': '33invjts/heathrow-conjestion.jpg',
    'how could a supervisory approach to regulation work in practice?': '43ncpx4a/shutterstock_2399750193.jpg',
    'answering the big questions': 'i5tfj2wz/tree-questions.jpg'
  };

  /* Credentials, by title. */
  var CRED = {
    'clearing the vodafone / three uk merger': 'b1hj4p25/shutterstock_1549657265_2.jpg',
    'the role of gas in europe’s path to net zero': 'pt0ll04c/energy-transition-green-lines-net-zero.jpg',
    'expert testimony in investor–state disputes': 'pzrctku3/energy-disputes.jpg',
    'fair and competitive rail access in chile': '24knhmaq/chile-rail.jpg',
    'nhs productivity and technology': 'dfhmvipz/shutterstock_2307615387.jpg',
    'alcohol taxation in the czech republic': 'ee0nal55/shutterstock_2733235969.jpg',
    'eu policy for low-carbon gases': 'h3in5lu3/electrical__pipeline.jpg',
    'coal phase-out and carbon price floor': 'bchnmkzv/power-grid-banner.jpg'
  };

  /* Hot topics, by title. */
  var TOPIC = {
    'north sea oil and gas': '0lll5lvs/shutterstock_2725862785.jpg',
    'cunliffe review': '43ncpx4a/shutterstock_2399750193.jpg',
    'comet: cross-sector optimisation model for the energy transition': 'iefpzi0h/frontier-economics-comet-model-infographic-banner-5a.png',
    'mission-led government: the key to evaluating success': 'ojvbpw3h/shutterstock_2391397541.jpg',
    'competitive edge': 'zqjbgz1p/shutterstock_2505577915.jpg',
    'answering the big questions (podcast)': 'i5tfj2wz/tree-questions.jpg',
    'innovation strategy': 'e40bd0vo/nejc-soklic-wo42rmamef8-unsplash.jpg',
    'green futures': 'kkvphg3i/vlad-hilitanu-qqsiuvz94s8-unsplash.jpg'
  };

  /* Studio portraits from each person's profile. */
  var PEOPLE = {
    'sharon white': 'lnplxcmi/sharon-white-crop.jpg',
    'jon adlard': 'kx3dvsyt/jon-adlard_02w.jpg',
    'goran serdarevic': 'htdlmehr/goran-serdarevic_01.jpg',
    'dan roberts': 'b4viyce1/dan-roberts_02w.jpg',
    'dr david bothe': 'nftassbm/david-bothe-iii-high-resolution-background-crop.jpg',
    'dr jens perner': 'b15lzzwz/250327-frontier-economics3758.jpg',
    'catherine galano': 'woefe1a4/catherine-galano_03w.jpg',
    'claire thornhill': 'dpmf1iim/claire-thornhill_01w.jpg',
    'pablo gonzalez': 'i5kp123n/pablo-gonzalez-1-background-crop.jpg',
    'stefan lorenczik': 'ks5dofcl/stefan-lorenczik_02w.jpg',
    'sam street': 'vzbn3cuc/sam-street_high-res-background-crop.jpg',
    'maría paula torres': 'ebilnxrw/maria-paula-torres_03w.jpg',
    'annabelle ong': 'dmvdcju1/annabelle.png',
    'ecem can': '35bfnfp1/ecem-can_01w.jpg'
  };

  /* Labelled placeholders on the overview page. */
  var LABEL = {
    'talk to us': 'nskhkjzb/shutterstock_2082120214.jpg',
    'insights library': '0lll5lvs/shutterstock_2725862785.jpg',
    'track record': 'b1hj4p25/shutterstock_1549657265_2.jpg',
    'big questions': 'i5tfj2wz/tree-questions.jpg',
    'stay in touch': 'ky4daqo4/creative-abstract.jpg'
  };

  /* Illustration tone by subject, so placeholders differ meaningfully. */
  var TONES = [
    [/energy|hydrogen|north sea|gas|power|comet|net zero|inertia|datacentre|fuel/, 'turquoise'],
    [/competition|merger|litigat|dispute|vodafone|trucks|britnet|cma|antitrust/, 'sage'],
    [/water|cunliffe|climate|green/, 'matcha'],
    [/policy|nhs|towns|growth|investment|france|mission|tax|fraud|scam/, 'greysky'],
    [/ai\b|ai |digital|telecom|data|technology/, 'midnight']
  ];
  function toneFor(text) {
    var t = String(text || '').toLowerCase();
    for (var i = 0; i < TONES.length; i++) { if (TONES[i][0].test(t)) return TONES[i][1]; }
    return 'espresso';
  }

  function text(el) { return el ? (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase() : ''; }

  /* Apply a photo once it has loaded; leave the illustration if it fails. */
  function apply(el, src, cls) {
    if (!el || !src || el.getAttribute('data-photo') === src) return;
    el.setAttribute('data-photo', src);
    var img = new Image();
    img.onload = function () {
      if (el.getAttribute('data-photo') !== src) return;
      el.style.setProperty('--photo', 'url("' + src + '")');
      el.classList.add(cls || 'has-photo');
    };
    img.src = src;
  }
  function tone(el, subject) {
    if (el && !el.hasAttribute('data-tone')) el.setAttribute('data-tone', toneFor(subject));
  }
  function initials(name) {
    return name.replace(/^dr\s+/i, '').replace(/\[|\]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }

  function applyAll() {
    /* Result cards: a thumbnail beside the text */
    document.querySelectorAll('.result-card').forEach(function (c) {
      var t = text(c.querySelector('h3'));
      tone(c, t + ' ' + text(c.querySelector('.result-tags')));
      var p = BY_TITLE[t];
      if (p) apply(c, m(p, 480), 'has-thumb');
    });
    /* Credential cards: a photo strip across the top */
    document.querySelectorAll('.cred-card').forEach(function (c) {
      var t = text(c.querySelector('h3'));
      tone(c, t + ' ' + text(c));
      var p = CRED[t] || BY_TITLE[t];
      if (p) apply(c, m(p, 640), 'has-strip');
    });
    /* Topic cards */
    document.querySelectorAll('.topic-card').forEach(function (c) {
      var t = text(c.querySelector('h3'));
      var ph = c.querySelector('.wf-placeholder');
      tone(ph, t + ' ' + text(c.querySelector('.badge')));
      if (TOPIC[t]) apply(ph, m(TOPIC[t], 720));
    });
    /* People: square crops of the studio portraits, initials until they load */
    document.querySelectorAll('.person-card, .expert-row, .discuss-band').forEach(function (c) {
      var ph = c.querySelector('.wf-placeholder.avatar');
      if (!ph) return;
      var nameEl = c.querySelector('h3') || null;
      var name = text(nameEl);
      if (c.classList.contains('discuss-band')) name = 'goran serdarevic';
      if (!ph.hasAttribute('data-initials')) {
        ph.setAttribute('data-initials', initials(name));
        ph.textContent = initials(name) || 'Photo';
      }
      if (PEOPLE[name]) apply(ph, m(PEOPLE[name], 360), 'has-photo');
    });
    /* Article and case study hero */
    var title = text(document.getElementById('ar-title')) || text(document.querySelector('#case-study h1'));
    var hero = document.querySelector('.article-body > .wf-placeholder');
    if (hero) {
      tone(hero, title);
      if (BY_TITLE[title]) apply(hero, m(BY_TITLE[title], 1400));
    }
    /* Topic hub image */
    var hub = document.querySelector('.hub-head .wf-placeholder');
    if (hub) { tone(hub, 'north sea'); apply(hub, m('5ycbgebm/shutterstock_2187841849.jpg', 1000)); }
    /* Overview cards */
    document.querySelectorAll('.proto-thumb .wf-placeholder').forEach(function (el) {
      var t = text(el);
      tone(el, t === 'talk to us' ? 'competition' : t === 'big questions' ? 'water' : t === 'stay in touch' ? 'policy' : t === 'insights library' ? 'energy' : 'merger');
      if (LABEL[t]) apply(el, m(LABEL[t], 900));
    });
    /* Any other placeholder still gets a tone */
    document.querySelectorAll('.wf-placeholder:not(.logo):not(.avatar)').forEach(function (el) { tone(el, text(el)); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyAll();
    /* Listings and dialogs re-render, so watch for new cards. */
    if ('MutationObserver' in window) {
      var pending = false;
      new MutationObserver(function () {
        if (pending) return;
        pending = true;
        window.requestAnimationFrame(function () { pending = false; applyAll(); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  });
})();
