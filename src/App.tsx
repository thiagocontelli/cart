import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CartContextProvider } from './ui/hooks/useCart'
import { Router } from './ui/routes/Router'
import 'react-toastify/dist/ReactToastify.css'

export function App () {
  return (
    <CartContextProvider>
      <ToastContainer />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartContextProvider>
  )
}
