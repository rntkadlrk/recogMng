const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/find', {
			target: 'http://192.168.250.191:5000', 
			changeOrigin: true,
		}),
		
	);
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:5001', 
			changeOrigin: true,
			
		}),
	);
	
};