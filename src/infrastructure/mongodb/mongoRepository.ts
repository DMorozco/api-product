import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductInput } from "src/app/product.dto";
import { Product } from "../../domain/product.model";
import { IRepository } from "../repository/IRepository";

@Injectable()
export class MongoRepository implements IRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async insert(productInput: ProductInput): Promise<Product> {
    const newProduct = new this.productModel(productInput);
    return await newProduct.save();
  }

  async update(id: string, productInput: ProductInput): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, productInput, { new: true });
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async getById(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async getAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
}
