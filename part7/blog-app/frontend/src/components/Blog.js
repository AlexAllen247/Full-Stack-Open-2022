import { useState } from "react"
import blogService from "../services/blogs"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { removeBlog } from "../reducers/blogReducer"

const Blog = ({ blog, user, likeCallback }) => {
  const dispatch = useDispatch()
  const removeButton = {
    width: "fit-content",
  }

  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = {
    display: showDetails ? "none" : "flex",
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const showWhenVisible = {
    display: showDetails ? "flex" : "none",
    flexDirection: "column",
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShowingDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = async (blog) => {
    const blogToUpdate = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    likeCallback(blog.id, blogToUpdate)
    setLikes(likes + 1)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.setToken(user.token)
        await dispatch(removeBlog(blog))
        dispatch(setNotification(`blog ${blog.title} removed`, 3))
      } catch (error) {
        dispatch(setNotification(error.response.data.error, 3))
      }
    }
  }

  return (
    <div>
      <div style={hideWhenVisible} className="blog">
        <span>
          {blog.title} by {blog.author}
        </span>{" "}
        <button id="view" onClick={toggleShowingDetails}>
          view
        </button>
      </div>
      <div style={showWhenVisible} className="all-visible">
        <div>
          {blog.title} <button onClick={toggleShowingDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes: {likes}{" "}
          <button id="like" onClick={() => addLike(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.name === user.name && (
          <button
            id="remove"
            onClick={() => deleteBlog(blog)}
            style={removeButton}
          >
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
