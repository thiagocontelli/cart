import { IGetAllProductsRepository } from '../domain/interfaces/IGetAllProductsRepository'
import { IHttpResponse, IHttpService } from '../services/http'

export class ProductRepository implements IGetAllProductsRepository {
  constructor (private readonly http: IHttpService) {}

  async getAllProducts (): Promise<IHttpResponse> {
    return await this.http.get('products')
  }
}
