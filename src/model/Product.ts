export class Product {
  constructor (
    readonly id: number,
    readonly title: string,
    readonly price: number,
    readonly rating: number,
    readonly brand: string,
    readonly thumbnail: string
  ) {}
}
