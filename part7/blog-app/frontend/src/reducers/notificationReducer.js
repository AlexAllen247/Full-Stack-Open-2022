import { createSlice } from "@reduxjs/toolkit"

const initialState = null
let timeoutId = null

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
    hideNotification() {
      return null
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    clearTimeout(timeoutId)
    dispatch(showNotification(message))
    timeoutId = setTimeout(() => dispatch(hideNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer
