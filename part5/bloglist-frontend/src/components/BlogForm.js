import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewBlog({ ...newBlog, [name]: value })
    }

    const handleCreateBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog.title, newBlog.author, newBlog.url)
        setNewBlog({ title: "", author: "", url: "" })
    }

    return (
        <div>
            <h2>Create a New Blog</h2>
            <form onSubmit={handleCreateBlog} >
                <div>
                    <p>title <input type="text" value={newBlog.title} name="title" onChange={handleInputChange} /></p>
                </div>
                <div>
                    <p>author <input type="text" value={newBlog.author} name="author" onChange={handleInputChange} /></p>
                </div>
                <div>
                    <p>url <input type="text" value={newBlog.url} name="url" onChange={handleInputChange} /></p>
                </div>
                <button type="submit">create</button>
            </form >
        </div>
    )
}

export default BlogForm