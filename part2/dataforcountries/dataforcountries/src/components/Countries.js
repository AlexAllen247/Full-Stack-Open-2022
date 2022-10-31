import { useState } from "react"
import Country from "./Country"

const Countries = ({ countriesSearch }) => {
    const [display, setDisplay] = useState("")

    if (countriesSearch.length === 1) {
        return (
            <Country country={countriesSearch[0]} />
        )
    } else if (countriesSearch.length <= 10) {
        return (
            <div>
                <ul>
                    {Object.values(countriesSearch).map((country) => {
                        return (
                            <li key={country.name.official}>{country.name.common}
                                <button onClick={() => setDisplay(country)}>Show</button>
                            </li>
                        )
                    })}
                </ul>
                {display ? <Country country={display} /> : null}
            </div>
        )
    } else if (countriesSearch.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
}



export default Countries