import '../index.css'

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const notifClass = `notification ${color === 'green' ? 'success' : 'error'}`

  return (
    <div className={notifClass}>
      {message}
    </div>
  )
}

export default Notification
