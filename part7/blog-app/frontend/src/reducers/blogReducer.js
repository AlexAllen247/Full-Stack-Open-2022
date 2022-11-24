import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlog(state, action) {
      state = action.payload
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlog, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, blog)
    dispatch(updateBlog(blog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const removeBlog = await blogService.remove(id)
    dispatch(removeBlog(removeBlog))
  }
}

export default blogSlice.reducer
