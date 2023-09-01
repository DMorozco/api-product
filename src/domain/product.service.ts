import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductInput } from '../app/product.dto';
import { MongoRepository } from '../infrastructure/mongodb/mongoRepository';
import { IRepository } from '../infrastructure/repository/IRepository';
import { DeleteProductResponse, ProductResponse } from './product.response';

@Injectable()
export class ProductService {
  constructor(
    @Inject(MongoRepository) private repository: IRepository
  ) {}

  async saveProduct(productInput: ProductInput): Promise<ProductResponse> {
    const productResult = await this.repository.insert(productInput);
    return new ProductResponse(HttpStatus.CREATED, [productResult]);
  }

  async updateProduct(id: string, productInput: ProductInput): Promise<ProductResponse> {
    const productResult = await this.repository.update(id, productInput);
    return new ProductResponse(HttpStatus.OK, [productResult]);
  }

  async deleteProduct(id: string): Promise<DeleteProductResponse> {
    const result = await this.repository.delete(id);
    if (result) {
      return new DeleteProductResponse(HttpStatus.OK, 'product was deleted');
    }
    return new DeleteProductResponse(HttpStatus.BAD_REQUEST, 'product doesnt exist');
  }

  async getProductById(id: string): Promise<ProductResponse> {
    const productResult = await this.repository.getById(id);
    return new ProductResponse(HttpStatus.OK, [productResult]);
  }

  async getAllProducts(): Promise<ProductResponse> {
    const productResult = await this.repository.getAll();
    return new ProductResponse(HttpStatus.OK, productResult);
  }
}
