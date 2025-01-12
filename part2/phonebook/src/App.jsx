import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filterActive, setFilterActive] = useState(false)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState(null)

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

  const handleDelete = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}'s entry`)) {
      personService
        .deleteEntry(person.id)
        .catch(error => {
          alert(
            `the entry for ${person.name} has already been deleted`
          )
          setPersons(persons.filter(deleted => deleted.id !== person.id))
        })
      setPersons(persons.filter(deleted => deleted.id !== person.id))
    }
  }

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

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
    let differentNumber = false
    persons.map(person => {
      if (person.name === newName && person.number === newNumber) {
        duplicateEntry = true
      } else if (person.name !== newName && person.number === newNumber) {
        duplicateNumber = true
      } else if (person.name === newName && person.number !== newNumber) {
        differentNumber = true
      }
    })

    if (duplicateEntry) {
      window.alert(`${newName} with the number ${newNumber} is already added to the phonebook`)
    } else if (duplicateNumber) {
      const dupe = persons.find((element) => element.number === newNumber)
      window.alert(`The number ${newNumber} is already used by ${dupe.name}`)
    } else if (differentNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const entry = persons.find(person => person.name === newName)
        const updatedEntry = { ...entry, number: newNumber }
        personService
          .update(entry.id, updatedEntry)
          .then(updatedPersons => {
            setPersons(persons.map(person => person.id === entry.id ? updatedPersons : person))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${updatedPersons.name}`)
            setColor('green')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${updatedEntry.name} has already been removed from the server`)
            setPersons(persons.filter(deleted => deleted.id !== updatedEntry.id))
            setColor('red')
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }

    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${personObject.name}`)
          setColor('green')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color} />
      <Filter filter={newFilter} handler={handleFilterChange} />
      <div>
        <h3>New Entry</h3>
      </div>
      <PersonForm name={newName} number={newNumber} nameHandler={handleNameChange}
        numberHandler={handleNumberChange} Submit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={appliedFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App