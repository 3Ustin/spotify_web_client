const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  const middleware = createProxyMiddleware({
    target: 'http://localhost:5000'
  })

  app.use(
    '/api/v1/**',
    middleware
  )

}