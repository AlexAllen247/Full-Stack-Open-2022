const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogRouter")
const middleware = require("./utils/middleware")
const { info, error } = require("./utils/logger")
const mongoose = require("mongoose")

info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => { info("Connected to MongoDB") })
  .catch((error) => { error("error connecting to MongoDB:", error.message) })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app