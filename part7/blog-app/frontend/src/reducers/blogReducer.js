import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((b) => (b.id !== id ? b : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      state = action.payload
      return state
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    comment(state, action) {
      const { id, addedComment } = action.payload
      const blogToUpdate = state.find((b) => b.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        comments: blogToUpdate.comments.concat(addedComment),
      }
      return state.map((b) => (b.id !== id ? b : updatedBlog))
    },
  },
})

export const { like, appendBlog, setBlogs, deleteBlog, comment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const addBlog = (content) => {
  return async (dispatch) => {
    const newblog = await blogService.create(content)
    dispatch(appendBlog(newblog))
  }
}
export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog)
    dispatch(like(id))
  }
}
export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog))
  }
}
export const addNewComment = (id, newComment) => {
  return async (dispatch) => {
    const addedComment = await blogService.addComment(id, newComment)
    dispatch(comment({ id, addedComment }))
  }
}
export default blogSlice.reducer
