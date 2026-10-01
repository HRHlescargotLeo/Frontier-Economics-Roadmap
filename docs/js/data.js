/* ==========================================================================
   data.js — sample data for the Frontier Economics prototypes

   Titles, authors, roles and September–January dates are taken from
   frontier-economics.com as seen on 1 October 2026. Dates for older items,
   all credentials, upcoming events, office details other than London and
   anything in [square brackets] are SAMPLES for the prototypes, to be
   replaced with Frontier's own data.
   ========================================================================== */

window.FE = (function () {
  'use strict';

  /* One taxonomy for every filter, tag and form (R05). Taken from the main
     menu; the footer and current filters disagree with it. */
  var SECTORS = ['Automotive', 'Climate Change', 'Communications', 'Digital', 'Economics of AI', 'Energy',
    'Financial Services', 'Health and Social Care', 'Post', 'Retail and Consumer', 'Technology', 'Transport', 'Water'];
  var EXPERTISE = ['Behavioural Economics', 'Competition', 'Data Science & AI', 'Dispute Support', 'Finance',
    'International Trade', 'Merger Benefits Unit', 'Public Policy', 'Regulation', 'Strategy', 'Transfer Pricing'];
  var TYPES = ['Article', 'News', 'Report', 'Case study', 'Consultation response', 'Frontier Focus', 'Event', 'Podcast'];

  /* People named on the live site. Offices were not checked, so they are left out. */
  var PEOPLE = {
    'sharon-white': { name: 'Sharon White', role: 'Chair', areas: ['Public Policy', 'Energy', 'Economics of AI'] },
    'jon-adlard': { name: 'Jon Adlard', role: 'Executive Director', areas: ['Competition', 'Dispute Support'], testifying: true,
      forums: ['Competition Appeal Tribunal', 'High Court of England and Wales'],
      bio: 'Co-leads Frontier’s European competition litigation group. Work includes Trucks, BritNed, Power Cables and Gas Insulated Switchgear; instructed on several collective proceedings before the CAT.' },
    'goran-serdarevic': { name: 'Goran Serdarevic', role: 'Executive Director', areas: ['Competition', 'Communications', 'Merger Benefits Unit'] },
    'dan-roberts': { name: 'Dan Roberts', role: 'Executive Director', areas: ['Energy', 'Regulation'] },
    'david-bothe': { name: 'Dr David Bothe', role: 'Executive Director', areas: ['Energy', 'Climate Change'] },
    'jens-perner': { name: 'Dr Jens Perner', role: 'Executive Director', areas: ['Energy', 'Public Policy'] },
    'catherine-galano': { name: 'Catherine Galano', role: 'Executive Director', areas: ['Energy', 'Regulation'] },
    'claire-thornhill': { name: 'Claire Thornhill', role: 'Director', areas: ['Energy', 'Climate Change', 'Public Policy'] },
    'pablo-gonzalez': { name: 'Pablo Gonzalez', role: 'Senior Principal', areas: ['Energy', 'Finance'] },
    'stefan-lorenczik': { name: 'Stefan Lorenczik', role: '[Role]', areas: ['Energy'] },
    'sam-street': { name: 'Sam Street', role: '[Role]', areas: ['Energy'] },
    'maria-paula-torres': { name: 'María Paula Torres', role: '[Role]', areas: ['Energy'] },
    'annabelle-ong': { name: 'Annabelle Ong', role: '[Role]', areas: ['Water', 'Regulation'] },
    'ecem-can': { name: 'Ecem Can', role: '[Role]', areas: ['Water', 'Regulation'] },
    'expert-a': { name: '[Testifying expert]', role: '[Executive Director]', areas: ['Dispute Support', 'Finance'], testifying: true,
      forums: ['[ICSID tribunal]', '[ICC arbitration]'], bio: '[Sample entry: investor–state arbitration and valuation evidence in the energy sector.]' },
    'expert-b': { name: '[Testifying expert]', role: '[Director]', areas: ['Competition', 'Dispute Support'], testifying: true,
      forums: ['Competition Appeal Tribunal'], bio: '[Sample entry: pass-on and damages in collective proceedings.]' }
  };

  /* Leads shown on sector and expertise pages (R15). */
  var AREAS = {
    energy: { name: 'Energy', kind: 'Sector', standfirst: 'Powering the economics of energy',
      intro: 'Governments, regulators, energy companies, and their financial and legal advisors come to us for advice. They draw on our expertise in strategy, regulation, valuation, and competition policy.',
      leads: ['dan-roberts', 'david-bothe', 'catherine-galano'], people: 48,
      capabilities: ['Commercial strategy', 'Regulation', 'Market design', 'Climate change and sustainability', 'Smart networks and retail solutions', 'Dispute resolution', 'Investment and transaction support', 'Energy modelling', 'Auction support'],
      recognition: [] },
    competition: { name: 'Competition', kind: 'Expertise', standfirst: 'Getting to the heart of competition policy',
      intro: 'Economics is essential to understanding the competitive dynamics of markets, and economic evidence is a critical part of many competition law cases.',
      leads: ['jon-adlard', 'goran-serdarevic'], people: 62,
      capabilities: ['Mergers and acquisitions', 'Market investigations', 'Abuse of a dominant position', 'Horizontal and vertical agreements', 'Private enforcement', 'Competition appeals'],
      recognition: [
        { what: 'Lexology Index: Competition 2026', detail: 'Multiple Frontier experts listed', year: '2026' },
        { what: 'Who’s Who Legal, Economists', detail: 'Jon Adlard listed as a Future Leader', year: '2023' },
        { what: 'Competition Appeal Tribunal and High Court', detail: 'Expert evidence in Trucks, BritNed, Power Cables and other cases', year: 'Ongoing' },
        { what: '[Further ranking]', detail: '[To be supplied by Frontier]', year: '[Year]' }
      ] }
  };

  /* Content library (R20). url: where the prototype opens it. */
  var INSIGHTS = [
    { id: 'czech-alcohol', type: 'Article', title: 'Rethinking alcohol taxation in the Czech Republic', date: '2026-09-24', sectors: ['Retail and Consumer'], expertise: ['International Trade', 'Public Policy'], summary: 'The Czech Republic could raise alcohol tax revenues while reducing disparities in how different drinks are taxed.' },
    { id: 'nhs-productivity', type: 'News', title: 'Improved NHS productivity could deliver £33bn in annual savings and prevent 20,000 deaths every year', date: '2026-09-18', sectors: ['Health and Social Care'], expertise: ['Public Policy'], summary: 'Frontier led on a landmark paper about the potential of technology to contribute to savings and better outcomes.' },
    { id: 'turquoise-hydrogen', type: 'Article', title: 'Can blue and turquoise hydrogen meet the EU’s new low-carbon threshold?', date: '2026-09-16', sectors: ['Energy', 'Climate Change'], expertise: ['Regulation'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'france-rail', type: 'Article', title: 'Opening up France’s passenger rail market: benefits and conditions for success', date: '2026-09-11', sectors: ['Transport'], expertise: ['Competition', 'Regulation'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'local-investment', type: 'Article', title: 'Targeted, funded, delivered: making local investment work', date: '2026-09-08', sectors: [], expertise: ['Public Policy'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'ai-energy-assurance', type: 'Article', title: 'AI in energy: how assurance can support responsible deployment', date: '2026-09-03', sectors: ['Energy', 'Economics of AI'], expertise: ['Regulation'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'app-fraud', type: 'News', title: 'Revealed: payment scam policies proven to reduce fraud', date: '2026-09-02', sectors: ['Financial Services'], expertise: ['Public Policy'], summary: 'Our independent evaluation shows the UK’s Authorised Push Payment policies benefit consumer protection and fraud loss.' },
    { id: 'datacentre-connections', type: 'Article', title: 'Datacentre connections: babies and bathwater?', date: '2026-08-20', sectors: ['Energy', 'Digital'], expertise: ['Regulation'], authors: ['dan-roberts'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'lexology-2026', type: 'News', title: 'Multiple Frontier experts listed in the Lexology 2026 Competition report', date: '2026-08-06', sectors: [], expertise: ['Competition'], summary: 'Frontier economists have again been recognised among the world’s leading competition experts.' },
    { id: 'france-2030', type: 'Article', title: 'France 2030: understanding the territorial anchoring of future investment', date: '2026-07-22', sectors: [], expertise: ['Public Policy'], summary: 'How France’s flagship investment programme is landing in the regions.' },
    { id: 'create-growth', type: 'Report', title: 'Create Growth Programme strengthens foundations for creative businesses', date: '2026-07-15', sectors: [], expertise: ['Public Policy'], summary: 'Our evaluation finds the programme has strengthened the commercial foundations of creative businesses across England.', commissioned: '[Commissioning department]' },
    { id: 'merger-benefits-ec', type: 'Article', title: 'European Commission proposes major shift in how merger benefits are assessed', date: '2026-07-09', sectors: [], expertise: ['Competition', 'Merger Benefits Unit'], summary: 'Brussels is rethinking how benefits are weighed in merger control.' },
    { id: 'towns-fund', type: 'Report', title: 'The Towns Fund is helping regeneration on England’s high streets', date: '2026-07-02', sectors: [], expertise: ['Public Policy'], summary: 'Evidence that targeted regeneration funding is changing the fortunes of high streets.', commissioned: '[Commissioning department]' },
    { id: 'ai-disputes', type: 'Article', title: 'AI disputes: moving beyond IP', date: '2026-06-24', sectors: ['Economics of AI'], expertise: ['Competition', 'Dispute Support'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'ai-regulation-uk', type: 'Article', title: 'The UK’s AI regulation opportunity', date: '2026-06-10', sectors: ['Economics of AI'], expertise: ['Regulation'], authors: ['sharon-white'], summary: 'How the UK can set a “third way” on AI regulation, helping to unlock innovation.' },
    { id: 'north-sea-part-two', type: 'Report', title: 'What are the broader impacts of a more supportive North Sea oil and gas environment?', date: '2026-05-20', sectors: ['Energy', 'Climate Change'], expertise: ['Public Policy'], authors: ['dan-roberts', 'claire-thornhill', 'sam-street', 'maria-paula-torres'], summary: 'Part two of our independent series: growth, jobs, tax revenues and emissions.', url: 'report.html', topic: 'north-sea', commissioned: 'Independent Frontier analysis' },
    { id: 'north-sea-news', type: 'News', title: 'More North Sea production: weighing up the real trade-offs', date: '2026-05-20', sectors: ['Energy'], expertise: ['Public Policy'], authors: ['dan-roberts', 'claire-thornhill'], summary: 'We publish the second of our two-part report series.', topic: 'north-sea' },
    { id: 'digital-networks-act', type: 'Article', title: 'The Digital Networks Act: a path to a single telecoms market?', date: '2026-05-14', sectors: ['Communications'], expertise: ['Regulation'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'gb-inertia', type: 'Article', title: 'Evolution of the GB inertia market', date: '2026-05-12', sectors: ['Energy'], expertise: ['Regulation'], authors: ['dan-roberts'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'prior-planning', type: 'Article', title: 'Prior planning and preparation prevents… prices performing perfectly?', date: '2026-05-07', sectors: ['Energy'], expertise: ['Regulation'], authors: ['dan-roberts'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'fixed-price-offer', type: 'Article', title: 'A fixed-price offer, with plenty still to fix', date: '2026-05-05', sectors: ['Energy'], expertise: ['Regulation'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'north-sea-article', type: 'Article', title: 'North Sea oil and gas: tough trade-offs facing UK policymakers', date: '2026-04-28', sectors: ['Energy', 'Climate Change'], expertise: ['Public Policy'], authors: ['sharon-white'], summary: 'Frontier Chair Sharon White on the judgements that matter in the debate over more North Sea drilling.', topic: 'north-sea', minutes: 5 },
    { id: 'north-sea-part-one', type: 'Report', title: '[Part one] Would more North Sea production lower UK energy prices or improve security?', date: '2026-04-14', sectors: ['Energy'], expertise: ['Public Policy'], authors: ['dan-roberts', 'claire-thornhill'], summary: 'Part one of our independent series: prices and resilience.', url: 'report.html', topic: 'north-sea', commissioned: 'Independent Frontier analysis' },
    { id: 'ai-courts', type: 'Article', title: 'The next stage of AI will be litigated in the courts', date: '2026-04-08', sectors: ['Economics of AI'], expertise: ['Competition', 'Dispute Support'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'green-efficiencies', type: 'Article', title: 'Green efficiencies in merger assessment: what’s in it for consumers?', date: '2026-02-17', sectors: ['Climate Change'], expertise: ['Competition', 'Merger Benefits Unit'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'cma-responses', type: 'Consultation response', title: '[Frontier responds to CMA consultations on merger guidance]', date: '2026-02-03', sectors: [], expertise: ['Competition'], summary: '[Sample: summary of the points made, with the response PDF.]', regulator: 'CMA' },
    { id: 'litigation-2025', type: 'Article', title: 'UK competition litigation: the cases that shaped 2025 – and what’s next', date: '2026-01-20', sectors: [], expertise: ['Competition', 'Dispute Support'], authors: ['jon-adlard'], summary: '[Summary of the article, one or two sentences.]' },
    { id: 'fuels-future', type: 'Event', title: 'Fuels of the Future', date: '2026-01-19', sectors: ['Energy'], expertise: [], summary: 'Berlin.' },
    { id: 'ofgem-response', type: 'Consultation response', title: '[Response to Ofgem consultation on network price controls]', date: '2025-11-12', sectors: ['Energy'], expertise: ['Regulation'], summary: '[Sample entry.]', regulator: 'Ofgem' },
    { id: 'cunliffe-supervisory', type: 'Article', title: 'How could a supervisory approach to regulation work in practice?', date: '2025-09-10', sectors: ['Water'], expertise: ['Regulation'], authors: ['annabelle-ong', 'ecem-can'], summary: 'Part of our Cunliffe review paper series.', topic: 'cunliffe', sampleDate: true },
    { id: 'vodafone-three', type: 'Case study', title: 'Vodafone and Three UK: Clearing a complex merger through efficiency-based arguments', date: '2025-06-10', sectors: ['Communications'], expertise: ['Competition', 'Merger Benefits Unit'], authors: ['goran-serdarevic'], summary: 'Frontier advised Vodafone throughout the CMA’s review of the merger with Three UK.', url: 'case-study.html', sampleDate: true, commissioned: 'Vodafone' },
    { id: 'ff-infrastructure', type: 'Frontier Focus', title: 'Infrastructure in focus: the investment challenge: how to fund the infrastructure of the future', date: '2025-06-01', sectors: [], expertise: ['Finance', 'Public Policy'], summary: 'Newsletter edition.', sampleDate: true },
    { id: 'comet-case', type: 'Case study', title: 'How our tool models the optimal path to net zero', date: '2025-03-18', sectors: ['Energy', 'Climate Change'], expertise: [], authors: ['david-bothe'], summary: 'We used COMET in a study for Eurogas assessing the role of gas in Europe’s transition to net zero.', url: 'model.html', sampleDate: true, commissioned: 'Eurogas' },
    { id: 'ff-ai-2025', type: 'Frontier Focus', title: 'The shape of AI in 2025: AI in the era of regulation: striking the balance', date: '2025-02-01', sectors: ['Economics of AI'], expertise: ['Regulation'], summary: 'Newsletter edition.', sampleDate: true },
    { id: 'naturgy', type: 'Case study', title: 'Valuing a multi-country gas and electricity utility', date: '2024-11-05', sectors: ['Energy'], expertise: ['Finance', 'Regulation'], authors: ['pablo-gonzalez'], summary: 'Regulatory and commercial due diligence on Naturgy’s network assets in six countries for GIP.', sampleDate: true, commissioned: 'GIP' },
    { id: 'ff-2024', type: 'Frontier Focus', title: '2024: a year in review: tackling complexity, driving innovation', date: '2024-12-01', sectors: [], expertise: [], summary: 'Newsletter edition.', sampleDate: true },
    { id: 'black-market-gambling', type: 'Case study', title: 'Uncovering the scale of black market gambling in Great Britain', date: '2024-06-12', sectors: ['Retail and Consumer'], expertise: ['Strategy', 'Public Policy'], summary: '[Summary of the case study.]', sampleDate: true },
    { id: 'eu-low-carbon-gases', type: 'Case study', title: 'EU-level policy action to facilitate low-carbon gases', date: '2023-10-02', sectors: ['Energy'], expertise: ['Public Policy', 'Regulation'], authors: ['catherine-galano'], summary: 'A study for the European Commission on the policies needed to develop biomethane and clean hydrogen.', sampleDate: true, commissioned: 'European Commission' },
    { id: 'nl-power-market', type: 'Case study', title: 'Power market modelling for climate policy in the Netherlands', date: '2022-09-14', sectors: ['Energy'], expertise: ['Public Policy'], authors: ['jens-perner'], summary: 'The effects of a coal phase-out and a carbon price floor, for the Dutch Ministry of Economic Affairs and Climate Policy.', sampleDate: true, commissioned: 'Dutch Ministry of Economic Affairs and Climate Policy' },
    { id: 'open-banking', type: 'Case study', title: 'Open Banking: connecting retail and banking data', date: '2022-03-08', sectors: ['Financial Services'], expertise: ['Data Science & AI'], summary: '[Summary of the case study.]', sampleDate: true },
    { id: 'blue-green-pink', type: 'Article', title: 'Blue, green or pink hydrogen?', date: '2021-06-15', sectors: ['Energy'], expertise: ['Regulation'], summary: '[Summary of the article.]', sampleDate: true },
    { id: 'hydrogen-networks', type: 'Report', title: 'Regulating dedicated hydrogen networks', date: '2021-02-10', sectors: ['Energy'], expertise: ['Regulation'], summary: 'How to regulate hydrogen networks as the EU Hydrogen Strategy takes shape.', sampleDate: true },
    { id: 'low-carbon-hydrogen-beis', type: 'Case study', title: 'The future of low carbon hydrogen production', date: '2020-08-20', sectors: ['Energy'], expertise: ['Public Policy'], summary: 'Business models to support low carbon hydrogen production, commissioned by BEIS (since replaced by DESNZ).', sampleDate: true, commissioned: 'BEIS' },
    { id: 'heathrow', type: 'Case study', title: 'Congestion at Heathrow: assessing the impact on ticket prices', date: '2019-05-14', sectors: ['Transport'], expertise: ['Competition'], summary: '[Summary of the case study.]', sampleDate: true },
    { id: 'big-questions', type: 'Podcast', title: 'Answering the Big Questions', date: '2024-03-01', sectors: [], expertise: [], summary: 'Frontier’s podcast series, from Hot Topics.', sampleDate: true }
  ];

  /* Pages that appear as suggested results in site search (R25). */
  var PAGES = [
    { title: 'Energy', kind: 'Sector', url: 'expertise.html?id=energy', terms: ['energy', 'hydrogen', 'gas', 'power', 'electricity', 'north sea', 'oil'] },
    { title: 'Competition', kind: 'Expertise', url: 'expertise.html?id=competition', terms: ['competition', 'merger', 'cma', 'litigation', 'antitrust'] },
    { title: 'COMET: Cross-sector Optimisation Model for the Energy Transition', kind: 'Model', url: 'model.html?id=comet', terms: ['comet', 'model', 'net zero', 'hydrogen', 'energy'] },
    { title: 'HyLO: hydrogen cost modelling', kind: 'Model', url: 'model.html?id=hylo', terms: ['hylo', 'hydrogen'] },
    { title: 'North Sea oil and gas', kind: 'Topic hub', url: 'topic.html?id=north-sea', terms: ['north sea', 'oil', 'gas', 'drilling'] },
    { title: 'Cunliffe review', kind: 'Topic hub', url: 'topic.html?id=cunliffe', terms: ['cunliffe', 'water', 'ofwat'] },
    { title: 'Testifying experts', kind: 'Page', url: 'credentials.html?view=experts', terms: ['expert witness', 'testify', 'litigation', 'tribunal', 'cat'] }
  ];

  /* Credentials library (R30). All SAMPLE summaries built from public mentions;
     outcomes in brackets need Frontier's confirmation. */
  var CREDENTIALS = [
    { id: 'c-vodafone', title: 'Clearing the Vodafone / Three UK merger', client: 'Vodafone', year: 2024, country: 'United Kingdom', sectors: ['Communications'], expertise: ['Competition', 'Merger Benefits Unit'], forum: 'CMA', question: 'Could efficiency and investment arguments carry a four-to-three mobile merger?', did: 'Advised throughout the CMA review, framing the case around long-term quality and investment rather than short-term prices.', outcome: 'Cleared by the CMA in December 2024; the merged operator plans £11bn of network investment.', team: ['goran-serdarevic'], caseUrl: 'case-study.html' },
    { id: 'c-trucks', title: 'Expert evidence in the UK Trucks litigation', client: '[Client withheld]', year: 2023, country: 'United Kingdom', sectors: ['Automotive'], expertise: ['Competition', 'Dispute Support'], forum: 'Competition Appeal Tribunal', question: '[What overcharge, if any, did the cartel cause?]', did: 'Economic analysis and expert reports at successive stages of the litigation.', outcome: '[Outcome to confirm]', team: ['jon-adlard'] },
    { id: 'c-britned', title: 'BritNed damages claim', client: '[Client withheld]', year: 2019, country: 'United Kingdom', sectors: ['Energy'], expertise: ['Competition', 'Dispute Support'], forum: 'High Court of England and Wales', question: '[Quantifying the effect of the power cables cartel on an interconnector.]', did: 'Economic evidence on overcharge and damages.', outcome: '[Outcome to confirm]', team: ['jon-adlard'] },
    { id: 'c-naturgy', title: 'Due diligence on Naturgy’s network assets', client: 'GIP', year: 2018, country: 'Spain, Chile, Colombia, Brazil, Panama, Mexico', sectors: ['Energy'], expertise: ['Finance', 'Regulation'], forum: '', question: 'What are the regulatory and commercial risks across six regimes?', did: 'Regulatory and commercial due diligence on gas and electricity networks in six countries.', outcome: '[Transaction completed; detail to confirm]', team: ['pablo-gonzalez'] },
    { id: 'c-eurogas', title: 'The role of gas in Europe’s path to net zero', client: 'Eurogas', year: 2024, country: 'European Union', sectors: ['Energy', 'Climate Change'], expertise: ['Public Policy'], forum: '', question: 'What is the cost-optimal role for gas in a net zero energy system?', did: 'Modelled pathways with COMET, Frontier’s cross-sector energy system model.', outcome: '[Headline finding to confirm]', team: ['david-bothe'], caseUrl: 'model.html?id=comet' },
    { id: 'c-ec-gases', title: 'EU policy for low-carbon gases', client: 'European Commission', year: 2023, country: 'European Union', sectors: ['Energy'], expertise: ['Public Policy', 'Regulation'], forum: '', question: 'Which policies would help biomethane and clean hydrogen develop?', did: 'Led a study assessing EU-level policy options.', outcome: '[Outcome to confirm]', team: ['catherine-galano'] },
    { id: 'c-nl-coal', title: 'Coal phase-out and carbon price floor', client: 'Dutch Ministry of Economic Affairs and Climate Policy', year: 2022, country: 'Netherlands', sectors: ['Energy'], expertise: ['Public Policy'], forum: '', question: 'What would a coal phase-out and a carbon price floor do to the power market?', did: 'Power market modelling presented in two studies.', outcome: '[Outcome to confirm]', team: ['jens-perner'] },
    { id: 'c-app', title: 'Evaluating APP fraud reimbursement', client: '[Client to confirm]', year: 2026, country: 'United Kingdom', sectors: ['Financial Services'], expertise: ['Public Policy'], forum: '', question: 'Have the UK’s Authorised Push Payment policies reduced fraud?', did: 'Independent evaluation of the policies.', outcome: 'Found the policies benefit consumer protection and fraud loss.', team: [] },
    { id: 'c-czech', title: 'Alcohol taxation in the Czech Republic', client: '[Client to confirm]', year: 2026, country: 'Czech Republic', sectors: ['Retail and Consumer'], expertise: ['International Trade', 'Public Policy'], forum: '', question: 'Could tax revenues rise while disparities between drinks fall?', did: 'Analysis of tax revenues and the wider Czech economy.', outcome: 'Showed revenues could rise while reducing disparities.', team: [] },
    { id: 'c-nhs', title: 'NHS productivity and technology', client: '[Partners to confirm]', year: 2026, country: 'United Kingdom', sectors: ['Health and Social Care'], expertise: ['Public Policy'], forum: '', question: 'What could technology contribute to NHS productivity?', did: 'Led the economic analysis for a landmark report.', outcome: '£33bn a year in potential savings and 20,000 deaths prevented each year.', team: [] },
    { id: 'c-chile-rail', title: 'Fair and competitive rail access in Chile', client: '[Client to confirm]', year: 2021, country: 'Chile', sectors: ['Transport'], expertise: ['Competition', 'Regulation'], forum: '', question: '[Question to confirm]', did: '[Summary to confirm]', outcome: '[Outcome to confirm]', team: [] },
    { id: 'c-investor-state', title: 'Expert testimony in investor–state disputes', client: '[Client withheld]', year: 2022, country: '[Country]', sectors: ['Energy'], expertise: ['Dispute Support', 'Finance'], forum: '[ICSID tribunal]', question: '[Valuing losses from regulatory change.]', did: '[Expert reports and testimony.]', outcome: '[Outcome to confirm]', team: ['expert-a'] }
  ];

  var OFFICES = [
    { id: 'london', city: 'London', country: 'United Kingdom', address: 'Worship Square, 65 Clifton Street, London EC2A 4JE', phone: '+44 (0)20 7031 7000', email: 'hello@frontier-economics.com', note: 'Head office' },
    { id: 'amsterdam', city: 'Amsterdam', country: 'Netherlands', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: 'Newest office' },
    { id: 'berlin', city: 'Berlin', country: 'Germany', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: 'Opened 2017' },
    { id: 'brussels', city: 'Brussels', country: 'Belgium', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: 'EU institutions' },
    { id: 'cologne', city: 'Cologne', country: 'Germany', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: 'Second-largest office' },
    { id: 'dublin', city: 'Dublin', country: 'Ireland', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: '' },
    { id: 'madrid', city: 'Madrid', country: 'Spain', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: 'Spain and Latin America, since 2008' },
    { id: 'paris', city: 'Paris', country: 'France', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: '' },
    { id: 'prague', city: 'Prague', country: 'Czech Republic', address: '[Address]', phone: '[Phone]', email: 'hello@frontier-economics.com', note: 'Central and Eastern Europe' }
  ];

  /* Events (R53). Upcoming events are SAMPLES; past events are from the live list. */
  var EVENTS = [
    { id: 'e-north-sea', title: '[Sample] North Sea trade-offs: a briefing for policymakers', date: '2026-11-12', time: '08:30–10:00', place: 'London', format: 'In person', topic: 'north-sea', upcoming: true, speakers: ['dan-roberts', 'claire-thornhill'] },
    { id: 'e-competitive-edge', title: '[Sample] Competitive Edge: the competition year ahead', date: '2027-01-21', time: '08:00–09:30', place: 'Brussels', format: 'In person', upcoming: true, speakers: ['goran-serdarevic'] },
    { id: 'e-careers', title: '[Sample] Careers in economic consulting: virtual open evening', date: '2026-11-04', time: '18:00–19:00', place: 'Online', format: 'Virtual', upcoming: true, speakers: [] },
    { id: 'e-berlin-drd', title: 'Berlin Dispute Resolution Days 2026', date: '2026-09-29', place: 'Berlin', format: 'In person', upcoming: false, materials: '[Slides]' },
    { id: 'e-fuels', title: 'Fuels of the Future', date: '2026-01-19', place: 'Berlin', format: 'In person', upcoming: false, materials: '[Slides]' },
    { id: 'e-fide', title: 'Competencia y cruasanes: plataformas digitales y competencia', date: '2025-11-27', place: 'FIDE Spaces', format: 'In person', upcoming: false, materials: '' },
    { id: 'e-mwc', title: 'MWC Doha 2025', date: '2025-11-25', place: 'Doha', format: 'In person', upcoming: false, materials: '' },
    { id: 'e-careers-2025', title: 'Careers in economic consulting with Frontier Economics', date: '2025-11-19', place: 'Online', format: 'Virtual', upcoming: false, materials: '[Recording]' },
    { id: 'e-iic', title: 'IIC UK Chapter Meeting 2025', date: '2025-11-06', place: 'London', format: 'In person', upcoming: false, materials: '' },
    { id: 'e-prague', title: 'Prague Open Evening', date: '2025-11-06', place: 'Prague', format: 'In person', upcoming: false, materials: '' }
  ];

  var EDITIONS = [
    { title: 'Infrastructure in focus', sub: 'The investment challenge: how to fund the infrastructure of the future', date: '2025-06-01' },
    { title: 'The shape of AI in 2025', sub: 'AI in the era of regulation: striking the balance', date: '2025-02-01' },
    { title: '2024: a year in review', sub: 'Tackling complexity, driving innovation', date: '2024-12-01' },
    { title: 'The economics of climate change', sub: 'Targets, innovations – and preparing for uncertainty', date: '2024-10-01' }
  ];

  /* Hot Topics (R40). The seven live collections plus the proposed North Sea hub. */
  var TOPICS = [
    { id: 'north-sea', title: 'North Sea oil and gas', area: 'Energy', updated: '2026-05-20', items: 5, isNew: true, summary: 'More drilling, prices, resilience, jobs, tax and emissions: our independent analysis of the trade-offs.' },
    { id: 'cunliffe', title: 'Cunliffe review', area: 'Water', updated: '2025-09-10', items: 6, summary: 'The economics behind the Independent Water Commission’s 88 recommendations.' },
    { id: 'comet', title: 'COMET: Cross-sector Optimisation Model for the Energy Transition', area: 'Energy', updated: '2025-08-01', items: 3, summary: 'Our energy system model, its applications and where it has been used.', url: 'model.html?id=comet' },
    { id: 'missions', title: 'Mission-led government: the key to evaluating success', area: 'Public Policy', updated: '[Date]', items: 4, summary: 'How to evaluate mission-led government.' },
    { id: 'competitive-edge', title: 'Competitive Edge', area: 'Competition', updated: '[Date]', items: 8, summary: 'Our guide to major competition policy themes in the months ahead.' },
    { id: 'big-questions', title: 'Answering the Big Questions (podcast)', area: 'All', updated: '[Date]', items: 12, summary: 'Frontier’s podcast.' },
    { id: 'innovation', title: 'Innovation strategy', area: 'Strategy', updated: '[Date]', items: 5, summary: 'Helping our clients create future value.' },
    { id: 'green-futures', title: 'Green futures', area: 'Climate Change', updated: '[Date]', items: 6, summary: 'Helping our clients find the path to a more sustainable future.' }
  ];

  /* Models and tools (R43). COMET content from its live page; others from the Energy page. */
  var MODELS = {
    comet: { name: 'COMET', full: 'Cross-sector Optimisation Model for the Energy Transition', area: 'Energy',
      question: 'What is the affordable, resilient route to a decarbonised energy system, across every sector and carrier, to 2050 and beyond?',
      features: ['Integrated sector coupling across all sectors, technologies and fuels', 'Cost-optimal investment and dispatch until 2050', 'Security of supply in periods of low renewable output and peak demand (Dunkelflaute)', 'Up to 100+ regions; hourly balance for representative weeks; 8,760-hour electricity dispatch', 'Unit-based modelling of EU electricity markets', 'Over 30 final demand sectors, with demand-side flexibility', 'Endogenous investment in electricity, methane and hydrogen grids'],
      uses: ['Market design assessment', 'Dispute resolution', 'Investment support', 'Infrastructure evaluation'],
      used: ['c-eurogas'], contact: 'stefan-lorenczik', brochure: 'Introducing COMET (PDF, August 2025)' },
    spirit: { name: 'SPIRIT', full: 'Highly granular unit dispatch model', area: 'Energy', question: '[What the model answers, to be written with the modelling team.]', features: ['[Feature]', '[Feature]'], uses: ['[Use]'], used: [], contact: '', brochure: '' },
    hylo: { name: 'HyLO', full: 'Hydrogen cost modelling', area: 'Energy', question: '[What the model answers, to be written with the modelling team.]', features: ['[Feature]', '[Feature]'], uses: ['[Use]'], used: [], contact: '', brochure: '' },
    gasflow: { name: 'Gas flow modelling', full: 'Gas network flow model', area: 'Energy', question: '[What the model answers.]', features: ['[Feature]'], uses: ['[Use]'], used: [], contact: '', brochure: '' },
    behaviour: { name: 'Customer behaviour modelling', full: 'Customer behaviour model', area: 'Energy', question: '[What the model answers.]', features: ['[Feature]'], uses: ['[Use]'], used: [], contact: '', brochure: '' }
  };

  return { SECTORS: SECTORS, EXPERTISE: EXPERTISE, TYPES: TYPES, PEOPLE: PEOPLE, AREAS: AREAS, INSIGHTS: INSIGHTS,
    PAGES: PAGES, CREDENTIALS: CREDENTIALS, OFFICES: OFFICES, EVENTS: EVENTS, EDITIONS: EDITIONS, TOPICS: TOPICS, MODELS: MODELS };
})();
