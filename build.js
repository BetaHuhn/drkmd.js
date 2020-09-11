const { writeFile } = require('fs').promises
const js = require('rosid-handler-js')

js('src/index.js', {

	optimize: true,
	browserify: {
		standalone: "drkmd"
	}

}).then((data) => {

	return writeFile(`dist/drkmd.min.js`, data)

})