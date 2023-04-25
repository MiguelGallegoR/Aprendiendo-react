import { useEffect, useState, useRef, useMemo } from 'react'
import { type User } from './types.d'
import './App.css'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string|null>(null)

  const originalsUsers = useRef<User[]>([])
  //useRef guarda un valor que queremos que se comparta entre renderizados
  //pero que al cambiar no se vuelva a renderizar el componente
  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
      const filteredUsers = users.filter(user => user.email !== email)
      setUsers(filteredUsers)
  }

  const handleReset = () => {
      setUsers(originalsUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=10')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalsUsers.current = res.results
      })
      .catch(err => {
        console.error()
      })
  }, [])

  const filteredUsers = useMemo(() => {

    return typeof filterCountry  === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users

  }, [users, filterCountry])
    

  const sortedUsers = useMemo(() => {
    return sortByCountry 
      ? filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
      : filteredUsers

  }, [filteredUsers, sortByCountry])
  
    
  return (
    <div className="App">
      <h1>Prueba Técnica</h1>
      <header> 
        <button onClick={toggleColors}>
          Colorear filas
        </button>

        <button onClick={toggleSortByCountry}>
         { sortByCountry ? 'No ordenar por país' : 'Ordenar por país' }
        </button>

        <button onClick={handleReset}>
          Resetear Usuarios 
        </button>

        <input placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
