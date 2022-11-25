import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser(state, action) {
      state = action.payload
      return state
    },
    removeUser(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const getUser = (userObject) => {
  return async (dispatch) => {
    dispatch(setUser(userObject))
  }
}

export const deleteUser = () => {
  return async (dispatch) => {
    dispatch(removeUser(null))
  }
}

export default userSlice.reducer
