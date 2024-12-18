const { rootRoute } = require('./rootRoute.js') 
const { dataRoute } = require('./dataRoute.js')

const routes = {
    '/': rootRoute,
    '/data': dataRoute
}

function getHandler(
    req,
    res
) {

    if (!req.url) throw new Error('No req.url')

    const route = req.url.split('?')[0]

    const handler = routes[route]

    if (!handler) {
        res.statusCode = 404
        res.end(`Invalid route: ${req.url}`)
        console.error(`Invalid route: ${req.url}`)
        return
    }

    return handler
}

module.exports = {
    getHandler
}