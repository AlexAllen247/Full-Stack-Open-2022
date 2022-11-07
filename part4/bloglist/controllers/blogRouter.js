const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
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