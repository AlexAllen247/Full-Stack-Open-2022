import { useState, useEffect } from "react"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, addBlog } from "./reducers/blogReducer"
import { getUser, deleteUser } from "./reducers/userReducer"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Alert, Navbar, Nav } from "react-bootstrap"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import Users from "./components/Users"
import OneBlog from "./components/OneBlog"
import Blogs from "./components/Blogs"
import blogService from "./services/blogs"
import loginService from "./services/login"
import OneUser from "./components/OneUser"

const App = () => {
  const padding = {
    padding: "10px",
  }
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.notification)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON)
      dispatch(getUser(userObject))
      blogService.setToken(user.Token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userObject = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userObject)
      )
      blogService.setToken(userObject.token)
      await dispatch(getUser(userObject))
      setMessage(`welcome ${username}`)
      setTimeout(() => {
        setMessage(null)
        setUsername("")
        setPassword("")
      }, 3000)
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 3))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(deleteUser())
  }

  const createBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await dispatch(addBlog(blogObject))
      dispatch(initializeBlogs())
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          3
        )
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 3))
    }
  }

  if (user === null)
    return (
      <div className="container">
        <h2>Log in to application</h2>
        {errorMessage && <Notification message={errorMessage} />}
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      </div>
    )

  return (
    <div className="container">
      {message && <Alert variant="success">{message}</Alert>}
      <Router>
        {errorMessage && <Notification message={errorMessage} />}
        <Navbar
          style={padding}
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user.name} logged in{" "}
                <button id="logout-button" onClick={handleLogout}>
                  log out
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Togglable buttonLabel="create new blog">
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <h3>blog app</h3>
        {}
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<OneUser />} />
          <Route path="/blogs/:id" element={<OneBlog />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
