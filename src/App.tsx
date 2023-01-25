import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './ui/hooks/useCart'
import { Router } from './ui/routes/Router'

export function App () {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartContextProvider>
  )
}
