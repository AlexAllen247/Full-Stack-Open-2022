import { useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { setLogin, setLogout } from "./reducers/userReducer"
import { useSelector, useDispatch } from "react-redux"
import { initializeBlogs  } from "./reducers/blogReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            <span>{user.name} logged in</span>
            <button onClick={() => dispatch(setLogout(user))}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm visible={blogFormRef} />
          </Togglable>
          {blogs
            .slice()
            .sort((x, y) => y.likes - x.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
