import Person from "./Person"

const Persons = ({ personSearch }) => {
    return (
        <div>
            <ul>
                {personSearch.map((person) => (
                    <Person key={person.name} person={person} />
                ))}
            </ul>
        </div>
    )
}

export default Persons