const { writeFile } = require('fs').promises
const js = require('rosid-handler-js')

const pkg = require('./package.json')

js('src/index.js', {

	optimize: true,
	browserify: {
		standalone: pkg.name
	}

}).then((data) => {

	return writeFile(`dist/${pkg.name}.min.js`, data)

})