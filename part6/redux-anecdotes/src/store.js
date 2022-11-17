import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationRedcuer"
import filterReducer from "./reducers/filterReducer"

const store = configureStore({ reducer: { 
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }})

export default store