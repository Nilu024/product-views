# 🛍 Product Explorer

A production-quality React application that lets users browse, search, filter, and sort products fetched from the [DummyJSON](https://dummyjson.com) API.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Run](#setup--run)
- [Architecture Notes](#architecture-notes)
- [Assumptions](#assumptions)
- [Additional Features Implemented](#additional-features-implemented)

---

## Features

| # | Feature | Details |
|---|---------|---------|
| 1 | **Product Listing** | Card-based grid showing image, name, category, price, star rating |
| 2 | **Search** | Case-insensitive, debounced 500 ms, no API call per keystroke |
| 3 | **Category Filter** | Dynamic pills generated from API response |
| 4 | **Sorting** | Price ↑, Price ↓, Rating ↓ |
| 5 | **Pagination** | 10 per page, Prev/Next + numbered pages with ellipsis |
| 6 | **Loading State** | Skeleton shimmer grid (no layout shift) |
| 7 | **Error Handling** | Friendly message + retry button |
| 8 | **Empty State** | Contextual "No Products Found" message |
| ★ | **Favourites** | ♥ toggle per card, persisted in `localStorage` |
| ★ | **Dark Mode** | System-preference-aware toggle, persisted in `localStorage` |
| ★ | **Responsive Design** | Mobile (360 px) · Tablet (768 px) · Desktop (1280 px) |
| ★ | **Reduced Motion** | Respects `prefers-reduced-motion` |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 (functional components + hooks) |
| Styling | Plain CSS with CSS custom properties (no runtime CSS-in-JS overhead) |
| HTTP | Native `fetch` API |
| State | `useState`, `useEffect`, `useMemo`, `useCallback` |
| Memoisation | `React.memo`, `useMemo`, `useCallback` |
| Persistence | `localStorage` (favourites + theme) |
| Fonts | Google Fonts — Inter |
| Data | [DummyJSON Products API](https://dummyjson.com/products) |

No external UI component libraries, no Redux, no extra dependencies beyond `react-scripts`.

---

## Project Structure

```
src/
├── components/
│   ├── CategoryFilter/   CategoryFilter.jsx + .css
│   ├── DarkModeToggle/   DarkModeToggle.jsx + .css
│   ├── EmptyState/       EmptyState.jsx + .css
│   ├── ErrorMessage/     ErrorMessage.jsx + .css
│   ├── Loader/           Loader.jsx + .css      (skeleton shimmer)
│   ├── Pagination/       Pagination.jsx + .css
│   ├── ProductCard/      ProductCard.jsx + .css
│   ├── SearchBar/        SearchBar.jsx + .css
│   └── SortDropdown/     SortDropdown.jsx + .css
├── hooks/
│   ├── useDebounce.js    Generic 500 ms debounce
│   ├── useFavorites.js   localStorage-backed favourites Set
│   ├── useDarkMode.js    System-preference + localStorage theme
│   └── useProducts.js    Master hook: fetch · filter · sort · paginate
├── pages/
│   └── ProductExplorer/  ProductExplorer.jsx + .css
├── services/
│   └── productService.js Fetch layer (all API calls isolated here)
├── utils/
│   └── helpers.js        formatPrice · toTitleCase · getPaginationRange
├── styles/
│   └── globals.css       Design tokens (light + dark), reset, typography
├── App.jsx
└── index.js
```

---

## Setup & Run

### Prerequisites

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x (or yarn)

### Steps

```bash
# 1. Clone / unzip the project
cd product-explorer

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens automatically at **http://localhost:3000**.

### Production build

```bash
npm run build
# Outputs to /build — ready to deploy to any static host (Netlify, Vercel, S3…)
```

### Environment variables

No `.env` file is needed. The API base URL (`https://dummyjson.com`) is hardcoded in `src/services/productService.js`. If you ever need to point to a different backend, change `BASE_URL` there.

---

## Architecture Notes

### Data flow

```
productService.fetchAllProducts()
        ↓
useProducts (master hook)
  • allProducts state
  • client-side filter (category + debounced search)
  • client-side sort
  • client-side pagination
        ↓
ProductExplorer page
  • passes slices of state + stable callbacks to each component
  • React.memo on every leaf component prevents unnecessary re-renders
```

All 200 products are fetched **once** on mount. Subsequent filtering, sorting, and pagination happen entirely in memory — O(n) with `useMemo` — so there are zero extra network round-trips.

### Performance choices

| Pattern | Where used |
|---------|-----------|
| `React.memo` | Every component (ProductCard, SearchBar, …) |
| `useMemo` | `categories` list, `processedProducts`, `paginatedProducts` |
| `useCallback` | All event handlers passed as props |
| Debounced search | `useDebounce(query, 500)` prevents filtering on every keystroke |
| `loading="lazy"` | `<img>` tags inside ProductCard |
| Skeleton shimmer | Prevents Cumulative Layout Shift during fetch |

---

## Assumptions

1. Fetching all products at once (200 items) is acceptable; the DummyJSON dataset is small (~194 items) and the payload is lightweight (~150 KB).
2. Category values from the API are used verbatim; title-casing is applied only for display.
3. "Search by name" means `product.title` only (not description, brand, etc.).
4. Rating stars are computed on the client from the numeric rating field (full + half + empty).
5. The `stock` field is used to surface low-stock / out-of-stock badges as a UI enhancement.

---

## Additional Features Implemented

- ♥ **Favourites** — heart button on every card, backed by `localStorage`, survives page refresh
- 🌙 **Dark Mode** — respects `prefers-color-scheme`, toggled via header button, stored in `localStorage`
- 📱 **Responsive Design** — single-column on very small screens → 2 columns on mobile → auto-fill grid on desktop
- ♿ **Accessibility** — semantic HTML, `aria-label`, `aria-pressed`, `aria-current`, `role="status"`, `aria-live`, visible focus rings
- ⚡ **Reduced Motion** — `@media (prefers-reduced-motion: reduce)` disables all animations

---

## Screenshots

> Run `npm start` and open the browser to see the live application.

---

*Built with React 18 · No third-party UI libraries · Zero runtime CSS-in-JS*
# product-views
