import './App.css'
import { Header } from './components/Header'
import { Route } from 'wouter'
import { lazy, Suspense } from 'react'


const TopStoriesPage = lazy(()=> import('./pages/TopStories'))
const DetailPage = lazy(()=> import('./pages/Detail'))

function App() {

  return (
    <>
      <Header />
      <main>
          <Suspense fallback='Loading...'>
            <Route path='/' component={TopStoriesPage} />
            <Route path='/article/:id' component={DetailPage} />
          </Suspense>
      </main>
      
    </>
  )
}

export default App
