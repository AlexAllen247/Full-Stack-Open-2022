import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1, }
      return state.map((anecdote) => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { createAnecdote, addVote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer