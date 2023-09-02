import { Product } from "../../domain/product.model";
import { IRepository } from "../repository/IRepository";
import { Injectable } from "@nestjs/common";
import { ProductInput } from "src/app/product.dto";

@Injectable()
export class MongoRepository implements IRepository {

  constructor(
    // Libreria de MongoDB
  ) {}

  async insert(product: ProductInput): Promise<Product> {
    return new Product('code', 'product 1', 'desc product 1', 1);
  }

  async update(id: string, product: ProductInput): Promise<Product> {
    return new Product('code', 'product 1', 'desc product 1', 1);
  }

  async delete(id: string): Promise<boolean> {
    return true;
  }

  async getById(id: string): Promise<Product> {
    return new Product('code', 'product 1', 'desc product 1', 1);
  }

  async getAll(): Promise<Product[]> {
    const p = new Product('code', 'product 1', 'desc product 1', 1);
    return [p, p, p]
  }
}