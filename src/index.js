const http = require('node:http')
const { getHandler } = require('./getHandler.js')

const PORT = 3000

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

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))