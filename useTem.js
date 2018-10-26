const Vue = require('vue')
const SSR = require('vue-server-renderer')
const server = require('express')()

const renderer = SSR.createRenderer({
	template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
	const app = new Vue({
		data: {
			url: req.url
		},
		template: `<div>Now, you're at {{ url }}</div>`
	})

	renderer.renderToString(app, (err, html) => {
		if (err) {
			res.status(500).end('Internal Server Error')
			return
		}
		res.end(html)
	})
})

server.listen(8091)