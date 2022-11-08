const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {userExtractor} = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    const id = request.params.id
    const blog = Blog.findById(id)
    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.deleteOne({ _id: id })
        response.status(204).end()
    } else {
        return response.status(401).json({ error: "Unauthorized action" })
    }
})

blogsRouter.put("/:id", userExtractor, async (request, response) => {
    const id = request.params.id
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

    response.json(updatedBlog)
})

module.exports = blogsRouter