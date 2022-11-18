import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationRedcuer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ""
        dispatch(createAnecdote(content))
        dispatch(setNotification(`New anecdote ${content} added`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAnecdote}>
                <div><input name="newAnecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm