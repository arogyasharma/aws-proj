// CRA dev proxy to forward API calls to your backend
// Requires http-proxy-middleware (installed by react-scripts)

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/upload'],
    createProxyMiddleware({
      target: 'http://192.168.220.192:8000',
      changeOrigin: true,
      // If your backend is HTTP, keep secure false
      secure: false,
      // Optional: log for debugging
      // logLevel: 'debug',
    })
  );
};