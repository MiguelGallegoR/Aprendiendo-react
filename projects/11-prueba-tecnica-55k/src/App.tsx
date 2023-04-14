import { useEffect, useState } from 'react'
import { type User } from './types.d'
import './App.css'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error()
      })
  }, [])
  return (
    <div className="App">
        <h1>Prueba Técnica</h1>
        <UsersList users={users} />
    </div>
  )
}

export default App
