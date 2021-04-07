<div align="center">

<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/259/first-quarter-moon_1f313.png" title="drkmd.js" alt="logo" width="128">

# drkmd.js

[![Build](https://github.com/BetaHuhn/drkmd.js/workflows/Build/badge.svg)](https://github.com/BetaHuhn/drkmd.js/actions?query=workflow%3ABuild) [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/drkmd.js/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/drkmd-js)](https://www.npmjs.com/package/drkmd-js) [![npm bundle size](https://img.badgesize.io/betahuhn/drkmd.js/master/dist/drkmd-js.min.js?compression=gzip)](https://github.com/BetaHuhn/drkmd.js)

Simple dark-mode/light-mode logic for any website

[![NPM](https://nodei.co/npm/drkmd-js.png?compact=true)](https://nodei.co/npm/drkmd-js/)

[🔮 Live Demo](https://codepen.io/BetaHuhn/pen/oNxdBzK)
<br/>

</div>

## ⚡ Features

- Easy to integrate with any site (via [script tag](#script-tag) or [NPM](#npm))
- Specify different styles for the dark and light mode with [CSS classes](#styling)
- Automatically detects system theme (and theme changes)
- Trigger a them change with the [default theme toggle](#default-theme-toggle), a [custom element](#custom-buttons) or even [programmatically](#programmatic)
- Stores users choice in local storage or [optionally](#%EF%B8%8F-options) as a cookie
- Emits a `theme-change` [event](#events) for advanced use cases like [changing images](#different-images-depending-on-the-theme)

## 👋 Introduction

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) (short for darkmode.js) lets you add a dark-mode/light-mode toggle to any website. The library detects the system theme automatically and even saves the users choice in local storage or as a cookie.

The library will add the class `theme-dark`/`theme-light` to the body of the page and set the attribute `data-theme` to `dark`/`light` on the html tag which can be used to specify different css styles depending on the theme. You can also listen to a `theme-change` event for more advanced use cases. See [usage](https://github.com/BetaHuhn/drkmd.js#usage) below how you can customize your page with this.

## 🚀 Get started

### Script tag

Add this to your HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/drkmd-js/dist/drkmd-js.min.js" data-drkmd-attach></script>
```

### NPM

Install [drkmd.js](https://github.com/BetaHuhn/drkmd.js) using NPM

```sh
npm install drkmd-js
```

Then add the following JavaScript code:

```javascript
import Darkmode from 'drkmd-js';

new Darkmode().attach();
```

Both methods will add the [darkmode toggle](#default-theme-toggle) with all the default [options](#%EF%B8%8F-options) to your page.

The last step is to specify the [styling](#styling) for each theme and then you're done 🎉

Enjoy the dark side 🖤

## 📚 Usage

### Styling

There are multiple ways to specify the different styles for the dark and light mode when using [drkmd.js](https://github.com/BetaHuhn/drkmd.js).

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) adds the class `theme-dark`/`theme-light` to the body element of your page, which can be used to specify different styles for each theme:

```css
/* Styles for light theme */
.theme-light {
    background: #fff;
}

/* Styles for dark theme */
.theme-dark {
    background: #000;
}
```

In most cases it is easier to specify [css-variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for different themes (See [below](#css-variables) for an example).

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) also adds the attribute `data-theme` with either `light` or `dark` as the value to the html tag. With this the different themes can also be specified with the css selector `[data-theme="dark"]` and `[data-theme="dark"]`.

### Default theme toggle

The easiest way to change the theme is to use the included theme toggle by either adding the `data-drkmd-attach` attribute to the script tag (or any other element):

```html
<script src="https://cdn.jsdelivr.net/npm/drkmd-js/dist/drkmd-js.min.js" data-drkmd-attach></script>
```

or by calling `.attach()`:

```javascript
new Darkmode().attach()
```

If you use any of the [options](#%EF%B8%8F-options) you can also set `attach: true` to achieve the same as the two methods above. 

By default the button will be added to the bottom right corner of the page and the users choice will be saved in local storage. This can be configured using the [options](#%EF%B8%8F-options).

### Custom buttons

You can add the attribute `data-drkmd-toggle` to any element to transform it into a theme toggle: 

```html
<span data-drkmd-toggle>Toggle theme</span>
```

When the element is clicked the current theme will be changed. 

You can also use `data-drkmd-to-light` and `data-drkmd-to-dark` to switch to a specific theme.

### Programmatic

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) can also be used programmatically for more advanced use cases.

To enable/disable Darkmode you can use the method `toggle()`:

```javascript
const darkmode = new Darkmode();
darkmode.toggle();
```

There are also other methods available:

```js
darkmode.attach() // Attach the default darkmode button to the page
darkmode.toggle() // Toggle the theme
darkmode.toLight() // Change theme to light
darkmode.toDark() // Change theme to dark
darkmode.currentTheme() // Returns the current theme as a string (dark/light)
darkmode.isDark() // Returns true if the current theme is dark
darkmode.isLight() // Returns true if the current theme is light
```

### Events

By default [drkmd.js](https://github.com/BetaHuhn/drkmd.js) emits a `theme-change` event everytime the theme changes:

```js
import Darkmode from 'drkmd-js';

new Darkmode();

window.addEventListener('theme-change', e => {
    console.log(e.detail.to); // will return 'light' or 'dark'
});
```

This can be turned off by setting the option `events: false`.

The `theme-change` event could be used to change the `src` attribute of an `<img>` tag depending on the theme ([more info](https://github.com/BetaHuhn/drkmd.js/discussions/11#discussioncomment-247341)) or modify the page in any other way with JavaScript when the theme changes.

## ⚙️ Options

You can customize the behaviour of [drkmd.js](https://github.com/BetaHuhn/drkmd.js) and the style of the included toggle with these options:

| Name | Description | Default | Example |
| ------------- | ------------- | ------------- | ------------- |
| `localStorage` | Store the users choice in the local storage | `true` | `false` |
| `cookie` | Store the users choice in a cookie (local storage takes precedence) | `false` | `true` |
| `events` | Emit the [`theme-change` event](#events) | `true` | `false` |
| `autoMatchOsTheme` | Detect the system theme and automatically change to it | `true` | `false` |
| `defaultTheme` | Specify which theme should be used on the first visit | `light` | `dark` |
| `attach` | Specify if the default toggle should be attached (can be used instead of [`data-drkmd-attach`](#default-theme-toggle)) | `false` | `true` |
| `label` | Specify a custom label for the theme toggle | `🌓` | `💡` |
| `buttonLight` | Background color of the theme toggle for the light mode | `#fff` | `#222` |
| `buttonDark` | Background color of the theme toggle for the dark mode | `#000` | `#222` |
| `top` | Space in px from the toggle to the top of the page (if set toggle will be placed at the top) | `unset` | `20px` |
| `bottom` | Space in px from the toggle to the bottom of the page (if set toggle will be placed at the bottom) | `20px` | `unset` |
| `right` | Space in px from the toggle to the right edge of the page (if set toggle will be placed on the left side)| `unset` | `20px` |
| `left` | Space in px from the toggle to the left edge of the page (if set toggle will be placed on the right side) | `20px` | `unset` |

You can specify any number of them as the value for the `data-drkmd-opts` attribute (make sure the value is valid JSON):

```html
<script src="https://cdn.jsdelivr.net/npm/drkmd-js/dist/drkmd-js.min.js" data-drkmd-opts='{ "defaultTheme": "dark", "cookie": true }'></script>
```

> This works on any element, not just the script tag, so you can even use it when you are loading [drkmd.js](https://github.com/BetaHuhn/drkmd.js) via [NPM](#npm).

or you can pass them as a JS object to `new Darkmode()`:

```js
const options = {
  cookie: true,
  defaultTheme: 'dark',
}

const darkmode = new Darkmode(options)
```

## 📖 Examples

All examples below use `drkmd-js` by loading it via a CDN in a script tag (more info in the [get started](#-get-started) section):

**HTML**
```html
<script src="https://cdn.jsdelivr.net/npm/drkmd-js/dist/drkmd-js.min.js" data-drkmd></script>
```

---

### Basic

Render the darkmode toggle with all the default options:

**JavaScript**
```js
new Darkmode().attach()
```

Specify different colors for each theme with CSS variables:

**CSS**
```css
[data-theme="light"] {
    --background: #fff;
    --color: #000;
}

[data-theme="dark"] {
    --background: #000;
    --color: #fff;
}

html,
body {
    background: var(--background);
    color: var(--color);
}
```

---

### CSS variables

If you want to specify different colors for each theme, you can use [css-variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties):

**CSS**
```css
/* Light Colors */
.theme-light {
    --background: #fff;
    --color: #000;
}

/* Dark Colors */
.theme-dark {
    --background: #000;
    --color: #fff;
}

html,
body {
    background: var(--background);
    color: var(--color);
}
```

---


### With options

Render the darkmode toggle with custom options:

**JavaScript**
```js
const options = {
  right: 'unset',
  left: '32px',
  defaultTheme: 'dark',
}

new Darkmode(options).attach()
```

---

### Custom darkmode toggle

Don't render the darkmode toggle, instead change the theme on a button press:

**HTML**
```html
<button id="myBtn">Change theme</button>
```

**JavaScript**
```js
const darkmode = new Darkmode()

document.getElementById('myBtn').addEventListener('click', function() {
    darkmode.toggle()
})
```

---

### Different images depending on the theme

You can use the `theme-change` event to modify an element with JavaScript. Here we are changing the `src` attribute of an `img` tag when the theme changes:

**HTML**
```html
<img id="image" src="/path/to/dark.png">
```

**JavaScript**
```js
new Darkmode().attach()

const imageSrc = {
   dark: "/path/to/dark.png",
   light: "/path/to/light.png"
}

window.addEventListener('theme-change', e => {
    const theme = e.detail.to // will return 'light' or 'dark'
    document.getElementById('image').src = imageSrc[theme]
})
```

---

### Different styles depending on the theme

You can use the classes `theme-dark` and `theme-light` to use different styles depending on the theme:

**JavaScript**
```js
new Darkmode().attach()
```

**CSS**
```css
.theme-dark {
    /* Styles for dark theme */
}

.theme-light {
    /* Styles for light theme */
}
```

> **Note:** The classes will be added to the `body` of your HTML page.

## 🌍 Browser compatibility

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) uses `prefers-color-scheme: dark` to automatically enable the Dark Mode if the OS prefered theme is dark.

Check the current compatibility here:

- [Can I use `prefers-color-scheme`](https://caniuse.com/prefers-color-scheme) (to activate Dark Mode automatically)
- [Can I use `css-variables`](https://caniuse.com/css-variables) (to change specific colors depending on the theme)

## 💻 Development

Issues and PRs are very welcome!

The actual source code of this library is in the `drkmd.js` file in the `src` folder.

Run `yarn build` or `npm run build` to produce a production version of [drkmd.js](https://github.com/BetaHuhn/drkmd.js) in the `dist` folder.

## ❔ About

This library was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

### Credits

The library was inspired by [Darkmode.js](https://github.com/sandoche/Darkmode.js) which is similar, but uses a different approach by directly changing the background color of your page, instead of letting you customize everything via `css variables`.

### License

Copyright 2021 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
