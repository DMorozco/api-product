import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteProductResponse, ProductResponse } from '../domain/product.response';
import { ProductService } from '../domain/product.service';
import { ProductInput } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() product: ProductInput): Promise<ProductResponse> {
    return this.productService.saveProduct(product);
  }

  @Put(':id')
  async updateProduct(@Body() product: ProductInput, @Param() id: string): Promise<ProductResponse> {
    return this.productService.updateProduct(product, id);
  }

  @Delete(':id')
  async deleteProduct(@Param() id): Promise<DeleteProductResponse> {
    return this.productService.deleteProduct(id);
  }

  @Get(':id')
  async getProductById(@Param() id): Promise<ProductResponse> {
    return this.productService.getProductById(id);
  }

  @Get()
  async getAllProducts(): Promise<ProductResponse> {
    return this.productService.getAllProducts();
  }
}
