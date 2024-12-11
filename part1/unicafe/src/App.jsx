import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral
  const average = total > 0 ? (good - bad) / total : 0
  const positive = total > 0 ? ((good) / total) * 100 : 0

  if (total > 0) {
    return (
      <div>
        <Header text='statistics' />
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={total} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive + ' %'} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <Header text='statistics' />
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <div>
        <Header text="give Feedback" />
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <Statistics text='statistics' good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App