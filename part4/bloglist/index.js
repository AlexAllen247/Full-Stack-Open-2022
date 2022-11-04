const app = require("./app")
const http = require("http")
const { info, error } = require("./utils/logger")
const config = require("./utils/config")

const server = http.createServer(app)

const PORT = config.PORT
server.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})