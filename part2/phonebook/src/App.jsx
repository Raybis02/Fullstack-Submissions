import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newId, setNewId] = useState(5)

  const [newFilter, setNewFilter] = useState('')

  const [filterActive, setFilterActive] = useState(false)

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
      number: newNumber,
      id: newId
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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setNewId(newId + 1)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Filter: <input value={newFilter} onChange={handleFilterChange} />
        </div>
        <div>
          <h2>New Entry</h2>
        </div>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {appliedFilter.map(person =>
            <Person person={person} key={person.id} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App