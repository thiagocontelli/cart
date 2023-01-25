import { Product } from '../../../model/Product'

export interface IGetAllProducts {
  execute: () => Promise<Product[]>
}
