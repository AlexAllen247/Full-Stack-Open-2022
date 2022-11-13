import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])   
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  
  const handleLogin = async (username, password) => {    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        "loggedNoteappUser", JSON.stringify(user)
      )
    } catch (exception) {
      setMessage("Wrong credentials")
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({title, author, url})
      setBlogs(blogs.concat(blog))
      setMessage(`A new blog ${title} by ${author} added`)
    } catch (exception) {
      setMessage("Error: Please fill all fields")
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p><span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm createBlog={handleCreateBlog} />
          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
          </div>
      )}
    </div>
  )
}

export default App
