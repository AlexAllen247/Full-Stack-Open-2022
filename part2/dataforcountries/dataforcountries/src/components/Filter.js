const Filter = ({ onChange, value }) => {
    return (
        <div>
            <p>find countries<input onChange={onChange} value={value} /></p>
        </div>
    )
}

export default Filter