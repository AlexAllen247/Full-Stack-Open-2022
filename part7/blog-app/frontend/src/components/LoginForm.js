import { useState } from "react"
import { useDispatch } from "react-redux"
import { processLogin } from "../reducers/userReducer"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(processLogin(username, password))
    setUsername("")
    setPassword("")
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <p>
          username{" "}
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
      </div>
      <div>
        <p>
          password{" "}
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}


export default LoginForm
