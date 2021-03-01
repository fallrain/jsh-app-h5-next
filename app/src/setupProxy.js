const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware(
    '/new/api/',
    {
      target: 'https://new.jsh.com',
      secure: false
    }
  ));
};
