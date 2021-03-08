const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/new/api/',
    createProxyMiddleware({
      target: 'https://new.jsh.com',
      secure: false,
      changeOrigin: true,
    })
  );
};
