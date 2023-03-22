import { Link } from '../Link'

export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear un react router desde 0</p>
      <Link to='/about'>Ir al about</Link>
    </>
  )
}
