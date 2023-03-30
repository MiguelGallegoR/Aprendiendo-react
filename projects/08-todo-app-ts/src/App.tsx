import { useState } from "react"
import { Todos } from "./components/Todos"
import { type Todo as TodoType, type TodoId } from "./types"
const mockTodos = [
  {
    id:'1',
    title: 'ver el twitch de Midu',
    completed: true
  },
  {
    id:'2',
    title: 'Aprender React con TypeScript',
    completed: false
  },
  {
    id:'3',
    title: 'Leer',
    completed: false
  }
]
export const App = ():JSX.Element => { 
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed}: Pick<TodoType, 'id' | 'completed'>): void => {
      const newTodos = todos.map(todo => {
        if(todo.id == id){
          return {
            ...todo,
            completed
          }
        }

        return todo
      })

      setTodos(newTodos)
  }
  return (
    <div className="todoapp">
      <Todos
      onToggleCompleteTodo = {handleCompleted}
       onRemoveTodo = {handleRemove}
       todos={todos} />

    </div>
    )
  }