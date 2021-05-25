import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
    return (
        todos.map(todo => {
            // use `key` to uniquely identify the todo item in the dom
            // that way, React knows which item to update instead of re-redener all items every time
            // the `key` should be unique
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
    )
}
