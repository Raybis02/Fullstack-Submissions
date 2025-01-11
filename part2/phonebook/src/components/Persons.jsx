import Person from './Person'

const Persons = ({ persons, handleDelete }) => {
    return(
        <div>
        <ul>
            {persons.map(person =>
                <Person person={person} key={person.id} handleDelete={handleDelete} />
            )}
        </ul>
    </div>
    )
    
}

export default Persons