import { useState } from 'react'

const Header = ({ text }) =>  <h1>{text}</h1>


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Counter = ({ text, amount }) => <div>{text} {amount}</div>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1
    const updatedAverage = () => (updatedGood - bad)/updatedTotal
    const updatedPositive = () => ((updatedGood)/updatedTotal)*100
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1
    const updatedAverage = () => (good - bad)/updatedTotal
    const updatedPositive = () => ((good)/updatedTotal)*100
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = total + 1
    const updatedAverage = () => (good - updatedBad)/updatedTotal
    const updatedPositive = () => ((good)/updatedTotal)*100
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  return (
    <div>
      <div>
        <Header text="give Feedback" />
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <div>
        <Header text='statistics' />
        <Counter text='good' amount={good} />
        <Counter text='neutral' amount={neutral} />
        <Counter text='bad' amount={bad} />
        <Counter text='all' amount={total} />
        <Counter text='average' amount={average} />
        <Counter text='positive' amount={positive + ' %'} />
      </div>
    </div>

  )
}

export default App