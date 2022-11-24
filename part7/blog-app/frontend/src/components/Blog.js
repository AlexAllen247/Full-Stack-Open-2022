import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(updatedBlog))
    dispatch(setNotification(`Liked ${updatedBlog}`, 3))
  }

  const removeBlog = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
        .then(() => {dispatch(setNotification("Blog deleted", 3))})
        .catch(() => {dispatch(setNotification("Error", 3))})
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div className="blog-visible">
        <span>{blog.title}</span> - <span>{blog.author}</span>{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      </div>
      {visible && (
        <div className="blog-invisible">
          <div>{blog.url}</div>
          <div>
            <p>
              Likes: {blog.likes}{" "}
              <button id="like-button" onClick={addLike}>
                like
              </button>{" "}
            </p>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === username && (
            <button id="delete-button" onClick={removeBlog}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
