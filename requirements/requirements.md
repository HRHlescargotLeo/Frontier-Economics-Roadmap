# Frontier Economics website roadmap — prototype requirements

Version 1 (greyscale) · 1 October 2026 · ClerksWell

Source: phase 1 opportunities review (idea numbers in brackets refer to that list). Out of scope throughout: anything the FE Facelift project covers — homepage banner, featured items, accordion, image-and-text tiles, people profile, people directory, palette, Steelfish licence, icon set. Where a prototype needs one of those, it links to it and does not redesign it.

## Global
- **R01** A prototype navigator replaces Frontier's header (pack name, Overview, prototypes 1–5, Notes switch); a previous/next pager replaces the footer.
- **R02** Notes switch, off by default and remembered for the session. On shows a "What we're proposing / Why" panel and numbered annotations (yellow behaviour, red open questions).
- **R03** Context passes between pages with `?param=` links, with a sessionStorage fallback for hosts that strip query strings.
- **R04** Works at 390px and 1440px with no sideways scroll; every control is keyboard-operable and Escape closes overlays.
- **R05** One taxonomy (13 sectors, 11 expertise areas, content types) drives every filter, tag and form in the pack. (34)

## Prototype 1 — Talk to the right person
- **R10** Contact us opens with "What can we help with?": new work, media, careers, an existing project, something else. (2)
- **R11** New-work enquiry form: name, organisation, email, phone (optional), area, country, message; inline validation and an error summary; confirmation naming who will reply and when. (1)
- **R12** The form pre-fills from context: `?area=` from a sector or expertise page, `?case=` from a case study. (3, 4)
- **R13** Media, careers and existing-project routes show the right contact instead of the form. (2)
- **R14** Office directory with address, one phone format, email and lead contacts, filterable by country. (5, 6)
- **R15** Sector and expertise pages carry "Talk to our team": named leads linking to their (Facelift) profiles, plus "See everyone working in [area]". (3)
- **R16** Expertise pages carry a recognition strip. (11)
- **R17** Enquiry submissions are tracked by page and area (annotation). (7)

## Prototype 2 — Find any piece of Frontier thinking
- **R20** One insights library across articles, news, case studies, reports, consultation responses, Frontier Focus and events. (16)
- **R21** Keyword search plus type, sector, expertise and year filters with counts, active-filter chips and Clear all. (16)
- **R22** Filter state lives in the URL; "Copy link to these results". (16)
- **R23** Sort by newest or relevance; 12 results then "Show more". (16)
- **R24** On mobile, filters open in a drawer.
- **R25** Site search groups results by type with counts, dates every result, offers suggested pages for key terms and sorts by relevance or date. (17)
- **R26** Article page shows date, reading time and type under the title, a key findings box, report downloads, author, and share with LinkedIn first and Copy link. (18, 19, 22)
- **R27** Article and report pages carry Article/Report structured data (annotation). (20)

## Prototype 3 — Proof, not prose
- **R30** Credentials library: short dated engagement summaries, keyword search, filters by sector, expertise, country and year. (8)
- **R31** Each credential opens a detail view: question, what we did, outcome, team, related. (8)
- **R32** A "Testifying experts" view lists experts who have given evidence and the forums. (13)
- **R33** Case study template: one H1, at-a-glance panel, the question, what we did, outcome with a headline figure, team, related work. (9, 41)
- **R34** Case studies end with the case lead and "Discuss a similar issue", which opens Contact us pre-filled. (4)
- **R35** "Commissioned by" shown wherever the client is public. (14)
- **R36** Recognition (rankings, forums) reused from R16. (11)

## Prototype 4 — A home for each big question
- **R40** Hot Topics is reachable from the menu and lists dated hubs. (23)
- **R41** North Sea topic hub: Frontier's view in brief, every output in date order (filterable by type), experts, events, Follow. (23)
- **R42** Report landing page: headline numbers, key findings, one chart, downloads for both parts, authors, how it was funded, related. (24)
- **R43** Models and tools: an index of Frontier's models and a model page built on the COMET page. (25)
- **R44** Consultation responses appear as a content type in the library. (26)

## Prototype 5 — Stay close to Frontier
- **R50** Frontier Focus sign-up: email, name, organisation, topics, frequency, consent; validation; double opt-in confirmation. (29)
- **R51** Follow a topic, sector or expert; a preferences view lists what you follow. (30)
- **R52** Dated archive of Frontier Focus editions. (31)
- **R53** Events: upcoming first with registration and add to calendar; past events with slides or recordings; an empty state that offers invitations. (32)
- **R54** A compact sign-up module reused at the end of articles and topic hubs. (29)
