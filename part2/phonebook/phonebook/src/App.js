import { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Header from "./components/Header"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [personSearch, setPersonSearch] = useState([])

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
        setPersonSearch(response.data)
      })
  }

  useEffect(hook, [])

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find((person) => person.name === contactObject.name)) {
      alert(`${newName} is already in phonebook`)
    } else {
      setPersons(persons.concat(contactObject))
      setPersonSearch(persons.concat(contactObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setPersonSearch(persons.filter((person) => person.name.toLowerCase().includes(event.target.value)))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Header header="Phonebook" />
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Header header="Numbers" />
      <Persons personSearch={personSearch} />
    </div>
  )
}

export default App