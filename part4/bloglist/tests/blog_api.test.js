const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe("Testing GET requests", () => {

  test("blogs are returned as json", async () => {
    await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/)
  })

  test("all blogs have id instead of _id", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach((blog) => expect(blog.id).toBeDefined())
  })
})

describe("Testing POST requests", () => {

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Cool",
      author: "Paul",
      url: "www.example.com",
      likes: 2
    }

    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain("Cool")
  })

  test("likes of a blog default to 0", async () => {
    const newBlog = {
      title: "Maybe",
      author: "Peter",
      url: "www.example.com"
    }

    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(0)
  })

  test("if url or title is missing 400 error displayed", async () => {
    const newBlog = {
      author: "Dom"
    }

    await api.post("/api/blogs").send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe("Testing DELETE method", () => {
  test("test succeeds with status 204", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

describe("Testing PUT method", () => {
  test("test succeeds when using a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = { ...blogsAtStart[0], likes: 7 }
    await api.put(`/api/blogs/${blogToUpdate.id}`, blogToUpdate).expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(updatedBlog.likes).toBe(7)

  })
})

afterAll(() => {
  mongoose.connection.close()
})