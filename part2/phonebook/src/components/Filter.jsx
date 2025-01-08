const Filter = ({ filter, handler }) => {
    return (
        <div>
            Filter: <input value={filter} onChange={handler} />
        </div>
    )
}

export default Filter