import { useEffect, useState } from 'react'
import List from './List'
import { ToastContainer, toast } from 'react-toastify'

const getLocalStorage = () => {
  let todos = localStorage.getItem('todos')
  if (todos) {
    return (todos = JSON.parse(localStorage.getItem('todos')))
  } else {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(getLocalStorage())
  const [name, setName] = useState('')
  const [isEditing, setIsediting] = useState(false)
  const [editId, seteditId] = useState(null)

  function handleClearList() {
    setTodos([])
    toast.error('All ToDo deleted', { theme: 'dark', draggable: true })
  }

  const removeItem = (id) => {
    // console.log('removeItem' + id)
    // [1, 2, 3, 4]

    const newTodos = todos.filter((todo) => {
      return todo.id != id
    })

    setTodos(newTodos)
    toast.error('Todo Deleted!')
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // alert('Please Write todo')
      toast.warning('Please Enter Todo', { theme: 'dark', draggable: true })
    } else if (name && isEditing) {
      const newTodoList = todos.map((todo) => {
        // console.log(todo)
        if (todo.id === editId) {
          return { ...todo, title: name } //The title will overload the title of the upcoming todo
        }
        return todo
      })

      setTodos(newTodoList)
      setIsediting(false)
      seteditId(null)
      setName('')
      toast.success('Successfully edited')
    } else {
      const newTodo = {
        id: new Date().getTime().toString(),
        title: name,
        status: 'active',
      }
      setTodos([...todos, newTodo])
      setName('')
      toast.success('Todo Submitted!', { theme: 'dark', draggable: true })
    }
  }

  const handleFilter = (e) => {
    let buttonClicked = e.target.textContent
    if (buttonClicked == 'All') {
    } else if (buttonClicked == 'Active') {
    } else {
    }
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const editItem = (id) => {
    const specificTodo = todos.find((todo) => todo.id === id)
    // console.log(specificTodo)
    setIsediting(true)
    seteditId(specificTodo.id)
    setName(specificTodo.title)
  }

  return (
    <>
      <header className='primary-header'>
        <div className='container'>
          <h1>todo</h1>
          <button className='theme-toggler-btn'>
            <img src='./icon-sun.svg' alt='' />
          </button>
        </div>
      </header>

      <main>
        <ToastContainer theme='dark' />
        <section>
          <div className='container'>
            <form className='todo-form' onSubmit={handleSubmit}>
              <div className='form-control'>
                <input
                  type='text'
                  className='todo'
                  placeholder='i.e complete homework'
                  value={name}
                  onChange={handleChange}
                />
                <button type='submit' className='submit-btn'>
                  {isEditing ? 'Edit' : 'Submit'}
                </button>
              </div>
            </form>
            {todos.length >= 1 ? (
              <div className='todo-container'>
                <List
                  items={todos}
                  removeItem={removeItem}
                  editItem={editItem}
                />

                <div className='todo-container-footer'>
                  <p>3 items left</p>
                  <div className='btn-container' onClick={handleFilter}>
                    <button className='show-all-btn'>All</button>
                    <button className='show-all-btn'>Active</button>
                    <button className='show-all-btn'>Completed</button>
                  </div>

                  <button className='clear-btn' onClick={handleClearList}>
                    Clear items
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
