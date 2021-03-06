var fs = require('fs')
var path = require('path')

module.exports = {
	entry: path.resolve(__dirname,'./../src/server/server.js'),
	
	output: {
		path: path.join(__dirname, './../bin/'),
		filename: 'server.bundle.js'
	},
	
	target: 'node',
	
	externals: fs.readdirSync(path.resolve(__dirname,'./../node_modules')).concat([
		'react-dom/server','react/addons',
	]).reduce(function(ext,mod){
		ext[mod] = 'commonjs ' + mod
		return ext
	}, {}),
	
	node: {
		__filename: true,
		__dirname: true
	},
	
	module: {
		loaders: [
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
			  presets: ['react', 'es2015']
			}
		  }
		],
	}
}