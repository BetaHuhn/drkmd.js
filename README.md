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
- Specify different styles for the dark and light mode with [CSS classes]()
- Automatically detect system theme
- Attach customizable theme toggle button to the page (or use it [programmatically]())
- Store users choice in local storage or optionally as a cookie
- Emits a `theme-change` event for advanced use cases like changing images

## 👋 Introduction

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) (short for darkmode.js) lets you add a dark-mode/light-mode toggle to any website. The library detects the system theme automatically and even saves the users choice in local storage or as a cookie.

The library will add the class `theme-dark`/`theme-light` to the body of the page and set the attribute `data-theme` to `dark`/`light` on the html tag which can be used to specify different css styles depending on the theme. You can also listen to a `theme-change` event for more advanced use cases. See [usage](https://github.com/BetaHuhn/drkmd.js#usage) below how you can customize your page with this.

## 🚀 Get started

### Script tag

Add this to your HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/drkmd-js/dist/drkmd-js.min.js" data-drkmd></script>
```

> With `data-drkmd` the button will be attached automatically on load, leave it out if you want to attach it manually

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

By default [drkmd.js](https://github.com/BetaHuhn/drkmd.js) will add the button to the bottom right corner and save the users choice in local storage, this can be configured using the [options](https://github.com/BetaHuhn/drkmd.js#options).

## 📚 Usage

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

The easiest way is to specify different colors for each theme using css variables:

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

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) also adds the attribute `data-theme` with either `light` or `dark` as the value to the html tag. With this the different themes can also be specified with the css selector `[data-theme="dark"]` and `[data-theme="dark"]`.

### Events

By default [drkmd.js](https://github.com/BetaHuhn/drkmd.js) emits a `theme-change` event everytime the theme changes:

```js
import Darkmode from 'drkmd-js';

new Darkmode();

window.addEventListener('theme-change', e => {
    console.log(e.detail.to); // will return 'light' or 'dark'
});
```

The `theme-change` event could be used to change the `src` attribute of an `<img>` tag depending on the theme ([more info](https://github.com/BetaHuhn/drkmd.js/discussions/11#discussioncomment-247341)) or modify the page in any other way with JavaScript when the theme changes.

### Programmatic Usage

[drkmd.js](https://github.com/BetaHuhn/drkmd.js) can also be used programmatically if you don't want to show the button automatically on load or for other more advanced use cases.

To enable/disable Darkmode you can use the method `toggle()`:

```javascript
const darkmode = new Darkmode();
darkmode.toggle();
```

There are also other methods available:

```js
darkmode.attach() // Attach the default darkmode button to the page
darkmode.toggle() // Toggle the theme
darkmode.isActivated() // Returns true if the darkmode is active
darkmode.toLight() // Change theme to light
darkmode.toDark() // Change theme to dark
```

## ⚙️ Options

You can customize [drkmd.js](https://github.com/BetaHuhn/drkmd.js) in two different ways, depending on how you are including it in your site.

The main method is to pass a options object to `new Darkmode()`:

```js
const options = {
  top: '20px', // default: 'unset'
  bottom: 'unset', // default: '20px'
  right: 'unset', // default: '20px'
  left: '32px', // default: 'unset'
  buttonLight: '#fff',  // default: '#fff'
  buttonDark: '#000', // default: '#000'
  events: false, // default: true
  cookie: true, // default: false
  localStorage: false, // default: true (will take precedence over cookie)
  label: '', // default: '🌓'
  autoMatchOsTheme: false, // default: true
  defaultTheme: 'dark', // default: 'light'
}

const darkmode = new Darkmode(options);
darkmode.attach();
```

The other method is to specify the options as the value for the `data-drkmd` attribute:

```html
<script src="https://cdn.jsdelivr.net/npm/drkmd-js/dist/drkmd-js.min.js" data-drkmd='{ "defaultTheme": "dark", "cookie": true }'></script>
```

This works on any element, but it is recommended to only use it when you are loading drkmd via the [script tag](#script-tag).

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

Copyright 2020 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
