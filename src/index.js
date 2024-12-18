const http = require('node:http')
const { getHandler } = require('./getHandler.js')

const PORT = 3249

const server = http.createServer(async (
    req,
    res
) => {

    const handler = getHandler(req, res)
    if (!handler) return

    let reqBody = ''
    req.on('data', chunk => reqBody += chunk.toString())
    req.on('end', async () => {
        try {
            let parsedBody
            if (reqBody) parsedBody = JSON.parse(reqBody)

            const handler = getHandler(req, res)
            if (!handler) return

            await handler(
                req,
                res,
                parsedBody
            )
        } catch (e) {
            console.log(e)
            res.statusCode = 404
            res.end('Server error.')
        }
    })
})

server.listen(PORT, '127.0.0.1', () => console.log(`http://127.0.0.1:${PORT}`))