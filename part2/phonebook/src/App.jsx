import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [filterActive, setFilterActive] = useState(false)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value.length === 0) {
      setFilterActive(false)
    } else
      setFilterActive(true)
  }

  const appliedFilter = filterActive
    ? persons.filter(person =>
      person.name.toUpperCase().includes(newFilter.toUpperCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let duplicateEntry = false
    let duplicateNumber = false
    persons.map(person => {
      if (person.name === newName && person.number === newNumber) {
        duplicateEntry = true
      } else if (person.name !== newName && person.number === newNumber) {
        duplicateNumber = true
      }
    })

    if (duplicateEntry) {
      window.alert(`${newName} with the number ${newNumber} is already added to the phonebook`)
    } else if (duplicateNumber) {
      const dupe = persons.find((element) => element.number === newNumber)
      window.alert(`The number ${newNumber} is already used by ${dupe.name}`)
    }

    else {
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterChange} />
      <div>
        <h3>New Entry</h3>
      </div>
      <PersonForm name={newName} number={newNumber} nameHandler={handleNameChange}
        numberHandler={handleNumberChange} Submit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={appliedFilter} />
    </div>
  )
}

export default App