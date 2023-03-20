import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/Cart'
function App () {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <>
      <main>
        <Header />
        <Cart />
        <Products products={filteredProducts} />
      </main>
    </>
  )
}

export default App
