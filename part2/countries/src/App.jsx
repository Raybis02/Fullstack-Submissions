import { useEffect, useState } from 'react';
import Search from './Components/Search';
import Notification from './Components/Notification'; 
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)

  const getAllCountries = async () => {
    try {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      setAllCountries(response.data)
      setFilteredCountries(response.data)
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  const handleSearch = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch)

    if (allCountries) {
      const lowercasedSearch = newSearch.toLowerCase()
      const filtered = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(lowercasedSearch)
      )
      setFilteredCountries(filtered.length > 0 ? filtered : null)
    }
  }

  useEffect(() => {
    getAllCountries()
  }, [])

  if (!allCountries) {
    return <div>Loading countries...</div>
  }

  return (
    <div>
      <Search input={search} handler={handleSearch} />
      {filteredCountries ? (
        <Notification countries={filteredCountries} />
      ) : (
        <div>No countries found matching your search.</div>
      )}
    </div>
  )
}

export default App
