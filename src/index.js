import Darkmode, { IS_BROWSER } from './drkmd'
export default Darkmode

const detect = () => {
	const elem = document.querySelector('[data-drkmd]')

	if (!elem) {
		window.darkmode = Darkmode

		return
	}

	const attribute = elem.getAttribute('data-drkmd') || '{}'
	const options = JSON.parse(attribute)

	window.darkmode = new Darkmode(options)

	if (window.darkmode.options.attachButton) {
		window.darkmode.attach()
	}
}

if (IS_BROWSER) {
	detect()
}