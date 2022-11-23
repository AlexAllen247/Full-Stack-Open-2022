import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from "./reducers/blogReducer"
import loginService from "./services/login"
import userService from "./services/user"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)
  const notification = useSelector(state => state.notification)
  const blogFormRef = useRef()
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        setUser(user)
        userService.setUser(user)
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify("wrong username/password", "alert")
      })
  }

  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify("good bye!")
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      notify(`a new blog "${blog.title}" by ${blog.author} added`)
    } catch (error) {
      notify("creating a blog failed: " + error.response.data.error, "alert")
    }
  }

  const removeBlog = (id) => {
    dispatch(deleteBlog(id))
    window.confirm(`remove "${id.title}" by ${id.author}?`)
    const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes)
    initializeBlogs(updatedBlogs)
  }

  const updateLikeBlog = (blog) => {
    const updatedBlogObject = { ...blog, likes: blog.like + 1 }
    dispatch(likeBlog(updatedBlogObject))
    notify(`you liked "${updatedBlogObject.title}" by ${updatedBlogObject.author}`)
    const updatedBlogs = blogs.map((b) => (b.id === updatedBlogObject ? updatedBlogObject : b)).sort(byLikes)
    initializeBlogs(updatedBlogs)
  }

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }, 3))
  }

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={addBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={updateLikeBlog}
            removeBlog={removeBlog}
            user={user}/>
        ))}
      </div>
    </div>
  )
}

export default App
