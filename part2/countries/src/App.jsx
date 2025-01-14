import { useEffect, useState } from 'react'
import Search from './Components/Search';
import Notification from './Components/Notification';
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleSearch = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    filterCountries(allCountries, newSearch)
  }

  const filterCountries = (countries, searchValue) => {
    setFilteredCountries((countries.filter(elem => 
      elem.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )))
  }

  const final = search.length === 0 ? allCountries : filteredCountries

  const getAllCountries = () => {
    if (allCountries) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setAllCountries(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(getAllCountries, [])

  return (
    <>
      <div>
        <Search input={search} handler={handleSearch} />
      </div>
      <div>
        <Notification countries={final} />
      </div>
    </>
  )
}

export default App
