const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = (content) => {
    return (
        <div>
            <ul>
                {content.parts.map(part => (
                    <Part id={part.id} name={part.name} exercises={part.exercises} />
                ))}
            </ul>
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course