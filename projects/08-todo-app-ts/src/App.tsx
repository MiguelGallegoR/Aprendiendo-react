import { useState } from "react"
import { Todos } from "./components/Todos"
const mockTodos = [
  {
    id:'1',
    title: 'ver el twitch de Midu',
    completed: false
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
  const [todos] = useState(mockTodos)
  return (
    <div className="todoapp">
      <Todos todos={todos} />

    </div>
    )
  }