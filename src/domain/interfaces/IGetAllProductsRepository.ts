import { IHttpResponse } from '../../services/http'

export interface IGetAllProductsRepository {
  getAllProducts: () => Promise<IHttpResponse>
}
