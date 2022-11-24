import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
  let container
  const mockHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 2,
      user: "test user",
    }
    container = render(<Blog blog={blog} updateLikes={mockHandler} />).container
  })

  test("renders a view of a blog", () => {
    const visible = container.querySelector(".blog-visible")
    const invisible = container.querySelector(".blog-invisible")
    expect(visible).not.toHaveStyle("display: none")
    expect(invisible).toEqual(null)
  })

  test("renders blog details when show button is clicked", async () => {
    const button = screen.getByText("show")
    await fireEvent.click(button)

    const visible = container.querySelector(".blog-visible")
    const invisible = container.querySelector(".blog-invisible")
    expect(invisible).not.toHaveStyle("display: none")
    expect(visible).not.toHaveStyle("display: none")
  })

  test("when like button is clicked twice, event handler is also called twice", async () => {
    const showButton = screen.getByText("show")
    await fireEvent.click(showButton)

    const likeButton = screen.getByText("like")
    await fireEvent.click(likeButton)
    await fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
