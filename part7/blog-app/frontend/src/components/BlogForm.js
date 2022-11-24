import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const BlogForm = ({ visible }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(createBlog(newBlog))
      .then(() => {
        dispatch(setNotification(`A new blog ${title} by ${author} added`, 3))
        visible.current.toggleVisibility()
        setTitle("")
        setAuthor("")
        setUrl("")
      })
      .catch(() => {
        dispatch(setNotification("Error: Please fill all fields", 3))
      })
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <p>
            title{" "}
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            author{" "}
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            url{" "}
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </p>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
