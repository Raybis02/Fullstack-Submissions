import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Counter = ({ text, amount }) => {
  return (
    <div>
      {text} {amount}
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    console.log('good pressed: ', updatedGood)
    setGood(updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    console.log('neutral pressed: ', updatedNeutral)
    setNeutral(updatedNeutral)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    console.log('bad pressed: ', updatedBad)
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
      <div>
        <Header text='statistics' />
        <Counter text='good' amount={good} />
        <Counter text='neutral' amount={neutral} />
        <Counter text='bad' amount={bad} />
      </div>
    </div>

  )
}

export default App