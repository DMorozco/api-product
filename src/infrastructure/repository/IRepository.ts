import { ProductInput } from "../../app/product.dto";
import { Product } from "../../domain/product.model";

export interface IRepository {
  insert(product: ProductInput): Promise<Product>;
  update(id: string, product: ProductInput): Promise<Product>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Product>;
  getAll(): Promise<Product[]>;
}