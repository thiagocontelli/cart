import { Product } from '../../../model/Product'
import { IGetAllProductsRepository } from '../../interfaces/IGetAllProductsRepository'
import { IGetAllProducts } from '../abstraction/IGetAllProducts'

interface ResponseDto {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export class GetAllProducts implements IGetAllProducts {
  constructor (
    private readonly repository: IGetAllProductsRepository
  ) {}

  async execute (): Promise<Product[]> {
    try {
      const { data } = await this.repository.getAllProducts()
      return data.products.map((it: ResponseDto) => (
        new Product(it.id, it.title, it.price, it.rating, it.brand, it.thumbnail)
      ))
    } catch (error) {
      throw new Error()
    }
  }
}
