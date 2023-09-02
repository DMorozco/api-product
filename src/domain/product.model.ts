import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  constructor(code: string, name: string, description: string, price: number) {
    this.code = code;
    this.name = name;
    this.description = description;
    this. price = price;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);