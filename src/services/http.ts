import axios, { AxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: 'https://dummyjson.com'
})

export interface IHttpResponse {
  status: number
  data: any
}

export interface IHttpService {
  get: (url: string, config?: AxiosRequestConfig) => Promise<IHttpResponse>
}

export class HttpService implements IHttpService {
  async get (url: string, config?: AxiosRequestConfig): Promise<IHttpResponse> {
    return await api.get(url, config)
  }
}
