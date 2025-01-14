const Search = ({ input, handler }) => {
    return (
        <div>
            Find countries: <input value={input} onChange={handler} />
        </div>
    )
}

export default Search