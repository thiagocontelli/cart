import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
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
  const LS_CART = 'cart'

  function addToCart (product: Product) {
    const productExists = cart.find(it => it.id === product.id)
    if (productExists) {
      const newCart = cart.map(it => {
        if (it.id === productExists.id) {
          return { ...productExists, amount: productExists.amount + 1 }
        }
        return it
      })
      setCart(newCart)
      addCartToLocalStorage(newCart)
      return
    }
    const newCart = [...cart, { ...product, amount: 1 }]
    setCart(newCart)
    addCartToLocalStorage(newCart)
  }

  function increaseAmount (product: Product) {
    const newCart = cart.map(it => {
      if (it.id === product.id) {
        return { ...product, amount: product.amount + 1 }
      }
      return it
    })
    setCart(newCart)
    addCartToLocalStorage(newCart)
  }

  function decreaseAmount (product: Product) {
    if (product.amount > 1) {
      setCart(prevState =>
        prevState.map(it => {
          if (it.id === product.id) {
            return { ...product, amount: product.amount - 1 }
          }
          return it
        })
      )
      return
    }
    const newCart = cart.filter(it => it.id !== product.id)
    setCart(newCart)
    addCartToLocalStorage(newCart)
  }

  function addCartToLocalStorage (cart: Product[]) {
    localStorage.setItem(LS_CART, JSON.stringify(cart))
  }

  useEffect(() => {
    const lsCart = localStorage.getItem(LS_CART)
    if (lsCart) {
      setCart(JSON.parse(lsCart))
    }
  }, [])

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
