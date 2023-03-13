import './App.css'
import responseMovies from './mocks/with-results.json'
import withOutResults from './mocks/no-result.json'
import { Movies } from './components/Movies'

export default function App () {
  const movies = responseMovies.Search

  return (
    <div className='page'>
      <header>
        <h1>Prueba Técnica</h1>

        <form className='form'>
          <input placeholder='Avengers, Star wars...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}
