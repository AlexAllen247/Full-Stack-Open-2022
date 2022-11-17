import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationRedcuer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(addAnecdote(content))
        dispatch(showNotification(`New anecdote ${content} added`))
        setTimeout(() => dispatch(hideNotification()), 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm