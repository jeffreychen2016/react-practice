import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

// ------------------------
// tutorial link
// https://www.youtube.com/watch?v=hQAHSlTtcmY
// ------------------------

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // --------------------
  // hooks 
  // --------------------


  // function testCount (){
  //   console.log('run count')
  //   return []
  // }

  // *** IMPORTANT *** 
  // if use value directly as first parameter, then whatever inside of it
  // will be called when the component gets render very time
  // const [todos, setTodos] = useState(testCount())


  // *** use this overload method instead if you do not want to call the function over and over again the component re-redenrs
  // default the state to empty list when the app starts
  // todos: all exsiting items in the state
  // setTodos: the function that is used to update the state
  const [todos, setTodos] = useState(() => {
    console.log('run state')
    return [
      // {id: 1, name: 'Todo 1', complete: true},
      // {id: 2, name: 'Todo 2', complete: false}
    ]
  })

  // `useRef` allows to reference element (value) inside of html
  const todoNameRef = useRef()

  // *** run when the app first loaded, fetch all exsting todos from local storage ***
  // to get existing todo from local sstorage, also use `useEffect` hook
  // this hook is going to be ran only once, since the [] never changes (nothing in that array)
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    // if we have any todos saved in the local strage, then update state with those
    if(storedTodos) setTodos(storedTodos)
    // there is no items in the array, that means this useEffect hook will not be called once
    // which is when the app starts up
  }, [])

  // *** run when `todos` changes, and update the local storage ***
  // `useEffect` executes every time when stuffs in the `input` array changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    // everytime this `todos` changes, we want to execute the function (first parameter)
  }, [todos])

  // --------------------
  // handlers 
  // --------------------
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return 

    // update the state (add new todo to the list)
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })

    // clear out the input field after add new todo
    todoNameRef.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearComplete () {
    const completedTodos = todos.filter(todo => !todo.complete)
    setTodos(completedTodos)
  }

  return (
    // this empty bracket is call fragment, 
    // which allows us to return more than 1 html element from a component
    <>
      {/* pass the existing todos as `pros` to the component */}
      <TodoList  
        todos={todos} 
        toggleTodo={toggleTodo}
      />
      <input ref={todoNameRef} type='text' />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearComplete}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
