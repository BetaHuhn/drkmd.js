import Darkmode, { IS_BROWSER } from './drkmd'
export default Darkmode

if (IS_BROWSER) {
	(function(window) {
		window.Darkmode = Darkmode
	}(window))
}