const lodash = require("lodash")

const dummy = ({ blogs }) => {
    return (1)
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const highestLikes = blogs.reduce((current, previous) => {
        return current.likes > previous.likes ? current : previous
    })

    return {
        title: highestLikes.title,
        author: highestLikes.author,
        likes: highestLikes.likes
    }
}

const mostBlogs = (blogs) => {
    const blogCount = lodash.countBy(blogs, "author")
    const authorWithMostBlogs = Object.keys(blogCount).reduce((sum, item) => {
        return blogCount[sum] > blogCount[item] ? sum : item
    })

    return {
        author: authorWithMostBlogs,
        blogs: blogCount[authorWithMostBlogs]
    }
}

const mostLikes = (blogs) => {
    const totalLikes = lodash(blogs).groupBy("author").map((object, key) => ({
        author: key,
        likes: lodash.sumBy(object, "likes")
    })).value()

    return totalLikes.reduce((sum, item) => {
        return sum.likes > item.likes ? sum : item
    })
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }