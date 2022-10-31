import axios from "axios"
import { useState, useEffect } from "react"
import Countries from "./components/Countries"
import Filter from "./components/Filter"

function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [countriesSearch, setcountriesSearch] = useState([])

  const hook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    const query = event.target.value
    setSearch(query)
    setcountriesSearch(countries.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    }))
  }

  return (
    <div>
      <Filter value={search} onChange={handleFilter} />
      <Countries countriesSearch={countriesSearch} />
    </div>
  )
}

export default App;
