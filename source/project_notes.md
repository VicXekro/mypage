# Project notes and handoff guide

Last updated: 2026-07-15

## Purpose

This repository contains Victor Youdom Kemmoe's static academic homepage. The site presents a profile, research summary, selected publications, and talks. It is intentionally simple: there is no package manager, framework runtime, database, or build step.

For a future Codex session, begin with:

> Read `source/project_notes.md`, inspect `git status` and the recent Git history, then inspect the active HTML, CSS, and JavaScript files before making changes. Preserve the existing wood-themed visual identity and responsive behavior.

## Current Git state

- Active branch: `master`.
- Remote tracking branch: `origin/master`.
- GitHub remote: `https://github.com/VicXekro/mypage.git`.
- Current handoff commit: `81c9e10` (`refreshed look, plus dark theme`).
- The working tree was clean when this document was created.
- Use `git push` or `git push origin master`; the local branch is not named `main`.

Always run `git status --short --branch` at the beginning of a new session because this section can become outdated.

## Active site structure

### Entry point

- [`../index.html`](../index.html) is the only active page and contains all visible site content.
- It contains the fixed navigation bar, profile panel, About section, publication list, talks, and footer.
- The page loads all dependencies locally, so it does not require a CDN at runtime.

### Styles

- [`css/site.css`](css/site.css) contains all site-specific styling, theme variables, responsive rules, publication-button styling, and accessibility helpers.
- [`bulma-1.0.4/css/bulma.min.css`](bulma-1.0.4/css/bulma.min.css) is the active Bulma stylesheet.
- [`font-awesome-4.7.0/css/font-awesome.min.css`](font-awesome-4.7.0/css/font-awesome.min.css) supplies the existing interface and resource icons.
- `bulma-0.9.3/` remains in the repository for historical safety but is no longer referenced by `index.html`.

### JavaScript

- [`js/site.js`](js/site.js) controls the light/dark theme button and mobile navbar.
- The theme preference is stored in `localStorage` under the key `victor-youdom-theme`.
- With no saved preference, the page follows `prefers-color-scheme` from the visitor's browser or operating system.
- Clicking the theme button creates a persistent light or dark override.
- The navbar script updates `aria-expanded`, closes the mobile menu after navigation, and supports the Escape key.

### Images and documents

- `image/retina_wood.png` is the repeating light-theme background.
- `image/charcoal_wood.png` is the repeating dark-theme background generated specifically for this site.
- `image/Victor045.jpg` is the profile portrait.
- `slides/lat_acc_long.pdf` and `slides/rsa_acc_long.pdf` are linked slide decks.
- `CV/` and several project images exist but are not currently part of the main page.
- [`image/image source.txt`](image/image%20source.txt) records available image-source information.

### Documentation

- [`PUBLISHER_MARKS.md`](PUBLISHER_MARKS.md) explains how to create and customize publisher, ePrint, video, slide, and implementation buttons.
- `old Website/` at the repository root is legacy content and is not part of the active page. Do not remove it without explicit approval.

## Design decisions

### Overall direction

- Preserve the original warm, wood-backed academic-homepage appearance.
- The design should feel familiar and understated rather than like a full visual redesign.
- The main content remains a two-panel composition on desktop and stacks on smaller screens.
- The page uses local assets and should remain functional as a plain static website.

### Light theme

- Uses `image/retina_wood.png` as the repeating background.
- Profile panel color: `rgba(255, 228, 196, 0.55)`.
- Content panel color: `rgba(255, 250, 240, 0.55)`.
- The current light theme is intended to preserve the look of the original site.

### Dark theme

- Uses `image/charcoal_wood.png`, a graphite/ebony wood texture.
- Profile panel color: `rgba(23, 23, 25, 0.75)`.
- Content panel color: `rgba(31, 31, 34, 0.75)`.
- Links and resource buttons use warm amber accents for contrast against the charcoal palette.

Theme variables are repeated in four places in `site.css`:

1. Default `:root` light values.
2. Automatic `@media (prefers-color-scheme: dark)` values.
3. Forced `[data-theme="light"]` values.
4. Forced `[data-theme="dark"]` values.

When changing a theme value, update both its automatic and forced-theme definitions.

### Navigation and theme control

- The navbar is fixed to the top and stays dark in both themes.
- The theme toggle is on the top-left.
- A sun represents the active light theme; a moon represents the active dark theme.
- The button's accessible label describes the theme it will switch to.
- On touch-sized screens, the hamburger stays on the top-right and reveals Home, Publications, and Talks.

