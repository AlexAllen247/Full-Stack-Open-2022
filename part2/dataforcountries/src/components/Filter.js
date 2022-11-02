const Filter = ({ value, onChange }) => {
    return (
        <div>
            <p>Find Countries: <input value={value} onChange={onChange} /></p>
        </div>
    )
}

export default Filter