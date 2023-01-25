import { createContext, ReactNode, useContext, useState } from 'react'
import { Product } from '../../model/Product'

interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
}

interface Props {
  children: ReactNode
}

const CartContext = createContext({} as CartContextType)

export function CartContextProvider ({ children }: Props) {
  const [cart, setCart] = useState<Product[]>([])

  function addToCart (product: Product) {
    setCart(prevState => [...prevState, product])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart () {
  return useContext(CartContext)
}
