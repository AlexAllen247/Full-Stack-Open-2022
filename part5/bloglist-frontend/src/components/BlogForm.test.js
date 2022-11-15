import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

describe("<BlogForm />", () => {
    test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        const { container } = render(<BlogForm createBlog={createBlog} />)

        const title = container.querySelector("input[name='title']")
        const author = container.querySelector("input[name='author']")
        const url = container.querySelector("input[name='url']")
        const sendButton = screen.getByText("create")

        await user.type(title, "test title")
        await user.type(author, "test author")
        await user.type(url, "www.test.com")
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toBe("test title")
        expect(createBlog.mock.calls[0][1]).toBe("test author")
        expect(createBlog.mock.calls[0][2]).toBe("www.test.com")
    })
})