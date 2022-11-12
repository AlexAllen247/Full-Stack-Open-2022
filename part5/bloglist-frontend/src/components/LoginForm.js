import { useState } from "react"

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (event) => {
        event.preventDefault()
        handleLogin(username, password)
        setUsername("")
        setPassword("")
    }
    return (
    <form onSubmit = { onSubmit } >
        <div>
            <p>username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} /></p>
        </div>
        <div>
            <p>password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} /></p>
        </div>
        <button type="submit">login</button>
    </form >
)}

export default LoginForm