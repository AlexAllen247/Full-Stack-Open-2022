const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <b>languages:</b>
            <ul>
                {Object.values(country.languages).map((language) => {
                    return (<li key={language}>{language}</li>)
                })}
            </ul>
            <img src={country.flags.png} />
        </div>
    )
}

export default Country