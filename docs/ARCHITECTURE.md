# Architecture Overview

## Project Summary

**statthus** is a Hugo-based static website using the LogBook theme from GetHugoThemes. It's a multilingual personal blog template with e-commerce capabilities.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Static Site Generator | Hugo (Extended) | ≥ 0.145.0 |
| Go Modules | Go | 1.20 |
| CSS Framework | Bootstrap SCSS | v5.x |
| CSS Processing | PostCSS | ^8.5.6 |
| CSS Optimization | PurgeCSS | ^4.1.3 |
| CSS Prefixing | Autoprefixer | ^10.4.22 |

## Directory Structure

```
statthus/
├── archetypes/           # Content templates for hugo new
├── assets/               # Source assets (images, SCSS)
│   ├── images/           # Site images (logo, gallery, posts)
│   └── scss/             # Custom SCSS overrides
├── config/               # Hugo configuration (split config)
│   └── _default/
│       ├── hugo.toml     # Main Hugo configuration
│       ├── languages.toml # Language settings (EN/FR)
│       ├── menus.en.toml # English navigation menus
│       ├── menus.fr.toml # French navigation menus
│       ├── module.toml   # Hugo modules & version constraints
│       └── params.toml   # Site parameters & customization
├── content/              # Content
│   └── german/           # German content
│       ├── post/         # Blog posts
│       ├── shop/         # E-commerce products
│       ├── homepage/     # Homepage layout variants
│       └── author/       # Author profiles
├── data/                 # Data files (JSON/YAML/TOML)
├── i18n/                 # Translation strings
├── layouts/              # Template overrides (mostly empty)
├── static/               # Static files (copied as-is)
├── themes/
│   └── logbook-hugo/     # Theme (local installation)
├── go.mod                # Go module dependencies
├── go.sum                # Go module checksums
└── package.json          # Node.js dependencies (PostCSS)
```

## Hugo Modules

The project uses Hugo Modules for modular functionality. All modules are imported from `github.com/gethugothemes/hugo-modules`:

### Core Modules
- **Bootstrap SCSS** (`hugo-mod-bootstrap-scss/v5`) - CSS framework
- **Search** - Client-side search functionality
- **Images** - Image processing utilities
- **PWA** - Progressive Web App support

### UI Components
- **Accordion** - Expandable content sections
- **Tab** - Tabbed interfaces
- **Gallery Slider** - Image galleries
- **Preloader** - Page loading animation

### Integrations
- **Cookie Consent** - GDPR compliance
- **Crisp Chat** - Live chat widget
- **Valine Comment** - Comment system (alternative to Disqus)
- **Social Share** - Social media sharing

### SEO & Analytics
- **Basic SEO** - Meta tags and Open Graph
- **Google Tag Manager** - Tag management
- **Google AdSense** - Advertising
- **Matomo/Baidu/Plausible/Counter Analytics** - Analytics options
- **Site Verifications** - Search engine verification

### Shortcodes
- **Button**, **Notice**, **Video**, **Gallery**
- **YouTube Lite**, **Vimeo Lite** - Lazy-loading video embeds
- **CodePen** - Code embed
- **Table of Contents** - Auto-generated TOC

## Language Configuration

| Language | Code | Content Directory |
|----------|------|-------------------|
| German | de-de | `content/german/` |

> Note: English and French were removed. To add additional languages, create entries in [`languages.toml`](../config/_default/languages.toml).

## Features

### Content Types
- **Blog Posts** (`/post/`) - Main content section
- **Shop Products** (`/shop/`) - E-commerce with Snipcart integration
- **Authors** (`/author/`) - Author profile pages
- **Homepage Variants** - Full, Grid, List layouts with optional sidebars

### E-Commerce
- **Snipcart** integration for shopping cart functionality
- Product pages with pricing and cart buttons

### Sidebar Widgets
Available widgets (configurable in [`params.toml`](../config/_default/params.toml:157)):
- Search, About Me, Categories, Tags
- Recent Posts, Social Links, Promotion, Subscription (Mailchimp)

## Build Process

### Development
```bash
hugo server -D
```

### Production Build
```bash
hugo --minify
```

### PostCSS Pipeline
PostCSS processes CSS with:
1. **PurgeCSS** - Removes unused CSS (enabled via [`purge_css = true`](../config/_default/params.toml:20))
2. **Autoprefixer** - Adds vendor prefixes

## Configuration Files

| File | Purpose |
|------|---------|
| [`config/_default/hugo.toml`](../config/_default/hugo.toml) | Core Hugo settings, outputs, caching |
| [`config/_default/params.toml`](../config/_default/params.toml) | Site customization, integrations |
| [`config/_default/module.toml`](../config/_default/module.toml) | Hugo modules, version requirements |
| [`config/_default/languages.toml`](../config/_default/languages.toml) | Language configuration |
| [`package.json`](../package.json) | Node.js dependencies |
| [`go.mod`](../go.mod) | Go module dependencies |

## Version Requirements

> ⚠️ **Important**: This project requires Hugo **Extended** version **0.145.0** or higher.

The extended version is required for:
- SCSS/SASS compilation
- PostCSS processing
- Image processing (WebP conversion)

## Output Formats

Configured outputs for homepage (defined in [`hugo.toml`](../config/_default/hugo.toml:56)):
- HTML - Main website
- RSS - Feed subscription
- JSON - Search index
- WebAppManifest - PWA manifest
- SearchIndex - Client-side search data
