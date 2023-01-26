import { createContext, ReactNode, useContext, useState } from 'react'
import { Product } from '../../model/Product'

interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
  increaseAmount: (product: Product) => void
  decreaseAmount: (product: Product) => void
}

interface Props {
  children: ReactNode
}

const CartContext = createContext({} as CartContextType)

export function CartContextProvider ({ children }: Props) {
  const [cart, setCart] = useState<Product[]>([])

  function addToCart (product: Product) {
    const productExists = cart.find(it => it.id === product.id)
    if (productExists) {
      setCart(prevState =>
        prevState.map(it => {
          if (it.id === productExists.id) {
            return { ...productExists, amount: productExists.amount + 1 }
          }
          return it
        })
      )
      return
    }
    setCart(prevState => [...prevState, { ...product, amount: 1 }])
  }

  function increaseAmount (product: Product) {
    setCart(prevState =>
      prevState.map(it => {
        if (it.id === product.id) {
          return { ...product, amount: product.amount + 1 }
        }
        return it
      })
    )
  }

  function decreaseAmount (product: Product) {
    if (product.amount > 0) {
      setCart(prevState =>
        prevState.map(it => {
          if (it.id === product.id) {
            return { ...product, amount: product.amount - 1 }
          }
          return it
        })
      )
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseAmount,
        increaseAmount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart () {
  return useContext(CartContext)
}
