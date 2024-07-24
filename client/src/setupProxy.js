const { createProxyMiddleware } = require("http-proxy-middleware");
const proxyUrl = process.env.REACT_APP_PROXY;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
    }),
  );
  app.use(
    "/login",
    createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
    }),
  );
};
