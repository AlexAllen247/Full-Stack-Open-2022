import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

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
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password, })
            window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            setMessage("Error: Wrong credentials")
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleCreateBlog = async (title, author, url) => {
        try {
            blogFormRef.current.toggleVisibility()
            const blog = await blogService.create({ title, author, url })
            setBlogs(blogs.concat(blog))
            setMessage(`A new blog ${title} by ${author} added`)
        } catch (exception) {
            setMessage("Error: Please fill all fields")
        }
    }

    const blogFormRef = useRef()

    const handleUpdatedLikes = async (blogId, blogObject) => {
        const updated = await blogService.update(blogId, blogObject)
        setBlogs(blogs.map(blog => blog.id === blogId ? updated : blog))
        setMessage(`Liked ${blogObject.title}`)
    }

    const deleteBlog = async (blogId) => {
        await blogService.remove(blogId)
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        setMessage("Blog deleted")
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
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm createBlog={handleCreateBlog} />
                    </Togglable>
                    {blogs
                        .sort((x, y) => y.likes - x.likes)
                        .map(blog =>
                            <Blog key={blog.id} blog={blog} updateLikes={handleUpdatedLikes} deleteBlog={deleteBlog} username={user.username} />
                        )}
                </div>
            )}
        </div>
    )
}

export default App
