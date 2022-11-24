import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import { setNotification } from "./notificationReducer"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export const processLogin = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ userObject })
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification("Error: Wrong credentials", 3))
    }
  }
}

export const setLogin = (userObject) => {
  return async (dispatch) => {
    dispatch(setUser(userObject))
  }
}

export const setLogout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
