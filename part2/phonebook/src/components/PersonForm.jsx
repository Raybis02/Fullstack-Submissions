const PersonForm = ({ name, nameHandler, number, numberHandler, Submit }) => {
    return (
        <form onSubmit={Submit}>
            <div>
                <div>
                    name: <input value={name} onChange={nameHandler} />
                </div>
                <div>
                    number: <input value={number} onChange={numberHandler} />
                </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm