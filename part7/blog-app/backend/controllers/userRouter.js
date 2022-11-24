const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1 })
    response.json(users)
})

usersRouter.get("/:id", async (request, response) => {
    const user = await User.findById(request.params.id)
    user
    ? response.json(user.toJSON())
    : response.status(404).end()
})

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body

    if (!(username && password)) {
        return response.status(400).send({ error: "username and password are required" })
    }

    if (password === undefined || password.length < 3) {
        return response.status(400).send({ error: "password is too short or missing" })
    }

    if (username === undefined || username.length < 3) {
        return response.status(400).send({ error: "username is too short or missing" })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: "username must be unique"
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter