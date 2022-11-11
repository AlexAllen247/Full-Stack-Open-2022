const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
            <p>username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} /></p>
        </div>
        <div>
            <p>password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} /></p>
        </div>
        <button type="submit">login</button>
    </form>
)

export default loginForm