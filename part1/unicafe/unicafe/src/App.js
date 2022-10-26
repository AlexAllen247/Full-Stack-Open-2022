import { useState } from 'react'

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statisticsline = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad
  const average = parseFloat((good - bad) / total).toFixed(2)
  const positive = parseFloat((good / total) * 100).toFixed(2)

  if (total === 0) {
    return (
      <div>
        <p>No Feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <Statisticsline text="good" value={good} />
            <Statisticsline text="neutral" value={neutral} />
            <Statisticsline text="bad" value={bad} />
            <Statisticsline text="all" value={total} />
            <Statisticsline text="average" value={average} />
            <Statisticsline text="positive" value={positive + "%"} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App