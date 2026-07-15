# Publisher mark buttons

This guide explains how to add and customize the small publisher buttons used next to publications in [`../index.html`](../index.html).

## Quick start

Copy this block into the `<span class="resource-actions">` for a publication:

```html
<a
    class="button is-small resource-button publisher-button"
    href="YOUR-PUBLICATION-URL"
    aria-label="Open the PUBLISHER publication for FULL PAPER TITLE"
>
    <span class="publisher-mark" aria-hidden="true">PUBLISHER</span>
    <span>Publication</span>
</a>
```

Replace:

- `YOUR-PUBLICATION-URL` with the publisher page or DOI URL.
- `PUBLISHER` with a short mark such as `ACM`, `IEEE`, `Springer`, or `USENIX`.
- `FULL PAPER TITLE` with the full title of the paper.
- `Publication` with a more precise label when useful, such as `Journal`, `Proceedings`, or `Chapter`.

For example, a future Springer conference paper could use:

```html
<span class="resource-actions">
    <a
        class="button is-small resource-button publisher-button"
        href="YOUR-SPRINGER-PUBLICATION-URL"
        aria-label="Open the Springer publication for Example Paper Title"
    >
        <span class="publisher-mark" aria-hidden="true">Springer</span>
        <span>Publication</span>
    </a>
</span>
```

## What each class does

- `resource-actions` groups multiple buttons and lets them wrap cleanly on small screens.
- `button is-small` supplies the base Bulma button and compact size.
- `resource-button` applies the website's light/dark theme colors.
- `publisher-button` controls the spacing between the mark and its label.
- `publisher-mark` draws the small outlined publisher badge.

The styles are in [`css/site.css`](css/site.css), under `.resource-actions`, `.resource-button`, `.publisher-button`, and `.publisher-mark`.

## Change every publisher mark

Edit the existing `.publisher-mark` rule in `css/site.css` to change all publisher badges. For example:

```css
.publisher-mark {
    padding-inline: 0.4em;  /* Horizontal space inside the mark */
    border-width: 2px;      /* Outline thickness */
    border-radius: 0.25rem; /* Corner roundness */
    font-size: 0.72em;      /* Mark text size */
    font-weight: 800;       /* Mark text weight */
    letter-spacing: 0.03em;
}
```

Keeping the mark short prevents publication titles from becoming cramped on phones.

## Give one publisher a custom style

Add a publisher-specific class to the button:

```html
<a
    class="button is-small resource-button publisher-button publisher-example"
    href="YOUR-PUBLICATION-URL"
    aria-label="Open the Example Publisher publication for Example Paper Title"
>
    <span class="publisher-mark" aria-hidden="true">EXAMPLE</span>
    <span>Publication</span>
</a>
```

Then add the corresponding rule to `css/site.css`:

```css
.publisher-example .publisher-mark {
    color: #6b46c1;
    border-color: currentColor;
}

@media (prefers-color-scheme: dark) {
    .publisher-example .publisher-mark {
        color: #c4b5fd;
    }
}
```

Use a lighter version of the accent in dark mode so the mark remains readable. The rest of the button will continue to use the site's shared light and dark theme colors.

## Add several links to one paper

Place all related buttons inside the same `resource-actions` group. They will stay together when space permits and wrap automatically on narrow screens:

```html
<span class="resource-actions">
    <a
        class="button is-small resource-button"
        href="YOUR-EPRINT-URL"
        aria-label="Read the ePrint manuscript for Example Paper Title"
    >
        <span class="icon is-small">
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
        </span>
        <span>ePrint</span>
    </a>

    <a
        class="button is-small resource-button publisher-button"
        href="YOUR-PUBLISHER-URL"
        aria-label="Open the ACM publication for Example Paper Title"
    >
        <span class="publisher-mark" aria-hidden="true">ACM</span>
        <span>Publication</span>
    </a>

    <a
        class="button is-small resource-button"
        href="YOUR-GITHUB-URL"
        aria-label="Open the GitHub implementation for Example Paper Title"
    >
        <span class="icon is-small">
            <i class="fa fa-github" aria-hidden="true"></i>
        </span>
        <span>Code</span>
    </a>
</span>
```

## Accessibility checklist

- Keep a visible text label such as `Publication`, `Journal`, or `Code`; do not rely on the mark alone.
- Write an `aria-label` that names both the destination and the paper.
- Keep decorative marks and icons set to `aria-hidden="true"`.
- Link to the paper's canonical publisher page or DOI when possible.
- Check that any custom accent is readable in both light and dark mode.

## Existing examples

The current publication list in `index.html` contains working examples for Springer, ACM, and IEEE publisher marks, as well as ePrint, slide, and video buttons.
