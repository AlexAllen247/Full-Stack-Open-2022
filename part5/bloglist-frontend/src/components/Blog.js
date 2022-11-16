import { useState } from "react"

const Blog = ({ blog, updateLikes, deleteBlog, username }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleUpdatedLikes = (event) => {
        event.preventDefault()
        updateLikes(blog.id, {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user
        })
    }

    const handleDeleteBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            deleteBlog(blog.id)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div className="blog-visible">
                <span>{blog.title}</span> - <span>{blog.author}</span>{" "}
                <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
            </div>
            {visible && (
                <div className="blog-invisible">
                    <div>
                        {blog.url}
                    </div>
                    <div>
                        <p>Likes: {blog.likes} <button id="like-button" onClick={handleUpdatedLikes}>like</button>{" "}</p>
                    </div>
                    <div>
                        {blog.user.name}
                    </div>
                    {blog.user.username === username && (
                        <button id="delete-button" onClick={handleDeleteBlog}>remove</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog