import { CartContextProvider } from './ui/hooks/useCart'
import { Home } from './ui/pages/Home'

export function App () {
  return (
    <CartContextProvider>
      <Home />
    </CartContextProvider>
  )
}
