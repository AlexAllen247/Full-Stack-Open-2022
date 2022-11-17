import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationRedcuer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleVote = (id) => {
        dispatch(addVote(id))
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(showNotification(`You voted for ${anecdote.content}`))
        setTimeout(() => dispatch(hideNotification()), 5000)
    }

    return (
        <div>
            {anecdotes
                .slice()
                .sort((x, y) => y.votes - x.votes)
                .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList