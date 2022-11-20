import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationRedcuer"

const AnecdoteForm = (props) => {

    const handleAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ""
        props.createAnecdote(content)
        props.setNotification(`New anecdote ${content} added`, 5)
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

const mapDispatchToProps = dispatch => {
    return {
        createAnecdote: value => {
            dispatch(createAnecdote(value))
        },
        setNotification: (value, timeout) => {
            dispatch(setNotification(value, timeout))
        }
    }
}

export default connect(null, mapDispatchToProps(AnecdoteForm))