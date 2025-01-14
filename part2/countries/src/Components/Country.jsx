const Country = ({ country, buttonHandler }) => {
    return(
        <li>{country.name.common}
            <button onClick={() => buttonHandler([country])}>show</button>
        </li>
    )
}

export default Country