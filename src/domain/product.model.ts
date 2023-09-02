import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  constructor(code: string, name: string, description: string, price: number) {
    this.code = code;
    this.name = name;
    this.description = description;
    this. price = price;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);