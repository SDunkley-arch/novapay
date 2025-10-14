# NovaPay MVP (PWA)

Mobile-first NovaPay MVP built as a Progressive Web App using vanilla HTML, CSS, and JavaScript with hash routing.

## Features

- Mobile-first UI with NovaPay brand tokens
- Hash-based routing with auth gating
- LocalStorage persistence for session, balances, and transactions
- Core flows:
  - Add Money (bank details, quick add)
  - Send Money (3-step: recipient → amount → confirm)
  - Pay Bills (search/select biller → form → confirm, save billers)
  - Withdraw (Bank transfer or Cash Agent with pickup code)
  - Virtual Card (activate, freeze, reveal CVV)
  - Profile (KYC prompt, settings placeholders, logout)
- Toast notifications
- PWA: manifest + service worker for offline caching

## Tech Stack

- HTML/CSS/JS (no frameworks)
- CSS: custom utility classes (Tailwind-like) + brand tokens
- Routing: `src/router.js` (hash-based)
- State: `src/state.js` (with `load()` / `save()` to LocalStorage)

## Project Structure

```
novapay/
  index.html
  manifest.webmanifest
  sw.js
  README.md
  assets/
    logo.svg
  src/
    app.js
    router.js
    state.js
    styles.css
    lib/
      dom.js
    utils/
      format.js
    pages/
      landing.js
      login.js
      register.js
      dashboard.js
      add-money.js
      transfer.js
      bills.js
      withdraw.js
      card.js
      profile.js
```

## Running Locally

- Option 1: Just open `index.html` in your browser.
- Option 2: Use any static server (recommended for Service Worker testing):
  - VS Code Live Server
  - Python: `python -m http.server 8080`
  - Node: `npx serve`

Then visit `http://localhost:<port>/`.

## Tailwind CSS (Production Build)

We use a production Tailwind build (no CDN in `index.html`). To generate the compiled CSS:

1) Install dependencies (Node 18+ recommended):

```
npm install
```

2) Development (watch mode):

```
npm run dev:css
```

3) Production (minified):

```
npm run build:css
```

The output is written to `dist/tailwind.css` and already linked in `index.html`.

Note: If your editor flags `@tailwind` or `@apply` in `src/tailwind.css`, those are processed by Tailwind/PostCSS. The compiled file in `dist/` is standard CSS.

## PWA Installation

- On Android/Chrome, open the app and "Add to Home screen." The service worker precaches the core assets so it works offline for cached pages.

## Notes

- Design spacing and copy align with the provided Figma reference where practical.
- All interactive elements have `data-testid` attributes for easy JS hooks and testing.
- Default routing:
  - If not logged in → `#/landing`
  - If logged in → `#/dashboard`

## License

MIT
