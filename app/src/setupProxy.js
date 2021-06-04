/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/new/api/',
    createProxyMiddleware({
      target: 'https://mall.jsh.com',
      secure: false,
      changeOrigin: true,
    })
  );
};
