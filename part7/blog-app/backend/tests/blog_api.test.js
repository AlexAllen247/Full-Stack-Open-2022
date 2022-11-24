const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../utils/config")

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
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("98765", 10)
    const user = await new User({ username: "test", passwordHash }).save()
    const userToken = { username: "test", id: user.id }
    return (token = jwt.sign(userToken, config.SECRET))
  })


  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Cool",
      author: "Paul",
      url: "www.example.com",
      likes: 2
    }

    await api.post("/api/blogs").set("Authorization", `bearer ${token}`).send(newBlog).expect(201).expect("Content-Type", /application\/json/)

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

    await api.post("/api/blogs").send(newBlog).set("Authorization", `bearer ${token}`).expect(201).expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(0)
  })

  test("if url or title is missing 400 error displayed", async () => {
    const newBlog = {
      author: "Dom"
    }

    await api.post("/api/blogs").set("Authorization", `bearer ${token}`).send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe("Testing DELETE method", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("98765", 10)
    const user = await new User({ username: "test", name: "Test", passwordHash }).save()
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      blogObject.user = user._id
      await blogObject.save()
      user.blogs = user.blogs.concat(blogObject._id.toString())
      await user.save()
    }
  })

  const loginToken = async () => {
    const userLoginDetails = {
      username: "test",
      password: "98765"
    }

    const login = await api.post("/api/login").send(userLoginDetails).expect(200)
    const token = login.body.token
    expect(token).not.toBe(null)
    return token
  }

  test("test succeeds when post is deleted by user who created it", async () => {
    const token = await loginToken()
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const userBlogsAtStart = (await helper.usersInDb()).find(user => user.username === "test").blogs.map(blog => blog._id.toString())
    expect(userBlogsAtStart).toContain(blogToDelete.id)

    await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", `bearer ${token}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test("test succeeds with 401 unauthorized action user tries to delete another user's blog", async () => {
    const token = null
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const userBlogsAtStart = (await helper.usersInDb()).find(user => user.username === "test").blogs.map(blog => blog._id.toString())
    expect(userBlogsAtStart).toContain(blogToDelete.id)

    await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", `bearer ${token}`).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
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