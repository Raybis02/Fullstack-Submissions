const Notification = ({ person, message }) => {
    if (person === null || message === null) {
      return null
    }
  
    return (
      <div className='error'>
        { `${message} ${person.name}`}
      </div>
    )
  }

export default Notification