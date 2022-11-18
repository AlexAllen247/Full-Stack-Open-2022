import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationRedcuer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ""
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(showNotification(`New anecdote ${content} added`))
        setTimeout(() => dispatch(hideNotification()), 5000)
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