import { Product } from '../../../model/Product'
import { IGetAllProductsRepository } from '../../interfaces/IGetAllProductsRepository'
import { IGetAllProducts } from '../abstraction/IGetAllProducts'

export class GetAllProducts implements IGetAllProducts {
  constructor (
    private readonly repository: IGetAllProductsRepository
  ) {}

  async execute (): Promise<Product[]> {
    try {
      const { data } = await this.repository.getAllProducts()
      return data.products
    } catch (error) {
      throw new Error()
    }
  }
}
