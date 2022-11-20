import {createSlice} from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        showNotification(state, action) {
            state = action.payload
            return state
        },
        hideNotification(state, action) {
            state = initialState
            return state
        }
    }
}) 

export const {showNotification, hideNotification} = notificationSlice.actions

export const setNotification = (message, timer) => {
    return async (dispatch) => {
        window.clearTimeout(window.timeout)
        dispatch(showNotification(message))
        window.timeout = setTimeout(() => dispatch(hideNotification()), timer * 1000)
    }
}


export default notificationSlice.reducer