module.exports = app => {
    const { createProxyMiddleware } = require('http-proxy-middleware');

    app.use(createProxyMiddleware('/frontend', {
        target: 'http://localhost:5500',
        ws: true,
        logLevel: 'warn'
    }));

    app.use(createProxyMiddleware('/favicon.ico', {
        target: 'http://localhost:5500',
        logLevel: 'warn'
    }));
};
