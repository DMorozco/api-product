import { Product } from "./product.model";

export class Data {
  private products: Array<Product>;

  constructor(products: Array<Product>) {
    this.products = products;
  }
}

export class ProductResponse {
  private status: number;
  private data: Data;

  constructor(status: number, products: Array<Product>) {
    this.status = status;
    this.data = new Data(products);
  }
}

export class DeleteProductResponse {
  private status: number;
  private message: string

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}