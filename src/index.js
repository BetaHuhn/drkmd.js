import Darkmode, { IS_BROWSER } from './drkmd'
export default Darkmode

const detect = () => {
	const optsElem = document.querySelector('[data-drkmd-opts]')
	const attachBtnElem = document.querySelector('[data-drkmd-attach]')

	const toggleElems = document.querySelectorAll('[data-drkmd-toggle]')
	const toLightElems = document.querySelectorAll('[data-drkmd-to-light]')
	const toDarkElems = document.querySelectorAll('[data-drkmd-to-dark]')

	// If no attributes are found, assume programmatic usage and attach Darkmode class to window
	if (!optsElem && !attachBtnElem && toggleElems.length < 1 && toLightElems.length < 1 && toDarkElems.length < 1) {
		window.Darkmode = Darkmode

		return
	}

	// Parse options specified in data-drkmd-opts attribute
	const attributeValue = optsElem && optsElem.getAttribute('data-drkmd-opts') || '{}'
	const options = JSON.parse(attributeValue)

	window.darkmode = new Darkmode(options)

	// Attach event listeners to data-drkmd-toggle elements
	if (toggleElems.length > 0) {
		for (let i = 0; i < toggleElems.length; i++) {
			toggleElems[i].addEventListener('click', () => {
				window.darkmode.toggle()
			})
		}
	}

	// Attach event listeners to data-drkmd-to-light elements
	if (toLightElems.length > 0) {
		for (let i = 0; i < toLightElems.length; i++) {
			toLightElems[i].addEventListener('click', () => {
				window.darkmode.toLight()
			})
		}
	}

	// Attach event listeners to data-drkmd-to-dark elements
	if (toDarkElems.length > 0) {
		for (let i = 0; i < toDarkElems.length; i++) {
			toDarkElems[i].addEventListener('click', () => {
				window.darkmode.toDark()
			})
		}
	}

	// Attach the default toggle button to the page (data-drkmd-attach or option)
	if (window.darkmode.options.attach || attachBtnElem) {
		window.darkmode.attach()
	}
}

if (IS_BROWSER) {
	detect()
} else {
	console.warn('drkmd.js: Detected environment without a `window` object')
}