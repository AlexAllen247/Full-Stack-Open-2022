import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationRedcuer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
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
                            <button onClick={() => handleVote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList