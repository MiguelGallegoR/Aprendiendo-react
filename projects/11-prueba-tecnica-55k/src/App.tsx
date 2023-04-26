import { useEffect, useState, useRef, useMemo } from 'react'
import { type User } from './types.d'
import './App.css'
import { UsersList } from './components/UsersList'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async (currentPage: number) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=miguel&page=${currentPage}`)
      .then(res =>{ 
        if(!res.ok) throw new Error('Error en la petición')
        return res.json()
      })
      .then(res => res.results)
}
function App() {
  const {isLoading, isError, data: users = [], refetch} = useQuery<User[]>(
    ['users'],
    async () => await fetchUsers(1)
  )
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string|null>(null)
  const [currentPage, setCurrentPage] = useState(1)



  //useRef guarda un valor que queremos que se comparta entre renderizados
  //pero que al cambiar no se vuelva a renderizar el componente
  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
      //const filteredUsers = users.filter(user => user.email !== email)
      //setUsers(filteredUsers)
  }

  const handleReset = async() => {
      await refetch()
  }

  
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
        {users.length > 0  && 
          <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
        }
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Ha habido un error</p>}
        { !isError && users.length === 0  && <p>No hay usuarios</p>}
        
        {!isLoading && !isError && <button onClick={()=>{setCurrentPage(currentPage+1)}}>Cargar más resultados</button>}
      </main>
    </div>
  )
}

export default App
