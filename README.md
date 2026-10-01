# Frontier Economics website roadmap — prototypes

Clickable prototypes of five improvements to frontier-economics.com, prepared by ClerksWell.

- **Phase:** 2, greyscale prototypes (version 1, 1 October 2026)
- **Live:** https://hrhlescargotleo.github.io/Frontier-Economics-Roadmap/
- **Scope boundary:** nothing here redesigns the FE Facelift components (homepage banner, featured items, accordion, image and text, people profile, people directory). The prototypes link to them instead.

## The five prototypes

1. **Talk to the right person** — `pages/contact.html`, `pages/expertise.html?id=energy|competition`
2. **Find any piece of Frontier thinking** — `pages/insights.html`, `pages/search.html`, `pages/article.html`
3. **Proof, not prose** — `pages/credentials.html`, `pages/case-study.html`
4. **A home for each big question** — `pages/topics.html`, `pages/topic.html?id=north-sea`, `pages/report.html`, `pages/model.html?id=comet`
5. **Stay close to Frontier** — `pages/subscribe.html`, `pages/events.html`

Requirements (R-numbers mapped to the phase 1 idea numbers) are in `requirements/requirements.md`. New components are shown once in `modules/library.html`.

## Building

```
node build-includes.js && node validate.js
```

`src/` is the source; the build writes `docs/` (with an empty `.nojekyll`) and resolves `<!-- @@include -->` and `~/` paths. `validate.js` checks tag balance, inline handlers and internal links.

## Publishing on GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch**, Branch: **main**, folder **/docs**. The site appears at the live address above a minute or so after each push.

## Design layer

All structure lives in `css/base.css` and `css/components.css`. `css/theme.css` is deliberately empty: phase 3 applies Frontier's look (from the phase 1 design system and `frontier-tokens.css`) in that file only, so deleting it returns the greyscale version.

## Data

`js/data.js` holds the sample data. Titles, people, roles and recent dates come from frontier-economics.com as seen on 1 October 2026. Older dates, all credentials, upcoming events, office details outside London and anything in [brackets] are samples.
