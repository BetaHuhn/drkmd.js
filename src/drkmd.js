export const IS_BROWSER = typeof window !== 'undefined'

export default class Darkmode {
	/**
	 * Create new Darkmode instance
	 * @constructor
	 * @param {?object} options - object containing options
	 */
	constructor(options) {
		const defaultOptions = {
			top: 'unset',
			bottom: '20px',
			right: '20px',
			left: 'unset',
			attach: false,
			buttonLight: '#fff',
			buttonDark: '#000',
			events: true,
			cookie: false,
			localStorage: true,
			label: '🌓',
			autoMatchOsTheme: true,
			defaultTheme: 'light'
		}

		// Parse options based on parameters and defaults
		options = Object.assign({}, defaultOptions, options)

		// Initialize values
		this.options = options
		this.dark = false

		// Listen for prefers-color-scheme change
		if (options.autoMatchOsTheme) {
			window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => e.matches && this._switchThemePrefers())
			window.matchMedia('(prefers-color-scheme: light)').addListener((e) => e.matches && this._switchThemePrefers())
		}

		// Determine to which theme should be set, start with default, precendence based on descending order
		let changeToDark = options.defaultTheme !== 'light'

		// First check the system theme
		if (options.autoMatchOsTheme) {
			changeToDark = this._preferedThemeIsDark()
		}

		// Then check if a cookie is set
		if (this.options.cookie) {
			const match = document.cookie.match(RegExp('(?:^|;\\s*)darkmode=([^;]*)'))
			changeToDark = match ? match[1] === 'true' : null
		}

		// Lastly check local storage
		if (this.options.localStorage && window.localStorage !== null) {
			changeToDark = window.localStorage.getItem('darkmode') === 'true'
		}

		// Change the theme to dark if true or light if false
		this._changeThemeToDark(changeToDark)
	}

	/**
	 * Attach the theme toggle to the page
	 */
	attach() {
		const css = `
            .drkmd-toggle-button{
                position: fixed;
                z-index: 1000;
                left: ${ this.options.left };
                right: ${ this.options.right };
                bottom: ${ this.options.bottom };
                top: ${ this.options.top };
                height: 3rem;
                min-width: 3rem;
                border-radius: 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${ this.options.buttonDark };
                color: ${ this.options.buttonLight };
                cursor: pointer;
            }

            .drkmd-toggle-button span{
                margin: 0;
                padding: 0px 10px;
            }

            .theme-dark .drkmd-toggle-button{
                background: ${ this.options.buttonLight };
                color: ${ this.options.buttonDark }
            }
        `

		const div = document.createElement('div')
		const span = document.createElement('span')

		span.innerHTML = this.options.label
		div.className = 'drkmd-toggle-button'

		div.setAttribute('title', 'Toggle dark mode')
		div.setAttribute('aria-label', 'Toggle dark mode')
		div.setAttribute('aria-checked', 'false')
		div.setAttribute('role', 'checkbox')

		div.appendChild(span)

		div.addEventListener('click', () => {
			this.toggle()
		})

		document.body.insertBefore(div, document.body.firstChild)
		this._addStyle(css)
	}

	/**
	 * Change the theme to light
	 */
	toLight() {
		if (this.options.events) window.dispatchEvent(new CustomEvent('theme-change', { detail: { to: 'light' } }))

		document.documentElement.setAttribute('data-theme', 'light')
		document.body.classList.remove('theme-dark')
		document.body.classList.add('theme-light')

		this._setStorageValue(false)
		this.dark = false
	}

	/**
	 * Change the theme to dark
	 */
	toDark() {
		if (this.options.events) window.dispatchEvent(new CustomEvent('theme-change', { detail: { to: 'dark' } }))

		document.documentElement.setAttribute('data-theme', 'dark')
		document.body.classList.add('theme-dark')
		document.body.classList.remove('theme-light')

		this._setStorageValue(true)
		this.dark = true
	}

	/**
	 * Toggle between the dark and light theme based on the current one
	 * @returns {boolean} isDark - true if theme is now dark and false if it is light
	 */
	toggle() {
		const val = !this.dark
		this._changeThemeToDark(val)
		return val
	}

	/**
	 * Check if the darkmode is activated
	 * @deprecated Use isDark and isLight
	 * @returns {boolean} isDark - true if theme is dark and false if it is light
	 */
	isActivated() {
		return this.dark
	}

	/**
	 * Determine if the current theme is dark
	 * @returns {boolean} isDark - true if theme is dark and false if it is light
	 */
	isDark() {
		return this.dark === true
	}

	/**
	 * Determine if the current theme is light
	 * @returns {boolean} isLight - true if theme is light and false if it is dark
	 */
	isLight() {
		return this.dark === false
	}

	/**
	 * Return the current theme as a string
	 * @returns {string} theme - either dark or light
	 */
	currentTheme() {
		return this.dark ? 'dark' : 'light'
	}

	_preferedThemeIsDark() {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	}

	_switchThemePrefers() {
		const val = this._preferedThemeIsDark()
		this._changeThemeToDark(val)
	}

	_changeThemeToDark(toDark) {
		toDark ? this.toDark() : this.toLight()
	}

	_setStorageValue(value) {
		if (this.options.localStorage && window.localStorage !== null) {
			window.localStorage.setItem('darkmode', value)
			return
		}

		if (this.options.cookie) {
			document.cookie = `darkmode=${ value }`
			return
		}
	}

	_addStyle(css) {
		const linkElement = document.createElement('link')

		linkElement.setAttribute('rel', 'stylesheet')
		linkElement.setAttribute('type', 'text/css')
		linkElement.setAttribute(
          'href',
          'data:text/css;charset=UTF-8,' + encodeURIComponent(css)
		)

		document.head.appendChild(linkElement)
	}
}