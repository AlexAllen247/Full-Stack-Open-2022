import { useState } from "react"
import PropTypes from "prop-types"

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (event) => {
        event.preventDefault()
        handleLogin(username, password)
        setUsername("")
        setPassword("")
    }
    return (
        <form onSubmit={onSubmit} >
            <div>
                <p>username <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} /></p>
            </div>
            <div>
                <p>password <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} /></p>
            </div>
            <button id="login-button" type="submit">login</button>
        </form >
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
}

export default LoginForm