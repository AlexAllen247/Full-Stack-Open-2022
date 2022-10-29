import { useState } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Header from "./components/Header"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [personSearch, setPersonSearch] = useState(persons)

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