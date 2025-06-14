const { createProxyMiddleware } = require("http-proxy-middleware");
const { authorizeRoles, authenticateJWT } = require("../middleware/auth");


// composed middlewares
const adminOnly = [ authenticateJWT, authorizeRoles("ADMIN")];

const proxy = (app) => {
    app.use('/api/service1', createProxyMiddleware({
        target: process.env.FIRST_MICROSERVICE_URL + '/data',
        changeorigin: true,
        pathrewrite: { '^/api/service1': '/api' },
    }));

    app.use(
        '/api/service2', 
        ...adminOnly,
        createProxyMiddleware({
        target: process.env.SECOND_MICROSERVICE_URL + '/data',
        changeorigin: true,
        pathrewrite: { '^/api/service2': '/api' },
    }));
}

module.exports = proxy;