export const IS_BROWSER = typeof window !== 'undefined'

export default class Darkmode {
	constructor(options) {
		if (!IS_BROWSER) {
			console.warn('Detected environment without a `window` object')
			return
		}

		const defaultOptions = {
			top: 'unset',
			bottom: '20px',
			right: '20px',
			left: 'unset',
			buttonLight: '#fff',
			buttonDark: '#000',
			events: true,
			cookie: false,
			localStorage: true,
			label: '🌓',
			autoMatchOsTheme: true,
			defaultTheme: 'light'
		}

		options = Object.assign({}, defaultOptions, options)

		this.options = options
		this.dark = false

		if (options.autoMatchOsTheme) {
			window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => e.matches && this.switchThemePrefers())
			window.matchMedia('(prefers-color-scheme: light)').addListener((e) => e.matches && this.switchThemePrefers())
		}

		const storageValue = this.getStorageValue()
		if (storageValue !== null) {
			storageValue === 'true' || storageValue === true ? this.toDark() : this.toLight()
		} else if (options.autoMatchOsTheme) {
			this.preferedTheme() ? this.toDark() : this.toLight()
		} else {
			options.defaultTheme === 'light' ? this.toLight() : this.toDark()
		}
	}

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
			this.dark === true ? this.toLight() : this.toDark()
		})

		document.body.insertBefore(div, document.body.firstChild)
		this.addStyle(css)
	}

	toLight() {
		if (this.options.events) window.dispatchEvent(new CustomEvent('theme-change', { detail: { to: 'light' } }))
		document.documentElement.setAttribute('data-theme', 'light')
		this.setStorageValue(false)
		document.body.classList.remove('theme-dark')
		document.body.classList.add('theme-light')
		this.dark = false
	}

	toDark() {
		if (this.options.events) window.dispatchEvent(new CustomEvent('theme-change', { detail: { to: 'dark' } }))
		document.documentElement.setAttribute('data-theme', 'dark')
		this.setStorageValue(true)
		document.body.classList.add('theme-dark')
		document.body.classList.remove('theme-light')
		this.dark = true
	}

	preferedTheme() {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	}

	switchThemePrefers() {
		this.preferedTheme() === true ? this.swichToDark() : this.swichToLight()
	}

	getStorageValue() {
		if (this.options.localStorage && window.localStorage !== null) {
			return window.localStorage.getItem('darkmode')
		} else if (this.options.cookie) {
			const match = document.cookie.match(RegExp('(?:^|;\\s*)darkmode=([^;]*)'))
			return match ? match[1] : null
		}

		return null
	}

	setStorageValue(value) {
		if (this.options.localStorage && window.localStorage !== null) {
			window.localStorage.setItem('darkmode', value)
		} else if (this.options.cookie) {
			document.cookie = `darkmode=${ value }`
		}
	}

	toggle() {
		this.dark ? this.toLight() : this.toDark()
		return this.dark
	}

	isActivated() {
		return this.dark
	}

	addStyle(css) {
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