### Main panels

- The desktop profile panel uses `is-one-third-desktop`; the content panel fills the remaining space.
- The columns use Bulma's `is-desktop` behavior, so they stack below the desktop breakpoint.
- The columns also use `is-gapless`. Bulma applies `padding: 0 !important` directly to gapless columns.
- Because of that Bulma rule, do not add spacing by overriding padding on `.profile-panel`; doing so previously caused responsive regressions.
- The 2rem gap above the portrait is intentionally applied to `.profile-panel > .content` instead.

### Profile area

- The portrait has a maximum width of `256px` and remains circular.
- The portrait is centered and has `1.5rem` of spacing below it.
- The profile panel's inner content supplies `2rem` of top spacing at every screen size.
- Contact, GitHub, Twitter, and Google Scholar links use compact icon buttons.

### Publications, talks, and resource buttons

- Paper and talk content remains in semantic lists.
- Resource links use labeled buttons rather than bracketed text links.
- ePrint uses a PDF/manuscript icon.
- Slides use a presentation-file icon.
- Videos use a play icon.
- GitHub implementations use the GitHub icon.
- Publisher destinations use a compact text mark such as ACM, IEEE, or Springer plus a visible destination label.
- Keep `aria-label` text descriptive and keep decorative icons marked `aria-hidden="true"`.
- Follow [`PUBLISHER_MARKS.md`](PUBLISHER_MARKS.md) for copy-ready examples.

### Footer

- “Powered by Bulma” is centered with flexbox.
- The footer is transparent and intentionally has no light or white panel behind it.

## Responsive behavior

- Primary target: iPhone 12 Mini-sized viewports and larger.
- At `1023px` and below, the navbar switches to its touch layout and the profile/content columns stack.
- At `480px` and below, outer and section spacing is reduced and resource-action groups become full-width flex rows that wrap.
- Long titles and list items use `overflow-wrap: anywhere` as a last-resort safeguard.
- The page, navbar, shell, and main columns are constrained to the viewport width.
- Horizontal overflow is clipped after the content has been given normal wrapping opportunities.
- Avoid fixed pixel widths for content containers or resource groups.
- Keep resource buttons short enough to fit individually on narrow screens.

## Accessibility decisions

- The page has a skip link to `#main-content`.
- The portrait has descriptive alternative text.
- Icon-only profile and theme buttons have accessible labels.
- Decorative icons are hidden from assistive technology.
- The navbar burger reports its expanded state.
- Focus styles come from Bulma and site-specific hover/focus rules.
- Reduced-motion preferences disable unnecessary transitions.

## Local preview and verification

Because this is a static site, a simple local server is sufficient:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

Before handing off changes:

1. Run `git diff --check`.
2. Confirm every local path referenced by `index.html` exists.
3. Check the theme toggle in automatic, forced light, and forced dark states.
4. Check the navbar hamburger and navigation links.
5. Check widths around 375px, 390px, 768px, 1024px, and a normal desktop size.
6. Confirm there is no horizontal page scrolling.
7. Confirm the portrait remains 256px maximum and retains its 2rem top gap.
8. Confirm the footer remains centered and transparent.

## Remaining work and cautions

There are no currently requested content or design features left unfinished. The following are recommended follow-up checks or optional maintenance:

1. Perform a fresh visual regression check at the viewport widths listed above. Responsive CSS was adjusted several times, so mobile behavior should be rechecked before the next release.
2. Verify the theme and hamburger controls on a physical iPhone or Safari responsive mode when practical.
3. Recheck publication, talk, profile, and publisher URLs when updating academic content.
4. Consider upgrading or replacing Font Awesome 4.7 in a separate, deliberate change; do not mix that migration with content edits.
5. Consider removing the unused `bulma-0.9.3/` and `old Website/` directories only after explicit approval and after confirming they are not needed for history.
6. Keep the site dependency-free unless a new requirement genuinely needs a build system.

The most important caution is to avoid fighting Bulma's `is-gapless` column padding with high-specificity `!important` overrides. Put internal spacing on child elements such as `.profile-panel > .content` instead.

## Suggested next-session checklist

```text
1. Read source/project_notes.md.
2. Run git status --short --branch and git log --oneline -5.
3. Read index.html, source/css/site.css, and source/js/site.js.
4. Preserve the light/dark wood themes and the static-site architecture.
5. Make only the requested change.
6. Recheck mobile wrapping and the theme/navbar controls.
7. Update this document if architecture or design decisions change materially.
```
