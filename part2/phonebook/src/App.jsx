import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(persons);

  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    let double = false
    persons.forEach(person => {
      if (person.name === newName) {
        double = true
      }
    })

    if (double) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person =>
            <Person person={person} key={person.name} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App