import { useState } from 'react'
import { toast } from 'react-toastify'
import { ProductRepository } from '../../../data/ProductRepository'
import { GetAllProducts } from '../../../domain/useCases/implementation/GetAllProducts'
import { Product } from '../../../model/Product'
import { HttpService } from '../../../services/http'

const http = new HttpService()
const repo = new ProductRepository(http)
const useCase = new GetAllProducts(repo)

export function useHome () {
  const [products, setProducts] = useState<Product[]>([])
  const [searchInput, setSearchInput] = useState('')

  async function getAll () {
    try {
      const products = await useCase.execute()
      setProducts(products)
    } catch (error) {
      toast.error('Tivemos um problema.')
    }
  }

  return {
    products,
    setProducts,
    searchInput,
    setSearchInput,
    getAll
  }
}
