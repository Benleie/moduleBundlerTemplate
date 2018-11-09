const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === "development"

const config = {
	target:"web",
	entry: require('path').join(__dirname, 'src/index.js'),
	output: {
		filename: "bundle.js",
		path: require('path').join(__dirname, "dist")
	},
	module:{
		rules:[
			{ test:/.vue$/, loader:"vue-loader"},
			{
				test: /.(gif|jpg|jpeg|png|svg)$/,
				use: [{
					loader: 'url-loader',
					options: { limit: 1024, name: "[name]-new.[ext]" }
				}]
			},
			
			{
				// 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
				test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
				loader: 'file-loader',
			},
			
            
		]
	},
	plugins:[
		//配合react/vue等框架的内在打包模式
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: isDev ? '"development"' : '"production"' }
		}),
		new HTMLPlugin()
	]
}

if(isDev){
	config.devtool = "#cheap-module-eval-source-map",
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',
		overlay: {
			errors: true
		},
		// open:true
		hot: true
	},
	config.module.rules.push(
		{
			test: /(.scss|.css)$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: "postcss-loader",
					options: {
						// sourceMap: true
					}
				},
				'sass-loader'
			]
		}
	),
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}
module.exports = config