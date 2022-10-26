import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const highestVotes = Math.max(...votes)
  const indexVotes = votes.indexOf(highestVotes)
  const mostVotes = anecdotes[indexVotes]

  if (highestVotes === 0) {
    return (
      <div>
        <p>No votes yet</p>
      </div>
    )
  } else {
    return (
      <Anecdote text={mostVotes} votes={highestVotes} />
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const voteAnecdote = () => {
    const allVotes = [...votes]
    allVotes[selected] += 1
    setVotes(allVotes)
  }

  return (
    <div>
      <Header header="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={randomAnecdote} text="next ancedote" />
      <Header header="Anecdote with most votes" />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App