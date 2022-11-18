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
            state = null
            return state
        }
    }
}) 

export const {showNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer